const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mainNav.classList.remove("is-open");
    });
  });
}

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const courseCards = [...document.querySelectorAll(".course-card[data-category]")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    courseCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = (() => {
  try { return localStorage.getItem("manjus-theme"); } catch { return null; }
})();
if (savedTheme === "night") document.body.classList.add("is-night");

function updateThemeButton() {
  const isNight = document.body.classList.contains("is-night");
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", isNight ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.querySelector(".theme-icon").textContent = isNight ? "☼" : "◐";
  }
}
updateThemeButton();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("is-night");
    const next = document.body.classList.contains("is-night") ? "night" : "light";
    try { localStorage.setItem("manjus-theme", next); } catch {}
    updateThemeButton();
  });
}

const galleryImages = {
  classroom: {
    src: "assets/classroom-illustration.svg",
    alt: "Illustration of an empty coaching classroom with desks and a learning board",
    label: "01 / LEARNING SPACE",
    title: "Focus starts here."
  },
  building: {
    src: "assets/building-illustration.svg",
    alt: "Illustration of a coaching centre exterior",
    label: "02 / MYSURU CENTRE",
    title: "Meet us on Ramavilas Road."
  }
};
const galleryDialog = document.querySelector("#gallery-dialog");
const dialogImage = document.querySelector("#dialog-image");

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = galleryImages[button.dataset.gallery];
    if (!image || !galleryDialog || typeof galleryDialog.showModal !== "function") return;
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    document.querySelector("#dialog-label").textContent = image.label;
    document.querySelector("#dialog-title").textContent = image.title;
    galleryDialog.showModal();
  });
});

document.querySelector(".dialog-close")?.addEventListener("click", () => galleryDialog.close());
galleryDialog?.addEventListener("click", (event) => {
  if (event.target === galleryDialog) galleryDialog.close();
});

const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");
const progressBar = document.querySelector("#scroll-progress-bar");

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + "%";
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  backToTop?.classList.toggle("is-visible", window.scrollY > 500);
}
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.querySelector("#year").textContent = new Date().getFullYear();

const tiltCard = document.querySelector("[data-tilt]");
if (tiltCard && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  tiltCard.addEventListener("pointermove", (event) => {
    const bounds = tiltCard.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltCard.style.transform = "perspective(950px) rotateY(" + (x * 3) + "deg) rotateX(" + (y * -3) + "deg)";
  });
  tiltCard.addEventListener("pointerleave", () => { tiltCard.style.transform = ""; });
}
