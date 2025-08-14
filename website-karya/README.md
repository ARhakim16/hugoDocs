# Website Karya (tanpa perlu mengedit HTML/CSS/JS)

Cara pakai:

1. Edit konten di file `content.json`.
2. Taruh gambar Anda ke folder `assets/` dan sesuaikan path gambarnya di `content.json`.
3. Preview lokal:
   - Jalankan server: `python3 -m http.server 8000 -d /workspace/website-karya`
   - Buka di browser: `http://localhost:8000`

Struktur konten utama di `content.json`:

- `site`: judul, tagline, warna tema
- `navigation`: menu navigasi (label + anchor)
- `hero`: judul besar, subjudul, tombol, gambar
- `gallery`: daftar karya (judul, deskripsi, gambar)
- `about`: tentang Anda (judul, paragraf, foto)
- `contact`: daftar kontak/link (email atau URL)

Tips:
- Jika gambar tidak muncul, pastikan file ada di `assets/` dan nama filenya benar.
- Anda bisa mengubah warna tema di `site.theme`.