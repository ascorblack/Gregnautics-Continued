"use strict";

const GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING = "createvintageneoforged:iron_spring";
const GREGNAUTICS_SIMULATED_SPRING = "simulated:spring";

const GREGNAUTICS_CREATE_VINTAGE_SPRING_RECIPE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "create:mechanical_crafting" },
	{ type: "create:deploying" },
	{ type: "create:sequenced_assembly", not: { mod: "createstellaris" } }, // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем
	{ type: "createvintageneoforged:coiling" },
	{ type: "createvintageneoforged:vacuumizing" }
];

ServerEvents.tags("item", event => {
	if (!Item.exists(GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING)) return;

	event.add("c:hidden_from_recipe_viewers", GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING);
	event.add("forge:hidden_from_recipe_viewers", GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING);
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: create_vintage_spring_unification recipes event start");
	if (!Item.exists(GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING) || !Item.exists(GREGNAUTICS_SIMULATED_SPRING)) return;

	event.remove({ id: "createvintageneoforged:coiling/iron_spring" });
	event.remove({ output: GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING });

	event.replaceInput(GREGNAUTICS_CREATE_VINTAGE_SPRING_RECIPE_FILTERS, GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING, GREGNAUTICS_SIMULATED_SPRING);
	event.replaceOutput(GREGNAUTICS_CREATE_VINTAGE_SPRING_RECIPE_FILTERS, GREGNAUTICS_CREATE_VINTAGE_IRON_SPRING, GREGNAUTICS_SIMULATED_SPRING);
});
