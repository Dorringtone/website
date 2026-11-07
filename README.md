# Mama Mboga Fresh Website

A web design and development course project for a neighbourhood fruit and vegetable business based at Adams Arcade, Ngong Road, Nairobi.

Customers can browse products, select quantities, build a shopping cart and prepare an order request for WhatsApp. Optional customer accounts support registration, login, email verification and password reset.

## Live website

[Visit Mama Mboga Fresh](https://dorringtone.github.io/website/)

## Features

- Responsive layout for desktop and smaller screens.
- Home page with featured products.
- Catalogue of 21 products with six products per page.
- Product details with images, selling units and indicative prices.
- Quantity selection with validation and estimated item totals.
- Related product suggestions.
- Shopping cart with editable quantities and item removal.
- Cart saved in the browser using localStorage.
- Delivery form with customer name, neighbourhood and optional instructions.
- WhatsApp checkout with an itemised order request.
- Separate contact page with business details and opening hours.
- Enquiry form with a preferred contact method: phone call, WhatsApp or email.
- Enquiries prepared as WhatsApp messages for customers to review and send.
- “Find our stall” map linking to Google Maps in a new tab.
- Optional customer registration and login using Firebase Authentication.
- Email verification, password reset and logout.
- Navigation showing the customer's first name when logged in.
- Clear error messages for failed account actions.
- Business logo displayed as the browser favicon.

## Session 7 design updates

- The welcome section uses the existing tomato photograph as a decorative CSS background.
- Home pairs delivery and opening hours; Contact pairs the enquiry form with hours and the map; Cart pairs the order summary with delivery details. These layouts stack on phones.
- Shared colours, subtle product card shadows and striped hours tables keep the pages consistent.
- The fixed **WhatsApp help** link opens a general chat. Use the checkout button to include order and delivery details.
- On wider, taller screens the header stays at the top as you scroll, and a floating up arrow above WhatsApp help returns you to the top. On smaller screens the arrow stays in the footer and the header scrolls normally.

Preview Home, Contact and Cart at desktop width and around 360px. On Cart, remove the last product and confirm keyboard focus returns to **Continue shopping**.

## Session 8 responsive layout

- Product and related-product grids start with one column, use two from 768 px, and use three from 1024 px.
- The header uses Flexbox. The menu wraps below the brand at smaller widths, and the links sit beside it when there is room on desktop. Navigation targets are at least 44 px tall.
- Product details use two columns from 768 px. The contact form and cart checkout stay stacked until 1024 px so the fields have more room on tablets.

In DevTools, try 375, 768 and 1280 px. Check the catalogue and related products, tab through the navigation, and make sure the cart and contact forms fit without sideways scrolling.

## How ordering works

1. Browse the product catalogue.
2. Open a product, select a quantity and add it to the cart.
3. Continue shopping or review the cart.
4. Enter your name and delivery location.
5. Click **Send order request on WhatsApp**.
6. Review the prepared message in WhatsApp and press **Send**.

Customers do not need to register or log in to request an order.

Opening WhatsApp does not automatically send the message or confirm an order.

The seller confirms availability, delivery coverage, delivery charges, delivery time, the final total and payment arrangements.

## Customer accounts

Customer accounts use Firebase Authentication with email and password.

Customers can:

- Register with their full name, email address and password.
- Confirm their password during registration.
- Verify their email address using an emailed link.
- Log in and view their account details.
- Request a password reset email.
- Log out.

The navigation displays an account link with the customer's first name while logged in. It returns to **Log in** after logout.

Passwords are handled by Firebase Authentication. The website's own scripts do not save passwords in localStorage.

Accounts do not currently provide order history, saved delivery addresses or cart synchronisation across devices.

## Contact and enquiries

The contact page includes:

- Phone and WhatsApp links.
- Opening hours.
- An enquiry form.
- A preferred reply method: phone call, WhatsApp or email.
- A stall location map that opens Google Maps in a new tab.

The enquiry form prepares a WhatsApp message containing the customer's enquiry and reply details. Customers must review and send the message themselves.

Selecting email as the preferred reply method does not send an email automatically.

## Business information

- **Location:** Adams Arcade, Ngong Road, Nairobi.
- **Phone and WhatsApp:** 0755 559 107.
- **Opening hours:** Monday–Saturday, 8:00 AM–8:00 PM EAT.
- **Sunday:** Closed.
- **Delivery area:** Addresses within a 10 km radius of the stall, subject to location and road-access confirmation.

Delivery coverage is checked manually. The website does not calculate delivery distances or charges automatically.

## Technologies

- **HTML:** Page content and structure.
- **CSS:** Appearance, responsive layouts and message styling.
- **JavaScript:** Catalogue pagination, product details, cart, enquiries and WhatsApp message preparation.
- **localStorage:** Cart storage in the customer's browser.
- **Firebase Authentication:** Customer registration, login, email verification, password reset and login session management.
- **Google Maps:** Stall location display and map links.
- **Git and GitHub:** Version control and source storage.
- **GitHub Pages:** Website hosting.

The website consists of static files hosted on GitHub Pages, with browser-based interactivity and Firebase Authentication as an external account service.

No custom application server or product/order database is currently used.

## Project files

| File or folder | Purpose |
|---|---|
| `index.html` | Home page, delivery information and quick contact details |
| `products.html` | Product catalogue page |
| `product.html` | Individual product details page |
| `cart.html` | Shopping cart and delivery form |
| `contact.html` | Contact details, enquiry form and stall map |
| `log-in.html` | Login, password reset and account controls |
| `register.html` | Customer registration page |
| `style.css` | Shared website styling |
| `products-data.js` | Shared product catalogue and prices |
| `products.js` | Product cards and pagination |
| `product.js` | Product details, quantity selection and suggestions |
| `cart-store.js` | Shared browser cart storage |
| `cart.js` | Cart display, quantity updates and subtotal |
| `checkout.js` | Delivery validation and WhatsApp checkout |
| `firebase-config.js` | Firebase connection settings and shared Authentication instance |
| `login.js` | Login, logout, password reset and email verification controls |
| `register.js` | Account creation, display name and verification email |
| `auth-nav.js` | Navigation updates based on login status |
| `images/` | Product photographs |
| `logo/` | Business logo |
| `README.md` | Project overview and instructions |

The contact page currently includes its enquiry JavaScript within `contact.html`.

## Run locally

You need Python installed to use the following preview method.

1. Open the `website` folder in VS Code.
2. Open a terminal in that folder.
3. Run:

   ```powershell
   py -m http.server 8000
   ```

4. Open this address in your browser:

   [http://localhost:8000](http://localhost:8000)

Keep the terminal running while previewing the website. Press **Ctrl + C** in the terminal to stop the server.

Use the local server instead of opening HTML files directly, so JavaScript modules and browser storage work consistently.

An internet connection is required for Firebase account features and external services.

The published GitHub Pages website works independently of this local server.

Localhost and the live website have separate browser storage and login sessions. A customer may need to log in separately on each.

## Firebase configuration

The project uses the Firebase JavaScript SDK through browser module imports.

To connect a separate copy to your own Firebase project:

1. Create a Firebase project and register a web app.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Replace the connection settings in `firebase-config.js` with your web app configuration.
4. Under **Authentication → Settings → Authorized domains**, add your hosting domain and `localhost` for local testing.
5. Keep the Firebase SDK version consistent across the JavaScript imports.

The current website uses these authorised domains:

- `localhost`
- `dorringtone.github.io`

Firebase also lists the project's default Firebase domains.

The Firebase web configuration identifies the project and is included in browser code. Private service-account keys and administrator credentials must never be added to this repository.

## Testing

Manual checks during development cover:

- Navigation between pages and Home page sections.
- Product images and catalogue pagination.
- Product details and related product links.
- Quantity validation and total calculations.
- Adding, updating and removing cart items.
- Retaining cart items after page refreshes.
- Required delivery fields.
- Preparing WhatsApp order messages.
- Opening WhatsApp separately while keeping the cart available.
- Layout adjustments in a narrow browser window.
- Registration and account creation in Firebase.
- Email verification and account status.
- Login error messages and their visual styling.
- Displaying the logged-in customer's name in navigation across pages.

Additional checks before publishing account changes:

- Log out and confirm navigation returns to **Log in**.
- Log in again with the registered account.
- Request a password reset and test the new password.
- Confirm shopping and WhatsApp ordering still work while logged out.
- Repeat account checks on the published GitHub Pages website.

If recent styling or script changes do not appear, try **Ctrl + Shift + R** to reload without cached files.

## Current limitations

- Prices are indicative and require seller confirmation.
- Delivery charges are not included in the product subtotal.
- The cart does not reserve stock.
- Online payments are not supported.
- Accounts do not include order history or saved delivery addresses.
- Cart contents are stored in one browser and do not sync across devices or accounts.
- Logging out does not clear the browser's shopping cart.
- Enquiries and orders are not stored in a website database.
- Selecting a preferred contact method does not automatically place a call or send an email.
- The website cannot confirm whether a WhatsApp message was sent.
- Orders are confirmed manually by the seller.

## Images and logo

The business logo has been approved for use in this project. Product photographs are used with permission.

## Project status

The website is published on GitHub Pages and continues to develop as the course progresses.

Recent additions include a separate contact page, an enquiry form, a stall map and Firebase customer account features. Account navigation now reflects whether a customer is logged in.

New changes should be tested locally, committed and synced to GitHub, then checked on the live website.