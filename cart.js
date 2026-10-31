const cartItems = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartFeedback = document.getElementById("cart-feedback");

function showSubtotal() {
  const items = CartStore.read();

  const subtotal = items.reduce(function (total, item) {
    const product = products.find(function (entry) {
      return CartStore.productId(entry) === item.id;
    });

    return total + product.price * item.quantity;
  }, 0);

  cartSubtotal.textContent =
    `Estimated product subtotal: KES ${subtotal.toLocaleString("en-KE")}`;
}

function displayCart() {
  cartItems.replaceChildren();

  const items = CartStore.read();

  if (items.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Your cart is empty.";
    cartItems.append(message);

    showSubtotal();
    return;
  }

  items.forEach(function (item) {
    const product = products.find(function (entry) {
      return CartStore.productId(entry) === item.id;
    });

    const card = document.createElement("article");
    card.className = "cart-item";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.width = 120;

    const information = document.createElement("div");

    const name = document.createElement("h2");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `KES ${product.price} per ${product.unit}`;

    const label = document.createElement("label");
    label.htmlFor = `quantity-${item.id}`;
    label.textContent = `Quantity of ${product.unit} units`;

    const quantity = document.createElement("input");
    quantity.id = `quantity-${item.id}`;
    quantity.type = "number";
    quantity.min = "1";
    quantity.max = "99";
    quantity.step = "1";
    quantity.required = true;
    quantity.value = item.quantity;
    quantity.className = "cart-quantity";

    const error = document.createElement("p");
    error.id = `error-${item.id}`;
    error.className = "field-error";
    error.setAttribute("role", "status");

    quantity.setAttribute("aria-describedby", error.id);

    const lineTotal = document.createElement("p");
    lineTotal.className = "detail-price";

    function updateLineTotal(numberOfUnits) {
      lineTotal.textContent =
        `Item total: KES ` +
        `${(product.price * numberOfUnits).toLocaleString("en-KE")}`;
    }

    updateLineTotal(item.quantity);

    quantity.addEventListener("change", function () {
      if (!quantity.validity.valid) {
        quantity.setAttribute("aria-invalid", "true");

        error.textContent =
          "Enter a whole number from 1 to 99. " +
          "Your previous saved quantity is still used in the subtotal.";

        return;
      }

      try {
        CartStore.update(item.id, quantity.valueAsNumber);

        quantity.removeAttribute("aria-invalid");
        error.textContent = "";

        updateLineTotal(quantity.valueAsNumber);
        showSubtotal();

        cartFeedback.textContent = `${product.name} quantity updated.`;
      } catch (error) {
        cartFeedback.textContent =
          `Could not update your cart. ${error.message}`;
      }
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "action-button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute(
      "aria-label",
      `Remove ${product.name} from cart`
    );

    removeButton.addEventListener("click", function () {
      try {
        CartStore.remove(item.id);
        displayCart();

        cartFeedback.textContent = `${product.name} removed.`;

        // Keep keyboard focus in a useful place after removing a card.
        const nextButton = cartItems.querySelector("button");

        if (nextButton) {
          nextButton.focus();
        } else {
          document.querySelector(".cart-section > a").focus();
        }
      } catch (error) {
        cartFeedback.textContent =
          `Could not remove this item. ${error.message}`;
      }
    });

    information.append(
      name,
      price,
      label,
      quantity,
      error,
      lineTotal,
      removeButton
    );

    card.append(image, information);
    cartItems.append(card);
  });

  showSubtotal();
}

try {
  displayCart();
} catch (error) {
  cartFeedback.textContent =
    "Your saved cart could not be loaded. " +
    "Please check that browser storage is available.";

  cartSubtotal.textContent = "";
}