// priority: 0
"use strict";

// [PORT] KubeJS 7: изолированные скоупы — диспетчер main_server_script удалён,
// [PORT] функции registerAE2ItemTags / registerAE2BlockTags заменены на прямую регистрацию ServerEvents.tags
// [PORT] tags.facades.js (registerAe2FacadeWhitelistTags) объединён в этот файл (block-хендлер ниже)
// [PORT] Теги forge:* -> c:* (NeoForge)

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port ae2 item tags start')

	event.add('c:hidden_from_recipe_viewers', 'ae2:creative_item_cell')
	event.add('c:hidden_from_recipe_viewers', 'ae2:creative_fluid_cell')
	event.add('c:hidden_from_recipe_viewers', "ae2:creative_energy_cell")

	event.remove('c:storage_blocks', 'ae2:quartz_block') // [PORT] forge: -> c:
	event.remove('c:storage_blocks/certus_quartz', 'ae2:quartz_block') // [PORT] forge: -> c:

	event.removeAll('ae2:p2p_attunements/fe_p2p_tunnel')

	event.add('tfg:stone_dusts', 'ae2:sky_dust')
	event.add('tfg:stone_types/suevite', 'ae2:sky_stone_block')
	event.add('tfg:stone_types/suevite', 'ae2:sky_stone_stairs')
	event.add('tfg:stone_types/suevite', 'ae2:sky_stone_wall')

	event.add('tfg:reactant_fluix_ruby', 'gtceu:ruby_gem')
	// event.add('tfg:reactant_fluix_ruby', 'gtceu:armalcolite_gem') // [PORT-Ф2] armalcolite — кастомный GT-материал TFG, ещё не зарегистрирован

	event.add('tfg:reactant_fluix_ruby_exquisite', 'gtceu:exquisite_ruby_gem')
	// event.add('tfg:reactant_fluix_ruby_exquisite', 'gtceu:exquisite_armalcolite_gem') // [PORT-Ф2] armalcolite — кастомный GT-материал TFG, ещё не зарегистрирован

	event.add('tfg:reactant_fluix_quartz', 'minecraft:quartz')
	event.add('tfg:reactant_fluix_quartz', 'gtceu:quartzite_gem')

	event.add('tfg:reactant_fluix_quartz_exquisite', 'gtceu:exquisite_nether_quartz_gem')
	event.add('tfg:reactant_fluix_quartz_exquisite', 'gtceu:exquisite_quartzite_gem')

	// [PORT] Фаза 3: ручная привязка предметов AE2 к материальным тегам GT
	// (тег-префиксы GT были setIgnored (одноаргументный) на 1.21, юнификация не создаёт эти теги сама)
	event.add("c:gems/certus_quartz", "ae2:certus_quartz_crystal")
	event.add("c:dusts/certus_quartz", "ae2:certus_quartz_dust")
	event.add("c:dusts/ender_pearl", "ae2:ender_dust")
	// event.add("c:gems/fluix", "ae2:fluix_crystal") // [PORT-Ф2] материал tfg:fluix ещё не зарегистрирован
	// event.add("c:dusts/fluix", "ae2:fluix_dust") // [PORT-Ф2] материал tfg:fluix ещё не зарегистрирован

	// [PORT-FIX] Регрессия унификации AE2: GTM HEAD снова генерирует gtceu:certus_quartz_dust/_gem/_block
	// [PORT-FIX] и gtceu:ender_pearl_dust, дублируя предметы AE2. Прячем GT-варианты из просмотрщиков
	// [PORT-FIX] рецептов (EMI/JEI) и привязываем оба варианта к общим тегам c: — паттерн из tfc.tags.js.
	event.add("c:hidden_from_recipe_viewers", "gtceu:certus_quartz_gem")
	event.add("c:hidden_from_recipe_viewers", "gtceu:certus_quartz_dust")
	event.add("c:hidden_from_recipe_viewers", "gtceu:certus_quartz_block")
	event.add("c:hidden_from_recipe_viewers", "gtceu:ender_pearl_dust")

	// [PORT-FIX] Тег-биндинги: рецепты по тегу принимают и AE2-, и GT-вариант.
	event.add("c:gems/certus_quartz", "gtceu:certus_quartz_gem")
	event.add("c:dusts/certus_quartz", "gtceu:certus_quartz_dust")
	event.add("c:storage_blocks/certus_quartz", "gtceu:certus_quartz_block")
	event.add("c:dusts/ender_pearl", "gtceu:ender_pearl_dust")
})

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port ae2 block tags start')

	// tags.facades.js: createdeco catwalks
	global.CREATE_DECO_CATWALK_TYPES.forEach(facade_material => {
		event.add('ae2:whitelisted/facades', `createdeco:${facade_material}_catwalk`)
	})
})
