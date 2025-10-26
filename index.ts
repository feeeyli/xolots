import Xolots, { DisplayContexts, Models } from "./src";
import type { ItemId } from "./src/@types/itemId";
import type { Renameable } from "./src/models/renameable";

const PLATED_APPLE_NAMES = [
  "Plate of Apple",
  "Plated Apple",
  "Apple on Plate",
  "Apple on a Plate",
  "Apple Plate",
  "Apple Plated",
];

Xolots.item(
  "apple",
  Xolots.display()
    .case(
      ["fixed"],
      Xolots.renameable()
        .case(
          PLATED_APPLE_NAMES,
          Models.custom("./assets/textures/item/plated_foods/plated_apple_3d"),
        )
        .fallback(Models.fromItem("apple")),
    )
    .case(
      [
        "firstperson_righthand",
        "firstperson_lefthand",
        "thirdperson_righthand",
        "thirdperson_lefthand",
        "head",
        "ground",
      ],
      Xolots.renameable()
        .case(
          PLATED_APPLE_NAMES,
          Models.custom("./assets/textures/item/plated_foods/plated_apple_3d"),
        )
        .fallback(
          Xolots.usingAnimation()
            .dynamic([0, 6.4, 12.8, 19.2, 25.6, 31.5], (index) => {
              if (index <= 4)
                return Models.custom(
                  `./assets/textures/item/eatinganimation/apple/apple_eat_${index}`,
                );
              return Models.custom("./assets/textures/item/apple_3d");
            })
            .fallback(Models.custom("./assets/textures/item/apple_3d")),
        ),
    )
    .case(
      ["gui"],
      Xolots.renameable()
        .case(
          PLATED_APPLE_NAMES,
          Models.flat(
            "item/plated_foods/plated_apple",
            "plated_foods/plated_apple",
          ),
        )
        .fallback(Models.fromItem("apple")),
    )
    .fallback(Models.fromItem("apple")),
).register();

for (const tool of ["sword", "pickaxe", "axe", "shovel", "hoe"] as const) {
  Xolots.item(
    `iron_${tool}`,
    Models.fromItem(`iron_${tool}`).texture(
      `./assets/textures/item/ruby_${tool}.png`,
    ),
  ).register();
}

Xolots.item(
  "trident",
  Xolots.display()
    .case(
      DisplayContexts.IN_HAND,
      Models.custom("./assets/models/entity/king_trident.json"),
    )
    .fallback(
      Models.handheld(
        "./assets/textures/item/king_trident.png",
        "king_trident",
      ),
    ),
).register();

const LIGHTSABERS = [
  { name: "Red Lightsaber", texture: "red_lightsaber" },
  { name: "Blue Lightsaber", texture: "blue_lightsaber" },
  { name: "Green Lightsaber", texture: "green_lightsaber" },
  { name: "Purple Lightsaber", texture: "purple_lightsaber" },
  { name: "Yellow Lightsaber", texture: "yellow_lightsaber" },
];

function registerLightsaber(id: ItemId) {
  const inHand = Xolots.renameable().fallback(Models.fromItem(id));
  const flat = Xolots.renameable().fallback(Models.fromItem(id));

  for (const lightsaber of LIGHTSABERS) {
    inHand.case(
      [lightsaber.name, lightsaber.name.toLocaleLowerCase()],
      Models.custom("./assets/models/item/lightsaber.json").texture(
        `"./assets/textures/item/${lightsaber.texture}.png"`,
      ),
    );

    flat.case(
      [lightsaber.name, lightsaber.name.toLocaleLowerCase()],
      Models.handheld(
        `./assets/textures/item/${lightsaber.texture}_lightsaber_hand.png`,
        `${lightsaber.texture}_hand`,
      ),
    );
  }

  Xolots.item(
    id,
    Xolots.display().case(DisplayContexts.IN_HAND, inHand).fallback(flat),
  ).register();
}

registerLightsaber("diamond_sword");
registerLightsaber("netherite_sword");

const TOTEMS = [
  { names: ["Blahaj"], texture: "blahaj" },
  { names: ["Blahaj Bed"], texture: "blahaj_bed" },
  { names: ["Allay"], texture: "allay" },
  { names: ["Glare"], texture: "glare" },
  { names: ["The Kight"], texture: "the_knight" },
  { names: ["Hornet"], texture: "hornet" },
];

function registerRenameableTotems(node: Renameable) {
  for (const totem of TOTEMS) {
    node.case(
      totem.names,
      Models.custom(`./assets/models/item/${totem.texture}`),
    );
  }

  return node;
}

Xolots.item(
  "totem_of_undying",
  registerRenameableTotems(Xolots.renameable()).fallback(
    Xolots.display()
      .case(
        ["firstperson_lefthand", "firstperson_righthand"],
        Models.custom("./assets/models/item/totem_of_undying_fp"),
      )
      .case(["gui", "ground", "fixed"], Models.fromItem("totem_of_undying"))
      .fallback(Models.custom("./assets/models/item/totem_of_undying_hand")),
  ),
).register();

Xolots.final();
