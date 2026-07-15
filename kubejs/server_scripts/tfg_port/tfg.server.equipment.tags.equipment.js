// priority: 0
"use strict";

// [PORT] Порт tfg/equipment/tags.equipment.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] Вырезаны отсутствующие моды: tfcambiental, tfc_textile, sns, ad_astra ([PORT-Ф10] stellaris не авто-ремапим).
// [PORT-FIX] forge:tools/* -> c:tools/* (единственное число по CustomTags GTCEu 8.0; chainsaws/buzzsaws —
//   множественное, как в остальных портированных файлах); forge:tools/spades -> c:tools/spade.

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.equipment tags.equipment start')

	event.add('minecraft:trimmable_armor', 'create:copper_diving_helmet')
	event.add('minecraft:trimmable_armor', 'create:copper_diving_boots')
	event.add('minecraft:trimmable_armor', 'create:netherite_diving_helmet')
	event.add('minecraft:trimmable_armor', 'create:netherite_diving_boots')
	// [PORT] tfcambiental отсутствует в сборке 1.21.1 — wool/silk/burlap/insulated_leather вырезаны
	event.add('minecraft:trimmable_armor', '#firmalife:beekeeper_armor')

	event.add('minecraft:freeze_immune_wearables', 'tfc:metal/helmet/red_steel')
	event.add('minecraft:freeze_immune_wearables', 'tfc:metal/chestplate/red_steel')
	event.add('minecraft:freeze_immune_wearables', 'tfc:metal/greaves/red_steel')
	event.add('minecraft:freeze_immune_wearables', 'tfc:metal/boots/red_steel')
	// [PORT] tfc_textile отсутствует — caribou/polar_bear/direwolf/insulated_leather вырезаны
	// [PORT-Ф10] ad_astra отсутствует — скафандры вырезаны
	// [PORT] sns отсутствует — hiking_boots вырезаны

	global.GTCEU_ARMORS.forEach((item) => {
		event.add("minecraft:trimmable_armor", item);
	});

	// [PORT-Ф10] ad_astra отсутствует — теги ppe_armor/space_resistant_armor со скафандрами вырезаны
	// event.add('gtceu:ppe_armor', '#ad_astra:space_suit_items')
	// event.add('minecraft:trimmable_armor', '#ad_astra:space_suit_items')

	// event.add('ad_astra:space_resistant_armor', 'gtceu:quarktech_helmet')
	// event.add('ad_astra:space_resistant_armor', 'gtceu:quarktech_chestplate')
	// event.add('ad_astra:space_resistant_armor', 'gtceu:advanced_quarktech_chestplate')
	// event.add('ad_astra:space_resistant_armor', 'gtceu:quarktech_leggings')
	// event.add('ad_astra:space_resistant_armor', 'gtceu:quarktech_boots')

	event.add('tfc:deals_crushing_damage', '#c:tools/mining_hammer') // [PORT] forge:tools/mining_hammers -> c:tools/mining_hammer
	event.add('tfc:deals_crushing_damage', '#minecraft:shovels')
	event.add('tfc:deals_crushing_damage', '#c:tools/spade') // [PORT] forge:tools/spades -> c:tools/spade
	event.add('tfc:deals_crushing_damage', '#c:tools/wrench') // [PORT] forge:tools/wrenches -> c:tools/wrench
	event.add('tfc:deals_slashing_damage', '#c:tools/chainsaws') // [PORT] как в tfc.tags.js (мн. число для электроинструментов)
	event.add('tfc:deals_slashing_damage', '#c:tools/saw') // [PORT] forge:tools/saws -> c:tools/saw
	event.add('tfc:deals_slashing_damage', '#c:tools/butchery_knife') // [PORT] forge:tools/butchery_knives -> c:tools/butchery_knife
	event.add('tfc:deals_slashing_damage', '#c:tools/file') // [PORT] forge:tools/files -> c:tools/file
	event.add('tfc:deals_piercing_damage', '#minecraft:pickaxes')
	event.add('tfc:deals_piercing_damage', '#c:tools/drill') // [PORT] forge:tools/drills -> c:tools/drill (как в tfc.tags.js)
	event.add('tfc:deals_piercing_damage', '#c:tools/screwdriver') // [PORT] forge:tools/screwdrivers -> c:tools/screwdriver
	event.add('tfc:deals_piercing_damage', '#minecraft:hoes')
	event.add('tfc:deals_piercing_damage', '#c:tools/crowbar') // [PORT] forge:tools/crowbars -> c:tools/crowbar
	event.add('tfc:deals_piercing_damage', '#c:tools/wire_cutter') // [PORT] forge:tools/wire_cutters -> c:tools/wire_cutter
})
