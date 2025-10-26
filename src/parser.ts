import type { Xolots } from ".";
import { Display } from "./models/display";
import type { Node } from "./models/node";
import { Model } from "./models/path";
import { Renameable } from "./models/renameable";
import type { Fallback } from "./models/types";
import { UsingAnimation } from "./models/using-animation";

export class Parser {
  parse(data: Xolots) {
    console.log(data);

    for (const item of data.items) {
      if (!item.model) throw new Error();

      const parsed = {
        model: this.#resolveModel(item.id, item.model),
      };

      console.log(item.id, "->", JSON.stringify(parsed, null, 2));
    }
  }

  #resolveFallback(id: string, fallback: Fallback) {
    if (typeof fallback === "string") {
      return {
        type: "minecraft:model",
        model: fallback,
      };
    }

    return this.#resolveModel(id, fallback);
  }

  #resolveModel(id: string, model: Node): { [key: string]: unknown } {
    if (model instanceof Model) {
      if (model.modelPath?.startsWith("#")) {
        if (!model.pathName) throw new Error(`unnamed model for item ${id}`);

        return {
          type: "minecraft:model",
          model: `minecraft:item/${model.pathName}`,
        };
      } else {
        return {
          type: "minecraft:model",
          model: model.modelPath,
        };
      }
    }

    if (model instanceof Display) {
      if (!model._fallback) {
        console.error(model);
        throw new Error("no fallback provided");
      }

      return {
        type: "minecraft:select",
        property: "minecraft:display_context",
        cases: model.cases.map((c) => {
          return {
            when: c.when,
            model: this.#resolveModel(id, c.model),
          };
        }),
        fallback: this.#resolveFallback(id, model._fallback),
      };
    }

    if (model instanceof Renameable) {
      if (!model._fallback) {
        console.error(model);
        throw new Error("no fallback provided");
      }

      return {
        type: "minecraft:select",
        property: "minecraft:component",
        component: "minecraft:custom_name",
        cases: model.cases.map((c) => {
          return {
            when: c.names,
            model: this.#resolveModel(id, c.model),
          };
        }),
        fallback: this.#resolveFallback(id, model._fallback),
      };
    }

    if (model instanceof UsingAnimation) {
      if (!model._fallback) {
        console.error(model);
        throw new Error("no fallback provided");
      }

      return {
        type: "minecraft:condition",
        property: "minecraft:using_item",
        on_true: {
          type: "minecraft:range_dispatch",
          property: "minecraft:use_duration",
          entries: model.entries.map((entry) => {
            return {
              threshold: entry.threshold,
              model: this.#resolveModel(id, entry.model),
            };
          }),
        },
        on_false: this.#resolveFallback(id, model._fallback),
      };
    }

    return {};
  }
}
