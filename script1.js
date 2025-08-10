// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // MODAL HANDLERS
  document.querySelectorAll(".hero-card").forEach(card => {
    card.addEventListener("click", () => {
      const section = card.closest("section");
      const heroClass = Array.from(section.classList).find(cls => cls.includes('-section'));
      const hero = heroClass.split("-")[0]; // e.g., "ironman"
      
      const modal = document.getElementById(`${hero}-modal`);
      if (modal) {
        modal.style.display = "flex";
        // Focus trap for accessibility
        modal.querySelector('input').focus();
      }
    });
    
    // Add keyboard navigation
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    
    // Make cards focusable
    card.setAttribute('tabindex', '0');
  });

  // Close modal handlers
  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
    
    // Close modal with Escape key
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modal);
      }
    });
  });

  // Form submission handlers
  document.querySelectorAll(".modal form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const name = form.querySelector('input[type="text"]').value;
      const review = form.querySelector('textarea').value;
      const heroName = form.closest('.modal').querySelector('h2').textContent.split(' ').pop().replace('?', '');
      
      if (name.trim() && review.trim()) {
        // Success animation
        const modal = form.closest('.modal');
        const modalContent = modal.querySelector('.modal-content');
        
        // Show success message
        showSuccessMessage(modalContent, heroName, name, review);
        
        // Reset form
        form.reset();
        
        // Close modal after delay
        setTimeout(() => {
          closeModal(modal);
        }, 3000);
      }
    });
  });

  // Function to close modal with animation
  function closeModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8) translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modal.style.display = "none";
      modalContent.style.transform = 'scale(1) translateY(0)';
      modalContent.style.opacity = '1';
    }, 300);
  }

  // Function to show success message
  function showSuccessMessage(modalContent, heroName, name, review) {
    const originalHTML = modalContent.innerHTML;
    
    modalContent.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h2 style="color: #4ade80; margin-bottom: 20px;">🎉 Thank You!</h2>
        <p style="margin-bottom: 15px;">Hi <strong>${name}</strong>,</p>
        <p style="margin-bottom: 15px;">Your review for <strong>${heroName}</strong> has been submitted!</p>
        <p style="font-style: italic; color: #ffd700;">"${review.substring(0, 100)}${review.length > 100 ? '...' : ''}"</p>
        <div style="margin-top: 20px;">
          <div class="success-animation">✓</div>
        </div>
      </div>
      <style>
        .success-animation {
          font-size: 3rem;
          color: #4ade80;
          animation: bounce 1s ease-in-out;
        }
        @keyframes bounce {
          0%, 20%, 60%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          80% { transform: translateY(-5px); }
        }
      </style>
    `;
    
    // Restore original content after delay
    setTimeout(() => {
      modalContent.innerHTML = originalHTML;
      // Re-attach event listeners to new elements
      attachModalEventListeners(modalContent);
    }, 2500);
  }

  // Re-attach event listeners after content change
  function attachModalEventListeners(modalContent) {
    const closeBtn = modalContent.querySelector('.close-btn');
    const form = modalContent.querySelector('form');
    
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(modalContent.closest('.modal'));
      });
    }
    
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Handle form submission (same logic as above)
      });
    }
  }

  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".scroll-reveal");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Continue observing for re-triggering if element goes out of view
      } else {
        // Optional: Remove visible class when element is out of view
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    observer.observe(el);
  });

  // BACKGROUND REVEAL ANIMATIONS
  const bgSections = document.querySelectorAll(".bg-reveal");
  
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  bgSections.forEach(section => {
    bgObserver.observe(section);
  });

  // NAVBAR SCROLL EFFECT
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    
    // Clear timeout if it exists
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // Add scrolled class immediately
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    
    // Debounce for performance
    scrollTimeout = setTimeout(() => {
      // Any additional scroll-based actions
    }, 100);
  });

  // SMOOTH SCROLLING FOR NAVIGATION LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 70; // Account for navbar height
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // KEYBOARD NAVIGATION
  document.addEventListener('keydown', (e) => {
    // Close modal with Escape key (global handler)
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal[style*="flex"]');
      if (openModal) {
        closeModal(openModal);
      }
    }
  });

  // PRELOAD IMAGES FOR BETTER PERFORMANCE
  function preloadImages() {
    const imageUrls = [
      'assets/images/Avengers-Logo.png',
      'assets/images/IronMan.png',
      'assets/images/CaptainAmerica.png',
      'assets/images/Hulk.png',
      'assets/images/Thor.png',
      'assets/images/marvel-logo.png'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }
  
  // Call preload function
  preloadImages();

  // ADD LOADING STATES
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.alt = 'Image could not be loaded';
      this.style.opacity = '0.5';
    });
    
    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });

  // PERFORMANCE OPTIMIZATION
  // Throttle scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply throttling to scroll events
  const throttledScroll = throttle(() => {
    // Any scroll-based animations or calculations
  }, 16); // ~60fps

  window.addEventListener('scroll', throttledScroll);

  // ERROR HANDLING
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add user-friendly error messages here
  });

  // LOG SUCCESSFUL INITIALIZATION
  console.log('Marvel Universe website initialized successfully! 🚀');
});

// ADDITIONAL UTILITY FUNCTIONS

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to animate number counting (for future stats section)
function animateNumber(element, start, end, duration) {
  const startTimestamp = performance.now();
  
  function step(timestamp) {
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

// Export functions for global use (if needed)
window.MarvelUtils = {
  isInViewport,
  animateNumber
};