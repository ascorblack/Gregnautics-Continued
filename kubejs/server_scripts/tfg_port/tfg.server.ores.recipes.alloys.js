// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/ores_and_materials/recipes.alloys.js (registerTFGAlloyingRecipes).
// [PORT] KubeJS 7: прямая регистрация ServerEvents.recipes вместо диспетчера.
// [PORT] forge:* -> c:* (dusts/ingots остаются во мн. числе).
// [PORT] greate отсутствует в 1.21.1 — все greate.mixing-рецепты и их удаления закомментированы.
// [PORT-Ф2] weak_red_steel/weak_blue_steel dusts, tfg:tungsten_bismuth_oxide_composite_dust,
//           c:dusts/ostrum_iodide — кастомные GT-материалы TFG (Фаза 2 заблокирована апстримом).
// [PORT-Ф10] ostrum — материал ad_astra/космоса (Фаза 10).
// [PORT-FIX] ChemicalHelper.get(...) заменён на прямые id предметов (проверены по exported/registries).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.alloys start')

	// #region Colored steels

	event.replaceInput({ id: 'gtceu:shaped/lv_machine_hull' }, '#c:plates/wrought_iron', '#c:plates/red_steel') // [PORT-FIX] фильтр-объект вместо строки

	event.remove({ id: 'gtceu:electric_blast_furnace/blast_black_steel_gas' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_black_steel' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_red_steel_gas' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_red_steel' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_blue_steel_gas' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_blue_steel' })

	event.recipes.gtceu.electric_blast_furnace('blast_black_steel_gas_mv')
		.itemInputs('gtceu:black_steel_dust')
		.itemOutputs('tfc:metal/ingot/black_steel')
		.inputFluids(Fluid.of('gtceu:nitrogen', 1000))
		.duration(469)
		.circuit(2)
		.EUt(GTValues.VA[GTValues.MV])
		.blastFurnaceTemp(1000)

	event.recipes.gtceu.electric_blast_furnace('blast_black_steel_mv')
		.itemInputs('gtceu:black_steel_dust')
		.itemOutputs('tfc:metal/ingot/black_steel')
		.duration(700)
		.circuit(1)
		.EUt(GTValues.VA[GTValues.MV])
		.blastFurnaceTemp(1000)

	event.recipes.gtceu.electric_blast_furnace('blast_red_steel_gas_mv')
		.itemInputs('gtceu:red_steel_dust')
		.itemOutputs('tfc:metal/ingot/red_steel')
		.inputFluids(Fluid.of('gtceu:nitrogen', 1000))
		.duration(670)
		.circuit(2)
		.EUt(GTValues.VA[GTValues.MV])
		.blastFurnaceTemp(1000)

	event.recipes.gtceu.electric_blast_furnace('blast_red_steel_mv')
		.itemInputs('gtceu:red_steel_dust')
		.itemOutputs('tfc:metal/ingot/red_steel')
		.duration(1000)
		.circuit(1)
		.EUt(GTValues.VA[GTValues.MV])
		.blastFurnaceTemp(1000)

	event.recipes.gtceu.electric_blast_furnace('blast_blue_steel_gas_mv')
		.itemInputs('gtceu:blue_steel_dust')
		.itemOutputs('tfc:metal/ingot/blue_steel')
		.inputFluids(Fluid.of('gtceu:nitrogen', 1000))
		.duration(670)
		.circuit(2)
		.EUt(GTValues.VA[GTValues.MV])
		.blastFurnaceTemp(1000)

	event.recipes.gtceu.electric_blast_furnace('blast_blue_steel_mv')
		.itemInputs('gtceu:blue_steel_dust')
		.itemOutputs('tfc:metal/ingot/blue_steel')
		.duration(1000)
		.circuit(1)
		.EUt(GTValues.VA[GTValues.MV])
		.blastFurnaceTemp(1000)

	// [PORT] greate отсутствует: удаления greate:mixing/... не нужны
	// event.remove({ id: 'greate:mixing/integration/gtceu/mixer/red_steel' })
	// event.remove({ id: 'greate:mixing/integration/gtceu/mixer/blue_steel' })

	// [PORT] greate отсутствует; [PORT-Ф2] weak_red_steel/weak_blue_steel — GT-дасты этих
	// TFC-металлов регистрирует TFG-Core (Фаза 2). Все четыре greate.mixing-рецепта закомментированы:
	// event.recipes.greate.mixing('8x #forge:dusts/weak_red_steel', [...]).recipeTier(1).circuitNumber(2).id('tfg:weak_red_steel_greate')
	// event.recipes.greate.mixing('8x #forge:dusts/weak_blue_steel', [...]).recipeTier(1).circuitNumber(2).id('tfg:weak_blue_steel_greate')
	// event.recipes.greate.mixing('8x #forge:dusts/red_steel', [...]).recipeTier(2).circuitNumber(1).id('tfg:red_steel_greate')
	// event.recipes.greate.mixing('8x #forge:dusts/blue_steel', [...]).recipeTier(2).circuitNumber(1).id('tfg:blue_steel_greate')

	//#endregion

	//#region add regular furnace recipes for other tfc alloys

	event.remove({ id: 'gtceu:electric_blast_furnace/blast_bismuth_bronze' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_bismuth_bronze_gas' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_black_bronze' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_black_bronze_gas' })
	event.remove({ id: 'gtceu:vacuum_freezer/cool_hot_black_bronze_ingot' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_sterling_silver' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_sterling_silver_gas' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_rose_gold' })
	event.remove({ id: 'gtceu:electric_blast_furnace/blast_rose_gold_gas' })

	event.smelting('gtceu:bismuth_bronze_ingot', '#c:dusts/bismuth_bronze')
		.id('tfg:smelting/bismuth_bronze_ingot')
	event.smelting('gtceu:black_bronze_ingot', '#c:dusts/black_bronze')
		.id('tfg:smelting/black_bronze_ingot')
	event.smelting('gtceu:sterling_silver_ingot', '#c:dusts/sterling_silver')
		.id('tfg:smelting/sterling_silver_ingot')
	event.smelting('gtceu:rose_gold_ingot', '#c:dusts/rose_gold')
		.id('tfg:smelting/rose_gold_ingot')

	event.recipes.gtceu.alloy_blast_smelter('tfg:abs_bismuth_bronze')
		.itemInputs('1x gtceu:bismuth_dust', '3x gtceu:copper_dust', '1x gtceu:zinc_dust')
		.outputFluids(Fluid.of('gtceu:bismuth_bronze', 720))
		.circuit(4)
		.blastFurnaceTemp(1357)
		.duration(300)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.alloy_blast_smelter('tfg:abs_black_bronze')
		.itemInputs('3x gtceu:copper_dust', '1x gtceu:gold_dust', '1x gtceu:silver_dust')
		.outputFluids(Fluid.of('gtceu:black_bronze', 720))
		.circuit(4)
		.blastFurnaceTemp(1357)
		.duration(300)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('tfg:bismuth_bronze_from_raw')
		.itemInputs('1x gtceu:bismuth_dust', '3x gtceu:copper_dust', '1x gtceu:zinc_dust')
		.itemOutputs('5x gtceu:bismuth_bronze_dust')
		.circuit(2)
		.duration(100)
		.EUt(7)

	event.recipes.gtceu.mixer('tfg:black_bronze_from_raw')
		.itemInputs('3x gtceu:copper_dust', '1x gtceu:gold_dust', '1x gtceu:silver_dust')
		.itemOutputs('5x gtceu:black_bronze_dust')
		.circuit(2)
		.duration(100)
		.EUt(7)

	//#endregion

	// Rose Gold + Sterling Silver
	// [PORT-FIX] Ingredient.of(tag).withCount(n) заменён на строки 'Nx #tag' (KubeJS 7)
	const copper_types = [
		"#c:ingots/copper",
		"#c:dusts/copper",
		"#c:ingots/annealed_copper",
		"#c:dusts/annealed_copper"
	];
	const gold_types = [
		"#c:ingots/gold",
		"#c:dusts/gold"
	];
	const silver_types = [
		"#c:ingots/silver",
		"#c:dusts/silver"
	];

	copper_types.forEach(copper_type => {
		gold_types.forEach(gold_type => {
			const id = global.linuxUnfucker(`${copper_type}_and_${gold_type}`.replace(/#/g, ""));
			event.recipes.gtceu.alloy_smelter(`tfg:rose_gold_from_${id}`)
				.itemInputs(`1x ${copper_type}`, `4x ${gold_type}`)
				.itemOutputs('5x gtceu:rose_gold_ingot')
				.duration(20 * 10)
				.EUt(GTValues.VA[GTValues.LV])
		});
		silver_types.forEach(silver_type => {
			const id = global.linuxUnfucker(`${copper_type}_and_${silver_type}`.replace(/#/g, ""));
			event.recipes.gtceu.alloy_smelter(`tfg:sterling_silver_from_${id}`)
				.itemInputs(`1x ${copper_type}`, `4x ${silver_type}`)
				.itemOutputs('5x gtceu:sterling_silver_ingot')
				.duration(20 * 10)
				.EUt(GTValues.VA[GTValues.LV])
		});
	});

	event.remove({ id: 'gtceu:mixer/red_alloy' })
	// incorrect on purpose to prevent a greate duplicate recipe (the id becomes mixer/mixer/red_alloy)
	event.recipes.gtceu.mixer('gtceu:mixer/red_alloy')
		.itemInputs('1x gtceu:copper_dust', '4x minecraft:redstone')
		.itemOutputs('5x gtceu:red_alloy_dust')
		.circuit(2)
		.duration(100)
		.EUt(7)

	event.recipes.gtceu.centrifuge('red_alloy_separation')
		.itemInputs('5x gtceu:red_alloy_dust')
		.itemOutputs('1x gtceu:copper_dust', '4x minecraft:redstone')
		.duration(900)
		.EUt(30)

	event.recipes.gtceu.alloy_smelter('copper_dust_and_redstone_dust_into_red_alloy')
		.itemInputs('1x gtceu:copper_dust', '4x minecraft:redstone')
		.itemOutputs('5x gtceu:red_alloy_ingot')
		.duration(50)
		.EUt(16)

	event.recipes.gtceu.alloy_smelter('annealed_copper_dust_and_redstone_dust_into_red_alloy')
		.itemInputs('1x gtceu:annealed_copper_dust', '4x minecraft:redstone')
		.itemOutputs('5x gtceu:red_alloy_ingot')
		.duration(50)
		.EUt(16)

	event.recipes.gtceu.alloy_smelter('copper_ingot_and_redstone_dust_into_red_alloy')
		.itemInputs('1x minecraft:copper_ingot', '4x minecraft:redstone')
		.itemOutputs('5x gtceu:red_alloy_ingot')
		.duration(50)
		.EUt(16)

	event.recipes.gtceu.alloy_smelter('annealed_copper_ingot_and_redstone_dust_into_red_alloy')
		.itemInputs('1x gtceu:annealed_copper_ingot', '4x minecraft:redstone')
		.itemOutputs('5x gtceu:red_alloy_ingot')
		.duration(50)
		.EUt(16)

	event.remove({ id: 'gtceu:mixer/sterling_silver' })
	global.generateMixerRecipe(event, ['#c:dusts/copper', '4x #c:dusts/silver'], [], '5x gtceu:sterling_silver_dust',
		1, [], 500, 7, 64, 'gtceu:mixer/sterling_silver')

	event.remove({ id: 'gtceu:mixer/rose_gold' })
	global.generateMixerRecipe(event, ['#c:dusts/copper', '4x #c:dusts/gold'], [], '5x gtceu:rose_gold_dust',
		3, [], 500, 7, 64, 'gtceu:mixer/rose_gold')

	// Glowstone
	event.recipes.gtceu.mixer('tfg:lv_glowstone')
		.itemInputs('gtceu:gold_dust', 'minecraft:redstone', 'gtceu:sulfur_dust')
		.itemOutputs('2x minecraft:glowstone_dust')
		.circuit(8)
		.duration(1200)
		.EUt(30)

	event.recipes.gtceu.alloy_blast_smelter('tfg:liquid_glowstone')
		.itemInputs('10x #c:dusts/gold', '10x #c:dusts/redstone', '10x #c:dusts/sulfur')
		.outputFluids(Fluid.of('gtceu:glowstone', 2880))
		.circuit(9)
		.blastFurnaceTemp(1064)
		.duration(12000)
		.EUt(GTValues.VA[GTValues.LV])

	// [PORT-FIX] chancedOutput по тегу '#forge:dusts/ash' заменён на прямой id gtceu:ash_dust
	event.recipes.gtceu.implosion_compressor('tfg:glowstone_block_dynamite')
		.itemInputs('5x #c:dusts/glowstone', '2x gtceu:dynamite')
		.itemOutputs('1x minecraft:glowstone')
		.chancedOutput('gtceu:ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.implosion_compressor('tfg:glowstone_block_powderbarrel')
		.itemInputs('5x #c:dusts/glowstone', '8x gtceu:powderbarrel')
		.itemOutputs('1x minecraft:glowstone')
		.chancedOutput('gtceu:ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.implosion_compressor('tfg:glowstone_block_tnt')
		.itemInputs('5x #c:dusts/glowstone', '4x minecraft:tnt')
		.itemOutputs('1x minecraft:glowstone')
		.chancedOutput('gtceu:ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.implosion_compressor('tfg:glowstone_block_industrial_tnt')
		.itemInputs('5x #c:dusts/glowstone', '1x gtceu:industrial_tnt')
		.itemOutputs('1x minecraft:glowstone')
		.chancedOutput('gtceu:ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	// Cobalt brass dust from aluminium silicate
	// [PORT] greate отсутствует — рецепт закомментирован (стоковый gtceu-миксер cobalt_brass остаётся):
	// event.recipes.greate.mixing('9x #forge:dusts/cobalt_brass', [
	// 	'#forge:dusts/brass' x7, '#forge:dusts/aluminium_silicate', '#forge:dusts/cobalt'])
	// 	.recipeTier(0).circuitNumber(1).id('tfg:cobalt_brass_mixing')

	// New Alloys
	// [PORT-Ф2][PORT-Ф10] ostrum (ad_astra/космос, Ф10) и ostrum_iodide / tungsten_bismuth_oxide_composite
	// (кастомные GT-материалы TFG, Ф2) не зарегистрированы — рецепты закомментированы:
	// event.recipes.gtceu.mixer('tfg:ostrum_iodide')
	// 	.itemInputs('1x #forge:dusts/iodine', '2x #forge:dusts/ostrum')
	// 	.itemOutputs('3x #forge:dusts/ostrum_iodide')
	// 	.duration(20 * 12)
	// 	.circuit(1)
	// 	.EUt(GTValues.VA[GTValues.EV])
	//
	// event.recipes.gtceu.mixer('tfg:tungsten_bismuth_oxide_composite')
	// 	.itemInputs('2x #forge:dusts/bismuth', 'gtceu:tungsten_dust')
	// 	.inputFluids(Fluid.of('gtceu:oxygen', 3000))
	// 	.itemOutputs('3x tfg:tungsten_bismuth_oxide_composite_dust')
	// 	.duration(20 * 12)
	// 	.EUt(GTValues.VA[GTValues.EV])

	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.alloys done')
})
