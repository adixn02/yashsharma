/**
 * Skilled Computer Institute – Vanilla JS
 * Smooth scroll, sticky navbar, fade-in on scroll
 */

(function () {
  'use strict';

  // ---------- Sticky navbar scroll effect ----------
  const header = document.getElementById('navbar');
  if (header) {
    function onScroll() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Fade-in sections on scroll ----------
  const fadeElements = document.querySelectorAll(
    '.about, .courses .section-title, .course-card, .why-card, .gallery-item, .contact-form-wrapper, .contact-info, .section-title'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ---------- Contact form (prevent default, optional validation) ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Placeholder: add AJAX or redirect to backend
      alert('Thank you! We will get back to you soon.');
    });
  }

  // ---------- Book Classes Form (WhatsApp Integration) ----------
  const bookClassForm = document.getElementById('bookClassForm');
  if (bookClassForm) {
    bookClassForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const course = document.getElementById('userCourse').value.trim();

      // Validate fields
      if (!name || !email || !phone || !course) {
        alert('Please fill in all fields');
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return;
      }

      // Validate phone (basic)
      if (phone.length < 10) {
        alert('Please enter a valid phone number');
        return;
      }

      // Create WhatsApp message
      const message = `Hello, I want to book a free live class.\n\nProgram: ${course}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = '919753781222'; // WhatsApp number with country code
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Show success message
      const formMessage = document.getElementById('formMessage');
      formMessage.textContent = 'Redirecting to WhatsApp...';
      formMessage.style.display = 'block';

      // Redirect to WhatsApp after short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        // Reset form
        bookClassForm.reset();
        formMessage.style.display = 'none';
      }, 500);
    });
  }
})();
