import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';

(async () => {
  console.log('Starting Vite server...');
  const server = spawn('npm', ['run', 'dev'], { cwd: 'd:/ALL PROJECTS/varnasolar/web', shell: true });

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 800 }
  });

  console.log('Navigating to page...');
  await page.goto('http://localhost:5173/varnasolar/industrial-solar');
  
  // Wait a moment for fonts to load
  await page.waitForTimeout(2000);

  const screenshotPath = 'C:/Users/sreer/.gemini/antigravity-ide/brain/8663e957-2562-49e0-b38f-6db84b25f3c8/industrial_screenshot.png';
  console.log(`Saving screenshot to ${screenshotPath}...`);
  await page.screenshot({ path: screenshotPath, fullPage: false });

  await browser.close();
  
  console.log('Killing server...');
  server.kill();
  console.log('Done!');
  process.exit(0);
})();
