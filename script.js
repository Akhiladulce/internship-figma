function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  if (evt) {
    evt.currentTarget.classList.add("active");
  } else {
    document.getElementById("defaultTab").classList.add("active");
  }

  document.getElementById(tabName).style.display = "block";

  // API for data fetching
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // Clear previous content
      const tabContent = document.getElementById(tabName);
      tabContent.innerHTML = "";

      // Container for product cards
      const productContainer = document.createElement("div");
      productContainer.classList.add("product-container");
      tabContent.appendChild(productContainer);

      const category = data.categories.find(
        (category) =>
          category.category_name.toLowerCase() === tabName.toLowerCase()
      );

      if (category) {
        category.category_products.forEach((product) => {
          const card = document.createElement("div");
          card.classList.add("product-card");

          card.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          ${
            product.badge_text
              ? `<span class="badge">${product.badge_text}</span>`
              : ""
          }
          <div class="product-info">
            <h2><span class="truncated-title">${product.title}</span></h2>
            <p>• ${product.vendor}</p>
          </div>
          <div class="product-price">
            <p class="price">Rs ${product.price}.00</p>
            <p class="compare-price">${product.compare_at_price}.00</p>
            <p class="discount">${calculateDiscount(
              product.price,
              product.compare_at_price
            )}% off</p>
          </div>
          <button>Add to Cart</button>
        `;
          productContainer.appendChild(card);
        });
      } else {
        console.error("Category not found:", tabName);
      }
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function calculateDiscount(price, comparePrice) {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

window.addEventListener("DOMContentLoaded", function () {
  openTab(null, "Men", true);
});
