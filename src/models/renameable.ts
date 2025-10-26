import type { Fallback } from "./types";
import type { Path } from "./path";
import { Model } from "./model";

type RenameableCase = {
  names: string[];
  model: Path;
};

export class Renameable extends Model {
  cases: RenameableCase[] = [];
  _fallback?: Fallback;

  constructor() {
    super("renameable");
  }

  case(names: string[], model: Path) {
    this.cases.push({
      names,
      model,
    });

    return this;
  }

  // model(model: Model) {
  //   this.cases.modelPath = model.modelPath;
  //   this.cases.texturePath = model.texturePath;

  //   return this;
  // }

  fallback(fallback: Fallback) {
    this._fallback = fallback;

    return this;
  }
}
