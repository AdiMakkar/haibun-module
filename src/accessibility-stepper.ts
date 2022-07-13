import { Log } from 'accessibility';
import { AStepper, IHasOptions, OK, TNamed, TWorld } from '@haibun/core/build/lib/defs';
import { findStepperFromOption, stringOrError } from '@haibun/core/build/lib/util';

import { TIndexSummary, TIndexSummaryResult } from "@haibun/out-review/build/html-generator";
import { AStorage } from "@haibun/domain-storage/build/AStorage";
import { EMediaTypes } from '@haibun/domain-storage';

const TRACE_STORAGE = 'TRACE_STORAGE';
const INDEX_STORAGE = 'INDEX_STORAGE';

class accessibility extends AStepper implements IHasOptions {
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
      gwta: `index the accessibility file at {where}`,
      action: async ({ where }: TNamed) => {
        await this.indexAccessibility(where);
        return OK;
      }
    },
  }
  async indexAccessibility(loc: string) {
    const contents = await this.accessibilitySource!.readFile(loc, 'utf-8');
    const accessibility: Log = JSON.parse(contents);

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
    for (const result of accessibility.runs[0].results!) {
      const f = {
        ok: result.level !== 'error',
        featureTitle: result.message.text || 'no message',
        sourcePath: dest
      }
      ret.results.push(f);
    }
    await this.indexDest!.ensureDirExists(dir);
    await this.indexDest!.writeFile(dest, JSON.stringify(ret), EMediaTypes.json);
  }
}

export default accessibility;