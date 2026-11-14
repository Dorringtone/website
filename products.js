const productsPerPage = 6;
const totalPages = Math.ceil(products.length / productsPerPage);
const productList = document.getElementById("product-list");
const pageStatus = document.getElementById("page-status");
const previousButton = document.getElementById("previous-page");
const nextButton = document.getElementById("next-page");

function pageFromUrl() {
  const page = Number(new URLSearchParams(window.location.search).get("page"));
  return Number.isInteger(page) && page >= 1 && page <= totalPages ? page : 1;
}

function displayProducts() {
  const currentPage = pageFromUrl();
  const start = (currentPage - 1) * productsPerPage;
  const visible = products.slice(start, start + productsPerPage);
  productList.replaceChildren(...visible.map((product, index) => productCard(product, "h2", index >= 3)));
  pageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

function changePage(offset) {
  const page = pageFromUrl() + offset;
  if (page < 1 || page > totalPages) return;
  const url = new URL(window.location.href);
  if (page === 1) url.searchParams.delete("page");
  else url.searchParams.set("page", String(page));
  window.history.pushState(null, "", url);
  displayProducts();
  productList.querySelector("a").focus();
}

previousButton.addEventListener("click", () => changePage(-1));
nextButton.addEventListener("click", () => changePage(1));
window.addEventListener("popstate", displayProducts);
displayProducts();
