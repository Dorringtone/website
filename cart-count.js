function refreshCartCount() {
  let count = 0;
  try {
    count = CartStore.read().reduce((sum, item) => sum + item.quantity, 0);
  } catch {
    // Navigation still works if this browser blocks storage.
  }

  document.querySelectorAll(".cart-link").forEach((link) => {
    const badge = link.querySelector(".cart-count");
    badge.hidden = count === 0;
    badge.textContent = count;
    link.setAttribute("aria-label", count ? `Cart (${count} ${count === 1 ? "unit" : "units"})` : "Cart");
  });
}

document.addEventListener("cartchange", refreshCartCount);
window.addEventListener("storage", (event) => {
  if (event.key === CartStore.key || event.key === null) refreshCartCount();
});
window.addEventListener("pageshow", refreshCartCount);
refreshCartCount();
