import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4001');
  await page.screenshot({ path: 'before_click.png' });
  
  // Click Book Private Session
  await page.getByText('Book Private Session').first().click();
  await page.waitForTimeout(1000); // wait for modal
  await page.screenshot({ path: 'after_click.png' });
  
  await browser.close();
})();
