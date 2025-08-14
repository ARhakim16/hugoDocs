(function () {
	const app = document.getElementById('app');
	const navList = document.getElementById('nav-list');
	const siteTitle = document.getElementById('site-title');
	const siteTagline = document.getElementById('site-tagline');
	const PLACEHOLDER = 'assets/placeholder.svg';

	function setTheme(theme) {
		if (!theme) return;
		const root = document.documentElement.style;
		if (theme.primary) root.setProperty('--color-primary', theme.primary);
		if (theme.accent) root.setProperty('--color-accent', theme.accent);
		if (theme.background) root.setProperty('--color-bg', theme.background);
		if (theme.foreground) root.setProperty('--color-fg', theme.foreground);
	}

	function el(tag, props = {}, children = []) {
		const node = document.createElement(tag);
		if (props.className) node.className = props.className;
		if (props.id) node.id = props.id;
		if (props.href) node.href = props.href;
		if (props.src) node.src = props.src;
		if (props.alt) node.alt = props.alt;
		if (props.text) node.textContent = props.text;
		if (props.target) node.target = props.target;
		if (props.rel) node.rel = props.rel;
		if (props.onClick) node.addEventListener('click', props.onClick);
		if (props.style) Object.assign(node.style, props.style);
		if (props.attrs) Object.entries(props.attrs).forEach(([k, v]) => node.setAttribute(k, v));
		children.forEach(child => node.appendChild(child));
		return node;
	}

	function createSafeImage(src, alt) {
		const img = el('img', { src: src || PLACEHOLDER, alt: alt || '' });
		img.addEventListener('error', () => {
			if (img.dataset.fallbackApplied === '1') {
				img.style.display = 'none';
				return;
			}
			img.dataset.fallbackApplied = '1';
			img.src = PLACEHOLDER;
		});
		return img;
	}

	function renderNav(navigation) {
		navList.innerHTML = '';
		if (!Array.isArray(navigation)) return;
		for (const item of navigation) {
			const a = el('a', { href: item.href || '#', text: item.label || 'Menu' });
			const li = el('li', {}, [a]);
			navList.appendChild(li);
		}
	}

	function renderHero(hero) {
		if (!hero) return;
		const heroSection = el('section', { className: 'hero section', id: 'beranda' }, [
			el('div', { className: 'text' }, [
				el('h1', { text: hero.headline || '' }),
				el('p', { text: hero.subheadline || '' }),
				hero.cta ? el('a', { className: 'btn', href: hero.cta.href || '#', text: hero.cta.label || 'Lanjut' }) : document.createTextNode('')
			]),
			el('div', { className: 'media' }, [
				createSafeImage(hero.image, hero.headline || 'Hero')
			])
		]);
		app.appendChild(heroSection);
	}

	function renderGallery(items) {
		if (!Array.isArray(items) || items.length === 0) return;
		const cards = items.map(item => {
			const img = createSafeImage(item.image, item.title || 'Karya');
			return el('div', { className: 'card' }, [
				img,
				el('div', { className: 'card-body' }, [
					el('div', { className: 'card-title', text: item.title || 'Tanpa judul' }),
					el('p', { className: 'card-desc', text: item.description || '' })
				])
			]);
		});
		const section = el('section', { className: 'section', id: 'galeri' }, [
			el('h2', { text: 'Galeri' }),
			el('div', { className: 'grid' }, cards)
		]);
		app.appendChild(section);
	}

	function renderAbout(about) {
		if (!about) return;
		const img = createSafeImage(about.photo, about.title || 'Foto');
		const section = el('section', { className: 'section about', id: 'tentang' }, [
			el('div', { className: 'photo' }, [img]),
			el('div', { className: 'text' }, [
				el('h2', { text: about.title || 'Tentang' }),
				...(Array.isArray(about.content) ? about.content.map(p => el('p', { text: p })) : [])
			])
		]);
		app.appendChild(section);
	}

	function renderContact(contact) {
		if (!contact) return;
		const items = Array.isArray(contact.items) ? contact.items : [];
		const rows = items.map(item => {
			if (item.type === 'email') {
				const link = el('a', { href: `mailto:${item.value}`, text: item.value });
				return el('div', { className: 'contact-item' }, [el('strong', { text: item.label || 'Email' }), link]);
			}
			const url = item.value || '#';
			const link = el('a', { href: url, text: url, target: '_blank', rel: 'noopener noreferrer' });
			return el('div', { className: 'contact-item' }, [el('strong', { text: item.label || 'Link' }), link]);
		});
		const section = el('section', { className: 'section', id: 'kontak' }, [
			el('h2', { text: contact.title || 'Kontak' }),
			el('p', { text: contact.description || '' }),
			el('div', { className: 'contact-list' }, rows)
		]);
		app.appendChild(section);
	}

	function smoothAnchor() {
		document.querySelectorAll('a[href^="#"]').forEach(a => {
			a.addEventListener('click', (e) => {
				const href = a.getAttribute('href');
				if (!href || href === '#') return;
				const target = document.querySelector(href);
				if (!target) return;
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.pushState(null, '', href);
			});
		});
	}

	function renderAll(data) {
		if (data?.site?.title) siteTitle.textContent = data.site.title;
		if (data?.site?.tagline) siteTagline.textContent = data.site.tagline;
		setTheme(data?.site?.theme);
		renderNav(data.navigation);
		renderHero(data.hero);
		renderGallery(data.gallery);
		renderAbout(data.about);
		renderContact(data.contact);
		smoothAnchor();
	}

	fetch('content.json', { cache: 'no-store' })
		.then(res => {
			if (!res.ok) throw new Error('Gagal memuat content.json');
			return res.json();
		})
		.then(renderAll)
		.catch((err) => {
			app.innerHTML = '<div class="section"><p>Tidak bisa memuat content.json. Untuk preview, jalankan server lokal dan buka http://localhost:8000</p></div>';
			console.warn(err);
		});
})();