import Xolots, { DisplayContexts, Models } from "./src";
import type { Item } from "./src/item";
import { Magik } from "./src/magik";

const PLATED_APPLE_NAMES = [
  "Plate of Apple",
  "Plated Apple",
  "Apple on Plate",
  "Apple on a Plate",
  "Apple Plate",
  "Apple Plated",
];

Xolots.item("apple")
  .display(
    ["fixed"],
    Xolots.renameable()
      .case(
        PLATED_APPLE_NAMES,
        Models.custom("./assets/textures/item/plated_foods/plated_apple_3d"),
      )
      .fallback("minecraft:item/apple"),
  )
  .display(
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
  .display(
    ["gui"],
    Xolots.renameable()
      .case(
        PLATED_APPLE_NAMES,
        Models.flat(
          "item/plated_foods/plated_apple",
          "plated_foods/plated_apple",
        ),
      )
      .fallback("minecraft:item/apple"),
  )
  .fallback("minecraft:item/apple")
  .register();

for (const tool of ["sword", "pickaxe", "axe", "shovel", "hoe"] as const) {
  Xolots.item(`iron_${tool}`)
    .default(
      Models.fromItem(`iron_${tool}`).texture(
        `./assets/textures/item/ruby_${tool}.png`,
      ),
    )
    .register();
}

Xolots.item("trident")
  .display(
    DisplayContexts.IN_HAND,
    Models.custom("./assets/models/entity/king_trident.json"),
  )
  .fallback(
    Models.handheld("./assets/textures/item/king_trident.png", "king_trident"),
  )
  .register();

const LIGHTSABERS = [
  { name: "Red Lightsaber", texture: "red_lightsaber" },
  { name: "Blue Lightsaber", texture: "blue_lightsaber" },
  { name: "Green Lightsaber", texture: "green_lightsaber" },
  { name: "Purple Lightsaber", texture: "purple_lightsaber" },
  { name: "Yellow Lightsaber", texture: "yellow_lightsaber" },
];

function registerLightsaber(item: Item) {
  const inHand = Xolots.renameable().fallback(`minecraft:item/${item.id}`);
  const flat = Xolots.renameable().fallback(`minecraft:item/${item.id}`);

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

  item.display(DisplayContexts.IN_HAND, inHand).fallback(flat).register();
}

registerLightsaber(Xolots.item("diamond_sword"));
registerLightsaber(Xolots.item("netherite_sword"));

Xolots.final();
