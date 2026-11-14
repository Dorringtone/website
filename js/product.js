// Render the requested product, quantity selector and related suggestions.
const parameters = new URLSearchParams(window.location.search);
const requestedId = parameters.get("id");
const selectedProduct = products.find((product) => CartStore.productId(product) === requestedId);
const sourcePage = Math.floor(products.indexOf(selectedProduct) / 6) + 1;

if (!selectedProduct) {
  document.getElementById("product-error").hidden = false;
} else {
  const image = document.getElementById("detail-image");
  const quantity = document.getElementById("quantity");
  const quantityError = document.getElementById("quantity-error");
  const itemTotal = document.getElementById("item-total");
  const cartMessage = document.getElementById("cart-message");
  const form = document.getElementById("product-form");

  document.title = `${selectedProduct.name} | Mama Mboga Fresh`;
  if (sourcePage > 1) document.getElementById("back-to-catalogue").href = `products.html?page=${sourcePage}`;
  image.src = selectedProduct.image;
  image.alt = selectedProduct.name;
  document.getElementById("detail-category").textContent = selectedProduct.category;
  document.getElementById("detail-name").textContent = selectedProduct.name;
  document.getElementById("detail-description").textContent = selectedProduct.description;
  document.getElementById("detail-price").textContent = `KES ${selectedProduct.price} / ${selectedProduct.unit}`;
  document.getElementById("quantity-help").textContent = `Each unit is ${selectedProduct.unit}.`;

  // Show an estimate only after the selected quantity passes the input constraints.
  function updateItemTotal() {
    cartMessage.textContent = "";
    if (!quantity.validity.valid) {
      quantity.setAttribute("aria-invalid", "true");
      quantityError.textContent = "Enter a whole number from 1 to 99.";
      itemTotal.textContent = "";
      return;
    }
    quantity.removeAttribute("aria-invalid");
    quantityError.textContent = "";
    itemTotal.textContent = `Estimated item total: KES ${(quantity.valueAsNumber * selectedProduct.price).toLocaleString("en-KE")}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      CartStore.add(requestedId, quantity.valueAsNumber);
      cartMessage.classList.remove("feedback-error");
      cartMessage.textContent = `Added ${quantity.valueAsNumber} × ${selectedProduct.unit} of ${selectedProduct.name}.`;
    } catch (error) {
      cartMessage.classList.add("feedback-error");
      cartMessage.textContent = `Could not add this item. ${error.message}`;
    }
  });

  setUpQuantity(document.getElementById("product-quantity-control"), quantity, updateItemTotal);
  document.getElementById("product-content").hidden = false;
  updateItemTotal();
}

// Suggested companions, using identifiers from image filenames.
const relatedProductIds = {
  tomato: ["onion", "dania", "hoho"],
  onion: ["tomato", "potato", "carrots"],
  carrots: ["peas", "potato", "cabbage"],
  potato: ["onion", "carrots", "peas"],
  cabbage: ["carrots", "onion", "tomato"],
  banana: ["mango", "oranges", "ginger"],
  cucumber: ["tomato", "dania", "onion"],
  eggplant: ["tomato", "onion", "garlic"],
  dania: ["tomato", "onion", "hoho"],
  spinach: ["onion", "tomato", "garlic"],
  sukuma: ["tomato", "onion", "dania"],
  corn: ["peas", "carrots", "potato"],
  hoho: ["tomato", "onion", "carrots"],
  mango: ["banana", "oranges", "cucumber"],
  broccoli: ["carrots", "garlic", "ginger"],
  peas: ["corn", "carrots", "potato"],
  ginger: ["garlic", "pepper", "onion"],
  garlic: ["ginger", "onion", "tomato"],
  oranges: ["banana", "mango", "ginger"],
  pumpkin: ["ginger", "garlic", "onion"],
  pepper: ["tomato", "onion", "garlic"]
};
if (selectedProduct) {
  const related = document.getElementById("related-list");
  for (const id of relatedProductIds[requestedId] ?? []) {
    const product = products.find((entry) => CartStore.productId(entry) === id);
    if (product) related.append(productCard(product, "h3"));
  }
  document.getElementById("related-products").hidden = !related.children.length;
}
