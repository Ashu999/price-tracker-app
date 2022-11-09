const puppeteer = require('puppeteer');

async function getCurrentPrice(itemUrl: String) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(itemUrl);
  const curPrice = await page.evaluate(() => {
    return document.querySelector('.a-offscreen')?.innerHTML;
  });

  console.log('Cur Price: ', curPrice);
  await browser.close();
}

const itemUrl =
  'https://www.amazon.in/dp/B0728CZSKC?ref_=cm_sw_r_cp_ud_dp_BN1PWEVV1PAC47K38XWF';
getCurrentPrice(itemUrl);
