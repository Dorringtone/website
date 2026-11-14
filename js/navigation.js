// Toggle the mobile menu and keep keyboard focus on visible controls.
const menuButton = document.querySelector(".menu-btn");
const siteMenu = document.querySelector("#main-menu");
const wideNavigation = window.matchMedia("(min-width: 900px)");

function closeMenu() {
  siteMenu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", String(siteMenu.classList.toggle("open")));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteMenu.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});

// Closing the menu at the breakpoint avoids a stale expanded state when resizing.
wideNavigation.addEventListener("change", () => {
  if (!wideNavigation.matches && siteMenu.contains(document.activeElement)) menuButton.focus();
  closeMenu();
});

menuButton.hidden = false;
document.querySelector(".site-header").classList.add("has-menu-toggle");
