// Our product catalogue.
// Settings for pagination
const productsPerPage = 6;
let currentPage = 1;

const totalPages = Math.ceil(products.length / productsPerPage);

// Find the HTML elements we need to update.
const productList = document.getElementById("product-list");
const pageStatus = document.getElementById("page-status");
const previousButton = document.getElementById("previous-page");
const nextButton = document.getElementById("next-page");

// Display the products for the current page.
function displayProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const visibleProducts = products.slice(startIndex, endIndex);

  // Remove the cards from the previous page.
  productList.replaceChildren();

  // Create a card for each visible product.
  visibleProducts.forEach(function (product) {
    const card = document.createElement("article");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.width = 240;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `KES ${product.price} per ${product.unit}`;

    // Use the image filename as a unique product identifier.
    const productId = product.image.split("/").pop().split(".")[0];

    const detailsLink = document.createElement("a");
    detailsLink.href = `product.html?id=${encodeURIComponent(productId)}`;
    detailsLink.textContent = "View details";
    detailsLink.className = "button-link";
    detailsLink.setAttribute(
    "aria-label",
    `View details for ${product.name}`
    );

    card.append(image, name, price, detailsLink);
    productList.append(card);
  });

  const lastProduct = Math.min(endIndex, products.length);

  pageStatus.textContent =
    `Page ${currentPage} of ${totalPages} — ` +
    `showing products ${startIndex + 1}–${lastProduct} ` +
    `of ${products.length}`;

  // Prevent navigation beyond the first and last pages.
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Move to the previous page.
previousButton.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage -= 1;
    displayProducts();
  }
});

// Move to the next page.
nextButton.addEventListener("click", function () {
  if (currentPage < totalPages) {
    currentPage += 1;
    displayProducts();
  }
});

// Show the first page when the website opens.
displayProducts();