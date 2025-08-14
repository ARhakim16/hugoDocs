# SSN Mockup (Placeholder)

Semua konten berupa placeholder agar fokus pada tata letak. Nanti bisa diganti teks/gambar asli.

Cara melihat:
- Buka `index.html` langsung di browser (double‑click), atau
- Jalankan server lokal:
  - `python3 -m http.server 8001 -d /workspace/ssn`
  - Buka `http://localhost:8001`

Halaman:
- `index.html`: Beranda (10 blok utama) dengan grid 12 kolom, responsif (tablet ≈ 2 kolom, HP 1 kolom)
- `katalog.html`: Katalog produk placeholder dengan filter/sort, grid 4/2/1

Catatan grid (desktop):
- Hero: 12 kolom dasar, konten 6+6
- 3 Pilar: 3 kolom (masing‑masing span 4)
- Produk Unggulan: 4 kolom (span 3)
- Jaringan: 3 kolom (span 4)
- Edukasi: 3 kolom (span 4)
- Testimoni: 3 kolom (span 4)
- Cara Order: 3 kolom (span 4)
- Sponsor: 6 kolom (span 2)
- Footer: 4 kolom (span 3)

Breakpoints:
- ≤ 900px: umumnya 2 kolom (class `t-col-span-6`)
- ≤ 560px: 1 kolom (class `m-col-span-12`)