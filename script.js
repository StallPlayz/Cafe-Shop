// Custom Animation-On-Scroll Script
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,
});

// Watch all animate elements
document.querySelectorAll('.animate').forEach(el => {
  observer.observe(el);
});

// Dark/Light mode script

const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector("i");

function setTheme(theme) {
  if (theme === "light") {
    document.documentElement.classList.add("light-mode");
    icon.setAttribute("data-feather", "moon");
  } else {
    document.documentElement.classList.remove("light-mode");
    icon.setAttribute("data-feather", "sun");
  }
  feather.replace(); // update icon
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeToggle.addEventListener("click", (e) => {
  e.preventDefault();
  const current = document.documentElement.classList.contains("light-mode") ? "light" : "dark";
  const newTheme = current === "light" ? "dark" : "light";
  setTheme(newTheme);
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
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const homeSection = document.querySelector(".home");

  const homeHeight = homeSection.offsetHeight;
  const scrollY = window.scrollY;

  if (scrollY < homeHeight - 100) {
    navbar.classList.add("transparent");
  } else {
    navbar.classList.remove("transparent");
  }
});

// Run on page load
window.dispatchEvent(new Event('scroll'));

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

// Menu modal handling
const modal = document.getElementById("menuModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const closeButton = document.querySelector(".close-button");

document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalImage.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector(".menu-card-title").textContent;
    modalPrice.textContent = card.querySelector(".menu-card-price").textContent;
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
