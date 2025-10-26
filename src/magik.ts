import type { ItemId } from "./@types/itemId";

type Node = {
  type: string;
} & (DisplayContextNode | ModelNode | RenameableNode | UsingAnimationNode);

type ModelNode = {
  type: "minecraft:model";
  model: string;
};

type DisplayContextNode = {
  type: "minecraft:select";
  property: "minecraft:display_context";
  cases: { when: string[]; model: Node }[];
  fallback: Node;
};

type RenameableNode = {
  type: "minecraft:select";
  property: "minecraft:component";
  component: "minecraft:custom_name";
  cases: { when: string[]; model: Node }[];
  fallback: Node;
};

type UsingAnimationNode = {
  type: "minecraft:condition";
  property: "minecraft:using_item";
  on_true: {
    type: "minecraft:range_dispatch";
    property: "minecraft:use_duration";
    entries: {
      threshold: 0;
      model: ModelNode;
    }[];
  };
  on_false: Node;
};

export class Magik {
  result = "";

  #parseArray<T>(arr: T[]) {
    return `["${arr.join('", "')}"]`;
  }

  parseItem(id: ItemId, json: string) {
    const data = JSON.parse(json);

    this.result = `Xolots.item("${id}")`;

    this.#resolveAndInsertNode(data.model);

    this.result += ";";

    console.log(this.result);
  }

  #resolveNode(node: Node): string | string[] {
    if (
      node.type === "minecraft:select" &&
      node.property === "minecraft:display_context"
    ) {
      return [
        ...node.cases.map((c) => {
          return `.display(${this.#parseArray(c.when)}, ${this.#resolveNode(c.model)})`;
        }),
        `.fallback(${this.#resolveNode(node.fallback)})`,
      ];
    }

    if (node.type === "minecraft:model") {
      return `<MODEL ${node.model}>`;
    }

    if (
      node.type === "minecraft:select" &&
      node.component === "minecraft:custom_name"
    ) {
      return node.cases.map((c) => {
        return `Xolots.renameable().case(${this.#parseArray(c.when)}, ${this.#resolveNode(c.model)}).fallback(${this.#resolveNode(node.fallback)})`;
      });
    }

    if (
      node.type === "minecraft:condition" &&
      node.property === "minecraft:using_item"
    ) {
      return `Xolots.usingAnimation()${node.on_true.entries
        .map((entry) => {
          return `.model(<MODEL ${entry.model.model}>, ${entry.threshold})`;
        })
        .join("")}.fallback(${this.#resolveNode(node.on_false)})`;
    }

    return "<ERROR>";
  }

  #resolveAndInsertNode(node: Node) {
    const resolved = this.#resolveNode(node);

    if (typeof resolved === "string") {
      this.result += resolved;
    } else {
      resolved.forEach((r) => {
        this.result += r;
      });
    }
  }
}
