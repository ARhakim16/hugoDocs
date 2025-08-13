---
title: "Keranjang Belanja"
draft: false
---

<div x-data="$store.cart" class="not-prose">
  <template x-if="items.length === 0">
    <p class="text-gray-600">Keranjang Anda kosong.</p>
  </template>
  <template x-if="items.length > 0">
    <div>
      <ul class="divide-y divide-gray-200">
        <template x-for="item in items" :key="item.id">
          <li class="py-3 flex items-center justify-between">
            <div>
              <div class="font-semibold text-gray-900" x-text="item.name"></div>
              <div class="text-sm text-gray-600">Qty: <span x-text="item.qty"></span></div>
            </div>
            <button class="text-red-600 hover:underline" @click="remove(item.id)">Hapus</button>
          </li>
        </template>
      </ul>
      <div class="mt-4 flex gap-3">
        <a href="https://wa.me/6281234567890" class="inline-flex items-center gap-2 rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2">Checkout via WhatsApp</a>
        <button class="inline-flex items-center gap-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-4 py-2" @click="clear()">Kosongkan</button>
      </div>
    </div>
  </template>
</div>