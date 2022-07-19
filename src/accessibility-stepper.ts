import { AStepper, IHasOptions, OK, TNamed, TWorld } from '@haibun/core/build/lib/defs';
import { findStepperFromOption, stringOrError } from '@haibun/core/build/lib/util';

import { TIndexSummary, TIndexSummaryResult } from "@haibun/out-review/build/html-generator";
import { AStorage } from "@haibun/domain-storage/build/AStorage";
import { EMediaTypes } from '@haibun/domain-storage';

const TRACE_STORAGE = 'TRACE_STORAGE';
const INDEX_STORAGE = 'INDEX_STORAGE';

class AccessibilityStepper extends AStepper implements IHasOptions {
  accessibilitySource?: AStorage;
  indexDest?: AStorage;

  options = {
    [TRACE_STORAGE]: {
      desc: 'location of ACCESSIBILITY file',
      parse: (input: string) => stringOrError(input)
    },
    [INDEX_STORAGE]: {
      desc: 'location for index file',
      parse: (input: string) => stringOrError(input)
    }
  }

  setWorld(world: TWorld, steppers: AStepper[]) {
    super.setWorld(world, steppers);
    this.accessibilitySource = findStepperFromOption<AStorage>(steppers, this, this.getWorld().extraOptions, TRACE_STORAGE);
    this.indexDest = findStepperFromOption<AStorage>(steppers, this, this.getWorld().extraOptions, INDEX_STORAGE);
  }

  steps = {
    indexAccessibility: {
      gwta: `check the accessibility at {where}`,
      action: async ({ where }: TNamed) => {
        const value = await this.indexAccessibility(where);
        return OK;
      }
    },
  }
  async indexAccessibility(loc: string) {
    const contents = await this.accessibilitySource!.readFile(loc, 'utf-8');
    // const accessibility: Log = JSON.parse(contents);

    const dir = this.indexDest!.fromCaptureLocation(EMediaTypes.json, 'accessibility');
    const dest = this.indexDest!.fromCaptureLocation(EMediaTypes.json, 'accessibility', 'indexed.json');
    const ret = {
      indexTitle: 'Parsed ACCESSIBILITY',
      results: <TIndexSummaryResult[]>[]
    }
    const res: TIndexSummary = {
      indexTitle: 'Parsed ACCESSIBILITY',
      results: <TIndexSummaryResult[]>[]
    }
  }
}

export default AccessibilityStepper;