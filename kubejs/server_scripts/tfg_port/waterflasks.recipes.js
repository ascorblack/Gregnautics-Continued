// priority: 0
"use strict";

// [PORT] KubeJS 7: изолированные скоупы, регистрируем событие напрямую вместо registerWaterFlasksRecipes(event)
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port waterflasks recipes start')

	// alternative for leather side

	event.recipes.tfc.knapping('waterflasks:leather_side', 'tfc:leather', [
		'     ',
		'   X ',
		' XXXX',
		'XXXXX',
		' XXX '
	]).id('waterflasks/leather_knapping/leather_side_2')

	// Декрафт Unfinished Water Flask
	event.recipes.tfc.heating('waterflasks:unfinished_iron_flask', 1535)
		.resultFluid(Fluid.of('gtceu:iron', 144))
		.id(`waterflasks:heating/wrought_iron_unfinished_iron_flask`)

	// Декрафт Broken Water Flask
	event.recipes.tfc.heating('waterflasks:broken_iron_flask', 1535)
		.resultFluid(Fluid.of('gtceu:iron', 144))
		.id(`waterflasks:heating/wrought_iron_broken_iron_flask`)

	// Декрафт Water Flask
	event.recipes.tfc.heating('waterflasks:iron_flask', 1535)
		.resultFluid(Fluid.of('gtceu:iron', 144))
		.useDurability(true)
		.id(`waterflasks:heating/wrought_iron_iron_flask`)

	// Red steel flask
	// [PORT-Ф2] gtceu:red_steel — кастомный GT-материал TFG, пока не зарегистрирован
	// event.recipes.tfc.heating('waterflasks:red_steel_flask', 1535)
	// 	.resultFluid(Fluid.of('gtceu:red_steel', 144))
	// 	.useDurability(true)
	// 	.id(`waterflasks:heating/red_steel_flask`)

	// [PORT-Ф2] gtceu:red_steel — кастомный GT-материал TFG; remove тоже закомментирован, чтобы не оставить фласку без рецепта декрафта
	// event.remove({id: 'waterflasks:heating/red_steel_unfinished_red_steel_flask'})
	// event.recipes.tfc.heating('waterflasks:unfinished_red_steel_flask', 1535)
	// 	.resultFluid(Fluid.of('gtceu:red_steel', 144))
	// 	.useDurability(true)
	// 	.id('waterflasks:tfc/heating/unfinished_red_steel_flask')

	//#region Кожанная фласка

	event.recipes.gtceu.assembler('tfg:water_flasks/leather_flask')
		.itemInputs('3x #c:leather', '2x #c:string') // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs('waterflasks:leather_flask')
		.duration(250)
		.EUt(16)

	event.recipes.gtceu.assembler('tfg:water_flasks/leather_flask_repair')
		.itemInputs('waterflasks:broken_leather_flask', '#c:leather', '2x #c:string') // [PORT] forge: -> c:
		.circuit(2)
		.itemOutputs('waterflasks:leather_flask')
		.duration(250)
		.EUt(16)

	//#endregion

	//#region Железная фласка

	// For some reason, replaceInput isn't working on these
	event.remove({ id: 'waterflasks:crafting/iron_flask' })
	event.shaped('waterflasks:iron_flask', [
		' AB',
		'CDC',
		'EFE'
	], {
		A: '#c:string', // [PORT] forge: -> c:
		B: '#c:tools/knife', // [PORT] forge:tools/knives -> c:tools/knife
		C: '#c:cloth', // [PORT] forge: -> c:
		D: 'waterflasks:bladder',
		E: 'waterflasks:leather_side',
		F: 'waterflasks:unfinished_iron_flask'
	}).id('tfg:shaped/iron_flask')

	// [PORT-FIX] TFC 1.21 убрал tfc:no_remainder_shaped_crafting; используем tfc:advanced_shaped_crafting
	// с remainder = TFC.isp.empty(), чтобы фласка-ингредиент (primary input, слот 0,0) не возвращалась в сетку
	event.remove({ id: 'waterflasks:crafting/repair_broken_iron' })
	event.recipes.tfc.advanced_shaped_crafting(
		'waterflasks:iron_flask',
		[
			'AB',
			'C '
		], {
			A: 'waterflasks:broken_iron_flask',
			B: 'waterflasks:bladder',
			C: '#c:cloth' // [PORT] forge: -> c:
		}).inputRow(0).inputColumn(0).remainder(TFC.isp.empty()).id('tfg:shaped/repair_broken_iron')

	event.remove({ id: 'waterflasks:crafting/repair_iron' })
	event.recipes.tfc.advanced_shaped_crafting(
		'waterflasks:iron_flask',
		[
			'AB',
			'C '
		], {
			A: 'waterflasks:iron_flask',
			B: 'waterflasks:bladder',
			C: '#c:cloth' // [PORT] forge: -> c:
		}).inputRow(0).inputColumn(0).remainder(TFC.isp.empty()).id('tfg:shaped/repair_iron_bladder')

	event.recipes.tfc.advanced_shaped_crafting(
		'waterflasks:iron_flask',
		[
			'AB',
			'C '
		], {
			A: 'waterflasks:iron_flask',
			B: '#tfg:rubber_foils', // [PORT-CHECK] пак-тег tfg:rubber_foils должен быть определён в портированных tags-скриптах
			C: '#c:cloth' // [PORT] forge: -> c:
		}).inputRow(0).inputColumn(0).remainder(TFC.isp.empty()).id('tfg:shaped/repair_iron_rubber')

	// [PORT-Ф4] tfg:phantom_silk отсутствует (предмет tfg появится в фазе 4); remove тоже закомментирован, чтобы не оставить фласку без рецепта
	// event.remove({ id: 'waterflasks:crafting/red_steel_flask' })
	// event.shaped('waterflasks:red_steel_flask', [
	// 	' AB',
	// 	'CDC',
	// 	'EFE'
	// ], {
	// 	A: '#c:string',
	// 	B: '#c:tools/knife',
	// 	C: 'tfg:phantom_silk',
	// 	D: 'waterflasks:bladder',
	// 	E: 'waterflasks:leather_side',
	// 	F: 'waterflasks:unfinished_red_steel_flask'
	// }).id('tfg:shaped/red_steel_flask_bladder')

	// [PORT-Ф4] tfg:phantom_silk отсутствует (предмет tfg появится в фазе 4)
	// event.shaped('waterflasks:red_steel_flask', [
	// 	' AB',
	// 	'CDC',
	// 	'DFD'
	// ], {
	// 	A: '#c:string',
	// 	B: '#c:tools/knife',
	// 	C: 'tfg:phantom_silk',
	// 	D: '#tfg:rubber_foils',
	// 	F: 'waterflasks:unfinished_red_steel_flask'
	// }).id('tfg:shaped/red_steel_flask_rubber')

	event.recipes.gtceu.assembler('tfg:water_flasks/iron_flask')
		.itemInputs('2x #c:cloth', '#c:string', '#c:plates/wrought_iron', '3x #tfg:rubber_foils') // [PORT] forge: -> c:; [PORT-CHECK] пак-тег tfg:rubber_foils
		.circuit(5)
		.itemOutputs('waterflasks:iron_flask')
		.duration(250)
		.EUt(16)

	event.recipes.gtceu.assembler('tfg:water_flasks/iron_flask_repair')
		.itemInputs('waterflasks:broken_iron_flask', '#c:cloth', '#tfg:rubber_foils') // [PORT] forge: -> c:; [PORT-CHECK] пак-тег tfg:rubber_foils
		.circuit(6)
		.itemOutputs('waterflasks:iron_flask')
		.duration(250)
		.EUt(16)

	// [PORT-Ф2] c:plates/red_steel — кастомный GT-материал TFG; [PORT-Ф4] tfg:phantom_silk отсутствует
	// event.recipes.gtceu.assembler('tfg:water_flasks/red_steel_flask')
	// 	.itemInputs('2x tfg:phantom_silk', '#c:string', '#c:plates/red_steel', '3x #tfg:rubber_foils')
	// 	.circuit(5)
	// 	.itemOutputs('waterflasks:red_steel_flask')
	// 	.duration(250)
	// 	.EUt(16)

	//#endregion
})
