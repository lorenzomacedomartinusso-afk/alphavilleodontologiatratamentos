/* ==========================================
   SCRIPT.JS – Alphaville Odontologia
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ======================================
  // 0. LAZY LOADING – Imagens
  // ======================================
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

  // ======================================
  // 1. INTERSECTION OBSERVER – animações
  // ======================================
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay');
        if (delay) {
          setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
        } else {
          entry.target.classList.add('aos-animate');
        }
        aosObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  aosElements.forEach(el => aosObserver.observe(el));

  // ======================================
  // 2. CARROSSEL – helper genérico (otimizado)
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
    let dots = []; // Cache DOM dots

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

    // Build dots once, then just toggle classes
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
          // Scroll dot into view on mobile only for manual interactions
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

    // Intersection Observer to only autoplay when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(outer);

    // Init
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

    // Touch / swipe - using passive listeners
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

    // Debounced resize
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

  // ======================================
  // 3. INICIALIZA CARROSSEIS
  // ======================================
  initCarousel('patients-track',  'patients-prev',  'patients-next',  'patients-dots',  { visibleDesktop: 3 });
  initCarousel('estrutura-track', 'estrutura-prev', 'estrutura-next', 'estrutura-dots', { visibleDesktop: 2 });
  initCarousel('reviews-track',   'reviews-prev',   'reviews-next',   'reviews-dots',   { visibleDesktop: 3 });

  // ======================================
  // 4. SCROLL SUAVE PARA ÂNCORAS
  // ======================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ block: 'start' });
      }
    });
  });

  // ======================================
  // 5. PARALLAX LEVE (otimizado com RAF)
  // ======================================
  const heroSection = document.getElementById('hero');
  const doctorPhoto = heroSection ? heroSection.querySelector('.doctor-photo') : null;

  if (doctorPhoto && window.innerWidth > 768) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 800) {
            doctorPhoto.style.transform = `translate3d(0, ${-(scrollY * 0.015)}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ======================================
  // 6. COUNTER ANIMATION (números do hero)
  // ======================================
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
      if (current < target) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.trust-num');
        nums.forEach(num => {
          const text = num.textContent;
          if (text.includes('25')) animateCounter(num, 25, '+');
          else if (text.includes('5.000')) animateCounter(num, 5000, '+');
          // 24h keeps static
        });
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroTrust = document.querySelector('.hero-trust');
  if (heroTrust) heroObserver.observe(heroTrust);

});
