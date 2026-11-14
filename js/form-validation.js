// Share inline field errors and focus the first invalid field on submission.
// Check only active fields, and tell the visitor where to make corrections.
export function requiredText(label, limit) {
  return field => {
    if (!field.value.trim()) return `Enter ${label}.`;
    return textLength(limit)(field);
  };
}

export function textLength(limit) {
  return field => field.value.length > limit ? `Use ${limit} characters or fewer.` : "";
}

export function emailError(field) {
  if (!field.value.trim()) return "Enter your email address.";
  if (field.validity.typeMismatch) return "Enter an email address in the format name@example.com.";
  return textLength(field.maxLength)(field);
}

export function setUpValidation(form, checks) {
  const summary = document.getElementById(`${form.id}-validation`);

  function setError(field, message) {
    document.getElementById(`${field.id}-error`).textContent = message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  function updateSummary() {
    const invalid = [...checks.keys()].filter(field => field.hasAttribute("aria-invalid"));
    const message = invalid.length === 0 ? ""
      : invalid.length === 1 ? "Please check the highlighted field."
      : `Please check the ${invalid.length} highlighted fields.`;
    if (summary.textContent !== message) summary.textContent = message;
    return invalid[0];
  }

  function reviewErrors() {
    for (const [field, check] of checks) {
      if (field.hasAttribute("aria-invalid")) setError(field, field.disabled ? "" : check(field));
    }
    updateSummary();
  }

  form.addEventListener("input", reviewErrors);
  form.addEventListener("change", reviewErrors);
  form.noValidate = true;

  return function validate(fields = [...checks.keys()]) {
    for (const [field, check] of checks) {
      setError(field, field.disabled || !fields.includes(field) ? "" : check(field));
    }
    const first = updateSummary();
    if (!first) return true;
    first.focus();
    return false;
  };
}
