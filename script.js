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

// Floating Menu Functionality
const floatingMenu = document.getElementById('floatingMenu');
const menuItems = document.querySelectorAll('.menu-item');

// Section highlighting based on scroll position
const sections = document.querySelectorAll('section[id], header[id]');
const sectionObserverOptions = {
    threshold: 0.3,
    rootMargin: '-50px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            updateActiveMenuItem(sectionId);
        }
    });
}, sectionObserverOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

function updateActiveMenuItem(sectionId) {
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
}

// Menu item click handlers
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.dataset.section;
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            // Update active state
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            item.classList.add('active');
            
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    });
});

// Show/hide floating menu based on screen size
function toggleFloatingMenu() {
    // Floating menu is now hidden on mobile devices
    if (window.innerWidth <= 768) {
        floatingMenu.classList.remove('show');
    } else {
        floatingMenu.classList.remove('show');
    }
}

// Initial check and resize listener
toggleFloatingMenu();
window.addEventListener('resize', toggleFloatingMenu);

// Handle scroll to update active menu item
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveMenuItem(section.getAttribute('id'));
            }
        });
    }, 50);
});