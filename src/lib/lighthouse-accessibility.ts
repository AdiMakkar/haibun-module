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
        onlyAudits: [
            'accesskeys',
            'aria-allowed-attr',
            'aria-command-name',
            'aria-hidden-body',
            'aria-hidden-focus',
            'aria-input-field-name',
            'aria-meter-name',
            'aria-progressbar-name',
            'aria-required-attr',
            'aria-required-children',
            'aria-required-parent',
            'aria-roles',
            'aria-toggle-field-name',
            'aria-tooltip-name',
            'aria-treeitem-name',
            'aria-valid-attr-value',
            'aria-valid-attr',
            'button-name',
            'bypass',
            'color-contrast',
            'definition-list',
            'dlitem',
            'document-title',
            'duplicate-id-active',
            'duplicate-id-aria',
            'form-field-multiple-labels',
            'frame-title',
            'heading-order',
            'html-has-lang',
            'html-lang-valid',
            'image-alt',
            'input-image-alt',
            'label',
            'link-name',
            'list',
            'listitem',
            'meta-refresh',
            'meta-viewport',
            'object-alt',
            'tabindex',
            'td-headers-attr',
            'th-has-data-cells',
            'valid-lang',
            'video-caption',
            'custom-controls-labels',
            'custom-controls-roles',
            'focus-traps',
            'focusable-controls',
            'interactive-element-affordance',
            'logical-tab-order',
            'managed-focus',
            'offscreen-content-hidden',
            'use-landmarks',
            'visual-order-follows-dom'
        ]
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
