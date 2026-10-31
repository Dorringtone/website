// Our product catalogue.
// Each product has a name, image, price and selling unit.
const products = [
  {
    name: "Tomatoes",
    image: "images/tomato.jpg",
    price: 100,
    unit: "1 kg"
  },
  {
    name: "Red onions",
    image: "images/onion.jpg",
    price: 150,
    unit: "1 kg"
  },
  {
    name: "Carrots",
    image: "images/carrots.jpg",
    price: 80,
    unit: "1 kg"
  },
  {
    name: "White potatoes",
    image: "images/potato.jpg",
    price: 120,
    unit: "1 kg"
  },
  {
    name: "White cabbage",
    image: "images/cabbage.jpg",
    price: 100,
    unit: "1 head"
  },
  {
    name: "Bananas",
    image: "images/banana.jpg",
    price: 90,
    unit: "1 kg"
  },
  {
    name: "Local cucumber",
    image: "images/cucumber.jpg",
    price: 70,
    unit: "500 g"
  },
  {
    name: "Eggplant",
    image: "images/eggplant.jpg",
    price: 50,
    unit: "500 g"
  },
  {
    name: "Dhania",
    image: "images/dania.webp",
    price: 25,
    unit: "1 bunch"
  },
  {
    name: "Spinach",
    image: "images/spinach.jpg",
    price: 40,
    unit: "1 bunch"
  },
  {
    name: "Sukuma wiki",
    image: "images/sukuma.webp",
    price: 40,
    unit: "1 bunch"
  },
  {
    name: "White maize",
    image: "images/corn.jpg",
    price: 40,
    unit: "1 cob"
  },
  {
    name: "Green hoho",
    image: "images/hoho.jpg",
    price: 70,
    unit: "500 g"
  },
  {
    name: "Ngowe mangoes",
    image: "images/mango.jpg",
    price: 140,
    unit: "1 kg"
  },
  {
    name: "Broccoli",
    image: "images/broccoli.jpg",
    price: 100,
    unit: "1 piece"
  },
  {
    name: "Peeled peas",
    image: "images/peas.jpg",
    price: 260,
    unit: "500 g"
  },
  {
    name: "Ginger",
    image: "images/ginger.jpg",
    price: 150,
    unit: "500 g"
  },
  {
    name: "Garlic",
    image: "images/garlic.jpg",
    price: 150,
    unit: "250 g"
  },
  {
    name: "Local oranges",
    image: "images/oranges.jpg",
    price: 130,
    unit: "1 kg"
  },
  {
    name: "Green-skinned pumpkin",
    image: "images/pumpkin.jpg",
    price: 80,
    unit: "1 kg portion"
  },
  {
    name: "Fresh chilli",
    image: "images/pepper.jpg",
    price: 30,
    unit: "100 g"
  }
];

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

    card.append(image, name, price);
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