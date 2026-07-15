// priority: 0
"use strict";

// [PORT] Порт tfg/slimes/slimes.recipes.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFGSlimeRecipes -> прямой обработчик ServerEvents.recipes (KubeJS 7: изолированные скоупы).
// [PORT-Ф4-TODO] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН: предметы tfg:slime/slime_ball/* (plant/glowberry/latex) не зарегистрированы
// (слаймы — контент TFG-Core, Ф4; в startup_scripts/tfg_port регистрации нет).
// [PORT-Ф2] Жидкость tfg:latex — TFG GT-материал (tfg.materials.primitive.js), регистрация материалов
// заблокирована (05_startup.dispatch.js.disabled, апстрим-баг GTM8) — рецепты с ней тоже под Ф2.
// При разблокировке: раскомментировать и проверить пометки [PORT-FIX] ниже.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc slimes recipes start')

	// [PORT-Ф4-TODO] --- начало отключённого блока ---

	// // Plant slime ball
	// // [PORT-FIX] forge:tools/mortars -> c:tools/mortar (GTM8: c:tools/* в единственном числе)
	// event.shapeless('gtceu:plant_ball', ['tfg:slime/slime_ball/plant', '#c:tools/mortar'])
	// 	.id('tfg:shapeless/mortar_plant_slime_ball')

	// event.recipes.tfc.quern('gtceu:plant_ball', 'tfg:slime/slime_ball/plant')
	// 	.id('tfg:quern/plant_slime_ball')

	// event.recipes.gtceu.macerator('tfg:plant_slime_ball')
	// 	.itemInputs('tfg:slime/slime_ball/plant')
	// 	.itemOutputs('gtceu:plant_ball')
	// 	.EUt(2)
	// 	.duration(50)

	// // Glowberry slime ball
	// for (let i = 1; i <= 5; i++) {
	// 	let inputArray = new Array(0)
	// 	let outputArray = new Array(0)

	// 	for (let j = 1; j < i + 1; j++) {
	// 		inputArray.push('tfg:slime/slime_ball/glowberry')
	// 		outputArray.push('minecraft:sugar')
	// 	}

	// 	event.recipes.tfc.pot(inputArray, Fluid.of('tfc:spring_water', 200 * i), 300, 200)
	// 		.itemOutput(outputArray)
	// 		.id(`tfg:pot/${i}x_glowberry_slime_ball_to_sugar`)
	// }

	// event.recipes.firmalife.vat()
	// 	.inputs('tfg:slime/slime_ball/glowberry', Fluid.of('tfc:spring_water', 200))
	// 	.outputItem('minecraft:sugar')
	// 	.length(600)
	// 	.id('tfg:vat/glowberry_slime_ball_to_sugar')

	// event.recipes.gtceu.brewery('tfg:glowberry_slime_ball')
	// 	.itemInputs('tfg:slime/slime_ball/glowberry')
	// 	.inputFluids(Fluid.of('tfc:spring_water', 200))
	// 	.itemOutputs('minecraft:sugar')
	// 	.duration(100)
	// 	.EUt(16)

	// // Latex slime ball
	// // [PORT-Ф2] жидкость tfg:latex не зарегистрирована (материалы TFG заблокированы)
	// event.recipes.firmalife.vat()
	// 	.inputs('tfg:slime/slime_ball/latex', Fluid.of('tfc:spring_water', 200))
	// 	.outputFluid(Fluid.of('tfg:latex', 200))
	// 	.length(600)
	// 	.id('tfg:vat/latex_slime_ball_to_latex')

	// event.recipes.gtceu.brewery('tfg:latex_slime_ball')
	// 	.itemInputs('tfg:slime/slime_ball/latex')
	// 	.inputFluids(Fluid.of('tfc:spring_water', 200))
	// 	.outputFluids(Fluid.of('tfg:latex', 200))
	// 	.duration(100)
	// 	.EUt(16)

	// [PORT-Ф4-TODO] --- конец отключённого блока ---
})
