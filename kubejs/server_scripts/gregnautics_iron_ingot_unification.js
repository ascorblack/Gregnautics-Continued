// priority: -90
"use strict";

const GREGNAUTICS_IRON_INGOT_REPLACEMENTS = [
	"minecraft:iron_ingot",
	"#c:ingots/iron",
	"#forge:ingots/iron"
];

const GREGNAUTICS_IRON_NUGGET_REPLACEMENTS = [
	"minecraft:iron_nugget",
	"#c:nuggets/iron",
	"#forge:nuggets/iron"
];

const GREGNAUTICS_IRON_INGOT_CANONICAL = "gtceu:wrought_iron_ingot";
const GREGNAUTICS_IRON_NUGGET_CANONICAL = "gtceu:wrought_iron_nugget";
const GREGNAUTICS_IRON_BLOCK_CANONICAL = "gtceu:wrought_iron_block";

const GREGNAUTICS_IRON_BLOCK_DIRECT_CRAFTING_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" }
];

const GREGNAUTICS_IRON_INGOT_REPLACEMENT_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "minecraft:smelting" },
	{ type: "minecraft:blasting" },
	{ type: "minecraft:stonecutting" },
	{ type: "minecraft:smithing_transform" },
	{ type: "minecraft:smithing_trim" },
	{ type: "create:compacting" },
	{ type: "create:crushing" },
	{ type: "create:cutting" },
	{ type: "create:deploying" },
	{ type: "create:item_application" },
	{ type: "create:mechanical_crafting" },
	{ type: "create:mixing" },
	{ type: "create:pressing" },
	{ type: "create:sequenced_assembly", not: { mod: "createstellaris" } }, // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем
	{ type: "createaddition:charging" },
	{ type: "createaddition:rolling" },
	{ type: "createdieselgenerators:compression_molding" },
	{ type: "createdieselgenerators:hammering" },
	{ type: "createdieselgenerators:wire_cutting" },
	{ type: "createvintageneoforged:coiling" },
	{ type: "createvintageneoforged:hammering" },
	{ type: "createvintageneoforged:polishing" },
	{ type: "framedblocks:frame" },
	{ type: "powergrid:magnetization" },
	{ type: "sewingkit:sewing" },
	{ type: "sophisticatedbackpacks:backpack_upgrade" },
	{ type: "sophisticatedcore:upgrade_next_tier" }
];

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: iron_ingot_unification recipes event start");
	if (!Item.exists(GREGNAUTICS_IRON_INGOT_CANONICAL)) {
		return;
	}

	GREGNAUTICS_IRON_INGOT_REPLACEMENTS.forEach(from => {
		event.replaceInput(GREGNAUTICS_IRON_INGOT_REPLACEMENT_FILTERS, from, GREGNAUTICS_IRON_INGOT_CANONICAL);
	});
	event.replaceOutput(GREGNAUTICS_IRON_INGOT_REPLACEMENT_FILTERS, "minecraft:iron_ingot", GREGNAUTICS_IRON_INGOT_CANONICAL);

	if (Item.exists(GREGNAUTICS_IRON_NUGGET_CANONICAL)) {
		GREGNAUTICS_IRON_NUGGET_REPLACEMENTS.forEach(from => {
			event.replaceInput(GREGNAUTICS_IRON_INGOT_REPLACEMENT_FILTERS, from, GREGNAUTICS_IRON_NUGGET_CANONICAL);
		});
		event.replaceOutput(GREGNAUTICS_IRON_INGOT_REPLACEMENT_FILTERS, "minecraft:iron_nugget", GREGNAUTICS_IRON_NUGGET_CANONICAL);
	}

	if (Item.exists(GREGNAUTICS_IRON_BLOCK_CANONICAL)) {
		event.replaceInput(GREGNAUTICS_IRON_BLOCK_DIRECT_CRAFTING_FILTERS, "minecraft:iron_block", GREGNAUTICS_IRON_BLOCK_CANONICAL);
		event.replaceOutput(GREGNAUTICS_IRON_BLOCK_DIRECT_CRAFTING_FILTERS, "minecraft:iron_block", GREGNAUTICS_IRON_BLOCK_CANONICAL);
	}

	console.info("[Gregnautics] Vanilla iron ingot recipe inputs and outputs unified to GTCEu wrought iron ingot.");
});
