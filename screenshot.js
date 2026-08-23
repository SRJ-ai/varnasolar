const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.varnasolar.com/');
  // wait for network to be idle
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'desktop.png', fullPage: true });

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'mobile.png', fullPage: true });

  await browser.close();
  console.log('Screenshots saved!');
})();
