// Render the three featured products using the shared catalogue and card renderer.
const featuredList = document.getElementById("featured-list");
const featuredIds = ["tomato", "sukuma", "oranges"];

for (const id of featuredIds) {
  const product = products.find((entry) => CartStore.productId(entry) === id);
  if (product) featuredList.append(productCard(product, "h3"));
}
