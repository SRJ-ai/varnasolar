import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:5173';
const ROUTES = [
  '/',
  '/about-us',
  '/projects',
  '/solar-calculator'
];

async function runAudit() {
  console.log('🚀 Starting Varna Solar Playwright Audit...\n');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let auditResults = '# Varna Solar Audit Report\n\n';
  let totalIssues = 0;

  for (const route of ROUTES) {
    const page = await context.newPage();
    const url = `${BASE_URL}${route}`;
    console.log(`Auditing ${url}...`);
    auditResults += `## Route: \`${route}\`\n`;

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      // 1. Check SEO: Title
      const title = await page.title();
      if (!title || title.includes('Vite') || title === 'Varna Solar') {
        auditResults += `- ⚠️ **SEO:** Generic or missing title tag: "${title}"\n`;
        totalIssues++;
      } else {
        auditResults += `- ✅ **SEO:** Title tag is good. "${title}"\n`;
      }

      // 2. Check SEO: Meta Description
      const metaDescCount = await page.locator('meta[name="description"]').count();
      if (metaDescCount === 0) {
        auditResults += `- ❌ **SEO:** Missing meta description.\n`;
        totalIssues++;
      } else {
        auditResults += `- ✅ **SEO:** Meta description found.\n`;
      }

      // 3. Check H1 Tags
      const h1Count = await page.locator('h1').count();
      if (h1Count === 0) {
        auditResults += `- ❌ **Semantics:** Missing <h1> tag.\n`;
        totalIssues++;
      } else if (h1Count > 1) {
        auditResults += `- ⚠️ **Semantics:** Multiple <h1> tags found (${h1Count}). Recommended to have only one.\n`;
        totalIssues++;
      } else {
        auditResults += `- ✅ **Semantics:** Exactly one <h1> tag found.\n`;
      }

      // 4. Check Image Alt Tags
      const images = await page.locator('img');
      const imgCount = await images.count();
      let missingAltCount = 0;
      for (let i = 0; i < imgCount; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        if (alt === null) {
          missingAltCount++;
        }
      }
      if (missingAltCount > 0) {
        auditResults += `- ❌ **Accessibility:** ${missingAltCount} image(s) missing \`alt\` attributes.\n`;
        totalIssues++;
      } else {
        auditResults += `- ✅ **Accessibility:** All images have \`alt\` attributes.\n`;
      }

      // 5. Check empty links/buttons (basic a11y)
      const buttons = await page.locator('button, a');
      const btnCount = await buttons.count();
      let inaccessibleBtnCount = 0;
      for (let i = 0; i < btnCount; i++) {
        const text = await buttons.nth(i).innerText();
        const ariaLabel = await buttons.nth(i).getAttribute('aria-label');
        if (!text.trim() && !ariaLabel) {
           const innerHtml = await buttons.nth(i).innerHTML();
           if (innerHtml.includes('<svg') && !ariaLabel) {
               inaccessibleBtnCount++;
           }
        }
      }
      if (inaccessibleBtnCount > 0) {
        auditResults += `- ⚠️ **Accessibility:** ${inaccessibleBtnCount} interactive element(s) (buttons/links) might lack accessible names (missing aria-label or text).\n`;
        totalIssues++;
      } else {
        auditResults += `- ✅ **Accessibility:** Interactive elements appear to have accessible names.\n`;
      }
      
    } catch (e) {
      auditResults += `- ❌ **Error:** Failed to load or audit page. (${e.message})\n`;
      totalIssues++;
    }

    auditResults += '\n';
    await page.close();
  }

  await browser.close();

  auditResults += `---\n**Total Issues Found:** ${totalIssues}\n`;
  console.log(`Audit complete. Total issues: ${totalIssues}`);
  
  const reportPath = path.join(__dirname, '..', 'audit-report.md');
  fs.writeFileSync(reportPath, auditResults);
  console.log(`Report saved to ${reportPath}`);
}

runAudit().catch(console.error);
