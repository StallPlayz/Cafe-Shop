// Custom Animation-On-Scroll Script
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

// Shopping Cart definition

let shoppingCart = [];

function attachCartButtonListener() {
  const cartBtn = document.getElementById("cartButton");
  if (cartBtn) {
    cartBtn.addEventListener("click", renderShoppingCart);
  }
}
attachCartButtonListener();

window.addEventListener("click", (e) => {
  const cartModal = document.getElementById("cartModal");
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Update Cart Dynamically

document.querySelectorAll(".cart-qty-input").forEach((input) => {
  input.addEventListener("input", (e) => {
    const index = parseInt(e.target.dataset.index);
    const newQty = parseInt(e.target.value);

    if (!isNaN(newQty) && newQty > 0) {
      shoppingCart[index].qty = newQty;
      saveCartToStorage();
      updateCartCount();
      updateCartTotal();
    }
  });

  input.addEventListener("blur", (e) => {
    const index = parseInt(e.target.dataset.index);
    const currentQty = shoppingCart[index].qty;

    if (parseInt(e.target.value) <= 0 || isNaN(parseInt(e.target.value))) {
      e.target.value = currentQty;
      showToast("Quantity must be at least 1", "error");
    }
  });
});

// Shopping Cart Sync Script

function syncCartQuantities() {
  document.querySelectorAll(".cart-qty-input").forEach((input) => {
    const index = parseInt(input.dataset.index);
    const newQty = parseInt(input.value);
    if (newQty > 0) {
      shoppingCart[index].qty = newQty;
    }
  });
  saveCartToStorage();
  updateCartCount();
  updateCartTotal();
}

function updateCartTotal() {
  const total = shoppingCart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return sum + item.qty * price;
  }, 0);
  const formatted = `IDR ${total.toLocaleString("id-ID")}K`;
  const cartTotal = document.getElementById("cartTotal");
  if (cartTotal) cartTotal.textContent = formatted;
}

// --- Persist shoppingCart with localStorage ---

const savedCart = localStorage.getItem("shoppingCart");
if (savedCart) {
  shoppingCart = JSON.parse(savedCart);
  updateCartCount();
}

function saveCartToStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

// Watch all animate elements
document.querySelectorAll(".animate").forEach((el) => {
  observer.observe(el);
});

// Dark/Light mode script

const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  const isLight = theme === "light";

  document.documentElement.classList.toggle("light-mode", isLight);

  // Swap emoji/icon
  themeToggle.textContent = isLight ? "🌙" : "☀️";

  // Save preference
  localStorage.setItem("theme", theme);
}

// Load on page load
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const isCurrentlyLight =
    document.documentElement.classList.contains("light-mode");
  setTheme(isCurrentlyLight ? "dark" : "light");
});

// Icons
feather.replace();

// Toggle hamburger menu
const hamburger = document.getElementById("hamburger-menu");
const navigation = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navigation.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navigation.contains(e.target)) {
    hamburger.classList.remove("active");
    navigation.classList.remove("active");
  }
});

// Toggle navbar transparency based on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - lastScroll < 100) return;
  lastScroll = now;

  const navbar = document.querySelector(".navbar");
  const homeSection = document.querySelector(".home");
  const homeHeight = homeSection.offsetHeight;

  navbar.classList.toggle("transparent", window.scrollY < homeHeight - 100);
});

// Run on page load
window.dispatchEvent(new Event("scroll"));

// Menu search filter
const searchInput = document.getElementById("menuSearchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll(".menu-card").forEach((card) => {
      const title = card
        .querySelector(".menu-card-title")
        .textContent.toLowerCase();
      card.style.display = title.includes(searchTerm) ? "block" : "none";
    });
  });
}

document.querySelector(".filter-buttons").addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    const selectedCategory = e.target.dataset.filter;
    const searchTerm = searchInput.value.toLowerCase();

    document.querySelectorAll(".menu-card").forEach((card) => {
      const title = card
        .querySelector(".menu-card-title")
        .textContent.toLowerCase();
      const category = card.dataset.category;

      const matchesSearch = title.includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      card.style.display = matchesSearch && matchesCategory ? "block" : "none";
    });
  }
});

// Menu modal handling
const modal = document.getElementById("menuModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const closeButton = document.querySelector(".close-button");

document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector(".menu-card-title").textContent;
    const descriptions = {
      Espresso:
        "A bold and rich shot of coffee, perfect for a quick pick-me-up.",
      "Iced Caramel Macchiato Cream":
        "A creamy delight layered with caramel and espresso over ice.",
      "Tiramisu Latte":
        "Inspired by the classic dessert, combining coffee and cocoa in harmony.",
      Americano:
        "Smooth and simple, hot water blended with espresso for a lighter profile.",
      "Croffle with Cinnamon & Honey":
        "Crispy croissant-waffle drizzled with honey and a dash of cinnamon.",
      "Smoked Beef & Egg Sandwich":
        "Savory smoked beef paired with a soft egg on artisan bread.",
      "Truffle Shuffle Fries":
        "Crispy golden fries drizzled with white truffle oil, topped with parmesan shavings and parsley.",
      "Carbonara Rustica":
        "Classic Roman-style carbonara made with crispy pancetta, egg yolk, pecorino romano, and black pepper.",
      "Cheesy Heat Honey Rings":
        "Stuffed crispy rings oozing with melted mozzarella, tossed in honey glaze with crushed red pepper flakes.",
      "Thai Basil Chicken Rolls":
        "Wok-seared chicken, garlic, and Thai basil wrapped in a crisp golden spring roll shell, served with sweet chili sauce",
      "Avocado Zen Toast":
        "Sourdough topped with smashed avocado, poached egg, cherry tomatoes, radish slices, microgreens, and a sprinkle of chili flakes.",
      "Peach Blossom Oolong":
        "Lightly floral oolong tea paired with juicy peach nectar and edible flower petals.",
    };

    modalImage.src = card.querySelector("img").src;
    modalTitle.textContent = title;
    modalPrice.textContent = card.querySelector(".menu-card-price").textContent;
    document.getElementById("modalDesc").textContent =
      descriptions[title] || "A special item crafted just for you.";
    modal.style.display = "block";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Attach Add to Cart button
  const addBtn = document.getElementById("addToCartBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const qty = parseInt(document.getElementById("itemQty").value);
      const title = modalTitle.textContent;
      const price = modalPrice.textContent;

      if (qty > 0) {
        const existing = shoppingCart.find((item) => item.title === title);
        if (existing) {
          existing.qty += qty;
          saveCartToStorage();
        } else {
          shoppingCart.push({ title, price, qty });
          saveCartToStorage();
        }
        updateCartCount();
        modal.style.display = "none";
        showToast(`${title} added to cart!`);
      } else {
        showToast("Please enter a valid quantity.", "error");
      }
    });
  }
});
closeButton.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Toast function
function showToast(message, type = "success") {
  const toast = $("#toast");
  toast
    .removeClass("success error")
    .addClass("show")
    .addClass(type)
    .text(message);
  setTimeout(() => toast.removeClass("show"), 3000);
}

// Contact form submission with EmailJS
function sendMail() {
  const $form = $(".contact form");
  const $btn = $("#btnSubmit");
  const $loading = $("#loading");

  const parms = {
    name: $("#name").val(),
    email: $("#email").val(),
    message: $("#message").val(),
  };

  $loading.show();
  $btn.prop("disabled", true).text("Sending...");

  emailjs
    .send("service_0958elr", "template_ncduz2t", parms)
    .then(() => {
      showToast("Message successfully sent!", "success");
      $form[0].reset();
    })
    .catch(() => {
      showToast("Can't send your message, please try again!", "error");
    })
    .finally(() => {
      $loading.hide();
      $btn.prop("disabled", false).text("Send");
    });
}

// Fill-In-Requierement To Send Function

$(document).ready(function () {
  $(".contact form").on("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    if (this.checkValidity()) {
      sendMail(); // Run only if valid
    } else {
      this.reportValidity(); // Show browser validation message
    }
  });
});

// Shopping Cart Function

function updateCartCount() {
  const countSpan = document.querySelector(".cart-item-count");
  const totalCount = shoppingCart.reduce((sum, item) => sum + item.qty, 0);
  countSpan.textContent = totalCount;
  countSpan.style.visibility = totalCount > 0 ? "visible" : "hidden";
}

function renderShoppingCart() {
  const cartModalHtml = `
    <div id="cartModal" class="modal">
      <div class="modal-content">
        <span class="close-button" id="closeCartBtn">&times;</span>
        <h3>Your Shopping Cart</h3>
        <div id="cartItems"></div>
        <hr style="margin: 1rem 0;" />
        <div class="cart-summary">
          <p><strong>Total:</strong> <span id="cartTotal">IDR 0</span></p>
          <button id="checkoutBtn" class="checkout-btn">Buy Now</button>
        </div>
      </div>
    </div>
  `;

  if (!document.getElementById("cartModal")) {
    document.body.insertAdjacentHTML("beforeend", cartModalHtml);
  }

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = shoppingCart.length
    ? shoppingCart
        .map(
          (item, i) => `
    <div class="cart-item">
      <span>${item.title}</span>
      <input 
        type="number" 
        min="1" 
        value="${item.qty}" 
        class="cart-qty-input" 
        data-index="${i}" 
      />
      <span>${item.price}</span>
      <button onclick="removeFromCart(${i})" class="remove-btn">x</button>
    </div>
  `
        )

        .join("")
    : `<p>Your cart is empty.</p>`;

  updateCartTotal();

  document.getElementById("cartModal").style.display = "block";
  document.getElementById("closeCartBtn").onclick = () => {
    syncCartQuantities();
    document.getElementById("cartModal").style.display = "none";
  };

  document.getElementById("checkoutBtn").onclick = () => {
    if (shoppingCart.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }
    showToast("Checkout not implemented yet!", "success");
  };
}

function removeFromCart(index) {
  shoppingCart.splice(index, 1);
  saveCartToStorage();
  updateCartCount();
  renderShoppingCart();
}
