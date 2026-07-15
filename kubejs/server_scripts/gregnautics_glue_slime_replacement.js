"use strict";

const GREGNAUTICS_GLUE_RECIPE_IDS = [
	"create:crafting/kinetics/super_glue",
	"create:crafting/kinetics/sticker",
	"createaddition:crafting/connector",
	"createaddition:crafting/large_connector",
	"tfmg:crafting/materials/unfinished_resistorfrom_slime",
	"kineticgrip:grip_handle"
];

const GREGNAUTICS_GLUE_INPUTS = [
	"minecraft:slime_ball",
	"#c:slimeballs",
	"#forge:slimeballs",
	"#c:slime_balls",
	"#forge:slime_balls"
];

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: glue_slime_replacement recipes event start");
	GREGNAUTICS_GLUE_RECIPE_IDS.forEach(id => {
		GREGNAUTICS_GLUE_INPUTS.forEach(input => {
			event.replaceInput({ id: id }, input, "tfc:glue");
		});
	});

	event.remove({ id: "create:crafting/appliances/slime_ball" });
});
