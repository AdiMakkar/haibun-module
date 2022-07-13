const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');

export async function accessibility (uri:String) {
  // args: ['--remote-debugging-port=5200'] 
  const browser = await playwright['chromium'].launch() 
  const page = await browser.newPage();
    await page.goto (uri);

    const result = await playAudit({
        page: page,
        thresholds: {
            accessibility: 95,
        },
        port: 5200
    });
    return result;
};
