// Animation

AOS.init({
  duration: 1000,
});

// Scroll Animation Dissappear

const scrollFadeElements = document.querySelectorAll(".scroll-fade");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

scrollFadeElements.forEach((el) => observer.observe(el));

// Icon

feather.replace();

// Toggle class active

const navigation = document.querySelector(".navigation");

// Hamburger menu clicked

document.querySelector("#hamburger-menu").onclick = () => {
  navigation.classList.toggle("active");
};

// Click outside sidebar to close nav

const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navigation.contains(e.target)) {
    navigation.classList.remove("active");
  }
});

// Modal functionality
const modal = document.getElementById("menuModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const closeButton = document.querySelector(".close-button");

document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img").src;
    const title = card.querySelector(".menu-card-title").textContent;
    const price = card.querySelector(".menu-card-price").textContent;

    modalImage.src = img;
    modalTitle.textContent = title;
    modalPrice.textContent = price;

    modal.style.display = "block";
  });
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
