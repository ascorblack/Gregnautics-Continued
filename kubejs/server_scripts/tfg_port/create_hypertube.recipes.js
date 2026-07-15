"use strict";

// [PORT] Порт create_hypertube/recipes.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер registerCreateHypertubeRecipes() заменён на прямую регистрацию ServerEvents.recipes.
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port create_hypertube recipes start')

	// [PORT] В 0.5.0-ALPHA у мода появились новые рецепты (hypertube_funnel, hypertube_junction, tube_scanner sequenced_assembly) —
	// [PORT] event.remove({mod}) удалит и их; замен на GT-рецепты для них в оригинале не было (см. concerns).
	event.remove({ mod: 'create_hypertube' })

	event.recipes.gtceu.assembler('create_hypertube:hypertube')
		.itemInputs('2x #c:plates/stainless_steel', '4x ae2:quartz_glass') // [PORT] forge:plates -> c:plates
		.itemOutputs('8x create_hypertube:hypertube')
		.circuit(1)
		.EUt(GTValues.VA[GTValues.HV])
		.duration(50)
		.addMaterialInfo(true)

	event.recipes.gtceu.assembler('create_hypertube:entrance')
		.itemInputs('4x #c:plates/stainless_steel', 'create:smart_chute', 'gtceu:stainless_steel_gear', 'ae2:charged_certus_quartz_crystal') // [PORT] forge:plates -> c:plates; greate:stainless_steel_cogwheel отсутствует в сборке 1.21.1 -> заменено на gtceu:stainless_steel_gear
		.itemOutputs('create_hypertube:hypertube_entrance')
		.inputFluids(Fluid.of('gtceu:silicone_rubber', 288))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)
		.addMaterialInfo(true)

	event.recipes.gtceu.assembler('create_hypertube:entrance_sbr')
		.itemInputs('4x #c:plates/stainless_steel', 'create:smart_chute', 'gtceu:stainless_steel_gear', 'ae2:charged_certus_quartz_crystal') // [PORT] forge:plates -> c:plates; greate cogwheel -> gtceu gear
		.itemOutputs('create_hypertube:hypertube_entrance')
		.inputFluids(Fluid.of('gtceu:styrene_butadiene_rubber', 144))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)

	event.recipes.gtceu.assembler('create_hypertube:accelerator')
		.itemInputs('2x #c:plates/stainless_steel', 'gtceu:stainless_steel_gear', 'ae2:fluix_crystal') // [PORT] forge:plates -> c:plates; greate cogwheel -> gtceu gear
		.itemOutputs('create_hypertube:hypertube_accelerator')
		.inputFluids(Fluid.of('gtceu:silicone_rubber', 288))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)
		.addMaterialInfo(true)

	event.recipes.gtceu.assembler('create_hypertube:accelerator_sbr')
		.itemInputs('2x #c:plates/stainless_steel', 'gtceu:stainless_steel_gear', 'ae2:fluix_crystal') // [PORT] forge:plates -> c:plates; greate cogwheel -> gtceu gear
		.itemOutputs('create_hypertube:hypertube_accelerator')
		.inputFluids(Fluid.of('gtceu:styrene_butadiene_rubber', 144))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)

	event.recipes.gtceu.assembler('create_hypertube:redstone_detector_tube_attachment')
		.itemInputs('#c:plates/stainless_steel', 'gtceu:activity_detector_cover', 'ae2:charged_certus_quartz_crystal') // [PORT] forge:plates -> c:plates
		.itemOutputs('create_hypertube:redstone_detector_tube_attachment')
		.inputFluids(Fluid.of('gtceu:silicone_rubber', 288))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)

	event.recipes.gtceu.assembler('create_hypertube:redstone_detector_tube_attachment_sbr')
		.itemInputs('#c:plates/stainless_steel', 'gtceu:activity_detector_cover', 'ae2:charged_certus_quartz_crystal') // [PORT] forge:plates -> c:plates
		.itemOutputs('create_hypertube:redstone_detector_tube_attachment')
		.inputFluids(Fluid.of('gtceu:styrene_butadiene_rubber', 144))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)

	event.recipes.gtceu.assembler('create_hypertube:tube_scanner_attachment')
		.itemInputs('#c:plates/stainless_steel', 'gtceu:activity_detector_cover', 'ae2:fluix_crystal') // [PORT] forge:plates -> c:plates
		.itemOutputs('create_hypertube:tube_scanner_attachment')
		.inputFluids(Fluid.of('gtceu:silicone_rubber', 288))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)

	event.recipes.gtceu.assembler('create_hypertube:tube_scanner_attachment_sbr')
		.itemInputs('#c:plates/stainless_steel', 'gtceu:activity_detector_cover', 'ae2:fluix_crystal') // [PORT] forge:plates -> c:plates
		.itemOutputs('create_hypertube:tube_scanner_attachment')
		.inputFluids(Fluid.of('gtceu:styrene_butadiene_rubber', 144))
		.EUt(GTValues.VA[GTValues.HV])
		.duration(100)
})
