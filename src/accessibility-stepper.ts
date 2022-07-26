import { AStepper, OK, TNamed, TWorld } from '@haibun/core/build/lib/defs';
import { actionNotOK } from '@haibun/core/build/lib/util';

import { checkAccessibility } from './lib/lighthouse-accessibility';
class AccessibilityStepper extends AStepper {
  setWorld(world: TWorld, steppers: AStepper[]) {
    super.setWorld(world, steppers);
  }

  steps = {
    indexAccessibility: {
      gwta: `check the accessibility at {where}`,
      action: async ({ where }: TNamed) => {
        const value = await checkAccessibility(where);
        if (value.ok) {
          return OK;
        }
        const { message } = value.result!.failure!.error;
        return actionNotOK(message, { topics: { accessibility: { summary: message, details: value } } });
      }
    },
  }
}

export default AccessibilityStepper;
