import { findStepper } from "@haibun/core/build/lib/util";

const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');

export async function checkAccessibility(uri: String) {
    const browser = await playwright['chromium'].launch({
        args: ['--remote-debugging-port=9171'],
    });
    const page = await browser.newPage();
    await page.goto(uri);

    const result = await playAudit({ // only accessibility as the metric for performance thresholds
        page,
        thresholds: {
            accessibility: 90,
        },
        port: 9171
    });
    await browser.close();
    
    return result;
};
