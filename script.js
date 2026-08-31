const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const typingText = document.getElementById("typingText");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const cursorGlow = document.querySelector(".cursor-glow");

const roles = ["React", "Node.js", "Python", "beautiful interfaces", "practical products"];
let roleIndex = 0;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

function setTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");
  localStorage.setItem("portfolio-theme", theme);
  if (themeIcon) {
    themeIcon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

function initTheme() {
  const storedTheme = localStorage.getItem("portfolio-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = storedTheme || (prefersLight ? "light" : "dark");
  setTheme(theme);
}

function toggleMobileMenu() {
  hamburger?.classList.toggle("active");
  navLinks?.classList.toggle("open");
}

function closeMobileMenu() {
  hamburger?.classList.remove("active");
  navLinks?.classList.remove("open");
}

function typeRole() {
  if (!typingText) return;
  typingText.textContent = roles[roleIndex];
  roleIndex = (roleIndex + 1) % roles.length;
}

function initTypingEffect() {
  typeRole();
  setInterval(typeRole, 1800);
}

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

function initProjectFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;
        card.style.display = shouldShow ? "flex" : "none";
      });
    });
  });
}

function initFormHandling() {
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "there";
    const email = formData.get("email")?.toString().trim() || "";
    const project = formData.get("project")?.toString().trim() || "portfolio discussion";
    const message = formData.get("message")?.toString().trim() || "";

    if (!email || !message) {
      formStatus.textContent = "Please add your email and a short message.";
      return;
    }

    const mailtoLink = `mailto:manish2003ban@gmail.com?subject=${encodeURIComponent(`Portfolio contact from ${name} • ${project}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject: ${project}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    form.reset();
    formStatus.textContent = "Thanks! Your email app should open with a prefilled message.";
  });
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (backToTop) {
    backToTop.style.opacity = scrollTop > 360 ? "1" : "0";
    backToTop.style.pointerEvents = scrollTop > 360 ? "auto" : "none";
  }
}

function initCursorGlow() {
  if (!cursorGlow || prefersReducedMotion || isCoarsePointer) {
    if (cursorGlow) cursorGlow.style.display = "none";
    return;
  }

  let frameId = null;

  const updateGlow = (event) => {
    if (frameId) return;

    frameId = requestAnimationFrame(() => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
      frameId = null;
    });
  };

  window.addEventListener("mousemove", updateGlow, { passive: true });
}

hamburger?.addEventListener("click", toggleMobileMenu);

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

themeToggle?.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light-theme");
  setTheme(isLight ? "dark" : "light");
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMobileMenu();
});

initTheme();
initTypingEffect();
initRevealObserver();
initProjectFilters();
initFormHandling();
initCursorGlow();
updateScrollProgress();