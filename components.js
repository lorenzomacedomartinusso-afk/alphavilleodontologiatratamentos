/* ==========================================
   COMPONENTS.JS – Shared Navbar & Footer
   Alphaville Odontologia – Site Institucional
   ========================================== */

(function () {
  'use strict';

  // ── Detect current page for active nav link ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isSubDir = window.location.pathname.includes('/tratamentos/') || window.location.pathname.includes('/blog/');
  const basePath = isSubDir ? '../' : '';

  function isActive(href) {
    const hrefFile = href.split('/').pop();
    if ((hrefFile === 'index.html' || hrefFile === '') && (currentPath === 'index.html' || currentPath === '' || currentPath === '/' || currentPath === 'home')) return true;
    return currentPath === hrefFile;
  }

  function isTratamentoActive() {
    return currentPath.includes('tratamento') || currentPath.includes('emergencia') ||
      currentPath.includes('clinico') || currentPath.includes('estetica') ||
      currentPath.includes('implante') || currentPath.includes('canal') ||
      currentPath.includes('clareamento') || currentPath.includes('ortodontia') ||
      currentPath.includes('protese') || window.location.pathname.includes('/tratamentos/');
  }

  // ── Build Navbar ──
  function buildNavbar() {
    const nav = document.createElement('nav');
    nav.className = 'site-navbar';
    nav.id = 'site-navbar';

    const tratamentosLinks = [
      { href: `${basePath}tratamentos/emergencia-24h.html`, label: 'Emergência 24h' },
      { href: `${basePath}tratamentos/clinico-geral.html`, label: 'Clínico Geral' },
      { href: `${basePath}tratamentos/odontologia-estetica.html`, label: 'Odontologia Estética' },
      { href: `${basePath}tratamentos/implantes-dentarios.html`, label: 'Implantes Dentários' },
      { href: `${basePath}tratamentos/tratamento-de-canal.html`, label: 'Tratamento de Canal' },
      { href: `${basePath}tratamentos/clareamento-dental.html`, label: 'Clareamento Dental' },
      { href: `${basePath}tratamentos/ortodontia.html`, label: 'Ortodontia' },
      { href: `${basePath}tratamentos/protese-dentaria.html`, label: 'Prótese Dentária' },
    ];

    const navLinks = [
      { href: `/`, label: 'Home' },
      { href: `${basePath}sobre-o-doutor.html`, label: 'Sobre o Doutor' },
      { href: `${basePath}tratamentos.html`, label: 'Tratamentos', dropdown: tratamentosLinks },
      { href: `${basePath}pacientes.html`, label: 'Pacientes' },
      { href: `${basePath}blog.html`, label: 'Blog' },
      { href: `${basePath}faq.html`, label: 'FAQ' },
      { href: `${basePath}contato.html`, label: 'Contato' },
    ];

    let dropdownHTML = '';
    let mobileDropdownHTML = '';
    const tratLink = navLinks.find(l => l.dropdown);
    if (tratLink) {
      dropdownHTML = `<div class="nav-dropdown">${tratLink.dropdown.map(d =>
        `<a href="${d.href}" class="dropdown-item${isActive(d.href) ? ' active' : ''}">${d.label}</a>`
      ).join('')}</div>`;
      mobileDropdownHTML = `<div class="mobile-dropdown">${tratLink.dropdown.map(d =>
        `<a href="${d.href}" class="mobile-dropdown-item${isActive(d.href) ? ' active' : ''}">${d.label}</a>`
      ).join('')}</div>`;
    }

    const linksHTML = navLinks.map(link => {
      const activeClass = link.dropdown
        ? (isTratamentoActive() ? ' active' : '')
        : (isActive(link.href) ? ' active' : '');
      if (link.dropdown) {
        return `<div class="nav-item-dropdown">
          <a href="${link.href}" class="nav-link${activeClass}">
            ${link.label}
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          ${dropdownHTML}
        </div>`;
      }
      return `<a href="${link.href}" class="nav-link${activeClass}">${link.label}</a>`;
    }).join('');

    const mobileLinksHTML = navLinks.map(link => {
      const activeClass = link.dropdown
        ? (isTratamentoActive() ? ' active' : '')
        : (isActive(link.href) ? ' active' : '');
      if (link.dropdown) {
        return `<div class="mobile-nav-group">
          <a href="${link.href}" class="mobile-nav-link${activeClass}">
            ${link.label}
            <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          ${mobileDropdownHTML}
        </div>`;
      }
      return `<a href="${link.href}" class="mobile-nav-link${activeClass}">${link.label}</a>`;
    }).join('');

    nav.innerHTML = `
      <div class="navbar-inner">
        <div class="nav-left-spacer">
          <a href="/" class="scrolled-logo-link">
            <img src="${basePath}logo.png" alt="Alphaville Odontologia" class="scrolled-logo" />
          </a>
        </div>
        <div class="nav-glass-wrap">
          <div class="nav-links-desktop">
            ${linksHTML}
          </div>
          <div class="nav-right-actions">
            <a href="https://wa.me/5511978201000?text=Olá%2C%20gostaria%20de%20agendar%20um%20horário" target="_blank" class="nav-cta-btn" id="nav-cta-agendar">
              <svg viewBox="0 0 24 24" fill="currentColor" class="nav-cta-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.486a.5.5 0 0 0 .602.602l5.783-1.452A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.52-5.178-1.427l-.372-.223-3.85.967.984-3.756-.245-.388A9.942 9.942 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Agendar Consulta
            </a>
            <button class="hamburger-btn" id="hamburger-btn" aria-label="Menu">
              <span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
      <div class="mobile-nav-panel" id="mobile-nav-panel">
        <div class="mobile-nav-header">
          <img src="${basePath}logo.png" alt="Alphaville Odontologia" class="mobile-nav-logo" />
          <button class="mobile-nav-close" id="mobile-nav-close" aria-label="Fechar menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="mobile-nav-links">
          ${mobileLinksHTML}
        </div>
        <a href="https://wa.me/5511978201000?text=Olá%2C%20gostaria%20de%20agendar%20um%20horário" target="_blank" class="mobile-nav-cta">
          Agendar Consulta
        </a>
      </div>
    `;

    document.body.prepend(nav);

    // ── Navbar Scroll Effect ──
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      nav.classList.toggle('scrolled', scrollY > 60);
    }, { passive: true });

    // ── Mobile Menu ──
    const hamburger = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('mobile-nav-overlay');
    const panel = document.getElementById('mobile-nav-panel');
    const closeBtn = document.getElementById('mobile-nav-close');

    function openMobile() {
      panel.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.classList.add('active');
    }
    function closeMobile() {
      panel.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.classList.remove('active');
    }

    hamburger.addEventListener('click', openMobile);
    overlay.addEventListener('click', closeMobile);
    closeBtn.addEventListener('click', closeMobile);

    // Mobile dropdown toggle
    const mobileGroups = panel.querySelectorAll('.mobile-nav-group');
    mobileGroups.forEach(group => {
      const link = group.querySelector('.mobile-nav-link');
      const arrow = link.querySelector('.dropdown-arrow');
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        group.classList.toggle('open');
      });
    });
  }

  // ── Build Footer ──
  function buildFooter() {
    // Remove existing footer if any
    const existingFooter = document.querySelector('.section-footer-map');
    const existingFooterStandalone = document.querySelector('footer.footer');

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col footer-brand-col">
            <a href="/">
              <img src="${basePath}logo.png" alt="Alphaville Odontologia" class="site-footer-logo" />
            </a>
            <p class="footer-desc">Atendimento odontológico de excelência 24 horas em Alphaville. Emergências, tratamentos estéticos e clínico geral com Dr. Eduardo Martinusso.</p>
            <div class="footer-social-icons">
              <a href="https://instagram.com/dr.eduardomartinusso" target="_blank" aria-label="Instagram" class="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://facebook.com/eduardomartinusso" target="_blank" aria-label="Facebook" class="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Navegação</h4>
            <a href="/" class="footer-nav-link">Home</a>
            <a href="${basePath}sobre-o-doutor.html" class="footer-nav-link">Sobre o Doutor</a>
            <a href="${basePath}tratamentos.html" class="footer-nav-link">Tratamentos</a>
            <a href="${basePath}pacientes.html" class="footer-nav-link">Pacientes</a>
            <a href="${basePath}blog.html" class="footer-nav-link">Blog</a>
            <a href="${basePath}faq.html" class="footer-nav-link">FAQ</a>
            <a href="${basePath}contato.html" class="footer-nav-link">Contato</a>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Tratamentos</h4>
            <a href="${basePath}tratamentos/emergencia-24h.html" class="footer-nav-link">Emergência 24h</a>
            <a href="${basePath}tratamentos/implantes-dentarios.html" class="footer-nav-link">Implantes Dentários</a>
            <a href="${basePath}tratamentos/clareamento-dental.html" class="footer-nav-link">Clareamento Dental</a>
            <a href="${basePath}tratamentos/ortodontia.html" class="footer-nav-link">Ortodontia</a>
            <a href="${basePath}tratamentos/odontologia-estetica.html" class="footer-nav-link">Odontologia Estética</a>
            <a href="${basePath}tratamentos/protese-dentaria.html" class="footer-nav-link">Prótese Dentária</a>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">Contato</h4>
            <p class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#F9BD7B" stroke-width="1.8" class="footer-contact-icon"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              (11) 97820-1000
            </p>
            <p class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#F9BD7B" stroke-width="1.8" class="footer-contact-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              contato@alphavilleodontologia.com.br
            </p>
            <p class="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#F9BD7B" stroke-width="1.8" class="footer-contact-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Al. Rio Negro, 967 – Sala 129<br>Alphaville, Barueri – SP
            </p>
            <div class="footer-hours">
              <span class="footer-hours-badge">
                <span class="footer-hours-dot"></span>
                Atendimento 24 horas
              </span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">&copy; 2026 Alphaville Odontologia. Todos os direitos reservados.</p>
          <div class="footer-bottom-links">
            <a href="${basePath}termos.html" class="footer-bottom-link">Termos de Uso</a>
            <a href="${basePath}privacidade.html" class="footer-bottom-link">Política de Privacidade</a>
            <span class="footer-dev">Desenvolvido por Designs LM</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(footer);
  }

  // ── Inject Schema.org JSON-LD ──
  function injectSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "Alphaville Odontologia",
      "description": "Clínica odontológica com atendimento 24 horas em Alphaville, Barueri. Emergências, implantes, estética dental, clareamento e mais.",
      "url": "https://alphavilleodontologia.com.br",
      "telephone": "+5511978201000",
      "email": "contato@alphavilleodontologia.com.br",
      "image": "https://alphavilleodontologia.com.br/logo.png",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Alameda Rio Negro, 967 - Sala 129, Edifício Alpha Premium",
        "addressLocality": "Barueri",
        "addressRegion": "SP",
        "postalCode": "06454-000",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -23.5007,
        "longitude": -46.8489
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "50"
      },
      "founder": {
        "@type": "Person",
        "name": "Dr. Eduardo Martinusso",
        "jobTitle": "Cirurgião-Dentista",
        "description": "Especialista com mais de 29 anos de experiência em odontologia clínica e estética."
      },
      "sameAs": [
        "https://instagram.com/dr.eduardomartinusso",
        "https://facebook.com/eduardomartinusso"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // ── Scroll to Top Button ──
  function buildScrollTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.id = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Voltar ao topo');
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>`;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Initialize ──
  document.addEventListener('DOMContentLoaded', () => {
    buildNavbar();
    buildFooter();
    injectSchema();
    buildScrollTop();
  });
})();
