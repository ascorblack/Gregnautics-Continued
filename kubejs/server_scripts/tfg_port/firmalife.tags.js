// priority: 0
"use strict";

// [PORT] Портировано из firmalife/tags.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerFirmaLifeItemTags / registerFirmaLifeBlockTags / registerFirmaLifeFluidTags ->
// [PORT] прямые обработчики ServerEvents.tags (KubeJS 7: изолированные скоупы)

//#region Item tags (registerFirmaLifeItemTags)
ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port firmalife item tags start')

	// Make our own "dried fruit" tag so we can display something in EMI - used for yeast starter
	// [PORT] global.FOOD_FRUIT (индекс еды из 1.20) в сборке отсутствует —
	// [PORT] используем родной тег TFC 1.21 tfc:foods/fruits вместо перечисления предметов
	// global.FOOD_FRUIT
	//     .map(fruit => fruit.id)
	//     .filter(fruit => fruit !== 'betterend:shadow_berry_cooked' && fruit !== 'minecraft:popped_chorus_fruit')
	//     .forEach(fruit => event.add('tfg:dried_fruit', fruit))
	event.add('tfg:dried_fruit', '#tfc:foods/fruits') // [PORT] замена перечисления из global.FOOD_FRUIT
	event.remove('tfg:dried_fruit', 'minecraft:popped_chorus_fruit') // [PORT] исключение из оригинального фильтра

	event.add('tfc:fruit_tree_leaves', 'firmalife:plant/cocoa_leaves')
	event.add('tfc:fruit_tree_leaves', 'firmalife:plant/fig_leaves')
	event.add('minecraft:leaves', 'firmalife:plant/cocoa_leaves')
	event.add('minecraft:leaves', 'firmalife:plant/fig_leaves')
	event.add('minecraft:saplings', 'firmalife:plant/cocoa_sapling')
	event.add('minecraft:saplings', 'firmalife:plant/fig_sapling')

	event.add('tfc:clay_recycle_5', '#firmalife:clay_recycle_5')
	event.add('tfg:oven_tops', 'firmalife:cured_oven_top')
	event.add('tfg:oven_tops', 'firmalife:cured_rustic_oven_top')
	event.add('tfg:oven_tops', 'firmalife:cured_tile_oven_top')
	event.add('tfg:oven_tops', 'firmalife:cured_stone_oven_top')

})
//#endregion

//#region Block tags (registerFirmaLifeBlockTags)
ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port firmalife block tags start')

	//greenhouse wall fixes
	event.remove('firmalife:always_valid_greenhouse_wall', '#minecraft:doors')
	event.remove('firmalife:always_valid_greenhouse_wall', '#minecraft:trapdoors')

	const greenhouse_tiers = [
		'treated_wood',
		'weathered_treated_wood',
		'copper',
		'exposed_copper',
		'weathered_copper',
		'oxidized_copper',
		'iron',
		'rusted_iron',
		'stainless_steel'
	]

	greenhouse_tiers.forEach(tier => {
		event.add('firmalife:always_valid_greenhouse_wall', `firmalife:${  tier  }_greenhouse_door`)
		event.add('firmalife:always_valid_greenhouse_wall', `firmalife:${  tier  }_greenhouse_trapdoor`)
	})

	//Allows any block with the word "brick" in its id to be used as oven insulation.
	//Add blacklisted words to the const with | between.
	const brick_blacklist = ('drying|additionalplacements');
	event.add('firmalife:oven_insulation', `/^(?=.*brick)(?!.*(${brick_blacklist})).*/`);

	event.add('firmalife:oven_insulation', 'firmalife:stovetop_pot');
	event.add('firmalife:oven_insulation', 'firmalife:vat');

	// tfg and a few missed(?) tfc flowers for bee restoration
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/azalea') — блоки tfg: ещё не зарегистрированы
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/buttercup')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/cornflower')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/edelweiss')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/eyeblossom')
	event.add('firmalife:bee_restoration_plants', 'tfc:plant/rose')
	event.add('firmalife:bee_restoration_plants', 'tfc:plant/hibiscus')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/mountain_hullwort')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/palash')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/penwortel')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/qantu')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/ramirezella')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/ramunda')
	// [PORT-Ф4] event.add('firmalife:bee_restoration_plants', 'tfg:plant/yellow_saxifrage')
})
//#endregion

//#region Fluid tags (registerFirmaLifeFluidTags)
ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port firmalife fluid tags start')

	// Добавляем тег для скрытия в EMI
	event.add('c:hidden_from_recipe_viewers', 'firmalife:metal/chromium')
	event.add('c:hidden_from_recipe_viewers', 'firmalife:metal/stainless_steel')
	event.add('c:hidden_from_recipe_viewers', 'firmalife:chocolate')
	// [PORT] event.add('c:hidden_from_recipe_viewers', 'firmalife:fruity_fluid') — жидкости firmalife:fruity_fluid нет в Firmalife 3.0.11

	// Im going to leave these, but I dont think this tag does anything(?).
	event.add('firmalife:mixable', 'tfc:spring_water')
	// [PORT] tfcchannelcasting отсутствует в сборке 1.21.1:
	// event.add('firmalife:mixable', 'tfcchannelcasting:white_chocolate')
	// event.add('firmalife:mixable', 'tfcchannelcasting:milk_chocolate')
	// event.add('firmalife:mixable', 'tfcchannelcasting:dark_chocolate')
	event.add('firmalife:mixable', 'afc:maple_syrup')
	event.add('firmalife:mixable', 'afc:birch_syrup')

	event.add('firmalife:oils', 'tfc:tallow')
	event.add('firmalife:oils', 'gtceu:seed_oil')
	event.add('firmalife:oils', 'gtceu:fish_oil')
	// [PORT-Ф4] event.add('firmalife:oils', 'tfg:triglyceride_oil') — жидкости tfg: ещё не зарегистрированы
	// [PORT-Ф4] event.add('firmalife:oils', 'tfg:peanut_oil')
})
//#endregion
