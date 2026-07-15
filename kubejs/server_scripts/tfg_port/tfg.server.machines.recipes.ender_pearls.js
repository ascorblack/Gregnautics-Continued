// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.ender_pearls.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] Пыль vitrified_pearl (c:dusts/vitrified_pearl) — GT-материал TFG, регистрация заблокирована
//   (апстрим-баг GTM8): implosion/macerator-рецепты с ней закомментированы (выход тегом при пустом теге
//   ломает сериализацию). Сам предмет tfg:vitrified_pearl зарегистрирован (Ф4).
// [PORT-CHECK] Тег #tfg:aluminium_oxide наполняется в tfg.server.ores.tags.materials.js;
//   тег #c:insulation_t1 пока НИГДЕ не наполняется — пиролиз-рецепт мёртвый до его появления.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.ender_pearls start')

	event.recipes.gtceu.chemical_reactor('kaolinite')
		.itemInputs('5x #tfg:aluminium_oxide', '2x #c:dusts/silicon')
		.inputFluids(Fluid.of('gtceu:distilled_water', 6000), Fluid.of('gtceu:chlorine', 8000))
		.itemOutputs('17x tfc:powder/kaolinite')
		.outputFluids(Fluid.of('gtceu:hydrochloric_acid', 8000))
		.circuit(3)
		.duration(20 * 10)
		.EUt(GTValues.VA[GTValues.HV])

	event.recipes.gtceu.chemical_reactor('kaolinite_ruby')
		.itemInputs('6x #c:dusts/ruby', '2x #c:dusts/silicon')
		.inputFluids(Fluid.of('gtceu:distilled_water', 6000), Fluid.of('gtceu:chlorine', 8000))
		.itemOutputs('17x tfc:powder/kaolinite', '1x #c:dusts/chromium')
		.outputFluids(Fluid.of('gtceu:hydrochloric_acid', 8000))
		.circuit(3)
		.duration(20 * 10)
		.EUt(GTValues.VA[GTValues.HV])

	// [PORT-CHECK] тег c:insulation_t1 должен наполняться другим скриптом, иначе рецепт мёртвый
	event.recipes.gtceu.pyrolyse_oven('vitrified_ender_dust')
		.itemInputs('minecraft:ender_pearl', '2x tfc:powder/kaolinite', '4x #c:insulation_t1')
		.inputFluids(Fluid.of('gtceu:nitrogen', 100))
		.itemOutputs('tfg:vitrified_pearl')
		.chancedOutput('gtceu:ash_dust', 2500)
		.duration(20 * 10)
		.EUt(GTValues.VA[GTValues.HV])

	// [PORT-Ф2] c:dusts/vitrified_pearl — пыль материала TFG (не зарегистрирована)
	// event.recipes.gtceu.implosion_compressor('vitrified_ender_pearl_dynamite')
	// 	.itemInputs('4x #c:dusts/vitrified_pearl', '2x gtceu:dynamite')
	// 	.itemOutputs('3x tfg:vitrified_pearl')
	// 	.chancedOutput('gtceu:dark_ash_dust', 2500, 0) // [PORT-FIX] тег -> предмет
	// 	.duration(20)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// event.recipes.gtceu.implosion_compressor('vitrified_ender_pearl_powderbarrel')
	// 	.itemInputs('4x #c:dusts/vitrified_pearl', '8x gtceu:powderbarrel')
	// 	.itemOutputs('3x tfg:vitrified_pearl')
	// 	.chancedOutput('gtceu:dark_ash_dust', 2500, 0)
	// 	.duration(20)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// event.recipes.gtceu.implosion_compressor('vitrified_ender_pearl_tnt')
	// 	.itemInputs('4x #c:dusts/vitrified_pearl', '4x minecraft:tnt')
	// 	.itemOutputs('3x tfg:vitrified_pearl')
	// 	.chancedOutput('gtceu:dark_ash_dust', 2500, 0)
	// 	.duration(20)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// event.recipes.gtceu.implosion_compressor('vitrified_ender_pearl_itnt')
	// 	.itemInputs('4x #c:dusts/vitrified_pearl', 'gtceu:industrial_tnt')
	// 	.itemOutputs('3x tfg:vitrified_pearl')
	// 	.chancedOutput('gtceu:dark_ash_dust', 2500, 0)
	// 	.duration(20)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// event.recipes.gtceu.macerator('vitrified_ender_pearl')
	// 	.itemInputs('tfg:vitrified_pearl')
	// 	.itemOutputs('#c:dusts/vitrified_pearl')
	// 	.duration(40)
	// 	.EUt(GTValues.VA[GTValues.ULV])
})
