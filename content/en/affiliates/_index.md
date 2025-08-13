---
title: "Program Afiliasi"
description: "Daftar sebagai mitra/afiliasi untuk mempromosikan produk kami."
draft: false
---

Isi formulir di bawah untuk mendaftar sebagai afiliasi. Kami akan menghubungi Anda via email/WhatsApp.

<form name="affiliate" method="POST" data-netlify="true" class="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
  <input type="hidden" name="form-name" value="affiliate" />
  <label class="flex flex-col">
    <span class="text-sm text-gray-700 mb-1">Nama Lengkap</span>
    <input name="name" required class="border border-gray-300 rounded-md px-3 py-2" />
  </label>
  <label class="flex flex-col">
    <span class="text-sm text-gray-700 mb-1">Email</span>
    <input type="email" name="email" required class="border border-gray-300 rounded-md px-3 py-2" />
  </label>
  <label class="flex flex-col sm:col-span-2">
    <span class="text-sm text-gray-700 mb-1">Nomor WhatsApp</span>
    <input name="whatsapp" class="border border-gray-300 rounded-md px-3 py-2" />
  </label>
  <label class="flex flex-col sm:col-span-2">
    <span class="text-sm text-gray-700 mb-1">Catatan</span>
    <textarea name="message" rows="4" class="border border-gray-300 rounded-md px-3 py-2"></textarea>
  </label>
  <div>
    <button class="rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2">Kirim Pendaftaran</button>
  </div>
</form>