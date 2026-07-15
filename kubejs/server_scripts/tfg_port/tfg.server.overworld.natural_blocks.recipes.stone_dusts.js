// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.stone_dusts.js (1.20.1) на 1.21.1 NeoForge.
// [PORT-Ф2] Большая часть файла завязана на GT-материалы TFG (tfg:igneous_* / sedimentary_* пыли)
// и Create-материалы (asurine/ochrum), которые не регистрируются до фикса GTM8 (Ф2 заблокирована,
// диспетчер 05_startup.dispatch.js.disabled). Соответствующие рецепты закомментированы 1:1.

const $ChanceLogic = Java.loadClass('com.gregtechceu.gtceu.api.recipe.chance.logic.ChanceLogic')

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.stone_dusts start')

	// [PORT-Ф2] Выходы — пыли TFG-материалов (пустые теги до Ф2; chanced-выход тегом в GTM8 невозможен)
	// Same outputs as base GT, but with small dusts instead
	// event.recipes.gtceu.centrifuge('gtceu:stone_dust_separation')
	// 	.itemInputs('gtceu:stone_dust')
	// 	.chancedItemOutputLogic($ChanceLogic.XOR)
	// 	.chancedOutput('#c:dusts/igneous_mafic', 1666, 0)
	// 	.chancedOutput('#c:dusts/igneous_intermediate', 1666, 0)
	// 	.chancedOutput('#c:dusts/igneous_felsic', 1666, 0)
	// 	.chancedOutput('#c:dusts/metamorphic', 1666, 0)
	// 	.chancedOutput('#c:dusts/sedimentary_carbonate', 1666, 0)
	// 	.chancedOutput('#c:dusts/sedimentary_clastic', 1666, 0)
	// 	.duration(1 * 20)
	// 	.EUt(GTValues.VA[GTValues.HV])


	// AE2

	event.recipes.gtceu.centrifuge('sky_dust_separation')
		.EUt(GTValues.VA[GTValues.LV])
		.duration(100)
		.itemInputs('ae2:sky_dust')
		.itemOutputs(ChemicalHelper.get(TagPrefix.dustSmall, GTMaterials.SiliconDioxide, 1))
		.chancedOutput(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.CertusQuartz, 1), 4500)

	// Create

	// [PORT-Ф2] Материалы gtceu:asurine / gtceu:ochrum и tfg:igneous_intermediate регистрируются
	// стартапами Ф2 (create.materials.js / tfg.materials.rocks.js) — диспетчер выключен до фикса GTM8.
	// TFGHelpers.getMaterial — хелпер TFG-мода, при включении заменить на GTMaterials.get('gtceu:asurine') и т.п.
	// event.recipes.gtceu.centrifuge('asurine_dust_separation')
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.duration(10 * 20)
	// 	.itemInputs(ChemicalHelper.get(TagPrefix.dust, GTMaterials.get('gtceu:asurine'), 1))
	// 	.chancedOutput('ae2:sky_dust', 6000, 0)
	// 	.chancedOutput(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.get('tfg:igneous_intermediate'), 1), 5000, 0)
	// 	.chancedOutput(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Olivine, 1), 4500, 0)
	// 	.chancedOutput(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Zinc, 1), 3500, 0)
	// 	.outputFluids(Fluid.of('gtceu:helium_3', 500))
	//
	// event.recipes.gtceu.centrifuge('ochrum_dust_separation')
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.duration(480)
	// 	.itemInputs(ChemicalHelper.get(TagPrefix.dust, GTMaterials.get('gtceu:ochrum'), 1))
	// 	.chancedOutput(ChemicalHelper.get(TagPrefix.dustSmall, GTMaterials.Quartzite, 1), 5000, 0)
	// 	.chancedOutput(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Hematite, 1), 3500, 0)
	// 	.chancedOutput(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Gold, 1), 3500, 0)

})
