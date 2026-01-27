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

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

window.addEventListener("scroll", function() {
    var nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);
});

const revealAbilities = () => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealAbilities);
revealAbilities();

reveal();

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