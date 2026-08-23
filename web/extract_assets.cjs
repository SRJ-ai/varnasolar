const fs = require('fs');
const c = fs.readFileSync('varnasolar_bundle.js', 'utf8');

// Find all image/video asset paths
const assetRegex = /["']((?:\/|https?:\/\/)[^"']*?\.(?:png|jpg|jpeg|webp|svg|mp4|gif))/gi;
const assets = new Set();
let match;
while ((match = assetRegex.exec(c)) !== null) {
  assets.add(match[1]);
}

console.log("=== MEDIA ASSETS FOUND ===");
[...assets].forEach(a => console.log(a));

// Find video references
const videoRegex = /["']((?:\/|https?:\/\/)[^"']*?\.(?:mp4|webm|ogg))/gi;
const videos = new Set();
while ((match = videoRegex.exec(c)) !== null) {
  videos.add(match[1]);
}
console.log("\n=== VIDEOS ===");
[...videos].forEach(v => console.log(v));

// Find company data strings (phone, email, address)
const phoneRegex = /(\+91[\s-]?\d{10}|\d{10})/g;
const phones = new Set();
while ((match = phoneRegex.exec(c)) !== null) {
  phones.add(match[1]);
}
console.log("\n=== PHONE NUMBERS ===");
[...phones].forEach(p => console.log(p));

// Find email addresses
const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
const emails = new Set();
while ((match = emailRegex.exec(c)) !== null) {
  if (!match[0].includes('example') && !match[0].includes('test')) {
    emails.add(match[0]);
  }
}
console.log("\n=== EMAILS ===");
[...emails].forEach(e => console.log(e));

// Find social media links
const socialRegex = /https?:\/\/(?:www\.)?(facebook|instagram|twitter|linkedin|youtube)\.[^"'\s]+/gi;
const socials = new Set();
while ((match = socialRegex.exec(c)) !== null) {
  socials.add(match[0]);
}
console.log("\n=== SOCIAL LINKS ===");
[...socials].forEach(s => console.log(s));

// Find route paths
const routeRegex = /path:\s*["']([^"']+)["']/g;
const routes = new Set();
while ((match = routeRegex.exec(c)) !== null) {
  routes.add(match[1]);
}
console.log("\n=== ROUTES ===");
[...routes].forEach(r => console.log(r));

// Extract text near "hero" to find hero content
const heroIdx = c.indexOf('hero');
if (heroIdx > -1) {
  // Find nearby quoted strings
  const chunk = c.substring(Math.max(0, heroIdx - 500), heroIdx + 2000);
  const strings = chunk.match(/"[^"]{10,200}"/g);
  if (strings) {
    console.log("\n=== HERO AREA TEXT ===");
    strings.forEach(s => console.log(s));
  }
}
