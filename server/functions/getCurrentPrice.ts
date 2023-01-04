//Uses puppeteer to fetch amazon item Price from web
import puppeteer from 'puppeteer';

export async function getCurrentPrice(itemUrl: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  //Disable Loading Images (reduces function runtime)
  await page.setRequestInterception(true);
  page.on('request', (req: any) => {
    if (
      req.resourceType() === 'image' ||
      req.resourceType() == 'stylesheet' ||
      req.resourceType() == 'font'
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  // Configure the navigation timeout
  page.setDefaultNavigationTimeout(0);
  //domcontentloaded does not load javascript (reduces function runtime)
  await page
    .goto(itemUrl, { waitUntil: 'domcontentloaded' })
    .catch((error) => console.error('Error at page.goto: ', error));
  const curPrice = await page.evaluate(() => {
    return document.querySelector('.a-offscreen')?.innerHTML;
  });
  browser.close();
  return curPrice;
}
