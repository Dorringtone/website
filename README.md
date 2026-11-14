# Mama Mboga Fresh

Mama Mboga Fresh is a web design and development course project for a neighbourhood produce stall at Adams Arcade, Ngong Road, Nairobi. Customers can browse the catalogue, build a shopping cart and send an itemised order request through WhatsApp. Customer accounts are optional.

[Visit the live website on GitHub Pages](https://dorringtone.github.io/website/)

## Stall and delivery

| Detail | Information |
| --- | --- |
| Location | Adams Arcade, Ngong Road, Nairobi |
| Phone and WhatsApp | 0755 559 107 |
| Opening hours | Monday–Saturday, 8:00 AM–8:00 PM EAT. Closed on Sundays. |
| Delivery area | Addresses within 10 km of Adams Arcade, subject to address and road-access confirmation |
| Delivery fee and timing | Confirmed by the seller on WhatsApp after checking the address |

## Shopping and ordering

1. Open [Products](pages/products.html). The catalogue lists 21 products, six per page, with photos, selling units and indicative prices.
2. Select a product to see its description and related suggestions. Choose a whole-number quantity from 1 to 99 selling units.
3. Add the product to the cart. In [Cart](pages/cart.html), you can change quantities, remove items and see the estimated produce subtotal.
4. Enter your name and estate or neighbourhood in the cart's delivery form. Add a landmark or instructions if helpful.
5. Select **Open order in WhatsApp**. Review the draft in the new tab, then press **Send** in WhatsApp. If the tab did not open, use **Open prepared order again** on the cart page.

The stall confirms availability, delivery coverage, fee and timing, the final total and payment arrangements. The cart keeps its contents in your browser. The floating **Chat on WhatsApp** button opens a general enquiry. Use the cart to prepare a message with the items and delivery details.

## Contact and accounts

- [Contact](pages/contact.html) shows the phone number, opening hours and **Find our stall** map, which opens in Google Maps in a new tab. The enquiry form prepares a WhatsApp draft with the customer's chosen reply method and details. Choosing email sets a reply preference.
- [Log in](pages/log-in.html) and [Create an account](pages/register.html) use Firebase Authentication. Registration asks for a full name, email and password confirmation. Customers can verify their email, sign in, request a password reset and sign out.
- The navigation shows the customer's first name when available, or **My account** when signed in without a name. It returns to **Log in** on sign-out. The website's own scripts store cart items in localStorage. Firebase handles the password.
- The cart stays in the browser after sign-out. Accounts currently have no order history, saved delivery addresses or cart synchronisation across devices.

## Run locally

Open the repository folder in VS Code. If you use Live Server, right-click the root `index.html` and choose **Open with Live Server**. With Python installed on Windows, you can also run the following command from the repository root.

```powershell
py -m http.server 8000
```

Open <http://localhost:8000/> and press **Ctrl+C** in the terminal when finished. Use the local server so the browser can load the JavaScript modules used by checkout, contact and customer accounts. Localhost and the live site maintain separate browser carts and sign-in sessions. Firebase, Google Maps and WhatsApp require internet access.

## Current project structure

| Path | Purpose |
| --- | --- |
| [`index.html`](index.html) | Root entry point. It forwards the site URL to `pages/index.html`. |
| [`pages/index.html`](pages/index.html) | Home page with the hero, service links, featured products and shopping FAQ. |
| [`pages/products.html`](pages/products.html) | Catalogue with pagination. |
| [`pages/product.html`](pages/product.html) | Product details, quantity selector and related items. Example route `pages/product.html?id=tomato`. |
| [`pages/cart.html`](pages/cart.html) | Cart, estimated subtotal, delivery form and order draft. |
| [`pages/delivery.html`](pages/delivery.html) | Standalone page for coverage, fees and timing. |
| [`pages/contact.html`](pages/contact.html) | Enquiry form, opening hours and stall map. |
| [`pages/log-in.html`](pages/log-in.html) and [`pages/register.html`](pages/register.html) | Account sign-in, registration, reset and verification. |
| [`css/style.css`](css/style.css) | Responsive layouts, sticky header, floating chat and form styles. |
| [`js/`](js/) | Browser scripts for navigation, catalogue, cart, forms and accounts. |
| [`images/`](images/), [`logo/`](logo/) and [`fonts/`](fonts/) | Product photos, the homepage illustration, the approved business logo and favicon, and bundled fonts. Product photos are used with permission. |
| [`documentations/`](documentations/) | Current sitemap and homepage wireframes. |

Edit [`js/products-data.js`](js/products-data.js) to maintain the catalogue. [`js/cart-store.js`](js/cart-store.js) saves the cart and [`js/checkout.js`](js/checkout.js) builds the order draft. Contact, checkout, login and registration use [`js/form-validation.js`](js/form-validation.js) for inline errors and focus management. The source files include comments identifying what each script or section handles.

The site is built with HTML, CSS and JavaScript. Git and GitHub track the source and GitHub Pages serves the static files. Firebase Authentication provides customer accounts. The site has no custom application server or product and order database.

## Sitemap and wireframes

- [Sitemap](documentations/sitemap.png) shows the root entry point, all eight pages, the guest ordering flow and optional accounts.
- [Desktop homepage wireframe](documentations/wireframe-desktop.png) shows the full navigation, split hero and three-column featured grid.
- [Mobile homepage wireframe](documentations/wireframe-mobile.png) shows the Menu and Cart controls, stacked hero and two-column featured grid.

## Development milestones

| Date | What changed | GitHub commits |
| --- | --- | --- |
| 27–30 Oct 2026 | Started the repository, updated the project brief, and added the product photos and logo. | [069a0fd](https://github.com/Dorringtone/website/commit/069a0fd), [ba8c9af](https://github.com/Dorringtone/website/commit/ba8c9af) |
| 31 Oct 2026 | Built and styled Home, added the catalogue and pagination, then added product details, quantity selection and related suggestions. | [9809672](https://github.com/Dorringtone/website/commit/9809672), [ca66bb3](https://github.com/Dorringtone/website/commit/ca66bb3), [7842eee](https://github.com/Dorringtone/website/commit/7842eee), [f7b69c9](https://github.com/Dorringtone/website/commit/f7b69c9), [d8bdb1b](https://github.com/Dorringtone/website/commit/d8bdb1b) |
| 31 Oct 2026 | Added a saved cart, delivery details and WhatsApp checkout in a new tab. Set the logo as the favicon. | [70a3df1](https://github.com/Dorringtone/website/commit/70a3df1), [477025c](https://github.com/Dorringtone/website/commit/477025c), [6e25b32](https://github.com/Dorringtone/website/commit/6e25b32), [0041428](https://github.com/Dorringtone/website/commit/0041428) |
| 1–4 Nov 2026 | Added setup instructions, built Contact with reply preferences and the stall map, and connected Firebase account navigation. | [0a199f1](https://github.com/Dorringtone/website/commit/0a199f1), [2c242f7](https://github.com/Dorringtone/website/commit/2c242f7), [1e04da0](https://github.com/Dorringtone/website/commit/1e04da0), [5e11299](https://github.com/Dorringtone/website/commit/5e11299) |
| 5–7 Nov 2026 | Added the first sitemap and wireframes, corrected heading order, documented hours, guarded checkout until JavaScript loaded, and refined the layout with Flexbox and Grid. | [f1f8bf9](https://github.com/Dorringtone/website/commit/f1f8bf9), [5e66fde](https://github.com/Dorringtone/website/commit/5e66fde), [c2d38d6](https://github.com/Dorringtone/website/commit/c2d38d6), [a8de23e](https://github.com/Dorringtone/website/commit/a8de23e), [cecf68c](https://github.com/Dorringtone/website/commit/cecf68c), [c46ced1](https://github.com/Dorringtone/website/commit/c46ced1) |
| 8 Nov 2026 | Added a Kenya-time opening status in that version, a mobile menu, a Home FAQ and inline form validation. | [e513a13](https://github.com/Dorringtone/website/commit/e513a13), [811659a](https://github.com/Dorringtone/website/commit/811659a), [14e0324](https://github.com/Dorringtone/website/commit/14e0324) |
| 14 Nov 2026 | Redesigned the storefront, integrated the account screens into the redesign and introduced a standalone Delivery page. | [53dff55](https://github.com/Dorringtone/website/commit/53dff55) |
| 14 Nov 2026 | Moved storefront files into `pages/`, `js/` and `css/`, kept a root entry, added source comments and made the header sticky and WhatsApp chat float. | [8ec4867](https://github.com/Dorringtone/website/commit/8ec4867) |

[View the full commit history](https://github.com/Dorringtone/website/commits/main/)

## Manual testing

| Area | What to check |
| --- | --- |
| Navigation and layout | Open the site root and confirm it forwards to Home. Check phone widths around 360–390 px and desktop at 1280 px or wider. Scroll with the header and chat link in view. On a phone, use the keyboard to open **Menu**, press **Escape** to close it and confirm focus returns to the button. |
| Catalogue and cart | Check the first and last catalogue pages and open a product with related suggestions. Add two items, change a quantity, refresh, then remove the items. Verify totals and that removing the last item focuses **Continue shopping**. |
| Guest checkout | With a product in the cart, try a blank delivery form and an invalid quantity. Fill the required fields with sample values, then check that the WhatsApp draft includes the items, subtotal and delivery details. You can review the draft without sending it. |
| Enquiry and map | Check the preferred-reply options and confirm the relevant phone or email field is shown. Test a blank message. Open **Find our stall** and confirm Google Maps opens separately. |
| Account forms | Try mismatched passwords on Register and check that a blank password reset asks for an email address. With a test account, check verification, sign-in, the account label and sign-out. Repeat on the live site after changes to Firebase integration. |

For form debugging, place a breakpoint on the `const first = updateSummary();` line in `js/form-validation.js`, submit a blank form and inspect the fields marked `aria-invalid`. If deployed changes appear stale, use **Ctrl+Shift+R** to reload the page and assets.

## Firebase configuration

The current site uses the existing Mama Mboga Fresh Firebase project. If you configure a separate copy, register a web app, enable the Email/Password sign-in provider and edit [`js/firebase-config.js`](js/firebase-config.js). Keep the Firebase module versions in sync. Review **Authentication → Settings → Authorized domains** for the hostnames used by your project, such as `localhost` and `dorringtone.github.io`. Keep service-account keys and administrator credentials outside the repository.

## Current operating limits

Product prices are indicative, and the produce subtotal excludes delivery. The cart does not reserve stock. The stall checks coverage and confirms orders manually. Payments are arranged with the seller. The site prepares WhatsApp drafts and does not receive a delivery or send confirmation from WhatsApp.
