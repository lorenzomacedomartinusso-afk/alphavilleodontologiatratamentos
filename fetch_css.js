const fs = require('fs');
const https = require('https');
const html = fs.readFileSync('live_html.txt', 'utf8');
const links = html.match(/<link[^>]*rel=['"]stylesheet['"][^>]*href=['"](.*?)['"]/gi) || [];

links.forEach(linkStr => {
    const match = linkStr.match(/href=['"](.*?)['"]/i);
    if(match && match[1]) {
        let url = match[1];
        if(url.startsWith('//')) url = 'https:' + url;
        if(url.includes('elementor') || url.includes('uploads')) {
            https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const svgs = data.match(/url\(['"]?(.*?\.(svg|png|jpg|jpeg))['"]?\)/gi);
                    if(svgs) {
                        console.log('Found in', url);
                        svgs.forEach(s => console.log(s));
                    }
                });
            }).on('error', () => {});
        }
    }
});
