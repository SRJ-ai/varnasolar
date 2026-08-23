const fs = require('fs');
const c = fs.readFileSync('varnasolar_bundle.js', 'utf8');

// Find all longer text strings that look like content
const contentStrex = /["']([^"']{20,500})["']/g;
let match;
const solarContent = [];
while ((match = contentStrex.exec(c)) !== null) {
  const text = match[1];
  // Filter for content-like strings (contain spaces, no code patterns)
  if (text.includes(' ') && !text.includes('function') && !text.includes('{') && !text.includes('===') && !text.includes('return') && !text.includes('className') && !text.includes('undefined')) {
    if (/solar|kw|mw|subsid|panel|energy|install|rooftop|hyderabad|telangana|varna|waaree|surya|kusum|electricity|watt|grid/i.test(text)) {
      solarContent.push(text);
    }
  }
}

console.log("=== SOLAR CONTENT STRINGS ===");
solarContent.forEach(s => console.log('\n---'));
solarContent.forEach(s => console.log(s));

// Find stats/numbers patterns
const statsRegex = /["']([\d,]+\+?\s*(?:MW|kW|Cr|Lakhs?|%|Years?|Installations?|Projects?|Clients?))/gi;
const stats = new Set();
while ((match = statsRegex.exec(c)) !== null) {
  stats.add(match[1]);
}
console.log("\n=== STATS ===");
[...stats].forEach(s => console.log(s));

// Find Facebook/Instagram/YouTube links
const fbRegex = /["'](https?:\/\/[^"']*(?:facebook|instagram|youtube|linkedin|twitter)[^"']*)/gi;
while ((match = fbRegex.exec(c)) !== null) {
  console.log("SOCIAL:", match[1]);
}

// Find address strings
const addrRegex = /["']([^"']*(?:Hyderabad|Telangana|Nagar|Road|Colony|Street)[^"']*)/gi;
const addrs = new Set();
while ((match = addrRegex.exec(c)) !== null) {
  if (match[1].length > 15 && match[1].length < 200) {
    addrs.add(match[1]);
  }
}
console.log("\n=== ADDRESSES ===");
[...addrs].forEach(a => console.log(a));
