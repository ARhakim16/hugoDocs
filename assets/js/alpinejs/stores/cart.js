const localStorageCartKey = 'ssnCart';

export const cartStore = (Alpine) => ({
  items: Alpine.$persist([]).as(localStorageCartKey),

  add(item) {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      this.items.push({ ...item, qty: item.qty || 1 });
    }
  },

  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
  },

  clear() {
    this.items = [];
  },

  count() {
    return this.items.reduce((a, b) => a + (b.qty || 1), 0);
  },
});