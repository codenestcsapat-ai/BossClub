// Navigation scroll effect
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.navigation');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
  });
}

// Language switcher toggle (Open/close dropdown)
window.toggleLanguage = function(event) {
  event.stopPropagation();
  const button = event.currentTarget;
  const dropdown = button.nextElementSibling; // This is .lang-options
  
  // Toggle classes
  button.classList.toggle('active');
  dropdown.classList.toggle('active');
}

// Close language dropdown when clicking outside
document.addEventListener('click', function(event) {
  const langDropdowns = document.querySelectorAll('.lang-dropdown');
  
  langDropdowns.forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      const button = dropdown.querySelector('.lang-current');
      const options = dropdown.querySelector('.lang-options');
      
      if (button) button.classList.remove('active');
      if (options) options.classList.remove('active');
    }
  });
});

// Stats counter animation
function animateCounter(element) {
  const target = element.getAttribute('data-target');
  if (!target) return;
  
  const isPercentage = target.includes('%');
  const isMultiplier = target.includes('x');
  const hasPlus = target.includes('+');
  
  let numericTarget = parseFloat(target);
  if (isNaN(numericTarget)) return;
  
  const duration = 2000;
  const steps = 60;
  const increment = numericTarget / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= numericTarget) {
      current = numericTarget;
      clearInterval(timer);
    }
    
    if (isPercentage) {
      element.textContent = Math.floor(current) + '%';
    } else if (isMultiplier) {
      element.textContent = current.toFixed(1) + 'x';
    } else if (hasPlus) {
      element.textContent = Math.floor(current) + '+';
    } else {
      element.textContent = Math.floor(current);
    }
  }, duration / steps);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value');
      statValues.forEach(stat => {
        if (!stat.classList.contains('animated')) {
          stat.classList.add('animated');
          animateCounter(stat);
        }
      });
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Cookie banner functionality
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = cookieBanner?.querySelector('.accept-all');
const rejectBtn = cookieBanner?.querySelector('.reject-all');

if (cookieBanner && !localStorage.getItem('cookieConsent')) {
  cookieBanner.style.display = 'block';
}

acceptBtn?.addEventListener('click', function() {
  localStorage.setItem('cookieConsent', 'accepted');
  cookieBanner.style.display = 'none';
});

rejectBtn?.addEventListener('click', function() {
  localStorage.setItem('cookieConsent', 'rejected');
  cookieBanner.style.display = 'none';
});

// Blog filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter cards
      blogCards.forEach(card => {
        if (category === 'all') {
          card.style.display = 'block';
        } else {
          const cardCategory = card.getAttribute('data-category');
          if (cardCategory === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ==========================================
//  TRANSLATION SYSTEM (IMPROVED VERSION)
// ==========================================

const translations = {
  'en': {
    'nav-home': 'Home',
    'nav-about': 'About Us',
    'nav-services': 'Services',
    'nav-stories': 'Stories',
    'nav-blog': 'Blog',
    'nav-apply': 'Apply Now',
    'hero-badge': 'Premium Business Mentoring',
    'hero-title-1': 'Elevate your business to the',
    'hero-title-2': 'next level',
    'hero-desc': 'Exclusive mentoring and coaching programs from experienced leaders who have already walked the path. Join 500+ successful entrepreneurs.',
    'hero-btn-primary': 'Free Consultation',
    'hero-btn-secondary': 'See how it works',
    'stats-title-1': 'Our Success in',
    'stats-title-2': 'Numbers',
    'stats-desc': 'For years, we have been helping entrepreneurs and leaders achieve their goals',
    'stat-label-1': 'Successful Entrepreneurs',
    'stat-label-2': 'Years of Experience',
    'stat-label-3': 'Success Rate',
    'stat-label-4': 'Average Growth',
    'services-title-1': 'Premium',
    'services-title-2': 'Programs',
    'services-desc': 'Choose the right program for you and start your journey to the next level',
    'service-1-title': 'Bootcamp for entrepreneurs (2 days)',
    'service-1-desc': 'Intensive, practice-oriented bootcamp with experienced mentors, providing practical tools for growth and operational efficiency.',
    'service-1-feature-1': '2-day intensive training',
    'service-1-feature-2': 'Change management',
    'service-1-feature-3': 'OKRs (Objectives, Key Results)',
    'service-1-feature-4': 'Organizational development and process building',
    'service-1-feature-5': 'Experienced mentor network and practical advice',
    'service-2-title': 'Bootcamp for students / career starters (2 days)',
    'service-2-desc': 'Practical skills for entering the job market: job interview techniques, self-marketing and personal branding.',
    'service-2-feature-1': '2-day practical bootcamp',
    'service-2-feature-2': 'Career planning and personal strategy',
    'service-2-feature-3': 'Job interview techniques and self-presentation',
    'service-2-feature-4': 'Resume and LinkedIn profile building',
    'service-2-feature-5': 'Networking etiquette and relationship strategy',
    'service-3-title': 'Bootcamp for future leaders (2 days)',
    'service-3-desc': 'Leadership skills and decision-making exercises with real simulations and feedback culture.',
    'service-3-feature-1': '2-day leadership intensive',
    'service-3-feature-2': 'Communication and influence techniques',
    'service-3-feature-3': 'Real decision-making situation simulation',
    'service-3-feature-4': 'Leadership mindset and conflict resolution',
    'service-3-feature-5': 'Feedback culture and coaching techniques',
    'learn-more': 'Learn More',
    'testimonials-title-1': 'What our',
    'testimonials-title-2': 'Clients Say',
    'testimonials-desc': 'Join hundreds of successful entrepreneurs who have already taken the first step',
    'test-1-text': '"The BossClub program completely changed my business and mindset. We doubled our revenue in 6 months."',
    'test-1-role': 'CEO, TechVenture Ltd.',
    'test-2-text': '"I struggled with growth for years on my own. In the mentoring program, I finally got the support and knowledge I needed. I recommend it to everyone!"',
    'test-2-role': 'Founder, Digital Marketing Agency',
    'test-3-text': '"Thanks to the leadership program, I not only became a better leader, but my team also works much more efficiently. It was a fantastic experience!"',
    'test-3-role': 'Managing Director, InnovateCorp',
    'cta-title': 'Ready for change?',
    'cta-desc': 'Book a free 30-minute consultation and lets discuss how to take your business to the next level.',
    'cta-btn': 'Book Appointment Now',
    'supporters-title-1': 'Proud',
    'supporters-title-2': 'Partners',
    'supporters-desc': 'We thank our supporters for their trust and cooperation',
    'footer-desc': 'Premium business mentoring and coaching programs for entrepreneurs and executives.',
    'footer-sitemap': 'Sitemap',
    'footer-legal': 'Legal Info',
    'footer-contact': 'Contact',
    'footer-privacy': 'Privacy Policy',
    'footer-terms': 'Terms of Service',
    'footer-cookies': 'Cookie Policy',
    'footer-impressum': 'Impressum',
    'footer-address': 'Budapest, Main Street 10.',
    'footer-copyright': '© 2026 BossClub. All rights reserved.',
    'cookie-text': 'We use cookies to ensure the best user experience.',
    'cookie-more': 'Learn more',
    'cookie-accept': 'Accept',
    'cookie-reject': 'Reject',
    'about-mission': 'Our Mission',
    'about-mission-desc': 'BossClub\'s mission is to help ambitious entrepreneurs and leaders reach their full potential. We believe that with the right mentoring and support, every business is capable of exponential growth.',
    'about-mission-details': '15+ years of experience in business mentoring and proud to have helped 500+ successful entrepreneurs achieve their goals. We are not just advisors, we are true partners on the business journey.',
    'about-excellence': 'Excellence',
    'about-excellence-desc': 'In every activity we pursue the highest standard and expect the same from our clients.',
    'about-community': 'Community',
    'about-community-desc': 'We build strong connections where members support and inspire each other.',
    'about-results': 'Results',
    'about-results-desc': 'We focus on practical, measurable results, not just theory.',
    'about-mentors': 'Experienced',
    'about-mentors-intro': 'Meet',
    'about-mentors-title': 'Our Mentors',
    'about-mentors-desc': 'Business leaders and entrepreneurs who have experienced growth challenges firsthand',
    'about-ready': 'Ready to work with us?',
    'about-ready-desc': 'Apply now and start collaborating with experienced mentors who will help you achieve your goals.',
    'about-free-consultation': 'Free Consultation',
    'services-badge': 'Premium Programs',
    'services-program-label': 'Choose your',
    'services-program': 'program',
    'services-program-desc': 'Personalized mentoring and coaching services at every level for every goal-driven entrepreneur.',
    'services-exec-mentoring': 'Executive Mentoring',
    'services-exec-desc': '1-1 personalized mentoring program',
    'services-pricing-6months': '/ 6 months',
    'services-business-coaching': 'Business Coaching',
    'services-business-desc': 'Group coaching program',
    'services-pricing-3months': '/ 3 months',
    'services-leadership': 'Leadership Program',
    'services-leadership-desc': 'Leadership skills development',
    'services-pricing-12weeks': '/ 12 weeks',
    'services-popular': 'Popular',
    'services-how-works': 'How',
    'services-how-works-title': 'It Works',
    'services-how-desc': 'Simple, transparent process for successful collaboration',
    'services-step-1': 'Free Consultation',
    'services-step-1-desc': 'Book a 30-minute free consultation to get to know each other and discuss your goals.',
    'services-step-2': 'Program Selection',
    'services-step-2-desc': 'We help you choose the right program and mentor based on your needs.',
    'services-step-3': 'Strategy Development',
    'services-step-3-desc': 'Together we develop a personalized strategy and action plan to achieve your goals.',
    'services-step-4': 'Execution & Results',
    'services-step-4-desc': 'Regular meetings, continuous support and measurable results throughout the entire program.',
    'services-faq-title': 'Frequently',
    'services-faq-title-2': 'Asked Questions',
    'services-faq-desc': 'Answers to the most common questions',
    'services-faq-1': 'Who can apply for the programs?',
    'services-faq-2': 'Are sessions online or offline?',
    'services-faq-3': 'How long until results are visible?',
    'services-faq-4': 'Is there a possibility of installment payment?',
    'services-faq-5': 'What if I\'m not satisfied with the program?',
    'services-ready': 'Ready for change?',
    'services-ready-desc': 'Book a free 30-minute consultation and discuss how we can take your business to the next level.',
    'stories-badge': 'Real Results',
    'stories-title': 'Successful',
    'stories-title-2': 'Clients',
    'stories-desc': 'Read real stories from entrepreneurs who achieved their goals through BossClub mentoring programs.',
    'stories-impact-title': 'Our Aggregated',
    'stories-impact-title-2': 'Results',
    'stories-impact-desc': 'Measurable success achieved by our clients in recent years',
    'stories-impact-revenue': 'Generated extra revenue',
    'stories-impact-growth': 'Average growth rate',
    'stories-impact-jobs': 'Jobs created',
    'stories-impact-retention': 'Client retention rate',
    'stories-case-studies': 'Detailed',
    'stories-case-studies-2': 'Case Studies',
    'stories-case-studies-desc': 'In-depth insights into our clients\' successful transformation',
    'blog-badge': 'Professional Content',
    'blog-title': 'Blog &',
    'blog-title-2': 'News',
    'blog-desc': 'Professional articles, business tips and management advice from successful entrepreneurs and mentors.',
    'blog-featured': 'Featured Article',
    'blog-filter-all': 'All',
    'blog-filter-leadership': 'Leadership',
    'blog-filter-scaling': 'Scaling',
    'blog-filter-marketing': 'Marketing',
    'blog-filter-finance': 'Finance',
    'blog-filter-productivity': 'Productivity',
    'blog-newsletter-title': 'Subscribe to our newsletter',
    'blog-newsletter-desc': 'Weekly professional content, business tips and exclusive offers directly to your inbox.',
    'blog-newsletter-btn': 'Subscribe',
    'blog-newsletter-privacy': 'You can unsubscribe anytime. We handle your data confidentially.',
    'blog-cta-title': 'Want personalized advice?',
    'blog-cta-desc': 'Book a free consultation and discuss how we can help you grow your business.',
    'application-badge': 'Start Now',
    'application-title': 'Apply for our',
    'application-title-2': 'programs',
    'application-desc': 'Book a free consultation and discuss how we can help you achieve your goals.',
    'application-form-title': 'Application Form',
    'application-form-desc': 'Fill out the form below and we\'ll contact you soon.',
    'application-step-1': '1. Step / 4',
    'application-step-25': '25%',
    'application-personal': 'Personal Data',
    'application-business': 'Business Data',
    'application-program': 'Program Selection',
    'application-additional': 'Additional Information',
    'application-secure': 'Secure data handling',
    'application-free': '100% free consultation',
    'application-response': 'We respond within 24 hours',
    'application-full-name': 'Full Name',
    'application-full-name-placeholder': 'John Doe',
    'application-email': 'Email Address',
    'application-email-placeholder': 'john@example.com',
    'application-phone': 'Phone Number',
    'application-phone-placeholder': '+36 30 316 5408',
    'application-city': 'City',
    'application-city-placeholder': 'Budapest',
    'application-next': 'Next',
    'application-back': 'Back',
    'application-submit': 'Send Application',
    'application-company': 'Company Name',
    'application-company-placeholder': 'Company Ltd.',
    'application-industry': 'Industry',
    'application-industry-placeholder': 'Select an industry',
    'application-industry-tech': 'Technology & IT',
    'application-industry-marketing': 'Marketing & Advertising',
    'application-industry-consulting': 'Consulting',
    'application-industry-ecommerce': 'E-commerce',
    'application-industry-manufacturing': 'Manufacturing',
    'application-industry-finance': 'Finance',
    'application-industry-healthcare': 'Healthcare',
    'application-industry-education': 'Education',
    'application-industry-other': 'Other',
    'application-team-size': 'Team Size',
    'application-team-size-placeholder': 'Select a size',
    'application-team-size-1-5': '1-5 people',
    'application-team-size-6-10': '6-10 people',
    'application-team-size-11-25': '11-25 people',
    'application-team-size-26-50': '26-50 people',
    'application-team-size-51-100': '51-100 people',
    'application-team-size-100plus': '100+ people',
    'application-revenue': 'Annual Revenue (optional)',
    'application-revenue-placeholder': 'Select a category',
    'application-revenue-0-100k': '0 - 100k EUR',
    'application-revenue-100k-500k': '100k - 500k EUR',
    'application-revenue-500k-1m': '500k - 1M EUR',
    'application-revenue-1m-5m': '1M - 5M EUR',
    'application-revenue-5mplus': '5M+ EUR',
    'application-team-size': 'Team Size',
    'application-team-size-placeholder': 'Select a size',
    'application-revenue': 'Annual Revenue (optional)',
    'application-revenue-placeholder': 'Select a category',
    'application-program-label': 'Which program interests you?',
    'application-executive': 'Executive Mentoring',
    'application-executive-desc': '1-on-1 personalized mentoring',
    'application-coaching': 'Business Coaching',
    'application-coaching-desc': 'Group coaching program',
    'application-leadership': 'Leadership Program',
    'application-leadership-desc': 'Leadership skills development',
    'application-unsure': 'Not sure',
    'application-unsure-desc': 'Help me choose',
    'application-challenges': 'What are your main challenges?',
    'application-challenges-placeholder': 'Briefly describe the challenges you are facing...',
    'application-start-date': 'When would you like to start?',
    'application-start-date-placeholder': 'Select a date',
    'application-start-date-asap': 'As soon as possible',
    'application-start-date-1month': 'Within 1 month',
    'application-start-date-3months': 'Within 3 months',
    'application-start-date-later': 'Later',
    'application-comments': 'Additional Comments',
    'application-comments-placeholder': 'Is there anything else you would like to share?',
    'application-terms-text': 'I accept the',
    'application-terms-link': 'Terms and Conditions',
    'application-terms-and': 'and the',
    'application-privacy-link': 'Privacy Policy',
    'application-newsletter': 'I would like to receive newsletters with professional content and exclusive offers.',
    'application-source': 'How did you hear about us?',
    'application-source-placeholder': 'Choose an option',
    'featured-article-title': '5 Key Strategies for Scaling Your Business in 2024',
    'featured-article-desc': 'Successful scaling is not just about growth, but about building your business foundation sustainably. In this article, we share 5 proven strategies that will help you achieve your goals.',
    'featured-article-link': 'Read Article',
    'blog-card-1-title': 'How to Build a Strong Company Culture?',
    'blog-card-1-desc': 'Company culture is the foundation of every successful business. In this article, we show you how to create an environment...',
    'blog-card-1-author': 'Dr. András Kovács',
    'blog-card-1-date': 'Jan. 15, 2024',
    'blog-card-2-title': 'The 7 Stages of Scaling and Their Challenges',
    'blog-card-2-desc': 'Every business is at a different stage. Learn about the seven main development levels and their characteristics...',
    'blog-card-2-author': 'Péter Takács',
    'blog-card-2-date': 'Jan. 12, 2024',
    'blog-card-3-title': 'Content Marketing Strategies for 2024',
    'blog-card-3-desc': 'Content marketing is constantly evolving. Here are the latest trends and strategies worth following...',
    'blog-card-3-author': 'Zsuzsanna Nagy',
    'blog-card-3-date': 'Jan. 10, 2024',
    'blog-card-4-title': 'Investor Agreement Pitfalls',
    'blog-card-4-desc': 'Before you sign an investor contract, learn about the most common mistakes and how to avoid them...',
    'blog-card-4-author': 'Péter Takács',
    'blog-card-4-date': 'Jan. 8, 2024',
    'blog-card-5-title': 'Time Management for Leaders',
    'blog-card-5-desc': 'How to use your time more effectively? Practical tips and tools for busy leaders...',
    'blog-card-5-author': 'Eszter Horváth',
    'blog-card-5-date': 'Jan. 5, 2024',
    'blog-card-6-title': 'The Art of Delegation: When and How?',
    'blog-card-6-desc': 'Successful leaders know they cannot do everything themselves. Learn the tricks of effective delegation...',
    'blog-card-6-author': 'Dr. András Kovács',
    'blog-card-6-date': 'Jan. 3, 2024',
    'blog-card-7-title': 'Systematization: The Foundation of Scaling',
    'blog-card-7-desc': 'You can only grow if you systematize. In this article, we show you how to automate your processes...',
    'blog-card-7-author': 'Gábor Szabó',
    'blog-card-7-date': 'Jan. 1, 2024',
    'blog-card-8-title': 'LinkedIn for B2B Sales: Complete Guide',
    'blog-card-8-desc': 'LinkedIn is the most effective B2B marketing channel. Learn how to build relationships and acquire customers...',
    'blog-card-8-author': 'Zsuzsanna Nagy',
    'blog-card-8-date': 'Dec. 28, 2023',
    'blog-card-9-title': 'Cash Flow Management for Startups',
    'blog-card-9-desc': 'Cash flow is your life. How to keep your business finances under control and avoid pitfalls...',
    'blog-card-9-author': 'Péter Takács',
    'blog-card-9-date': 'Dec. 25, 2023',
    'blog-category-leadership': 'Leadership',
    'blog-category-scaling': 'Scaling',
    'blog-category-marketing': 'Marketing',
    'blog-category-finance': 'Finance',
    'blog-category-productivity': 'Productivity',
    'footer-link-home': 'Home',
    'footer-link-about': 'About Us',
    'footer-link-services': 'Services',
    'footer-link-stories': 'Stories',
    'footer-link-blog': 'Blog',
    'services-page-badge': 'Premium Programs',
    'services-page-title': 'Choose your',
    'services-page-title-2': 'program',
    'services-page-desc': 'Personalized mentoring and coaching services at every level, for every goal-oriented entrepreneur.',
    'services-pricing-title': 'Premium',
    'services-pricing-title-2': 'Packages',
    'services-pricing-desc': 'Choose the right program for you and start your journey to the next level',
    'pricing-card-1-name': 'Bootcamp for entrepreneurs (2 days)',
    'pricing-card-1-desc': 'Intensive, practice-oriented bootcamp with experienced mentors, providing practical tools for growth and operational efficiency.',
    'pricing-card-1-price': '120,000 HUF',
    'pricing-card-1-period': '/ 2 days',
    'pricing-card-1-feature-1': '2-day intensive training',
    'pricing-card-1-feature-2': 'Change management',
    'pricing-card-1-feature-3': 'OKRs (Objectives, Key Results)',
    'pricing-card-1-feature-4': 'Organizational development and process building',
    'pricing-card-1-feature-5': 'Experienced mentor network and practical advice',
    'pricing-card-2-name': 'Bootcamp for students / career starters (2 days)',
    'pricing-card-2-desc': 'Practical skills for entering the job market: job interview techniques, self-marketing and personal branding.',
    'pricing-card-2-price': '70,000 HUF',
    'pricing-card-2-period': '/ 2 days',
    'pricing-card-2-badge': 'Popular',
    'pricing-card-2-feature-1': '2-day practical bootcamp',
    'pricing-card-2-feature-2': 'Career planning and personal strategy',
    'pricing-card-2-feature-3': 'Job interview techniques and self-presentation',
    'pricing-card-2-feature-4': 'Resume and LinkedIn profile building',
    'pricing-card-2-feature-5': 'Networking etiquette and relationship strategy',
    'pricing-card-3-name': 'Bootcamp for future leaders (2 days)',
    'pricing-card-3-desc': 'Leadership skills and decision-making exercises with real simulations and feedback culture.',
    'pricing-card-3-price': '95,000 HUF',
    'pricing-card-3-period': '/ 2 days',
    'pricing-card-3-feature-1': '2-day leadership intensive',
    'pricing-card-3-feature-2': 'Communication and influence techniques',
    'pricing-card-3-feature-3': 'Real decision-making situation simulation',
    'pricing-card-3-feature-4': 'Leadership mindset and conflict resolution',
    'pricing-card-3-feature-5': 'Feedback culture and coaching techniques',
    'pricing-btn-apply': 'Apply',
    'process-title': 'How it',
    'process-title-2': 'Works',
    'process-desc': 'Simple, transparent process for successful cooperation',
    'process-step-1-title': 'Free Consultation',
    'process-step-1-desc': 'Book a 30-minute free consultation where we get to know each other and discuss your goals.',
    'process-step-2-title': 'Program Selection',
    'process-step-2-desc': 'We help you choose the best program and mentor for your needs.',
    'process-step-3-title': 'Strategy Development',
    'process-step-3-desc': 'Together we develop a personalized strategy and action plan to achieve your goals.',
    'process-step-4-title': 'Execution & Results',
    'process-step-4-desc': 'Regular meetings, continuous support and measurable results throughout the program.',
    'faq-title': 'Frequently',
    'faq-title-2': 'Asked Questions',
    'faq-desc': 'Answers to the most common questions',
    'faq-q1': 'Who can apply for the programs?',
    'faq-a1': 'Our programs are aimed at entrepreneurs, business managers and professionals who want to develop their leadership skills or increase the effectiveness of their business. We especially recommend it for those who already have a few years of experience and are ready to take the next step.',
    'faq-q2': 'Do sessions take place online or offline?',
    'faq-a2': 'We offer both online and offline formats, flexibly adapting to customer needs. Executive Mentoring sessions typically take place online, but there is also the opportunity for face-to-face meetings. The Leadership Program follows a combined format: weekly online and monthly offline meetings.',
    'faq-q3': 'How soon can results be seen?',
    'faq-a3': 'First results typically appear in the first weeks of the program in a change of mindset and approach. Measurable business results appear after 2-3 months, but the biggest breakthroughs often happen in the second half of the program when strategies are fully implemented.',
    'faq-q4': 'Is there an option for installment payments?',
    'faq-a4': 'Yes, we provide flexible payment options for all our programs. The Executive Mentoring can be paid in 3 installments, the Business Coaching in 2 installments. We discuss the details during the free consultation.',
    'faq-q5': 'What happens if I\'m not satisfied with the program?',
    'faq-a5': 'We offer a 30-day money-back guarantee. If you feel in the first month that the program does not meet your expectations, we will refund the full amount paid. Our goal is to ensure that all our clients are satisfied and receive real value.',
    'cta-services-title': 'Ready for change?',
    'cta-services-desc': 'Book a free 30-minute consultation and let\'s discuss how we can take your business to the next level.',
    'about-mission-badge': 'Trusted Partners',
    'about-mentors': 'Experienced',
    'about-mentors-title': 'Mentors',
    'about-mentors-desc': 'Business leaders and entrepreneurs who have been through the growth challenges and are ready to help you too.',
    'about-mission': 'Our Mission',
    'about-mission-desc': 'BossClub\'s mission is to help ambitious entrepreneurs and leaders reach their full potential. We believe that with the right mentorship and support, every business can achieve exponential growth.',
    'about-mission-details': 'With 15+ years of experience in business mentoring, we are proud to have helped 500+ successful entrepreneurs achieve their goals. We don\'t just give advice, we are real partners on the business journey.',
    'about-excellence': 'Excellence',
    'about-excellence-desc': 'We strive for the highest standards in everything we do, and we expect the same from our clients.',
    'about-community': 'Community',
    'about-community-desc': 'We build strong connections where members support and inspire each other.',
    'about-results': 'Results',
    'about-results-desc': 'We focus on practical, measurable results, not just theory.',
    'mentor-1-name': 'Gyula Groó',
    'mentor-1-title': 'Business Mentor & Strategic Advisor',
    'mentor-1-quote': '"Outstanding experience in developing market entry strategies for SMEs, brand building and customer-focused business development."',
    'mentor-1-bio': 'Over 30 years in marketing, sales, and business development, with 20 years at major players in the domestic automotive and fleet management sectors.',
    'mentor-1-highlight-1': 'SME experience: helped companies get on track at both operational and strategic levels',
    'mentor-1-highlight-2': 'Practical knowledge in sales and service development',
    'mentor-1-highlight-3': 'Passionate about knowledge sharing: higher education involvement and supporting the next generation',
    'mentor-1-tag-1': 'Strategy',
    'mentor-1-tag-2': 'Business Development',
    'mentor-1-tag-3': 'Brand Building',
    'mentor-2-name': 'Olivér Dunai',
    'mentor-2-title': 'Digital Marketing & Tech Expert',
    'mentor-2-quote': '"I believe an organization works well when people understand what and why they do something – while the company moves toward its own vision. Strategy is not just a plan, culture is not just a mood – both require conscious building."',
    'mentor-2-bio': 'Leader of one of the largest Hungarian locations (700 employees) at Deutsche Telekom IT Solutions – the Pécs office – with over a decade of experience in a multinational corporate environment.',
    'mentor-2-highlight-1': 'Strong international and large enterprise background – global operations and multi-level experience',
    'mentor-2-highlight-2': 'Coaching-oriented leadership – builds autonomous, developing teams',
    'mentor-2-highlight-3': 'Active player in Pécs business, academic and community connections',
    'mentor-2-tag-1': 'Organizational Culture',
    'mentor-2-tag-2': 'Leadership',
    'mentor-2-tag-3': 'Digital Strategy',
    'mentor-3-name': 'Péter Takács',
    'mentor-3-title': 'Financial Expert',
    'mentor-3-bio': 'Financial advisor with 25+ years of experience. CFO roles in Fortune 500 companies. Helps create financial foundations for sustainable growth.',
    'mentor-3-tag-1': 'Finance',
    'mentor-3-tag-2': 'Investment',
    'mentor-3-tag-3': 'Scaling',
    'mentor-4-name': 'Eszter Horváth',
    'mentor-4-title': 'HR & Culture Specialist',
    'mentor-4-bio': '18 years of HR experience, involved in building 200+ person teams. Specialist in workplace culture development and talent management.',
    'mentor-4-tag-1': 'HR',
    'mentor-4-tag-2': 'Team Building',
    'mentor-4-tag-3': 'Culture',
    'mentor-5-name': 'Gábor Szabó',
    'mentor-5-title': 'Operations Director',
    'mentor-5-bio': 'Operations director with 20+ years of experience. Expert in Lean and agile methodologies. Helps create efficient operating processes.',
    'mentor-5-tag-1': 'Operations',
    'mentor-5-tag-2': 'Lean',
    'mentor-5-tag-3': 'Process',
    'mentor-6-name': 'Marianna Varga',
    'mentor-6-title': 'Sales & Business Development',
    'mentor-6-bio': 'Sales leader with 15+ years of experience in B2B and B2C segments. Skilled in building successful sales teams and developing training programs.',
    'mentor-6-tag-1': 'Sales',
    'mentor-6-tag-2': 'Business Dev',
    'mentor-6-tag-3': 'Negotiation',
    'about-ready': 'Ready to work with us?',
    'about-ready-desc': 'Join now and start collaborating with our experienced mentors who help you achieve your goals.',
    'about-free-consultation': 'Free Consultation',
    'stories-badge': 'Real Results',
    'stories-title': 'Successful',
    'stories-title-2': 'Clients',
    'stories-desc': 'Read real stories from entrepreneurs who have achieved their goals with BossClub mentoring programs.',
    'stories-impact-title': 'Aggregate',
    'stories-impact-title-2': 'Results',
    'stories-impact-desc': 'Measurable successes achieved by our clients in recent years',
    'stories-impact-revenue': 'Generated additional revenue',
    'stories-impact-growth': 'Average growth rate',
    'stories-impact-jobs': 'Jobs created',
    'stories-impact-retention': 'Client retention rate',
    'stories-case-studies': 'Detailed',
    'stories-case-studies-2': 'Case Studies',
    'stories-case-studies-desc': 'In-depth insights into our clients\' successful transformations',
    'case-study-1-company': 'TechVenture Kft.',
    'case-study-1-title': 'How we doubled revenue in 6 months',
    'case-study-1-subtitle': 'Executive Mentoring Program',
    'case-study-1-metric-1': '+120%',
    'case-study-1-metric-1-label': 'Revenue growth',
    'case-study-1-metric-2': '15 → 35',
    'case-study-1-metric-2-label': 'Team size',
    'case-study-1-metric-3': '3x',
    'case-study-1-metric-3-label': 'Client count',
    'case-study-1-metric-4': '€2.5M',
    'case-study-1-metric-4-label': 'Annual turnover',
    'case-study-1-situation': '<strong>Situation:</strong> TechVenture was a fast-growing IT services company that had hit a growth ceiling. The CEO, Peter Nagy, was struggling with the increased workload, and the company was starting to lose several key projects.',
    'case-study-1-solution': '<strong>Solution:</strong> In BossClub\'s Executive Mentoring program, Peter developed a personalized strategy with his mentors. The focus was on improving delegation, building effective team management, and building a scalable business model.',
    'case-study-1-result': '<strong>Result:</strong> Within 6 months, the company\'s revenue doubled, the team grew to 35 people, and new business lines were opened. Peter can now delegate confidently and focus more on strategic decisions.',
    'case-study-1-quote': '"The BossClub program completely changed my business and how I think. Now I know how to build a truly scalable company, and I finally have time for strategic development too."',
    'case-study-1-author': 'Peter Nagy',
    'case-study-1-author-title': 'CEO, TechVenture Kft.',
    'case-study-2-company': 'Digital Marketing Agency',
    'case-study-2-title': 'Growing client acquisition 10x with structured processes',
    'case-study-2-subtitle': 'Business Coaching Program',
    'case-study-2-metric-1': '10x',
    'case-study-2-metric-1-label': 'New clients',
    'case-study-2-metric-2': '+300%',
    'case-study-2-metric-2-label': 'Marketing ROI',
    'case-study-2-metric-3': '45%',
    'case-study-2-metric-3-label': 'Conversion rate',
    'case-study-2-metric-4': '€1.8M',
    'case-study-2-metric-4-label': 'Annual turnover',
    'case-study-2-situation': '<strong>Situation:</strong> Anna Kovács\' agency did excellent work, but client acquisition was ad-hoc and revenue was difficult to forecast. The sales process was not standardized.',
    'case-study-2-solution': '<strong>Solution:</strong> In the Business Coaching program, Anna learned in group sessions how to effectively build a sales funnel, use marketing automation, and implement lead nurturing strategies. Community members continuously shared experiences and learned from each other.',
    'case-study-2-result': '<strong>Result:</strong> Within 3 months, the number of new clients grew 10-fold, marketing ROI improved by 300%, and the agency\'s revenue reached €1.8M in the first year. They now have a predictable, scalable client acquisition system.',
    'case-study-2-quote': '"The coaching program not only provided strategy, but also a community where I can continuously learn and be inspired. Client acquisition has now become a well-functioning machine."',
    'case-study-2-author': 'Anna Kovács',
    'case-study-2-author-title': 'Founder, Digital Marketing Agency',
    'case-study-3-company': 'InnovateCorp',
    'case-study-3-title': 'Management team transformation and productivity increase',
    'case-study-3-subtitle': 'Leadership Program',
    'case-study-3-metric-1': '+85%',
    'case-study-3-metric-1-label': 'Team productivity',
    'case-study-3-metric-2': '92%',
    'case-study-3-metric-2-label': 'Satisfaction index',
    'case-study-3-metric-3': '-60%',
    'case-study-3-metric-3-label': 'Turnover reduction',
    'case-study-3-metric-4': '50 → 120',
    'case-study-3-metric-4-label': 'Team size',
    'case-study-3-situation': '<strong>Situation:</strong> Gábor Tóth\'s company grew rapidly, but the management team could not keep up. High turnover, low team morale, and projects frequently delayed.',
    'case-study-3-solution': '<strong>Solution:</strong> During the Leadership Program, Gábor and his management team received comprehensive training on modern management techniques, communication, conflict management and team building. We used a practice-based approach to work through real situations.',
    'case-study-3-result': '<strong>Result:</strong> Within 12 weeks, team productivity increased by 85%, employee satisfaction jumped to 92%, and turnover dropped by 60%. The company now operates with 120 people and a stable management team.',
    'case-study-3-quote': '"The Leadership Program helped me understand that success is not just about strategy, but about people. Now I know how to inspire and motivate my team."',
    'case-study-3-author': 'Gábor Tóth',
    'case-study-3-author-title': 'Managing Director, InnovateCorp',
    'cta-stories-title': 'Do you want to achieve success like that too?',
    'cta-stories-desc': 'Join our successful clients and start your own growth journey with BossClub mentoring programs.',
    'application-badge': 'Start Now',
    'application-title': 'Apply for our',
    'application-title-2': 'programs',
    'application-desc': 'Book a free consultation and discuss how we can help you achieve your goals.',
    'application-form-title': 'Application Form',
    'application-form-desc': 'Fill out the form below and we\'ll contact you soon.',
    'application-personal': 'Personal Data',
    'application-business': 'Business Data',
    'application-program': 'Program Selection',
    'application-additional': 'Additional Information',
    'application-full-name': 'Full Name',
    'application-full-name-placeholder': 'John Doe',
    'application-email': 'Email Address',
    'application-email-placeholder': 'john@example.com',
    'application-phone': 'Phone Number',
    'application-phone-placeholder': '+1 (555) 123-4567',
    'application-city': 'City',
    'application-city-placeholder': 'New York',
    'application-company-name': 'Company Name',
    'application-company-placeholder': 'Company Ltd.',
    'application-industry': 'Industry',
    'application-industry-placeholder': 'Select industry',
    'application-team-size': 'Team Size',
    'application-team-size-placeholder': 'Select size',
    'application-revenue': 'Annual Revenue (optional)',
    'application-revenue-placeholder': 'Select category',
    'application-program-label': 'Which program interests you?',
    'application-executive': 'Executive Mentoring',
    'application-executive-desc': '1-on-1 personalized mentoring',
    'application-coaching': 'Business Coaching',
    'application-coaching-desc': 'Group coaching program',
    'application-leadership': 'Leadership Program',
    'application-leadership-desc': 'Leadership skills development',
    'application-unsure': 'Not sure',
    'application-unsure-desc': 'Help me choose',
    'application-challenges': 'What are your main challenges?',
    'application-challenges-placeholder': 'Describe the challenges you\'re facing...',
    'application-source': 'How did you hear about us?',
    'application-source-placeholder': 'Select option',
    'application-start-date': 'When would you like to start?',
    'application-start-date-placeholder': 'Select date',
    'application-comments': 'Additional Comments',
    'application-comments-placeholder': 'Is there anything else you\'d like to share?',
    'application-terms': 'I accept the ',
    'application-terms-link': 'Terms of Service',
    'application-terms-and': ' and ',
    'application-terms-privacy': 'Privacy Policy',
    'application-newsletter': 'I would like to receive newsletters with professional content and exclusive offers.',
    'application-next': 'Next',
    'application-prev': 'Back',
    'application-submit': 'Send Application'
  },
  'hu': {
    'nav-home': 'Főoldal',
    'nav-about': 'Rólunk',
    'nav-services': 'Szolgáltatások',
    'nav-stories': 'Sikertörténetek',
    'nav-blog': 'Blog',
    'nav-apply': 'Jelentkezés',
    'hero-badge': 'Prémium Üzleti Mentoring',
    'hero-title-1': 'Emeld vállalkozásod a',
    'hero-title-2': 'következő szintre',
    'hero-desc': 'Exkluzív mentoring és coaching programok tapasztalt vezetőktől, akik már végigcsinálták az utat. Csatlakozz 500+ sikeres vállalkozóhoz.',
    'hero-btn-primary': 'Ingyenes Konzultáció',
    'hero-btn-secondary': 'Nézd meg, hogyan működik',
    'stats-title-1': 'Számokban a',
    'stats-title-2': 'Sikerünk',
    'stats-desc': 'Évek óta segítjük vállalkozókat és vezetőket abban, hogy elérjék céljaikat',
    'stat-label-1': 'Sikeres Vállalkozó',
    'stat-label-2': 'Év Tapasztalat',
    'stat-label-3': 'Sikeres Arány',
    'stat-label-4': 'Átlagos Növekedés',
    'services-title-1': 'Prémium',
    'services-title-2': 'Programjaink',
    'services-desc': 'Válaszd ki a számodra megfelelő programot, és kezdd el az utazást a következő szint felé',
    'service-1-title': 'Bootcamp vállalkozóknak (2 nap)',
    'service-1-desc': 'Intenzív, gyakorlatorientált bootcamp tapasztalt mentorokkal, amely a növekedés és a működési hatékonyság gyakorlati eszközeit adja át.',
    'service-1-feature-1': '2 napos intenzív képzés',
    'service-1-feature-2': 'Változásmenedzsment',
    'service-1-feature-3': 'OKR-ek (Célkitűzések, Kulcsfontosságú Eredmények)',
    'service-1-feature-4': 'Szervezetfejlesztés és folyamatépítés',
    'service-1-feature-5': 'Tapasztalt mentorhálózat és gyakorlati tanácsok',
    'service-2-title': 'Bootcamp diákoknak / pályakezdőknek (2 nap)',
    'service-2-desc': 'Gyakorlati készségek a munkaerőpiacra lépéshez: állásinterjú technikák, önmarketing és személyes márkaépítés.',
    'service-2-feature-1': '2 napos gyakorlati bootcamp',
    'service-2-feature-2': 'Karriertervezés és személyes stratégiaalkotás',
    'service-2-feature-3': 'Állásinterjú technikák és bemutatkozás',
    'service-2-feature-4': 'Önéletrajz és LinkedIn profilépítés',
    'service-2-feature-5': 'Hálózatépítési etikett és kapcsolati stratégia',
    'service-3-title': 'Bootcamp leendő vezetőknek (2 nap)',
    'service-3-desc': 'Vezetői készségek és döntéshozatali gyakorlatok valós szimulációkkal és visszajelzés-kultúrával.',
    'service-3-feature-1': '2 napos vezetői intenzív',
    'service-3-feature-2': 'Kommunikációs és befolyásolási technikák',
    'service-3-feature-3': 'Valós döntéshozatali helyzetek szimulációja',
    'service-3-feature-4': 'Vezetői gondolkodásmód és konfliktuskezelés',
    'service-3-feature-5': 'Visszajelzéskultúra és coaching technikák',
    'learn-more': 'Tudj meg többet',
    'testimonials-title-1': 'Mit mondanak',
    'testimonials-title-2': 'Ügyfeleink',
    'testimonials-desc': 'Csatlakozz több száz sikeres vállalkozóhoz, akik már megtették az első lépést',
    'test-1-text': '"A BossClub programja teljesen megváltoztatta a vállalkozásom és a gondolkodásomat. 6 hónap alatt megdupláztuk a bevételünket és végre tisztán látom a jövőt."',
    'test-1-role': 'CEO, TechVenture Kft.',
    'test-2-text': '"Évekig küszködtem egyedül a növekedéssel. A mentoring programban kaptam végre azt a támogatást és tudást, amire szükségem volt. Ajánlom mindenkinek!"',
    'test-2-role': 'Alapító, Digital Marketing Ügynökség',
    'test-3-text': '"A leadership programnak köszönhetően nem csak jobb vezetővé váltam, de a csapatom is sokkal hatékonyabban működik. Fantasztikus élmény volt!"',
    'test-3-role': 'Ügyvezető, InnovateCorp',
    'cta-title': 'Készen állsz a változásra?',
    'cta-desc': 'Foglalj egy ingyenes 30 perces konzultációt, és beszéljük meg, hogyan vihetjük a vállalkozásod a következő szintre.',
    'cta-btn': 'Foglalj időpontot most',
    'supporters-title-1': 'Büszke',
    'supporters-title-2': 'Partnereink',
    'supporters-desc': 'Köszönjük támogatóinknak a bizalmat és az együttműködést',
    'footer-desc': 'Prémium üzleti mentoring és coaching programok vállalkozóknak és vezetőknek.',
    'footer-sitemap': 'Oldaltérkép',
    'footer-legal': 'Jogi Információk',
    'footer-contact': 'Kapcsolat',
    'footer-privacy': 'Adatvédelmi tájékoztató',
    'footer-terms': 'ÁSZF',
    'footer-cookies': 'Cookie tájékoztató',
    'footer-impressum': 'Impresszum',
    'footer-address': 'Budapest, Fő utca 10.',
    'footer-copyright': '© 2026 BossClub. Minden jog fenntartva.',
    'cookie-text': 'Sütiket használunk a legjobb felhasználói élmény biztosítása érdekében.',
    'cookie-more': 'Tudj meg többet',
    'cookie-accept': 'Elfogadom',
    'cookie-reject': 'Elutasítom',
    'about-mission': 'Küldetésünk',
    'about-mission-desc': 'A BossClub küldetése, hogy segítsen ambiciózus vállalkozóknak és vezetőknek elérni teljes potenciáljukat. Hiszünk abban, hogy a megfelelő mentorálással és támogatással minden vállalkozás képes exponenciális növekedésre.',
    'about-mission-details': '15+ év tapasztalattal rendelkezünk az üzleti mentoring területén, és büszkék vagyunk arra, hogy 500+ sikeres vállalkozót segítettünk el céljaikhoz. Nem csak tanácsokat adunk, hanem valódi partnerek vagyunk az üzleti útvonalon.',
    'about-excellence': 'Kiválóság',
    'about-excellence-desc': 'Minden tevékenységünkben a legmagasabb színvonalra törekszünk, és elvárjuk azt ügyfeleink részéről is.',
    'about-community': 'Közösség',
    'about-community-desc': 'Erős kapcsolatokat építünk, ahol a tagok támogatják és inspirálják egymást.',
    'about-results': 'Eredmények',
    'about-results-desc': 'A gyakorlati, mérhető eredményekre fókuszálunk, nem csak az elméletre.',
    'about-mentors': 'Tapasztalt',
    'about-mentors-title': 'Mentoraink',
    'about-mentors-desc': 'Üzleti vezetők és vállalkozók, akik saját bőrükön tapasztalták meg a növekedés kihívásait',
    'about-ready': 'Készen állsz, hogy velünk dolgozz?',
    'about-ready-desc': 'Jelentkezz most, és kezdd el az együttműködést tapasztalt mentorainkkal, akik segítenek elérni céljaidat.',
    'about-free-consultation': 'Ingyenes Konzultáció',
    'services-badge': 'Prémium Programok',
    'services-program-label': 'Válaszd ki a',
    'services-program': 'programod',
    'services-program-desc': 'Személyre szabott mentoring és coaching szolgáltatások minden szinten, minden céllal rendelkező vállalkozónak.',
    'services-exec-mentoring': 'Executive Mentoring',
    'services-exec-desc': '1-1 személyre szabott mentoring program',
    'services-pricing-6months': '/ 6 hónap',
    'services-business-coaching': 'Üzleti Coaching',
    'services-business-desc': 'Csoportos coaching program',
    'services-pricing-3months': '/ 3 hónap',
    'services-leadership': 'Leadership Program',
    'services-leadership-desc': 'Vezetői készségfejlesztés',
    'services-pricing-12weeks': '/ 12 hét',
    'services-popular': 'Népszerű',
    'services-how-works': 'Hogyan',
    'services-how-works-title': 'Működik',
    'services-how-desc': 'Egyszerű, áttekinthető folyamat a sikeres együttműködéshez',
    'services-step-1': 'Ingyenes Konzultáció',
    'services-step-1-desc': 'Foglalj egy 30 perces ingyenes konzultációt, ahol megismerjük egymást és megbeszéljük céljaidat.',
    'services-step-2': 'Program Kiválasztás',
    'services-step-2-desc': 'Segítünk kiválasztani a számodra legmegfelelőbb programot és mentort az igényeid alapján.',
    'services-step-3': 'Stratégia Kidolgozás',
    'services-step-3-desc': 'Közösen kidolgozunk egy személyre szabott stratégiát és akciótervet a célok eléréséhez.',
    'services-step-4': 'Végrehajtás & Eredmények',
    'services-step-4-desc': 'Rendszeres találkozók, folyamatos támogatás és mérhető eredmények a teljes program alatt.',
    'services-faq-title': 'Gyakori',
    'services-faq-title-2': 'Kérdések',
    'services-faq-desc': 'Válaszok a leggyakrabban feltett kérdésekre',
    'services-faq-1': 'Ki jelentkezhet a programokra?',
    'services-faq-2': 'Online vagy offline formában zajlanak a sessions?',
    'services-faq-3': 'Mennyi idő alatt láthatók az eredmények?',
    'services-faq-4': 'Van-e lehetőség részletfizetésre?',
    'services-faq-5': 'Mi történik, ha nem vagyok elégedett a programmal?',
    'services-ready': 'Készen állsz a változásra?',
    'services-ready-desc': 'Foglalj egy ingyenes 30 perces konzultációt, és beszéljük meg, hogyan vihetjük a vállalkozásod a következő szintre.',
    'stories-badge': 'Valódi Eredmények',
    'stories-title': 'Sikeres',
    'stories-title-2': 'Ügyfeleink',
    'stories-desc': 'Olvass valódi történeteket vállalkozóktól, akik elérték céljaikat a BossClub mentoring programjaival.',
    'stories-impact-title': 'Összesített',
    'stories-impact-title-2': 'Eredményeink',
    'stories-impact-desc': 'Ügyfeleink által elért mérhető sikerek az elmúlt években',
    'stories-impact-revenue': 'Generált extra bevétel',
    'stories-impact-growth': 'Átlagos növekedési ráta',
    'stories-impact-jobs': 'Létrehozott munkahely',
    'stories-impact-retention': 'Ügyfél megtartási arány',
    'stories-case-studies': 'Részletes',
    'stories-case-studies-2': 'Esettanulmányok',
    'stories-case-studies-desc': 'Mélyreható betekintés ügyfeleink sikeres átalakulásába',
    'blog-badge': 'Szakmai Tartalmak',
    'blog-title': 'Blog &',
    'blog-title-2': 'Hírek',
    'blog-desc': 'Szakmai cikkek, üzleti tippek és vezetési tanácsok sikeres vállalkozóktól és mentoroktól.',
    'blog-featured': 'Kiemelt Cikk',
    'blog-filter-all': 'Összes',
    'blog-filter-leadership': 'Leadership',
    'blog-filter-scaling': 'Skálázás',
    'blog-filter-marketing': 'Marketing',
    'blog-filter-finance': 'Pénzügy',
    'blog-filter-productivity': 'Produktivitás',
    'blog-newsletter-title': 'Iratkozz fel hírlevelünkre',
    'blog-newsletter-desc': 'Heti szakmai tartalmak, üzleti tippek és exkluzív ajánlatok közvetlenül az emailedbe.',
    'blog-newsletter-btn': 'Feliratkozom',
    'blog-newsletter-privacy': 'Bármikor leiratkozhatsz. Adataidat bizalmasan kezeljük.',
    'blog-cta-title': 'Szeretnél személyre szabott tanácsokat?',
    'blog-cta-desc': 'Foglalj ingyenes konzultációt, és beszéljük meg, hogyan segíthetünk neked vállalkozásod növelésében.',
    'application-badge': 'Kezdd El Most',
    'application-title': 'Jelentkezz',
    'application-title-2': 'programjainkra',
    'application-desc': 'Foglalj ingyenes konzultációt, és beszéljük meg, hogyan segíthetünk elérni céljaidat.',
    'application-form-title': 'Jelentkezési Űrlap',
    'application-form-desc': 'Töltsd ki az alábbi űrlapot, és hamarosan felvesszük veled a kapcsolatot.',
    'application-step-1': '1. lépés / 4',
    'application-step-25': '25%',
    'application-personal': 'Személyes Adatok',
    'application-business': 'Vállalkozási Adatok',
    'application-program': 'Program Kiválasztás',
    'application-additional': 'További Információk',
    'application-secure': 'Biztonságos adatkezelés',
    'application-free': '100% ingyenes konzultáció',
    'application-response': '24 órán belül válaszolunk',
    'application-full-name': 'Teljes név',
    'application-full-name-placeholder': 'Kovács János',
    'application-email': 'Email cím',
    'application-email-placeholder': 'janos@example.com',
    'application-phone': 'Telefonszám',
    'application-phone-placeholder': '+36 30 316 5408',
    'application-city': 'Város',
    'application-city-placeholder': 'Budapest',
    'application-next': 'Következő',
    'application-back': 'Vissza',
    'application-submit': 'Jelentkezés elküldése',
    'application-company': 'Vállalkozás neve',
    'application-company-placeholder': 'Cégnév Kft.',
    'application-industry': 'Iparág',
    'application-industry-placeholder': 'Válassz iparágat',
    'application-industry-tech': 'Technológia & IT',
    'application-industry-marketing': 'Marketing & Reklám',
    'application-industry-consulting': 'Tanácsadás',
    'application-industry-ecommerce': 'E-commerce',
    'application-industry-manufacturing': 'Gyártás',
    'application-industry-finance': 'Pénzügy',
    'application-industry-healthcare': 'Egészségügy',
    'application-industry-education': 'Oktatás',
    'application-industry-other': 'Egyéb',
    'application-team-size': 'Csapat méret',
    'application-team-size-placeholder': 'Válassz méretet',
    'application-team-size-1-5': '1-5 fő',
    'application-team-size-6-10': '6-10 fő',
    'application-team-size-11-25': '11-25 fő',
    'application-team-size-26-50': '26-50 fő',
    'application-team-size-51-100': '51-100 fő',
    'application-team-size-100plus': '100+ fő',
    'application-revenue': 'Éves bevétel (opcionális)',
    'application-revenue-placeholder': 'Válassz kategóriát',
    'application-revenue-0-100k': '0 - 100k EUR',
    'application-revenue-100k-500k': '100k - 500k EUR',
    'application-revenue-500k-1m': '500k - 1M EUR',
    'application-revenue-1m-5m': '1M - 5M EUR',
    'application-revenue-5mplus': '5M+ EUR',
    'application-program-label': 'Melyik program érdekel?',
    'application-executive': 'Executive Mentoring',
    'application-executive-desc': '1-1 személyre szabott mentoring',
    'application-coaching': 'Üzleti Coaching',
    'application-coaching-desc': 'Csoportos coaching program',
    'application-leadership': 'Leadership Program',
    'application-leadership-desc': 'Vezetői készségfejlesztés',
    'application-unsure': 'Nem vagyok biztos',
    'application-unsure-desc': 'Segítsetek kiválasztani',
    'application-challenges': 'Mik a fő kihívásaid?',
    'application-challenges-placeholder': 'Írd le röviden, milyen kihívásokkal nézel szembe jelenleg...',
    'application-start-date': 'Mikor szeretnél kezdeni?',
    'application-start-date-placeholder': 'Válassz időpontot',
    'application-start-date-asap': 'Minél hamarabb',
    'application-start-date-1month': '1 hónapon belül',
    'application-start-date-3months': '3 hónapon belül',
    'application-start-date-later': 'Később',
    'application-comments': 'További megjegyzések',
    'application-comments-placeholder': 'Van valami, amit még szeretnél megosztani velünk?',
    'application-terms-text': 'Elfogadom az',
    'application-terms-link': 'Általános Szerződési Feltételeket',
    'application-terms-and': 'és az',
    'application-privacy-link': 'Adatvédelmi Tájékoztatót',
    'application-newsletter': 'Szeretnék hírlevelet kapni szakmai tartalmakkal és exkluzív ajánlatokkal.',
    'application-source': 'Hogyan hallottál rólunk?',
    'application-source-placeholder': 'Válassz lehetőséget',
    'featured-article-title': '5 kulcsfontosságú stratégia a vállalkozás skálázásához 2024-ben',
    'featured-article-desc': 'A sikeres skálázás nem csak a növekedésről szól, hanem arról, hogy fenntartható módon építsd fel a vállalkozásod alapjait. Ebben a cikkben 5 tesztet stratégiát osztunk meg, amelyek segítenek elérni célaidat.',
    'featured-article-link': 'Olvasd el',
    'blog-card-1-title': 'Hogyan építs erős vállalati kultúrát?',
    'blog-card-1-desc': 'A vállalati kultúra az alapja minden sikeres cégnek. Ebben a cikkben megmutatjuk, hogyan teremthetsz olyan környezetet...',
    'blog-card-1-author': 'Dr. Kovács András',
    'blog-card-1-date': '2024. jan. 15.',
    'blog-card-2-title': 'A skálázás 7 szakasza és kihívásai',
    'blog-card-2-desc': 'Minden vállalkozás más-más szakaszban van. Ismerd meg a hét főbb fejlődési szintet és azok jellemzőit...',
    'blog-card-2-author': 'Takács Péter',
    'blog-card-2-date': '2024. jan. 12.',
    'blog-card-3-title': 'Content Marketing stratégiák 2024-re',
    'blog-card-3-desc': 'A tartalommarketing folyamatosan változik. Íme a legújabb trendek és stratégiák, amelyeket érdemes követned...',
    'blog-card-3-author': 'Nagy Zsuzsanna',
    'blog-card-3-date': '2024. jan. 10.',
    'blog-card-4-title': 'Befektetői megállapodások buktatói',
    'blog-card-4-desc': 'Mielőtt aláírsz egy befektetői szerződést, ismerd meg a leggyakoribb hibákat és azok elkerülését...',
    'blog-card-4-author': 'Takács Péter',
    'blog-card-4-date': '2024. jan. 8.',
    'blog-card-5-title': 'Time Management a vezetők számára',
    'blog-card-5-desc': 'Hogyan használd hatékonyabban az idődet? Gyakorlati tippek és eszközök elfoglalt vezetőknek...',
    'blog-card-5-author': 'Horváth Eszter',
    'blog-card-5-date': '2024. jan. 5.',
    'blog-card-6-title': 'Delegálás művészete: mikor és hogyan?',
    'blog-card-6-desc': 'A sikeres vezetők tudják, hogy nem csinálhatnak mindent egyedül. Tanuld meg a hatékony delegálás fortélyait...',
    'blog-card-6-author': 'Dr. Kovács András',
    'blog-card-6-date': '2024. jan. 3.',
    'blog-card-7-title': 'Rendszerezés: a skálázás alapja',
    'blog-card-7-desc': 'Csak akkor tudsz növekedni, ha rendszerezel. Ebben a cikkben megmutatjuk, hogyan automatizálhatod folyamataidat...',
    'blog-card-7-author': 'Szabó Gábor',
    'blog-card-7-date': '2024. jan. 1.',
    'blog-card-8-title': 'LinkedIn B2B értékesítéshez: komplett útmutató',
    'blog-card-8-desc': 'A LinkedIn a leghatékonyabb B2B marketing csatorna. Tanuld meg, hogyan építs kapcsolatokat és szerezz ügyfeleket...',
    'blog-card-8-author': 'Nagy Zsuzsanna',
    'blog-card-8-date': '2023. dec. 28.',
    'blog-card-9-title': 'Cash flow menedzsment startupoknak',
    'blog-card-9-desc': 'A pénzáramlás az életed. Hogyan tartsd kontroll alatt a vállalkozásod pénzügyeit és kerüld el a buktatókat...',
    'blog-card-9-author': 'Takács Péter',
    'blog-card-9-date': '2023. dec. 25.',
    'blog-category-leadership': 'Leadership',
    'blog-category-scaling': 'Skálázás',
    'blog-category-marketing': 'Marketing',
    'blog-category-finance': 'Pénzügy',
    'blog-category-productivity': 'Produktivitás',
    'footer-link-home': 'Főoldal',
    'footer-link-about': 'Rólunk',
    'footer-link-services': 'Szolgáltatások',
    'footer-link-stories': 'Sikertörténetek',
    'footer-link-blog': 'Blog',
    'services-page-badge': 'Prémium Programok',
    'services-page-title': 'Válaszd ki a',
    'services-page-title-2': 'programod',
    'services-page-desc': 'Személyre szabott mentoring és coaching szolgáltatások minden szinten, minden céllal rendelkező vállalkozónak.',
    'services-pricing-title': 'Prémium',
    'services-pricing-title-2': 'Csomagjaink',
    'services-pricing-desc': 'Válaszd ki a számodra megfelelő programot és kezdd el az utazást a következő szint felé',
    'pricing-card-1-name': 'Bootcamp vállalkozóknak (2 nap)',
    'pricing-card-1-desc': 'Intenzív, gyakorlatorientált bootcamp tapasztalt mentorokkal, amely a növekedés és a működési hatékonyság gyakorlati eszközeit adja át.',
    'pricing-card-1-price': '120.000 Ft',
    'pricing-card-1-period': '/ 2 nap',
    'pricing-card-1-feature-1': '2 napos intenzív képzés',
    'pricing-card-1-feature-2': 'Változásmenedzsment',
    'pricing-card-1-feature-3': 'OKR-ek (Célkitűzések, Kulcsfontosságú Eredmények)',
    'pricing-card-1-feature-4': 'Szervezetfejlesztés és folyamatépítés',
    'pricing-card-1-feature-5': 'Tapasztalt mentorhálózat és gyakorlati tanácsok',
    'pricing-card-2-name': 'Bootcamp diákoknak / pályakezdőknek (2 nap)',
    'pricing-card-2-desc': 'Gyakorlati készségek a munkaerőpiacra lépéshez: állásinterjú technikák, önmarketing és személyes márkaépítés.',
    'pricing-card-2-price': '70.000 Ft',
    'pricing-card-2-period': '/ 2 nap',
    'pricing-card-2-badge': 'Népszerű',
    'pricing-card-2-feature-1': '2 napos gyakorlati bootcamp',
    'pricing-card-2-feature-2': 'Karriertervezés és személyes stratégiaalkotás',
    'pricing-card-2-feature-3': 'Állásinterjú technikák és bemutatkozás',
    'pricing-card-2-feature-4': 'Önéletrajz és LinkedIn profilépítés',
    'pricing-card-2-feature-5': 'Hálózatépítési etikett és kapcsolati stratégia',
    'pricing-card-3-name': 'Bootcamp leendő vezetőknek (2 nap)',
    'pricing-card-3-desc': 'Vezetői készségek és döntéshozatali gyakorlatok valós szimulációkkal és visszajelzés-kultúrával.',
    'pricing-card-3-price': '95.000 Ft',
    'pricing-card-3-period': '/ 2 nap',
    'pricing-card-3-feature-1': '2 napos vezetői intenzív',
    'pricing-card-3-feature-2': 'Kommunikációs és befolyásolási technikák',
    'pricing-card-3-feature-3': 'Valós döntéshozatali szimulációk',
    'pricing-card-3-feature-4': 'Vezetői gondolkodásmód és konfliktuskezelés',
    'pricing-card-3-feature-5': 'Visszajelzéskultúra és coaching technikák',
    'pricing-btn-apply': 'Jelentkezés',
    'process-title': 'Hogyan',
    'process-title-2': 'Működik',
    'process-desc': 'Egyszerű, áttekinthető folyamat a sikeres együttműködéshez',
    'process-step-1-title': 'Ingyenes Konzultáció',
    'process-step-1-desc': 'Foglalj egy 30 perces ingyenes konzultációt, ahol megismerjük egymást és megbeszéljük céljaidat.',
    'process-step-2-title': 'Program Kiválasztás',
    'process-step-2-desc': 'Segítünk kiválasztani a számodra legmegfelelőbb programot és mentort az igényeid alapján.',
    'process-step-3-title': 'Stratégia Kidolgozás',
    'process-step-3-desc': 'Közösen kidolgozunk egy személyre szabott stratégiát és akciótervet a célok eléréséhez.',
    'process-step-4-title': 'Végrehajtás & Eredmények',
    'process-step-4-desc': 'Rendszeres találkozók, folyamatos támogatás és mérhető eredmények a teljes program alatt.',
    'faq-title': 'Gyakori',
    'faq-title-2': 'Kérdések',
    'faq-desc': 'Válaszok a leggyakrabban feltett kérdésekre',
    'faq-q1': 'Ki jelentkezhet a programokra?',
    'faq-a1': 'Programjaink vállalkozóknak, üzleti vezetőknek és olyan szakembereknek szólnak, akik szeretnék fejleszteni vezetői készségeiket vagy növelni vállalkozásuk eredményességét. Különösen ajánljuk azoknak, akik már rendelkeznek néhány év tapasztalattal és készen állnak a következő szintre lépésre.',
    'faq-q2': 'Online vagy offline formában zajlanak a sessions?',
    'faq-a2': 'Mind az online, mind az offline formátumot kínáljuk, rugalmasan igazodva az ügyfelek igényeihez. Az Executive Mentoring sessions jellemzően online zajlanak, de személyes találkozókra is van lehetőség. A Leadership Program pedig kombinált formátumot követ: heti online és havi offline találkozókkal.',
    'faq-q3': 'Mennyi idő alatt láthatók az eredmények?',
    'faq-a3': 'Az első eredmények általában már a program első hetei után megmutatkoznak gondolkodásmód és megközelítés változásában. Mérhető üzleti eredmények 2-3 hónap után jelentkeznek, de a legnagyobb áttörések gyakran a program második felében történnek, amikor a stratégiák teljes mértékben implementálásra kerülnek.',
    'faq-q4': 'Van-e lehetőség részletfizetésre?',
    'faq-a4': 'Igen, minden programunkhoz biztosítunk rugalmas fizetési lehetőségeket. Az Executive Mentoring esetében 3 részletben, az Üzleti Coaching esetében 2 részletben is fizethető. A részletekről az ingyenes konzultáción egyeztetünk.',
    'faq-q5': 'Mi történik, ha nem vagyok elégedett a programmal?',
    'faq-a5': 'Kínálunk 30 napos pénz-vissza garanciát. Ha az első hónapban úgy érzed, hogy a program nem felel meg az elvárásaidnak, teljes mértékben visszatérítjük a befizetett összeget. Célunk, hogy minden ügyfelünk elégedett legyen, és valódi értéket kapjon.',
    'cta-services-title': 'Készen állsz a változásra?',
    'cta-services-desc': 'Foglalj egy ingyenes 30 perces konzultációt, és beszéljük meg, hogyan vihetjük a vállalkozásod a következő szintre.',
    'about-mission-badge': 'Megbízható Partnerek',
    'about-mentors': 'Tapasztalt',
    'about-mentors-intro': 'Ismerd meg',
    'about-mentors-title': 'Mentoraink',
    'about-mentors-desc': 'Üzleti vezetők és vállalkozók, akik saját bőrükön tapasztalták meg a növekedés kihívásait',
    'about-mission': 'Küldétésünk',
    'about-mission-desc': 'A BossClub küldétése, hogy segítsen ambiációzus vállalkozóknak és vezetőknek elérni teljes potenciáljukat. Hiszünk abban, hogy a megfelelő mentoralással és támogatással minden vállalkozás képes exponenciális növekedésre.',
    'about-mission-details': '15+ év tapasztalattal rendelkezünk az üzleti mentoring területen, és büszkék vagyunk arra, hogy 500+ sikeres vállalkozót segítettünk el céljaikhoz. Nem csak tanácsokat adunk, hanem valódi partnerek vagyunk az üzleti útvonalon.',
    'about-excellence': 'Kiválóság',
    'about-excellence-desc': 'Minden tevékenységünkben a legmagasabb színvonalra törekszünk, és elvárjuk azt ügyfeleink részéről is.',
    'about-community': 'Közösség',
    'about-community-desc': 'Erős kapcsolatokat építünk, ahol a tagok támogatják és inspirálják egymást.',
    'about-results': 'Eredmények',
    'about-results-desc': 'A gyakorlati, mérhető eredményekre fókuszálunk, nem csak az elméletre.',
    'mentor-1-name': 'Groó Gyula',
    'mentor-1-title': 'Üzleti Mentor & Stratégiai Tanácsadó',
    'mentor-1-quote': '"Kiemelkedő tapasztalattal rendelkezik KKV-k piacra lépési stratégiájának kialakításában, márkaépítésben és ügyfelélközpontú üzletfejlesztésben."',
    'mentor-1-bio': 'Több mint 30 éve dolgozik marketing, értékesítés és üzletfejlesztés terúletén, ebből 20 évet a hazai autóipar és flottakezelés meghatározó szereplőinél töltött.',
    'mentor-1-highlight-1': 'KKV-s tapasztalat: operátív és stratégiai szinten segített cégeket sikeres pályára állítani',
    'mentor-1-highlight-2': 'Gyakorlati tudás értékesítésben, szolgáltatásfejlesztésben',
    'mentor-1-highlight-3': 'Szenvedélye a tudásmegosztás: felsőoktatási szerepvállalás, és az új generáció támogatása',
    'mentor-1-tag-1': 'Stratégia',
    'mentor-1-tag-2': 'Üzletfejlesztés',
    'mentor-1-tag-3': 'Márkaépítés',
    'mentor-2-name': 'Dunai Olivér',
    'mentor-2-title': 'Digitális Marketing & Tech Szakértő',
    'mentor-2-quote': '"Abban hiszek, hogy egy szervezet akkor működik jól, ha az ember is érti, mit miért csinál – és közben a cég is halad a saját vízió ja felé. A stratégia nem csak terv, a kultúra nem csak hangulat – mindkettő tudatos építést igényel."',
    'mentor-2-bio': 'A Deutsche Telekom IT Solutions ahol az egyik legnagyobb (700 fő) magyarországi lokáció – a pécsi iroda – vezetője, több mint egy évtizedes tapasztalattal rendelkezik multinacionális vállalati környezetben.',
    'mentor-2-highlight-1': 'Erős nemzetközi és nagyvállalati háttér – globális működés és multi szintű tapasztalat',
    'mentor-2-highlight-2': 'Coaching szemléletű vezetés – autonóm, fejlődő csapatokra épít',
    'mentor-2-highlight-3': 'Aktív szereplő a pécsi üzleti, akadémiai és közösségi kapcsolatokban',
    'mentor-2-tag-1': 'Szervezeti Kultúra',
    'mentor-2-tag-2': 'Leadership',
    'mentor-2-tag-3': 'Digitális Stratégia',
    'mentor-3-name': 'Takács Péter',
    'mentor-3-title': 'Financial Expert',
    'mentor-3-bio': 'Pénzügyi tanácsadó 25+ éves tapasztalattal. CFO szerepek Fortune 500 cégeknél. Segít a fenntartható növekedés pénzügyi alapjainak megteremtésében.',
    'mentor-3-tag-1': 'Finance',
    'mentor-3-tag-2': 'Investment',
    'mentor-3-tag-3': 'Scaling',
    'mentor-4-name': 'Horváth Eszter',
    'mentor-4-title': 'HR & Culture Specialist',
    'mentor-4-bio': '18 év HR tapasztalat, 200+ fős csapat felépítésében részt vett. Specialista a munkahelyi kultúra kialakításában és a tehetségmenedzsmentben.',
    'mentor-4-tag-1': 'HR',
    'mentor-4-tag-2': 'Team Building',
    'mentor-4-tag-3': 'Culture',
    'mentor-5-name': 'Szabó Gábor',
    'mentor-5-title': 'Operations Director',
    'mentor-5-bio': 'Operációs igazgató 20+ év tapasztalattal. Lean és agile módszertanok szakértője. Segít hatékony működési folyamatok kialakításában.',
    'mentor-5-tag-1': 'Operations',
    'mentor-5-tag-2': 'Lean',
    'mentor-5-tag-3': 'Process',
    'mentor-6-name': 'Varga Marianna',
    'mentor-6-title': 'Sales & Business Development',
    'mentor-6-bio': 'Sales vezető 15+ éves tapasztalattal B2B és B2C szegmensekben. Sikeres értékesítési csapatok építésében és training programok kidolgozásában jártas.',
    'mentor-6-tag-1': 'Sales',
    'mentor-6-tag-2': 'Business Dev',
    'mentor-6-tag-3': 'Negotiation',
    'about-ready': 'Készen állsz, hogy velünk dolgozz?',
    'about-ready-desc': 'Jelentkezz most, és kezdd el az együttműködést tapasztalt mentorainkkal, akik segítenek elérni céljaidat.',
    'about-free-consultation': 'Ingyenes Konzultáció',
    'stories-badge': 'Valódi Eredmények',
    'stories-title': 'Sikeres',
    'stories-title-2': 'Ügyfeleink',
    'stories-desc': 'Olvass valódi történeteket vállalkozóktól, akik elérték céljaikat a BossClub mentoring programjaival.',
    'stories-impact-title': 'Összesített',
    'stories-impact-title-2': 'Eredményeink',
    'stories-impact-desc': 'Ügyfeleink által elért mérhető sikerek az elmúlt években',
    'stories-impact-revenue': 'Generált extra bevétel',
    'stories-impact-growth': 'Átlagos növekedési ráta',
    'stories-impact-jobs': 'Létrehozott munkahely',
    'stories-impact-retention': 'Ügyfél megtartási arány',
    'stories-case-studies': 'Részletes',
    'stories-case-studies-2': 'Esettanulmányok',
    'stories-case-studies-desc': 'Mélyreható betekintés ügyfeleink sikeres átalakulásába',
    'case-study-1-company': 'TechVenture Kft.',
    'case-study-1-title': 'Hogyan dupláztuk meg a bevételt 6 hónap alatt',
    'case-study-1-subtitle': 'Executive Mentoring Program',
    'case-study-1-metric-1': '+120%',
    'case-study-1-metric-1-label': 'Bevétel növekedés',
    'case-study-1-metric-2': '15 → 35',
    'case-study-1-metric-2-label': 'Csapat méret',
    'case-study-1-metric-3': '3x',
    'case-study-1-metric-3-label': 'Ügyfélszám',
    'case-study-1-metric-4': '€2.5M',
    'case-study-1-metric-4-label': 'Éves forgalom',
    'case-study-1-situation': '<strong>Helyzet:</strong> A TechVenture egy gyorsan növekvő IT szolgáltató cég volt, amely elérte a növekedési plafont. A CEO, Nagy Péter nehezen tudta kezelni a megnövekedett terhelést, és a vállalat több kulcsfontosságú projektet is veszíteni kezdett.',
    'case-study-1-solution': '<strong>Megoldás:</strong> A BossClub Executive Mentoring programjában Péter személyre szabott stratégiát dolgozott ki mentoraival. Fókuszban volt a delegálás javítása, hatékony csapatvezetés kialakítása, és egy skalálható üzleti modell felépítése.',
    'case-study-1-result': '<strong>Eredmény:</strong> 6 hónap alatt a vállalat bevétele megduplázódott, a csapat létszáma 35 főre nőtt, és új üzletágakat nyitottak. Péter most már bizalommal delegál, és többet tud fókuszálni a stratégiai döntésekre.',
    'case-study-1-quote': '"A BossClub programja teljesen megváltoztatta a vállalkozásom és a gondolkodásomat. Most már tudom, hogyan építsek egy valóban skalálható céget, és végre időm van a stratégiai fejlesztésre is."',
    'case-study-1-author': 'Nagy Péter',
    'case-study-1-author-title': 'CEO, TechVenture Kft.',
    'case-study-2-company': 'Digital Marketing Agency',
    'case-study-2-title': 'Ügyfélszerzés 10x-esére növelése strukturált folyamatokkal',
    'case-study-2-subtitle': 'Üzleti Coaching Program',
    'case-study-2-metric-1': '10x',
    'case-study-2-metric-1-label': 'Új ügyfelek száma',
    'case-study-2-metric-2': '+300%',
    'case-study-2-metric-2-label': 'Marketing ROI',
    'case-study-2-metric-3': '45%',
    'case-study-2-metric-3-label': 'Konverziós ráta',
    'case-study-2-metric-4': '€1.8M',
    'case-study-2-metric-4-label': 'Éves forgalom',
    'case-study-2-situation': '<strong>Helyzet:</strong> Kovács Anna ügynöksége kiváló munkát végzett, de az ügyfélszerzés ad-hoc módon történt, és nehéz volt előre jelezni a bevételt. Az értékesítési folyamat sem volt standardizálva.',
    'case-study-2-solution': '<strong>Megoldás:</strong> Az Üzleti Coaching programban Anna csoportos sessions keretében tanulta meg a hatékony értékesítési tölcsér felépítését, marketing automációt, és lead nurturing stratégiákat. A közösség tagjaival folyamatosan osztották meg tapasztalataikat és tanultak egymástól.',
    'case-study-2-result': '<strong>Eredmény:</strong> 3 hónap alatt az új ügyfelek száma 10-szeresére nőtt, a marketing ROI 300%-kal javult, és az ügynökség bevétele az első évben elérte az 1.8M eurót. Most már egy kiszámítható, skalálható ügyfélszerzési rendszerrel rendelkeznek.',
    'case-study-2-quote': '"A coaching program nem csak stratégiát adott, hanem egy közösséget is, ahol folyamatosan tudok tanulni és inspirálódni. Az ügyfélszerzés most már egy jól működő gépezetté vált."',
    'case-study-2-author': 'Kovács Anna',
    'case-study-2-author-title': 'Founder, Digital Marketing Agency',
    'case-study-3-company': 'InnovateCorp',
    'case-study-3-title': 'Vezetői csapat átalakítása és produktivitás növelés',
    'case-study-3-subtitle': 'Leadership Program',
    'case-study-3-metric-1': '+85%',
    'case-study-3-metric-1-label': 'Csapat produktivitás',
    'case-study-3-metric-2': '92%',
    'case-study-3-metric-2-label': 'Elégedettségi index',
    'case-study-3-metric-3': '-60%',
    'case-study-3-metric-3-label': 'Fluktuáció csökkenés',
    'case-study-3-metric-4': '50 → 120',
    'case-study-3-metric-4-label': 'Csapat méret',
    'case-study-3-situation': '<strong>Helyzet:</strong> Tóth Gábor vállalata gyorsan nőtt, de a vezetői csapat nem tudott lépést tartani. Magas volt a fluktuáció, alacsony a csapat morálja, és a projektek gyakran késtek.',
    'case-study-3-solution': '<strong>Megoldás:</strong> A Leadership Program során Gábor és vezető csapata átfogó képzést kapott modern vezetési technikákról, kommunikációról, konfliktuskezelésről és csapatépítésről. Practice-based megközelítéssel valós helyzeteket dolgoztak fel.',
    'case-study-3-result': '<strong>Eredmény:</strong> 12 hét alatt a csapat produktivitása 85%-kal nőtt, a dolgozói elégedettség 92%-ra ugrott, és a fluktuáció 60%-kal csökkent. A vállalat most már 120 fővel működik, stabil vezetői csapattal.',
    'case-study-3-quote': '"A Leadership Program segített megérteni, hogy a siker nem csak a stratégiámon múlik, hanem az embereken. Most már tudom, hogyan inspiráljam és motiváljam a csapatomat."',
    'case-study-3-author': 'Tóth Gábor',
    'case-study-3-author-title': 'Managing Director, InnovateCorp',
    'cta-stories-title': 'Te is így akarsz sikereket elérni?',
    'cta-stories-desc': 'Csatlakozz sikeres ügyfeleinkhez, és kezdd el a saját növekedési utadat a BossClub mentoring programjaival.',
    'application-badge': 'Kezdj Most',
    'application-title': 'Jelentkezz a',
    'application-title-2': 'programjainkra',
    'application-desc': 'Foglalj egy ingyenes konzultációt és beszéljük meg, hogyan tudunk segíteni a céljaid elérésében.',
    'application-form-title': 'Jelentkezési Űrlap',
    'application-form-desc': 'Töltsd ki az alábbi űrlapot, és hamarosan felvesszük veled a kapcsolatot.',
    'application-personal': 'Személyes Adatok',
    'application-business': 'Vállalkozási Adatok',
    'application-program': 'Program Kiválasztás',
    'application-additional': 'További Információk',
    'application-full-name': 'Teljes név',
    'application-full-name-placeholder': 'Kovács János',
    'application-email': 'Email cím',
    'application-email-placeholder': 'janos@example.com',
    'application-phone': 'Telefonszám',
    'application-phone-placeholder': '+36 30 316 5408',
    'application-city': 'Város',
    'application-city-placeholder': 'Budapest',
    'application-company-name': 'Vállalkozás neve',
    'application-company-placeholder': 'Cégnév Kft.',
    'application-industry': 'Iparág',
    'application-industry-placeholder': 'Válassz iparágat',
    'application-team-size': 'Csapat méret',
    'application-team-size-placeholder': 'Válassz méretet',
    'application-revenue': 'Éves bevétel (opcionális)',
    'application-revenue-placeholder': 'Válassz kategóriát',
    'application-program-label': 'Melyik program érdekel?',
    'application-executive': 'Executive Mentoring',
    'application-executive-desc': '1-1 személyre szabott mentoring',
    'application-coaching': 'Üzleti Coaching',
    'application-coaching-desc': 'Csoportos coaching program',
    'application-leadership': 'Leadership Program',
    'application-leadership-desc': 'Vezetői készségfejlesztés',
    'application-unsure': 'Nem vagyok biztos',
    'application-unsure-desc': 'Segítsetek kiválasztani',
    'application-challenges': 'Mik a fő kihívásaid?',
    'application-challenges-placeholder': 'Írd le röviden, milyen kihívásokkal nézel szembe jelenleg...',
    'application-source': 'Hogyan hallottál rólunk?',
    'application-source-placeholder': 'Válassz lehetőséget',
    'application-start-date': 'Mikor szeretnél kezdeni?',
    'application-start-date-placeholder': 'Válassz időpontot',
    'application-comments': 'További megjegyzések',
    'application-comments-placeholder': 'Van valami, amit még szeretnél megosztani velünk?',
    'application-terms': 'Elfogadom az ',
    'application-terms-link': 'Általános Szerződési Feltételeket',
    'application-terms-and': ' és az ',
    'application-terms-privacy': 'Adatvédelmi Tájékoztatót',
    'application-newsletter': 'Szeretnék hírlevelet kapni szakmai tartalmakkal és exkluzív ajánlatokkal.',
    'application-next': 'Következő',
    'application-prev': 'Vissza',
    'application-submit': 'Jelentkezés elküldése'
  }
};

/**
 * Language Switcher and Content Update Logic
 */
function updateLanguage(lang) {
  // 1. Update text content
  const elements = document.querySelectorAll('[data-i18n]');
  const dictionary = translations[lang] || translations['hu'];

  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (dictionary[key]) {
      // Handle placeholder attributes for input and textarea elements
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.setAttribute('placeholder', dictionary[key]);
      } else if (element.children.length > 0 && element.tagName !== 'P' && element.tagName !== 'H1' && element.tagName !== 'H2') {
         Array.from(element.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
               node.textContent = " " + dictionary[key] + " ";
            }
         });
      } else {
         element.innerHTML = dictionary[key];
      }
    }
  });

  // 2. Update Button (Flag and Text)
  const langCurrentButton = document.querySelector('.lang-current');
  if (langCurrentButton) {
      const flagContainer = langCurrentButton.querySelector('.lang-flag');
      const textContainer = langCurrentButton.querySelector('.lang-text'); 

      if (lang === 'en') {
          if (flagContainer) flagContainer.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg" alt="English">';
          if (textContainer) textContainer.textContent = 'GB';
      } else {
          if (flagContainer) flagContainer.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg" alt="Magyar">';
          if (textContainer) textContainer.textContent = 'HU';
      }
  }

  // 3. Mark active link
  document.querySelectorAll('.lang-link').forEach(link => {
      link.classList.remove('current');
      if (link.getAttribute('data-lang') === lang) {
          link.classList.add('current');
      }
  });

  document.documentElement.lang = lang;
  
  // Save selected language to LocalStorage
  localStorage.setItem('preferredLanguage', lang);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const langLinks = document.querySelectorAll('.lang-link');
    
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            
            // Update language
            updateLanguage(selectedLang);
            
            // >>> CLOSE DROPDOWN LOGIC <<<
            // 1. Find the main container
            const dropdownWrapper = this.closest('.lang-dropdown');
            
            if (dropdownWrapper) {
                // 2. Find the button and dropdown options
                const button = dropdownWrapper.querySelector('.lang-current');
                const options = dropdownWrapper.querySelector('.lang-options');
                
                // 3. Remove active class -> This closes it
                if (button) button.classList.remove('active');
                if (options) options.classList.remove('active');
            }
        });
    });

    // Load saved language from LocalStorage or use default 'hu'
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'hu';
    updateLanguage(savedLanguage);
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
  const darkModeBtn = document.querySelector('.dark-mode-btn');
  if (darkModeBtn) {
    const darkIcon = darkModeBtn.querySelector('.dark-icon');
    const lightIcon = darkModeBtn.querySelector('.light-icon');
    
    // Function to update icon visibility
    function updateIconDisplay() {
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      if (isDarkMode) {
        // In dark mode, show light icon (sun - to switch to light mode)
        darkIcon.style.opacity = '0';
        lightIcon.style.opacity = '1';
      } else {
        // In light mode, show dark icon (moon - to switch to dark mode)
        darkIcon.style.opacity = '1';
        lightIcon.style.opacity = '0';
      }
    }
    
    darkModeBtn.addEventListener('click', function() {
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      const body = document.body;
      
      if (isDarkMode) {
        // Turn off dark mode
        localStorage.setItem('darkMode', 'false');
        body.classList.remove('dark-theme');
        const themeLink = document.getElementById('dark-theme-stylesheet');
        if (themeLink) {
          themeLink.remove();
        }
      } else {
        // Turn on dark mode
        localStorage.setItem('darkMode', 'true');
        body.classList.add('dark-theme');
        
        // Remove existing theme link if any
        const existingLink = document.getElementById('dark-theme-stylesheet');
        if (existingLink) {
          existingLink.remove();
        }
        
        // Create and add new theme link
        const link = document.createElement('link');
        link.id = 'dark-theme-stylesheet';
        link.rel = 'stylesheet';
        link.href = 'css/golden-themes/theme-gold-dark.css';
        document.head.appendChild(link);
      }
      
      // Update icon display after toggle
      updateIconDisplay();
    });
    
    // Check if dark mode was previously enabled and apply it
    if (localStorage.getItem('darkMode') === 'true') {
      const body = document.body;
      body.classList.add('dark-theme');
      
      // Create and add theme link if dark mode is enabled
      const existingLink = document.getElementById('dark-theme-stylesheet');
      if (!existingLink) {
        const link = document.createElement('link');
        link.id = 'dark-theme-stylesheet';
        link.rel = 'stylesheet';
        link.href = 'css/golden-themes/theme-gold-dark.css';
        document.head.appendChild(link);
      }
    }
    
    // Initialize icon display on page load
    updateIconDisplay();
  }
});

// Theme Management - Disabled (theme switcher removed)
// Keep this commented for future reference if needed
/*
class ThemeManager {
  constructor() {
    this.currentThemeLink = null;
    this.themeKey = 'preferredTheme';
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'default';
    this.loadTheme(savedTheme);

    const themeLinks = document.querySelectorAll('.theme-link');
    themeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const themePath = link.getAttribute('data-path');
        const themeId = link.getAttribute('data-theme');
        this.loadTheme(themeId, themePath);
        
        const dropdown = link.closest('.theme-dropdown');
        const button = dropdown.querySelector('.theme-current');
        const options = dropdown.querySelector('.theme-options');
        if (button) button.classList.remove('active');
        if (options) options.classList.remove('active');
      });
    });
  }

  loadTheme(themeId, themePath = null) {
    if (!themePath) {
      const themeLink = document.querySelector(`[data-theme="${themeId}"]`);
      if (themeLink) {
        themePath = themeLink.getAttribute('data-path');
      }
    }

    if (this.currentThemeLink) {
      this.currentThemeLink.remove();
      this.currentThemeLink = null;
    }

    if (!themePath || themePath === '') {
      this.updateActiveState(themeId);
      localStorage.setItem(this.themeKey, themeId);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = themePath;
    link.id = 'theme-stylesheet';
    
    document.head.appendChild(link);
    
    this.currentThemeLink = link;

    localStorage.setItem(this.themeKey, themeId);

    this.updateActiveState(themeId);
  }

  updateActiveState(themeId) {
    const themeLinks = document.querySelectorAll('.theme-link');
    themeLinks.forEach(link => {
      if (link.getAttribute('data-theme') === themeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const activeLink = document.querySelector(`[data-theme="${themeId}"]`);
    if (activeLink) {
      const themeName = activeLink.querySelector('span:last-child').textContent;
      const themeButton = document.querySelector('.theme-current');
      if (themeButton) {
        themeButton.querySelector('.theme-text').textContent = themeName;
      }
    }
  }
}
*/