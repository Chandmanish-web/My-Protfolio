// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function() {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Enhanced Reveal Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add staggered animation to edu-cards
const eduCards = document.querySelectorAll('.edu-card');
eduCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Add staggered animation to project cards
const projectCards = document.querySelectorAll('.p-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.12}s`;
});

const hireBtn = document.getElementById("hireBtn");
const contactModal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close");

hireBtn.addEventListener("click", function(e) {
    e.preventDefault();
    contactModal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
    contactModal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === contactModal) {
        contactModal.style.display = "none";
    }
});