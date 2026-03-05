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
})();
