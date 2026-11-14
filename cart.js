const cartItems = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartFeedback = document.getElementById("cart-feedback");
const shoppingLink = document.getElementById("continue-shopping");

function showSubtotal() {
  const subtotal = CartStore.read().reduce((total, item) => {
    const product = products.find((entry) => CartStore.productId(entry) === item.id);
    return total + product.price * item.quantity;
  }, 0);
  cartSubtotal.textContent = `KES ${subtotal.toLocaleString("en-KE")}`;
}

function displayCart() {
  const items = CartStore.read();
  cartItems.replaceChildren();

  if (items.length === 0) {
    const heading = document.createElement("h2");
    heading.textContent = "Your cart is empty";
    cartItems.append(heading);
    showSubtotal();
    return;
  }

  items.forEach((item) => {
    const product = products.find((entry) => CartStore.productId(entry) === item.id);
    const card = document.createElement("article");
    card.className = "cart-item";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.width = 120;
    image.height = 120;

    const info = document.createElement("div");
    const name = document.createElement("h2");
    const productLink = document.createElement("a");
    productLink.href = `product.html?id=${encodeURIComponent(item.id)}`;
    productLink.textContent = product.name;
    name.append(productLink);

    const price = document.createElement("p");
    price.className = "muted";
    price.textContent = `KES ${product.price} / ${product.unit}`;

    const label = document.createElement("label");
    label.className = "sr-only";
    label.htmlFor = `quantity-${item.id}`;
    label.textContent = `Quantity for ${product.name}`;

    const quantity = document.createElement("input");
    quantity.id = label.htmlFor;
    quantity.type = "number";
    quantity.inputMode = "numeric";
    quantity.min = "1";
    quantity.max = "99";
    quantity.step = "1";
    quantity.required = true;
    quantity.value = item.quantity;
    quantity.className = "cart-quantity";
    const control = document.createElement("div");
    control.className = "quantity-control";
    const decrement = document.createElement("button");
    const increment = document.createElement("button");
    decrement.type = increment.type = "button";
    decrement.dataset.step = "-1";
    increment.dataset.step = "1";
    decrement.textContent = "−";
    increment.textContent = "+";
    decrement.setAttribute("aria-label", `Decrease ${product.name} quantity`);
    increment.setAttribute("aria-label", `Increase ${product.name} quantity`);
    control.append(decrement, quantity, increment);

    const error = document.createElement("p");
    error.id = `error-${item.id}`;
    error.className = "validation-error";
    error.setAttribute("role", "status");
    quantity.setAttribute("aria-describedby", error.id);

    const lineTotal = document.createElement("p");
    lineTotal.className = "line-total";
    function updateLineTotal(numberOfUnits) {
      lineTotal.textContent = `KES ${(product.price * numberOfUnits).toLocaleString("en-KE")}`;
    }
    updateLineTotal(item.quantity);

    setUpQuantity(control, quantity, () => {
      if (!quantity.validity.valid) {
        quantity.setAttribute("aria-invalid", "true");
        error.textContent = "Enter a whole number from 1 to 99. The subtotal uses the last valid quantity.";
        return;
      }

      try {
        CartStore.update(item.id, quantity.valueAsNumber);
        quantity.removeAttribute("aria-invalid");
        error.textContent = "";
        updateLineTotal(quantity.valueAsNumber);
        showSubtotal();
      } catch {
        cartFeedback.textContent = "Could not update the cart. Check that browser storage is available.";
      }
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${product.name} from cart`);
    remove.addEventListener("click", () => {
      try {
        const position = Array.from(cartItems.children).indexOf(card);
        CartStore.remove(item.id);
        displayCart();
        cartFeedback.textContent = `${product.name} removed.`;
        const cards = cartItems.querySelectorAll(".cart-item");
        const next = cards[Math.min(position, cards.length - 1)];
        (next?.querySelector(".remove-button") ?? shoppingLink).focus();
      } catch {
        cartFeedback.textContent = "Could not remove this item. Check that browser storage is available.";
      }
    });

    const controls = document.createElement("div");
    controls.className = "cart-controls";
    controls.append(control, remove);
    info.append(name, price, label, controls, error);
    card.append(image, info, lineTotal);
    cartItems.append(card);
  });
  showSubtotal();
}

function refreshCart() {
  try {
    displayCart();
  } catch {
    cartFeedback.textContent = "Your cart could not be loaded. Check that browser storage is available.";
    cartSubtotal.textContent = "Unavailable";
  }
}

window.addEventListener("storage", (event) => {
  if (event.key === CartStore.key || event.key === null) refreshCart();
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) refreshCart();
});
refreshCart();
