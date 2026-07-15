// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.circuit_board.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] Заблокировано (материалы TFG не регистрируются, апстрим-баг GTM8):
//   tfg:silicon_carbide_plate, tfg:alumina_plate (плиты материалов TFG), жидкости tfg:redstone_tri_p_toluenesulfonate
//   и слёрри линз (tfg.materials.gem_slurries) — рецепты с ними закомментированы.
//   Удаления стоковых рецептов пластиковых плат/линз тоже закомментированы (иначе платы/линзы без рецептов).
// [PORT-Ф7] gtceu:high_temperature_precision_fabricator — машина/тип рецептов TFG не зарегистрированы.
// [PORT] global.modifyRecipe (замена жидкостей в стоковых рецептах) не портирован — блок FLUID_REPLACEMENTS отключён.
// [PORT] Активны: chemical_bath-рецепты плат из подложек (tfg:mo_activated_sic_substrate,
//   tfg:copper_bonded_al2o3_pcb, tfg:chromium_bonded_beo_pcb — предметы Ф4 зарегистрированы), рецепт печатной платы
//   с iron_iii_chloride и заготовка линзы из боросиликатного стекла. ВНИМАНИЕ: сами подложки пока некрафтабельны
//   (их arc_furnace-рецепты требуют Ф2-плиты) — цепочка оживёт после Ф2.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.circuit_board start')

	//event.remove({ input: 'gtceu:plastic_printed_circuit_board' }, Item.of('gtceu:plastic_printed_circuit_board'), Item.of('tfg:ceramic_printed_circuit_board'))

	// [PORT-Ф2] Керамическая замена пластиковых плат заблокирована — стоковые рецепты НЕ удаляем
	// const toRemove = [
	// 	'gtceu:chemical_reactor/plastic_board_pbi',
	// 	'gtceu:chemical_reactor/plastic_board_polyethylene',
	// 	'gtceu:chemical_reactor/plastic_board_ptfe',
	// 	'gtceu:chemical_reactor/plastic_board_pvc',
	// 	'gtceu:large_chemical_reactor/plastic_board_pbi',
	// 	'gtceu:large_chemical_reactor/plastic_board_polyethylene',
	// 	'gtceu:large_chemical_reactor/plastic_board_pvc',
	// 	'gtceu:large_chemical_reactor/plastic_board_ptfe',
	// 	'gtceu:chemical_reactor/plastic_circuit_board_iron3',
	// 	'gtceu:chemical_reactor/plastic_circuit_board_persulfate',
	// 	'gtceu:large_chemical_reactor/plastic_circuit_board_iron3',
	// 	'gtceu:large_chemical_reactor/plastic_circuit_board_persulfate'
	// ];
	// toRemove.forEach(id => event.remove({ id: id }));

	// [PORT-Ф2] tfg:silicon_carbide_plate — плита материала TFG (не зарегистрирована)
	// event.recipes.gtceu.arc_furnace('tfg:mo_activated_sic_substrate')
	// 	.itemInputs(Item.of('tfg:silicon_carbide_plate'), Item.of('gtceu:molybdenum_foil', 4))
	// 	.inputFluids(Fluid.of('gtceu:oxygen', 1000))
	// 	.itemOutputs(Item.of('tfg:mo_activated_sic_substrate'))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.chemical_bath('tfg:ceramic_circuit_board')
		.itemInputs(Item.of('tfg:mo_activated_sic_substrate'), Item.of('gtceu:nickel_dust', 1))
		.inputFluids(Fluid.of('gtceu:sulfuric_acid', 250))
		.itemOutputs(Item.of('gtceu:plastic_circuit_board', 4))
		.duration(20 * 25)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.chemical_bath('tfg:ceramic_circuit_board_t3')
		.itemInputs(Item.of('tfg:chromium_bonded_beo_pcb'), Item.of('gtceu:nickel_dust', 1))
		.inputFluids(Fluid.of('gtceu:sulfuric_acid', 250))
		.itemOutputs(Item.of('gtceu:plastic_circuit_board', 12))
		.duration(20 * 25)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.chemical_reactor('tfg:ceramic_printed_circuit_board_iron_iii_chloride')
		.itemInputs(Item.of('gtceu:plastic_circuit_board'), Item.of('gtceu:annealed_copper_foil', 6))
		.inputFluids(Fluid.of('gtceu:iron_iii_chloride', 500))
		.itemOutputs(Item.of('gtceu:plastic_printed_circuit_board'))
		.duration(20 * 30)
		.EUt(GTValues.VA[GTValues.LV])

	// [PORT-Ф2] tfg:redstone_tri_p_toluenesulfonate — жидкость материала TFG (recipes.etching, Ф2)
	// event.recipes.gtceu.chemical_reactor('tfg:ceramic_printed_circuit_board_redstone_tri_p_toluenesulfonate')
	// 	.itemInputs(Item.of('gtceu:plastic_circuit_board'), Item.of('gtceu:annealed_copper_foil', 6))
	// 	.inputFluids(Fluid.of('tfg:redstone_tri_p_toluenesulfonate', 250))
	// 	.itemOutputs(Item.of('gtceu:plastic_printed_circuit_board'))
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// Alumina Copper Bonded Circuit Boards

	// [PORT-Ф2] Удаления рециклинга фольг закомментированы: замещающие arc_furnace-рецепты подложек
	// (mo_activated_sic_substrate / copper_bonded_al2o3_pcb) отключены Ф2 — конфликта входов нет.
	// event.remove({ id: 'gtceu:arc_furnace/arc_cupronickel_foil'})
	// event.remove({ id: 'gtceu:arc_furnace/arc_silicon_carbide_plate'})
	// event.remove({ id: 'gtceu:arc_furnace/arc_molybdenum_foil'})

	// [PORT-Ф2] tfg:alumina_plate — плита материала TFG (не зарегистрирована)
	// event.recipes.gtceu.arc_furnace('tfg:copper_bonded_al2o3_pcb')
	// 	.itemInputs(Item.of('tfg:alumina_plate'), Item.of('gtceu:cupronickel_foil', 4))
	// 	.inputFluids(Fluid.of('gtceu:oxygen', 1000))
	// 	.itemOutputs(Item.of('tfg:copper_bonded_al2o3_pcb'))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.HV])

	event.recipes.gtceu.chemical_bath('tfg:ceramic_circuit_board_t2')
		.itemInputs(Item.of('tfg:copper_bonded_al2o3_pcb'), Item.of('gtceu:nickel_dust', 1))
		.inputFluids(Fluid.of('gtceu:sulfuric_acid', 250))
		.itemOutputs(Item.of('gtceu:plastic_circuit_board', 8))
		.duration(20 * 25)
		.EUt(GTValues.VA[GTValues.LV])

	// Lenses

	event.recipes.gtceu.alloy_smelter('tfg:optical_borosilicate_blank')
		.itemInputs(Item.of('gtceu:borosilicate_glass_dust', 1))
		.notConsumableItem(Item.of('gtceu:cylinder_casting_mold')) // [PORT-FIX] .notConsumable -> .notConsumableItem
		.itemOutputs(Item.of('tfg:optical_borosilicate_blank', 1))
		.duration(20 * 5)
		.EUt(GTValues.VA[GTValues.MV])

	// [PORT-Ф7] high_temperature_precision_fabricator не зарегистрирован; [PORT-Ф2] слёрри-жидкости
	// tfg:*_slurry (tfg.materials.gem_slurries) не зарегистрированы. Полировка линз отключена ЦЕЛИКОМ,
	// удаления стоковых рецептов линз тоже (иначе линзы останутся без рецептов).
	// function lensPolishing(event, fluid, colour, slurry, temp, energy) {
	// 	event.recipes.gtceu.high_temperature_precision_fabricator(`tfg:lens_${fluid}_${colour}`)
	// 		.itemInputs('tfg:worked_optical_borosilicate_blank', '#tfg:precision_fabricator_holder_rods')
	// 		.inputFluids(Fluid.of(`tfg:${slurry}_${fluid}_slurry`, 1000))
	// 		.itemOutputs(Item.of(`#c:lenses/${colour}`, 1))
	// 		.addData("ebf_temp", temp)
	// 		.duration(20 * 120)
	// 		.EUt(GTValues.VA[energy]);
	// }

	// const LENS_POLISHING = [
	// 	['emerald',      'green',      'dirty',    1530, GTValues.MV],
	// 	['sapphire',     'blue',       'dirty',    1530, GTValues.MV],
	// 	['ruby',         'red',        'dirty',    1530, GTValues.MV],
	// 	['diamond',      'light_blue', 'dirty',    1530, GTValues.MV],
	// 	['apatite',      'cyan',       'filtered', 1810, GTValues.HV],
	// 	['spessartine',  'orange',     'filtered', 1810, GTValues.HV],
	// 	['yellow_garnet','yellow',     'filtered', 1810, GTValues.HV],
	// 	['olivine',      'lime',       'filtered', 1810, GTValues.HV],
	// 	['amethyst',     'purple',     'filtered', 1810, GTValues.HV],
	// 	['grossular',    'brown',      'filtered', 1810, GTValues.HV],
	// 	['armalcolite',  'gray',       'filtered', 1810, GTValues.HV],
	// 	['coal',         'black',      'filtered', 1530, GTValues.MV],
	// ];

	// LENS_POLISHING.forEach(([fluid, colour]) => event.remove({ output: `#c:lenses/${colour}` }));
	// LENS_POLISHING.forEach(([fluid, colour]) => event.remove({ output: `gtceu:${colour}_glass_lens` }));
	// LENS_POLISHING.forEach(([fluid, colour, slurry, temp, energy]) => lensPolishing(event, fluid, colour, slurry, temp, energy));

	// Printed Circuit boards

	// [PORT] global.modifyRecipe (замена жидкостей) не портирован; замены требуют Ф2-жидкость
	// tfg:redstone_tri_p_toluenesulfonate — весь блок FLUID_REPLACEMENTS отключён, стоковые рецепты
	// продвинутых плат остаются нетронутыми. [PORT-TODO] вернуть при появлении Ф2/хелпера.
	// const FLUID_REPLACEMENTS = [
	// 	// Minimal T4 - EV
	// 	{ recipe: "advanced_circuit_board_persulfate", old: "c:sodium_persulfate", new: "gtceu:iron_iii_chloride" },
	// 	// Best T4 - EV
	// 	{ recipe: "advanced_circuit_board_iron3", old: "c:iron_iii_chloride", new: "tfg:redstone_tri_p_toluenesulfonate" },
	// 	// Minimal T5 - IV
	// 	{ recipe: "extreme_circuit_board_persulfate", old: "c:sodium_persulfate", new: "tfg:redstone_tri_p_toluenesulfonate" },
	// 	// Best T5 - IV
	// 	{ recipe: "extreme_circuit_board_iron3", old: "c:iron_iii_chloride", new: undefined },
	// 	// Minimal T6 - LuV
	// 	{ recipe: "elite_circuit_board_persulfate", old: "c:sodium_persulfate", new: "tfg:redstone_tri_p_toluenesulfonate" }, // Redstone Etching
	// 	// Best T6 - LuV
	// 	{ recipe: "elite_circuit_board_iron3", old: "c:iron_iii_chloride", new: undefined }, // New when Venus is Out
	// 	// Minimal T7 - ZPM
	// 	{ recipe: "wetware_circuit_board_persulfate", old: "c:sodium_persulfate", new: "tfg:redstone_tri_p_toluenesulfonate" }, // New when Venus is Out
	// 	// Best T7 - ZPM
	// 	{ recipe: "wetware_circuit_board_iron3", old: "c:iron_iii_chloride", new: undefined }, // New when ZPM Planet is Out
	// ]

	// FLUID_REPLACEMENTS.forEach((replacement) => { ... }) // [PORT] см. оригинал
})
