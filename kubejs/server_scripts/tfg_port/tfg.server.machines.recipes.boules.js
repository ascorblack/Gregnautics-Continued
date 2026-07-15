// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.boules.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН:
//  - жидкости tfg:chlorosilane/trichlorosilane/dichlorosilane/silane/polysilicon — GT-материалы TFG
//    (tfg.materials.boules.js), регистрация заблокирована (05_startup.dispatch.js.disabled, апстрим-баг GTM8);
//  - предметы tfg:silicon_seed_crystal и tfg:quartz_crucible НЕ зарегистрированы в startup_scripts/tfg_port
//    ([PORT-Ф4-TODO]);
//  - тип рецептов gtceu:high_temperature_precision_fabricator — машина TFG, registerGTCEuRecipeTypes/
//    registerGTCEuMachines не вызываются ([PORT-Ф7]);
//  - тег #tfg:precision_fabricator_holder_rods нигде не наполняется.
// Удаления стоковых буль-рецептов EBF тоже закомментированы — стоковый путь GTM8 остаётся единственным.
// [PORT-FIX] на будущее включение: forge:->c:, .notConsumable('tfc:crucible') -> .notConsumableItem(...).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.boules start (disabled, Ф2/Ф7)')

	// [PORT-Ф2] --- начало отключённого блока (оригинал сохранён, теги переведены на c:) ---

	// Silicon seed crystal

	// event.recipes.gtceu.chemical_reactor('tfg:chlorosilanes')
	// 	.itemInputs('4x #c:dusts/silicon')
	// 	.inputFluids('gtceu:hydrochloric_acid 6000', 'gtceu:hydrogen 4000')
	// 	.outputFluids('tfg:chlorosilane 3000', 'tfg:trichlorosilane 1000')
	// 	.circuit(1)
	// 	.duration(3 * 20)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// event.recipes.gtceu.chemical_reactor('tfg:silane')
	// 	.inputFluids('tfg:chlorosilane 3000', 'tfg:trichlorosilane 1000')
	// 	.outputFluids('tfg:dichlorosilane 3000', 'tfg:silane 1000')
	// 	.duration(3 * 20)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// event.recipes.gtceu.large_chemical_reactor('tfg:silane_shortcut')
	// 	.itemInputs('4x #c:dusts/silicon')
	// 	.inputFluids('gtceu:hydrochloric_acid 6000', 'gtceu:hydrogen 4000')
	// 	.outputFluids('tfg:dichlorosilane 3000', 'tfg:silane 1000')
	// 	.circuit(2)
	// 	.duration(5 * 20)
	// 	.EUt(GTValues.VHA[GTValues.HV])

	// event.recipes.gtceu.electrolyzer('tfg:silane_decomp')
	// 	.inputFluids('tfg:silane 1000')
	// 	.outputFluids('gtceu:hydrogen 4000')
	// 	.itemOutputs('#c:dusts/polysilicon')
	// 	.duration(3 * 20)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.autoclave('tfg:silicon_seed_crystal')
	// 	.itemInputs('#c:dusts/polysilicon')
	// 	.inputFluids('minecraft:water 250')
	// 	.chancedOutput('tfg:silicon_seed_crystal', 7500, 0)
	// 	.duration(30 * 20)
	// 	.EUt(24)

	// event.recipes.gtceu.autoclave('tfg:silicon_seed_crystal_distilled')
	// 	.itemInputs('#c:dusts/polysilicon')
	// 	.inputFluids('gtceu:distilled_water 50')
	// 	.itemOutputs('tfg:silicon_seed_crystal')
	// 	.duration(15 * 20)
	// 	.EUt(24)

	// Crucible

	// event.recipes.gtceu.arc_furnace('tfg:quartz_crucible')
	// 	.itemInputs('5x #c:dusts/quartzite')
	// 	.notConsumableItem('tfc:crucible') // [PORT-FIX] .notConsumable -> .notConsumableItem
	// 	.itemOutputs('tfg:quartz_crucible')
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// event.recipes.gtceu.arc_furnace('tfg:quartz_crucible_nether')
	// 	.itemInputs('5x #c:dusts/nether_quartz')
	// 	.notConsumableItem('tfc:crucible') // [PORT-FIX]
	// 	.itemOutputs('tfg:quartz_crucible')
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// Boules

	// [PORT-Ф7] gtceu:high_temperature_precision_fabricator — тип рецептов/машина TFG не зарегистрированы
	// event.recipes.gtceu.high_temperature_precision_fabricator('tfg:silicon_boule')
	// 	.chancedInput('tfg:quartz_crucible', 500, 0) // 5% chance
	// 	.itemInputs('1x tfg:silicon_seed_crystal', '#c:small_dusts/gallium_arsenide', '#tfg:precision_fabricator_holder_rods')
	// 	.inputFluids(Fluid.of('tfg:polysilicon', 32 * 144))
	// 	.itemOutputs('gtceu:silicon_boule')
	// 	.circuit(1)
	// 	.duration(450 * 20)
	// 	.addData("ebf_temp", 1784)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.high_temperature_precision_fabricator('tfg:silicon_boule_cleanroom')
	// 	.chancedInput('tfg:quartz_crucible', 500, 0) // 5% chance
	// 	.itemInputs('1x tfg:silicon_seed_crystal', '#c:small_dusts/gallium_arsenide', '#tfg:precision_fabricator_holder_rods')
	// 	.inputFluids(Fluid.of('tfg:polysilicon', 32 * 144))
	// 	.itemOutputs('gtceu:silicon_boule')
	// 	.circuit(2)
	// 	// Duration discount if in a cleanroom
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.duration(300 * 20)
	// 	.addData("ebf_temp", 1784)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.high_temperature_precision_fabricator('tfg:phosphorus_boule')
	// 	.chancedInput('tfg:quartz_crucible', 2000, 0) // 20% chance
	// 	.itemInputs('4x tfg:silicon_seed_crystal', '8x #c:dusts/phosphorus', '2x #c:small_dusts/gallium_arsenide', '#tfg:precision_fabricator_holder_rods')
	// 	.inputFluids(Fluid.of('tfg:polysilicon', 64 * 144), 'gtceu:nitrogen 8000')
	// 	.itemOutputs('gtceu:phosphorus_boule')
	// 	.circuit(3)
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.duration(600 * 20)
	// 	.addData("ebf_temp", 2484)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// event.recipes.gtceu.high_temperature_precision_fabricator('tfg:naquadah_boule')
	// 	.chancedInput('tfg:quartz_crucible', 5000, 0) // 50% chance
	// 	.itemInputs('8x tfg:silicon_seed_crystal', '#c:dusts/gallium_arsenide', '#tfg:precision_fabricator_holder_rods')
	// 	.inputFluids(Fluid.of('tfg:polysilicon', 128 * 144), 'gtceu:naquadah 144', 'gtceu:argon 8000')
	// 	.itemOutputs('gtceu:naquadah_boule')
	// 	.circuit(4)
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.duration(750 * 20)
	// 	.addData("ebf_temp", 5400)
	// 	.EUt(GTValues.VA[GTValues.EV])

	// event.recipes.gtceu.high_temperature_precision_fabricator('tfg:neutronium_boule')
	// 	.chancedInput('tfg:quartz_crucible', 9900, 0) // 99% chance
	// 	.itemInputs('tfg:silicon_seed_crystal', '2x #c:dusts/gallium_arsenide', '#tfg:precision_fabricator_holder_rods')
	// 	.inputFluids(Fluid.of('tfg:polysilicon', 256 * 144), Fluid.of('gtceu:neutronium', 144 * 4), 'gtceu:xenon 8000')
	// 	.itemOutputs('gtceu:neutronium_boule')
	// 	.circuit(5)
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.duration(900 * 20)
	// 	.addData("ebf_temp", 6484)
	// 	.EUt(GTValues.VA[GTValues.IV])

	// [PORT-Ф2] Замены заблокированы — стоковые EBF-рецепты буль остаются
	// event.remove({ id: 'gtceu:electric_blast_furnace/silicon_boule' })
	// event.remove({ id: 'gtceu:electric_blast_furnace/phosphorus_boule' })
	// event.remove({ id: 'gtceu:electric_blast_furnace/naquadah_boule' })
	// event.remove({ id: 'gtceu:electric_blast_furnace/neutronium_boule' })

	// [PORT-Ф2] --- конец отключённого блока ---
})
