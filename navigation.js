// Session 10: the same navigation disclosure is used on every page.
(() => {
  const button = document.querySelector(".menu-btn");
  const menu = document.querySelector("#main-menu");
  if (!button || !menu) return;

  // Keep this breakpoint in step with the header styles in style.css.
  const desktop = window.matchMedia("(min-width: 768px)");

  function closeMenu() {
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (desktop.matches) return;
      // Also handle a link that leads back to the current page.
      if (menu.contains(document.activeElement)) button.focus();
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || desktop.matches ||
        !menu.classList.contains("open")) return;

    if (button === document.activeElement || menu.contains(document.activeElement)) {
      button.focus();
      event.preventDefault();
    }
    closeMenu();
  });

  desktop.addEventListener("change", () => {
    if (!desktop.matches && menu.contains(document.activeElement)) button.focus();
    closeMenu();
  });

  // Without this script, the button stays hidden and the links stay visible.
  button.hidden = false;
  button.closest("header").classList.add("has-menu-toggle");
})();
