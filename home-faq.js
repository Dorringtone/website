// Session 10: enhance the visible FAQ with a keyboard-friendly accordion.
(() => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const heading = item.querySelector(".faq-heading");
    const answer = item.querySelector(".faq-answer");
    if (!heading || !answer || !answer.id) return;

    // Real buttons handle clicks, Enter and Space without separate key handlers.
    const question = document.createElement("button");
    question.type = "button";
    question.className = "faq-question";
    question.textContent = heading.textContent;
    question.setAttribute("aria-controls", answer.id);
    question.setAttribute("aria-expanded", "false");

    const icon = document.createElement("span");
    icon.className = "faq-icon";
    icon.setAttribute("aria-hidden", "true");
    question.append(icon);

    question.addEventListener("click", () => {
      const isOpen = answer.hidden;
      answer.hidden = !isOpen;
      question.setAttribute("aria-expanded", String(isOpen));
    });

    heading.replaceChildren(question);
    answer.hidden = true;
  });
})();
