// priority: 0
"use strict";

// [PORT] Источник: server_scripts/gregtech/recipes.recycling.js (TFG 1.20.1)
// [PORT] Регистрация напрямую через ServerEvents.recipes (без диспетчера)
// [PORT-Ф4] TFGHelpers.registerMaterialInfo — хелпер Java-мода TFG, отсутствует в 1.21.1-сборке;
//   все вызовы закомментированы (Фаза 4). Сами removeMaceratorRecipe-удаления оставлены активными:
//   ванильные GT-рецепты мацерации всё равно дают неверный выход без TFG material info.
// [PORT-Ф2] gtceu:hardwood_dust — пыль KubeJS-материала gtceu:hardwood (TFG); предмет пыли не
//   регистрируется в GTM8-SNAPSHOT (Ф2, апстрим-баг) — рецепты с ним закомментированы.
// [PORT-FIX] Теги forge: -> c: (forge:nuggets/* -> c:nuggets/*, forge:tiny_dusts/* -> c:tiny_dusts/*)

// [PORT] локальная копия хелпера из recipes.removes.js (KubeJS 7: файлы изолированы)
// [PORT] greate отсутствует в сборке — строки с greate:-id убраны
function removeMaceratorRecipe(event, id) {
	event.remove({ id: `gtceu:macerator/${id}` })
	// event.remove({ id: `greate:milling/integration/gtceu/macerator/${id}` }) // [PORT] greate отсутствует
	// event.remove({ id: `greate:crushing/integration/gtceu/macerator/${id}` }) // [PORT] greate отсутствует
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port gregtech.recipes.recycling start')

	// Capacitors
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:tantalum_capacitor', [GTMaterials.Tantalum, 1 / 9, GTMaterials.Polyethylene, 1 / 9])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:capacitor', [GTMaterials.Polyethylene, 1 / 9])
	// Empty batteries
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:empty_tier_i_battery', [GTMaterials.Ultimet, 6])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:empty_tier_ii_battery', [GTMaterials.Ruridit, 6])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:empty_tier_iii_battery', [GTMaterials.Neutronium, 6])
	// Iron Door
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('minecraft:iron_door', [GTMaterials.Iron, 2])
	// GregTech Input Bus
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:lv_input_bus', [GTMaterials.Steel, 8, GTMaterials.Tin, 1, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:mv_input_bus', [GTMaterials.Aluminium, 8, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:hv_input_bus', [GTMaterials.StainlessSteel, 8, GTMaterials.Gold, 1, GTMaterials.Steel, 8, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:ev_input_bus', [GTMaterials.Titanium, 8, GTMaterials.Aluminium, 9, GTMaterials.Rubber, 2, GTMaterials.PolyvinylChloride, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:iv_input_bus', [GTMaterials.TungstenSteel, 8, GTMaterials.StainlessSteel, 8, GTMaterials.Polytetrafluoroethylene, 2, GTMaterials.PolyvinylChloride, 2, GTMaterials.Platinum, 1])
	// GregTech Output Bus
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:lv_output_bus', [GTMaterials.Steel, 8, GTMaterials.Tin, 1, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:mv_output_bus', [GTMaterials.Aluminium, 8, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:hv_output_bus', [GTMaterials.StainlessSteel, 8, GTMaterials.Gold, 1, GTMaterials.Steel, 8, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:ev_output_bus', [GTMaterials.Titanium, 8, GTMaterials.Aluminium, 9, GTMaterials.Rubber, 2, GTMaterials.PolyvinylChloride, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:iv_output_bus', [GTMaterials.TungstenSteel, 8, GTMaterials.StainlessSteel, 8, GTMaterials.Polytetrafluoroethylene, 2, GTMaterials.PolyvinylChloride, 2, GTMaterials.Platinum, 1])
	// GregTech Input Hatch
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:lv_input_hatch', [GTMaterials.Steel, 8, GTMaterials.Tin, 1, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:mv_input_hatch', [GTMaterials.Aluminium, 8, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:hv_input_hatch', [GTMaterials.StainlessSteel, 8, GTMaterials.Gold, 1, GTMaterials.Steel, 6, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:ev_input_hatch', [GTMaterials.Titanium, 8, GTMaterials.Aluminium, 7, GTMaterials.Rubber, 2, GTMaterials.PolyvinylChloride, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:iv_input_hatch', [GTMaterials.TungstenSteel, 8, GTMaterials.StainlessSteel, 6, GTMaterials.Polytetrafluoroethylene, 2, GTMaterials.PolyvinylChloride, 2, GTMaterials.Platinum, 1])
	// GregTech Output Hatch
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:lv_output_hatch', [GTMaterials.Steel, 8, GTMaterials.Tin, 1, GTMaterials.WroughtIron, 1, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:mv_output_hatch', [GTMaterials.Aluminium, 8, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:hv_output_hatch', [GTMaterials.StainlessSteel, 8, GTMaterials.Gold, 1, GTMaterials.Steel, 6, GTMaterials.Rubber, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:ev_output_hatch', [GTMaterials.Titanium, 8, GTMaterials.Aluminium, 7, GTMaterials.Rubber, 2, GTMaterials.PolyvinylChloride, 2])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:iv_output_hatch', [GTMaterials.TungstenSteel, 8, GTMaterials.StainlessSteel, 6, GTMaterials.Polytetrafluoroethylene, 2, GTMaterials.PolyvinylChloride, 2, GTMaterials.Platinum, 1])
	// Maintenance Hatch
	removeMaceratorRecipe(event, 'macerate_maintenance_hatch')
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:maintenance_hatch', [GTMaterials.Steel, 8, GTMaterials.Rubber, 2, GTMaterials.Tin, 1])
	// Bricks
	removeMaceratorRecipe(event, 'macerate_bronze_tank_valve')
	removeMaceratorRecipe(event, 'macerate_steam_machine_casing')
	removeMaceratorRecipe(event, 'macerate_bronze_multiblock_tank')
	removeMaceratorRecipe(event, 'macerate_steel_brick_casing')
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('minecraft:bricks', [GTMaterials.Brick, 1.25])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('minecraft:brick_stairs', [GTMaterials.Brick, 1.25])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('minecraft:brick_wall', [GTMaterials.Brick, 0.5])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('minecraft:brick_slab', [GTMaterials.Brick, 0.5])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:steel_brick_casing', [GTMaterials.Brick, 3.75, GTMaterials.WroughtIron, 5])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:steam_machine_casing', [GTMaterials.Brick, 0.5, GTMaterials.Bronze, 3])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:bronze_tank_valve', [GTMaterials.Brick, 0.5, GTMaterials.Bronze, 7.25])
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:bronze_multiblock_tank', [GTMaterials.Brick, 0.5, GTMaterials.Bronze, 3.5])
	// Unused steam machines
	removeMaceratorRecipe(event, 'macerate_bronze_brick_casing')
	removeMaceratorRecipe(event, 'macerate_charcoal_pile_igniter')
	removeMaceratorRecipe(event, 'macerate_lp_steam_liquid_boiler')
	removeMaceratorRecipe(event, 'macerate_lp_steam_miner')
	removeMaceratorRecipe(event, 'macerate_lp_steam_solid_boiler')
	removeMaceratorRecipe(event, 'macerate_lp_steam_solar_boiler')

	// #region Hanging Signs
	global.TFC_EQUIPMENT_METALS.forEach(metal => {
		// Recycling Hardwood
		// Arc Recycling Hardwood
		event.recipes.gtceu.arc_furnace(`tfg:arc_recycling/${metal}/hardwood`)
			.itemInputs(`#tfg:hanging_sign/${metal}/hardwood`)
			.itemOutputs('gtceu:tiny_ash_dust')
			.chancedOutput(`gtceu:${metal}_nugget`, 3750) // [PORT-FIX] выход тегом невозможен в GTM HEAD -> конкретный самородок GT (существует для всех 9 металлов)
			.duration(12)
			.EUt(30)
			.category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
		// Macerating Hardwood
		// [PORT-Ф2] gtceu:hardwood_dust — пыль TFG-материала не регистрируется (Ф2):
		// event.recipes.gtceu.macerator(`tfg:macerating/hanging_sign/${metal}/hardwood`)
		// 	.itemInputs(`#tfg:hanging_sign/${metal}/hardwood`)
		// 	.itemOutputs('gtceu:hardwood_dust')
		// 	.chancedOutput(`#c:tiny_dusts/${metal}`, 3750, 0)
		// 	.duration(108)
		// 	.EUt(8)
		// 	.category(GTRecipeCategories.MACERATOR_RECYCLING)

		// Recycling Softwood
		// Arc Recycling Softwood
		event.recipes.gtceu.arc_furnace(`tfg:arc_recycling/${metal}/softwood`)
			.itemInputs(`#tfg:hanging_sign/${metal}/softwood`)
			.itemOutputs('gtceu:tiny_ash_dust')
			.chancedOutput(`gtceu:${metal}_nugget`, 3750) // [PORT-FIX] выход тегом невозможен в GTM HEAD -> конкретный самородок GT (существует для всех 9 металлов)
			.duration(12)
			.EUt(30)
			.category(GTRecipeCategories.ARC_FURNACE_RECYCLING)
		// Macerating Softwood
		event.recipes.gtceu.macerator(`tfg:macerating/hanging_sign/${metal}/softwood`)
			.itemInputs(`#tfg:hanging_sign/${metal}/softwood`)
			.itemOutputs('gtceu:wood_dust')
			.chancedOutput(`gtceu:${metal}_nugget`, 3750) // [PORT-FIX] выход тегом невозможен в GTM HEAD -> конкретный самородок GT (существует для всех 9 металлов)
			.duration(108)
			.EUt(8)
			.category(GTRecipeCategories.MACERATOR_RECYCLING)
	})
	// #endregion

	//#region Supports
	// [PORT-Ф2] gtceu:hardwood_dust — пыль TFG-материала не регистрируется (Ф2):
	// event.recipes.gtceu.macerator(`hardwood_support_to_dust`)
	// 	.itemInputs('#tfg:hardwood_supports')
	// 	.itemOutputs('gtceu:hardwood_dust')
	// 	.duration(150)
	// 	.EUt(2)
	// 	.category(GTRecipeCategories.MACERATOR_RECYCLING);

	event.recipes.gtceu.macerator(`softwood_support_to_dust`)
		.itemInputs('#tfg:softwood_supports')
		.itemOutputs('gtceu:wood_dust')
		.duration(150)
		.EUt(2)
		.category(GTRecipeCategories.MACERATOR_RECYCLING);
	//#endregion
})
