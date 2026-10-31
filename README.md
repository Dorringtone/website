# Mama Mboga Fresh Website

A web design and development course project for a neighbourhood fruit and vegetable business based at Adams Arcade, Ngong Road, Nairobi.

Customers can browse products, select quantities, build a shopping cart and prepare an order request for WhatsApp.

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
- Business logo displayed as the browser favicon.

## How ordering works

1. Browse the product catalogue.
2. Open a product, select a quantity and add it to the cart.
3. Continue shopping or review the cart.
4. Enter your name and delivery location.
5. Click **Send order request on WhatsApp**.
6. Review the prepared message in WhatsApp and press **Send**.

Opening WhatsApp does not automatically send the message or confirm an order.

The seller confirms availability, delivery coverage, delivery charges, delivery time, the final total and payment arrangements.

## Business information

- **Location:** Adams Arcade, Ngong Road, Nairobi.
- **Phone and WhatsApp:** 0755 559 107.
- **Opening hours:** Monday–Saturday, 8:00 AM–8:00 PM EAT.
- **Sunday:** Closed.
- **Delivery area:** Addresses within a 10 km radius of the stall, subject to location and road-access confirmation.

Delivery coverage is checked manually. The website does not calculate delivery distances or charges automatically.

## Technologies

- **HTML:** Page content and structure.
- **CSS:** Appearance and responsive layouts.
- **JavaScript:** Catalogue pagination, product details, cart and WhatsApp message preparation.
- **localStorage:** Cart storage in the customer's browser.
- **Git and GitHub:** Version control and source storage.
- **GitHub Pages:** Website hosting.

This is a static website with browser-based interactivity. It does not require a database or an application backend.

## Project files

| File or folder | Purpose |
|---|---|
| `index.html` | Home page |
| `products.html` | Product catalogue page |
| `product.html` | Individual product details page |
| `cart.html` | Shopping cart and delivery form |
| `style.css` | Shared website styling |
| `products-data.js` | Shared product catalogue and prices |
| `products.js` | Product cards and pagination |
| `product.js` | Product details, quantity selection and suggestions |
| `cart-store.js` | Shared browser cart storage |
| `cart.js` | Cart display, quantity updates and subtotal |
| `checkout.js` | Delivery validation and WhatsApp checkout |
| `images/` | Product photographs |
| `logo/` | Business logo |
| `README.md` | Project overview and instructions |

## Run locally

You need Python installed to use the following preview method.

1. Open the `website` folder in VS Code.
2. Open a terminal in that folder.
3. Run:

   ```powershell
   py -m http.server 8000
   ```

4. Open this address in your browser:

   http://localhost:8000

Keep the terminal running while previewing the website. Press **Ctrl + C** in the terminal to stop the server.

Use the local server when testing the cart so pages share browser storage consistently.

The published GitHub Pages website works independently of this local server.

## Testing

Manual checks performed during development include:

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

## Current limitations

- Prices are indicative and require seller confirmation.
- Delivery charges are not included in the product subtotal.
- The cart does not reserve stock.
- There are no customer accounts or online payments.
- Cart contents are stored in one browser and do not sync across devices.
- The website cannot confirm whether a WhatsApp message was sent.
- Orders are confirmed manually by the seller.

## Images and logo

The business logo has been approved for use in this project. Product photographs are used with permission.

## Project status

The first version is published. The project will be improved as the course progresses and feedback is received.