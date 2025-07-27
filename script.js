// Initialize AOS animation
AOS.init({ duration: 1000, once: true });

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
  $btn.prop("disabled", true).text("Mengirim...");

  emailjs
    .send("service_0958elr", "template_ncduz2t", parms)
    .then(() => {
      showToast("Pesan berhasil dikirim!", "success");
      $form[0].reset();
    })
    .catch(() => {
      showToast("Gagal mengirim pesan. Silakan coba lagi.", "error");
    })
    .finally(() => {
      $loading.hide();
      $btn.prop("disabled", false).text("kirim pesan");
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