// priority: 0
"use strict";

// [PORT] исходник: createdeco/tags.js (registerCreateDecoItemTags / registerCreateDecoBlockTags) — регистрируем напрямую через ServerEvents.tags
// [PORT] createdeco 1.21 удалил iron_bars (используются ванильные minecraft:iron_bars) — обычные bars для iron пропускаем, overlay-версии существуют

const metalBars = /** @type {const} */ (["andesite", "brass", "iron", "copper", "industrial_iron", "zinc"]);

/** @param {TagEvent.Item} event  */
ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port createdeco item tags start')

	event.remove("createdeco:internal/blocks/iron_blocks", "minecraft:iron_block");
	event.remove("createdeco:internal/blocks/industrial_iron_blocks", "create:industrial_iron_block");

	metalBars.forEach((metalBars) => {
		if (metalBars !== 'iron') { // [PORT] createdeco:iron_bars не существует в 1.21 (ванильные iron_bars)
			event.add("tfg:metal_bars", `createdeco:${metalBars}_bars`);
		}
		event.add("tfg:metal_bars", `createdeco:${metalBars}_bars_overlay`);
	});

	event.add("createdeco:metal_trapdoors", "createdeco:andesite_trapdoor");
	event.add("createdeco:metal_trapdoors", "createdeco:brass_trapdoor");
	// [PORT] createdeco:copper_trapdoor удалён в createdeco 1.21 (ванильный minecraft:copper_trapdoor)
	// event.add("createdeco:metal_trapdoors", "createdeco:copper_trapdoor");
	event.add("createdeco:metal_trapdoors", "createdeco:industrial_iron_trapdoor");
	event.add("createdeco:metal_trapdoors", "createdeco:zinc_trapdoor");

	// [PORT-CHECK] внутренние теги createdeco:internal/* — проверить в игре, что createdeco 1.21 всё ещё использует эту структуру тегов
	event.add("createdeco:internal/plates/iron_plates", "#c:plates/wrought_iron"); // [PORT] forge -> c
	event.add("createdeco:internal/plates/copper_plates", "#c:plates/copper"); // [PORT] forge -> c
	event.add("createdeco:internal/plates/brass_plates", "#c:plates/brass"); // [PORT] forge -> c
	event.add("createdeco:internal/plates/andesite_plates", "#c:plates/tin_alloy"); // [PORT] forge -> c
	event.add("createdeco:internal/plates/industrial_iron_plates", "#c:plates/steel"); // [PORT] forge:sheets -> c:plates (GTM8)
	event.add("createdeco:internal/plates/zinc_plates", "#c:plates/zinc"); // [PORT] forge:sheets -> c:plates (GTM8)

	event.add("createdeco:internal/nuggets/iron_nuggets", "#c:nuggets/wrought_iron"); // [PORT] forge -> c
	event.add("createdeco:internal/nuggets/copper_nuggets", "#c:nuggets/copper"); // [PORT] forge -> c
	event.add("createdeco:internal/nuggets/zinc_nuggets", "#c:nuggets/zinc"); // [PORT] forge -> c
	event.add("createdeco:internal/nuggets/industrial_iron_nuggets", "#c:nuggets/steel"); // [PORT] forge -> c
	event.add("createdeco:internal/nuggets/brass_nuggets", "#c:nuggets/brass"); // [PORT] forge -> c
	event.add("createdeco:internal/nuggets/copper_nuggets", "#c:nuggets/copper"); // [PORT] forge -> c

	event.add("createdeco:internal/ingots/iron_ingots", "#c:ingots/wrought_iron"); // [PORT] forge -> c
	event.add("createdeco:internal/ingots/copper_ingots", "#c:ingots/copper"); // [PORT] forge -> c
	event.add("createdeco:internal/ingots/brass_ingots", "#c:ingots/brass"); // [PORT] forge -> c
	event.add("createdeco:internal/ingots/zinc_ingots", "#c:ingots/zinc"); // [PORT] forge -> c
	event.add("createdeco:internal/ingots/andesite_ingots", "#c:ingots/tin_alloy"); // [PORT] forge -> c
	event.add("createdeco:internal/ingots/industrial_iron_ingots", `#c:ingots/steel`); // [PORT] forge -> c

	event.add("createdeco:internal/blocks/iron_blocks", "#c:storage_blocks/wrought_iron"); // [PORT] forge -> c
	event.add("createdeco:internal/blocks/copper", "#c:storage_blocks/copper"); // [PORT] forge -> c
	event.add("createdeco:internal/blocks/brass_blocks", "#c:storage_blocks/brass"); // [PORT] forge -> c
	event.add("createdeco:internal/blocks/industrial_iron_blocks", "#c:storage_blocks/steel"); // [PORT] forge -> c
	event.add("createdeco:internal/blocks/zinc_blocks", "#c:storage_blocks/zinc"); // [PORT] forge -> c
	event.add("createdeco:internal/blocks/andesite_blocks", "#c:storage_blocks/tin_alloy"); // [PORT] forge -> c

	global.MINECRAFT_DYE_NAMES.forEach((color) => {
		event.add("createdeco:shipping_containers", `createdeco:${color}_shipping_container`);
	});

	global.CREATE_DECO_GLASS_PANES.forEach(pane => {
		event.add("c:glass_panes", pane) // [PORT] forge -> c
	})
})

/** @param {TagEvent.Block} event */
ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port createdeco block tags start')

	metalBars.forEach((metalBars) => {
		// The bars are missing mineable tags for some reason
		if (metalBars !== 'iron') { // [PORT] createdeco:iron_bars не существует в 1.21 (ванильные iron_bars)
			event.add("minecraft:mineable/pickaxe", `createdeco:${metalBars}_bars`);
		}
		event.add("minecraft:mineable/pickaxe", `createdeco:${metalBars}_bars_overlay`);
	});

	global.MINECRAFT_DYE_NAMES.forEach((color) => {
		event.add("createdeco:chest_mounted_storage", `createdeco:${color}_shipping_container`);
	});

	const lampColors = ['blue', 'green', 'red', 'yellow'];
	const lampTypes = ['zinc', 'brass', 'iron', 'industrial_iron', 'copper', 'andesite'];

	lampTypes.forEach(type => {
		lampColors.forEach(color => {
			event.add('gtceu:mineable/pickaxe_or_wrench', `createdeco:${color}_${type}_lamp`);
		});
	});
})
