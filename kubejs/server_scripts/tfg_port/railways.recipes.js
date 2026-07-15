// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/railways/recipes.js (1.20.1 -> 1.21.1).
// registerRailWaysRecipes -> прямой обработчик ServerEvents.recipes (KubeJS 7: изолированные скоупы).
// Основные замены: forge: -> c:; forge:sheets/X -> c:plates/X (GTM8); forge:tools/hammers -> c:tools/hammer;
// forge:string -> c:strings, forge:stone -> c:stones (конвенции NeoForge 1.21);
// greate отсутствует в сборке: greate.pressing -> createPressing, greate:steel_cogwheel -> gtceu:steel_gear.
// Рецепты locometal — в отдельном файле railways.recipes.locometal.js (свой обработчик).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port railways recipes start')

	// Удаление рецептов мода railways
	event.remove({ mod: 'railways' });

	// [PORT] registerRailwaysLocometalRecipes(event) — перенесено в railways.recipes.locometal.js (изолированные скоупы KubeJS 7)

	// Семафор
	event.shaped('railways:semaphore', [
		' A ',
		'BCD',
		'EAE'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		B: '#minecraft:fences',
		C: 'create:andesite_casing',
		D: '#c:small_gears/red_alloy', // [PORT] forge: -> c:
		E: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('tfg:railways/shaped/semaphore')

	event.recipes.gtceu.assembler('tfg:railways/semaphore')
		.itemInputs('2x #c:plates/wrought_iron', '#minecraft:fences', 'create:andesite_casing', '#c:small_gears/red_alloy') // [PORT] forge: -> c:
		.circuit(3)
		.itemOutputs('railways:semaphore')
		.duration(200)
		.EUt(28)
		.addMaterialInfo(true)

	// Соединитель поездов
	event.shaped('railways:track_coupler', [
		'AAA',
		'DBE',
		' C '
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge:sheets -> c:plates (GTM8)
		B: 'gtceu:red_alloy_single_wire',
		C: 'create:railway_casing',
		D: '#c:tools/wire_cutter', // [PORT] forge: -> c:
		E: '#c:tools/screwdriver', // [PORT] forge: -> c:
	}).id('tfg:railways/shaped/track_coupler')

	event.recipes.gtceu.assembler('tfg:railways/track_coupler')
		.itemInputs('3x #c:plates/wrought_iron', 'gtceu:red_alloy_single_wire', 'create:railway_casing') // [PORT] forge:sheets -> c:plates (GTM8)
		.circuit(3)
		.itemOutputs('railways:track_coupler')
		.duration(200)
		.EUt(28)
		.addMaterialInfo(true)

	//#region Couplers and Buffers

	const SNR_BASE_COUPLERS = [
		'link_and_pin',
		'link_and_pin_linkless',
		'knuckle_coupler',
		'split_knuckle_coupler',
		'screwlink_coupler'
	]

	event.shapeless('railways:link_and_pin', [
		'minecraft:tripwire_hook',
		'#c:plates/steel', // [PORT] forge: -> c:
		'#c:screws/steel', // [PORT] forge: -> c:
		'#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	]).id('railways:shapeless/link_and_pin')

	event.stonecutting(`railways:wooden_headstock`, '#minecraft:wooden_slabs');
	event.stonecutting(`4x railways:copycat_headstock`, '#c:ingots/zinc'); // [PORT] forge: -> c:

	SNR_BASE_COUPLERS.forEach((coupler, i) => {
		event.stonecutting(`railways:${coupler}`, `#railways:deco_couplers`); // [PORT-FIX] аргументы были перепутаны: результат stonecutting не может быть тегом

		event.recipes.gtceu.assembler(`tfg:railways/${coupler}`)
			.itemInputs(`minecraft:tripwire_hook`, `#c:plates/steel`, '#c:screws/steel') // [PORT] forge: -> c:
			.circuit(i + 1)
			.itemOutputs(`railways:${coupler}`)
			.duration(200)
			.EUt(28)
			.addMaterialInfo(true)

		event.shapeless(`railways:wooden_headstock_${coupler}`, [
			`railways:${coupler}`,
			`railways:wooden_headstock`
		]).id(`railways:shapeless/wooden_headstock_${coupler}`)

		event.recipes.gtceu.assembler(`tfg:railways/wooden_headstock_${coupler}`)
			.itemInputs(`railways:${coupler}`, `railways:wooden_headstock`)
			.itemOutputs(`railways:wooden_headstock_${coupler}`)
			.duration(200)
			.EUt(28)
			.addMaterialInfo(true)

		event.shapeless(`railways:copycat_headstock_${coupler}`, [
			`railways:${coupler}`,
			`railways:copycat_headstock`
		]).id(`railways:shapeless/copycat_headstock_${coupler}`)

		event.recipes.gtceu.assembler(`tfg:railways/copycat_headstock_${coupler}`)
			.itemInputs(`railways:${coupler}`, `railways:copycat_headstock`)
			.itemOutputs(`railways:copycat_headstock_${coupler}`)
			.duration(200)
			.EUt(28)
			.addMaterialInfo(true)
	})

	event.shapeless(`railways:small_buffer`, [
		`#railways:deco_couplers`,
		`#c:ingots/steel`, // [PORT] forge: -> c:
		`#c:tools/hammer` // [PORT] forge:tools/hammers -> c:tools/hammer
	]).id(`railways:shapeless/small_buffer`)

	event.recipes.gtceu.assembler(`tfg:railways/small_buffer`)
		.itemInputs(`#railways:deco_couplers`, `#c:ingots/steel`) // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs(`railways:small_buffer`)
		.duration(200)
		.EUt(28)
		.addMaterialInfo(true)

	event.shapeless(`railways:big_buffer`, [
		`railways:small_buffer`,
		`#c:ingots/steel`, // [PORT] forge: -> c:
		`#c:tools/hammer` // [PORT] forge:tools/hammers -> c:tools/hammer
	]).id(`railways:shapeless/big_buffer`)

	event.recipes.gtceu.assembler(`tfg:railways/big_buffer`)
		.itemInputs(`railways:small_buffer`, `#c:ingots/steel`) // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs(`railways:big_buffer`)
		.duration(200)
		.EUt(28)
		.addMaterialInfo(true)

	event.shaped('railways:buffer', [
		'BAB',
		'AAA',
		'ACA'
		], {
		A: '#c:rods/long/steel', // [PORT] forge: -> c:
		B: 'railways:small_buffer',
		C: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('railways:shaped/buffer')

	event.recipes.gtceu.assembler(`tfg:railways/buffer`)
		.itemInputs(`6x #c:rods/long/steel`, `2x railways:small_buffer`) // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs(`railways:buffer`)
		.duration(200)
		.EUt(28)
		.addMaterialInfo(true)

	event.shapeless(`railways:wooden_headstock_buffer`, [
		`railways:small_buffer`,
		`railways:wooden_headstock`
	]).id(`railways:shapeless/wooden_headstock_buffer`)

	event.recipes.gtceu.assembler(`tfg:railways/wooden_headstock_buffer`)
		.itemInputs(`railways:small_buffer`, `railways:wooden_headstock`)
		.itemOutputs(`railways:wooden_headstock_buffer`)
		.duration(200)
		.EUt(28)
		.addMaterialInfo(true)

	event.shapeless(`railways:copycat_headstock_buffer`, [
		`railways:small_buffer`,
		`railways:copycat_headstock`
	]).id(`railways:shapeless/copycat_headstock_buffer`)

	event.recipes.gtceu.assembler(`tfg:railways/copycat_headstock_buffer`)
		.itemInputs(`railways:small_buffer`, `railways:copycat_headstock`)
		.itemOutputs(`railways:copycat_headstock_buffer`)
		.duration(200)
		.EUt(28)
		.addMaterialInfo(true)

	//#endregion

	//#region conductor
	event.recipes.gtceu.assembler(`tfg:railways/conductor_cap`)
		.itemInputs('#gtceu:circuits/lv', '#gtceu:electric_motors', '2x #c:strings', '#tfc:high_quality_cloth') // [PORT] forge:string -> c:strings (конвенция NeoForge 1.21)
		.circuit(15)
		.itemOutputs('railways:white_conductor_cap')
		.duration(80)
		.inputFluids(Fluid.of('gtceu:glue', 200))
		.EUt(16)

	event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:lye`, 288), 1000) // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration), .inputs() нет — заменено на .inputItem()
		.inputItem('#tfg:colored_caps')
		.outputItem(`railways:white_conductor_cap`)
		.id(`railways:barrel/cap_decolor`)

	event.recipes.gtceu.chemical_bath(`tfg:cap_decolor_bath`)
		.itemInputs('#tfg:colored_caps')
		.inputFluids(Fluid.of('gtceu:chlorine', 20))
		.itemOutputs('railways:white_conductor_cap')
		.duration(80)
		.EUt(4)
		.category(GTRecipeCategories.CHEM_DYES)

	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		event.recipes.gtceu.chemical_bath(`railways/${dye}_conductor_cap`)
			.itemInputs('railways:white_conductor_cap')
			.inputFluids(Fluid.of(`tfc:${dye}_dye`, 288))
			.itemOutputs(`railways:${dye}_conductor_cap`)
			.duration(200)
			.EUt(4)
			.category(GTRecipeCategories.CHEM_DYES)
		if (dye !== "white") {
			event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dye}_dye`, 288), 1000) // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration), .inputs() нет — заменено на .inputItem()
				.inputItem(`railways:white_conductor_cap`)
				.outputItem(`railways:${dye}_conductor_cap`)
				.id(`railways:barrel/dyeing/${dye}_conductor_cap`)
		}
	})

	//#endregion

	//portable fuel interface
	event.shaped('railways:portable_fuel_interface', [
		'C  ',
		'BA ',
		], {
		A: 'create:portable_fluid_interface',
		B: 'create:railway_casing',
		C: '#c:tools/wrench', // [PORT] forge: -> c:
	}).id('tfg:railways/shaped/portable_fuel_interface')

	event.recipes.gtceu.assembler('tfg:railways/portable_fuel_interface')
		.itemInputs('create:portable_fluid_interface', 'create:railway_casing')
		.circuit(1)
		.itemOutputs('railways:portable_fuel_interface')
		.duration(200)
		.EUt(28)

	//fuel tank
	event.shaped('railways:fuel_tank', [
		'CE ',
		'BAD',
		], {
		A: 'create:fluid_tank',
		B: 'create:railway_casing',
		C: '#c:tools/screwdriver', // [PORT] forge: -> c:
		D: '#c:small_gears/brass', // [PORT] forge: -> c:
		E: 'firmalife:reinforced_glass',
	}).id('tfg:railways/shaped/fuel_tank')

	event.recipes.gtceu.assembler('tfg:railways/fuel_tank')
		.itemInputs('create:fluid_tank', 'create:railway_casing', '#c:small_gears/brass', 'firmalife:reinforced_glass') // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs('railways:fuel_tank')
		.duration(200)
		.EUt(28)

	// Переключатель пути поезда из андезита
	event.shaped('railways:track_switch_andesite', [
		'BAB',
		'CDC',
		'ECF'
	], {
		A: 'minecraft:lever',
		B: '#c:bolts/wrought_iron', // [PORT] forge: -> c:
		C: '#c:cogwheels', // [PORT] forge: -> c:
		D: 'create:andesite_casing',
		E: '#c:tools/screwdriver', // [PORT] forge: -> c:
		F: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('tfg:railways/shaped/track_switch_andesite')

	event.recipes.gtceu.assembler('tfg:railways/track_switch_andesite')
		.itemInputs('minecraft:lever', '2x #c:bolts/wrought_iron', '2x #c:cogwheels', 'create:andesite_casing') // [PORT] forge: -> c:
		.circuit(3)
		.itemOutputs('railways:track_switch_andesite')
		.duration(200)
		.EUt(28)

	// Переключатель пути поезда из латуни
	event.shaped('railways:track_switch_brass', [
		'BAB',
		'CDC',
		'ECF'
	], {
		A: 'minecraft:lever',
		B: '#c:bolts/brass', // [PORT] forge: -> c:
		C: '#c:cogwheels', // [PORT] forge: -> c:
		D: 'create:brass_casing',
		E: '#c:tools/screwdriver', // [PORT] forge: -> c:
		F: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('tfg:railways/shaped/track_switch_brass')

	event.recipes.gtceu.assembler('tfg:railways/track_switch_brass')
		.itemInputs('minecraft:lever', '2x #c:bolts/brass', '2x #c:cogwheels', 'create:brass_casing') // [PORT] forge: -> c:
		.circuit(3)
		.itemOutputs('railways:track_switch_brass')
		.duration(200)
		.EUt(28)

	// Свисток кондуктора
	event.shaped('railways:conductor_whistle', [
		'ABC'
	], {
		A: '#c:plates/brass', // [PORT] forge: -> c:
		B: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		C: '#c:tools/file', // [PORT] forge: -> c:
	}).id('tfg:railways/shaped/conductor_whistle')

	event.recipes.gtceu.assembler('tfg:railways/conductor_whistle')
		.itemInputs('#c:plates/brass') // [PORT] forge: -> c:
		.circuit(30)
		.itemOutputs('railways:conductor_whistle')
		.duration(200)
		.EUt(28)

	// Удаленная линза
	event.shaped('railways:remote_lens', [
		'ABC',
		'DE '
	], {
		A: '#c:plates/brass', // [PORT] forge: -> c:
		B: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		C: '#c:tools/file', // [PORT] forge: -> c:
		D: 'create:precision_mechanism',
		E: 'gtceu:lv_sensor'
	}).id('tfg:railways/shaped/remote_lens')

	event.recipes.gtceu.assembler('tfg:railways/remote_lens')
		.itemInputs('#c:plates/brass', 'create:precision_mechanism', 'gtceu:lv_sensor') // [PORT] forge: -> c:
		.circuit(3)
		.itemOutputs('railways:remote_lens')
		.duration(200)
		.EUt(28)



	//#region Smokestacks

	event.shaped('railways:smokestack_caboosestyle', [
		'BCB',
		'DA '
	], {
		A: '#c:storage_blocks/charcoal', // [PORT] forge: -> c:
		B: '#c:bolts/iron', // [PORT] forge: -> c:
		C: '#c:plates/iron', // [PORT] forge: -> c:
		D: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('tfg:railways/shaped/smokestack_caboosestyle')

	event.recipes.gtceu.assembler('tfg:railways/smokestack_caboosestyle')
		.itemInputs('#c:storage_blocks/charcoal', '2x #c:bolts/iron', '#c:plates/iron') // [PORT] forge: -> c:
		.circuit(4)
		.itemOutputs('railways:smokestack_caboosestyle')
		.duration(200)
		.EUt(28)

	event.shaped('2x railways:smokestack_diesel', [
		'ABA',
		'BCB',
		'ABA'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		B: '#c:rods/wrought_iron', // [PORT] forge: -> c:
		C: '#c:rotors/iron', // [PORT] forge: -> c:
	}).id('tfg:railways/shaped/smokestack_diesel')

	const SNR_SMOKESTACK_TYPES = [
		'woodburner',
		'long',
		'coalburner',
		'oilburner',
		'streamlined'
	]

	const SNR_SMOKESTACK_MATERIALS = [
		{ craft_mat: 'iron', base_mat: '', capped_mat: '_steel' },
		{ craft_mat: 'brass', base_mat: '_brass', capped_mat: '_brass' },
		{ craft_mat: 'copper', base_mat: '_copper', capped_mat: '_copper' }
	]

	SNR_SMOKESTACK_MATERIALS.forEach(mat => {
		event.shaped(`railways:smokestack_long${mat.base_mat}`, [
			'C  ',
			'BAB'
		], {
			A: '#c:storage_blocks/charcoal', // [PORT] forge: -> c:
			B: `#c:bolts/${mat.craft_mat}`, // [PORT] forge: -> c:
			C: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
		}).id(`tfg:railways/shaped/smokestack_long${mat.base_mat}`)

		event.recipes.gtceu.assembler(`tfg:railways/smokestack_long${mat.base_mat}`)
			.itemInputs('#c:storage_blocks/charcoal', `2x #c:bolts/${mat.craft_mat}`) // [PORT] forge: -> c:
			.circuit(5)
			.itemOutputs(`railways:smokestack_long${mat.base_mat}`)
			.duration(200)
			.EUt(28)

		event.shaped(`railways:smokestack_coalburner${mat.base_mat}`, [
			'B B',
			'BCB',
			'BAB'
		], {
			A: '#c:storage_blocks/charcoal', // [PORT] forge: -> c:
			B: `#c:plates/${mat.craft_mat}`, // [PORT] forge: -> c:
			C: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
		}).id(`tfg:railways/shaped/smokestack_coalburner${mat.base_mat}`)

		event.recipes.gtceu.assembler(`tfg:railways/smokestack_coalburner${mat.base_mat}`)
			.itemInputs('#c:storage_blocks/charcoal', `6x #c:plates/${mat.craft_mat}`) // [PORT] forge: -> c:
			.circuit(6)
			.itemOutputs(`railways:smokestack_coalburner${mat.base_mat}`)
			.duration(200)
			.EUt(28)

		event.shaped(`railways:smokestack_oilburner${mat.base_mat}`, [
			'BCB',
			'BAB'
		], {
			A: '#c:storage_blocks/charcoal', // [PORT] forge: -> c:
			B: `#c:plates/${mat.craft_mat}`, // [PORT] forge: -> c:
			C: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
		}).id(`tfg:railways/shaped/smokestack_oilburner${mat.base_mat}`)

		event.recipes.gtceu.assembler(`tfg:railways/smokestack_oilburner${mat.base_mat}`)
			.itemInputs('#c:storage_blocks/charcoal', `4x #c:plates/${mat.craft_mat}`) // [PORT] forge: -> c:
			.circuit(7)
			.itemOutputs(`railways:smokestack_oilburner${mat.base_mat}`)
			.duration(200)
			.EUt(28)

		event.shaped(`railways:smokestack_streamlined${mat.base_mat}`, [
			'C  ',
			'BAB'
		], {
			A: '#c:storage_blocks/charcoal', // [PORT] forge: -> c:
			B: `#c:plates/${mat.craft_mat}`, // [PORT] forge: -> c:
			C: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
		}).id(`tfg:railways/shaped/smokestack_streamlined${mat.base_mat}`)

		event.recipes.gtceu.assembler(`tfg:railways/smokestack_streamlined${mat.base_mat}`)
			.itemInputs('#c:storage_blocks/charcoal', `2x #c:plates/${mat.craft_mat}`) // [PORT] forge: -> c:
			.circuit(8)
			.itemOutputs(`railways:smokestack_streamlined${mat.base_mat}`)
			.duration(200)
			.EUt(28)

		event.shaped(`railways:smokestack_woodburner${mat.base_mat}`, [
			' D ',
			'CBC',
			'BAB'
		], {
			A: '#c:storage_blocks/charcoal', // [PORT] forge: -> c:
			B: `#c:plates/${mat.craft_mat}`, // [PORT] forge: -> c:
			C: `#c:bolts/${mat.craft_mat}`, // [PORT] forge: -> c:
			D: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
		}).id(`tfg:railways/shaped/smokestack_woodburner${mat.base_mat}`)

		event.recipes.gtceu.assembler(`tfg:railways/smokestack_woodburner${mat.base_mat}`)
			.itemInputs('#c:storage_blocks/charcoal', `3x #c:plates/${mat.craft_mat}`, `2x #c:bolts/${mat.craft_mat}`) // [PORT] forge: -> c:
			.circuit(9)
			.itemOutputs(`railways:smokestack_woodburner${mat.base_mat}`)
			.duration(200)
			.EUt(28)

		SNR_SMOKESTACK_TYPES.forEach(type => {

			if (mat.craft_mat != 'brass') {
				event.recipes.createItemApplication([`railways:smokestack_${type}_brass_cap${mat.capped_mat}`], [`railways:smokestack_${type}${mat.base_mat}`, { tag: 'c:bolts/brass' }]) // [PORT] forge: -> c: // [PORT-FIX] {tag:...}: Ingredient.of не проходит codec either<fluid,ingredient>
					.id(`tfg:railways/item_application/smokestack_${type}_brass_cap${mat.capped_mat}`)

				event.recipes.gtceu.chemical_bath(`railways:smokestack_${type}_brass_cap${mat.capped_mat}`)
					.itemInputs(`railways:smokestack_${type}${mat.base_mat}`)
					.inputFluids('gtceu:brass 18')
					.itemOutputs(`railways:smokestack_${type}_brass_cap${mat.capped_mat}`)
					.duration(20)
					.EUt(24)
					.category(GTRecipeCategories.CHEM_DYES)
			}
			if (mat.craft_mat != 'copper') {
				event.recipes.createItemApplication([`railways:smokestack_${type}_copper_cap${mat.capped_mat}`], [`railways:smokestack_${type}${mat.base_mat}`, { tag: 'c:bolts/copper' }]) // [PORT] forge: -> c: // [PORT-FIX] {tag:...}: Ingredient.of не проходит codec either<fluid,ingredient>
					.id(`tfg:railways/item_application/smokestack_${type}_copper_cap${mat.capped_mat}`)

				event.recipes.gtceu.chemical_bath(`railways:smokestack_${type}_copper_cap${mat.capped_mat}`)
					.itemInputs(`railways:smokestack_${type}${mat.base_mat}`)
					.inputFluids('gtceu:copper 18')
					.itemOutputs(`railways:smokestack_${type}_copper_cap${mat.capped_mat}`)
					.duration(20)
					.EUt(24)
					.category(GTRecipeCategories.CHEM_DYES)
			}
			// [PORT] railways:smokestack_*_iron_cap_* отсутствует в 1.21 (railways 0.2.1: железных колпаков нет) — рецепты отключены
			// event.recipes.createItemApplication([`railways:smokestack_${type}_iron_cap${mat.capped_mat}`], [`railways:smokestack_${type}${mat.base_mat}`, { tag: 'c:bolts/wrought_iron' }]) // [PORT] forge: -> c:
			// 	.id(`tfg:railways/item_application/smokestack_${type}_iron_cap${mat.capped_mat}`)

			// event.recipes.gtceu.chemical_bath(`railways:smokestack_${type}_iron_cap${mat.capped_mat}`)
			// 	.itemInputs(`railways:smokestack_${type}${mat.base_mat}`)
			// 	.inputFluids('gtceu:wrought_iron 18')
			// 	.itemOutputs(`railways:smokestack_${type}_iron_cap${mat.capped_mat}`)
			// 	.duration(20)
			// 	.EUt(24)
			// 	.category(GTRecipeCategories.CHEM_DYES)
		})
	})

	//#endregion

	//#region Tracks

	// Monorails
	event.recipes.createSequencedAssembly([
		'32x railways:track_monorail',
	], 'create:metal_girder', [
		event.recipes.createDeploying('railways:track_incomplete_monorail', ['railways:track_incomplete_monorail', { tag: 'c:plates/wrought_iron' }]), // [PORT] forge: -> c: // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createPressing('railways:track_incomplete_monorail', 'railways:track_incomplete_monorail'), // [PORT] greate.pressing -> createPressing (greate отсутствует в сборке 1.21.1)
		event.recipes.createDeploying('railways:track_incomplete_monorail', ['railways:track_incomplete_monorail', { tag: 'c:plates/wrought_iron' }]), // [PORT] forge: -> c: // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createPressing('railways:track_incomplete_monorail', 'railways:track_incomplete_monorail'), // [PORT] greate.pressing -> createPressing
	]).transitionalItem('railways:track_incomplete_monorail').loops(1).id('tfg:railways/sequenced_assembly/track_monorail/wrought_iron')

	event.recipes.gtceu.assembler('railways/monorail/wrought_iron')
		.itemInputs('create:metal_girder', '2x #c:plates/wrought_iron') // [PORT] forge: -> c:
		.itemOutputs('32x railways:track_monorail')
		.duration(200)
		.EUt(32)

	event.shaped(`24x railways:track_monorail`, [
		'PHP',
		'BGB'
	], {
		B: '#c:bolts/wrought_iron', // [PORT] forge: -> c:
		G: 'create:metal_girder',
		H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		P: '#c:plates/wrought_iron' // [PORT] forge: -> c:
	}).id(`tfg:railways/shaped/track_monorail`)

	event.recipes.createSequencedAssembly([
		'64x railways:track_monorail',
	], 'create:metal_girder', [
		event.recipes.createDeploying('railways:track_incomplete_monorail', ['railways:track_incomplete_monorail', { tag: 'c:plates/steel' }]), // [PORT] forge: -> c: // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createPressing('railways:track_incomplete_monorail', 'railways:track_incomplete_monorail'), // [PORT] greate.pressing -> createPressing
		event.recipes.createDeploying('railways:track_incomplete_monorail', ['railways:track_incomplete_monorail', { tag: 'c:plates/steel' }]), // [PORT] forge: -> c: // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createPressing('railways:track_incomplete_monorail', 'railways:track_incomplete_monorail'), // [PORT] greate.pressing -> createPressing
	]).transitionalItem('railways:track_incomplete_monorail').loops(1).id('tfg:railways/sequenced_assembly/track_monorail/steel')

	event.recipes.gtceu.assembler('railways/monorail/steel')
		.itemInputs('create:metal_girder', '2x #c:plates/steel') // [PORT] forge: -> c:
		.itemOutputs('64x railways:track_monorail')
		.duration(200)
		.EUt(32)

	const OTHER_TRACKS = [
		{ rail: 'blackstone', slab: 'minecraft:blackstone_slab', block: 'minecraft:blackstone' },
		{ rail: 'acacia', slab: 'afc:wood/planks/baobab_slab', block: 'afc:wood/planks/baobab' },
		{ rail: 'birch', slab: 'afc:wood/planks/eucalyptus_slab', block: 'afc:wood/planks/eucalyptus' },
		{ rail: 'cherry', slab: 'afc:wood/planks/fig_slab', block: 'afc:wood/planks/fig' },
		{ rail: 'jungle', slab: 'afc:wood/planks/teak_slab', block: 'afc:wood/planks/teak' },
		{ rail: 'spruce', slab: 'afc:wood/planks/cypress_slab', block: 'afc:wood/planks/cypress' },
		// [PORT] beneath отсутствует в сборке 1.21.1 — crimson/warped рельсы убраны
		// { rail: 'crimson', slab: 'beneath:wood/planks/crimson_slab', block: 'beneath:wood/planks/crimson' },
		// { rail: 'warped', slab: 'beneath:wood/planks/warped_slab', block: 'beneath:wood/planks/warped' },
		{ rail: 'stripped_bamboo', slab: 'minecraft:bamboo_slab', block: 'minecraft:bamboo_planks' },
		{ rail: 'bamboo', slab: 'minecraft:bamboo_block', block: 'minecraft:stripped_bamboo_block' },
		{ rail: 'tieless', slab: 'framedblocks:framed_slab', block: 'framedblocks:framed_cube' }
	]

	OTHER_TRACKS.forEach(x => {
		event.recipes.createSequencedAssembly([
			`32x railways:track_${x.rail}_narrow`,
		], x.slab, [
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}_narrow`, [`railways:track_incomplete_${x.rail}_narrow`, { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}_narrow`, [`railways:track_incomplete_${x.rail}_narrow`, { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createPressing(`railways:track_incomplete_${x.rail}_narrow`, `railways:track_incomplete_${x.rail}_narrow`), // [PORT] greate.pressing -> createPressing
		]).transitionalItem(`railways:track_incomplete_${x.rail}_narrow`).loops(2).id(`tfg:railways/sequenced_assembly/track_${x.rail}_narrow_alt`)

		event.recipes.gtceu.assembler(`tfg:railways/track_${x.rail}_narrow_alt`)
			.itemInputs(x.slab, `2x #tfg:track_rods`)
			.inputFluids(Fluid.of(`gtceu:concrete`, 144))
			.itemOutputs(`32x railways:track_${x.rail}_narrow`)
			.duration(200)
			.EUt(16)
			.circuit(1)

		event.shaped(`16x railways:track_${x.rail}_narrow`, [
			'R R',
			'MHM',
			' S '
		], {
			H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
			M: '#tfc:mortar',
			R: '#tfg:track_rods',
			S: x.slab
		}).id(`tfg:railways/shaped/track_${x.rail}_narrow`)

		event.recipes.createSequencedAssembly([
			`32x railways:track_${x.rail}`,
		], x.slab, [
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}`, [`railways:track_incomplete_${x.rail}`, x.slab]),
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}`, [`railways:track_incomplete_${x.rail}`, { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}`, [`railways:track_incomplete_${x.rail}`, { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createPressing(`railways:track_incomplete_${x.rail}`, `railways:track_incomplete_${x.rail}`), // [PORT] greate.pressing -> createPressing
		]).transitionalItem(`railways:track_incomplete_${x.rail}`).loops(2).id(`tfg:railways/sequenced_assembly/track_${x.rail}_alt`)

		event.recipes.gtceu.assembler(`tfg:railways/track_${x.rail}_normal_alt`)
			.itemInputs(`3x ${x.slab}`, `2x #tfg:track_rods`)
			.inputFluids(Fluid.of(`gtceu:concrete`, 144))
			.itemOutputs(`32x railways:track_${x.rail}`)
			.duration(200)
			.EUt(16)
			.circuit(2)

		event.shaped(`16x railways:track_${x.rail}`, [
			'R R',
			'MHM',
			'SSS'
		], {
			H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
			M: '#tfc:mortar',
			R: '#tfg:track_rods',
			S: x.slab
		}).id(`tfg:railways/shaped/track_${x.rail}`)

		event.recipes.createSequencedAssembly([
			`32x railways:track_${x.rail}_wide`,
		], x.slab, [
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}_wide`, [`railways:track_incomplete_${x.rail}_wide`, x.block]),
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}_wide`, [`railways:track_incomplete_${x.rail}_wide`, { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createDeploying(`railways:track_incomplete_${x.rail}_wide`, [`railways:track_incomplete_${x.rail}_wide`, { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createPressing(`railways:track_incomplete_${x.rail}_wide`, `railways:track_incomplete_${x.rail}_wide`), // [PORT] greate.pressing -> createPressing
		]).transitionalItem(`railways:track_incomplete_${x.rail}_wide`).loops(2).id(`tfg:railways/sequenced_assembly/track_${x.rail}_wide_alt`)

		event.recipes.gtceu.assembler(`tfg:railways/track_${x.rail}_wide_alt`)
			.itemInputs(`5x ${x.slab}`, `2x #tfg:track_rods`)
			.inputFluids(Fluid.of(`gtceu:concrete`, 144))
			.itemOutputs(`32x railways:track_${x.rail}_wide`)
			.duration(200)
			.EUt(16)
			.circuit(3)

		event.shaped(`16x railways:track_${x.rail}_wide`, [
			'R R',
			'MHM',
			'BSB'
		], {
			B: x.block,
			H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
			M: '#tfc:mortar',
			R: '#tfg:track_rods',
			S: x.slab
		}).id(`tfg:railways/shaped/track_${x.rail}_wide`)
	})

	event.recipes.createSequencedAssembly([
		'32x create:track',
	], '#tfg:rock_slabs', [
		event.recipes.createDeploying('railways:track_incomplete_blackstone', ['railways:track_incomplete_blackstone', { tag: 'tfg:rock_slabs' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createDeploying('railways:track_incomplete_blackstone', ['railways:track_incomplete_blackstone', { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createDeploying('railways:track_incomplete_blackstone', ['railways:track_incomplete_blackstone', { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createPressing('railways:track_incomplete_blackstone', 'railways:track_incomplete_blackstone'), // [PORT] greate.pressing -> createPressing
	]).transitionalItem('create:incomplete_track').loops(2).id('tfg:railways/sequenced_assembly/track_create_andesite')

	event.recipes.gtceu.assembler('railways/track')
		.itemInputs('3x #tfg:rock_slabs', '2x #tfg:track_rods')
		.inputFluids(Fluid.of('gtceu:concrete', 144))
		.itemOutputs('32x create:track')
		.duration(200)
		.EUt(16)
		.circuit(2)

	event.shaped('16x create:track', [
		'R R',
		'MHM',
		'SSS'
	], {
		H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		M: '#tfc:mortar',
		R: '#tfg:track_rods',
		S: '#tfg:rock_slabs'
	}).id(`tfg:railways/shaped/track_create_andesite`)

	// Create Stone Tracks (Narrow)
	event.recipes.createSequencedAssembly([
		'32x railways:track_create_andesite_narrow',
	], '#tfg:rock_slabs', [
		event.recipes.createDeploying('railways:track_incomplete_create_andesite_narrow', ['railways:track_incomplete_create_andesite_narrow', { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createDeploying('railways:track_incomplete_create_andesite_narrow', ['railways:track_incomplete_create_andesite_narrow', { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createPressing('railways:track_incomplete_create_andesite_narrow', 'railways:track_incomplete_create_andesite_narrow'), // [PORT] greate.pressing -> createPressing
	]).transitionalItem('railways:track_incomplete_create_andesite_narrow').loops(2).id('tfg:railways/sequenced_assembly/track_create_andesite_narrow')

	event.recipes.gtceu.assembler('railways/track_create_andesite_narrow')
		.itemInputs('#tfg:rock_slabs', '2x #tfg:track_rods')
		.inputFluids(Fluid.of('gtceu:concrete', 144))
		.itemOutputs('32x railways:track_create_andesite_narrow')
		.duration(200)
		.EUt(16)
		.circuit(1)

	event.shaped('16x railways:track_create_andesite_narrow', [
		'R R',
		'MHM',
		' S '
	], {
		H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		M: '#tfc:mortar',
		R: '#tfg:track_rods',
		S: '#tfg:rock_slabs'
	}).id(`tfg:railways/shaped/track_create_andesite_narrow`)

	// Create Stone Tracks (Wide)
	event.recipes.createSequencedAssembly([
		'32x railways:track_create_andesite_wide',
	], '#tfg:rock_slabs', [
		event.recipes.createDeploying('railways:track_incomplete_create_andesite_wide', ['railways:track_incomplete_create_andesite_wide', { tag: 'c:stones' }]), // [PORT] forge:stone -> c:stones (конвенция NeoForge 1.21) // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createDeploying('railways:track_incomplete_create_andesite_wide', ['railways:track_incomplete_create_andesite_wide', { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createDeploying('railways:track_incomplete_create_andesite_wide', ['railways:track_incomplete_create_andesite_wide', { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
		event.recipes.createPressing('railways:track_incomplete_create_andesite_wide', 'railways:track_incomplete_create_andesite_wide'), // [PORT] greate.pressing -> createPressing
	]).transitionalItem('railways:track_incomplete_create_andesite_wide').loops(2).id('tfg:railways/sequenced_assembly/track_create_andesite_wide')

	event.recipes.gtceu.assembler('railways/track_create_andesite_wide')
		.itemInputs('5x #tfg:rock_slabs', '2x #tfg:track_rods')
		.inputFluids(Fluid.of('gtceu:concrete', 144))
		.itemOutputs('32x railways:track_create_andesite_wide')
		.duration(200)
		.EUt(16)
		.circuit(3)

	event.shaped('16x railways:track_create_andesite_wide', [
		'R R',
		'MHM',
		'BSB'
	], {
		B: '#c:stones', // [PORT] forge:stone -> c:stones (конвенция NeoForge 1.21)
		H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		M: '#tfc:mortar',
		R: '#tfg:track_rods',
		S: '#tfg:rock_slabs'
	}).id(`tfg:railways/shaped/track_create_andesite_wide`)

	event.recipes.gtceu.assembler('tfg:railways/phantom_tracks')
		.itemInputs('32x #create:tracks', '#c:small_dusts/ender_pearl') // [PORT] forge: -> c:
		.itemOutputs('32x railways:track_phantom')
		.duration(100)
		.EUt(16)

	// TFC Wood Tracks
	global.TFC_WOOD_TYPES.forEach(woodType => {
		// Normal
		event.recipes.createSequencedAssembly([
			`32x railways:track_tfc_${woodType}`,
		], `tfc:wood/planks/${woodType}_slab`, [
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}`, [`railways:track_incomplete_tfc_${woodType}`, `tfc:wood/planks/${woodType}_slab`]),
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}`, [`railways:track_incomplete_tfc_${woodType}`, { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}`, [`railways:track_incomplete_tfc_${woodType}`, { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createPressing(`railways:track_incomplete_tfc_${woodType}`, `railways:track_incomplete_tfc_${woodType}`), // [PORT] greate.pressing -> createPressing
		]).transitionalItem(`railways:track_incomplete_tfc_${woodType}`).loops(2).id(`tfg:railways/sequenced_assembly/track_create_${woodType}`)

		event.recipes.gtceu.assembler(`railways/track_${woodType}`)
			.itemInputs(`3x tfc:wood/planks/${woodType}_slab`, '2x #tfg:track_rods')
			.inputFluids(Fluid.of('gtceu:concrete', 144))
			.itemOutputs(`32x railways:track_tfc_${woodType}`)
			.duration(200)
			.EUt(16)
			.circuit(2)

		event.shaped(`16x railways:track_tfc_${woodType}`, [
			'R R',
			'MHM',
			'SSS'
		], {
			H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
			M: '#tfc:mortar',
			R: '#tfg:track_rods',
			S: `tfc:wood/planks/${woodType}_slab`
		}).id(`tfg:railways/shaped/track_create_${woodType}`)

		// Narrow
		event.recipes.createSequencedAssembly([
			`32x railways:track_tfc_${woodType}_narrow`,
		], `tfc:wood/planks/${woodType}_slab`, [
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}_narrow`, [`railways:track_incomplete_tfc_${woodType}_narrow`, { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}_narrow`, [`railways:track_incomplete_tfc_${woodType}_narrow`, { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createPressing(`railways:track_incomplete_tfc_${woodType}_narrow`, `railways:track_incomplete_tfc_${woodType}_narrow`), // [PORT] greate.pressing -> createPressing
		]).transitionalItem(`railways:track_incomplete_tfc_${woodType}_narrow`).loops(2).id(`tfg:railways/sequenced_assembly/track_create_${woodType}_narrow`)

		event.recipes.gtceu.assembler(`railways/track_create_${woodType}_narrow`)
			.itemInputs(`tfc:wood/planks/${woodType}_slab`, '2x #tfg:track_rods')
			.inputFluids(Fluid.of('gtceu:concrete', 144))
			.itemOutputs(`32x railways:track_tfc_${woodType}_narrow`)
			.duration(200)
			.EUt(16)
			.circuit(1)

		event.shaped(`16x railways:track_tfc_${woodType}_narrow`, [
			'R R',
			'MHM',
			' S '
		], {
			H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
			M: '#tfc:mortar',
			R: '#tfg:track_rods',
			S: `tfc:wood/planks/${woodType}_slab`
		}).id(`tfg:railways/shaped/track_create_${woodType}_narrow`)

		// Wide
		event.recipes.createSequencedAssembly([
			`32x railways:track_tfc_${woodType}_wide`,
		], `tfc:wood/planks/${woodType}_slab`, [
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}_wide`, [`railways:track_incomplete_tfc_${woodType}_wide`, `tfc:wood/planks/${woodType}`]),
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}_wide`, [`railways:track_incomplete_tfc_${woodType}_wide`, { tag: 'tfg:track_rods' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createDeploying(`railways:track_incomplete_tfc_${woodType}_wide`, [`railways:track_incomplete_tfc_${woodType}_wide`, { tag: 'tfc:mortar' }]), // [PORT-FIX] {tag:...} вместо Ingredient.of: не проходит codec either<fluid,ingredient>
			event.recipes.createPressing(`railways:track_incomplete_tfc_${woodType}_wide`, `railways:track_incomplete_tfc_${woodType}_wide`) // [PORT] greate.pressing -> createPressing
		]).transitionalItem(`railways:track_incomplete_tfc_${woodType}_wide`).loops(2).id(`tfg:railways/sequenced_assembly/track_create_${woodType}_wide`)

		event.recipes.gtceu.assembler(`railways/track_${woodType}_wide`)
			.itemInputs(`5x tfc:wood/planks/${woodType}_slab`, '2x #tfg:track_rods')
			.inputFluids(Fluid.of('gtceu:concrete', 144))
			.itemOutputs(`32x railways:track_tfc_${woodType}_wide`)
			.duration(200)
			.EUt(16)
			.circuit(3)

		event.shaped(`16x railways:track_tfc_${woodType}_wide`, [
			'R R',
			'MHM',
			'BSB'
		], {
			B: `tfc:wood/planks/${woodType}`,
			H: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
			M: '#tfc:mortar',
			R: '#tfg:track_rods',
			S: `tfc:wood/planks/${woodType}_slab`
		}).id(`tfg:railways/shaped/track_create_${woodType}_wide`)
	});

	event.shapeless('8x railways:track_phantom', ['#c:tiny_dusts/ender_pearl', '8x #create:tracks']) // [PORT] forge: -> c:
		.id('tfg:shapeless/phantom_tracks')

	//#endregion

	event.shaped('1x railways:handcar', [
		'EFE',
		'BAA',
		'CDC'
	], {
		A: '#minecraft:wooden_slabs',
		B: '#create:seats',
		C: 'gtceu:steel_minecart_wheels',
		D: 'gtceu:steel_gear', // [PORT] greate:steel_cogwheel отсутствует в сборке 1.21.1 -> заменено на gtceu:steel_gear (по прецеденту create_hypertube)
		E: ChemicalHelper.get(TagPrefix.rodLong, GTMaterials.Steel, 1),
		F: ChemicalHelper.get(TagPrefix.spring, GTMaterials.Steel, 1)
	}).id('tfg:railways/shaped/handcar')
})
