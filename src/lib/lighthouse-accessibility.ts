const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');

type TLighthouseReport = {
    failure?: {
        error: {
            message: string
        }
    }
    lhr: {
        audits: {
            [audit: string]: {
                score: number
            }
        }
    }
}

export async function checkAccessibility(uri: String) {
    const browser = await playwright['chromium'].launch({
        args: ['--remote-debugging-port=9171'],
    });
    const page = await browser.newPage();
    await page.goto(uri);

    const lighthouseConfig = {
        /* ... your lighthouse configs */
      };
 
    const result: TLighthouseReport = await playAudit({ // only accessibility as the metric for performance thresholds
        page,
        thresholds: {
            accessibility: 89, // passing value confirmed > 90
        },
        config:lighthouseConfig,
        port: 9171
    });
    await browser.close();

    const scored = Object.entries(result.lhr.audits).filter(([audit, values]) => values.score !== null)
        .map(([audit, value]) => ({ audit, score: value.score }));

    const ok = (scored.every(({ score }) => score > 90));

    return { ok, result };
};
