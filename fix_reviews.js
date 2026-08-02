const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'tratamentos', 'implantes-dentarios.html');
let content = fs.readFileSync(file, 'utf8');

const startTag = '<section id="avaliacoes" class="section-light">';
const endTag = '</section>';

let startIdx = content.indexOf(startTag);
if (startIdx === -1) {
  console.log('Could not find start marker');
  process.exit(1);
}

// Find the comment block right before the section tag
const commentStartStr = '  <!-- ======================================================\r\n       SEÇÃO AVALIAÇÕES DO GOOGLE';
let commentStartIdx = content.lastIndexOf('  <!-- ======================================================', startIdx);
if (commentStartIdx !== -1) {
    startIdx = commentStartIdx;
}

// Find the closing </section> tag starting from startTag
const endIdx = content.indexOf(endTag, content.indexOf(startTag)) + endTag.length;

if (endIdx < startIdx + endTag.length) {
  console.log('Could not find end marker');
  process.exit(1);
}

const newSection = `  <!-- ======================================================
       SEÇÃO AVALIAÇÕES DO GOOGLE (REESTILIZADA)
  ====================================================== -->
  <section id="avaliacoes" class="section-cream" style="background-color: #F6F3EC; padding: 100px 0;">
    <div class="container">
      <div class="reviews-header-new" data-aos="fade-up">
        <div class="reviews-eyebrow">
          <span class="line"></span>
          <span class="text">RESULTADOS</span>
          <span class="line"></span>
        </div>
        <h2 class="reviews-title-new">
          O que nossos pacientes <span class="gold-text-italic">dizem</span>
        </h2>
        
        <div class="google-pill">
          <svg viewBox="0 0 24 24" class="google-pill-icon">
            <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
            <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
            <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/>
            <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.515 2.7 1.545 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
          </svg>
          <span class="google-pill-score">4,9</span>
          <div class="google-pill-stars">★★★★★</div>
          <span class="google-pill-text">Baseado em 214 avaliações no Google</span>
        </div>
      </div>

      <div class="carousel-wrapper" data-aos="fade-up">
        <button class="carousel-btn prev" id="reviews-prev" aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="carousel-track-outer">
          <div class="carousel-track" id="reviews-track">
            
            <div class="carousel-slide">
              <div class="review-card-new">
                <div class="review-stars-new">★★★★★</div>
                <p class="review-text-new">"Fiz 4 implantes com o Dr. Luiz e o resultado foi incrível. Não senti nada durante o procedimento e em menos de um mês já estava mastigando normalmente."</p>
                <div class="review-divider"></div>
                <div class="review-author">
                  <div class="review-avatar-new" style="background:#1a2332;">M</div>
                  <div class="review-author-info">
                    <p class="review-name-new">Márcia F.</p>
                    <p class="review-treatment">São Paulo · Implante múltiplo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="carousel-slide">
              <div class="review-card-new">
                <div class="review-stars-new">★★★★★</div>
                <p class="review-text-new">"Tinha muito medo de cirurgia. A técnica sem corte foi uma revelação. Saí andando, sem dor, com um sorriso novo. Atendimento impecável do começo ao fim."</p>
                <div class="review-divider"></div>
                <div class="review-author">
                  <div class="review-avatar-new" style="background:#1a2332;">R</div>
                  <div class="review-author-info">
                    <p class="review-name-new">Roberto P.</p>
                    <p class="review-treatment">Moema · Implante unitário</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-slide">
              <div class="review-card-new">
                <div class="review-stars-new">★★★★★</div>
                <p class="review-text-new">"Pesquisei muitas clínicas antes de escolher a clínica. A diferença da Cirurgia Guiada é absurda — recuperação rápida, sem dor e resultado perfeito."</p>
                <div class="review-divider"></div>
                <div class="review-author">
                  <div class="review-avatar-new" style="background:#1a2332;">C</div>
                  <div class="review-author-info">
                    <p class="review-name-new">Carlos M.</p>
                    <p class="review-treatment">Itaim Bibi · Implantes múltiplos</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="carousel-slide">
              <div class="review-card-new">
                <div class="review-stars-new">★★★★★</div>
                <p class="review-text-new">"Excelente atendimento! Fui atendida prontamente, com muito profissionalismo e carinho. O planejamento 3D me deu muita segurança para fazer os implantes."</p>
                <div class="review-divider"></div>
                <div class="review-author">
                  <div class="review-avatar-new" style="background:#1a2332;">T</div>
                  <div class="review-author-info">
                    <p class="review-name-new">Tatiana N.</p>
                    <p class="review-treatment">Alphaville · Implante unitário</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <button class="carousel-btn next" id="reviews-next" aria-label="Próximo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
      <div class="carousel-dots" id="reviews-dots"></div>

      <div class="reviews-cta" data-aos="fade-up" style="margin-top: 48px; text-align: center;">
        <a href="https://wa.me/5511978201000?text=Olá%2C%20gostaria%20de%20agendar%20uma%20avaliação%20para%20implante%20dentário"
           id="cta-lp-reviews-whatsapp"
           class="btn-primary large" target="_blank">
          <svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.486a.5.5 0 0 0 .602.602l5.783-1.452A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.52-5.178-1.427l-.372-.223-3.85.967.984-3.756-.245-.388A9.942 9.942 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
          Agendar Consulta Agora
        </a>
      </div>
    </div>
  </section>

  <style>
    /* Estilos Seção Avaliações (Reestilizada) */
    .reviews-header-new {
      text-align: center;
      margin-bottom: 48px;
    }
    .reviews-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .reviews-eyebrow .line {
      height: 1px;
      width: 30px;
      background-color: #C09A6B;
    }
    .reviews-eyebrow .text {
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 3px;
      color: #C09A6B;
      text-transform: uppercase;
    }
    .reviews-title-new {
      font-family: 'Outfit', sans-serif;
      font-size: 2.8rem;
      font-weight: 300;
      color: #1a2332;
      margin-bottom: 32px;
      line-height: 1.2;
    }
    .reviews-title-new .gold-text-italic {
      color: #C09A6B;
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 3.2rem;
    }
    
    .google-pill {
      display: inline-flex;
      align-items: center;
      background: #FFFFFF;
      border-radius: 50px;
      padding: 10px 24px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      gap: 8px;
      margin-bottom: 20px;
    }
    .google-pill-icon {
      width: 20px;
      height: 20px;
    }
    .google-pill-score {
      font-family: 'Outfit', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a2332;
      margin-left: 4px;
    }
    .google-pill-stars {
      color: #E5AE6C;
      font-size: 1.1rem;
      letter-spacing: 2px;
      margin-left: 8px;
    }
    .google-pill-text {
      font-family: 'Outfit', sans-serif;
      font-size: 0.9rem;
      color: #5A6475;
      margin-left: 12px;
    }

    /* Cards novos */
    .review-card-new {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(0,0,0,0.03);
      text-align: left;
    }
    .review-stars-new {
      color: #E5AE6C;
      font-size: 1.1rem;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    .review-text-new {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.25rem;
      font-style: italic;
      color: #1a2332;
      line-height: 1.6;
      margin-bottom: 30px;
      flex-grow: 1;
    }
    .review-divider {
      height: 1px;
      background: #EAE6DF;
      margin-bottom: 24px;
    }
    .review-author {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .review-avatar-new {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 1.2rem;
    }
    .review-name-new {
      font-family: 'Outfit', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #1a2332;
      margin: 0 0 4px;
    }
    .review-treatment {
      font-family: 'Outfit', sans-serif;
      font-size: 0.85rem;
      color: #7A8495;
      margin: 0;
    }

    @media (max-width: 768px) {
      .reviews-title-new {
        font-size: 2.2rem;
      }
      .reviews-title-new .gold-text-italic {
        font-size: 2.5rem;
      }
      .google-pill {
        flex-direction: column;
        padding: 16px 24px;
        gap: 8px;
        text-align: center;
        border-radius: 20px;
      }
      .google-pill-text {
        margin-left: 0;
        font-size: 0.85rem;
      }
      .review-card-new {
        padding: 30px 24px;
      }
      .review-text-new {
        font-size: 1.15rem;
      }
    }
  </style>
`;

const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

content = before + newSection + after;

fs.writeFileSync(file, content, 'utf8');
console.log('Section replaced successfully!');
