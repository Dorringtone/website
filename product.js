// Read the product identifier from the page address.
const parameters = new URLSearchParams(window.location.search);
const requestedId = parameters.get("id");

// Find the matching product in our shared catalogue.
const selectedProduct = products.find(function (product) {
  const productId = product.image.split("/").pop().split(".")[0];
  return productId === requestedId;
});

const productContent = document.getElementById("product-content");
const productError = document.getElementById("product-error");

if (!selectedProduct) {
  productError.hidden = false;
} else {
  const image = document.getElementById("detail-image");
  const name = document.getElementById("detail-name");
  const description = document.getElementById("detail-description");
  const price = document.getElementById("detail-price");
  const quantity = document.getElementById("quantity");
  const quantityHelp = document.getElementById("quantity-help");
  const quantityError = document.getElementById("quantity-error");
  const itemTotal = document.getElementById("item-total");

  // Display the selected product.
  document.title = `${selectedProduct.name} | Mama Mboga Fresh`;

  image.src = selectedProduct.image;
  image.alt = selectedProduct.name;

  name.textContent = selectedProduct.name;

  description.textContent =
    `${selectedProduct.name}, sold in units of ${selectedProduct.unit}. ` +
    "Available from Mama Mboga Fresh at Adams Arcade.";

  price.textContent =
    `KES ${selectedProduct.price} per ${selectedProduct.unit}`;

  quantityHelp.textContent =
    `Each quantity of 1 represents ${selectedProduct.unit}. ` +
    `For example, quantity 2 means 2 × ${selectedProduct.unit}.`;

  function updateItemTotal() {
    const numberOfUnits = quantity.valueAsNumber;

    // Allow whole numbers from 1 to 99 only.
    if (!quantity.validity.valid || !Number.isInteger(numberOfUnits)) {
      quantity.setAttribute("aria-invalid", "true");

      quantityError.textContent =
        "Please enter a whole number from 1 to 99.";

      itemTotal.textContent = "";
      return;
    }

    quantity.removeAttribute("aria-invalid");
    quantityError.textContent = "";

    const total = numberOfUnits * selectedProduct.price;

    itemTotal.textContent =
      `Estimated item total: KES ${total.toLocaleString("en-KE")}`;
  }

  quantity.addEventListener("input", updateItemTotal);

  const addButton = document.getElementById("add-to-cart");
  const cartMessage = document.getElementById("cart-message");

  addButton.addEventListener("click", function () {
    cartMessage.textContent = "";

    updateItemTotal();

    if (!quantity.checkValidity()) {
      quantity.reportValidity();
      return;
    }

    try {
      const id = CartStore.productId(selectedProduct);

      CartStore.add(id, quantity.valueAsNumber);

      cartMessage.textContent =
        `${quantity.valueAsNumber} × ${selectedProduct.unit} ` +
        `of ${selectedProduct.name} added to your cart.`;
    } catch (error) {
      cartMessage.textContent =
        `Could not add this item. ${error.message}`;
    }
  });

  productContent.hidden = false;
  updateItemTotal();
}
