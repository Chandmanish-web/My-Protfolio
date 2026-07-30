const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const hireBtn = document.getElementById("hireBtn");
const contactModal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close");
const floatingMenu = document.getElementById('floatingMenu');
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('section[id], header[id]');

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}

if (themeToggle && themeIcon) {
    const storedTheme = localStorage.getItem('portfolio-theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const reveals = document.querySelectorAll('.reveal');
revealItems();

function revealItems() {
    reveals.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => observer.observe(counter));

function animateCounter(counter) {
    const target = Number(counter.getAttribute('data-target'));
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            counter.textContent = target + (target === 100 ? '%' : '');
            clearInterval(timer);
            return;
        }
        counter.textContent = Math.floor(start) + (target === 100 ? '%' : '');
    }, stepTime);
}

if (hireBtn && contactModal) {
    hireBtn.addEventListener("click", function(e) {
        e.preventDefault();
        contactModal.style.display = "block";
    });
}

if (closeBtn && contactModal) {
    closeBtn.addEventListener("click", function() {
        contactModal.style.display = "none";
    });
}

window.addEventListener("click", function(event) {
    if (contactModal && event.target === contactModal) {
        contactModal.style.display = "none";
    }
});

function updateActiveMenuItem(sectionId) {
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
}

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

sections.forEach(section => {
    sectionObserver.observe(section);
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.dataset.section;
        const targetSection = document.getElementById(sectionId);

        if (targetSection) {
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            item.classList.add('active');
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    });
});

function toggleFloatingMenu() {
    if (floatingMenu) {
        floatingMenu.classList.remove('show');
    }
}

toggleFloatingMenu();
window.addEventListener('resize', toggleFloatingMenu);

let scrollTimeout;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }

    if (backToTop) {
        backToTop.classList.toggle('show', scrollTop > 400);
    }

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

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}