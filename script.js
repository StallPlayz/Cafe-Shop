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
