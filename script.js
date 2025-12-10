// Theme toggle
const body = document.body;
const toggleBtn = document.querySelector(".theme-toggle");
const toggleIcon = document.querySelector(".theme-toggle-icon");

const THEME_KEY = "jt_theme";

function setTheme(theme) {
  if (theme === "light") {
    body.classList.add("theme-light");
    body.classList.remove("theme-dark");
    if (toggleIcon) toggleIcon.textContent = "☀";
  } else {
    body.classList.add("theme-dark");
    body.classList.remove("theme-light");
    if (toggleIcon) toggleIcon.textContent = "☾";
  }
  localStorage.setItem(THEME_KEY, theme);
}

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const current = body.classList.contains("theme-light") ? "light" : "dark";
    setTheme(current === "light" ? "dark" : "light");
  });
}

// IntersectionObserver to reveal sections
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// Active nav link on scroll
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let currentId = "";
  const sections = document.querySelectorAll("main section[id]");

  const scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const hrefId = link.getAttribute("href").slice(1);
    if (hrefId === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Smooth scroll for nav links (for older browsers)
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        window.scrollTo({
          top: targetEl.offsetTop - 72,
          behavior: "smooth",
        });
      }
    }
  });
});

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
