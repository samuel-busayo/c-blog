document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-inner');
    const slides = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let interval;
  
    // Auto-rotate with smooth transitions
    const startCarousel = () => {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, 5000); // 5-second interval
    };
  
    const updateCarousel = () => {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
  
    // Pause on hover/touch
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', startCarousel);
  
    // Touch support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(interval);
    });
  
    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const threshold = 50; // Minimum swipe distance
      
      if (touchStartX - touchEndX > threshold) {
        // Swipe left - next
        currentIndex = Math.min(currentIndex + 1, slides.length - 1);
      } else if (touchEndX - touchStartX > threshold) {
        // Swipe right - prev
        currentIndex = Math.max(currentIndex - 1, 0);
      }
      
      updateCarousel();
      startCarousel();
    });
  
    startCarousel(); // Initialize
  });

  // Initialize floating labels
document.addEventListener('DOMContentLoaded', function() {
    // Floating label effect
    document.querySelectorAll('.floating input, .floating textarea').forEach(input => {
      // Initialize if already has value
      if (input.value) {
        input.previousElementSibling.classList.add('active');
      }
  
      input.addEventListener('focus', function() {
        this.previousElementSibling.classList.add('active');
      });
  
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.previousElementSibling.classList.remove('active');
        }
      });
    });
  
    // Mobile menu toggle (keep your existing code)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  });


  // Initialize floating labels
document.addEventListener('DOMContentLoaded', function() {
    // Floating label effect
    document.querySelectorAll('.floating input, .floating textarea').forEach(input => {
      // Initialize if already has value
      if (input.value) {
        input.previousElementSibling.classList.add('active');
      }
  
      input.addEventListener('focus', function() {
        this.previousElementSibling.classList.add('active');
      });
  
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.previousElementSibling.classList.remove('active');
        }
      });
    });
  });

  