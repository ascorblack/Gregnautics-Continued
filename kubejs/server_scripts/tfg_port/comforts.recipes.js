"use strict";

// [PORT] Портировано из comforts/recipes.js (TerraFirmaGreg-Modern 1.20.1) на KubeJS 7 / 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию события.

/**
 *
 * @param {Internal.RecipesEventJS} event
 */
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port comforts recipes start')

	event.remove({ mod: "comforts" })

	//Rope and Nail
	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:rope_coil) — рецепт закомментирован,
	// [PORT-CHECK] rope_and_nail остался без рецепта после event.remove({mod:"comforts"}) — нужен заменитель верёвки
	// event.shapeless("comforts:rope_and_nail", ["firmaciv:rope_coil", "gtceu:wrought_iron_screw"])
	// 	.id("comforts:crafting/shaped/rope_and_nail");

	//sleeping bag
	// [PORT-FIX] tfc:damage_inputs_shapeless_crafting удалён в TFC 1.21 — заменён на
	// [PORT-FIX] tfc:advanced_shapeless_crafting с primary_ingredient + remainder (tfc:damage_crafting_remainder)
	// [PORT-FIX] сырой JSON {modifiers:[...]} не проходит кодек ISP ("No key id") — используем биндинг
	// [PORT-FIX] TFC.isp.empty().damageInput() (ISPExtension#kubejs_tfc$damageInput добавляет tfc:damage_crafting_remainder)
	event.recipes.tfc.advanced_shapeless_crafting(
		"comforts:sleeping_bag_white",
		[ "#tfc:high_quality_cloth", "#tfc:high_quality_cloth", "#tfc:high_quality_cloth", "#tfc:sewing_needles" ],
		"#tfc:sewing_needles"
	).remainder(TFC.isp.empty().damageInput())
		.id('comforts:shaped/sleeping_bag_white');

	event.shaped("comforts:hammock_white", [
		"ABA",
		"CCC",
		"ABA"
	], {
		A: "#c:strings", // [PORT-FIX] forge:string -> c:strings (в 1.21 тег во множественном числе, data/c/tags/item/strings.json)
		B: "gtceu:long_wood_rod",
		C: "#tfc:high_quality_cloth",
	})


	global.MINECRAFT_DYE_NAMES.forEach(dyeName => {

		event.recipes.gtceu.chemical_bath(`comforts:chemical_bath/dye_${dyeName}_sleeping_bag`)
			.itemInputs("#comforts:sleeping_bags")
			.inputFluids(Fluid.of(`tfc:${dyeName}_dye`, 144))
			.itemOutputs(`comforts:sleeping_bag_${dyeName}`)
			.duration(20 * 15)
			.category(GTRecipeCategories.CHEM_DYES)
			.EUt(4);

		// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration), .inputs() заменён на .inputItem()
		event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dyeName}_dye`, 144), 20 * 60)
			.inputItem("#comforts:sleeping_bags")
			.outputItem(`comforts:sleeping_bag_${dyeName}`)
			.id(`barrel/comforts/sleeping_bag_${dyeName}`)

		event.recipes.gtceu.chemical_bath(`comforts:chemical_bath/dye_${dyeName}_hammock`)
			.itemInputs("#comforts:hammocks")
			.inputFluids(Fluid.of(`tfc:${dyeName}_dye`, 144))
			.itemOutputs(`comforts:hammock_${dyeName}`)
			.duration(20 * 15)
			.category(GTRecipeCategories.CHEM_DYES)
			.EUt(4);

		// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration), .inputs() заменён на .inputItem()
		event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dyeName}_dye`, 144), 20 * 60)
			.inputItem("#comforts:hammocks")
			.outputItem(`comforts:hammock_${dyeName}`)
			.id(`barrel/comforts/hammock_${dyeName}`)
	})
})
