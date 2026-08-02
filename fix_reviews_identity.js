const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'tratamentos', 'implantes-dentarios.html');
let content = fs.readFileSync(file, 'utf8');

// 1. Change the section tag
content = content.replace(
  /<section id="avaliacoes" class="section-cream" style="background-color: #F6F3EC; padding: 100px 0;">/g,
  '<section id="avaliacoes" class="section-light" style="padding: 100px 0;">'
);

// 2. Change the pill styles
content = content.replace(
  /(\.google-pill\s*\{[^}]*?)background:\s*#FFFFFF;([^}]*?)box-shadow:\s*0 4px 15px rgba\(0, 0, 0, 0\.05\);/g,
  '$1background: #FFFFFF;$2box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);\n      border: 1px solid rgba(229, 174, 108, 0.2);'
);

// 3. Change the card styles
content = content.replace(
  /(\.review-card-new\s*\{[^}]*?)background:\s*#FFFFFF;([^}]*?)box-shadow:\s*0 10px 30px rgba\(0, 0, 0, 0\.04\);([^}]*?)border:\s*1px solid rgba\(0,0,0,0\.03\);/g,
  '$1background: linear-gradient(145deg, #FDF6ED 0%, #F8EFE2 100%);$2box-shadow: 0 12px 32px rgba(229, 174, 108, 0.1);$3border: 1px solid rgba(229, 174, 108, 0.2);'
);

// 4. Change the divider color
content = content.replace(
  /(\.review-divider\s*\{[^}]*?)background:\s*#EAE6DF;/g,
  '$1background: rgba(229, 174, 108, 0.3);'
);

// 5. Change the author avatar text color if necessary
content = content.replace(
  /(\.review-avatar-new\s*\{[^}]*?)color:\s*#FFFFFF;/g,
  '$1color: #E5AE6C;'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Styles updated for white background and brand identity');
