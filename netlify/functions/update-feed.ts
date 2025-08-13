import type { Handler } from '@netlify/functions';

// Expected env vars set in Netlify dashboard:
// - WEBHOOK_SECRET: shared secret for Bearer token auth
// - GITHUB_TOKEN: GitHub PAT or token from GitHub App with repo:contents write
// - GITHUB_REPO: "owner/repo"
// - GITHUB_BRANCH: e.g. "main" (optional, defaults to default branch)
// - GITHUB_COMMITTER_NAME (optional)
// - GITHUB_COMMITTER_EMAIL (optional)

const json = (status: number, data: unknown) => ({
  statusCode: status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(data),
});

const getAuth = (headers: Record<string, string | string[] | undefined>) => {
  const auth = headers['authorization'] || headers['Authorization'];
  if (!auth || Array.isArray(auth)) return '';
  const parts = auth.split(' ');
  return parts.length === 2 && /^Bearer$/i.test(parts[0]) ? parts[1] : '';
};

const toBase64 = (s: string) => Buffer.from(s, 'utf8').toString('base64');

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  try {
    const secret = process.env.WEBHOOK_SECRET || '';
    const provided = getAuth(event.headers as any);
    if (!secret || provided !== secret) {
      return json(401, { error: 'Unauthorized' });
    }

    const repo = process.env.GITHUB_REPO || '';
    const token = process.env.GITHUB_TOKEN || '';
    const branch = process.env.GITHUB_BRANCH || '';
    if (!repo || !token) {
      return json(500, { error: 'Missing GITHUB_REPO or GITHUB_TOKEN env var' });
    }

    const body = JSON.parse(event.body || '{}');
    // Expected body: { source: "youtube" | "tiktok", items: [...], updated?: ISO8601 }
    const source = String(body.source || '').toLowerCase();
    if (!['youtube', 'tiktok'].includes(source)) {
      return json(400, { error: 'Invalid source. Use "youtube" or "tiktok".' });
    }
    const items = Array.isArray(body.items) ? body.items : [];
    if (!items.length) {
      return json(400, { error: 'items array is required and cannot be empty' });
    }

    const payload = {
      updated: body.updated || new Date().toISOString(),
      items,
    };

    const path = `data/social/${source}.json`;
    const apiBase = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`;
    const headers = {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'netlify-function-update-feed',
      Accept: 'application/vnd.github+json',
    } as const;

    // Fetch existing file to get sha
    let sha: string | undefined;
    try {
      const url = branch ? `${apiBase}?ref=${encodeURIComponent(branch)}` : apiBase;
      const res = await fetch(url, { headers });
      if (res.ok) {
        const data: any = await res.json();
        sha = data.sha;
      }
    } catch {}

    const commitMessage = `chore(feed): update ${source} feed via webhook`;
    const content = toBase64(JSON.stringify(payload, null, 2));

    const putBody: any = {
      message: commitMessage,
      content,
    };
    if (sha) putBody.sha = sha;
    if (branch) putBody.branch = branch;
    const committerName = process.env.GITHUB_COMMITTER_NAME;
    const committerEmail = process.env.GITHUB_COMMITTER_EMAIL;
    if (committerName && committerEmail) {
      putBody.committer = { name: committerName, email: committerEmail };
    }

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify(putBody),
    });

    if (!putRes.ok) {
      const text = await putRes.text();
      return json(502, { error: 'GitHub API error', details: text });
    }

    return json(200, { ok: true, path, branch: branch || 'default' });
  } catch (err: any) {
    return json(500, { error: 'Unhandled error', details: String(err?.message || err) });
  }
};