import type { ItemId } from "./@types/itemId";
import type { Node } from "./models/node";

export class Item {
  id;
  model;
  #register;

  constructor(id: ItemId, model: Node, registerFn: (item: Item) => void) {
    this.id = id;
    this.model = model;
    this.#register = registerFn;
  }

  register() {
    this.#register(this);
  }

  default(model: Node) {
    if (this.model) throw new Error();

    this.model = model;
    return this;
  }
}
