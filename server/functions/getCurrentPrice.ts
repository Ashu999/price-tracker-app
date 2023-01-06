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

  let curPrice: string = 'RETRY';
  let attempts = 0;
  while (curPrice === 'RETRY' && attempts < 5) {
    curPrice = await collectData(itemUrl, page);
    attempts += 1;
    if (curPrice === 'RETRY') {
      // Wait a few seconds, also a good idea to swap proxy here*
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
  browser.close();
  return curPrice;
}

const collectData = async (itemUrl: string, page: puppeteer.Page) => {
  try {
    //domcontentloaded does not load javascript (reduces function runtime)
    await page.goto(itemUrl, { waitUntil: 'domcontentloaded' });
    const curPrice = await page.evaluate(() => {
      return document.querySelector('.a-offscreen')?.innerHTML;
    });
    if (typeof curPrice === 'undefined') return 'RETRY';
    return curPrice;
  } catch (err) {
    console.error(err);
    return 'RETRY';
  }
};
