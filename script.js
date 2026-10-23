const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    mainNav.classList.toggle("is-open", !open);
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mainNav.classList.remove("is-open");
    });
  });
}

const modeCopy = {
  classroom: {
    heading: "A focused classroom routine.",
    description: "Learn with a structured schedule, classroom guidance and regular practice at the Mysuru centre.",
    number: "01",
    label: "CLASSROOM COURSES",
    line: "Learn together, in person"
  },
  online: {
    heading: "Live learning, wherever you are.",
    description: "Join interactive online lessons with recorded playback, online tests and live mentor support.",
    number: "02",
    label: "LIVE ONLINE COURSES",
    line: "Study with flexible access"
  },
  placement: {
    heading: "Skills for your next role.",
    description: "Build aptitude, communication and interview confidence for campus drives and career opportunities.",
    number: "03",
    label: "PLACEMENT TRAINING",
    line: "Prepare for the workplace"
  }
};
const modeTabs = [...document.querySelectorAll(".mode-tab")];
modeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const content = modeCopy[tab.dataset.mode];
    if (!content) return;
    modeTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.setAttribute("tabindex", active ? "0" : "-1");
    });
    document.querySelector("#mode-heading").textContent = content.heading;
    document.querySelector("#mode-description").textContent = content.description;
    document.querySelector("#focus-number").textContent = content.number;
    document.querySelector("#focus-label").textContent = content.label;
    document.querySelector("#focus-line").textContent = content.line;
  });
});
modeTabs.forEach((tab, index) => {
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft","ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = modeTabs[(index + direction + modeTabs.length) % modeTabs.length];
    next.focus();
    next.click();
  });
});

const filterButtons = [...document.querySelectorAll("[data-program-filter]")];
const programmeCards = [...document.querySelectorAll(".programme-card")];
const programmeSearch = document.querySelector("#programme-search");
const filterStatus = document.querySelector("#filter-status");
const noResults = document.querySelector("#no-results");
let activeProgramFilter = "all";

function updateProgrammes() {
  const query = (programmeSearch?.value || "").trim().toLowerCase();
  let visible = 0;
  programmeCards.forEach((card) => {
    const modeMatches = activeProgramFilter === "all" || card.dataset.programMode === activeProgramFilter;
    const textMatches = !query || (card.dataset.search + " " + card.textContent).toLowerCase().includes(query);
    const show = modeMatches && textMatches;
    card.hidden = !show;
    if (show) visible += 1;
  });
  if (filterStatus) filterStatus.textContent = "Showing " + visible + (visible === 1 ? " programme" : " programmes");
  if (noResults) noResults.hidden = visible !== 0;
}
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeProgramFilter = button.dataset.programFilter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    updateProgrammes();
  });
});
programmeSearch?.addEventListener("input", updateProgrammes);

const examSearch = document.querySelector("#exam-search");
const examChips = [...document.querySelectorAll(".exam-chip")];
const examEmpty = document.querySelector("#exam-empty");
examSearch?.addEventListener("input", () => {
  const query = examSearch.value.trim().toLowerCase();
  let visible = 0;
  examChips.forEach((chip) => {
    const show = !query || chip.dataset.exam.includes(query) || chip.textContent.toLowerCase().includes(query);
    chip.hidden = !show;
    if (show) visible += 1;
  });
  if (examEmpty) examEmpty.hidden = visible !== 0;
});

const resultStories = [
  { name: "Kumar Swamy", exam: "RRB NTPC", outcome: "Selected for Indian Railways" },
  { name: "Rahul", exam: "IBPS PO", outcome: "Selected for an IBPS Bank role" },
  { name: "Suresh", exam: "SBI PO", outcome: "Selected for State Bank of India" },
  { name: "Vikram", exam: "SSC CGL", outcome: "Selected for Central Government service" },
  { name: "Priya", exam: "SBI Clerk", outcome: "Selected for State Bank of India" },
  { name: "Anita", exam: "IBPS Clerk", outcome: "Selected for an IBPS Bank role" },
  { name: "Deepa", exam: "RRB NTPC", outcome: "Selected for Indian Railways" },
  { name: "Amit", exam: "RRB NTPC", outcome: "Selected for Indian Railways" },
  { name: "Karthik", exam: "IBPS SO", outcome: "Selected as a Specialist Officer" },
  { name: "Ramesh", exam: "Railways", outcome: "Selected for Indian Railways" }
];
let resultOffset = 0;
const resultGrid = document.querySelector("#result-grid");
const resultsRange = document.querySelector("#results-range");
function renderResults() {
  if (!resultGrid) return;
  const visible = resultStories.slice(resultOffset, resultOffset + 3);
  resultGrid.innerHTML = visible.map((story) => {
    const initials = story.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("");
    return '<article class="result-card"><div class="result-card-top"><span class="result-initial" aria-hidden="true">' + initials + '</span><div><h3>' + story.name + '</h3><small>' + story.exam + '</small></div></div><p class="result-outcome"><strong>' + story.outcome + '</strong></p></article>';
  }).join("");
  if (resultsRange) resultsRange.textContent = "Stories " + (resultOffset + 1) + "–" + Math.min(resultOffset + visible.length, resultStories.length) + " of " + resultStories.length;
}
document.querySelector("#results-prev")?.addEventListener("click", () => {
  resultOffset = (resultOffset - 3 + resultStories.length) % resultStories.length;
  renderResults();
});
document.querySelector("#results-next")?.addEventListener("click", () => {
  resultOffset = (resultOffset + 3) % resultStories.length;
  renderResults();
});
renderResults();

const testimonials = [
  { name: "Jayasurya B.R.", course: "Banking student", initials: "JB", quote: "Jayasurya says the teaching makes topics easier to understand and keeps learning enjoyable." },
  { name: "Stan Avil", course: "Railways aspirant", initials: "SA", quote: "Stan highlights the clear, simplified methods that helped make mathematics feel more manageable." },
  { name: "Poorvika", course: "SSC student", initials: "P", quote: "Poorvika describes the classes as engaging and says the practical shortcuts helped build confidence in maths." },
  { name: "Rajeshwari M P Gowda", course: "MBA entrance candidate", initials: "RG", quote: "Rajeshwari appreciates the step-by-step explanations, subject knowledge and encouragement from her teacher." }
];
let testimonialIndex = 0;
function renderTestimonial() {
  const entry = testimonials[testimonialIndex];
  if (!entry) return;
  document.querySelector("#testimonial-quote").textContent = entry.quote;
  document.querySelector("#testimonial-name").textContent = entry.name;
  document.querySelector("#testimonial-course").textContent = entry.course;
  document.querySelector("#testimonial-avatar").textContent = entry.initials;
  document.querySelector("#testimonial-count").textContent = String(testimonialIndex + 1).padStart(2,"0") + " / " + String(testimonials.length).padStart(2,"0");
}
document.querySelector("#testimonial-prev")?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});
document.querySelector("#testimonial-next")?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});
renderTestimonial();

const counterObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const number = entry.target;
    const target = Number(number.dataset.count);
    const suffix = number.dataset.suffix || "";
    const duration = 900;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      number.textContent = value.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    observer.unobserve(number);
  });
}, { threshold: .5 }) : null;
document.querySelectorAll("[data-count]").forEach((number) => {
  if (counterObserver) counterObserver.observe(number);
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
  }, { threshold: .1 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const backToTop = document.querySelector(".back-to-top");
const progressBar = document.querySelector("#scroll-progress-bar");
function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + "%";
  document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 12);
  backToTop?.classList.toggle("is-visible", window.scrollY > 520);
}
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.querySelector("#year").textContent = new Date().getFullYear();

const enquiryForm = document.querySelector("#enquiry-form");
enquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  const values = new FormData(enquiryForm);
  const message = [
    "Hello Manju's Classes, I'd like to know more.",
    "Name: " + values.get("name"),
    "Phone: " + values.get("phone"),
    "Interested in: " + values.get("programme"),
    "Message: " + (values.get("message") || "Please share current details.")
  ].join("\n");
  window.open("https://wa.me/919606060730?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  document.querySelector("#form-status").textContent = "Your enquiry is ready to send in WhatsApp.";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    programmeSearch?.focus();
  }
});
