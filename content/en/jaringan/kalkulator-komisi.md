---
title: "Kalkulator Komisi Reseller"
description: "Simulasikan komisi berdasarkan omzet dan persentase"
draft: false
---

<div x-data="{omzet: 1000000, persen: 10}">
  <label class="block mb-2">Omzet (Rp)
    <input type="number" x-model.number="omzet" class="border border-gray-300 rounded-md px-3 py-2 w-full" />
  </label>
  <label class="block mb-2">Persentase Komisi (%)
    <input type="number" x-model.number="persen" class="border border-gray-300 rounded-md px-3 py-2 w-full" />
  </label>
  <div class="mt-3 text-lg font-semibold">Perkiraan Komisi: <span x-text="new Intl.NumberFormat('id-ID').format(Math.max(0, (omzet||0) * (persen||0) / 100))"></span></div>
  <p class="text-sm text-gray-600 mt-2">Catatan: simulasi kasar, nilai akhir mengikuti ketentuan program.</p>
</div>