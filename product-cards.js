function productLink(product) {
  return `product.html?id=${encodeURIComponent(CartStore.productId(product))}`;
}

function productCard(product, headingTag, lazy = true) {
  const card = document.createElement("article");
  card.className = "product-card";
  const link = document.createElement("a");
  link.className = "product-card-link";
  link.href = productLink(product);

  const photo = document.createElement("div");
  photo.className = "card-photo";
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.width = 420;
  image.height = 290;
  image.loading = lazy ? "lazy" : "eager";
  photo.append(image);

  const content = document.createElement("div");
  content.className = "card-copy";
  const category = document.createElement("p");
  category.className = "eyebrow";
  category.textContent = product.category;
  const heading = document.createElement(headingTag);
  heading.textContent = product.name;
  const price = document.createElement("p");
  price.className = "card-price";
  const amount = document.createElement("strong");
  amount.textContent = `KES ${product.price}`;
  price.append(amount, ` / ${product.unit}`);
  const arrow = document.createElement("span");
  arrow.className = "card-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  content.append(category, heading, price, arrow);
  link.append(photo, content);
  link.setAttribute("aria-label", `View ${product.name}, KES ${product.price} per ${product.unit}`);
  card.append(link);
  return card;
}
