// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.rubber.js (Ф4).
// Главные изменения 1.20→1.21:
//  - жидкости tfg:latex / tfg:vulcanized_latex / tfg:conifer_pitch — GT-материалы из startup
//    tfg.materials.primitive.js [PORT-CHECK: проверить наличие жидкостей в игре]
//  - afc tree_tapping: конструктор (result_fluid, input_block); TFC.blockIngredient →
//    TFC.ingredient.blockIngredient с реальными Block-объектами
//  - vintageimprovements → createvintageneoforged
//  - greate отсутствует — mixing вырезан [PORT]
//  - firmalife vat → event.custom (kubejs_tfc 2.0.1 не поддерживает схемы firmalife)
//  - теги в выходах GT-рецептов заменены на конкретные предметы

const $RubberRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $RubberRL = Java.loadClass('net.minecraft.resources.ResourceLocation');
const rubberBlock = (id) => $RubberRegistries.BLOCK.get($RubberRL.parse(id));

const RUBBER_VI_DURATION_MULTIPLIER = 4; // [PORT] global.VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER не задан в 1.21

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.rubber start')

	// [PORT-Ф2] Жидкости tfg:latex / tfg:conifer_pitch / tfg:vulcanized_latex регистрируются материалами
	// в startup tfg.materials.primitive.js, но диспетчер GTCEuStartupEvents (05_startup.dispatch.js)
	// отключён до принятия патченного GTM jar — жидкостей нет, рецепты на них валят весь handler.
	// Добавляются только при наличии жидкости.
	const hasTfgLatex = $RubberRegistries.FLUID.containsKey($RubberRL.parse('tfg:latex'))
	if (!hasTfgLatex) console.warn('[Gregnautics] [PORT-Ф2] жидкость tfg:latex не зарегистрирована — латексные рецепты пропущены')

	if (hasTfgLatex) { // [PORT-Ф2]
	// Tapping
	// [PORT-FIX] kubejs_tfc 2.0: tree_tapping(result_fluid, input_block); resultFluid() в схеме нет
	event.recipes.afc.tree_tapping(Fluid.of("tfg:latex", 2), TFC.ingredient.blockIngredient([rubberBlock("afc:wood/log/rubber_fig")]))
		.minTemp(4)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/latex/rubber_fig")
	event.recipes.afc.tree_tapping(Fluid.of("tfg:latex", 2), TFC.ingredient.blockIngredient([rubberBlock("afc:wood/log/ancient_rubber_fig")]))
		.minTemp(4)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/latex/ancient_rubber_fig")

	event.recipes.afc.tree_tapping(Fluid.of("tfg:latex", 3), TFC.ingredient.blockIngredient([rubberBlock("afc:wood/log/hevea")]))
		.minTemp(8)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/latex/hevea")
	event.recipes.afc.tree_tapping(Fluid.of("tfg:latex", 3), TFC.ingredient.blockIngredient([rubberBlock("afc:wood/log/ancient_hevea")]))
		.minTemp(8)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/latex/ancient_hevea")

	event.recipes.afc.tree_tapping(Fluid.of("tfg:latex", 4), TFC.ingredient.blockIngredient([rubberBlock("tfc:wood/log/kapok")]))
		.minTemp(12)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/kapok_latex")
	event.recipes.afc.tree_tapping(Fluid.of("tfg:latex", 4), TFC.ingredient.blockIngredient([rubberBlock("afc:wood/log/ancient_kapok")]))
		.minTemp(12)
		.requiresNaturalLog(true)
		.id("tfg:tree_tapping/ancient_kapok_latex")

	// Latex
	event.recipes.gtceu.extractor('latex_from_log')
		.itemInputs('#tfg:latex_logs')
		.outputFluids(Fluid.of('tfg:latex', 250))
		.duration(600)
		.EUt(20)

	event.recipes.gtceu.extractor('latex_from_sapling')
		.itemInputs('#tfg:rubber_saplings')
		.outputFluids(Fluid.of('tfg:latex', 100))
		.duration(750)
		.EUt(20)

	event.recipes.gtceu.extractor('latex_from_leaves')
		.itemInputs('#tfg:rubber_leaves')
		.outputFluids(Fluid.of('tfg:latex', 50))
		.duration(750)
		.EUt(20)


	// Vaccuming rubber wood stuff for latex
	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:latex', 100), { tag: 'tfg:latex_logs' }) // [PORT] vintageimprovements -> createvintageneoforged; {tag} вместо '#...'
		.processingTime(300 * RUBBER_VI_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/latex_from_rubber_logs')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:latex', 25), { tag: 'tfg:rubber_saplings' }) // [PORT]
		.processingTime(150 * RUBBER_VI_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/latex_from_rubber_sapling')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:latex', 10), { tag: 'tfg:rubber_leaves' }) // [PORT]
		.processingTime(75 * RUBBER_VI_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/latex_from_rubber_leaves')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:latex', 100), [{ tag: 'tfg:rubber_plants' }, 'tfc:powder/soda_ash', Fluid.of('tfc:salt_water', 50)]) // [PORT]
		.heated()
		.processingTime(20 * RUBBER_VI_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/latex_from_rubber_plants')
	} // [PORT-Ф2]


	if (hasTfgLatex) { // [PORT-Ф2]
	// Sticky resin
	event.recipes.tfc.pot('tfc:powder/wood_ash', Fluid.of('tfg:latex', 1000), 1200, 300)
		.itemOutput('gtceu:sticky_resin')
		.id('tfg:pot/sticky_resin_from_latex')

	event.recipes.tfc.pot('tfc:powder/wood_ash', Fluid.of('tfg:conifer_pitch', 1000), 1200, 300)
		.itemOutput('gtceu:sticky_resin')
		.id('tfg:pot/sticky_resin_from_conifer_pitch')

	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — vat через event.custom
	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "tfc:powder/wood_ash" },
		"input_fluid": { "amount": 1000, "fluid": "tfg:latex" },
		"output_item": { "id": "gtceu:sticky_resin" },
		"length": 600,
		"temperature": 300.0
	}).id('tfg:vat/latex_to_sticky_resin');

	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "tfc:powder/wood_ash" },
		"input_fluid": { "amount": 1000, "fluid": "tfg:conifer_pitch" },
		"output_item": { "id": "gtceu:sticky_resin" },
		"length": 600,
		"temperature": 300.0
	}).id('tfg:vat/conifer_pitch_to_sticky_resin');

	// [PORT] greate отсутствует в 1.21.1 — рецепты смешивания вырезаны
	// event.recipes.greate.mixing('gtceu:sticky_resin', [Fluid.of('tfg:latex', 1000), 'tfc:powder/wood_ash']) ...
	// event.recipes.greate.mixing('gtceu:sticky_resin', [Fluid.of('tfg:conifer_pitch', 1000), 'tfc:powder/wood_ash']) ...

	event.recipes.gtceu.fluid_solidifier('tfg:fluid_solidifier/latex_to_sticky_resin')
		.duration(12 * 20)
		.EUt(16)
		.itemInputs('tfc:powder/wood_ash')
		.itemOutputs('2x gtceu:sticky_resin')
		.inputFluids(Fluid.of('tfg:latex', 1000))

	event.recipes.gtceu.fluid_solidifier('tfg:fluid_solidifier/pitch_to_sticky_resin')
		.duration(12 * 20)
		.EUt(16)
		.itemInputs('tfc:powder/wood_ash')
		.itemOutputs('2x gtceu:sticky_resin')
		.inputFluids(Fluid.of('tfg:conifer_pitch', 1000))
	} // [PORT-Ф2]


	// Rubber
	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:rubber', 144), { tag: 'c:dusts/rubber' }) // [PORT] forge: -> c:
		.heated()
		.processingTime(50 * RUBBER_VI_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/rubber')

	// matches the sulfur dust + raw rubber recipe, just an alternative using powder
	event.recipes.gtceu.alloy_smelter('tfg:rubber_ingot_powder')
		.itemInputs('4x tfc:powder/sulfur', '3x #c:dusts/raw_rubber') // [PORT] forge: -> c:
		.itemOutputs('gtceu:rubber_ingot') // [PORT-FIX] тег в выходе -> конкретный предмет
		.duration(5 * 20)
		.EUt(7)

	if (hasTfgLatex) { // [PORT-Ф2]
	// Rubber Processing Line
	event.recipes.tfc.pot('tfc:powder/sulfur', Fluid.of('tfg:latex', 1000), 1200, 300)
		.fluidOutput(Fluid.of('tfg:vulcanized_latex', 1000))
		.id('tfg:pot/vulcanized_latex')

	// [PORT-FIX] firmalife vat через event.custom
	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "tfc:powder/sulfur" },
		"input_fluid": { "amount": 1000, "fluid": "tfg:latex" },
		"output_fluid": { "amount": 1000, "id": "tfg:vulcanized_latex" },
		"length": 300,
		"temperature": 300.0
	}).id('tfg:vat/vulcanized_latex')

	event.recipes.gtceu.chemical_reactor('tfg:latex_to_vulcanized_latex')
		.duration(100)
		.EUt(20)
		.itemInputs('tfc:powder/sulfur')
		.inputFluids(Fluid.of('tfg:latex', 1000))
		.outputFluids(Fluid.of('tfg:vulcanized_latex', 1000))

	// Raw rubber pulp
	event.recipes.createvintageneoforged.pressurizing('gtceu:raw_rubber_dust', Fluid.of('tfg:vulcanized_latex', 250)) // [PORT-FIX] тег в выходе -> конкретный предмет
		.heated()
		.processingTime(60 * RUBBER_VI_DURATION_MULTIPLIER)
		.id('tfg:vi/pressurizing/vulcanized_latex_to_raw_rubber')

	event.recipes.gtceu.fluid_solidifier('tfg:vulcanized_latex_to_raw_rubber_pulp')
		.duration(100)
		.EUt(20)
		.inputFluids(Fluid.of('tfg:vulcanized_latex', 1000))
		.itemOutputs('4x gtceu:raw_rubber_dust')
	} // [PORT-Ф2]


	event.recipes.gtceu.fluid_solidifier('tfg:solidify_glue')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.notConsumableItem('gtceu:ball_casting_mold') // [PORT-FIX] notConsumable(string) -> notConsumableItem
		.itemOutputs('tfc:glue')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.centrifuge('tfg:centrifuge_rosin')
		.itemInputs('tfg:conifer_rosin')
		.outputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('2x gtceu:carbon_dust') // [PORT-FIX] тег в выходе -> конкретный предмет
		.itemOutputs('4x gtceu:plant_ball')
		.chancedOutput('8x gtceu:plant_ball', 7500)
		.duration(20 * 20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.centrifuge('tfg:centrifuge_sticky_resin')
		.itemInputs('gtceu:sticky_resin')
		.outputFluids(Fluid.of('gtceu:glue', 100))
		.itemOutputs('3x gtceu:carbon_dust') // [PORT-FIX]
		.chancedOutput('gtceu:plant_ball', 5000)
		.duration(20 * 20)
		.EUt(GTValues.VA[GTValues.LV])

	if (hasTfgLatex) { // [PORT-Ф2]
	event.recipes.gtceu.chemical_reactor(`tfg:treat_latex_plants_into_latex`)
		.itemInputs('10x #tfg:rubber_plants', 'gtceu:tiny_sodium_hydroxide_dust')
		.circuit(1)
		.outputFluids(Fluid.of('tfg:latex', 1000))
		.duration(200)
		.EUt(20)
	} // [PORT-Ф2]


	event.recipes.gtceu.centrifuge('rubber_log_separation')
		.itemInputs('#tfg:latex_logs')
		.chancedOutput('gtceu:raw_rubber_dust', 5000)
		.chancedOutput('gtceu:plant_ball', 3750)
		.chancedOutput('gtceu:sticky_resin', 2500)
		.chancedOutput('gtceu:wood_dust', 2500)
		.outputFluids(Fluid.of('gtceu:methane', 60))
		.duration(20 * 20)
		.EUt(GTValues.VA[GTValues.MV])
})
