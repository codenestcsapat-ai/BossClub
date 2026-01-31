// BossClub - Main JavaScript

// Navigation
class Navigation {
  constructor() {
    this.nav = document.querySelector('.navigation');
    this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.init();
  }

  init() {
    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    if (this.mobileMenuBtn && this.mobileMenu) {
      this.mobileMenuBtn.addEventListener('click', () => {
        this.mobileMenu.classList.toggle('active');
        const icon = this.mobileMenuBtn.querySelector('svg');
        if (this.mobileMenu.classList.contains('active')) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
      });

      // Close mobile menu when clicking a link
      const mobileLinks = this.mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.mobileMenu.classList.remove('active');
        });
      });
    }
  }
}

// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );
    this.init();
  }

  init() {
    const elements = document.querySelectorAll('.stat-card, .service-card, .testimonial-card, .mentor-card, .blog-card, .case-study-card');
    elements.forEach(el => this.observer.observe(el));
  }
}

// Counter Animation for Stats
class Counter {
  constructor(element) {
    this.element = element;
    this.target = this.parseTarget(element.dataset.target);
    this.duration = 2000;
    this.animate();
  }

  parseTarget(target) {
    // Handle values like "500+", "2.5x", "95%"
    const numMatch = target.match(/[\d.]+/);
    return numMatch ? parseFloat(numMatch[0]) : 0;
  }

  animate() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.count();
          observer.unobserve(this.element);
        }
      });
    });
    observer.observe(this.element);
  }

  count() {
    const start = 0;
    const increment = this.target / (this.duration / 16);
    let current = start;
    const originalText = this.element.dataset.target;

    const timer = setInterval(() => {
      current += increment;
      if (current >= this.target) {
        this.element.textContent = originalText;
        clearInterval(timer);
      } else {
        const suffix = originalText.replace(/[\d.]+/, '');
        this.element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }
}

// Form Validation and Multi-step Wizard
class FormWizard {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    
    this.steps = this.form.querySelectorAll('.form-step');
    this.currentStep = 0;
    this.init();
  }

  init() {
    this.showStep(0);
    
    // Next buttons
    const nextButtons = this.form.querySelectorAll('.btn-next');
    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => this.nextStep());
    });

    // Previous buttons
    const prevButtons = this.form.querySelectorAll('.btn-prev');
    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => this.prevStep());
    });

    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  showStep(n) {
    this.steps.forEach((step, index) => {
      step.style.display = index === n ? 'block' : 'none';
    });

    this.currentStep = n;
    this.updateProgress();
  }

  nextStep() {
    if (this.validateStep(this.currentStep)) {
      if (this.currentStep < this.steps.length - 1) {
        this.showStep(this.currentStep + 1);
      }
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }

  validateStep(step) {
    const currentStepElement = this.steps[step];
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.classList.add('error');
        this.showError(input, 'Ez a mező kötelező');
      } else {
        input.classList.remove('error');
        this.hideError(input);
      }

      // Email validation
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          valid = false;
          input.classList.add('error');
          this.showError(input, 'Kérlek, adj meg egy érvényes email címet');
        }
      }

      // Phone validation
      if (input.type === 'tel' && input.value) {
        const phoneRegex = /^[\d\s\-+()]+$/;
        if (!phoneRegex.test(input.value)) {
          valid = false;
          input.classList.add('error');
          this.showError(input, 'Kérlek, adj meg egy érvényes telefonszámot');
        }
      }
    });

    return valid;
  }

  showError(input, message) {
    let errorDiv = input.parentElement.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  }

  hideError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  updateProgress() {
    const progressBar = this.form.querySelector('.progress-bar-fill');
    const progressText = this.form.querySelector('.progress-text');
    
    if (progressBar) {
      const progress = ((this.currentStep + 1) / this.steps.length) * 100;
      progressBar.style.width = progress + '%';
    }

    if (progressText) {
      progressText.textContent = `${this.currentStep + 1}. lépés / ${this.steps.length}`;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateStep(this.currentStep)) {
      return;
    }

    // Collect form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Show success message
    this.showSuccessMessage();
    
    // Log data (in production, send to server)
    console.log('Form submitted:', data);
  }

  showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,0.1); text-align: center; max-width: 500px; margin: 2rem auto;">
        <svg style="width: 4rem; height: 4rem; color: #10b981; margin: 0 auto 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--brand-navy);">Köszönjük a jelentkezést!</h3>
        <p style="color: var(--gray-600);">Hamarosan felvesszük veled a kapcsolatot.</p>
      </div>
    `;
    
    this.form.style.display = 'none';
    this.form.parentElement.appendChild(successDiv);
  }
}

// Cookie Consent
class CookieConsent {
  constructor() {
    this.banner = document.getElementById('cookie-banner');
    if (!this.banner) return;
    
    this.init();
  }

  init() {
    // Check if user has already consented
    if (localStorage.getItem('cookieConsent')) {
      this.banner.style.display = 'none';
      return;
    }

    this.banner.style.display = 'block';

    // Accept all button
    const acceptBtn = this.banner.querySelector('.accept-all');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.acceptAll());
    }

    // Reject button
    const rejectBtn = this.banner.querySelector('.reject-all');
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => this.rejectAll());
    }

    // Settings button
    const settingsBtn = this.banner.querySelector('.cookie-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.showSettings());
    }
  }

  acceptAll() {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }));
    this.banner.style.display = 'none';
  }

  rejectAll() {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    }));
    this.banner.style.display = 'none';
  }

  showSettings() {
    // Toggle detailed view
    const detailsView = this.banner.querySelector('.cookie-details');
    if (detailsView) {
      detailsView.style.display = detailsView.style.display === 'none' ? 'block' : 'none';
    }
  }
}

// Smooth Scroll
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Testimonial Slider
class TestimonialSlider {
  constructor(containerClass) {
    this.container = document.querySelector(containerClass);
    if (!this.container) return;
    
    this.slides = this.container.querySelectorAll('.testimonial-slide');
    this.currentSlide = 0;
    this.init();
  }

  init() {
    if (this.slides.length <= 1) return;

    // Create navigation
    const nav = document.createElement('div');
    nav.className = 'slider-nav';
    nav.innerHTML = `
      <button class="slider-btn prev">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button class="slider-btn next">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    `;
    this.container.appendChild(nav);

    // Event listeners
    nav.querySelector('.prev').addEventListener('click', () => this.prevSlide());
    nav.querySelector('.next').addEventListener('click', () => this.nextSlide());

    // Show first slide
    this.showSlide(0);

    // Auto-play
    setInterval(() => this.nextSlide(), 5000);
  }

  showSlide(n) {
    this.slides.forEach((slide, index) => {
      slide.style.display = index === n ? 'block' : 'none';
    });
    this.currentSlide = n;
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }
}

// Filter functionality for blog
class BlogFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.blogCards = document.querySelectorAll('.blog-card');
    
    if (this.filterButtons.length === 0) return;
    this.init();
  }

  init() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        // Update active button
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter cards
        this.filterCards(category);
      });
    });
  }

  filterCards(category) {
    this.blogCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
        setTimeout(() => card.classList.add('fade-in'), 10);
      } else {
        card.style.display = 'none';
      }
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new AnimationObserver();
  new CookieConsent();
  smoothScroll();
  
  // Initialize counters
  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    new Counter(el);
  });

  // Initialize form wizard if exists
  new FormWizard('application-form');

  // Initialize testimonial slider if exists
  new TestimonialSlider('.testimonial-slider');

  // Initialize blog filter if exists
  new BlogFilter();

  // Add loading class removal
  document.body.classList.add('loaded');
});

// Handle form inputs
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
});
