// Store product IDs and quantities in the browser. Prices always come from the current catalogue.
const CartStore = {
  key: "mama-mboga-cart",

  productId(product) {
    return product.image.split("/").pop().split(".")[0];
  },

  read() {
    const saved = localStorage.getItem(this.key);

    if (!saved) {
      return [];
    }

    let items;
    try {
      items = JSON.parse(saved);
    } catch {
      return [];
    }
    if (!Array.isArray(items)) return [];

    // Keep only recognised products with valid quantities.
    return items.filter(function (item) {
      return (
        item &&
        products.some(function (product) {
          return CartStore.productId(product) === item.id;
        }) &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= 99
      );
    });
  },

  save(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    document.dispatchEvent(new Event("cartchange"));
  },

  add(id, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new Error("Choose a whole number from 1 to 99.");
    }

    const items = this.read();
    const existingItem = items.find(function (item) {
      return item.id === id;
    });

    if (existingItem) {
      if (existingItem.quantity + quantity > 99) {
        throw new Error(
          "The combined quantity for this product cannot exceed 99."
        );
      }

      existingItem.quantity += quantity;
    } else {
      items.push({ id: id, quantity: quantity });
    }

    this.save(items);
  },

  update(id, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new Error("Choose a whole number from 1 to 99.");
    }

    const items = this.read();

    const item = items.find(function (entry) {
      return entry.id === id;
    });

    if (item) {
      item.quantity = quantity;
      this.save(items);
    }
  },

  remove(id) {
    const items = this.read().filter(function (item) {
      return item.id !== id;
    });

    this.save(items);
  }
};
