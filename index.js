const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://amazon.in');
    await page.screenshot({ path: 'amazon.png' });

    await browser.close();
})();