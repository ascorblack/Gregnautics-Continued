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
	try {
		let stone_ores = Ingredient.of('#c:ores_in_ground/stone').itemIds.toArray().map(String);
		stone_ores.forEach(item => {
			event.removeAllTagsFrom(item)
		})

		let iron_ores = Ingredient.of('#c:ores/iron').itemIds.toArray().map(String);
		iron_ores.forEach(item => {
			event.removeAllTagsFrom(item)
		})
	} catch (e) {
		console.warn(`[Gregnautics][PORT-CHECK] tfg.server.ores.tags.materials: не удалось резолвить теги руд в block-tags событии: ${e}`)
	}
})
