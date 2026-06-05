/* ==========================================
   PAGES.JS – Alphaville Odontologia
   FAQ Accordion, Form Validation, etc.
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ======================================
  // 1. FAQ ACCORDION
  // ======================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  // ======================================
  // 2. INTERSECTION OBSERVER – Scroll Animations
  // ======================================
  const animElements = document.querySelectorAll('[data-aos]');
  if (animElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
          } else {
            entry.target.classList.add('aos-animate');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    animElements.forEach(el => observer.observe(el));
  }

  // ======================================
  // 3. SMOOTH SCROLL FOR ANCHORS
  // ======================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ======================================
  // 4. CONTACT FORM (Front-end validation)
  // ======================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('form-nome');
      const tel = document.getElementById('form-telefone');
      const email = document.getElementById('form-email');
      const msg = document.getElementById('form-mensagem');
      let valid = true;

      [nome, tel, email, msg].forEach(input => {
        if (input && !input.value.trim()) {
          input.style.borderColor = '#e74c3c';
          valid = false;
        } else if (input) {
          input.style.borderColor = '';
        }
      });

      if (email && email.value && !email.value.includes('@')) {
        email.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (valid) {
        // Redirect to WhatsApp with form data
        const text = `Olá, meu nome é ${nome.value}. ${msg.value}. Meu telefone: ${tel.value}`;
        const waUrl = `https://wa.me/5511978201000?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');

        // Reset form
        contactForm.reset();
      }
    });
  }

  // ======================================
  // 5. GALLERY LIGHTBOX (simple)
  // ======================================
  const galleryItems = document.querySelectorAll('.gallery-item img');
  if (galleryItems.length > 0) {
    galleryItems.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeIn 0.3s ease';
        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        bigImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5)';
        overlay.appendChild(bigImg);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
      });
    });
  }

  // ======================================
  // 6. COUNTER ANIMATION
  // ======================================
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = target / 60;
          const update = () => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
            if (current < target) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

});
