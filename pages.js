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

  // ======================================
  // 7. CAROUSEL INIT
  // ======================================
  function initCarousel(trackId, prevId, nextId, dotsId, opts = {}) {
    const track = document.getElementById(trackId);
    const outer = track ? track.parentElement : null;
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsContainer = document.getElementById(dotsId);

    if (!track || !outer) return;

    const slides = track.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    let current = 0;
    let autoplayInterval = null;
    let isVisible = false;
    let cachedSlidesVisible = getSlidesVisible();
    let dots = [];

    function getSlidesVisible() {
      const outerW = outer.clientWidth;
      if (outerW < 500) return 1;
      if (outerW < 800) return 2;
      return opts.visibleDesktop || 3;
    }

    function setSlideWidths() {
      cachedSlidesVisible = getSlidesVisible();
      const w = (100 / cachedSlidesVisible) + '%';
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = w;
      }
    }

    function totalPositions() {
      return Math.max(0, slides.length - cachedSlidesVisible);
    }

    function goTo(index, isManual = false) {
      const total = totalPositions();
      current = Math.max(0, Math.min(index, total));
      const slideW = 100 / cachedSlidesVisible;
      track.style.transform = `translate3d(-${current * slideW}%, 0, 0)`;
      updateDotsState(isManual);
    }

    function buildDots() {
      if (!dotsContainer) return;
      const total = totalPositions();
      dotsContainer.innerHTML = '';
      dots = [];
      for (let i = 0; i <= total; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === current ? ' active' : '');
        const idx = i;
        dot.addEventListener('click', () => {
          stopAutoplay();
          goTo(idx, true);
          if (isVisible) startAutoplay();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
    }

    function updateDotsState(isManual) {
      for (let i = 0; i < dots.length; i++) {
        if (i === current) {
          dots[i].classList.add('active');
          if (window.innerWidth < 768 && isManual) {
            dots[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        } else {
          dots[i].classList.remove('active');
        }
      }
    }

    function startAutoplay() {
      if (opts.autoplay === false) return;
      stopAutoplay();
      autoplayInterval = setInterval(() => {
        const total = totalPositions();
        goTo(current >= total ? 0 : current + 1, false);
      }, 5000);
    }

    function stopAutoplay() { 
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) startAutoplay();
        else stopAutoplay();
      });
    }, { threshold: 0.1 });

    observer.observe(outer);

    setSlideWidths();
    buildDots();

    if (prevBtn) prevBtn.addEventListener('click', () => { 
      stopAutoplay(); 
      goTo(current - 1, true); 
      if (isVisible) startAutoplay(); 
    });
    if (nextBtn) nextBtn.addEventListener('click', () => { 
      stopAutoplay(); 
      goTo(current + 1, true); 
      if (isVisible) startAutoplay(); 
    });

    let touchStartX = 0;
    let touchStartY = 0;
    outer.addEventListener('touchstart', e => { 
      touchStartX = e.touches[0].clientX; 
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    outer.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        stopAutoplay();
        goTo(diffX > 0 ? current + 1 : current - 1, true);
        if (isVisible) startAutoplay();
      }
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setSlideWidths();
        buildDots();
        goTo(Math.min(current, totalPositions()), false);
      }, 150);
    }, { passive: true });
  }

  initCarousel('patients-track',  'patients-prev',  'patients-next',  'patients-dots',  { visibleDesktop: 3 });
  initCarousel('reviews-track',   'reviews-prev',   'reviews-next',   'reviews-dots',   { visibleDesktop: 3 });

});
