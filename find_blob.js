const fs = require('fs'); 
const data = fs.readFileSync('live_html.txt', 'utf8'); 
console.log('Images:'); 
const imgs = data.match(/<img[^>]*>/g) || [];
imgs.forEach(i => console.log(i));
console.log('\nBackground images:');
const bgImgs = data.match(/url\(['"]?(.*?)['"]?\)/g) || [];
bgImgs.forEach(b => console.log(b));
