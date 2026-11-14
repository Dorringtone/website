# Mama Mboga Fresh

## Run it locally on Windows

1. Extract the ZIP and open its `website` folder in VS Code.
2. Right-click the root `index.html` and select **Open with Live Server**. You can also start a Python server from the `website` folder:

   ```powershell
   py -m http.server 8000
   ```

3. Open <http://localhost:8000/>. Press **Ctrl+C** in the terminal to stop the Python server.

The local server loads the JavaScript modules used by checkout, contact and customer accounts.

## Project folders

| Path | What to edit there |
| --- | --- |
| `pages/` | The eight storefront pages, including the home page at `pages/index.html`. |
| `js/` | Browser scripts for the catalogue, cart, WhatsApp checkout and customer accounts. |
| `css/style.css` | Shared styles, including the sticky header and floating WhatsApp link. |
| `images/`, `logo/`, `fonts/` | Product and hero images, the brand assets and bundled fonts. |
| `documentations/` | Original project diagrams. |
| `index.html` | Entry point for the site root. It opens `pages/index.html`. |

The source comments explain which scripts populate each page, how the forms work and where the main style rules are defined. Edit `js/products-data.js` to update products, units and indicative prices.

## Update your existing GitHub repository

Copy the **contents** of the extracted `website` folder into the root of your existing repository and keep its Git history. If you copy the new folders over an existing checkout, use VS Code to remove the old root-level page HTML files, JavaScript files and `style.css` that have moved. Keep the supplied root `index.html` so GitHub Pages can open the site from `/website/`.

Direct links to the moved pages now use `/website/pages/`, such as `/website/pages/delivery.html`. Review the file moves in Source Control before committing.

## Customer accounts and ordering

The account pages use the original Mama Mboga Fresh Firebase project for login, registration, password reset, email verification and sign-out. Guests can still browse and order. The cart is stored in the browser and prepares an itemised WhatsApp draft. The floating **Chat on WhatsApp** link opens a general enquiry. WhatsApp, Google Maps and Firebase require internet access.
