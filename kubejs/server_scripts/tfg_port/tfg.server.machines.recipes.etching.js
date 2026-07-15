// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.etching.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН: все жидкости и пыли — GT-материалы TFG из tfg.materials.etching.js
//   (tfg:redstone_nitrate, tfg:redstone_chloride, tfg:redstone_tri_p_toluenesulfonate, tfg:sodium_nitrate,
//   tfg:sulfur_dichloride, tfg:thionyl_chloride, tfg:p_toluenesulfonic_acid); регистрация материалов
//   заблокирована (05_startup.dispatch.js.disabled, апстрим-баг GTM8). Вернуть после Ф2.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.etching start (disabled, Ф2)')

	// [PORT-Ф2] --- начало отключённого блока (оригинал сохранён, теги переведены на c:) ---

	//#region Redstone Etching Fluids
	// event.recipes.gtceu.chemical_bath('tfg:redstone_nitrate')
	// 	.itemInputs(Item.of('minecraft:redstone', 10))
	// 	.inputFluids(Fluid.of('gtceu:nitric_acid', 3000))
	// 	.outputFluids(Fluid.of('gtceu:hydrogen', 3000))
	// 	.itemOutputs(Item.of('tfg:redstone_nitrate_dust', 10))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// event.recipes.gtceu.chemical_reactor('tfg:redstone_chloride')
	// 	.itemInputs(Item.of('tfg:redstone_nitrate_dust', 10))
	// 	.itemInputs(Item.of('gtceu:salt_dust', 6))
	// 	.itemOutputs(Item.of('tfg:sodium_nitrate_dust', 15))
	// 	.outputFluids(Fluid.of('tfg:redstone_chloride', 1000))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// event.recipes.gtceu.chemical_reactor('tfg:redstone_tri_p_toluenesulfonate')
	// 	.inputFluids(Fluid.of('tfg:redstone_chloride', 1000))
	// 	.inputFluids(Fluid.of('tfg:p_toluenesulfonic_acid', 3000))
	// 	.outputFluids(Fluid.of('gtceu:chlorine', 3000))
	// 	.outputFluids(Fluid.of('tfg:redstone_tri_p_toluenesulfonate', 1000))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.HV])

	// event.recipes.gtceu.large_chemical_reactor('tfg:p_toluenesulfonic_acid')
	// 	.inputFluids(Fluid.of('gtceu:toluene', 1000))
	// 	.inputFluids(Fluid.of('tfg:thionyl_chloride', 1000))
	// 	.inputFluids(Fluid.of('gtceu:sulfuric_acid', 1000))
	// 	.outputFluids(Fluid.of('tfg:p_toluenesulfonic_acid', 1000))
	// 	.outputFluids(Fluid.of('gtceu:sulfur_dioxide', 1000))
	// 	.outputFluids(Fluid.of('gtceu:hydrochloric_acid', 2000))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.chemical_reactor('tfg:thionyl_chloride')
	// 	.inputFluids(Fluid.of('gtceu:sulfur_trioxide', 1000))
	// 	.inputFluids(Fluid.of('tfg:sulfur_dichloride', 1000))
	// 	.outputFluids(Fluid.of('gtceu:sulfur_dioxide', 1000))
	// 	.outputFluids(Fluid.of('tfg:thionyl_chloride', 1000))
	// 	.duration(20 * 3)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.chemical_reactor('tfg:sulfur_dichloride')
	// 	.itemInputs(Item.of('gtceu:sulfur_dust', 1))
	// 	.inputFluids(Fluid.of('gtceu:chlorine', 2000))
	// 	.outputFluids(Fluid.of('tfg:sulfur_dichloride', 1000))
	// 	.duration(20 * 3)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.chemical_reactor('tfg:sodium_nitrate_to_nitric_acid')
	// 	.itemInputs(Item.of('tfg:sodium_nitrate_dust', 5))
	// 	.inputFluids(Fluid.of('gtceu:hydrochloric_acid', 1000))
	// 	.outputFluids(Fluid.of('gtceu:nitric_acid', 1000))
	// 	.itemOutputs(Item.of('gtceu:salt_dust', 2))
	// 	.duration(30)
	// 	.EUt(GTValues.VA[GTValues.HV])

	//#endregion

	// [PORT-Ф2] --- конец отключённого блока ---
})
