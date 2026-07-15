// priority: 5
"use strict";

// Добавляем TFC и другие инструменты в общие теги c:tools
// Это нужно для рецептов GTCEU, которые мы переопределяем ниже
ServerEvents.tags("item", event => {
	// TFC saws в c:tools/saw
	event.add("c:tools/saw", [
		"tfc:metal/saw/bismuth_bronze",
		"tfc:metal/saw/black_bronze",
		"tfc:metal/saw/bronze",
		"tfc:metal/saw/copper",
		"tfc:metal/saw/wrought_iron",
		"tfc:metal/saw/steel",
		"tfc:metal/saw/black_steel",
		"tfc:metal/saw/blue_steel",
		"tfc:metal/saw/red_steel"
	]);
	
	// TFC, FD, HTM, GTCEU knives в c:tools/knife
	event.add("c:tools/knife", [
		"tfc:metal/knife/bismuth_bronze",
		"tfc:metal/knife/black_bronze",
		"tfc:metal/knife/bronze",
		"tfc:metal/knife/copper",
		"tfc:metal/knife/wrought_iron",
		"tfc:metal/knife/steel",
		"tfc:metal/knife/black_steel",
		"tfc:metal/knife/blue_steel",
		"tfc:metal/knife/red_steel",
		"tfc:stone/knife/igneous_extrusive",
		"tfc:stone/knife/igneous_intrusive",
		"tfc:stone/knife/metamorphic",
		"tfc:stone/knife/sedimentary",
		"farmersdelight:flint_knife",
		"farmersdelight:iron_knife",
		"farmersdelight:diamond_knife",
		"farmersdelight:golden_knife",
		"farmersdelight:netherite_knife",
		"htm:flint_knife",
		"gtceu:flint_knife"
	]);
});

// Переопределяем рецепты GTCEU wooden forms для использования общих тегов
// и правильной работы с durability через TFC систему
ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: gtceu_tool_unification recipes event start");
	// Empty wooden form (plank_to_wooden_shape)
	// Оригинальный GTCEU паттерн: "   "," X ","s  " (1 доска + пила)
	// Не конфликтует с TFC рецептом "блок досок + пила = 4 доски"
	event.remove({ id: "gtceu:plank_to_wooden_shape" });
	event.custom({
		type: "tfc:advanced_shaped_crafting",
		pattern: [
			"   ",
			" X ",
			"S  "
		],
		key: {
			S: { tag: "c:tools/saw" },
			X: { tag: "minecraft:planks" }
		},
		result: {
			count: 1,
			id: "gtceu:empty_wooden_form"
		},
		remainder: { modifiers: [{ type: "tfc:damage_crafting_remainder" }] }
	}).id("gtceu:plank_to_wooden_shape");
	
	// Brick wooden form (wooden_shape_brick)
	// Оригинальный рецепт: "k ", " X" где X = empty_wooden_form, k = нож
	event.remove({ id: "gtceu:wooden_shape_brick" });
	event.custom({
		type: "tfc:advanced_shaped_crafting",
		pattern: [
			"K ",
			" X"
		],
		key: {
			K: { tag: "c:tools/knife" },
			X: { item: "gtceu:empty_wooden_form" }
		},
		result: {
			count: 1,
			id: "gtceu:brick_wooden_form"
		},
		remainder: { modifiers: [{ type: "tfc:damage_crafting_remainder" }] }
	}).id("gtceu:wooden_shape_brick");
});
