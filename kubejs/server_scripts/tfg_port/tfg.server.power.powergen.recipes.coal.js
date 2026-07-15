// priority: 0
"use strict";

// [PORT] Порт tfg/powergen/recipes.coal.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT] forge:tools/mortars -> c:tools/mortar (в GTM8 теги инструментов в ЕДИНСТВЕННОМ числе).
// [PORT] Мод beneath отсутствует в сборке 1.21.1 — рецепты с beneath:cursecoal (антрацит) вырезаны.
// [PORT-FIX] Выход рецепта тегом ('#forge:dusts/coal') в 1.21 не сериализуется — заменён на конкретный предмет gtceu:coal_dust.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.power powergen.recipes.coal start')

	// Lignite -> Coal dust
	event.shaped('gtceu:coal_dust', [
		'A',
		'B'
	], {
		A: 'tfc:ore/lignite',
		B: '#c:tools/mortar' // [PORT] forge:tools/mortars -> c:tools/mortar
	}).id('tfg:mortar/lignite')

	event.recipes.tfc.quern("gtceu:coal_dust", "tfc:ore/lignite")
		.id('tfg:quern/lignite');

	event.recipes.gtceu.macerator('tfg:lignite')
		.itemInputs('tfc:ore/lignite')
		.itemOutputs('gtceu:coal_dust') // [PORT-FIX] '#forge:dusts/coal' (тег в выходе) -> конкретный предмет
		.EUt(2)
		.duration(12)

	// Anthracite -> Coal dust

	// [PORT] Мод beneath отсутствует в сборке 1.21.1 (beneath:cursecoal):
	// event.shaped('2x gtceu:coal_dust', [
	// 	'A',
	// 	'B'
	// ], {
	// 	A: 'beneath:cursecoal',
	// 	B: '#c:tools/mortar'
	// }).id('tfg:mortar/anthracite')
	//
	// event.recipes.tfc.quern("2x gtceu:coal_dust", "beneath:cursecoal")
	// 	.id('tfg:quern/anthracite');
	//
	// event.recipes.gtceu.macerator('tfg:anthracite')
	// 	.itemInputs('beneath:cursecoal')
	// 	.itemOutputs('2x gtceu:coal_dust')
	// 	.EUt(2)
	// 	.duration(12)

	// Coke oven etc

	event.remove({ id: "gtceu:coke_oven/coal_to_coke_block" });

	event.recipes.gtceu.coke_oven("tfg:lignite_to_coke")
		.itemInputs('tfc:ore/lignite')
		.itemOutputs('1x gtceu:coke_gem')
		.outputFluids(Fluid.of('gtceu:creosote', 500))
		.duration(900)

	event.recipes.gtceu.coke_oven("tfg:coal_to_coke")
		.itemInputs('tfc:ore/bituminous_coal')
		.itemOutputs('2x gtceu:coke_gem')
		.outputFluids(Fluid.of('gtceu:creosote', 2000))
		.duration(900)

	event.recipes.gtceu.coke_oven("tfg:coal_block_to_coke_block")
		.itemInputs("minecraft:coal_block")
		.itemOutputs("2x gtceu:coke_block")
		.outputFluids(Fluid.of("gtceu:creosote", 18000))
		.duration(6000);

	event.recipes.gtceu.coke_oven("tfg:peat")
		.itemInputs('tfc:peat')
		.outputFluids(Fluid.of('gtceu:creosote', 1000))
		.duration(900)

	event.recipes.gtceu.pyrolyse_oven("tfg:rich_coal_to_tar")
		.itemInputs('3x tfc:ore/bituminous_coal')
		.chancedOutput('gtceu:dark_ash_dust', 5000)
		.outputFluids(Fluid.of('gtceu:coal_tar', 3000))
		.duration(288)
		.EUt(96)
		.circuit(8)

	event.remove({ id: 'gtceu:pyrolyse_oven/coal_to_coke_creosote' })
	event.remove({ id: 'gtceu:pyrolyse_oven/coal_to_coal_gas' })
	event.remove({ id: 'gtceu:pyrolyse_oven/coal_to_coke_creosote_nitrogen' })

	event.recipes.gtceu.pyrolyse_oven("tfg:rich_coal_to_coke_creosote")
		.itemInputs('8x tfc:ore/bituminous_coal')
		.itemOutputs('16x gtceu:coke_gem')
		.outputFluids(Fluid.of('gtceu:creosote', 8000))
		.duration(576)
		.EUt(64)
		.circuit(1)

	event.recipes.gtceu.pyrolyse_oven("tfg:coal_to_coal_gas")
		.itemInputs('8x tfc:ore/bituminous_coal')
		.itemOutputs('16x gtceu:coke_gem')
		.inputFluids(Fluid.of('gtceu:steam'))
		.outputFluids(Fluid.of('gtceu:coal_gas', 4000))
		.duration(288)
		.EUt(96)
		.circuit(22)

	event.recipes.gtceu.pyrolyse_oven("tfg:coal_to_coke_creosote_nitrogen")
		.itemInputs('8x tfc:ore/bituminous_coal')
		.itemOutputs('16x gtceu:coke_gem')
		.inputFluids(Fluid.of('gtceu:nitrogen'))
		.outputFluids(Fluid.of('gtceu:creosote', 8000))
		.duration(288)
		.EUt(96)
		.circuit(2)

	event.recipes.gtceu.pyrolyse_oven("tfg:raw_coal_to_tar")
		.itemInputs('6x tfc:ore/lignite')
		.chancedOutput('gtceu:dark_ash_dust', 5000)
		.outputFluids(Fluid.of('gtceu:coal_tar', 3000))
		.duration(288)
		.EUt(96)
		.circuit(8)

	event.recipes.gtceu.pyrolyse_oven("tfg:raw_coal_to_coke_creosote")
		.itemInputs('8x tfc:ore/lignite')
		.itemOutputs('8x gtceu:coke_gem')
		.outputFluids(Fluid.of('gtceu:creosote', 8000))
		.duration(576)
		.EUt(64)
		.circuit(1)

	event.recipes.gtceu.pyrolyse_oven("tfg:raw_coal_to_coal_gas")
		.itemInputs('8x tfc:ore/lignite')
		.itemOutputs('8x gtceu:coke_gem')
		.inputFluids(Fluid.of('gtceu:steam'))
		.outputFluids(Fluid.of('gtceu:coal_gas', 4000))
		.duration(288)
		.EUt(96)
		.circuit(22)

	event.recipes.gtceu.pyrolyse_oven("tfg:raw_coal_to_coke_creosote_nitrogen")
		.itemInputs('8x tfc:ore/lignite')
		.itemOutputs('8x gtceu:coke_gem')
		.inputFluids(Fluid.of('gtceu:nitrogen'))
		.outputFluids(Fluid.of('gtceu:creosote', 8000))
		.duration(288)
		.EUt(96)
		.circuit(2)
})
