// priority: -200
"use strict";

const GREGNAUTICS_DISABLED_CREATE_COMPACTING_RECIPE_IDS = [
	"tfmg:compacting/cast_iron",
	"createbigcannons:compacting/forge_bronze_block",
	"createbigcannons:compacting/forge_bronze_ingot",
	"createbigcannons:compacting/forge_bronze_nugget",
	"createbigcannons:compacting/forge_cast_iron_block",
	"createbigcannons:compacting/forge_cast_iron_ingot",
	"createbigcannons:compacting/forge_cast_iron_nugget",
	"createbigcannons:compacting/cast_iron_block",
	"createbigcannons:compacting/forge_steel_block",
	"createbigcannons:compacting/forge_steel_ingot",
	"createbigcannons:compacting/forge_steel_nugget",
	"createbigcannons:compacting/iron_to_cast_iron_ingot"
];

const GREGNAUTICS_DISABLED_TFMG_METAL_PACKING_MATERIALS = [
	"aluminum",
	"cast_iron",
	"lead",
	"lithium",
	"nickel",
	"steel"
];

function gregnauticsRemoveCreateCompactingOutput(event, item) {
	if (Item.exists(item)) {
		event.remove({ type: "create:compacting", output: item });
	}
}

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: create_compacting_cleanup recipes event start");
	GREGNAUTICS_DISABLED_CREATE_COMPACTING_RECIPE_IDS.forEach(id => {
		event.remove({ id: id });
	});

	GREGNAUTICS_DISABLED_TFMG_METAL_PACKING_MATERIALS.forEach(material => {
		event.remove({ id: `tfmg:crafting/materials/${material}_block_from_compacting` });
		event.remove({ id: `tfmg:crafting/materials/${material}_ingot_from_compacting` });
		event.remove({ id: `tfmg:crafting/materials/${material}_ingot_from_decompacting` });
		event.remove({ id: `tfmg:crafting/materials/${material}_nugget_from_decompacting` });
	});

	[
		"tfc:ceramic/unfired_crucible",
		"tfc:crucible",
		"woodencog:unfired_fireclay_crucible",
		"woodencog:fireclay_crucible"
	].forEach(item => {
		gregnauticsRemoveCreateCompactingOutput(event, item);
	});

	[
		"c:molten_bronze",
		"forge:molten_bronze",
		"c:molten_cast_iron",
		"forge:molten_cast_iron",
		"c:molten_steel",
		"forge:molten_steel"
	].forEach(tag => {
		event.remove({ type: "create:compacting", input: `#${tag}` });
	});

	[
		"tfc:metal/ingot/cast_iron",
		"tfc:metal/block/cast_iron",
		"tfmg:cast_iron_block",
		"createbigcannons:cast_iron_block",
		"gtceu:bronze_nugget",
		"gtceu:bronze_ingot",
		"gtceu:bronze_block",
		"gtceu:steel_nugget",
		"gtceu:steel_ingot",
		"gtceu:steel_block"
	].forEach(item => {
		gregnauticsRemoveCreateCompactingOutput(event, item);
	});
});
