"use strict";

// [PORT] Портировано из afc/recipes.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerAFCRecipes -> прямой обработчик ServerEvents.recipes (KubeJS 7: изолированные скоупы)

// [PORT-FIX] blockIngredient со строками не кодируется ("No such value") — нужны реальные Block-объекты
const $AfcRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $AfcRL = Java.loadClass('net.minecraft.resources.ResourceLocation');
const afcBlock = (id) => $AfcRegistries.BLOCK.get($AfcRL.parse(id));

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port afc recipes start')

	// #region Removes

	event.remove({ id: "afc:pot/rubber" })
	event.remove({ id: "afc:tree_tapping/hevea_latex" })
	event.remove({ id: "afc:tree_tapping/rubber_fig_latex" })
	event.remove({ id: "afc:crafting/1_birch_sugar" })
	event.remove({ id: "afc:crafting/1_maple_sugar" })
	event.remove({ id: "afc:crafting/0_birch_sugar_bucket" })
	event.remove({ id: "afc:crafting/0_maple_sugar_bucket" })


	// #endregion

	// [PORT] forge:ingots/copper -> c:ingots/copper
	event.recipes.tfc.anvil('afc:tree_tap', '#c:ingots/copper', ["hit_last", "upset_second_last", "upset_third_last"])
		.tier(1)
		// [PORT-FIX] kubejs_tfc 2.0: bonus() не существует; apply_bonus по умолчанию false — вызов убран
		.id('afc:anvil/tree_tap')

	event.recipes.gtceu.extruder('afc:tree_tap')
		.itemInputs('#c:ingots/copper') // [PORT] forge: -> c:
		.notConsumableItem('gtceu:bottle_extruder_mold') // [PORT-FIX] notConsumable(строка) не существует в GTKubeRecipe — notConsumableItem
		.itemOutputs('afc:tree_tap')
		.duration(50)
		.EUt(7)
		.addMaterialInfo(true)

	// TreeTap Heating
	event.recipes.tfc.heating('afc:tree_tap', 1080)
		.resultFluid(Fluid.of('gtceu:copper', 144))
		.id('tfg:heating/tree_tap')

	//Syrups
	event.remove({ id: "afc:tree_tapping/maple_syrup" })
	event.remove({ id: "afc:tree_tapping/birch_syrup" })

	// [PORT-FIX] kubejs_tfc 2.0: конструктор tree_tapping(result_fluid, input_block); resultFluid() в схеме нет
	// [PORT-FIX] kubejs_tfc 2.0.1: TFC.blockIngredient -> TFC.ingredient.blockIngredient (IngredientBindings, принимает Collection<Block>)
	event.recipes.afc.tree_tapping(Fluid.of('afc:maple_sap', 5), TFC.ingredient.blockIngredient([afcBlock('tfc:wood/log/maple')]))
		.minTemp(-15)
		.maxTemp(5)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/maple_log")

	// [PORT-FIX] kubejs_tfc 2.0: конструктор tree_tapping(result_fluid, input_block); resultFluid() в схеме нет
	// [PORT-FIX] kubejs_tfc 2.0.1: TFC.blockIngredient -> TFC.ingredient.blockIngredient (IngredientBindings, принимает Collection<Block>)
	event.recipes.afc.tree_tapping(Fluid.of('afc:birch_sap', 5), TFC.ingredient.blockIngredient([afcBlock('tfc:wood/log/birch')]))
		.minTemp(-15)
		.maxTemp(5)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/birch_log")

	//#region Extractor Recipe

	// Maple Syrup

	event.recipes.gtceu.extractor('maple_from_log')
		.itemInputs('#tfc:maple_logs')
		.outputFluids(Fluid.of('afc:maple_sap', 250))
		.duration(600)
		.EUt(20)

	event.recipes.gtceu.extractor('maple_from_sapling')
		.itemInputs('#tfg:maple_saplings')
		.outputFluids(Fluid.of('afc:maple_sap', 100))
		.duration(750)
		.EUt(20)

	event.recipes.gtceu.extractor('maple_from_leaves')
		.itemInputs('#tfg:maple_leaves')
		.outputFluids(Fluid.of('afc:maple_sap', 50))
		.duration(750)
		.EUt(20)

	// Birch Syrup

	event.recipes.gtceu.extractor('birch_from_log')
		.itemInputs('#tfc:birch_logs')
		.outputFluids(Fluid.of('afc:birch_sap', 250))
		.duration(600)
		.EUt(20)

	event.recipes.gtceu.extractor('birch_from_sapling')
		.itemInputs('tfc:wood/sapling/birch')
		.outputFluids(Fluid.of('afc:birch_sap', 100))
		.duration(750)
		.EUt(20)

	event.recipes.gtceu.extractor('birch_from_leaves')
		.itemInputs('tfc:wood/leaves/birch')
		.outputFluids(Fluid.of('afc:birch_sap', 50))
		.duration(750)
		.EUt(20)

	//#endregion

	// Из бревна капока / Logs Centrifuge

	event.recipes.gtceu.centrifuge('maple_syrup_log_separation')
		.itemInputs('#tfc:maple_logs')
		.chancedOutput('afc:maple_sugar', 7500)
		.chancedOutput('gtceu:plant_ball', 3750)
		// [PORT-Ф2] gtceu:hardwood_dust — материал TFG (Ф2): .chancedOutput('gtceu:hardwood_dust', 2500, 0)
		.outputFluids(Fluid.of('gtceu:methane', 60), Fluid.of('afc:maple_syrup', 100))
		.duration(20 * 20)
		.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.centrifuge('birch_syrup_log_separation')
		.itemInputs('#tfc:birch_logs')
		.chancedOutput('afc:birch_sugar', 7500)
		.chancedOutput('gtceu:plant_ball', 3750)
		// [PORT-Ф2] gtceu:hardwood_dust — материал TFG (Ф2): .chancedOutput('gtceu:hardwood_dust', 2500, 0)
		.outputFluids(Fluid.of('gtceu:methane', 60), Fluid.of('afc:birch_syrup', 100))
		.duration(20 * 20)
		.EUt(GTValues.VA[GTValues.MV])

	//#endregion

	//#region GT sap processing

	event.recipes.gtceu.fluid_heater('maple_sap_condense')
		.inputFluids(Fluid.of('afc:maple_sap', 1000))
		.outputFluids(Fluid.of('afc:maple_syrup', 100))
		.duration(20 * 25)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.fluid_heater('birch_sap_condense')
		.inputFluids(Fluid.of('afc:birch_sap', 1000))
		.outputFluids(Fluid.of('afc:birch_syrup', 100))
		.duration(20 * 35)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.fluid_solidifier('maple_syrup')
		.inputFluids(Fluid.of('afc:maple_syrup', 100))
		.itemOutputs('afc:maple_sugar')
		.duration(20 * 12)
		.EUt(GTValues.VHA[GTValues.ULV])

	event.recipes.gtceu.fluid_solidifier('birch_syrup')
		.inputFluids(Fluid.of('afc:birch_syrup', 100))
		.itemOutputs('afc:birch_sugar')
		.duration(20 * 12)
		.EUt(GTValues.VHA[GTValues.ULV])

	//#endregion


	// Syrup into sugar

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); inputFluid() в схеме нет
	event.recipes.tfc.barrel_sealed(Fluid.of('afc:maple_syrup', 100), 24000)
		.outputItem('afc:maple_sugar')
		.id('tfg:barrel/maple_syrup_to_sugar')

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); inputFluid() в схеме нет
	event.recipes.tfc.barrel_sealed(Fluid.of('afc:birch_syrup', 100), 24000)
		.outputItem('afc:birch_sugar')
		.id('tfg:barrel/birch_syrup_to_sugar')

	global.AFC_SAPLINGS.forEach(wood => {
		event.shaped(`4x afc:wood/fallen_leaves/${wood.sapling}`, [
			'AA',
			'AA'
		], {
			A: `afc:wood/leaves/${wood.sapling}`
		}).id(`tfg:shaped/afc/${wood.sapling}_leaves_to_fallen_leaves`);
	});
})
