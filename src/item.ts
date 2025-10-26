import type { ItemId } from "./@types/itemId";
import { Display } from "./models/display";
import type { Model } from "./models/model";
import type { DisplayContext, Fallback } from "./models/types";

export class Item {
  id: ItemId;
  model?: Model;
  #register;

  constructor(id: ItemId, registerFn: (item: Item) => void) {
    this.id = id;
    this.#register = registerFn;
  }

  register() {
    this.#register(this);
  }

  display(context: DisplayContext[], model: Model) {
    if (!this.model) {
      this.model = new Display(context, model);
      return this;
    }

    if (this.model instanceof Display) {
      this.model.cases.push({ when: context, model: model });
      return this;
    } else {
      throw new Error();
    }
  }

  default(model: Model) {
    if (this.model) throw new Error();

    this.model = model;
    return this;
  }

  fallback(fallback: Fallback) {
    if (this.model && "_fallback" in this.model) {
      this.model._fallback = fallback;
    }

    return this;
  }
}
