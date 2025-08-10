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

// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


