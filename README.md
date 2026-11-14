# Mama Mboga Fresh

This folder contains the static storefront deployed for the private Mama Mboga Fresh site. The original project diagrams are in `documentations/`.

## Run it locally on Windows

1. Extract the ZIP into a separate location so you can preview this version alongside your existing project.
2. Open the extracted `website` folder in VS Code.
3. If you use Live Server, right-click `index.html` and select **Open with Live Server**. Or open a terminal in the `website` folder and run:

   ```powershell
   py -m http.server 8000
   ```

   Then open <http://localhost:8000/> in your browser. This command requires Python. Press **Ctrl+C** in the terminal to stop the server.

Use the local server for the cart and Contact forms because they load JavaScript modules.

## Edit the site

- `products-data.js` contains the 21 products, selling units, indicative prices and descriptions.
- `style.css` controls the responsive layout and styling. Fonts are bundled in `fonts/`.
- `images/market-basket.webp` is the home-page hero image and `logo/brand.webp` is the optimised brand image.

The cart is stored in the current browser. Checkout opens an itemised WhatsApp draft for the stall to confirm availability, delivery and the final total. The customer can shop as a guest. WhatsApp and Google Maps require internet access.

## Customer accounts

The site's `log-in.html` and `register.html` pages use the original Mama Mboga Fresh Firebase Authentication project. Customer accounts support email and password login, registration, password reset, email verification and sign-out. These features require internet access. The checkout remains available to guests.

When moving these files into your existing GitHub checkout, copy the **contents** of the extracted `website` folder into the repository root. Keep your repository's Git history. The account pages and their JavaScript files belong alongside `index.html`.
