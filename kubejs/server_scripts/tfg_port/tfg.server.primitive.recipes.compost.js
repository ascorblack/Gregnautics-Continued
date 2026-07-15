// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.compost.js (Ф4).
// Главные изменения 1.20→1.21:
//  - forge:→c: (forge:sand→c:sands, forge:wax→c:wax, forge:tools/mortars→c:tools/mortar)
//  - [PORT-FIX] tfc:compost_greens_low/[без суффикса]/_high → tfc:compost_greens/low|medium|high
//    (TFC 4.x слэш-формы, подтверждено по data/tfc/tags/item/compost_greens/*.json в jar TFC 4.2.5);
//    подчёркнутые теги 1.20 в 1.21 пусты, а пустой тег валит forge_hammer/фильтры. Аналогично browns.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.compost start')

	//#region Fertiliser
	event.recipes.gtceu.mixer('tfg:fertilizer')
		.itemInputs(
			'#tfc:dirt',
			'2x #tfg:wood_dusts',
			'4x #c:sands' // [PORT] forge:sand -> c:sands
		)
		.circuit(1)
		.inputFluids("#tfg:clean_water 1000")
		.itemOutputs('4x gtceu:fertilizer')
		.duration(300)
		.EUt(30)

	event.recipes.gtceu.mixer('tfg:fertilizer_2')
		.itemInputs('tfc:compost')
		.inputFluids('#tfg:clean_water 1000')
		.itemOutputs('4x gtceu:fertilizer')
		.duration(300)
		.EUt(30)

	event.recipes.gtceu.centrifuge('tfg:gtceu/centrifuge/pure_fertilizers')
		.itemInputs('8x gtceu:fertilizer')
		.itemOutputs('1x tfc:pure_nitrogen', '1x tfc:pure_potassium', '1x tfc:pure_phosphorus')
		.duration(340)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.mixer('tfg:tfc/mixer/fertilizer')
		.itemInputs('1x tfc:pure_nitrogen', '1x tfc:pure_potassium', '1x tfc:pure_phosphorus', ChemicalHelper.get(TagPrefix.dustSmall, GTMaterials.Clay, 1))
		.itemOutputs('8x gtceu:fertilizer')
		.duration(160)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.mixer('tfg:pure_nitrogen')
		.itemInputs('#c:wax') // [PORT] forge:wax -> c:wax
		.inputFluids(Fluid.of('gtceu:nitrogen', 8000))
		.itemOutputs('4x tfc:pure_nitrogen')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('tfg:pure_potassium')
		.itemInputs('#c:wax', '8x gtceu:potassium_dust')
		.itemOutputs('4x tfc:pure_potassium')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('tfg:pure_phosphorus')
		.itemInputs('#c:wax', '8x gtceu:phosphorus_dust')
		.itemOutputs('4x tfc:pure_phosphorus')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])
	//#endregion

	// Humus and compost
	event.recipes.gtceu.compressor('tfg:humus_from_leaves')
		.itemInputs('#minecraft:leaves')
		.itemOutputs('tfc:groundcover/humus')
		.duration(600)
		.EUt(2)

	event.recipes.gtceu.compressor('tfg:humus_from_fallen_leaves')
		.itemInputs('#tfc:fallen_leaves')
		.itemOutputs('tfc:groundcover/humus')
		.duration(600)
		.EUt(2)

	// [PORT-FIX] tfc:groundcover/dead_grass не существует в TFC 4.2.5 (проверено по exported/registries/items.json,
	// нет ни в одном namespace) — рецепт сушки соломы закомментирован; ошибка ронял весь handler
	// (из-за этого tfg:forge_hammer/universal_compost_greens/low оставался без duration).
	// event.smelting(
	// 	'1x tfc:groundcover/dead_grass',
	// 	'tfc:thatch'
	// ).id('tfg:smelting/thatch_drying_furnace')

	event.recipes.gtceu.fermenter('tfg:fertilizer_to_compost')
		.itemInputs('4x gtceu:fertilizer')
		.itemOutputs('tfc:compost')
		.duration(1200)
		.EUt(2)

	const BROWNS = [ '16x #tfc:compost_browns/low', '8x #tfc:compost_browns/medium', '4x #tfc:compost_browns/high' ];
	const GREENS = [ '16x #tfc:compost_greens/low', '8x #tfc:compost_greens/medium', '4x #tfc:compost_greens/high' ];

	let i = 0;
	BROWNS.forEach(brown => {
		GREENS.forEach(green => {
			event.recipes.gtceu.mixer(`tfg:compost_${i++}`)
				.itemInputs(brown, green)
				.itemOutputs('tfc:compost')
				.duration(1200)
				.EUt(2)
		})
	})

	//Greens
	// Lows via crafting with mortar
	event.shaped(Item.of('tfg:universal_compost_greens', 1), [
		'AB'
	], {
		A: '#tfc:compost_greens/low',
		B: '#c:tools/mortar' // [PORT] forge:tools/mortars -> c:tools/mortar
	}).id('tfg:shaped/universal_compost_greens_from_low')

	// Mediums via crafting with mortar
	event.shaped(Item.of('tfg:universal_compost_greens', 2), [
		'AB'
	], {
		A: '#tfc:compost_greens/medium',
		B: '#c:tools/mortar'
	}).id('tfg:shaped/universal_compost_greens_from_medium')

	// Highs via crafting with mortar
	event.shaped(Item.of('tfg:universal_compost_greens', 4), [
		'AB'
	], {
		A: '#tfc:compost_greens/high',
		B: '#c:tools/mortar'
	}).id('tfg:shaped/universal_compost_greens_from_high')

	// Filters
	// [PORT-FIX] На 1.21 теги НЕ привязаны во время recipes-события: Ingredient.of('#tag').itemIds пуст,
	// а .except()-цепочка даёт пустой ингредиент — GT кидал "Invalid or empty input item"
	// (tfg:forge_hammer/universal_compost_greens_low) и ронял весь handler.
	// [PORT-CHECK] Фильтрация greens∖browns из 1.20 отключена; предметы, входящие одновременно
	// в greens и browns, теперь матчатся обоими forge_hammer-рецептами (некритично).
	// const greens_low = Ingredient.of('#tfc:compost_greens/low')
	// const browns_low = Ingredient.of('#tfc:compost_browns/low').itemIds
	// const greens_medium = Ingredient.of('#tfc:compost_greens/medium')
	// const browns_medium = Ingredient.of('#tfc:compost_browns/medium').itemIds
	// const greens_high = Ingredient.of('#tfc:compost_greens/high')
	// const browns_high = Ingredient.of('#tfc:compost_browns/high').itemIds
	//
	// let low_filtered = greens_low
	// let medium_filtered = greens_medium
	// let high_filtered = greens_high
	//
	// browns_low.forEach(item => {
	// 	low_filtered = low_filtered.except(item)
	// 	low_filtered = low_filtered.except('tfg:universal_compost_greens')
	// })
	// browns_medium.forEach(item => {
	// 	medium_filtered = medium_filtered.except(item)
	// })
	// browns_high.forEach(item => {
	// 	high_filtered = high_filtered.except(item)
	// })

	// Lows via forge hammer
	event.recipes.gtceu.forge_hammer('tfg:universal_compost_greens_low')
		.itemInputs('#tfc:compost_greens/low') // [PORT-FIX] фильтрованный ингредиент -> тег напрямую
		.itemOutputs('tfg:universal_compost_greens')
		.duration(20)
		.EUt(8)

	// Mediums via forge hammer
	event.recipes.gtceu.forge_hammer('tfg:universal_compost_greens_medium')
		.itemInputs('#tfc:compost_greens/medium') // [PORT-FIX] фильтрованный ингредиент -> тег напрямую
		.itemOutputs(Item.of('tfg:universal_compost_greens', 2))
		.duration(20)
		.EUt(8)

	// Highs via forge hammer
	event.recipes.gtceu.forge_hammer('tfg:universal_compost_greens_high')
		.itemInputs('#tfc:compost_greens/high') // [PORT-FIX] фильтрованный ингредиент -> тег напрямую
		.itemOutputs(Item.of('tfg:universal_compost_greens', 4))
		.duration(20)
		.EUt(8)

	//Browns
	// Lows via crafting with mortar
	event.shaped(Item.of('tfg:universal_compost_browns', 1), [
		'BA'
	], {
		A: '#tfc:compost_browns/low',
		B: '#c:tools/mortar'
	}).id('tfg:shaped/universal_compost_browns_from_low')

	// Mediums via crafting with mortar
	event.shaped(Item.of('tfg:universal_compost_browns', 2), [
		'BA'
	], {
		A: '#tfc:compost_browns/medium',
		B: '#c:tools/mortar'
	}).id('tfg:shaped/universal_compost_browns_from_medium')

	// Highs via crafting with mortar
	event.shaped(Item.of('tfg:universal_compost_browns', 4), [
		'BA'
	], {
		A: '#tfc:compost_browns/high',
		B: '#c:tools/mortar'
	}).id('tfg:shaped/universal_compost_browns_from_high')

	// Lows via forge hammer
	event.recipes.gtceu.forge_hammer('tfg:universal_compost_browns_low')
		.itemInputs('#tfc:compost_browns/low')
		.itemOutputs('tfg:universal_compost_browns')
		.duration(20)
		.EUt(8)

	// Mediums via forge hammer
	event.recipes.gtceu.forge_hammer('tfg:universal_compost_browns_medium')
		.itemInputs('#tfc:compost_browns/medium')
		.itemOutputs(Item.of('tfg:universal_compost_browns', 2))
		.duration(20)
		.EUt(8)

	// Highs via forge hammer
	event.recipes.gtceu.forge_hammer('tfg:universal_compost_browns_high')
		.itemInputs('#tfc:compost_browns/high')
		.itemOutputs(Item.of('tfg:universal_compost_browns', 4))
		.duration(20)
		.EUt(8)

	//Universal Brown Compost Bag
	event.shapeless(Item.of('tfg:universal_compost_browns_bag', 1),
	[
		"4x tfg:universal_compost_browns"
	]).id('tfg:shapeless/universal_compost_browns_bag')

	event.shapeless(Item.of('tfg:universal_compost_browns', 4),
	[
		"tfg:universal_compost_browns_bag"
	]).id("tfg:shapeless/universal_compost_browns_from_bag")

	//Universal Green Compost Bag
	event.shapeless(Item.of('tfg:universal_compost_greens_bag', 1),
	[
		"4x tfg:universal_compost_greens"
	]).id('tfg:shapeless/universal_compost_greens_bag')

	event.shapeless(Item.of('tfg:universal_compost_greens', 4),
	[
		"tfg:universal_compost_greens_bag"
	]).id("tfg:shapeless/universal_compost_greens_from_bag")
})
