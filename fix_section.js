const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'tratamentos', 'implantes-dentarios.html');
let content = fs.readFileSync(file, 'utf8');

// Define the old section (from SEÇÃO 3 comment to </section> before SEÇÃO 4)
const oldStart = '  <!-- ======================================================\r\n       SEÇÃO 3 – SOBRE A CLÍNICA (adaptado para implantes)\r\n  ====================================================== -->\r\n  <section id="quem-somos" class="section-light" style="padding-top: 0;">';
const oldEnd = '  </section>\r\n\r\n\r\n  <!-- ======================================================\r\n       SEÇÃO 4 – COMO FUNCIONA O IMPLANTE';

const startIdx = content.indexOf(oldStart);
const endIdx = content.indexOf(oldEnd, startIdx);

if (startIdx === -1) {
  console.log('Could not find start marker');
  process.exit(1);
}
if (endIdx === -1) {
  console.log('Could not find end marker');
  process.exit(1);
}

console.log(`Found section at index ${startIdx} to ${endIdx}`);

const newSection = `  <!-- ======================================================
       SEÇÃO 3 – CONHEÇA O ESPECIALISTA
  ====================================================== -->
  <section id="especialista" class="section-light" style="padding-top: 0;">
    <div class="container">
      <div class="especialista-grid" data-aos="fade-up">
        <!-- Foto do Doutor -->
        <div class="especialista-photo-col">
          <div class="especialista-photo-wrap">
            <img src="../assets/images/dr_luis.jpg" alt="Dr. Luis Marcos Carrijo – Especialista em Implantodontia" class="especialista-photo" />
          </div>
        </div>

        <!-- Informações -->
        <div class="especialista-info-col">
          <div class="section-label">Conheça o Especialista</div>
          <h2 class="especialista-name">
            Dr. Luis Marcos <span class="gold-text-italic">Carrijo</span>
          </h2>
          <span class="especialista-cro">CRO-SP 84.569 · Especialista em Implantodontia</span>
          <p class="especialista-bio">
            Com mais de 15 anos de experiência dedicados à implantodontia e mais de 5.000 implantes realizados, o Dr. Luis Marcos Carrijo é referência em reabilitação oral em Alphaville. Especialista em cirurgia guiada e carga imediata — atendimento humanizado, tecnologia de ponta, resultados previsíveis.
          </p>
          <blockquote class="especialista-quote">
            "Cada implante é planejado com precisão para devolver não apenas o sorriso, mas a confiança e a qualidade de vida do paciente."
          </blockquote>
          <div class="especialista-badges">
            <span class="especialista-badge">CRO-SP 84.569</span>
            <span class="especialista-badge">Implantodontia</span>
            <span class="especialista-badge">Cirurgia Guiada</span>
            <span class="especialista-badge">Carga Imediata</span>
          </div>
        </div>
      </div>

      <!-- Redes Sociais -->
      <div class="social-section" data-aos="fade-up">
        <div class="section-divider"></div>
        <div class="section-label center">Siga-nos</div>
        <h2 class="section-title center">Redes Sociais</h2>
        <div class="social-grid">
          <a href="https://instagram.com/dr.eduardomartinusso" id="lp-social-instagram" class="social-card" target="_blank">
            <div class="social-icon instagram-gradient">
              <svg viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </div>
            <div class="social-info">
              <span class="social-handle">@dr.eduardomartinusso</span>
              <span class="social-net">Instagram</span>
            </div>
          </a>
          <a href="https://facebook.com/eduardomartinusso" id="lp-social-facebook" class="social-card" target="_blank">
            <div class="social-icon" style="background:#1877F2">
              <svg viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>
            <div class="social-info">
              <span class="social-handle">@eduardomartinusso</span>
              <span class="social-net">Facebook</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <style>
    /* Especialista Section */
    .especialista-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 60px;
      align-items: center;
    }
    .especialista-photo-wrap {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    }
    .especialista-photo {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      aspect-ratio: 4 / 5;
    }
    .especialista-name {
      font-family: 'Outfit', sans-serif;
      font-size: 2.6rem;
      font-weight: 800;
      color: #1a2332;
      margin: 12px 0 8px;
      line-height: 1.1;
      letter-spacing: -0.5px;
    }
    .gold-text-italic {
      color: #C09A6B;
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-weight: 600;
    }
    .especialista-cro {
      display: block;
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      color: #C09A6B;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    .especialista-bio {
      font-family: 'Outfit', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      color: #5A6475;
      line-height: 1.7;
      margin: 0 0 24px;
    }
    .especialista-quote {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.1rem;
      font-style: italic;
      color: #C09A6B;
      border-left: 3px solid #E5AE6C;
      padding-left: 20px;
      margin: 0 0 28px;
      line-height: 1.5;
    }
    .especialista-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .especialista-badge {
      font-family: 'Outfit', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      color: #5A6475;
      border: 1.5px solid #d9dce2;
      border-radius: 30px;
      padding: 6px 16px;
      background: transparent;
      letter-spacing: 0.3px;
    }

    @media (max-width: 900px) {
      .especialista-grid {
        grid-template-columns: 1fr;
        gap: 36px;
        text-align: center;
      }
      .especialista-photo-col {
        max-width: 400px;
        margin: 0 auto;
      }
      .especialista-name {
        font-size: 2.1rem;
      }
      .especialista-quote {
        text-align: left;
      }
      .especialista-badges {
        justify-content: center;
      }
      .especialista-info-col .section-label {
        text-align: center;
      }
    }
  </style>`;

// Replace: from oldStart to just before the SEÇÃO 4 comment
const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

content = before + newSection + '\r\n\r\n\r\n' + after;

// Also update the inline style reference from #quem-somos to #especialista
content = content.replace('#diferenciais, #quem-somos', '#diferenciais, #especialista');
content = content.replace('#quem-somos::after, #quem-somos::before', '#especialista::after, #especialista::before');
content = content.replace('#quem-somos .section-divider', '#especialista .section-divider');

fs.writeFileSync(file, content, 'utf8');
console.log('Section replaced successfully!');
console.log(`New file size: ${fs.statSync(file).size} bytes`);
