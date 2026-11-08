import { requiredText, setUpValidation, textLength } from "./form-validation.js";

const checkoutForm = document.getElementById("checkout-form");
const checkoutFeedback = document.getElementById("checkout-feedback");
const checkoutButton = document.getElementById("checkout-button");

const customerName = document.getElementById("customer-name");
const deliveryLocation = document.getElementById("delivery-location");
const deliveryInstructions = document.getElementById(
  "delivery-instructions"
);

const validate = setUpValidation(checkoutForm, new Map([
  [customerName, requiredText("your name", 80)],
  [deliveryLocation, requiredText("your estate or neighbourhood", 160)],
  [deliveryInstructions, textLength(300)]
]));

checkoutForm.addEventListener("submit", function (event) {
  // Prepare a WhatsApp message instead of submitting to a server.
  event.preventDefault();
  checkoutFeedback.textContent = "";

  if (!validate()) return;

  // Block checkout if a visible cart quantity is invalid.
  const quantityInputs = document.querySelectorAll(
    "#cart-items .cart-quantity"
  );

  for (const input of quantityInputs) {
    if (!input.checkValidity()) {
      checkoutFeedback.textContent =
        "Please correct the cart quantities before continuing.";

      input.reportValidity();
      return;
    }
  }

  try {
    // Save the current visible quantities before preparing the message.
    // This also handles a quantity edited immediately before checkout.
    for (const input of quantityInputs) {
      const id = input.id.replace("quantity-", "");

      CartStore.update(id, input.valueAsNumber);
    }

    const items = CartStore.read();

    if (items.length === 0) {
      checkoutFeedback.textContent =
        "Your cart is empty. Please add a product before continuing.";
      return;
    }

    let subtotal = 0;

    const orderLines = items.map(function (item) {
      const product = products.find(function (entry) {
        return CartStore.productId(entry) === item.id;
      });

      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      return (
        `${product.name}: ${item.quantity} × ${product.unit} ` +
        `at KES ${product.price} each = KES ${lineTotal}`
      );
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
      `Landmark / instructions: ${
        deliveryInstructions.value.trim() || "Not provided"
      }`,
      "",
      "Please confirm availability, delivery coverage, delivery fee,",
      "delivery time, final total and payment arrangements."
    ].join("\n");

    const whatsappUrl =
      "https://wa.me/254755559107?text=" +
      encodeURIComponent(message);

    // Open WhatsApp separately and keep the cart page available.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    checkoutFeedback.textContent =
      "WhatsApp was requested in a new tab. " +
      "If it did not open, allow pop-ups for this website and try again. " +
      "Review your message in WhatsApp and press Send. " +
      "Your cart has been kept.";
  } catch (error) {
    checkoutFeedback.textContent =
      "We could not prepare your order request. " +
      "Please refresh the cart and try again.";
  }
});

// Enable checkout only after its submit handler is ready.
checkoutButton.disabled = false;