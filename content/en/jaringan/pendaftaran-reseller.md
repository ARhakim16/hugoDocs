---
title: "Pendaftaran Reseller"
description: "Formulir pendaftaran reseller SSN"
draft: false
---

Silakan isi formulir di bawah ini. Tim kami akan menghubungi Anda melalui WhatsApp untuk proses aktivasi sub-domain dan materi promosi.

- WhatsApp Admin: [Chat sekarang](https://wa.me/6282188989240?text=Halo%20SSN%2C%20saya%20ingin%20mendaftar%20sebagai%20reseller)

<form name="reseller" method="POST" data-netlify="true" class="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
  <input type="hidden" name="form-name" value="reseller" />
  <label class="flex flex-col">
    <span class="text-sm text-gray-700 mb-1">Nama Lengkap</span>
    <input name="name" required class="border border-gray-300 rounded-md px-3 py-2" />
  </label>
  <label class="flex flex-col">
    <span class="text-sm text-gray-700 mb-1">WhatsApp</span>
    <input name="whatsapp" required class="border border-gray-300 rounded-md px-3 py-2" placeholder="08xxxxxxxxxx" />
  </label>
  <label class="flex flex-col">
    <span class="text-sm text-gray-700 mb-1">Email</span>
    <input type="email" name="email" class="border border-gray-300 rounded-md px-3 py-2" />
  </label>
  <label class="flex flex-col">
    <span class="text-sm text-gray-700 mb-1">Nama sub-domain yang diinginkan</span>
    <input name="subdomain" class="border border-gray-300 rounded-md px-3 py-2" placeholder="contoh: namasaya" />
  </label>
  <label class="flex flex-col sm:col-span-2">
    <span class="text-sm text-gray-700 mb-1">Catatan</span>
    <textarea name="message" rows="4" class="border border-gray-300 rounded-md px-3 py-2"></textarea>
  </label>
  <div>
    <button class="rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2">Kirim Pendaftaran</button>
  </div>
</form>