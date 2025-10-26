import type { Model } from "./path";
import { Node } from "./node";

type RenameableCase = {
  names: string[];
  model: Model;
};

export class Renameable extends Node {
  cases: RenameableCase[] = [];
  _fallback?: Node;

  case(names: string[], model: Model) {
    this.cases.push({
      names,
      model,
    });

    return this;
  }

  fallback(node: Node) {
    this._fallback = node;

    return this;
  }
}
