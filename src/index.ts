import type { ItemId } from "./@types/itemId";
import { Item } from "./item";
import { Display } from "./models/display";
import type { Model } from "./models/model";
import { Path } from "./models/path";
import { Renameable } from "./models/renameable";
import type { DisplayContext } from "./models/types";
import { UsingAnimation } from "./models/using-animation";
import { Parser } from "./parser";

export const Models = {
  custom(path: string) {
    return new Path(path);
  },
  flat(texturePath: string, name: string) {
    return new Path("#flat").texture(texturePath).name(name);
  },
  handheld(texturePath: string, name: string) {
    return new Path("#handheld").texture(texturePath).name(name);
  },
  fromItem(id: ItemId) {
    return new Path(`minecraft:item/${id}`).texture(`minecraft:item/${id}`);
  },
};

export const DisplayContexts = {
  FLAT: ["gui", "ground", "fixed", "on_shelf"] satisfies DisplayContext[],
  IN_HAND: [
    "thirdperson_lefthand",
    "thirdperson_righthand",
    "firstperson_lefthand",
    "firstperson_righthand",
    "head",
  ] satisfies DisplayContext[],
  ALL: [] satisfies DisplayContext[],
};

export class Xolots {
  items: Item[] = [];

  item(id: ItemId) {
    return new Item(id, (item) => {
      this.items.push(item);
    });
  }

  renameable() {
    return new Renameable();
  }

  usingAnimation() {
    return new UsingAnimation();
  }

  display(context: DisplayContext[], model: Model) {
    return new Display(context, model);
  }

  final() {
    new Parser().parse(this);
  }
}

export default new Xolots();
