import type { Model } from "./path";
import { Node } from "./node";

type UsingAnimationEntry = {
  threshold: number;
  model: Model;
};

export class UsingAnimation extends Node {
  entries: UsingAnimationEntry[] = [];
  _fallback?: Node;

  model(model: Model, threshold: number) {
    this.entries.push({ threshold, model });

    return this;
  }

  fallback(node: Node) {
    this._fallback = node;

    return this;
  }

  dynamic(
    entries: number[],
    callbackFn: (index: number, threshold: number) => Model,
  ) {
    entries.forEach((entry, index) => {
      this.entries.push({ threshold: entry, model: callbackFn(index, entry) });
    });
    return this;
  }
}
