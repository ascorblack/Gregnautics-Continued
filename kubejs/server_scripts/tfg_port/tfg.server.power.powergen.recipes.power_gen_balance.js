// priority: 0
"use strict";

// [PORT] Порт tfg/powergen/recipes.power_gen_balance.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT] modid vintageimprovements -> createvintageneoforged.
// [PORT] Переименования жидкостей GTM8 (по kubejs/exported/registries/fluids.json):
// [PORT] oil_light -> light_oil, oil_medium -> raw_oil, oil_heavy -> heavy_oil (+ flowing_*).
// [PORT-FIX] .secondaryFluidOutput(0) — фича Vintage Improvements 1.20, в CVI 1.21 отсутствует
// [PORT-FIX] (схема createvintageneoforged:vacuumizing = create:base/processing_with_time) — убрано.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.power powergen.recipes.power_gen_balance start')

	//#region Buff fuels

	event.remove({ id: 'gtceu:combustion_generator/cetane_diesel' })
	event.recipes.gtceu.combustion_generator('tfg:cetane_boosted_diesel')
		.inputFluids(Fluid.of('gtceu:cetane_boosted_diesel', 1))
		.duration(20*1.6)
		.EUt(-32)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	//#endregion

	//#region Nerf/Removed

	event.remove({ id: 'gtceu:gas_turbine/benzene' })
	event.recipes.gtceu.gas_turbine('tfg:benzene')
		.inputFluids(Fluid.of('gtceu:benzene', 1))
		.duration(20*0.2)
		.EUt(-32)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.remove({ id: 'gtceu:gas_turbine/nitrobenzene' })
	event.recipes.gtceu.gas_turbine('tfg:nitrobenzene')
		.inputFluids(Fluid.of('gtceu:nitrobenzene', 1))
		.duration(20*0.5)
		.EUt(-32)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.remove({ id: 'gtceu:combustion_generator/naphtha' })
	event.recipes.gtceu.combustion_generator('tfg:naphtha')
		.inputFluids(Fluid.of('gtceu:naphtha', 1))
		.duration(20*0.1)
		.EUt(-32)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	// Remove Light fuel ability as a fuel

	event.remove({ id: 'gtceu:combustion_generator/sulfuric_light_fuel' })
	event.remove({ id: 'gtceu:combustion_generator/light_fuel' })


	// Make Diesel available at ULV and balance power gen

	event.remove({ id: 'gtceu:combustion_generator/diesel' })
	event.recipes.gtceu.combustion_generator('tfg:diesel')
		.inputFluids(Fluid.of('gtceu:diesel', 1))
		.duration(20*0.6)
		.EUt(-32)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.remove({ id: 'gtceu:mixer/diesel' })
	// [PORT] мод greate отсутствует в сборке 1.21.1 — удалять нечего:
	// event.remove({ id: 'greate:mixing/integration/gtceu/mixer/diesel' })
	event.recipes.gtceu.mixer('tfg:diesel')
		.inputFluids(Fluid.of('gtceu:light_fuel', 5000), Fluid.of('gtceu:heavy_fuel', 1000))
		.outputFluids(Fluid.of('gtceu:diesel', 6000))
		.duration(20*1.6)
		.EUt(GTValues.VA[GTValues.LV])

	// Oil to Light Fuel

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:light_fuel', 250), [Fluid.of('gtceu:oil', 1000)])
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/light_fuel_from_oil')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:light_fuel', 250), [Fluid.of('gtceu:flowing_oil', 1000)])
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/light_fuel_from_flowing_oil')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:light_fuel', 50), [Fluid.of('gtceu:light_oil', 1000)]) // [PORT] oil_light -> light_oil
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/light_fuel_from_light_oil')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:light_fuel', 50), [Fluid.of('gtceu:flowing_light_oil', 1000)]) // [PORT] flowing_oil_light -> flowing_light_oil
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/light_fuel_from_flowing_light_oil')

	// Raw Oil to Naphtha

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:naphtha', 500), [Fluid.of('gtceu:raw_oil', 1000)]) // [PORT] oil_medium -> raw_oil
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/light_fuel_from_raw_oil')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:naphtha', 500), [Fluid.of('gtceu:flowing_raw_oil', 1000)]) // [PORT] flowing_oil_medium -> flowing_raw_oil
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/light_fuel_from_flowing_raw_oil')

	// Heavy oil to Heavy Fuel

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:heavy_fuel', 750), [Fluid.of('gtceu:heavy_oil', 1000)]) // [PORT] oil_heavy -> heavy_oil
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/heavy_fuel_from_heavy_oil')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:heavy_fuel', 750), [Fluid.of('gtceu:flowing_heavy_oil', 1000)]) // [PORT] flowing_oil_heavy -> flowing_heavy_oil
		.processingTime(500)
		.heated()
		.id('tfg:vi/vacuumizing/heavy_fuel_from_flowing_heavy_oil')

	// Switch HOG to require IV Energy Hatch

	event.remove({ id: 'gtceu:large_chemical_reactor/high_octane_gasoline' })
	event.recipes.gtceu.large_chemical_reactor('tfg:high_octane_gasoline')
		.inputFluids(
			Fluid.of('gtceu:gasoline', 20000),
			Fluid.of('gtceu:octane', 2000),
			Fluid.of('gtceu:nitrous_oxide', 2000),
			Fluid.of('gtceu:toluene', 1000),
			Fluid.of('gtceu:ethyl_tertbutyl_ether', 1000))
		.outputFluids(Fluid.of('gtceu:high_octane_gasoline', 32000))
		.duration(20*1.5)
		.EUt(GTValues.VA[GTValues.LuV])
		.circuit(24)
})
