"use strict";

// Rabbits drop tfc:small_raw_hide instead of minecraft:rabbit_hide.
// The vanilla leather recipe (4 rabbit hides → leather) is also disabled.
ServerEvents.generateData("after_mods", event => {
	event.json("minecraft:loot_table/entities/rabbit", {
		type: "minecraft:entity",
		random_sequence: "minecraft:entities/rabbit",
		pools: [
			{
				rolls: 1,
				bonus_rolls: 0,
				entries: [
					{
						type: "minecraft:item",
						name: "tfc:small_raw_hide",
						functions: [
							{
								function: "minecraft:set_count",
								count: { type: "minecraft:uniform", min: 0.0, max: 1.0 },
								add: false
							},
							{
								function: "minecraft:looting_enchant",
								count: { min: 0.0, max: 1.0 }
							}
						]
					}
				]
			},
			{
				rolls: 1,
				bonus_rolls: 0,
				entries: [
					{
						type: "minecraft:item",
						name: "minecraft:rabbit",
						functions: [
							{
								function: "minecraft:set_count",
								count: { type: "minecraft:uniform", min: 0.0, max: 1.0 },
								add: false
							},
							{
								function: "minecraft:furnace_smelt",
								conditions: [
									{
										condition: "minecraft:entity_properties",
										entity: "this",
										predicate: { flags: { is_on_fire: true } }
									}
								]
							},
							{
								function: "minecraft:looting_enchant",
								count: { min: 0.0, max: 1.0 }
							}
						]
					}
				]
			},
			{
				rolls: 1,
				bonus_rolls: 0,
				entries: [
					{
						type: "minecraft:item",
						name: "minecraft:rabbit_foot",
						conditions: [
							{ condition: "minecraft:killed_by_player" },
							{
								condition: "minecraft:random_chance_with_looting",
								chance: 0.1,
								looting_multiplier: 0.03
							}
						]
					}
				]
			}
		]
	});

	// Disable the vanilla 4x rabbit_hide → leather crafting recipe
	event.json("minecraft:recipe/leather", {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "gregnautics_disabled_recipe_guard" }],
		type: "minecraft:crafting_shapeless",
		ingredients: [{ item: "minecraft:barrier" }],
		result: { id: "minecraft:barrier" }
	});
});
