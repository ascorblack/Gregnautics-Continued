// priority: 0
"use strict";

// [PORT] Порт tfg/mv_rework/material.recipes.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT-Ф2] Линии SiC (silicon_carbide / rough_silicon_carbide), Rene 41, Mo-50-Re и diamond tipped tools
// [PORT-Ф2] завязаны на GT-материалы TFG (startup_scripts/tfg_port/tfg.materials.*), система материалов Ф2
// [PORT-Ф2] отключена (05_startup.dispatch.js.disabled) — эти блоки закомментированы и ждут разблокировки Ф2.
// [PORT] Активна только замена полиэтилена на силиконовую резину в capacitor/transistor.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.power mv_rework.material.recipes start')

	// SiC

	// [PORT-Ф2] материалы TFG silicon_carbide / rough_silicon_carbide не зарегистрированы —
	// нижеследующие gtceu-рецепты из них не генерируются, удалять нечего; весь регион закомментирован:
	// event.remove({ id: 'gtceu:electric_blast_furnace/blast_rough_silicon_carbide' })
	// event.remove({ id: 'gtceu:electric_blast_furnace/blast_rough_silicon_carbide_gas' })
	// event.remove({ id: 'gtceu:alloy_smelter/alloy_smelt_silicon_carbide_to_nugget' })
	// event.remove({ id: 'gtceu:alloy_smelter/alloy_smelt_weak_inconel_718_to_nugget' })
	//
	// event.recipes.gtceu.electric_blast_furnace('tfg:rough_sic_gem')
	// 	.itemInputs(Item.of('gtceu:quartzite_gem', 9), Item.of('gtceu:graphite_dust', 27))
	// 	.itemOutputs(Item.of('tfg:hot_rough_silicon_carbide_ingot', 1))
	// 	.outputFluids(Fluid.of('gtceu:carbon_monoxide', 18000))
	// 	.blastFurnaceTemp(1760)
	// 	.duration(20 * 180)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.electric_blast_furnace('tfg:rough_sic_gem_nq')
	// 	.itemInputs(Item.of('minecraft:quartz', 9), Item.of('gtceu:graphite_dust', 27))
	// 	.itemOutputs(Item.of('tfg:hot_rough_silicon_carbide_ingot', 1))
	// 	.outputFluids(Fluid.of('gtceu:carbon_monoxide', 18000))
	// 	.blastFurnaceTemp(1760)
	// 	.duration(20 * 180)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.electric_blast_furnace('tfg:flawless_rough_sic_gem')
	// 	.itemInputs(Item.of('gtceu:flawless_quartzite_gem', 9), Item.of('gtceu:graphite_dust', 27))
	// 	.itemOutputs(Item.of('tfg:hot_rough_silicon_carbide_ingot', 5))
	// 	.outputFluids(Fluid.of('gtceu:carbon_monoxide', 18000))
	// 	.blastFurnaceTemp(1760)
	// 	.duration(20 * 140)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.electric_blast_furnace('tfg:flawless_rough_sic_gem_nq')
	// 	.itemInputs(Item.of('gtceu:flawless_nether_quartz_gem', 9), Item.of('gtceu:graphite_dust', 27))
	// 	.itemOutputs(Item.of('tfg:hot_rough_silicon_carbide_ingot', 5))
	// 	.outputFluids(Fluid.of('gtceu:carbon_monoxide', 18000))
	// 	.blastFurnaceTemp(1760)
	// 	.duration(20 * 140)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.electric_blast_furnace('tfg:exquisite_rough_sic_gem')
	// 	.itemInputs(Item.of('gtceu:exquisite_quartzite_gem', 9), Item.of('gtceu:graphite_dust', 27))
	// 	.itemOutputs(Item.of('tfg:hot_rough_silicon_carbide_ingot', 9))
	// 	.outputFluids(Fluid.of('gtceu:carbon_monoxide', 18000))
	// 	.blastFurnaceTemp(1760)
	// 	.duration(20 * 100)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.electric_blast_furnace('tfg:exquisite_rough_sic_gem_nq')
	// 	.itemInputs(Item.of('gtceu:exquisite_nether_quartz_gem', 9), Item.of('gtceu:graphite_dust', 27))
	// 	.itemOutputs(Item.of('tfg:hot_rough_silicon_carbide_ingot', 9))
	// 	.outputFluids(Fluid.of('gtceu:carbon_monoxide', 18000))
	// 	.blastFurnaceTemp(1760)
	// 	.duration(20 * 100)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.chemical_bath('tfg:silicon_carbide')
	// 	.itemInputs(Item.of('tfg:rough_silicon_carbide_dust', 1))
	// 	.inputFluids(Fluid.of('gtceu:hydrochloric_acid', 1000))
	// 	.itemOutputs(Item.of('tfg:silicon_carbide_ingot', 1))
	// 	.outputFluids(Fluid.of('gtceu:diluted_hydrochloric_acid', 1000))
	// 	.duration(20 * 16)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.chemical_bath('tfg:silicon_carbide_cool_down')
	// 	.itemInputs(Item.of('#c:hot_ingots/rough_silicon_carbide', 1)) // [PORT] forge: -> c:
	// 	.inputFluids(Fluid.of('minecraft:water', 100))
	// 	.itemOutputs(Item.of('tfg:rough_silicon_carbide_ingot', 1)) // [PORT-FIX] тег в выходе -> конкретный предмет
	// 	.duration(20 * 36)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.chemical_bath('tfg:silicon_carbide_cool_down_distilled_water')
	// 	.itemInputs(Item.of('#c:hot_ingots/rough_silicon_carbide', 1)) // [PORT] forge: -> c:
	// 	.inputFluids(Fluid.of('gtceu:distilled_water', 100))
	// 	.itemOutputs(Item.of('tfg:rough_silicon_carbide_ingot', 1)) // [PORT-FIX] тег в выходе -> конкретный предмет
	// 	.duration(20 * 21)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// Rene 41

	// [PORT-Ф2] материал TFG rene_41 не зарегистрирован:
	// event.recipes.gtceu.mixer('tfg:rene_41_dust')
	// 	.itemInputs(
	// 		Item.of('gtceu:nickel_dust', 5),
	// 		Item.of('gtceu:chromium_dust', 3),
	// 		Item.of('gtceu:cobalt_dust', 2),
	// 		Item.of('gtceu:molybdenum_dust', 1),
	// 		Item.of('gtceu:aluminium_dust', 1),
	// 		Item.of('gtceu:boron_dust', 1))
	// 	.inputFluids(Fluid.of('gtceu:carbon_monoxide', 1000))
	// 	.itemOutputs(Item.of('tfg:rene_41_dust', 14))
	// 	.outputFluids(Fluid.of('gtceu:oxygen', 1000))
	// 	.duration(20 * 92)
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.circuit(4)
	//
	// event.recipes.gtceu.chemical_bath('tfg:rene_41_cool_down')
	// 	.itemInputs(Item.of('#c:hot_ingots/rene_41', 1)) // [PORT] forge: -> c:
	// 	.inputFluids(Fluid.of('minecraft:water', 100))
	// 	.itemOutputs(Item.of('tfg:rene_41_ingot', 1)) // [PORT-FIX] тег в выходе -> конкретный предмет
	// 	.duration(20 * 11.5)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// event.recipes.gtceu.chemical_bath('tfg:rene_41_cool_down_distilled_water')
	// 	.itemInputs(Item.of('#c:hot_ingots/rene_41', 1)) // [PORT] forge: -> c:
	// 	.inputFluids(Fluid.of('gtceu:distilled_water', 100))
	// 	.itemOutputs(Item.of('tfg:rene_41_ingot', 1)) // [PORT-FIX] тег в выходе -> конкретный предмет
	// 	.duration(20 * 7)
	// 	.EUt(GTValues.VA[GTValues.MV])

	//#region Diamond Tipped Tools custom recipes

	// [PORT-Ф2] материалы TFG mo_50_re / diamond_tipped_mo_50_re не зарегистрированы;
	// [PORT-Ф4] тип high_temperature_precision_fabricator не зарегистрирован (машины Ф4 не портированы).
	// Весь регион закомментирован:
	// event.recipes.gtceu.high_temperature_precision_fabricator('tfg:diamond_tipped_mo_50_re')
	// 	.itemInputs('1x tfg:mo_50_re_ingot', 'gtceu:diamond_dust', '#tfg:precision_fabricator_holder_rods')
	// 	.perTick(true)
	// 	.inputFluids(Fluid.of('gtceu:methane', 2.5), Fluid.of('gtceu:hydrogen', 10))
	// 	.perTick(false)
	// 	.itemOutputs('tfg:diamond_tipped_mo_50_re_ingot')
	// 	.circuit(1)
	// 	.duration(5 * 20)
	// 	.addData("ebf_temp", 1784)
	// 	.EUt(GTValues.VA[GTValues.MV])
	//
	// const diamondTippedToolHeads = [
	// 	{ id: "wrench_tip", amount: 2 },
	// 	{ id: "knife_head", amount: 1 },
	// 	{ id: "screwdriver_tip", amount: 1 },
	// 	{ id: "buzz_saw_blade", amount: 2 },
	// 	{ id: "hoe_head", amount: 1 },
	// 	{ id: "scythe_head", amount: 1 },
	// 	{ id: "hammer_head", amount: 1 },
	// 	{ id: "wire_cutter_head", amount: 2 },
	// 	{ id: "file_head", amount: 1 },
	// 	{ id: "sword_head", amount: 2 },
	// 	{ id: "butchery_knife_head", amount: 1 }
	// ]
	//
	// diamondTippedToolHeads.forEach((element, index) => {
	// 	event.recipes.gtceu.laser_engraver(`tfg:diamond_tipped_mo_50_re_${element.id}_laser_engraving`)
	// 		.itemInputs(`${element.amount}x #c:ingots/diamond_tipped_mo_50_re`) // [PORT] forge: -> c:
	// 		.itemOutputs(`tfg:diamond_tipped_mo_50_re_${element.id}`)
	// 		.notConsumableItem('gtceu:glass_lens') // [PORT-FIX] .notConsumable(string) -> .notConsumableItem
	// 		.duration(15 * 20 * element.amount)
	// 		.circuit(index)
	// 		.EUt(GTValues.VA[GTValues.MV])
	// });
	//
	// event.remove({ id: 'gtceu:alloy_smelter/alloy_smelt_diamond_tipped_mo_50_re_to_nugget' })

	//#endregion

	//#region Modify Electronic Component to require Silicon Rubber

	// [PORT-FIX] global.modifyRecipe отсутствует в портированных startup-скриптах — замена жидкости
	// реализована через JSON-пересборку (event.custom + remove), по образцу create.recipes.js этого порта.
	// [PORT-CHECK] структура JSON GT-рецептов могла измениться — обёрнуто в try/catch, проверить в игре,
	// что tfg:assembler/capacitor и tfg:assembler/transistor требуют силиконовую резину.
	function replaceRecipeInputFluid(oldId, newId, needle, replacement) {
		let found = false
		event.forEachRecipe({ id: oldId }, recipe => {
			try {
				let obj = JSON.parse(String(recipe.json))
				if (!obj.inputs || !obj.inputs.fluid) {
					console.warn(`[Gregnautics] [PORT-CHECK] no fluid inputs in ${oldId}`)
					return
				}
				// Заменяем и tag- (forge:/c:polyethylene), и fluid- (gtceu:polyethylene) формы записи,
				// не трогая предметные входы.
				obj.inputs.fluid = JSON.parse(JSON.stringify(obj.inputs.fluid).split(needle).join(replacement))
				event.custom(obj).id(newId)
				found = true
			} catch (e) {
				console.warn(`[Gregnautics] [PORT-CHECK] fluid replacement failed for ${oldId}: ${e}`)
			}
		})
		if (found) event.remove({ id: oldId })
		else console.warn(`[Gregnautics] [PORT-CHECK] recipe not found for fluid replacement: ${oldId}`)
	}

	replaceRecipeInputFluid('gtceu:assembler/capacitor', 'tfg:assembler/capacitor', 'polyethylene', 'silicone_rubber')
	replaceRecipeInputFluid('gtceu:assembler/transistor', 'tfg:assembler/transistor', 'polyethylene', 'silicone_rubber')

	//#endregion

	// SiC SiC rotor

	// [PORT-Ф2] материал TFG silicon_carbide_silicon_carbide не зарегистрирован; [PORT] greate отсутствует;
	// [PORT-CHECK] NBT '{GT.PartStats:...}' в 1.21 заменён на data components — переписать при разблокировке Ф2.
	// const transitional = 'tfg:silicon_carbide_silicon_carbide_turbine_blade'
	// event.recipes.create.sequenced_assembly([
	// 	Item.of('gtceu:turbine_rotor', '{GT.PartStats:{Material:"tfg:silicon_carbide_silicon_carbide"}}'),
	// ], 'tfg:silicon_carbide_ingot', [
	// 	event.recipes.create.deploying(transitional, [transitional, 'tfg:silicon_carbide_plate']),
	// 	event.recipes.create.pressing(transitional, transitional), // [PORT] greate.pressing -> create.pressing
	// 	event.recipes.create.cutting(transitional, transitional),
	// 	event.recipes.create.filling(transitional, [Fluid.of('tfg:silicon_carbide', 144), transitional]),
	// 	event.recipes.createvintageneoforged.vacuumizing(transitional, [transitional, Item.of('tfg:silicon_carbide_dust', 1)]).processingTime(50), // [PORT] vintageimprovements -> createvintageneoforged
	// 	event.recipes.create.deploying(transitional, [transitional, { tag: 'c:tools/wire_cutter' }]), // [PORT] forge:tools/wire_cutters -> c:tools/wire_cutter; {tag:...}-объект
	// ])
	// 	.transitionalItem(transitional)
	// 	.loops(10)
	// 	.id('tfg:equenced_assembly/sic_sic_turbine_rotor')
})
