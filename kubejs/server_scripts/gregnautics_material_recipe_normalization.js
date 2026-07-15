"use strict";

// Common material tags are recipe-facing tags. Keep them populated with the
// canonical item only, so recipes do not accept hidden duplicate forms.
var GREGNAUTICS_UNIFY_MATERIALS = [
	{ id: "copper" },
	{ id: "bismuth" },
	{ id: "tin" },
	{ id: "zinc" },
	{ id: "silver" },
	{ id: "gold" },
	{ id: "nickel" },
	{ id: "lead" },
	{ id: "platinum" },
	{ id: "antimony" },
	{ id: "aluminium", aliases: ["aluminum"], tfcItems: "aluminum" },
	{ id: "cobalt" },
	{ id: "chromium" },
	{ id: "wrought_iron", aliases: ["iron", "industrial_iron"] },
	{ id: "annealed_copper" },
	{ id: "steel" },
	{ id: "black_steel" },
	{ id: "red_steel" },
	{ id: "blue_steel" },
	{ id: "stainless_steel" },
	{ id: "red_alloy" },
	{ id: "tin_alloy" },
	{ id: "cupronickel" },
	{ id: "cobalt_brass" },
	{ id: "soldering_alloy" },
	{ id: "battery_alloy" },
	{ id: "europium" },
	{ id: "niobium_titanium" },
	{ id: "tungsten" },
	{ id: "vanadium_gallium" },
	{ id: "yttrium_barium_cuprate" },
	{ id: "bronze" },
	{ id: "bismuth_bronze" },
	{ id: "black_bronze" },
	{ id: "brass" },
	{ id: "electrum" },
	{ id: "constantan" },
	{ id: "rose_gold" },
	{ id: "sterling_silver" },
	{ id: "cast_iron" },
	{ id: "pig_iron" },
	{ id: "weak_steel" },
	{ id: "weak_red_steel" },
	{ id: "weak_blue_steel" },
	{ id: "high_carbon_steel" },
	{ id: "high_carbon_black_steel" },
	{ id: "high_carbon_red_steel" },
	{ id: "high_carbon_blue_steel" },
	{ id: "invar" },
	{ id: "potin" }
];

var GREGNAUTICS_UNIFY_FORMS = [
	{ tag: "ingots", gt: id => `gtceu:${id}_ingot`, tfc: id => `tfc:metal/ingot/${id}`, external: [gregnauticsUnifyExternalIngots] },
	{ tag: "nuggets", gt: id => `gtceu:${id}_nugget`, external: [gregnauticsUnifyExternalNuggets] },
	{ tag: "storage_blocks", gt: id => `gtceu:${id}_block`, tfc: id => `tfc:metal/block/${id}`, external: [gregnauticsUnifyExternalStorageBlocks] },
	{ tag: "plates", gt: id => `gtceu:${id}_plate`, tfc: id => `tfc:metal/sheet/${id}`, external: [gregnauticsUnifyExternalPlates] },
	{ tag: "sheets", gt: id => `gtceu:${id}_plate`, tfc: id => `tfc:metal/sheet/${id}`, external: [gregnauticsUnifyExternalPlates] },
	{ tag: "double_ingots", gt: id => `gtceu:double_${id}_ingot`, tfc: id => `tfc:metal/double_ingot/${id}`, external: [gregnauticsUnifyExternalDoubleIngots] },
	{ tag: "double_plates", gt: id => `gtceu:double_${id}_plate`, tfc: id => `tfc:metal/double_sheet/${id}`, tfcItems: id => `tfc_items:${id}_heavy_sheet`, external: [gregnauticsUnifyExternalDoublePlates] },
	{ tag: "double_sheets", gt: id => `gtceu:double_${id}_plate`, tfc: id => `tfc:metal/double_sheet/${id}`, tfcItems: id => `tfc_items:${id}_heavy_sheet`, external: [gregnauticsUnifyExternalDoublePlates] },
	{ tag: "rods", gt: id => `gtceu:${id}_rod`, tfc: id => `tfc:metal/rod/${id}`, external: [gregnauticsUnifyExternalRods] },
	{ tag: "long_rods", gt: id => `gtceu:long_${id}_rod` },
	{ tag: "small_springs", gt: id => `gtceu:small_${id}_spring` },
	{ tag: "springs", gt: id => `gtceu:${id}_spring` },
	{ tag: "bolts", gt: id => `gtceu:${id}_bolt` },
	{ tag: "screws", gt: id => `gtceu:${id}_screw`, tfcItems: id => `tfc_items:${id}_screw` },
	{ tag: "rings", gt: id => `gtceu:${id}_ring`, tfcItems: id => `tfc_items:${id}_ring` },
	{ tag: "small_gears", gt: id => `gtceu:small_${id}_gear` },
	{ tag: "gears", gt: id => `gtceu:${id}_gear`, tfcItems: id => `tfc_items:${id}_gear` },
	{ tag: "foils", gt: id => `gtceu:${id}_foil`, tfcItems: id => `tfc_items:${id}_foil` },
	{ tag: "bars", tfc: id => `tfc:metal/bars/${id}`, external: [gregnauticsUnifyExternalBars] }
];

var GREGNAUTICS_UNIFY_RECIPE_FORMS = [
	"ingots",
	"nuggets",
	"storage_blocks",
	"plates",
	"sheets",
	"double_ingots",
	"double_plates",
	"double_sheets",
	"rods",
	"long_rods",
	"small_springs",
	"springs",
	"screws",
	"rings",
	"small_gears",
	"gears"
];

function gregnauticsUnifyItemExists(item) {
	return item !== undefined && Item.exists(item);
}

function gregnauticsUnifyMaterialNames(material) {
	return [material.id].concat(material.aliases || []);
}

function gregnauticsUnifyTfcItemsName(material) {
	return material.tfcItems || material.id;
}

function gregnauticsUnifyExternalIngots(name) {
	var items = [
		`minecraft:${name}_ingot`,
		`create:${name}_ingot`,
		`createaddition:${name}_ingot`,
		`tfmg:${name}_ingot`,
		`createdeco:${name}_ingot`
	];
	if (name === "bronze") items.push("createbigcannons:bronze_ingot");
	if (name === "steel") items.push("createbigcannons:steel_ingot");
	if (name === "cast_iron") items.push("createbigcannons:cast_iron_ingot");
	if (name === "chromium") items.push("firmalife:metal/ingot/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/ingot/stainless_steel");
	if (name === "platinum") items.push("createpropulsion:platinum_ingot");
	return items;
}

function gregnauticsUnifyExternalNuggets(name) {
	var items = [
		`minecraft:${name}_nugget`,
		`create:${name}_nugget`,
		`createaddition:${name}_nugget`,
		`tfmg:${name}_nugget`,
		`createdeco:${name}_nugget`
	];
	if (name === "bronze") items.push("createbigcannons:bronze_scrap");
	if (name === "steel") items.push("createbigcannons:steel_scrap");
	if (name === "platinum") items.push("createpropulsion:platinum_nugget");
	return items;
}

function gregnauticsUnifyExternalStorageBlocks(name) {
	var items = [
		`minecraft:${name}_block`,
		`create:${name}_block`,
		`createaddition:${name}_block`,
		`tfmg:${name}_block`,
		`createdeco:${name}_block`
	];
	if (name === "bronze") items.push("createbigcannons:bronze_block");
	if (name === "steel") items.push("createbigcannons:steel_block");
	if (name === "cast_iron") items.push("createbigcannons:cast_iron_block");
	if (name === "chromium") items.push("firmalife:metal/block/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/block/stainless_steel");
	if (name === "platinum") items.push("createpropulsion:platinum_block");
	return items;
}

function gregnauticsUnifyExternalPlates(name) {
	var items = [
		`create:${name}_sheet`,
		`createaddition:${name}_sheet`,
		`tfmg:${name}_sheet`,
		`createdeco:${name}_sheet`,
		`tfc_ie_addon:metal/sheet/${name}`
	];
	if (name === "gold") items.push("create:golden_sheet");
	if (name === "iron") items.push("create:iron_sheet");
	if (name === "steel") items.push("tfmg:heavy_plate");
	if (name === "chromium") items.push("firmalife:metal/sheet/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/sheet/stainless_steel");
	if (name === "platinum") items.push("createpropulsion:platinum_sheet");
	if (name === "zinc") items.push("powergrid:zinc_sheet");
	return items;
}

function gregnauticsUnifyExternalDoubleIngots(name) {
	var items = [];
	if (name === "chromium") items.push("firmalife:metal/double_ingot/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/double_ingot/stainless_steel");
	return items;
}

function gregnauticsUnifyExternalDoublePlates(name) {
	var items = [];
	if (name === "chromium") items.push("firmalife:metal/double_sheet/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/double_sheet/stainless_steel");
	return items;
}

function gregnauticsUnifyExternalRods(name) {
	var items = [
		`createaddition:${name}_rod`
	];
	if (name === "chromium") items.push("firmalife:metal/rod/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/rod/stainless_steel");
	return items;
}

function gregnauticsUnifyExternalBars(name) {
	return [
		`minecraft:${name}_bars`,
		`create:${name}_bars`,
		`createdeco:${name}_bars`,
		`createdeco:${name}_bars_overlay`
	];
}

function gregnauticsUnifyPushCandidate(candidates, item) {
	if (item === undefined) {
		return;
	}
	if (Array.isArray(item)) {
		item.forEach(candidate => gregnauticsUnifyPushCandidate(candidates, candidate));
		return;
	}
	candidates.push(item);
}

function gregnauticsUnifyExternalCandidates(material, form) {
	var candidates = [];
	var names = gregnauticsUnifyMaterialNames(material);

	if (form.external === undefined) {
		return candidates;
	}

	form.external.forEach(factory => {
		names.forEach(name => gregnauticsUnifyPushCandidate(candidates, factory(name, material)));
	});

	return candidates;
}

function gregnauticsUnifyCandidates(material, form) {
	var names = gregnauticsUnifyMaterialNames(material);
	var candidates = [];

	names.forEach(name => {
		if (form.gt !== undefined) candidates.push(form.gt(name));
		if (form.tfc !== undefined) candidates.push(form.tfc(name));
	});

	if (form.tfcItems !== undefined) {
		candidates.push(form.tfcItems(gregnauticsUnifyTfcItemsName(material)));
	}

	gregnauticsUnifyExternalCandidates(material, form).forEach(item => candidates.push(item));

	return candidates.filter((item, index, items) => item !== undefined && items.indexOf(item) === index);
}

function gregnauticsUnifyCanonicalItem(material, form) {
	var names = gregnauticsUnifyMaterialNames(material);
	var gtItems = form.gt === undefined ? [] : names.map(name => form.gt(name));
	var tfcItems = form.tfc === undefined ? [] : names.map(name => form.tfc(name));
	var addonItem = form.tfcItems === undefined ? undefined : form.tfcItems(gregnauticsUnifyTfcItemsName(material));
	var externalItems = gregnauticsUnifyExternalCandidates(material, form);

	if (form.preferTfc) {
		var preferredTfcItem = tfcItems.find(gregnauticsUnifyItemExists);
		if (preferredTfcItem !== undefined) return preferredTfcItem;
	}

	var gtItem = gtItems.find(gregnauticsUnifyItemExists);
	if (gtItem !== undefined) return gtItem;

	var fallbackTfcItem = tfcItems.find(gregnauticsUnifyItemExists);
	if (fallbackTfcItem !== undefined) return fallbackTfcItem;

	if (gregnauticsUnifyItemExists(addonItem)) return addonItem;

	return externalItems.find(gregnauticsUnifyItemExists);
}

function gregnauticsUnifyAddTag(event, tagPath, item) {
	event.add(`gregnautics:${tagPath}`, item);
}

function gregnauticsUnifyRemoveTag(event, tagPath, item) {
	event.remove(`gregnautics:${tagPath}`, item);
}

function gregnauticsUnifyCandidateTagPaths(form, material) {
	return gregnauticsUnifyMaterialNames(material).map(name => `${form.tag}/${name}`);
}

function gregnauticsUnifyAliasTagPaths(form, material) {
	return (material.aliases || []).map(name => `${form.tag}/${name}`);
}

function gregnauticsUnifyPrimaryTagPath(form, material) {
	return `${form.tag}/${material.id}`;
}

function gregnauticsUnifyCommonTagPaths(form, material) {
	var paths = [];
	gregnauticsUnifyMaterialNames(material).forEach(name => {
		paths.push(`c:${form.tag}/${name}`);
		paths.push(`forge:${form.tag}/${name}`);
	});
	return paths.filter((path, index, items) => items.indexOf(path) === index);
}

function gregnauticsUnifyShouldReplaceRecipeForm(form) {
	return GREGNAUTICS_UNIFY_RECIPE_FORMS.indexOf(form.tag) !== -1;
}

function gregnauticsUnifyShouldHideCandidate(form, item, canonical) {
	if (item === canonical) {
		return false;
	}
	if (form.tag === "storage_blocks" && item.indexOf("tfc:metal/block/") === 0) {
		return false;
	}
	if (form.tag === "storage_blocks" && item === "create:industrial_iron_block") {
		return false;
	}
	return true;
}

function gregnauticsUnifyShouldForceShowCandidate(form, item) {
	return form.tag === "storage_blocks" && (item.indexOf("tfc:metal/block/") === 0 || item === "create:industrial_iron_block");
}

function gregnauticsUnifyHideDuplicateTfcItemsGear(event, material) {
	var gtGear = `gtceu:${material.id}_gear`;
	var tfcItemsGear = `tfc_items:${gregnauticsUnifyTfcItemsName(material)}_gear`;
	if (!gregnauticsUnifyItemExists(gtGear) || !gregnauticsUnifyItemExists(tfcItemsGear)) {
		return;
	}

	gregnauticsUnifyMaterialNames(material).forEach(name => {
		event.remove(`c:gears/${name}`, tfcItemsGear);
		event.remove(`forge:gears/${name}`, tfcItemsGear);
	});
	event.add("c:hidden_from_recipe_viewers", tfcItemsGear);
	event.add("forge:hidden_from_recipe_viewers", tfcItemsGear);
}

ServerEvents.tags("item", event => {
	GREGNAUTICS_UNIFY_MATERIALS.forEach(material => {
		GREGNAUTICS_UNIFY_FORMS.forEach(form => {
			var canonical = gregnauticsUnifyCanonicalItem(material, form);
			if (canonical === undefined) {
				return;
			}

			var candidates = gregnauticsUnifyCandidates(material, form);
			gregnauticsUnifyCandidateTagPaths(form, material).forEach(tagPath => {
				candidates.forEach(item => {
					if (item !== canonical) {
						gregnauticsUnifyRemoveTag(event, tagPath, item);
					}
				});
			});
			gregnauticsUnifyAliasTagPaths(form, material).forEach(tagPath => {
				gregnauticsUnifyRemoveTag(event, tagPath, canonical);
			});
			gregnauticsUnifyAddTag(event, gregnauticsUnifyPrimaryTagPath(form, material), canonical);

			if (gregnauticsUnifyShouldReplaceRecipeForm(form)) {
				gregnauticsUnifyCommonTagPaths(form, material).forEach(tagPath => {
					candidates.forEach(item => {
						if (item !== canonical) {
							event.remove(tagPath, item);
						}
					});
					event.add(tagPath, canonical);
				});
			}

			candidates.forEach(item => {
				if (gregnauticsUnifyShouldForceShowCandidate(form, item)) {
					event.remove("c:hidden_from_recipe_viewers", item);
					event.remove("forge:hidden_from_recipe_viewers", item);
				}
				if (gregnauticsUnifyShouldHideCandidate(form, item, canonical) && gregnauticsUnifyItemExists(item)) {
					event.add("c:hidden_from_recipe_viewers", item);
					event.add("forge:hidden_from_recipe_viewers", item);
				}
			});
		});

		gregnauticsUnifyHideDuplicateTfcItemsGear(event, material);
	});

	event.remove("createdeco:internal/ingots/iron_ingots", "minecraft:iron_ingot");
	event.remove("createdeco:internal/nuggets/iron_nuggets", "minecraft:iron_nugget");
	event.remove("createdeco:internal/blocks/iron_blocks", "minecraft:iron_block");
	event.remove("createdeco:internal/plates/iron_plates", "create:iron_sheet");
	event.remove("createdeco:internal/ingots/andesite_ingots", "create:andesite_alloy");
	event.remove("createdeco:internal/blocks/andesite_blocks", "create:andesite_alloy_block");
	event.remove("createdeco:internal/plates/andesite_plates", "createdeco:andesite_sheet");
	event.add("createdeco:internal/ingots/iron_ingots", "#gregnautics:ingots/wrought_iron");
	event.add("createdeco:internal/nuggets/iron_nuggets", "#gregnautics:nuggets/wrought_iron");
	event.add("createdeco:internal/blocks/iron_blocks", "#gregnautics:storage_blocks/wrought_iron");
	event.add("createdeco:internal/plates/iron_plates", "#gregnautics:plates/wrought_iron");
	event.add("createdeco:internal/ingots/andesite_ingots", "#gregnautics:ingots/wrought_iron");
	event.add("createdeco:internal/blocks/andesite_blocks", "#gregnautics:storage_blocks/wrought_iron");
	event.add("createdeco:internal/plates/andesite_plates", "#gregnautics:plates/wrought_iron");

	["c:plates/steel", "forge:plates/steel", "c:plates", "forge:plates"].forEach(tag => {
		event.remove(tag, "tfmg:heavy_plate");
		event.add(tag, "gtceu:steel_plate");
	});
	["c:hidden_from_recipe_viewers", "forge:hidden_from_recipe_viewers"].forEach(tag => {
		event.add(tag, "tfmg:unprocessed_heavy_plate");
		event.add(tag, "createbigcannons:molten_cast_iron_bucket");
		event.add(tag, "createbigcannons:molten_bronze_bucket");
		event.add(tag, "createbigcannons:molten_steel_bucket");
		event.add(tag, "tfmg:molten_steel_bucket");
		event.add(tag, "firmalife:bucket/metal/chromium");
		event.add(tag, "firmalife:bucket/metal/stainless_steel");
	});
});

ServerEvents.tags("fluid", event => {
	[
		"createbigcannons:molten_bronze",
		"createbigcannons:flowing_molten_bronze",
		"createbigcannons:molten_cast_iron",
		"createbigcannons:flowing_molten_cast_iron",
		"createbigcannons:molten_steel",
		"createbigcannons:flowing_molten_steel",
		"tfmg:molten_steel",
		"tfmg:flowing_molten_steel",
		"firmalife:metal/chromium",
		"firmalife:metal/flowing_chromium",
		"firmalife:metal/stainless_steel",
		"firmalife:metal/flowing_stainless_steel"
	].forEach(fluid => {
		event.add("c:hidden_from_recipe_viewers", fluid);
		event.add("forge:hidden_from_recipe_viewers", fluid);
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: material_recipe_normalization recipes event start");
	var castIronRecipeFilters = [
		{ type: "minecraft:crafting_shaped" },
		{ type: "minecraft:crafting_shapeless" },
		{ type: "minecraft:smelting" },
		{ type: "minecraft:blasting" },
		{ type: "create:compacting" },
		{ type: "create:mixing" },
		{ type: "create:mechanical_crafting" },
		{ type: "create:sequenced_assembly", not: { mod: "createstellaris" } }, // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем
		{ type: "create:cutting" },
		{ type: "createbigcannons:melting" }
	];

	var duplicateGearRecipeFilters = [
		{ type: "minecraft:crafting_shaped" },
		{ type: "minecraft:crafting_shapeless" },
		{ type: "create:compacting" },
		{ type: "create:cutting" },
		{ type: "create:deploying" },
		{ type: "create:item_application" },
		{ type: "create:mechanical_crafting" },
		{ type: "create:mixing" },
		{ type: "create:sequenced_assembly", not: { mod: "createstellaris" } }, // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем
		{ type: "createdieselgenerators:hammering" },
		{ type: "createvintageneoforged:hammering" },
		{ type: "tfc:anvil" },
		{ type: "tfc:welding" }
	];

	var firmalifeGtMetals = {
		chromium: {
			fluid: "gtceu:chromium",
			ingot: "gtceu:chromium_ingot",
			plate: "gtceu:chromium_plate",
			doublePlate: "gtceu:double_chromium_plate",
			rod: "gtceu:chromium_rod",
			doubleIngot: "firmalife:metal/double_ingot/chromium",
			temperature: 1907
		},
		stainless_steel: {
			fluid: "gtceu:stainless_steel",
			ingot: "gtceu:stainless_steel_ingot",
			plate: "gtceu:stainless_steel_plate",
			doublePlate: "gtceu:double_stainless_steel_plate",
			rod: "gtceu:stainless_steel_rod",
			doubleIngot: "firmalife:metal/double_ingot/stainless_steel",
			temperature: 1540
		}
	};

	Object.keys(firmalifeGtMetals).forEach(metal => {
		var data = firmalifeGtMetals[metal];

		event.remove({ id: `firmalife:casting/ceramic/ingot_mold_metal/${metal}` });
		event.custom({
			type: "tfc:casting",
			break_chance: 0.1,
			fluid: { amount: 144, fluid: data.fluid },
			mold: { item: "tfc:ceramic/ingot_mold" },
			result: { count: 1, id: data.ingot }
		}).id(`firmalife:casting/ceramic/ingot_mold_metal/${metal}`);
		event.remove({ id: `firmalife:casting/ceramic/fire_ingot_mold_metal/${metal}` });
		event.custom({
			type: "tfc:casting",
			break_chance: 0.01,
			fluid: { amount: 144, fluid: data.fluid },
			mold: { item: "tfc:ceramic/fire_ingot_mold" },
			result: { count: 1, id: data.ingot }
		}).id(`firmalife:casting/ceramic/fire_ingot_mold_metal/${metal}`);

		[
			{ path: "ingot", item: `firmalife:metal/ingot/${metal}`, amount: 144 },
			{ path: "sheet", item: `firmalife:metal/sheet/${metal}`, amount: 144 },
			{ path: "double_ingot", item: `firmalife:metal/double_ingot/${metal}`, amount: 288 },
			{ path: "double_sheet", item: `firmalife:metal/double_sheet/${metal}`, amount: 288 },
			{ path: "rod", item: `firmalife:metal/rod/${metal}`, amount: 72 }
		].forEach(form => {
			event.remove({ id: `firmalife:heating/metal/${form.path}/${metal}` });
			event.custom({
				type: "tfc:heating",
				ingredient: { item: form.item },
				result_fluid: { amount: form.amount, id: data.fluid },
				temperature: data.temperature
			}).id(`firmalife:heating/metal/${form.path}/${metal}`);
		});

		["", "_slab", "_stairs"].forEach(suffix => {
			event.remove({ id: `firmalife:heating/metal/block/${metal}${suffix}` });
		});

		event.remove({ id: `firmalife:welding/metal/double_ingot/${metal}` });
		event.custom({
			type: "tfc:welding",
			first_input: { item: data.ingot },
			second_input: { item: data.ingot },
			result: { count: 1, id: data.doubleIngot },
			tier: 3
		}).id(`firmalife:welding/metal/double_ingot/${metal}`);
		event.remove({ id: `firmalife:welding/metal/double_sheet/${metal}` });
		event.custom({
			type: "tfc:welding",
			first_input: { item: data.plate },
			second_input: { item: data.plate },
			result: { count: 1, id: data.doublePlate },
			tier: 3
		}).id(`firmalife:welding/metal/double_sheet/${metal}`);
		event.remove({ id: `firmalife:anvil/metal/sheet/${metal}` });
		event.custom({
			type: "tfc:anvil",
			ingredient: { item: data.doubleIngot },
			result: { count: 1, id: data.plate },
			rules: ["hit_last", "hit_second_last", "hit_third_last"],
			tier: 4
		}).id(`firmalife:anvil/metal/sheet/${metal}`);
		event.remove({ id: `firmalife:anvil/metal/rod/${metal}` });
		event.custom({
			type: "tfc:anvil",
			ingredient: { item: data.ingot },
			result: { count: 2, id: data.rod },
			rules: ["bend_last", "draw_second_last", "draw_third_last"],
			tier: 4
		}).id(`firmalife:anvil/metal/rod/${metal}`);
	});

	var duplicateMaterialItems = [
		["minecraft:copper_ingot", "tfc:metal/ingot/copper"],
		["minecraft:gold_ingot", "tfc:metal/ingot/gold"],
		["createbigcannons:bronze_block", "gtceu:bronze_block"],
		["createbigcannons:bronze_ingot", "gtceu:bronze_ingot"],
		["createbigcannons:bronze_scrap", "gtceu:bronze_nugget"],
		["createbigcannons:cast_iron_block", "tfc:metal/block/cast_iron"],
		["createbigcannons:cast_iron_ingot", "tfc:metal/ingot/cast_iron"],
		["tfmg:cast_iron_ingot", "tfc:metal/ingot/cast_iron"],
		["createbigcannons:steel_block", "gtceu:steel_block"],
		["createbigcannons:steel_ingot", "gtceu:steel_ingot"],
		["createbigcannons:steel_scrap", "gtceu:steel_nugget"],
		["gtceu:iron_screw", "gtceu:wrought_iron_screw"],
		["firmalife:metal/ingot/chromium", "gtceu:chromium_ingot"],
		["firmalife:metal/sheet/chromium", "gtceu:chromium_plate"],
		["firmalife:metal/double_sheet/chromium", "gtceu:double_chromium_plate"],
		["firmalife:metal/rod/chromium", "gtceu:chromium_rod"],
		["firmalife:metal/block/chromium", "gtceu:chromium_block"],
		["firmalife:metal/ingot/stainless_steel", "gtceu:stainless_steel_ingot"],
		["firmalife:metal/sheet/stainless_steel", "gtceu:stainless_steel_plate"],
		["firmalife:metal/double_sheet/stainless_steel", "gtceu:double_stainless_steel_plate"],
		["firmalife:metal/rod/stainless_steel", "gtceu:stainless_steel_rod"],
		["firmalife:metal/block/stainless_steel", "gtceu:stainless_steel_block"]
	];

	duplicateMaterialItems.forEach(entry => {
		var item = entry[0];
		var replacement = entry[1];
		// Pass the whole filter list at once: KubeJS wraps an array as an OrFilter,
		// so this is a single recipe scan instead of one per filter type.
		event.replaceInput(castIronRecipeFilters, item, replacement);
		event.replaceOutput(castIronRecipeFilters, item, replacement);
	});

	// [PORT-FIX] {input:...} без типа сканирует ВСЕ рецепты и падает на чтении GT-жидкостных входов
	// [PORT-FIX] (KubeJS читает amount=10000 как ингредиент) -> тип-фильтр, как у cast_iron_sheet ниже.
	event.replaceInput(castIronRecipeFilters, "gtceu:iron_screw", "gtceu:wrought_iron_screw");
	event.replaceOutput(castIronRecipeFilters, "gtceu:iron_screw", "gtceu:wrought_iron_screw");

	event.replaceInput(castIronRecipeFilters, "tfmg:cast_iron_sheet", "tfc:metal/sheet/cast_iron");
	event.replaceOutput(castIronRecipeFilters, "tfmg:cast_iron_sheet", "tfc:metal/sheet/cast_iron");

	["gears", "small_gears"].forEach(formTag => {
		var gearForm = GREGNAUTICS_UNIFY_FORMS.find(form => form.tag === formTag);
		GREGNAUTICS_UNIFY_MATERIALS.forEach(material => {
			var canonical = gregnauticsUnifyCanonicalItem(material, gearForm);
			if (canonical === undefined) {
				return;
			}

			if (formTag === "gears" && canonical.indexOf("gtceu:") === 0) {
				event.remove({ id: `tfc_items:heating/${gregnauticsUnifyTfcItemsName(material)}/gear` });
			}

			gregnauticsUnifyCandidates(material, gearForm).forEach(item => {
				if (item === canonical || !gregnauticsUnifyItemExists(item)) {
					return;
				}

				event.replaceInput(duplicateGearRecipeFilters, item, canonical);
				event.replaceOutput(duplicateGearRecipeFilters, item, canonical);
			});
		});
	});

	event.remove({ id: "createbigcannons:compacting/forge_cast_iron_nugget" });

	["chromium", "stainless_steel"].forEach(metal => {
		event.remove({ id: `firmalife:crafting/metal/block/${metal}` });
	});
});
