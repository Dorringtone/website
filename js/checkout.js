// Validate the cart and delivery fields before composing a WhatsApp draft.
import { requiredText, setUpValidation, textLength } from "./form-validation.js";

const checkoutForm = document.getElementById("checkout-form");
const checkoutFeedback = document.getElementById("checkout-feedback");
const checkoutButton = document.getElementById("checkout-button");
const checkoutLink = document.getElementById("checkout-link");
const customerName = document.getElementById("customer-name");
const deliveryLocation = document.getElementById("delivery-location");
const deliveryInstructions = document.getElementById("delivery-instructions");

const validate = setUpValidation(checkoutForm, new Map([
  [customerName, requiredText("your name", 80)],
  [deliveryLocation, requiredText("your estate or neighbourhood", 160)],
  [deliveryInstructions, textLength(300)]
]));

// Discard the previous draft whenever a quantity or delivery detail changes.
function clearPreparedOrder() {
  checkoutLink.hidden = true;
  checkoutLink.removeAttribute("href");
  checkoutFeedback.classList.remove("feedback-error");
  checkoutFeedback.textContent = "";
}

function checkoutError(message) {
  checkoutFeedback.classList.add("feedback-error");
  checkoutFeedback.textContent = message;
}

checkoutForm.addEventListener("input", clearPreparedOrder);
document.getElementById("cart-items").addEventListener("input", clearPreparedOrder);
document.addEventListener("cartchange", clearPreparedOrder);
window.addEventListener("storage", (event) => {
  if (event.key === CartStore.key || event.key === null) clearPreparedOrder();
});

// Read the latest saved cart before validating and building the message.
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearPreparedOrder();

  try {
    const items = CartStore.read();
    if (items.length === 0) {
      checkoutError("Your cart is empty. Add some produce before continuing.");
      document.getElementById("continue-shopping").focus();
      return;
    }

    const invalidQuantity = document.querySelector("#cart-items .cart-quantity:invalid");
    if (invalidQuantity) {
      checkoutError("Correct the cart quantities before continuing.");
      invalidQuantity.reportValidity();
      return;
    }

    if (!validate()) return;

    let subtotal = 0;
    const orderLines = items.map((item) => {
      const product = products.find((entry) => CartStore.productId(entry) === item.id);
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;
      return `${product.name}: ${item.quantity} × ${product.unit} at KES ${product.price} each = KES ${lineTotal}`;
    });

    const message = [
      "Hello Mama Mboga Fresh, I would like to request an order:",
      "",
      ...orderLines,
      "",
      `Estimated product subtotal: KES ${subtotal}`,
      "Delivery fee: To be confirmed",
      "",
      `Name: ${customerName.value.trim()}`,
      `Location: ${deliveryLocation.value.trim()}`,
      `Landmark / instructions: ${deliveryInstructions.value.trim() || "Not provided"}`,
      "",
      "Please confirm availability, delivery coverage, the delivery fee and time, the final total and payment arrangements."
    ].join("\n");

    // Encode the draft as a query parameter so WhatsApp receives the original punctuation and line breaks.
    const url = new URL("https://wa.me/254755559107");
    url.searchParams.set("text", message);
    checkoutLink.href = url.href;
    checkoutLink.hidden = false;
    window.open(url.href, "_blank", "noopener,noreferrer");
    checkoutFeedback.textContent = "Your order is ready to review in WhatsApp. If the tab did not open, use the link below.";
  } catch {
    checkoutError("Could not prepare your order. Check that browser storage is available and try again.");
  }
});

checkoutButton.disabled = false;
