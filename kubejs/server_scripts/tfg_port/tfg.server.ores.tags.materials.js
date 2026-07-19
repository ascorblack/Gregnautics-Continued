// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/ores_and_materials/tags.materials.js
//        (registerTFGMaterialItemTags -> ServerEvents.tags('item'),
//         registerTFGMaterialBlockTags -> ServerEvents.tags('block')).
// [PORT] forge:* -> c:*.
// [PORT] beneath отсутствует — строки с cursecoal вырезаны.
// [PORT-Ф2] gtceu:purified_ferhodsite_ore — TFG-материал платиновой линии (не зарегистрирован).
// [PORT-Ф2] c:dusts/alumina — материал TFG (Фаза 2); ссылка на тег оставлена (пустой тег в add безвреден).

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.tags.materials item tags start')

	// Platline
	event.add('tfg:platinum_ore_group', 'gtceu:purified_pentlandite_ore')
	event.add('tfg:platinum_ore_group', 'gtceu:purified_irarsite_ore') // [PORT-Ф2] irarsite — TFG-материал; предмет появится после Ф2
	event.add('tfg:platinum_ore_group', 'gtceu:purified_chalcopyrite_ore')
	event.add('tfg:platinum_ore_group', 'gtceu:purified_tetrahedrite_ore')
	event.add('tfg:platinum_ore_group', 'gtceu:purified_ruarsite_ore') // [PORT-Ф2] ruarsite — TFG-материал; предмет появится после Ф2
	event.add('tfg:platinum_ore_group', 'gtceu:purified_bornite_ore')
	event.add('tfg:platinum_ore_group', 'gtceu:purified_cooperite_ore')
	event.add('tfg:platinum_ore_group', 'gtceu:purified_chalcocite_ore')
	// [PORT-Ф2] event.add('tfg:platinum_ore_group', 'gtceu:purified_ferhodsite_ore')

	// Crafting components
	event.add('tfg:aluminium_oxide', '#c:dusts/alumina') // [PORT-Ф2] alumina — TFG-материал
	event.add('tfg:aluminium_oxide', '#c:dusts/bauxite')
	event.add('tfg:aluminium_oxide', '#c:dusts/sapphire')
	event.add('tfg:aluminium_oxide', '#c:dusts/green_sapphire')

	// [PORT] beneath отсутствует:
	// event.remove('forge:raw_materials/cursecoal', 'beneath:cursecoal')
	// event.add('forge:raw_materials/anthracite', 'beneath:cursecoal')
	event.add('c:raw_materials/lignite', 'tfc:ore/lignite')
	event.add('c:raw_materials/coal', 'tfc:ore/bituminous_coal')
})

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.tags.materials block tags start')

	// Hide cast iron and vanilla stone ores from ALI
	event.removeAllTagsFrom('minecraft:raw_iron_block')

	// [PORT-CHECK] Ingredient.of('#tag') внутри tags-события резолвит item-теги по состоянию
	// до применения наших правок (как и в 1.20); обёрнуто в try/catch на случай изменения поведения KubeJS 7.
	// [PORT-FIX 2026-07-18] КРИТИЧНО: только gtceu:!
	// Замысел оригинала (1.20) — спрятать ГТ-руды ванильного камня и ГТ-железо
	// (в TFG железо идёт через руды TFC). Но в 1.21 наш же
	// gregnautics_gtceu_tfc_mineral_compat.js вешает 'c:ores/iron' и ores_in_ground
	// НА РУДЫ TFC — и removeAllTagsFrom БЕЗ фильтра снимал с БЛОКОВ tfc:ore/* ВСЕ
	// теги, включая minecraft:mineable/pickaxe. Итог с CF-репортов: «TFC ores are
	// broken and no pickaxe can mine them» — блоки с requiresCorrectToolForDrops
	// без mineable-тега не добываются НИЧЕМ. Проверено на сервере: у
	// tfc:ore/normal_native_copper/quartzite было 0 (ноль) тегов.
	try {
		let stone_ores = Ingredient.of('#c:ores_in_ground/stone').itemIds.toArray().map(String)
			.filter(id => id.startsWith('gtceu:'));
		stone_ores.forEach(item => {
			event.removeAllTagsFrom(item)
		})

		// [PORT-FIX 2026-07-18] Железный nuke по '#c:ores/iron' УДАЛЁН СОВСЕМ.
		// В 1.20 он прятал GT-железо (в TFG железо шло только через руды TFC и
		// GT-руды железа не генерились). В нашем 1.21-порте железные вены
		// ПЕРЕПИСАНЫ НА gtceu-блоки в TFC-камнях (gabbro_goethite_ore,
		// diorite_pyrite_ore, *_magnetite_ore...) — снятие с них всех тегов
		// делало ГЕНЕРЯЩИЕСЯ рудные вены недобываемыми. Ванильно-каменные
		// GT-варианты и так прячутся stone_ores-блоком выше.
	} catch (e) {
		console.warn(`[Gregnautics][PORT-CHECK] tfg.server.ores.tags.materials: не удалось резолвить теги руд в block-tags событии: ${e}`)
	}
})
