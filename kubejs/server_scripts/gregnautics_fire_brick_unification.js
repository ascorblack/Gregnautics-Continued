"use strict";

const GREGNAUTICS_TFMG_FIRE_BRICK_ITEM = "tfmg:fireproof_brick";
const GREGNAUTICS_TFC_FIRE_BRICK_ITEM = "tfc:ceramic/fire_brick";
const GREGNAUTICS_TFMG_FIRE_BRICKS_BLOCK = "tfmg:fireproof_bricks";
const GREGNAUTICS_TFC_FIRE_BRICKS_BLOCK = "tfc:fire_bricks";

const GREGNAUTICS_FIRE_BRICK_REPLACE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "minecraft:smelting" },
	{ type: "minecraft:blasting" },
	{ type: "minecraft:stonecutting" },
	{ type: "create:deploying" },
	{ type: "create:item_application" },
	{ type: "create:mechanical_crafting" },
	{ type: "create:sequenced_assembly", not: { mod: "createstellaris" } }, // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем
	{ type: "tfmg:vat_machine_recipe" },
	{ type: "tfmg:industrial_blasting" }
];

function gregnauticsHideFireBrickDuplicate(event, item) {
	if (!Item.exists(item)) {
		return;
	}
	event.add("c:hidden_from_recipe_viewers", item);
	event.add("forge:hidden_from_recipe_viewers", item);
}

function gregnauticsReplaceFireBrickInput(event, from, to) {
	if (!Item.exists(from) || !Item.exists(to)) {
		return;
	}
	event.replaceInput(GREGNAUTICS_FIRE_BRICK_REPLACE_FILTERS, from, to);
}

function gregnauticsReplaceFireBrickOutput(event, from, to) {
	if (!Item.exists(from) || !Item.exists(to)) {
		return;
	}
	event.replaceOutput(GREGNAUTICS_FIRE_BRICK_REPLACE_FILTERS, from, to);
}

ServerEvents.tags("item", event => {
	gregnauticsHideFireBrickDuplicate(event, GREGNAUTICS_TFMG_FIRE_BRICK_ITEM);
	gregnauticsHideFireBrickDuplicate(event, GREGNAUTICS_TFMG_FIRE_BRICKS_BLOCK);
});

ServerEvents.tags("block", event => {
	if (Item.exists(GREGNAUTICS_TFC_FIRE_BRICKS_BLOCK)) {
		event.add("tfmg:blast_furnace_wall", GREGNAUTICS_TFC_FIRE_BRICKS_BLOCK);
	}
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: fire_brick_unification recipes event start");
	gregnauticsReplaceFireBrickInput(event, GREGNAUTICS_TFMG_FIRE_BRICK_ITEM, GREGNAUTICS_TFC_FIRE_BRICK_ITEM);
	gregnauticsReplaceFireBrickOutput(event, GREGNAUTICS_TFMG_FIRE_BRICK_ITEM, GREGNAUTICS_TFC_FIRE_BRICK_ITEM);
	gregnauticsReplaceFireBrickInput(event, GREGNAUTICS_TFMG_FIRE_BRICKS_BLOCK, GREGNAUTICS_TFC_FIRE_BRICKS_BLOCK);
	gregnauticsReplaceFireBrickOutput(event, GREGNAUTICS_TFMG_FIRE_BRICKS_BLOCK, GREGNAUTICS_TFC_FIRE_BRICKS_BLOCK);

	event.remove({ id: "tfmg:crafting/materials/fireproof_bricks" });
	
	// Удаляем vanilla smelting рецепт для coke oven brick
	event.remove({ id: "gtceu:coke_oven_brick" });
	
	// Добавляем heating рецепт для compressed_coke_clay → coke_oven_brick
	// Аналогично unfired_brick → brick (температура ~1300°C)
	event.recipes.tfc.heating("gtceu:compressed_coke_clay", 1300)
		.resultItem("gtceu:coke_oven_brick")
		.id("gregnautics:heating/compressed_coke_clay");
});
