"use strict";

const GREGNAUTICS_MAGNETIC_INGOTS = [
	"gtceu:magnetic_iron_ingot",
	"gtceu:magnetic_steel_ingot",
	"gtceu:magnetic_neodymium_ingot",
	"gtceu:magnetic_samarium_ingot"
];

ServerEvents.tags("item", event => {
	GREGNAUTICS_MAGNETIC_INGOTS.forEach(item => {
		if (!Item.exists(item)) {
			return;
		}

		event.add("c:ingots/magnetic", item);
		event.add("forge:ingots/magnetic", item);
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: lodestone_recipe recipes event start");
	event.remove({ id: "minecraft:lodestone" });
	event.custom({
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			M: {
				tag: "c:ingots/magnetic"
			},
			S: {
				item: "minecraft:chiseled_stone_bricks"
			}
		},
		pattern: [
			"SSS",
			"SMS",
			"SSS"
		],
		result: {
			count: 1,
			id: "minecraft:lodestone"
		}
	}).id("minecraft:lodestone");
});
