"use strict";

var GREGNAUTICS_JEI_UNIFY_MATERIALS = [
	{ id: "copper" },
	{ id: "bismuth" },
	{ id: "tin" },
	{ id: "zinc" },
	{ id: "silver" },
	{ id: "gold" },
	{ id: "nickel" },
	{ id: "lead" },
	{ id: "platinum" },
	{ id: "aluminium", aliases: ["aluminum"], tfcItems: "aluminum" },
	{ id: "chromium" },
	{ id: "wrought_iron", aliases: ["iron", "industrial_iron"] },
	{ id: "steel" },
	{ id: "black_steel" },
	{ id: "red_steel" },
	{ id: "blue_steel" },
	{ id: "stainless_steel" },
	{ id: "bronze" },
	{ id: "bismuth_bronze" },
	{ id: "black_bronze" },
	{ id: "brass" },
	{ id: "electrum" },
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

var GREGNAUTICS_JEI_TFC_FORMS = [
	{ path: "ingot", gt: id => `gtceu:${id}_ingot` },
	{ path: "block", gt: id => `gtceu:${id}_block` },
	{ path: "sheet", gt: id => `gtceu:${id}_plate` },
	{ path: "double_sheet", gt: id => `gtceu:double_${id}_plate` },
	{ path: "rod", gt: id => `gtceu:${id}_rod` }
];

var GREGNAUTICS_JEI_TFC_ITEMS_FORMS = [
	{ suffix: "heavy_sheet", gt: id => `gtceu:double_${id}_plate` },
	{ suffix: "screw", gt: id => `gtceu:${id}_screw` },
	{ suffix: "ring", gt: id => `gtceu:${id}_ring` },
	{ suffix: "gear", gt: id => `gtceu:${id}_gear` },
	{ suffix: "foil", gt: id => `gtceu:${id}_foil` }
];

var GREGNAUTICS_JEI_EXTERNAL_FORMS = [
	{ gt: id => `gtceu:${id}_ingot`, items: gregnauticsJeiExternalIngots },
	{ gt: id => `gtceu:${id}_nugget`, items: gregnauticsJeiExternalNuggets },
	{ gt: id => `gtceu:${id}_block`, items: gregnauticsJeiExternalStorageBlocks },
	{ gt: id => `gtceu:${id}_plate`, items: gregnauticsJeiExternalPlates },
	{ gt: id => `gtceu:double_${id}_ingot`, items: gregnauticsJeiExternalDoubleIngots },
	{ gt: id => `gtceu:double_${id}_plate`, items: gregnauticsJeiExternalDoublePlates },
	{ gt: id => `gtceu:${id}_rod`, items: gregnauticsJeiExternalRods },
	{ gt: id => `tfc:metal/bars/${id}`, items: gregnauticsJeiExternalBars }
];

function gregnauticsJeiNames(material) {
	return [material.id].concat(material.aliases || []);
}

function gregnauticsJeiTfcItemsName(material) {
	return material.tfcItems || material.id;
}

function gregnauticsJeiHideItem(event, item) {
	if (!Item.exists(item)) {
		return false;
	}
	if (typeof Ingredient !== "undefined" && Ingredient.of !== undefined) {
		event.hide(Ingredient.of(item));
	} else {
		event.hide(item);
	}
	return true;
}

function gregnauticsJeiExternalIngots(name) {
	var items = [
		`minecraft:${name}_ingot`,
		`create:${name}_ingot`,
		`createaddition:${name}_ingot`,
		`tfmg:${name}_ingot`,
		`createdeco:${name}_ingot`
	];
	if (name === "steel") items.push("createbigcannons:steel_ingot");
	if (name === "chromium") items.push("firmalife:metal/ingot/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/ingot/stainless_steel");
	if (name === "platinum") items.push("createpropulsion:platinum_ingot");
	return items;
}

function gregnauticsJeiExternalNuggets(name) {
	var items = [
		`minecraft:${name}_nugget`,
		`create:${name}_nugget`,
		`createaddition:${name}_nugget`,
		`createdeco:${name}_nugget`
	];
	if (name === "steel") items.push("createbigcannons:steel_nugget");
	if (name === "platinum") items.push("createpropulsion:platinum_nugget");
	return items;
}

function gregnauticsJeiExternalStorageBlocks(name) {
	var items = [
		`minecraft:${name}_block`,
		`create:${name}_block`,
		`createaddition:${name}_block`,
		`tfmg:${name}_block`,
		`createdeco:${name}_block`
	];
	if (name === "steel") items.push("createbigcannons:steel_block");
	if (name === "chromium") items.push("firmalife:metal/block/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/block/stainless_steel");
	if (name === "platinum") items.push("createpropulsion:platinum_block");
	return items;
}

function gregnauticsJeiExternalPlates(name) {
	var items = [
		`create:${name}_sheet`,
		`createaddition:${name}_sheet`,
		`tfmg:${name}_sheet`,
		`createdeco:${name}_sheet`
	];
	if (name === "gold") items.push("create:golden_sheet");
	if (name === "iron") items.push("create:iron_sheet");
	if (name === "steel") items.push("tfmg:heavy_plate");
	if (name === "chromium") items.push("firmalife:metal/sheet/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/sheet/stainless_steel");
	if (name === "platinum") items.push("createpropulsion:platinum_sheet");
	return items;
}

function gregnauticsJeiExternalDoubleIngots(name) {
	var items = [];
	if (name === "chromium") items.push("firmalife:metal/double_ingot/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/double_ingot/stainless_steel");
	return items;
}

function gregnauticsJeiExternalDoublePlates(name) {
	var items = [];
	if (name === "chromium") items.push("firmalife:metal/double_sheet/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/double_sheet/stainless_steel");
	return items;
}

function gregnauticsJeiExternalRods(name) {
	var items = [
		`createaddition:${name}_rod`
	];
	if (name === "chromium") items.push("firmalife:metal/rod/chromium");
	if (name === "stainless_steel") items.push("firmalife:metal/rod/stainless_steel");
	return items;
}

function gregnauticsJeiExternalBars(name) {
	return [
		`minecraft:${name}_bars`,
		`create:${name}_bars`,
		`createdeco:${name}_bars`,
		`createdeco:${name}_bars_overlay`
	];
}

// KubeJEI 1.0.0 calls JEI addIngredientsAtRuntime with an empty added item list
// after this event when only hide() is used, which breaks JEI registration with
// "ingredients must not be empty". Duplicate material hiding is handled by
// c:hidden_from_recipe_viewers tags in the server scripts instead.
//
// [FIX 2026-07-21] Репорт: краш клиента после обновления. Мод kubejei НЕ доезжал
// до CF-игроков (его не было ни в манифесте, ни в overrides/mods) -> KubeJEIEvents
// не определён -> ReferenceError -> экран ошибок KubeJS у ВСЕХ CF-игроков, а клик
// по записи роняет игру (баг KubeJS: кривой vscode://-URI на Windows).
// kubejei теперь едет в overrides/mods, но guard оставляем навсегда: клиентский
// скрипт не имеет права падать из-за отсутствующего необязательного мода.
if (typeof KubeJEIEvents !== 'undefined') {
	KubeJEIEvents.subtypes(event => {
		const stone = Ingredient.of("minecraft:stone");
		event.hide(stone);
		event.add(stone);
	});
} else {
	console.warn('[Gregnautics] мод kubejei не установлен — пропускаю KubeJEIEvents.subtypes (не критично)');
}
