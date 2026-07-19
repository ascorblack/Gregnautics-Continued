// priority: 0
"use strict";
/*
 * Some Crops Are Originally from [TerraFirmaCraft] (https://github.com/TerraFirmaCraft/TerraFirmaCraft)
 * Licensed under the EUPL, Version 1.2.
 * You may obtain a copy of the Licence at:
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Some Crops Are Originally from [Beneath] (https://github.com/eerussianguy/Beneath)
 * Licensed under the MIT License.
 * Copyright (c) 2022 eerussianguy
 * https://github.com/eerussianguy/Beneath/blob/1.21.x/LICENSE
 */

// [PORT] Из TFG startup_scripts/tfg/blocks.crops.js (registerTFGCrops).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry('block').
// [PORT] kubejs_tfc 2.0.1 (1.21): .nutrient(NutrientType) удалён — теперь N/P/K-значения
// через .requiredNitrogen/.requiredPhosphorous/.requiredPotassium(float) (как у TFC 4.x,
// см. net.dries007.tfc.common.blocks.crop.Crop). Взято 0.5 для основного нутриента —
// [PORT-CHECK] значения потребления нутриентов подобрать при балансировке.
// [PORT] kubejs_tfc 2.0.1: у wild crop больше нет .type('default'|'double'|'spreading') —
// вместо этого отдельные типы 'tfc:wild_crop' / 'tfc:tall_wild_crop' / 'tfc:spreading_wild_crop'.
// [PORT] 'forge:seeds' -> 'c:seeds' (NeoForge 1.21 общие теги в namespace c).
// [PORT] Java.loadClass(FarmlandBlockEntity) больше не нужен (NutrientType не используется).

StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port core registry start')

	//#region Earth Crops

	// Sunflower
	event.create('tfg:sunflower', 'tfc:double_crop')
		.translationKey('block.tfg.sunflower')
		.mapColor('plant')
		.soundType('crop')
		.requiredNitrogen(0.5) // [PORT] .nutrient(NITROGEN)
		.stages(4)
		.doubleStages(2)
		.hardness(0.4)
		.growthModifier(0.8)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('minecraft:flowers')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:sunflower_product')
		.seedItem(seed => {
			seed.texture('tfg:item/sunflower_seed')
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
		})
	event.create('tfg:sunflower_wild', 'tfc:tall_wild_crop') // [PORT] wild_crop + .type('double') -> tall_wild_crop
		.soundType('crop')
		.seeds('tfg:sunflower_seeds')
		.food('tfg:sunflower_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('minecraft:flowers')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Rapeseed/ Canola
	event.create('tfg:rapeseed', 'tfc:double_crop')
		.mapColor('plant')
		.translationKey('block.tfg.rapeseed')
		.soundType('crop')
		.requiredPhosphorous(0.5) // [PORT] .nutrient(PHOSPHOROUS)
		.stages(3)
		.doubleStages(3)
		.hardness(0.4)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('minecraft:flowers')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:rapeseed_product')
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
		})
	event.create('tfg:rapeseed_wild', 'tfc:tall_wild_crop') // [PORT] wild_crop + .type('double') -> tall_wild_crop
		.soundType('crop')
		.seeds('tfg:rapeseed_seeds')
		.food('tfg:rapeseed_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('minecraft:flowers')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Flax
	event.create('tfg:flax', 'tfc:double_crop')
		.mapColor('plant')
		.translationKey('block.tfg.flax')
		.soundType('crop')
		.requiredNitrogen(0.5) // [PORT] .nutrient(NITROGEN)
		.stages(5)
		.doubleStages(3)
		.hardness(0.4)
		.growthModifier(1.2)
		.expiryModifier(1.2)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('minecraft:flowers')
		.tagBlock('tfc:crops')
		.productItem(product => {
			product.texture('tfg:item/flax_product')
			product.tag('tfc:scrapable')
		})
		.seedItem(seed => {
			seed.texture('tfg:item/flax_seed')
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
		})
	event.create('tfg:flax_wild', 'tfc:tall_wild_crop') // [PORT] wild_crop + .type('double') -> tall_wild_crop
		.soundType('crop')
		.seeds('tfg:flax_seeds')
		.food('tfg:flax_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:flowers')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Lentils
	event.create('tfg:lentil', 'tfc:crop')
		.mapColor('plant')
		.soundType('crop')
		.requiredPhosphorous(0.5) // [PORT] .nutrient(PHOSPHOROUS)
		.stages(5)
		.hardness(0.4)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:lentil_product')
		.seedItem(seed => {
			seed.tag('tfc:seeds')
			seed.tag('c:seeds') // [PORT] forge:seeds -> c:seeds
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
			dead.box(2, 0, 2, 14, 6, 14)
		})
	event.create('tfg:lentil_wild', 'tfc:wild_crop') // [PORT] .type('default') -> тип 'tfc:wild_crop'
		.soundType('crop')
		.seeds('tfg:lentil_seeds')
		.food('tfg:lentil_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Radish
	event.create('tfg:radish', 'tfc:crop')
		.mapColor('plant')
		.soundType('crop')
		.requiredPotassium(0.5) // [PORT] .nutrient(POTASSIUM)
		.stages(5)
		.hardness(0.4)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:radish_product')
		.seedItem(seed => {
			seed.tag('tfc:seeds')
			seed.tag('c:seeds') // [PORT] forge:seeds -> c:seeds
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
			dead.box(2, 0, 2, 14, 6, 14)
		})
	event.create('tfg:radish_wild', 'tfc:wild_crop') // [PORT] .type('default') -> тип 'tfc:wild_crop'
		.soundType('crop')
		.seeds('tfg:radish_seeds')
		.food('tfg:radish_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Cucumber
	// [PORT] kubejs_tfc 2.0.1: .requiresStick(true) удалён — double_crop с палкой теперь отдельный тип 'tfc:climbing_crop'
	event.create('tfg:cucumber', 'tfc:climbing_crop')
		.mapColor('plant')
		.soundType('crop')
		.requiredNitrogen(0.5) // [PORT] .nutrient(NITROGEN)
		.stages(1)
		.doubleStages(4)
		.hardness(0.4)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:cucumber_product')
		.seedItem(seed => {
			seed.tag('tfc:seeds')
			seed.tag('c:seeds') // [PORT] forge:seeds -> c:seeds
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
		})
	event.create('tfg:cucumber_wild', 'tfc:tall_wild_crop') // [PORT] wild_crop + .type('double') -> tall_wild_crop
		.soundType('crop')
		.seeds('tfg:cucumber_seeds')
		.food('tfg:cucumber_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	//#endregion
	//#region Beneath Crops

	// Peanut
	event.create('tfg:peanut', 'tfc:crop')
		.mapColor('plant')
		.soundType('crop')
		.requiredPotassium(0.5) // [PORT] .nutrient(POTASSIUM)
		.stages(5)
		.hardness(0.4)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:peanut_product')
		.seedItem(seed => {
			seed.tag('tfc:seeds')
			seed.tag('c:seeds') // [PORT] forge:seeds -> c:seeds
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
			dead.box(2, 0, 2, 14, 6, 14)
		})
	event.create('tfg:peanut_wild', 'tfc:wild_crop') // [PORT] .type('default') -> тип 'tfc:wild_crop'
		.soundType('crop')
		.seeds('tfg:peanut_seeds')
		.food('tfg:peanut_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Cassava
	event.create('tfg:cassava', 'tfc:crop')
		.mapColor('plant')
		.soundType('crop')
		.requiredNitrogen(0.5) // [PORT] .nutrient(NITROGEN)
		.stages(5)
		.hardness(0.4)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:cassava_product')
		.seedItem(seed => {
			seed.tag('tfc:seeds')
			seed.tag('c:seeds') // [PORT] forge:seeds -> c:seeds
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
			dead.box(2, 0, 2, 14, 6, 14)
		})
	event.create('tfg:cassava_wild', 'tfc:wild_crop') // [PORT] .type('default') -> тип 'tfc:wild_crop'
		.soundType('crop')
		.seeds('tfg:cassava_seeds')
		.food('tfg:cassava_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Beans
	event.create('tfg:beans', 'tfc:crop')
		.mapColor('plant')
		.soundType('crop')
		.requiredPotassium(0.5) // [PORT] .nutrient(POTASSIUM)
		.stages(5)
		.hardness(0.4)
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:crops')
		.existingProductItem('tfg:beans_product')
		.seedItem(seed => {
			seed.tag('tfc:seeds')
			seed.tag('c:seeds') // [PORT] forge:seeds -> c:seeds
		})
		.deadBlock(dead => {
			dead.hardness(0.2)
			dead.soundType('crop')
			dead.tagBlock('minecraft:mineable/hoe')
			dead.tagBlock('tfg:dead_crops')
			dead.box(2, 0, 2, 14, 6, 14)
		})
	event.create('tfg:beans_wild', 'tfc:wild_crop') // [PORT] .type('default') -> тип 'tfc:wild_crop'
		.soundType('crop')
		.seeds('tfg:beans_seeds')
		.food('tfg:beans_product')
		.hardness(0.2)
		.tagBoth('tfc:wild_crops')
		.tagBlock('minecraft:mineable/hoe')
		.tagBlock('tfc:can_be_snow_piled')
		.tagItem('c:hidden_from_recipe_viewers')

	// Ghost Pepper
	// [PORT] beneath отсутствует — крафт-предметы beneath:ghost_pepper не существуют, культура пропущена
	// event.create('tfg:ghost_pepper', 'tfc:crop')
	// 	...
	// 	.existingProductItem('beneath:ghost_pepper')
	// 	...
	// event.create('tfg:ghost_pepper_wild', 'tfc:wild_crop')
	// 	...
	// 	.food('beneath:ghost_pepper')
	// 	...

	//#endregion
	//#region Mars Crops

	// [PORT-Ф10] Марсианские культуры (betterend:amber_root, betterend:blossom_berry,
	// betterend:cave_pumpkin(+plant), betterend:chorus_mushroom, betterend:shadow_berry,
	// betterend:bolux_mushroom) — контент космоса (Фаза 10), пропущено.
	// Дополнительно при портировании учесть:
	// - регистрация шла в чужой namespace 'betterend:' — в 1.21 KubeJS-контент должен быть в 'tfg:';
	// - kubejs_tfc 2.0.1: у spreading_crop нет .textureAt(n, ...)/.texture('side', ...) —
	//   вместо них .models((age, m) => ...) и .sideModel(m => ...);
	// - wild + .type('spreading') -> тип 'tfc:spreading_wild_crop', .spreadingFruitBlock(...) -> .fruitBlock(...).

	//#endregion
})
