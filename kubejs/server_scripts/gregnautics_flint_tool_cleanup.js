// priority: 5
"use strict";

const GREGNAUTICS_FLINT_TOOL_ITEMS = [
	"farmersdelight:flint_knife",
	"gtceu:flint_axe",
	"gtceu:flint_hoe",
	"gtceu:flint_knife",
	"gtceu:flint_mortar",
	"gtceu:flint_pickaxe",
	"gtceu:flint_shovel",
	"gtceu:flint_sword"
];

ServerEvents.tags("item", event => {
	GREGNAUTICS_FLINT_TOOL_ITEMS.forEach(item => {
		event.add("c:hidden_from_recipe_viewers", item);
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: flint_tool_cleanup recipes event start");
	GREGNAUTICS_FLINT_TOOL_ITEMS.forEach(item => {
		event.remove({ output: item });
	});
});
