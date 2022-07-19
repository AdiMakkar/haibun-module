import { testWithDefaults } from '@haibun/core/build/lib/test/lib';
import WebHttp from '@haibun/web-http/build/web-http';
import AccessibilityStepper from './accessibility-stepper';
// import server from 'web-server-stepper';

describe('accessibility test', () => {
  it('Verifies passing accessibility test', async () => {
    const feature = { path: '/features/test.feature', content: `serve files from test\ncheck the accessibility at http://localhost:8080/passes.html` };
    const result = await testWithDefaults([feature], [AccessibilityStepper, WebHttp]);
    expect(result.ok).toBe(true);
  });

/**
  it('restricts characters used in static mount folder name', async () => {
    const feature = { path: '/features/test.feature', content: `serve files from l*(*$\n` }
    const result = await testWithDefaults([feature], [server]);
    expect(result.ok).toBe(false);
  });

  it("doesn't re-mount same static mount", async () => {
    const feature = { path: '/features/test.feature', content: `serve files from test\nserve files from test\n` }
    const result = await testWithDefaults([feature], [server]);
    expect(result.ok).toBe(true);
  });

  it("doesn't permit different static mount", async () => {
    const feature = { path: '/features/test.feature', content: `serve files from test\nserve files from fails\n` }
    const result = await testWithDefaults([feature], [server]);
    expect(result.ok).toBe(false);
  });
   */
});