// priority: 5
"use strict";

const GREGNAUTICS_TFMG_TOOL_ITEMS = [
	"tfmg:steel_axe",
	"tfmg:steel_pickaxe",
	"tfmg:steel_shovel",
	"tfmg:steel_sword",
	"tfmg:steel_hoe",
	"tfmg:aluminum_axe",
	"tfmg:aluminum_pickaxe",
	"tfmg:aluminum_shovel",
	"tfmg:aluminum_sword",
	"tfmg:aluminum_hoe",
	"tfmg:lead_axe",
	"tfmg:lead_pickaxe",
	"tfmg:lead_shovel",
	"tfmg:lead_sword",
	"tfmg:lead_hoe"
];

ServerEvents.tags("item", event => {
	GREGNAUTICS_TFMG_TOOL_ITEMS.forEach(item => {
		event.add("c:hidden_from_recipe_viewers", item);
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: tfmg_tool_cleanup recipes event start");
	GREGNAUTICS_TFMG_TOOL_ITEMS.forEach(item => {
		event.remove({ output: item });
	});
});
