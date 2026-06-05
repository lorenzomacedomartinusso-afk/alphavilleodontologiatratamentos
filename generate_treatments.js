const fs = require('fs');
const path = require('path');

const basePath = process.cwd();
const tratDir = path.join(basePath, 'tratamentos');

function makePage(t) {
  const stepsHTML = t.steps.map(s => `<div class="step-card"><span class="step-number">${s.n}</span><h4 class="step-title">${s.t}</h4><p class="step-desc">${s.d}</p></div>`).join('');
  const benefitsHTML = t.benefits.map(b => `<div class="benefit-card"><div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#F9BD7B" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><div class="benefit-text"><h4>${b}</h4></div></div>`).join('');
  const faqHTML = t.faq.map(f => `<div class="faq-item"><button class="faq-question">${f.q}<span class="faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></span></button><div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div></div>`).join('');

  const allTreatments = [
    {file:'emergencia-24h.html',name:'Emergência 24h'},
    {file:'clinico-geral.html',name:'Clínico Geral'},
    {file:'odontologia-estetica.html',name:'Odontologia Estética'},
    {file:'implantes-dentarios.html',name:'Implantes Dentários'},
    {file:'tratamento-de-canal.html',name:'Tratamento de Canal'},
    {file:'clareamento-dental.html',name:'Clareamento Dental'},
    {file:'ortodontia.html',name:'Ortodontia'},
    {file:'protese-dentaria.html',name:'Prótese Dentária'},
  ];

  const sidebarLinks = allTreatments.map(tr => {
    const active = tr.file === t.file ? ' active-treatment' : '';
    return `          <a href="${tr.file}" class="sidebar-treatment-link${active}"><span class="sidebar-link-dot"></span>${tr.name}</a>`;
  }).join('\n');

  const titleHTML = t.title.replace(/ em Alphaville/, ' <span class="gold-text">em Alphaville</span>');
  const waText = encodeURIComponent(`Olá, gostaria de saber mais sobre ${t.titleShort}`);
  const fontsUrl = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900' + String.fromCharCode(38) + 'family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400' + String.fromCharCode(38) + 'display=swap';
  const waBase = 'https://wa.me/5511978201000';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${t.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://alphavilleodontologia.com.br/tratamentos/${t.file}" />
  <meta property="og:title" content="${t.metaTitle}" />
  <meta property="og:description" content="${t.metaDesc}" />
  <title>${t.metaTitle}</title>
  <link rel="icon" type="image/png" href="../favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${fontsUrl}" rel="stylesheet" />
  <link rel="stylesheet" href="../style.css" />
  <link rel="stylesheet" href="../pages.css" />
</head>
<body>

  <section class="page-hero">
    <div class="container">
      <div class="breadcrumbs">
        <a href="/home" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-sep">›</span>
        <a href="../tratamentos.html" class="breadcrumb-link">Tratamentos</a>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current">${t.titleShort}</span>
      </div>
      <h1 class="page-hero-title">${titleHTML}</h1>
      <p class="page-hero-subtitle">${t.intro}</p>
    </div>
  </section>

  <section class="page-section-light">
    <div class="container">
      <div class="treatment-layout">
        <div class="treatment-main">
          <div class="content-block">
            <h2>O que é ${t.titleShort}?</h2>
            ${t.content}

            <h2 style="margin-top:48px;">Como funciona?</h2>
          </div>
          <div class="steps-grid">${stepsHTML}</div>

          <div class="content-block" style="margin-top:48px;">
            <h2>Benefícios</h2>
          </div>
          <div class="benefits-grid">${benefitsHTML}</div>

          <div class="content-block" style="margin-top:48px;">
            <h2>Perguntas Frequentes</h2>
          </div>
          <div class="faq-list" style="max-width:100%;">${faqHTML}</div>

          <div style="text-align:center;margin-top:48px;">
            <a href="${waBase}?text=${waText}" target="_blank" class="btn-primary large">
              <svg viewBox="0 0 24 24" fill="currentColor" class="btn-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.486a.5.5 0 0 0 .602.602l5.783-1.452A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.52-5.178-1.427l-.372-.223-3.85.967.984-3.756-.245-.388A9.942 9.942 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Agendar Avaliação de ${t.titleShort}
            </a>
          </div>
        </div>
        <aside class="treatment-sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-card-title">Tratamentos</h3>
${sidebarLinks}
          </div>
          <div class="sidebar-cta-card">
            <h3 class="sidebar-cta-title">Precisa de ajuda?</h3>
            <p class="sidebar-cta-text">Fale com nossa equipe e agende sua avaliação sem compromisso.</p>
            <a href="${waBase}" target="_blank" class="sidebar-cta-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <a href="${waBase}" target="_blank" class="whatsapp-float" aria-label="WhatsApp"><div class="wpp-pulse"></div><svg viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.486a.5.5 0 0 0 .602.602l5.783-1.452A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.52-5.178-1.427l-.372-.223-3.85.967.984-3.756-.245-.388A9.942 9.942 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg></a>

  <script src="../components.js"></script>
  <script src="../pages.js"></script>
</body>
</html>`;
}

const treatments = [
  { file:'emergencia-24h.html', title:'Emergência Odontológica 24 Horas em Alphaville', titleShort:'Emergência 24h', metaTitle:'Emergência Dentária 24h Alphaville | Atendimento Imediato', metaDesc:'Emergência odontológica 24 horas em Alphaville. Atendimento imediato para dor de dente, trauma dental e urgências. Dr. Eduardo Martinusso.', intro:'Dor de dente não escolhe hora. A Alphaville Odontologia oferece atendimento de emergência odontológica 24 horas por dia, 7 dias por semana — incluindo feriados e madrugadas.', content:'<p>Quando uma dor de dente surge de repente, o pânico é compreensível. Pode ser uma cárie profunda, um dente quebrado, uma infecção ou até um trauma. Independentemente da causa, você precisa de atendimento <strong>rápido, seguro e profissional</strong>.</p><p>O Dr. Eduardo Martinusso foi pioneiro no atendimento de urgência odontológica em Alphaville, e há mais de 29 anos oferece esse serviço essencial para a região. Nosso compromisso é atender você em até 30 minutos após o contato.</p><p>Entre as situações mais comuns atendidas em regime de emergência estão: <strong>dor de dente intensa</strong>, <strong>dente quebrado ou lascado</strong>, <strong>abscesso dentário</strong>, <strong>sangramento gengival</strong>, <strong>restauração que caiu</strong> e <strong>trauma dental</strong> por acidentes.</p>', steps:[{n:'1',t:'Contato',d:'Ligue ou envie mensagem pelo WhatsApp'},{n:'2',t:'Triagem',d:'Avaliação rápida da urgência'},{n:'3',t:'Atendimento',d:'Tratamento imediato da emergência'},{n:'4',t:'Acompanhamento',d:'Plano de tratamento pós-emergência'}], benefits:['Atendimento em até 30 minutos','24h incluindo feriados','Alívio imediato da dor','Equipe especializada em urgências'], faq:[{q:'Quais casos são atendidos na emergência?',a:'Dor de dente intensa, dente quebrado, trauma dental, abscesso, sangramento gengival, restauração que caiu, entre outros. Qualquer urgência odontológica.'},{q:'O atendimento de emergência custa mais caro?',a:'O valor é justo e acessível. O mais importante é cuidar da sua saúde bucal o quanto antes. Oferecemos diversas formas de pagamento.'},{q:'Preciso agendar para emergência?',a:'Não! Basta ligar ou enviar mensagem pelo WhatsApp (11) 97820-1000. Atendemos prontamente, sem necessidade de agendamento prévio.'}] },
  { file:'clinico-geral.html', title:'Clínico Geral em Alphaville', titleShort:'Clínico Geral', metaTitle:'Clínico Geral Alphaville | Dentista – Dr. Eduardo Martinusso', metaDesc:'Consultas de clínico geral em Alphaville: restaurações, limpezas, extrações e check-ups. Dr. Eduardo Martinusso, 29+ anos de experiência.', intro:'A odontologia clínica geral é a base para uma saúde bucal completa. Na Alphaville Odontologia, oferecemos tratamentos preventivos e curativos com tecnologia de ponta.', content:'<p>O clínico geral é o profissional responsável por cuidar da saúde dos seus dentes e gengivas de forma integral. Desde consultas de rotina até procedimentos como restaurações, limpezas profissionais e extrações.</p><p>Com mais de 29 anos de experiência, o Dr. Eduardo Martinusso combina conhecimento técnico com um olhar atento para cada paciente, garantindo diagnósticos precisos e tratamentos eficazes.</p><p>A prevenção é a chave para uma saúde bucal duradoura. Recomendamos consultas regulares a cada 6 meses para identificar problemas precocemente e manter seu sorriso sempre saudável.</p>', steps:[{n:'1',t:'Consulta',d:'Avaliação completa da saúde bucal'},{n:'2',t:'Diagnóstico',d:'Exames e planejamento'},{n:'3',t:'Tratamento',d:'Procedimentos personalizados'},{n:'4',t:'Prevenção',d:'Orientações para manutenção'}], benefits:['Restaurações estéticas','Limpeza profissional','Extrações seguras','Check-up completo'], faq:[{q:'Com que frequência devo ir ao dentista?',a:'Recomendamos consultas a cada 6 meses para manutenção preventiva e limpeza profissional.'},{q:'A limpeza dental dói?',a:'A limpeza profissional é um procedimento confortável e indolor na maioria dos casos. Utilizamos equipamentos modernos que garantem seu conforto.'}] },
  { file:'odontologia-estetica.html', title:'Odontologia Estética em Alphaville', titleShort:'Odontologia Estética', metaTitle:'Odontologia Estética Alphaville | Lentes e Facetas Dentais', metaDesc:'Lentes de contato dental, facetas, restaurações estéticas e harmonização do sorriso em Alphaville. Resultados naturais com Dr. Eduardo Martinusso.', intro:'Transforme seu sorriso com procedimentos estéticos de última geração. Lentes de contato dental, facetas e restaurações para resultados naturais e deslumbrantes.', content:'<p>A odontologia estética moderna vai muito além da aparência — ela restaura a autoestima e a confiança. Com materiais de última geração e técnicas minimamente invasivas, conseguimos resultados que se integram perfeitamente à sua anatomia facial.</p><p>Oferecemos lentes de contato dental, facetas em porcelana, restaurações estéticas em resina, e planejamento digital do sorriso para resultados previsíveis e surpreendentes.</p>', steps:[{n:'1',t:'Planejamento',d:'Design digital do sorriso'},{n:'2',t:'Mockup',d:'Teste estético prévio'},{n:'3',t:'Preparo',d:'Procedimento minimamente invasivo'},{n:'4',t:'Resultado',d:'Sorriso dos sonhos'}], benefits:['Lentes de contato dental','Facetas em porcelana','Restaurações em resina','Resultado natural e duradouro'], faq:[{q:'As lentes de contato dental são permanentes?',a:'Sim, com cuidados adequados podem durar mais de 15 anos. São uma solução duradoura e estética.'},{q:'O procedimento dói?',a:'O preparo é minimamente invasivo e realizado com anestesia local quando necessário. O desconforto é mínimo.'}] },
  { file:'implantes-dentarios.html', title:'Implante Dentário em Alphaville', titleShort:'Implantes Dentários', metaTitle:'Implante Dentário Alphaville | Reabilitação Oral – Dr. Eduardo', metaDesc:'Implantes dentários em Alphaville com tecnologia avançada. Reabilitação oral completa. Dr. Eduardo Martinusso e Dr. Luis Marcos Carrijo.', intro:'O implante dentário é a solução definitiva para a perda de dentes. Utilizamos implantes de titânio de alta qualidade para devolver função, estética e qualidade de vida.', content:'<p>A perda de um ou mais dentes afeta não apenas a estética, mas também a mastigação, a fala e a autoestima. O implante dentário substitui a raiz do dente perdido com um pino de titânio biocompatível, sobre o qual é fixada uma prótese com aparência natural.</p><p>Nossa equipe conta com o Dr. Luis Marcos Carrijo (CRO 84.569), especialista em implantodontia com mais de 15 anos de experiência na área.</p>', steps:[{n:'1',t:'Avaliação',d:'Exames de imagem e planejamento 3D'},{n:'2',t:'Cirurgia',d:'Instalação do implante de titânio'},{n:'3',t:'Osseointegração',d:'Integração ao osso (3-6 meses)'},{n:'4',t:'Prótese',d:'Instalação da coroa definitiva'}], benefits:['Resultado natural e duradouro','Preserva o osso da mandíbula','Mastigação restaurada','Sucesso superior a 95%'], faq:[{q:'Quanto tempo dura um implante?',a:'Com cuidados adequados, um implante pode durar a vida inteira. A taxa de sucesso é superior a 95%.'},{q:'A cirurgia de implante dói?',a:'O procedimento é realizado com anestesia local e é praticamente indolor. O pós-operatório é confortável com medicação adequada.'}] },
  { file:'tratamento-de-canal.html', title:'Tratamento de Canal em Alphaville', titleShort:'Tratamento de Canal', metaTitle:'Tratamento de Canal Alphaville | Endodontia Moderna', metaDesc:'Tratamento de canal em Alphaville com técnicas modernas e indolores. Endodontia especializada pelo Dr. Eduardo Martinusso.', intro:'O tratamento de canal salva dentes comprometidos por infecção ou trauma. Utilizamos técnicas modernas que tornam o procedimento confortável e eficaz.', content:'<p>Quando a polpa do dente fica inflamada ou infectada, o tratamento de canal é necessário para eliminar a infecção, aliviar a dor e preservar o dente natural.</p><p>Com equipamentos de última geração e mais de 29 anos de experiência em endodontia, o Dr. Eduardo Martinusso realiza tratamentos de canal com precisão e conforto, muitas vezes em sessão única.</p>', steps:[{n:'1',t:'Diagnóstico',d:'Radiografia e avaliação da polpa'},{n:'2',t:'Anestesia',d:'Anestesia local para conforto total'},{n:'3',t:'Limpeza',d:'Remoção da polpa infectada'},{n:'4',t:'Restauração',d:'Selamento e restauração do dente'}], benefits:['Procedimento praticamente indolor','Preserva o dente natural','Elimina infecções','Sessão única na maioria dos casos'], faq:[{q:'O tratamento de canal dói?',a:'Com as técnicas modernas, o procedimento é praticamente indolor. O objetivo é justamente eliminar a dor que você sente.'},{q:'Quantas sessões são necessárias?',a:'Na maioria dos casos, o tratamento é concluído em uma única sessão. Casos complexos podem necessitar de 2 sessões.'}] },
  { file:'clareamento-dental.html', title:'Clareamento Dental em Alphaville', titleShort:'Clareamento Dental', metaTitle:'Clareamento Dental Alphaville | Dentes Mais Brancos', metaDesc:'Clareamento dental profissional em Alphaville. Clareamento a laser e caseiro com resultados visíveis. Dr. Eduardo Martinusso.', intro:'Quer dentes mais brancos e um sorriso radiante? O clareamento profissional pode clarear seus dentes em até 8 tons de forma segura e eficaz.', content:'<p>O clareamento dental remove manchas e pigmentações causadas por café, vinho, cigarro, envelhecimento natural e outros fatores, devolvendo a brancura natural dos seus dentes.</p><p>Oferecemos duas modalidades: o clareamento profissional em consultório (com resultados imediatos) e o clareamento caseiro supervisionado (com moldeiras personalizadas).</p>', steps:[{n:'1',t:'Avaliação',d:'Análise da cor atual'},{n:'2',t:'Limpeza',d:'Profilaxia profissional prévia'},{n:'3',t:'Aplicação',d:'Gel clareador profissional'},{n:'4',t:'Resultado',d:'Até 8 tons mais brancos'}], benefits:['Resultados na primeira sessão','Procedimento seguro','Clareia até 8 tons','Resultado duradouro'], faq:[{q:'O clareamento dental dói?',a:'É indolor. Alguns pacientes podem sentir leve sensibilidade temporária que desaparece em 24-48 horas.'},{q:'Quanto tempo dura o resultado?',a:'O resultado dura de 1 a 3 anos, dependendo dos hábitos alimentares e higiene.'}] },
  { file:'ortodontia.html', title:'Ortodontia em Alphaville', titleShort:'Ortodontia', metaTitle:'Ortodontia Alphaville | Aparelho e Alinhadores Transparentes', metaDesc:'Tratamento ortodôntico em Alphaville: aparelhos fixos, alinhadores transparentes e ortodontia estética. Agende sua avaliação.', intro:'A ortodontia corrige o alinhamento dos dentes e a mordida, proporcionando um sorriso harmonioso e funcional para todas as idades.', content:'<p>Dentes desalinhados podem causar problemas de mastigação, dificuldade na higienização e dores na ATM. O tratamento ortodôntico corrige esses problemas de forma gradual e segura.</p><p>Oferecemos aparelhos fixos metálicos, estéticos (cerâmicos e safira), e alinhadores transparentes para tratamentos discretos e confortáveis.</p>', steps:[{n:'1',t:'Avaliação',d:'Diagnóstico com radiografias'},{n:'2',t:'Planejamento',d:'Plano personalizado'},{n:'3',t:'Instalação',d:'Colocação do aparelho'},{n:'4',t:'Manutenção',d:'Ajustes periódicos'}], benefits:['Aparelhos estéticos discretos','Alinhadores transparentes','Correção de mordida','Para todas as idades'], faq:[{q:'Quanto tempo dura o tratamento?',a:'Varia de 6 meses a 3 anos dependendo da complexidade. Uma avaliação determina o tempo estimado.'},{q:'Posso usar alinhadores transparentes?',a:'Em muitos casos sim. Eles são discretos, removíveis e confortáveis. Uma avaliação determinará se é indicado.'}] },
  { file:'protese-dentaria.html', title:'Prótese Dentária em Alphaville', titleShort:'Prótese Dentária', metaTitle:'Prótese Dentária Alphaville | Fixa e Removível', metaDesc:'Prótese dentária em Alphaville: fixas, removíveis, total e parcial. Materiais de alta qualidade. Dr. Eduardo Martinusso.', intro:'A prótese dentária devolve função, estética e qualidade de vida. Trabalhamos com materiais de alta qualidade para resultados naturais e confortáveis.', content:'<p>A perda de dentes afeta a mastigação, a fala e a autoestima. As próteses modernas são projetadas para se integrar perfeitamente à sua boca com conforto e aparência natural.</p><p>Oferecemos próteses fixas (coroas e pontes), removíveis parciais e totais, e próteses sobre implantes para máxima estabilidade.</p>', steps:[{n:'1',t:'Avaliação',d:'Análise da arcada'},{n:'2',t:'Moldagem',d:'Impressões precisas'},{n:'3',t:'Prova',d:'Ajuste de conforto'},{n:'4',t:'Instalação',d:'Fixação definitiva'}], benefits:['Materiais de alta qualidade','Aparência natural','Restaura mastigação','Conforto e estabilidade'], faq:[{q:'Quanto tempo para fazer uma prótese?',a:'O processo completo leva de 2 a 4 semanas, incluindo moldagem, fabricação e ajustes.'},{q:'A prótese é confortável?',a:'Sim, são feitas sob medida para encaixar perfeitamente, proporcionando máximo conforto.'}] },
];

treatments.forEach(t => {
  const html = makePage(t);
  fs.writeFileSync(path.join(tratDir, t.file), html, 'utf8');
  console.log('Created: ' + t.file);
});

console.log('All 8 treatment pages created!');
