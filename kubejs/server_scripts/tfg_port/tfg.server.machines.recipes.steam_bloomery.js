// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.steam_bloomery.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф7] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН: тип рецептов gtceu:steam_bloomery — мультиблок TFG,
//   registerGTCEuMachines/registerGTCEuRecipeTypes не портированы (апстрим-баг GTM8).
// [PORT-Ф2] TFGPropertyKey.TFC_PROPERTY — свойство материалов Java-мода TFG, отсутствует; перебор
//   материалов с TFC-свойством невозможен до Ф2.
// [PORT-CHECK] Тег #tfg:bloomery_basic_fuels пока нигде не наполняется.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.steam_bloomery start (disabled, Ф7)')

	// [PORT-Ф7] --- начало отключённого блока (оригинал сохранён, теги переведены на c:) ---

	// event.recipes.gtceu.steam_bloomery('steam_raw_iron_bloom_coal')
	// 	.itemInputs('#c:ingots/iron', '#tfg:bloomery_basic_fuels')
	// 	.itemOutputs('tfc:raw_iron_bloom')
	// 	.duration(2400)
	// 	.EUt(2)

	// event.recipes.gtceu.steam_bloomery('steam_raw_iron_bloom_coalcoke')
	// 	.itemInputs('2x #c:ingots/iron', '#tfc:blast_furnace_fuel')
	// 	.itemOutputs('2x tfc:raw_iron_bloom')
	// 	.duration(2400)
	// 	.EUt(2)

	// forEachMaterial(material => {

	// 	const tfcProperty = material.getProperty(TFGPropertyKey.TFC_PROPERTY) // [PORT-Ф2] TFGPropertyKey отсутствует
	// 	if (tfcProperty === null)
	// 		return;

	// 	const outputMaterial = tfcProperty.getOutputMaterial() === null ? material : tfcProperty.getOutputMaterial()
	// 	if (outputMaterial === GTMaterials.Iron) {
	// 		event.recipes.gtceu.steam_bloomery(`steam_raw_iron_bloom_coal_${material.getName()}`)
	// 			.itemInputs(ChemicalHelper.get(TagPrefix.dust, material, 1), '#tfg:bloomery_basic_fuels')
	// 			.itemOutputs('tfc:raw_iron_bloom')
	// 			.duration(2400)
	// 			.EUt(2)

	// 		event.recipes.gtceu.steam_bloomery(`steam_raw_iron_bloom_coalcoke_${material.getName()}`)
	// 			.itemInputs(ChemicalHelper.get(TagPrefix.dust, material, 2), '#tfc:blast_furnace_fuel')
	// 			.itemOutputs('2x tfc:raw_iron_bloom')
	// 			.duration(2400)
	// 			.EUt(2)
	// 	}
	// })

	// [PORT-Ф7] --- конец отключённого блока ---
})
