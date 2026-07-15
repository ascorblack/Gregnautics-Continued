// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.wax.js (Ф4).
// Главные изменения 1.20→1.21:
//  - forge:wax → c:wax
//  - gtceu:oil_light → gtceu:light_oil (переименование в GTM8)
//  - afc tree_tapping: конструктор (result_fluid, input_block); блоки — реальные Block-объекты
//  - firmalife vat → event.custom (kubejs_tfc 2.0.1 не поддерживает схемы firmalife)

const $WaxRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $WaxRL = Java.loadClass('net.minecraft.resources.ResourceLocation');
const waxBlock = (id) => $WaxRegistries.BLOCK.get($WaxRL.parse(id));

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.wax start')

	//forge:wax
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({}, 'firmalife:beeswax', '#c:wax') // [PORT] forge:wax -> c:wax

	//paraffin
	event.recipes.gtceu.chemical_reactor('tfg:paraffin_wax_from_lubricant')
		.circuit(7)
		.itemOutputs('6x tfg:paraffin_wax')
		.outputFluids(Fluid.of('gtceu:light_oil', 25)) // [PORT-FIX] oil_light -> light_oil (GTM8)
		.inputFluids(Fluid.of('gtceu:lubricant', 250), Fluid.of('gtceu:acetone', 25))
		.duration(500)
		.EUt(GTValues.VA[GTValues.LV])

	// Tapping
	// [PORT-FIX] kubejs_tfc 2.0: tree_tapping(result_fluid, input_block); resultFluid() в схеме нет
	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 2), TFC.ingredient.blockIngredient([waxBlock("tfc:wood/log/aspen")]))
		.minTemp(-10)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/aspen_resin")
	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 2), TFC.ingredient.blockIngredient([waxBlock("afc:wood/log/ancient_aspen")]))
		.minTemp(-10)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/ancient_aspen_resin")

	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 4), TFC.ingredient.blockIngredient([waxBlock("tfc:wood/log/spruce")]))
		.minTemp(-15)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/spruce_resin")
	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 4), TFC.ingredient.blockIngredient([waxBlock("afc:wood/log/ancient_spruce")]))
		.minTemp(-15)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/ancient_spruce_resin")

	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 3), TFC.ingredient.blockIngredient([waxBlock("tfc:wood/log/white_cedar")]))
		.minTemp(-8)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/white_cedar_resin")
	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 3), TFC.ingredient.blockIngredient([waxBlock("afc:wood/log/ancient_white_cedar")]))
		.minTemp(-8)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/ancient_white_cedar_resin")

	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 2), TFC.ingredient.blockIngredient([waxBlock('tfc:wood/log/douglas_fir')]))
		.minTemp(-8)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/douglas_fir_resin")
	event.recipes.afc.tree_tapping(Fluid.of('tfg:conifer_pitch', 2), TFC.ingredient.blockIngredient([waxBlock("afc:wood/log/ancient_douglas_fir")]))
		.minTemp(-8)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/ancient_douglas_fir_resin")

	// Conifer Pitch
	event.recipes.gtceu.extractor('conifer_from_log')
		.itemInputs('#tfg:rosin_logs')
		.outputFluids(Fluid.of('tfg:conifer_pitch', 250))
		.duration(600)
		.EUt(20)

	event.recipes.gtceu.extractor('conifer_from_sapling')
		.itemInputs('#tfg:rosin_saplings')
		.outputFluids(Fluid.of('tfg:conifer_pitch', 100))
		.duration(750)
		.EUt(20)

	event.recipes.gtceu.extractor('conifer_from_leaves')
		.itemInputs('#tfg:rosin_leaves')
		.outputFluids(Fluid.of('tfg:conifer_pitch', 50))
		.duration(750)
		.EUt(20)

	event.recipes.gtceu.centrifuge('conifer_log_separation')
		.itemInputs('#tfg:rosin_logs')
		.chancedOutput('tfg:conifer_rosin', 7500)
		.chancedOutput('gtceu:plant_ball', 3750)
		.chancedOutput('gtceu:sticky_resin', 2500)
		.chancedOutput('gtceu:wood_dust', 2500)
		.outputFluids(Fluid.of('gtceu:methane', 60))
		.duration(20 * 20)
		.EUt(GTValues.VA[GTValues.MV])

	// Rosin
	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — vat через event.custom
	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "tfc:powder/charcoal" },
		"input_fluid": { "amount": 1000, "fluid": "tfg:conifer_pitch" },
		"output_item": { "id": "tfg:conifer_rosin" },
		"length": 600,
		"temperature": 300.0
	}).id('tfg:vat/conifer_pitch_to_rosin');

	event.recipes.tfc.pot('tfc:powder/charcoal', Fluid.of('tfg:conifer_pitch', 1000), 1200, 300)
		.itemOutput('tfg:conifer_rosin')
		.id('tfg:pot/conifer_pitch_to_rosin')

	event.recipes.gtceu.fluid_solidifier('tfg:pitch_to_rosin')
		.inputFluids(Fluid.of('tfg:conifer_pitch', 1000))
		.itemInputs('tfc:powder/charcoal')
		.itemOutputs('tfg:conifer_rosin')
		.duration(20 * 12)
		.EUt(GTValues.VA[GTValues.LV])

	//#region Wax Unification

	// Recipe Removals
	event.remove({ id: 'gtceu:extractor/extract_honeycomb_block' });
	event.remove({ id: 'gtceu:extractor/extract_honeycomb' });
	event.remove({ id: 'gtceu:extractor/extract_wax_dust' });

	// Extractor Recipe
	event.recipes.gtceu.extractor('tfg:wax_melting')
		.itemInputs(Ingredient.of('#c:wax')) // [PORT] forge:wax -> c:wax
		.outputFluids(Fluid.of('gtceu:wax', 144))
		.duration(20 * 5)
		.EUt(GTValues.VA[GTValues.LV])
		.category(GTRecipeCategories.EXTRACTOR_RECYCLING);

	event.recipes.gtceu.extractor('tfg:tiny_wax_dust_melting')
		.itemInputs(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Wax, 1))
		.outputFluids(Fluid.of('gtceu:wax', 16))
		.duration(10)
		.EUt(GTValues.VA[GTValues.LV])
		.category(GTRecipeCategories.EXTRACTOR_RECYCLING);

	event.recipes.gtceu.extractor('tfg:small_wax_dust_melting')
		.itemInputs(ChemicalHelper.get(TagPrefix.dustSmall, GTMaterials.Wax, 1))
		.outputFluids(Fluid.of('gtceu:wax', 36))
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])
		.category(GTRecipeCategories.EXTRACTOR_RECYCLING);

	//#endregion
})
