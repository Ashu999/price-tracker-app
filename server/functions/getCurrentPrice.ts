const puppeteer = require('puppeteer');

export async function getCurrentPrice(itemUrl: String) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  //Disable Loading Images (reduced runtime by more than half)
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
  await page.setDefaultNavigationTimeout(0);
  //domcontentloaded does not load javascript (reduced runtime by half)
  await page.goto(itemUrl, { waitUntil: 'domcontentloaded' });
  const curPrice = await page.evaluate(() => {
    return document.querySelector('.a-offscreen')?.innerHTML;
  });

  console.log('Cur Price: ', curPrice);
  browser.close();
  return curPrice;
}

// const itemUrl =
//   'https://www.amazon.in/dp/B0728CZSKC?ref_=cm_sw_r_cp_ud_dp_BN1PWEVV1PAC47K38XWF';
// getCurrentPrice(itemUrl);
