import type { Fallback } from "./types";
import type { Path } from "./path";
import { Model } from "./model";

type UsingAnimationEntry = {
  threshold: number;
  model: Path;
};

export class UsingAnimation extends Model {
  entries: UsingAnimationEntry[] = [];
  _fallback?: Fallback;

  constructor() {
    super("using_animation");
  }

  model(model: Path, threshold: number) {
    this.entries.push({ threshold, model });

    return this;
  }

  fallback(fallback: Fallback) {
    this._fallback = fallback;

    return this;
  }

  dynamic(
    entries: number[],
    callbackFn: (index: number, threshold: number) => Path,
  ) {
    entries.forEach((entry, index) => {
      this.entries.push({ threshold: entry, model: callbackFn(index, entry) });
    });
    return this;
  }
}
