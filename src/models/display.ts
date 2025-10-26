import { Node } from "./node";
import type { DisplayContext } from "./types";

type DisplayCase = {
  when: DisplayContext[];
  model: Node;
};

export class Display extends Node {
  cases: DisplayCase[] = [];
  _fallback?: Node;

  case(context: DisplayContext[], model: Node) {
    this.cases.push({
      when: context,
      model,
    });

    return this;
  }

  fallback(node: Node) {
    this._fallback = node;

    return this;
  }
}
