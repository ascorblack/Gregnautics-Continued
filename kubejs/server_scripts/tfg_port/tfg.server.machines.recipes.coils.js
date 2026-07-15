// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.coils.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] Материалы TFG (magnesium_hydroxide, magnesia, magnesia_refractory_brick, refractory_clay,
//   silicon_carbide, rene_41, nichromium_iodomethylate, iodomethane, phenolic_resin) и TFG-флаги
//   (foils/blue_steel) не зарегистрированы (апстрим-баг GTM8) — цепочка кирпича/купроникелевой и
//   кантал/RTM/HSS-G катушек закомментирована; удаления стоковых рецептов катушек тоже (иначе катушки без рецептов).
// [PORT-Ф7] gtceu:gas_pressurizer — машина/тип рецептов TFG не зарегистрированы (blue_alloy_desh_foil).
// [PORT] Активно: хорус-керамика (implosion + smelting) и нихромовая катушка (предметы Ф4
//   tfg:blue_alloy_desh_foil / tfg:fired_chorus_ceramic_insulation зарегистрированы). ВНИМАНИЕ:
//   tfg:blue_alloy_desh_foil пока некрафтабелен (gas_pressurizer Ф7) — стоковый рецепт катушки сохранён.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.coils start')

	// #region Cupronickel Coil

	// [PORT-Ф2] tfg:refractory_clay_dust — пыль материала TFG (не зарегистрирована)
	// event.smelting('tfg:refractory_clay_dust', 'tfc:fire_clay')

	// [PORT-Ф2] c:dusts/magnesium_hydroxide — материал TFG
	// event.recipes.gtceu.chemical_reactor('tfg:magnesium_hydroxide')
	// 	.itemInputs('#c:dusts/magnesium')
	// 	.inputFluids('tfc:lye 2000')
	// 	.itemOutputs('#c:dusts/magnesium_hydroxide', '2x #c:dusts/sodium')
	// 	.duration(5 * 20)
	// 	.EUt(GTValues.VHA[GTValues.LV])

	// [PORT-Ф2] c:dusts/magnesia — материал TFG (вся цепочка магнезии)
	// event.recipes.gtceu.coke_oven('tfg:magnesia')
	// 	.itemInputs('#c:dusts/magnesium_hydroxide')
	// 	.itemOutputs('#c:dusts/magnesia')
	// 	.duration(20 * 20)

	// event.recipes.gtceu.coke_oven('tfg:magnesia_from_fullers_earth')
	// 	.itemInputs('13x #c:dusts/fullers_earth')
	// 	.itemOutputs('#c:dusts/magnesia')
	// 	.duration(20 * 40)

	// event.recipes.gtceu.coke_oven('tfg:magnesia_from_asbestos')
	// 	.itemInputs('6x #c:dusts/asbestos')
	// 	.itemOutputs('#c:dusts/magnesia')
	// 	.duration(20 * 40)

	// event.recipes.gtceu.coke_oven('tfg:magnesia_from_soapstone')
	// 	.itemInputs('7x #c:dusts/soapstone')
	// 	.itemOutputs('#c:dusts/magnesia')
	// 	.duration(20 * 40)

	// event.recipes.gtceu.coke_oven('tfg:magnesia_from_phlogopite')
	// 	.itemInputs('3x #c:dusts/phlogopite')
	// 	.itemOutputs('#c:dusts/magnesia')
	// 	.duration(20 * 40)

	// event.recipes.gtceu.pyrolyse_oven('tfg:magnesia')
	// 	.itemInputs('#c:dusts/magnesium_hydroxide')
	// 	.itemOutputs('#c:dusts/magnesia')
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// event.recipes.gtceu.pyrolyse_oven('tfg:magnesia_from_phlogopite')
	// 	.itemInputs('5x #c:dusts/phlogopite')
	// 	.itemOutputs('3x #c:dusts/magnesia', Item.of('gtceu:aluminium_dust'))
	// 	.outputFluids(Fluid.of('gtceu:carbon_dioxide', 1000))
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// [PORT-Ф2] c:dusts/magnesia_refractory_brick + c:dusts/refractory_clay — материалы TFG
	// event.recipes.gtceu.mixer('tfg:magnesia_refractory_brick_dust_sticky')
	// 	.itemInputs('#c:dusts/magnesia', '#c:dusts/refractory_clay', '#c:dusts/graphite', '10x gtceu:sticky_resin')
	// 	.itemOutputs('3x #c:dusts/magnesia_refractory_brick')
	// 	.duration(5 * 20)
	// 	.EUt(GTValues.VHA[GTValues.LV])

	// event.recipes.gtceu.mixer('tfg:magnesia_refractory_brick_dust_sticky_powder')
	// 	.itemInputs('#c:dusts/magnesia', '#c:dusts/refractory_clay', '4x tfc:powder/graphite', '10x gtceu:sticky_resin')
	// 	.itemOutputs('3x #c:dusts/magnesia_refractory_brick')
	// 	.duration(5 * 20)
	// 	.EUt(GTValues.VHA[GTValues.LV])

	// event.recipes.gtceu.mixer('tfg:magnesia_refractory_brick_dust_phenolic')
	// 	.itemInputs('#c:dusts/magnesia', '#c:dusts/refractory_clay', '#c:dusts/graphite')
	// 	.inputFluids(Fluid.of('tfg:phenolic_resin', 72))
	// 	.itemOutputs('3x #c:dusts/magnesia_refractory_brick')
	// 	.duration(5 * 20)
	// 	.EUt(GTValues.VHA[GTValues.LV])

	// event.recipes.gtceu.mixer('tfg:magnesia_refractory_brick_dust_phenolic_powder')
	// 	.itemInputs('#c:dusts/magnesia', '#c:dusts/refractory_clay', '4x tfc:powder/graphite')
	// 	.inputFluids(Fluid.of('tfg:phenolic_resin', 72))
	// 	.itemOutputs('3x #c:dusts/magnesia_refractory_brick')
	// 	.duration(5 * 20)
	// 	.EUt(GTValues.VHA[GTValues.LV])

	// event.recipes.gtceu.alloy_smelter('tfg:magnesia_refractory_brick')
	// 	.itemInputs('#c:dusts/magnesia_refractory_brick')
	// 	.notConsumableItem('gtceu:ingot_casting_mold') // [PORT-FIX] .notConsumable -> .notConsumableItem
	// 	.itemOutputs('#c:ingots/magnesia_refractory_brick')
	// 	.duration(8 * 20)
	// 	.EUt(GTValues.VA[GTValues.LV])
	// 	.category(GTRecipeCategories.INGOT_MOLDING)

	// event.recipes.gtceu.forming_press('tfg:magnesia_refractory_brick')
	// 	.itemInputs('#c:dusts/magnesia_refractory_brick')
	// 	.notConsumableItem('gtceu:ingot_casting_mold') // [PORT-FIX]
	// 	.itemOutputs('#c:ingots/magnesia_refractory_brick')
	// 	.duration(4 * 20)
	// 	.EUt(GTValues.VHA[GTValues.LV])

	// [PORT-Ф2] c:foils/blue_steel (TFG-флаг GENERATE_FOIL) и кирпич магнезии не существуют
	// event.recipes.gtceu.assembler('gtceu:coil_cupronickel')
	// 	.itemInputs('8x #c:double_wires/cupronickel', '8x #c:foils/blue_steel', '4x #c:ingots/magnesia_refractory_brick')
	// 	.inputFluids('gtceu:tin_alloy 144')
	// 	.itemOutputs('gtceu:cupronickel_coil_block')
	// 	.duration(10 * 20)
	// 	.EUt(GTValues.VA[GTValues.LV])
	// 	.addMaterialInfo(true, true)

	// #endregion

	// #region Kanthal Coil

	// [PORT-Ф2] c:foils/rene_41 и c:ingots/silicon_carbide — материалы TFG; стоковый рецепт НЕ удаляем
	// event.remove({ id: 'gtceu:assembler/coil_kanthal' })
	// event.recipes.gtceu.assembler('tfg:coil_kanthal')
	// 	.itemInputs('8x #c:double_wires/kanthal', '16x #c:foils/rene_41', '1x #c:ingots/silicon_carbide')
	// 	.inputFluids('gtceu:cobalt 144')
	// 	.itemOutputs('gtceu:kanthal_coil_block')
	// 	.duration(20 * 15)
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.addMaterialInfo(true, true)

	// #endregion

	// #region Nichrome Coil

	// [PORT-Ф7] gtceu:gas_pressurizer — тип рецептов TFG не зарегистрирован; жидкости gtceu:regolith_vapor нет
	// event.recipes.gtceu.gas_pressurizer('tfg:blue_alloy_desh_foil')
	// 	.itemInputs('2x #c:foils/desh', '2x #c:foils/blue_alloy', 'tfc:powder/flux')
	// 	.inputFluids('gtceu:regolith_vapor 1000')
	// 	.itemOutputs('tfg:blue_alloy_desh_foil')
	// 	.duration(10 * 20)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// [PORT-Ф4] TFGHelpers — хелпер Java-мода TFG, отсутствует
	// TFGHelpers.registerMaterialInfo('tfg:blue_alloy_desh_foil', [GTMaterials.BlueAlloy, 0.5, GTMaterials.get('gtceu:desh'), 0.25])

	// [PORT-CHECK] c:dusts/kaolinite: пыли GT нет, ожидается tfc:powder/kaolinite в теге; проверить в игре
	// [PORT-FIX] chancedOutput тег -> конкретный предмет gtceu:dark_ash_dust (вывод тегом не сериализуется)
	event.recipes.gtceu.implosion_compressor('tfg:chorus_ceramic_insulation_dynamite')
		.itemInputs('ae2:sky_dust', '#c:dusts/perlite', '#c:dusts/kaolinite', 'minecraft:popped_chorus_fruit', 'ae2:fluix_crystal', '2x gtceu:dynamite')
		.itemOutputs('tfg:chorus_ceramic_insulation')
		.chancedOutput('gtceu:dark_ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.implosion_compressor('tfg:chorus_ceramic_insulation_powderbarrel')
		.itemInputs('ae2:sky_dust', '#c:dusts/perlite', '#c:dusts/kaolinite', 'minecraft:popped_chorus_fruit', 'ae2:fluix_crystal', '8x gtceu:powderbarrel')
		.itemOutputs('tfg:chorus_ceramic_insulation')
		.chancedOutput('gtceu:dark_ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.implosion_compressor('tfg:chorus_ceramic_insulation_tnt')
		.itemInputs('ae2:sky_dust', '#c:dusts/perlite', '#c:dusts/kaolinite', 'minecraft:popped_chorus_fruit', 'ae2:fluix_crystal', '4x minecraft:tnt')
		.itemOutputs('tfg:chorus_ceramic_insulation')
		.chancedOutput('gtceu:dark_ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.implosion_compressor('tfg:chorus_ceramic_insulation_itnt')
		.itemInputs('ae2:sky_dust', '#c:dusts/perlite', '#c:dusts/kaolinite', 'minecraft:popped_chorus_fruit', 'ae2:fluix_crystal', 'gtceu:industrial_tnt')
		.itemOutputs('tfg:chorus_ceramic_insulation')
		.chancedOutput('gtceu:dark_ash_dust', 2500)
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	event.smelting('tfg:fired_chorus_ceramic_insulation', 'tfg:chorus_ceramic_insulation')
		.id('tfg:smelting/chorus_ceramic_insulation')

	// [PORT-Ф7] Стоковый рецепт НЕ удаляем: tfg:blue_alloy_desh_foil пока некрафтабелен (gas_pressurizer)
	// event.remove({ id: 'gtceu:assembler/coil_nichrome' })
	event.recipes.gtceu.assembler('tfg:coil_nichrome')
		.itemInputs('8x #c:double_wires/nichrome', '8x tfg:blue_alloy_desh_foil', '4x tfg:fired_chorus_ceramic_insulation')
		.inputFluids(Fluid.of('gtceu:magnalium', 144 * 4))
		.itemOutputs('gtceu:nichrome_coil_block')
		.duration(20 * 15)
		.EUt(GTValues.VA[GTValues.HV])
		.addMaterialInfo(true, true)

	// #endregion

	// #region RTM Coil

	// [PORT-Ф2] tfg:nichromium_iodomethylate/tfg:iodomethane — материалы TFG; тег c:insulation_t2 нигде не
	// наполняется. Стоковый рецепт НЕ удаляем.
	// event.remove({ id : 'gtceu:assembler/coil_rtm_alloy' })
	// event.recipes.gtceu.assembler('tfg:coil_rtm_alloy')
	// 	.itemInputs('8x #c:double_wires/rtm_alloy', '8x #c:foils/palladium', '4x #c:insulation_t2/sheet')
	// 	.inputFluids('tfg:nichromium_iodomethylate 244')
	// 	.itemOutputs('gtceu:rtm_alloy_coil_block')
	// 	.duration(20 * 25)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.addMaterialInfo(true, true)

	// event.recipes.gtceu.mixer('tfg:nichromium_iodomethylate')
	// 	.inputFluids(Fluid.of('gtceu:nichrome', 144), Fluid.of('tfg:iodomethane', 100))
	// 	.outputFluids('tfg:nichromium_iodomethylate 244')
	// 	.duration(20 * 8)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// #endregion

	// #region HSS-G

	// [PORT-Ф4-TODO] Тег c:insulation_t3 нигде не наполняется — рецепт был бы мёртвым; стоковый НЕ удаляем.
	// event.remove({ id : 'gtceu:assembler/coil_hssg' })
	// event.recipes.gtceu.assembler('tfg:coil_hssg')
	// 	// TODO: Replace the tungsten carbide foil with zirconium diboride
	// 	.itemInputs('8x #c:double_wires/hssg', '8x #c:foils/tungsten_carbide', '#c:insulation_t3/sheet')
	// 	// TODO: Replace tungsten liquid with something else from venus
	// 	.inputFluids('gtceu:tungsten 144')
	// 	.itemOutputs('gtceu:hssg_coil_block')
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.addMaterialInfo(true, true)

	// #endregion
})
