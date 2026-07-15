// priority: 0
"use strict";

// [PORT] exposure/recipes.js — dispatcher-функция registerExposureRecipes заменена на прямую регистрацию события

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port exposure recipes start')

	// [PORT-Ф4] TFG core Java-класс (su.terrafirmagreg.core...) отсутствует в 1.21.1 — ISP-логика недоступна
	// const $ISPRecipeLogic = Java.loadClass("su.terrafirmagreg.core.common.tfgt.machine.trait.ISPOutputRecipeLogic")

	event.remove({ id: 'exposure:sequenced_color_film_developing' }) // [PORT-CHECK] exposure 1.9.x мог переименовать id рецепта — проверить в игре

	event.replaceInput({ id: 'exposure:interplanar_projector' }, 'minecraft:ender_eye', '#c:foils/silver') // [PORT] forge: -> c:

	// Lightroom
	event.shaped('exposure:lightroom', [
		'AB',
		'CC',
		'CC'
	], {
		A: '#tfc:lamps',
		B: 'minecraft:redstone_torch',
		C: '#minecraft:planks'
	}).id('exposure:lightroom')

	// Camera
	event.shaped('exposure:camera', [
		'ABC',
		'DED',
		'FDF'
	], {
		A: 'minecraft:lever',
		B: '#c:small_gears', // [PORT] forge: -> c:
		C: '#minecraft:wooden_buttons',
		D: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		E: 'tfc:lens',
		F: '#c:screws/any_bronze' // [PORT] forge: -> c:
	}).id('exposure:camera')

	// Album
	event.shapeless('exposure:album', [
		'minecraft:writable_book', 'minecraft:paper', 'minecraft:paper'
	]).id('exposure:album')

	// Camera stand
	event.shaped('exposure:camera_stand', [
		' A ',
		'BBB',
		'C C'
	], {
		A: '#c:rings', // [PORT] forge: -> c:
		B: '#tfc:lumber',
		C: '#c:smooth_stone_slab' // [PORT] forge: -> c: — [PORT-CHECK] проверить, что тег c:smooth_stone_slab существует в 1.21.1
	}).id('exposure:camera_stand')

	// Film
	event.shaped('exposure:black_and_white_film', [
		'ABB',
		'CDD',
		' EE'
	], {
		A: '#c:rings/wrought_iron', // [PORT] forge: -> c:
		B: '#c:dyes/white', // [PORT] forge: -> c:
		C: '#c:foils/wrought_iron', // [PORT] forge: -> c:
		D: '#c:dusts/gunpowder', // [PORT] forge: -> c:
		E: 'tfc:food/dried_kelp',
	}).id('exposure:black_and_white_film')

	event.shaped('exposure:high_sensitivity_black_and_white_film', [
		'ABB',
		'CDD',
		'FEE'
	], {
		A: '#c:rings/wrought_iron', // [PORT] forge: -> c:
		B: '#c:dyes/white', // [PORT] forge: -> c:
		C: '#c:foils/wrought_iron', // [PORT] forge: -> c:
		D: '#c:dusts/gunpowder', // [PORT] forge: -> c:
		E: 'tfc:food/dried_kelp',
		F: '#c:dusts/glowstone' // [PORT] forge: -> c:
	}).id('exposure:high_sensitivity_black_and_white_film')

	event.shaped('exposure:color_film', [
		'ABB',
		'CDD',
		' EE'
	], {
		A: '#c:rings/wrought_iron', // [PORT] forge: -> c:
		B: '#c:dyes/blue', // [PORT] forge: -> c:
		C: '#c:foils/wrought_iron', // [PORT] forge: -> c:
		D: '#c:foils/gold', // [PORT] forge: -> c:
		E: 'tfc:food/dried_kelp',
	}).id('exposure:color_film')

	event.shaped('exposure:high_sensitivity_color_film', [
		'ABB',
		'CDD',
		'FEE'
	], {
		A: '#c:rings/wrought_iron', // [PORT] forge: -> c:
		B: '#c:dyes/blue', // [PORT] forge: -> c:
		C: '#c:foils/wrought_iron', // [PORT] forge: -> c:
		D: '#c:foils/gold', // [PORT] forge: -> c:
		E: 'tfc:food/dried_kelp',
		F: '#c:dusts/glowstone' // [PORT] forge: -> c:
	}).id('exposure:high_sensitivity_color_film')

	// Creating the developer

	// Pyrogallol
	// [PORT-Ф2] tfg:pyrogallol_dust — кастомный GT-материал TFG, ещё не зарегистрирован
	// event.recipes.tfc.pot(['tfc:powder/saltpeter'], Fluid.of('tfc:tannin', 500), 30 * 20, 650)
	// 	.itemOutput('tfg:pyrogallol_dust')
	// 	.id('tfg:pot/tannin_to_pyrogallol_saltpeter')

	// [PORT-Ф2] tfg:pyrogallol_dust
	// event.recipes.tfc.pot(['tfc:powder/soda_ash'], Fluid.of('tfc:tannin', 500), 30 * 20, 650)
	// 	.itemOutput('tfg:pyrogallol_dust')
	// 	.id('tfg:pot/tannin_to_pyrogallol_soda_ash')

	// [PORT-Ф2] tfg:pyrogallol_dust
	// event.recipes.firmalife.vat()
	// 	.inputs('tfc:powder/saltpeter', Fluid.of('tfc:tannin', 500))
	// 	.length(30 * 20)
	// 	.temperature(650)
	// 	.outputItem('tfg:pyrogallol_dust')
	// 	.id('tfg:vat/tannin_to_pyrogallol_saltpeter')

	// [PORT-Ф2] tfg:pyrogallol_dust
	// event.recipes.firmalife.vat()
	// 	.inputs('tfc:powder/soda_ash', Fluid.of('tfc:tannin', 500))
	// 	.length(30 * 20)
	// 	.temperature(650)
	// 	.outputItem('tfg:pyrogallol_dust')
	// 	.id('tfg:vat/tannin_to_soda_ash')

	// [PORT-Ф2] tfg:pyrogallol_dust
	// event.recipes.gtceu.chemical_reactor('tfg:tannin_to_pyrogallol_saltpeter')
	// 	.itemInputs('tfc:powder/saltpeter')
	// 	.inputFluids(Fluid.of('tfc:tannin', 500))
	// 	.itemOutputs('tfg:pyrogallol_dust')
	// 	.duration(200)
	// 	.EUt(7)

	// [PORT-Ф2] tfg:pyrogallol_dust
	// event.recipes.gtceu.chemical_reactor('tfg:tannin_to_pyrogallol_soda_ash')
	// 	.itemInputs('tfc:powder/soda_ash')
	// 	.inputFluids(Fluid.of('tfc:tannin', 500))
	// 	.itemOutputs('tfg:pyrogallol_dust')
	// 	.duration(200)
	// 	.EUt(7)

	// Developer
	// [PORT-Ф2] tfg:bw_photographic_developer (жидкость) и тег c:dusts/pyrogallol — кастомный GT-материал TFG
	// event.recipes.tfc.pot(['#c:dusts/pyrogallol', 'tfc:powder/soda_ash', 'tfc:powder/sulfur', '#exposure:black_printing_dyes'], Fluid.of('tfc:lye', 1000), 30 * 20, 550)
	// 	.fluidOutput(Fluid.of('tfg:bw_photographic_developer', 1000))
	// 	.id('tfg:pot/bw_developer')

	// [PORT-Ф2] tfg:bw_photographic_developer
	// event.recipes.gtceu.mixer('tfg:bw_developer')
	// 	.itemInputs('#c:dusts/pyrogallol', 'tfc:powder/soda_ash', 'tfc:powder/sulfur', '#exposure:black_printing_dyes')
	// 	.inputFluids(Fluid.of('tfc:lye', 1000))
	// 	.outputFluids(Fluid.of('tfg:bw_photographic_developer', 1000))
	// 	.duration(200)
	// 	.EUt(7)

	// [PORT-Ф2] tfg:color_photographic_developer
	// event.recipes.gtceu.mixer('tfg:color_developer')
	// 	.itemInputs('#c:dusts/pyrogallol', 'tfc:powder/soda_ash', 'tfc:powder/sulfur', '#exposure:cyan_printing_dyes', '#exposure:yellow_printing_dyes', '#exposure:magenta_printing_dyes')
	// 	.inputFluids(Fluid.of('tfc:lye', 1000))
	// 	.outputFluids(Fluid.of('tfg:color_photographic_developer', 1000))
	// 	.duration(200)
	// 	.EUt(7)

	// Developing film
	// [PORT-Ф2] tfg:bw_photographic_developer; [PORT-Ф4] модификатор tfg:copy_nbt (в 1.21 понадобится копирование data components)
	// event.recipes.tfc.barrel_sealed(4000)
	// 	.inputs('exposure:black_and_white_film', Fluid.of('tfg:bw_photographic_developer', 250))
	// 	.outputItem(TFC.isp.of('exposure:developed_black_and_white_film').simpleModifier('tfg:copy_nbt').asCanonClass())
	// 	.id('tfg:barrel/develop_black_and_white_film')

	// [PORT-Ф2] tfg:bw_photographic_developer; [PORT-Ф4] tfg:copy_nbt
	// event.recipes.tfc.barrel_sealed(4000)
	// 	.inputs('exposure:high_sensitivity_black_and_white_film', Fluid.of('tfg:bw_photographic_developer', 250))
	// 	.outputItem(TFC.isp.of('exposure:developed_black_and_white_film').simpleModifier('tfg:copy_nbt').asCanonClass())
	// 	.id('tfg:barrel/develop_high_sensitivity_black_and_white_film')

	// [PORT-Ф2] tfg:bw_photographic_developer; [PORT-Ф4] gtceu:food_processor — кастомная машина TFG
	// event.recipes.gtceu.food_processor('black_and_white_film')
	// 	.itemInputs('exposure:black_and_white_film')
	// 	.inputFluids(Fluid.of('tfg:bw_photographic_developer', 250))
	// 	.itemOutputs('exposure:developed_black_and_white_film')
	// 	.duration(60 * 20)
	// 	.EUt(2)

	// [PORT-Ф4] ISP-логика TFG core недоступна
	// $ISPRecipeLogic.RegisterRecipeData('food_processor/black_and_white_film',
	// 	[Ingredient.of('exposure:black_and_white_film')],
	// 	TFC.isp.of('exposure:developed_black_and_white_film').simpleModifier('tfg:copy_nbt').asCanonClass(),
	// 	[])

	// [PORT-Ф2] tfg:bw_photographic_developer; [PORT-Ф4] gtceu:food_processor
	// event.recipes.gtceu.food_processor('high_sensitivity_black_and_white_film')
	// 	.itemInputs('exposure:high_sensitivity_black_and_white_film')
	// 	.inputFluids(Fluid.of('tfg:bw_photographic_developer', 250))
	// 	.itemOutputs('exposure:developed_black_and_white_film')
	// 	.duration(60 * 20)
	// 	.EUt(2)

	// [PORT-Ф4] ISP-логика TFG core недоступна
	// $ISPRecipeLogic.RegisterRecipeData('food_processor/high_sensitivity_black_and_white_film',
	// 	[Ingredient.of('exposure:high_sensitivity_black_and_white_film')],
	// 	TFC.isp.of('exposure:developed_black_and_white_film').simpleModifier('tfg:copy_nbt').asCanonClass(),
	// 	[])

	// Developing color film
	// [PORT-Ф2] tfg:color_photographic_developer; [PORT-Ф4] tfg:copy_nbt
	// event.recipes.tfc.barrel_sealed(4000)
	// 	.inputs('exposure:color_film', Fluid.of('tfg:color_photographic_developer', 250))
	// 	.outputItem(TFC.isp.of('exposure:developed_color_film').simpleModifier('tfg:copy_nbt'))
	// 	.id('tfg:barrel/develop_color_film')

	// [PORT-Ф2] tfg:color_photographic_developer; [PORT-Ф4] tfg:copy_nbt
	// event.recipes.tfc.barrel_sealed(4000)
	// 	.inputs('exposure:high_sensitivity_color_film', Fluid.of('tfg:color_photographic_developer', 250))
	// 	.outputItem(TFC.isp.of('exposure:developed_color_film').simpleModifier('tfg:copy_nbt'))
	// 	.id('tfg:barrel/develop_high_sensitivity_color_film')

	// [PORT-Ф2] tfg:color_photographic_developer; [PORT-Ф4] gtceu:food_processor
	// event.recipes.gtceu.food_processor('color_film')
	// 	.itemInputs('exposure:color_film')
	// 	.inputFluids(Fluid.of('tfg:color_photographic_developer', 250))
	// 	.itemOutputs('exposure:developed_color_film')
	// 	.duration(60 * 20)
	// 	.EUt(2)

	// [PORT-Ф4] ISP-логика TFG core недоступна
	// $ISPRecipeLogic.RegisterRecipeData('food_processor/color_film',
	// 	[Ingredient.of('exposure:color_film')],
	// 	TFC.isp.of('exposure:developed_color_film').simpleModifier('tfg:copy_nbt').asCanonClass(),
	// 	[])

	// [PORT-Ф2] tfg:color_photographic_developer; [PORT-Ф4] gtceu:food_processor
	// event.recipes.gtceu.food_processor('high_sensitivity_color_film')
	// 	.itemInputs('exposure:high_sensitivity_color_film')
	// 	.inputFluids(Fluid.of('tfg:color_photographic_developer', 250))
	// 	.itemOutputs('exposure:developed_color_film')
	// 	.duration(60 * 20)
	// 	.EUt(2)

	// [PORT-Ф4] ISP-логика TFG core недоступна
	// $ISPRecipeLogic.RegisterRecipeData('food_processor/high_sensitivity_color_film',
	// 	[Ingredient.of('exposure:high_sensitivity_color_film')],
	// 	TFC.isp.of('exposure:developed_color_film').simpleModifier('tfg:copy_nbt').asCanonClass(),
	// 	[])
})
