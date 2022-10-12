const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    // await page.goto('https://www.amazon.in/Pintola-Natural-Crunchy-Unsweetened-Non-GMO/dp/B0728CZSKC/ref=sr_1_5?crid=3OXWFD85QUWXH&keywords=peanut+butter+2.5+kg&qid=1664991615&qu=eyJxc2MiOiI1LjA3IiwicXNhIjoiNC43NCIsInFzcCI6IjQuMzIifQ%3D%3D&sprefix=pean%2Caps%2C486&sr=8-5E');
    await page.goto('https://www.amazon.in/dp/B0728CZSKC?ref_=cm_sw_r_cp_ud_dp_BN1PWEVV1PAC47K38XWF');
    const curPrice = await page.evaluate(() => {
        return document.querySelector('.a-offscreen')?.innerHTML;
    })

    console.log(curPrice);
    await browser.close();
})();