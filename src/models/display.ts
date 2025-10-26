import { Model } from "./model";
import type { DisplayContext, Fallback } from "./types";

type DisplayCase = {
  when: DisplayContext[];
  model: Model;
};

export class Display extends Model {
  cases: DisplayCase[] = [];
  _fallback?: Fallback;

  constructor(context: DisplayContext[], model: Model) {
    super("display");

    this.cases.push({
      when: context,
      model,
    });
  }
}
