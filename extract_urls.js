const fs = require('fs');
const html = fs.readFileSync('live_html.txt', 'utf8');
const urls = html.match(/url\(['"]?(.*?)['"]?\)/gi) || [];
urls.forEach(u => console.log(u));
