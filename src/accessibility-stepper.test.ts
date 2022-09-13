import { testWithDefaults } from '@haibun/core/build/lib/test/lib';
import WebServerStepper from "@haibun/web-server-express/build/web-server-stepper";

import AccessibilityStepper from './accessibility-stepper';

jest.setTimeout(30000);
describe('accessibility test', () => {
  it('Verifies passing accessibility test', async () => {
    const feature = { path: '/features/test.feature', content: `serve files from test\ncheck the accessibility at http://localhost:8123/passes.html` };
    const result = await testWithDefaults([feature], [AccessibilityStepper, WebServerStepper]);
    // console.log('🤑', JSON.stringify(result, null, 2)); 
    expect(result.ok);
  });
});
