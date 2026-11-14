// Share the same quantity stepper and integer range on product and cart pages.
function setUpQuantity(control, input, onChange) {
  const decrement = control.querySelector('[data-step="-1"]');
  const increment = control.querySelector('[data-step="1"]');
  const minimum = Number(input.min);
  const maximum = Number(input.max);

  function reflectBounds() {
    decrement.disabled = input.valueAsNumber <= minimum;
    increment.disabled = input.valueAsNumber >= maximum;
  }

  // The buttons reuse the input event so manual edits and button clicks run the same validation.
  function changeBy(offset) {
    const number = input.validity.valid ? input.valueAsNumber : (offset > 0 ? minimum - 1 : minimum + 1);
    input.value = Math.min(maximum, Math.max(minimum, number + offset));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    if (document.activeElement?.disabled) input.focus();
  }

  decrement.addEventListener("click", () => changeBy(-1));
  increment.addEventListener("click", () => changeBy(1));
  input.addEventListener("input", () => {
    reflectBounds();
    onChange();
  });
  reflectBounds();
}
