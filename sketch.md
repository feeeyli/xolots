```ts
Xolots.item("iron_sword")
  .default(Models.handheld("./assets/textures/item/ruby_sword.png"));

Xolots.item("iron_pickaxe")
  .default(Models.handheld("./assets/textures/item/ruby_pickaxe.png"));

Xolots.item("trident")
  .default(Models.custom("./assets/models/entity/king_trident.json"), {
    inHand: Models.handheld("./assets/textures/item/king_trident.png")
  });

Xolots.item(["diamond_sword", "netherite_sword"])
  .renameable(
    "Red Lightsaber",
    Models
      .custom("./assets/models/item/lightsaber.json")
      .texture("./assets/textures/item/red_lightsaber.png"),
    {
      inHand: Models.handheld("./assets/textures/item/red_lightsaber_hand.png")
    }
  )
  .renameable(
    "Blue Lightsaber",
    Models
      .custom("./assets/models/item/lightsaber.json")
      .texture("./assets/textures/item/blue_lightsaber.png"),
    {
      inHand: Models.handheld("./assets/textures/item/blue_lightsaber_hand.png")
    }
  )
  .default()
```

---

```ts

.beforeBreaking(model, extraModels);
.renameable(name, model, extraModels);

.damage(damage, model, extraModels);
.durability(durability, model, extraModels);

.enchantments(enchantments }, model, extraModels);
.enchantmentsLevels(levels, model, extraModels);

.storedEnchantments(enchantments }, model, extraModels);
.storedEnchantmentsLevels(levels, model, extraModels);

.count(count, model, extraModels);
.useDuration(duration, model, extraModels);

```

```ts

.renameable("ruby_sword", )

```

```ts

Xolots.item("iron_sword")
  .display(DisplayContexts.ALL)
  .model(Models.handheld("./assets/textures/item/ruby_sword.png"));

Xolots.item("iron_pickaxe")
  .display(DisplayContexts.ALL)
  .model(Models.handheld("./assets/textures/item/ruby_pickaxe.png"));

Xolots.item("trident", (item) => {
  item
    .display(DisplayContexts.FLAT)
    .model(Models.handheld("./assets/textures/item/king_trident.png"));
  item
    .display(DisplayContexts.IN_HAND)
    .model(Models.custom("./assets/models/entity/king_trident.json"));

  return item
})

Xolots.items(["diamond_sword", "netherite_sword"], (item) => {
  item.renameable("Red Lightsaber", (lightsaber) => {
    lightsaber
      .display(DisplayContexts.FLAT)
      .model(Models.handheld("./assets/textures/item/red_lightsaber_hand.png"));
    lightsaber
      .display(DisplayContexts.IN_HAND)
      .model(
        Models
          .custom("./assets/models/item/lightsaber.json")
          .texture("./assets/textures/item/red_lightsaber.png")
      );
  })

  item.renameable("Blue Lightsaber", (lightsaber) => {
    lightsaber
      .display(DisplayContexts.FLAT)
      .model(Models.handheld("./assets/textures/item/blue_lightsaber_hand.png"));
    lightsaber
      .display(DisplayContexts.IN_HAND)
      .model(
        Models
          .custom("./assets/models/item/lightsaber.json")
          .texture("./assets/textures/item/blue_lightsaber.png")
      );
  })
})

```

```ts

Xolots.item("apple")
  .display(
    ["fixed"],
    Xolots
      .renameable(["Plate of Apple", "Plated Apple", "Apple on Plate", "Apple on a Plate", "Apple Plate", "Apple Plated"])
      .model(Models.custom("item/plated_foods/plated_apple_3d"))
      .default()
  )
  .display(["firstperson_righthand", "firstperson_lefthand", "thirdperson_righthand", "thirdperson_lefthand", "head", "ground"],
    Xolots
      .renameable(["Plate of Apple", "Plated Apple", "Apple on Plate", "Apple on a Plate", "Apple Plate", "Apple Plated"])
      .model(Models.custom("item/plated_foods/plated_apple_3d"))
      .default(
        Xolots
          .eatAnimation()
          .model(Models.custom("item/eatinganimation/apple/apple_eat_0"), 0)
          .model(Models.custom("item/eatinganimation/apple/apple_eat_1"), 6.4)
          .model(Models.custom("item/eatinganimation/apple/apple_eat_2"), 12.8)
          .model(Models.custom("item/eatinganimation/apple/apple_eat_3"), 19.2)
          .model(Models.custom("item/eatinganimation/apple/apple_eat_4"), 25.6)
          .model(Models.custom("item/apple_3d"), 31.5)
          .default()
      )
  )
  .display(
    ["gui"],
    Xolots
      .renameable(["Plate of Apple", "Plated Apple", "Apple on Plate", "Apple on a Plate", "Apple Plate", "Apple Plated"])
      .model(Models.flat("item/plated_foods/plated_apple"))
      .default()
  )


```
