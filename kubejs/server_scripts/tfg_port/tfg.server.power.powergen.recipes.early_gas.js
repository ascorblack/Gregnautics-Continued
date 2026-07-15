// priority: 0
"use strict";

// [PORT] Порт tfg/powergen/recipes.early_gas.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT-Ф2] Практически вся линия Syngas/Reformate/BTX завязана на GT-материалы TFG
// [PORT-Ф2] (tfg:syngas, tfg:raw_aromatic_mix, tfg:reformate_gas, tfg:btx_fuel, tfg:sodium_silicate,
// [PORT-Ф2] tfg:tpaoh, tfg:zsm5_gel, tfg:leachate и т.д. — определены в startup_scripts/tfg_port/tfg.materials.power_rework.js),
// [PORT-Ф2] а также на элемент rhenium (gtceu:rhenium_dust отсутствует в реестре). Система материалов Ф2
// [PORT-Ф2] отключена (05_startup.dispatch.js.disabled) — эти блоки закомментированы и ждут разблокировки Ф2.
// [PORT-Ф4] Тип рецептов coal_liquefaction_tower определён в gtceu.recipe_types.js, но диспетчер отключён —
// [PORT-Ф4] тип не регистрируется, машины Ф4 не портированы.
// [PORT] Мод beneath (beneath:cursecoal) отсутствует; vintageimprovements -> createvintageneoforged.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.power powergen.recipes.early_gas start')

	// [PORT] const $ChanceLogic = Java.loadClass(...) — в оригинале не использовался, убран
	// [PORT] (KubeJS 7: Java.loadClass допустим только на верхнем уровне файла).

	// New Fuels

	//#region Syngas

	// [PORT-Ф2] tfg:syngas — GT-материал TFG, система материалов Ф2 отключена. Весь регион закомментирован
	// [PORT] (vintageimprovements -> createvintageneoforged; .secondaryFluidOutput() в CVI 1.21 отсутствует — убрать при раскомментировании):
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:syngas', 100), ['minecraft:charcoal', Fluid.of('gtceu:creosote', 250)])
	// 	.processingTime(4000)
	// 	.heated()
	// 	.id('tfg:vi/vacuumizing/syngas_from_charcoal')
	//
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:syngas', 200), ['tfc:ore/lignite', Fluid.of('gtceu:creosote', 250)])
	// 	.processingTime(4000)
	// 	.heated()
	// 	.id('tfg:vi/vacuumizing/syngas_from_lignite')
	//
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:syngas', 400), ['tfc:ore/bituminous_coal', Fluid.of('gtceu:creosote', 250)])
	// 	.processingTime(4000)
	// 	.heated()
	// 	.id('tfg:vi/vacuumizing/syngas_from_bituminous_coal')
	//
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:syngas', 400), ['gtceu:coke_gem', Fluid.of('gtceu:creosote', 250)])
	// 	.processingTime(4000)
	// 	.heated()
	// 	.id('tfg:vi/vacuumizing/syngas_from_coke')
	//
	// [PORT] beneath отсутствует:
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:syngas', 400), ['beneath:cursecoal', Fluid.of('gtceu:creosote', 250)])
	// 	.processingTime(4000)
	// 	.heated()
	// 	.id('tfg:vi/vacuumizing/syngas_from_anthracite')
	//
	// event.recipes.gtceu.brewery('tfg:syngas_from_charcoal')
	// 	.itemInputs('minecraft:charcoal')
	// 	.inputFluids('gtceu:creosote 250')
	// 	.outputFluids('tfg:syngas 100')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VHA[GTValues.LV])
	//
	// event.recipes.gtceu.brewery('tfg:syngas_from_lignite')
	// 	.itemInputs('tfc:ore/lignite')
	// 	.inputFluids('gtceu:creosote 250')
	// 	.outputFluids('tfg:syngas 200')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VHA[GTValues.LV])
	//
	// event.recipes.gtceu.brewery('tfg:syngas_from_bituminous_coal')
	// 	.itemInputs('tfc:ore/bituminous_coal')
	// 	.inputFluids('gtceu:creosote 250')
	// 	.outputFluids('tfg:syngas 400')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VHA[GTValues.LV])
	//
	// event.recipes.gtceu.brewery('tfg:syngas_from_coke')
	// 	.itemInputs('gtceu:coke_gem')
	// 	.inputFluids('gtceu:creosote 250')
	// 	.outputFluids('tfg:syngas 400')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VHA[GTValues.LV])
	//
	// [PORT] beneath отсутствует:
	// event.recipes.gtceu.brewery('tfg:syngas_from_anthracite')
	// 	.itemInputs('beneath:cursecoal')
	// 	.inputFluids('gtceu:creosote 250')
	// 	.outputFluids('tfg:syngas 400')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VHA[GTValues.LV])

	//#endregion

	//#region Reformate Gas

	// [PORT-Ф2]/[PORT-Ф4] coal_liquefaction_tower (тип не зарегистрирован) + жидкости tfg:* (материалы Ф2).
	// Весь регион закомментирован:

	// Charcoal

	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_charcoal')
	// 	.itemInputs(Item.of('minecraft:charcoal', 40))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 500), Fluid.of('tfg:syngas', 4400), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*64)
	// 	.circuit(1)
	// 	.EUt(GTValues.VHA[GTValues.MV])
	//
	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_charcoal_hydrogen')
	// 	.itemInputs(Item.of('minecraft:charcoal', 40))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.perTick(true)
	// 	.chancedFluidInput(Fluid.of('gtceu:hydrogen', 1), 1000, 0)
	// 	.perTick(false)
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 500), Fluid.of('tfg:syngas', 4400), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*32)
	// 	.circuit(2)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// Lignite

	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_lignite')
	// 	.itemInputs(Item.of('tfc:ore/lignite', 10))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 1000), Fluid.of('tfg:syngas', 6400), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*64)
	// 	.circuit(1)
	// 	.EUt(GTValues.VHA[GTValues.MV])
	//
	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_lignite_hydrogen')
	// 	.itemInputs(Item.of('tfc:ore/lignite', 10))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.perTick(true)
	// 	.chancedFluidInput(Fluid.of('gtceu:hydrogen', 1), 1000, 0)
	// 	.perTick(false)
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 1000), Fluid.of('tfg:syngas', 6400), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*32)
	// 	.circuit(2)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// Bituminous Coal

	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_bituminous')
	// 	.itemInputs(Item.of('tfc:ore/bituminous_coal', 10))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 1000), Fluid.of('tfg:syngas', 9600), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*64)
	// 	.circuit(1)
	// 	.EUt(GTValues.VHA[GTValues.MV])
	//
	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_bituminous_hydrogen')
	// 	.itemInputs(Item.of('tfc:ore/bituminous_coal', 10))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.perTick(true)
	// 	.chancedFluidInput(Fluid.of('gtceu:hydrogen', 1), 1000, 0)
	// 	.perTick(false)
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 1000), Fluid.of('tfg:syngas', 9600), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*32)
	// 	.circuit(2)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// Coke

	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_coke')
	// 	.itemInputs(Item.of('gtceu:coke_gem', 8))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 2000), Fluid.of('tfg:syngas', 12800), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*64)
	// 	.circuit(1)
	// 	.EUt(GTValues.VHA[GTValues.MV])
	//
	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_coke_hydrogen')
	// 	.itemInputs(Item.of('gtceu:coke_gem', 8))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.perTick(true)
	// 	.chancedFluidInput(Fluid.of('gtceu:hydrogen', 1), 1000, 0)
	// 	.perTick(false)
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 2000), Fluid.of('tfg:syngas', 12800), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*32)
	// 	.circuit(2)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// Anthracite

	// [PORT] beneath отсутствует:
	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_anthracite')
	// 	.itemInputs(Item.of('beneath:cursecoal', 5))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 2000), Fluid.of('tfg:syngas', 12800), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*64)
	// 	.circuit(1)
	// 	.EUt(GTValues.VHA[GTValues.MV])
	//
	// event.recipes.gtceu.coal_liquefaction_tower('tfg:raw_aromatic_mix_anthracite_hydrogen')
	// 	.itemInputs(Item.of('beneath:cursecoal', 5))
	// 	.inputFluids(Fluid.of('gtceu:creosote', 4000))
	// 	.perTick(true)
	// 	.chancedFluidInput(Fluid.of('gtceu:hydrogen', 1), 1000, 0)
	// 	.perTick(false)
	// 	.outputFluids(Fluid.of('gtceu:coal_tar', 2000), Fluid.of('tfg:syngas', 12800), Fluid.of('tfg:raw_aromatic_mix', 4000))
	// 	.duration(20*32)
	// 	.circuit(2)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// Aromatic Processing

	// [PORT-Ф2] tfg:raw_aromatic_mix / tfg:aromatic_feedstock — материалы Ф2:
	// event.recipes.gtceu.chemical_reactor('tfg:aromatic_feedstock')
	// 	.inputFluids(Fluid.of('tfg:raw_aromatic_mix', 4000), Fluid.of('gtceu:benzene', 525), Fluid.of('gtceu:steam', 1000))
	// 	.outputFluids(Fluid.of('tfg:aromatic_feedstock', 2000))
	// 	.duration(20*30)
	// 	.EUt(GTValues.VA[GTValues.LV])
	//
	// [PORT-Ф2] + gtceu:tiny_rhenium_dust отсутствует (элемент rhenium — часть Ф2):
	// event.recipes.gtceu.chemical_reactor('tfg:reformed_aromatic_feedstock')
	// 	.chancedInput(Item.of('gtceu:tiny_rhenium_dust'), 1000, 0) // 10% chance
	// 	.inputFluids(Fluid.of('tfg:aromatic_feedstock', 2000))
	// 	.outputFluids(Fluid.of('tfg:reformed_aromatic_feedstock', 2000))
	// 	.duration(20*18)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// Reformate Gas Alternative Step

	// [PORT-Ф2]:
	// event.recipes.gtceu.cracker('tfg:reformate_gas_cracker')
	// 	.inputFluids(Fluid.of('tfg:reformed_aromatic_feedstock', 2000), Fluid.of('gtceu:steam', 4000))
	// 	.outputFluids(Fluid.of('tfg:reformate_gas', 8000))
	// 	.outputFluids(Fluid.of('tfg:cracker_off_gas', 1000))
	// 	.duration(20*16)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.chemical_reactor('tfg:reformate_gas')
	// 	.inputFluids(Fluid.of('tfg:reformed_aromatic_feedstock', 2000), Fluid.of('gtceu:steam', 1000))
	// 	.outputFluids(Fluid.of('tfg:reformate_gas', 3000))
	// 	.duration(20*16)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// Recycling

	// [PORT-Ф2] tfg:cracker_off_gas + rhenium:
	// event.recipes.gtceu.electrolyzer('tfg:cracker_off_gas_recycling')
	// 	.inputFluids(Fluid.of('tfg:cracker_off_gas', 1000))
	// 	.outputFluids(Fluid.of('gtceu:carbon_dioxide', 500), Fluid.of('gtceu:hydrogen', 500))
	// 	.chancedOutput(Item.of('gtceu:tiny_rhenium_dust'), 1000, 0) // 10% chance SWITCH TO 5% when new platline is out
	// 	.duration(20*4.5)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// Modify Recipe to balance new line

	event.remove({ id: 'gtceu:extractor/charcoal_extraction' })
	/*
	event.recipes.gtceu.extractor('tfg:charcoal_extraction')
		.itemInputs(Item.of('minecraft:charcoal'))
		.outputFluids(Fluid.of('gtceu:wood_tar', 100))
		.duration(20*6.4)
		.EUt(GTValues.VA[GTValues.MV])*/

	//#endregion

	// Increase Pyrolyse Oven duration

	// [PORT-FIX] global.modifyRecipe отсутствует в портированных startup-скриптах — переписано
	// через JSON-пересборку (event.custom + remove), по образцу create.recipes.js этого порта.
	// [PORT-CHECK] структура JSON GT-рецептов могла измениться — обёрнуто в try/catch, проверить в игре.
	function modifyRecipes(recipeIds, duration) {
		recipeIds.forEach(id => {
			let found = false
			event.forEachRecipe({ id: id }, recipe => {
				try {
					let obj = JSON.parse(String(recipe.json))
					obj.duration = duration
					event.custom(obj).id(`tfg:${global.linuxUnfucker(id)}`)
					found = true
				} catch (e) {
					console.warn(`[Gregnautics] [PORT-CHECK] pyrolyse duration modify failed for ${id}: ${e}`)
				}
			})
			if (found) event.remove({ id: id })
			else console.warn(`[Gregnautics] [PORT-CHECK] pyrolyse recipe not found: ${id}`)
		})
	}

	modifyRecipes([
		"gtceu:pyrolyse_oven/log_to_creosote_nitrogen",
		"gtceu:pyrolyse_oven/log_to_wood_tar_nitrogen"
	], 20 * 32)

	modifyRecipes([
		"gtceu:pyrolyse_oven/log_to_creosote",
		"gtceu:pyrolyse_oven/log_to_wood_tar"
	], 20 * 64)

	//#region Power Gen

	// Add Syngas

	// [PORT-Ф2] tfg:syngas / tfg:reformate_gas / tfg:btx_fuel — материалы Ф2:
	// event.recipes.gtceu.gas_turbine('tfg:syngas') // Gas Turbine
	// 	.inputFluids(Fluid.of('tfg:syngas', 1))
	// 	.EUt(-(32))
	// 	.duration(20*0.2)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')

	// Reformate Gas

	// event.recipes.gtceu.gas_turbine('tfg:reformate_gas') // Gas Turbine
	// 	.inputFluids(Fluid.of('tfg:reformate_gas', 1))
	// 	.EUt(-(32))
	// 	.duration(20*0.6)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')

	// BTX Fuel

	// event.recipes.gtceu.gas_turbine('tfg:btx_fuel') // Gas Turbine
	// 	.inputFluids(Fluid.of('tfg:btx_fuel', 1))
	// 	.EUt(-(32))
	// 	.duration(20*2.86)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')

	//#endregion

	// Process Syngas

	// [PORT-Ф2] tfg:syngas ([PORT-FIX] при раскомментировании: .notConsumable(Item.of(...)) -> .notConsumableItem(...)):
	// event.recipes.gtceu.chemical_reactor('tfg:electrolyze_syngas')
	// 	.notConsumableItem(Item.of('gtceu:copper_dust', 1))
	// 	.inputFluids(Fluid.of('tfg:syngas', 1000))
	// 	.outputFluids(Fluid.of('gtceu:methanol', 3000), Fluid.of('minecraft:water', 2000))
	// 	.duration(20*12)
	// 	.EUt(GTValues.VA[GTValues.MV])

	//#region BTX Fuel

	// ZSM - 5

	// [PORT-Ф2] tfg:sodium_silicate / tfg:sodium_aluminium / tfg:tpaoh / tfg:zsm5_gel + rhenium — материалы Ф2.
	// Весь регион ZSM-5 закомментирован:
	// event.recipes.gtceu.chemical_reactor('tfg:sodium_silicate')
	// 	.itemInputs(Item.of('#c:dusts/nether_quartz')) // [PORT] forge: -> c:
	// 	.inputFluids(Fluid.of('tfc:lye', 1000))
	// 	.outputFluids(Fluid.of('tfg:sodium_silicate', 1000))
	// 	.duration(20*26)
	// 	.EUt(GTValues.VA[GTValues.LV])
	//
	// event.recipes.gtceu.chemical_reactor('tfg:sodium_aluminum')
	// 	.itemInputs(Item.of('#c:dusts/aluminium'))
	// 	.inputFluids(Fluid.of('tfc:lye', 1000))
	// 	.itemOutputs(Item.of('#c:dusts/sodium_aluminium', 1)) // [PORT-FIX] тег в выходе -> заменить на конкретный предмет при раскомментировании
	// 	.duration(8)
	// 	.EUt(GTValues.VA[GTValues.EV])
	//
	// event.recipes.gtceu.chemical_reactor('tfg:tpaoh')
	// 	.itemInputs(Item.of('2x #c:dusts/sodium'))
	// 	.inputFluids(Fluid.of('gtceu:ammonia', 1000), Fluid.of('gtceu:ethanol', 1000))
	// 	.outputFluids(Fluid.of('tfg:tpaoh', 1000))
	// 	.duration(20*8)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.chemical_reactor('tfg:zsm_5_gel')
	// 	.itemInputs(Item.of('#c:dusts/sodium_aluminium'))
	// 	.inputFluids(Fluid.of('tfg:tpaoh', 12000))
	// 	.inputFluids(Fluid.of('tfg:sodium_silicate', 5000))
	// 	.outputFluids(Fluid.of('tfg:zsm5_gel', 1000))
	// 	.duration(20*16)
	// 	.EUt(GTValues.VA[GTValues.HV])
	//
	// event.recipes.gtceu.chemical_reactor('tfg:catalyser_zsm')
	// 	.itemInputs(Item.of('#c:dusts/platinum'), Item.of('60x #c:dusts/rhenium'))
	// 	.inputFluids(Fluid.of('gtceu:hydrogen', 1000))
	// 	.inputFluids(Fluid.of('tfg:zsm5_gel', 1000))
	// 	.itemOutputs(Item.of('tfg:catalyser_pt_re_zsm', 1))
	// 	.duration(20*60)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// BTX

	event.recipes.gtceu.distillation_tower('tfg:methanol_distil_propylene')
		.inputFluids(Fluid.of('gtceu:methanol', 6000))
		.outputFluids(Fluid.of('gtceu:hydrogen', 10000), Fluid.of('gtceu:oxygen', 6000), Fluid.of('gtceu:methane', 1000), Fluid.of('gtceu:ethylene', 1000), Fluid.of('gtceu:propene', 1000))
		.duration(20*30)
		.EUt(GTValues.VA[GTValues.HV])

	// [PORT-Ф2] tfg:reformate_gas / tfg:crude_mixed_gas / tfg:btx_fuel — материалы Ф2:
	// event.recipes.gtceu.cracker('tfg:crude_mixed_gas')
	// 	.itemInputs(Item.of('tfg:catalyser_pt_re_zsm'))
	// 	.inputFluids(Fluid.of('tfg:reformate_gas', 8000))
	// 	.inputFluids(Fluid.of('gtceu:propene', 2000))
	// 	.itemOutputs(Item.of('tfg:used_catalyser', 1))
	// 	.outputFluids(Fluid.of('tfg:crude_mixed_gas', 10000))
	// 	.duration(20*240)
	// 	.EUt(GTValues.VA[GTValues.LV])
	//
	// event.recipes.gtceu.large_chemical_reactor('tfg:btx_fuel')
	// 	.inputFluids(Fluid.of('tfg:crude_mixed_gas', 10000))
	// 	.inputFluids(Fluid.of('gtceu:benzene', 20000))
	// 	.inputFluids(Fluid.of('gtceu:toluene', 6000))
	// 	.inputFluids(Fluid.of('gtceu:dimethylbenzene', 12000))
	// 	.outputFluids(Fluid.of('tfg:btx_fuel', 54000))
	// 	.duration(20*6)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.circuit(24)

	// Loop

	// [PORT-Ф2] tfg:catalyser_powder / tfg:clean_powder / tfg:leachate / tfg:metal_rich_solution /
	// [PORT-Ф2] tfg:aciditic_waste + rhenium — материалы Ф2; coal_liquefaction_tower — тип не зарегистрирован (Ф4).
	// Весь цикл регенерации катализатора закомментирован:
	// event.recipes.gtceu.macerator('tfg:catalyser_power')
	// 	.itemInputs(Item.of('tfg:used_catalyser', 1))
	// 	.itemOutputs(Item.of('tfg:catalyser_powder_dust', 1), Item.of('gtceu:platinum_dust', 1))
	// 	.duration(20*30)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	//
	// event.recipes.gtceu.chemical_reactor('tfg:clean_powder')
	// 	.itemInputs(Item.of('tfg:catalyser_powder_dust', 1))
	// 	.inputFluids(Fluid.of('gtceu:hydrogen_peroxide', 200))
	// 	.itemOutputs(Item.of('tfg:clean_powder_dust', 1), Item.of('gtceu:sodium_dust', 1))
	// 	.duration(20*14)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.coal_liquefaction_tower('tfg:leachate')
	// 	.itemInputs(Item.of('tfg:clean_powder_dust', 1))
	// 	.inputFluids(Fluid.of('gtceu:diluted_hydrochloric_acid', 1000))
	// 	.outputFluids(Fluid.of('tfg:leachate', 1000))
	// 	.duration(20*45)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.centrifuge('tfg:metal_rich_solution')
	// 	.inputFluids(Fluid.of('tfg:leachate', 1000))
	// 	.itemOutputs(Item.of('gtceu:nether_quartz_dust', 2), Item.of('gtceu:aluminium_dust', 1))
	// 	.outputFluids(Fluid.of('tfg:metal_rich_solution', 1000))
	// 	.duration(20*45)
	// 	.EUt(GTValues.VA[GTValues.HV])
	//
	// event.recipes.gtceu.mixer('tfg:aciditic_waste')
	// 	.itemInputs(Item.of('gtceu:reinforced_epoxy_resin_plate', 1))
	// 	.inputFluids(Fluid.of('tfg:metal_rich_solution', 200), Fluid.of('gtceu:glue', 200))
	// 	.outputFluids(Fluid.of('tfg:aciditic_waste', 200))
	// 	.itemOutputs(Item.of('tfg:loaded_resin', 2))
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	//
	// event.recipes.gtceu.distillery('tfg:rhenium_dust')
	// 	.inputFluids(Fluid.of('gtceu:sulfuric_acid', 100))
	// 	.itemInputs(Item.of('tfg:loaded_resin', 1))
	// 	.itemOutputs(Item.of('gtceu:rhenium_dust', 6))
	// 	.duration(20*8)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.electrolyzer('tfg:aciditic_waste_electrolyzing')
	// 	.inputFluids(Fluid.of('tfg:aciditic_waste', 1000))
	// 	.outputFluids(Fluid.of('gtceu:ammonia', 500))
	// 	.outputFluids(Fluid.of('gtceu:ethanol', 500))
	// 	.duration(20*4)
	// 	.EUt(GTValues.VA[GTValues.HV])

	//#endregion
})
