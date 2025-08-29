// Open modal
// FORM MODAL HANDLERS
document.querySelectorAll(".hero-card").forEach(card => {
  card.addEventListener("click", () => {
    const hero = card.closest("section").classList[1].split("-")[0]; // e.g., "ironman"
    document.getElementById(`${hero}-modal`).style.display = "flex";
  });
});

document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

const revealElements = document.querySelectorAll(".scroll-reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // once visible, stop observing
    }
  });
}, {
  threshold: 0.2 // trigger when 20% visible
});

revealElements.forEach(el => {
  observer.observe(el);
});

const bgSections = document.querySelectorAll(".bg-reveal");

const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      bgObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3
});

bgSections.forEach(section => {
  bgObserver.observe(section);
});

// Smooth scroll and active link highlight
const links = document.querySelectorAll('nav ul li a');
const indicator = document.querySelector('.nav-indicator');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        // Smooth scroll for internal links
        const href = this.getAttribute('href');

        // Only for internal links that exist on this page
        if(href.startsWith('#') && document.querySelector(href)) {
            e.preventDefault();
            const section = document.querySelector(href);
            section.scrollIntoView({behavior: 'smooth'});

            // Update URL without page jump
            history.pushState(null, null, href);
        }

        // Active link update
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Move indicator under active link
        indicator.style.width = this.offsetWidth + 'px';
        indicator.style.left = this.offsetLeft + 'px';
    });
});

// Initialize indicator on page load
window.addEventListener('load', () => {
    const active = document.querySelector('nav ul li a.active');
    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.left = active.offsetLeft + 'px';
});

// Update indicator on window resize
window.addEventListener('resize', () => {
    const active = document.querySelector('nav ul li a.active');
    indicator.style.width = active.offsetWidth + 'px';
    indicator.style.left = active.offsetLeft + 'px';
});



