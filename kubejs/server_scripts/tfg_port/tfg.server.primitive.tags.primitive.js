// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/tags.primitive.js (Ф4).
// Главные изменения 1.20→1.21:
//  - forge:→c: (инструменты в GTM8 в ЕДИНСТВЕННОМ числе: c:tools/knife и т.п.; forge:string→c:strings, forge:cloth→c:cloth)
//  - TFGPropertyKey.TFC_PROPERTY отсутствует (Java-мод TFG) — фильтр по флагу CAN_BE_UNMOLDED (global.TFGMaterialFlags, tfg.flags.js)
//  - TFGTagPrefix.lampUnfinished отсутствует — жидкости для lamp mold закомментированы [PORT-Ф4-TODO]
//  - Artisan Table (Java-мод TFG) не портирован — секция закомментирована [PORT-Ф4-TODO]
//  - wan_ancient_beasts отсутствует — вырезано [PORT]

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.tags.primitive item start')

	//Decorative Vases
	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.add('c:hidden_from_recipe_viewers', `tfg:decorative_vase/generated/${color}`)
		event.add('tfg:decorative_vases/generated', `tfg:decorative_vase/generated/${color}`)
		event.add('tfg:decorative_vases', `tfg:decorative_vase/${color}`)
		event.add('tfg:decorative_vases/unfired', `tfg:decorative_vase/unfired/${color}`)
	})
	event.add('tfg:decorative_vases', 'tfg:decorative_vase')
	event.add('tfg:decorative_vases/unfired', 'tfg:decorative_vase/unfired')

	//Knapping
	event.add('tfc:any_knapping', 'minecraft:flint')

	// Tools
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/wood') // [PORT] forge: -> c:
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/brass')
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/rose_gold')
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/sterling_silver')
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/invar')
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/tin_alloy')
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/cupronickel')
	event.add('c:tools/fishing_nets', 'tfg:fishing_net/magnalium')

	// [PORT-Ф4-TODO] tfg:trowel не зарегистрирован в 1.21.1 (Ф4 misc)
	// event.add('c:tools/trowels', 'tfg:trowel')

	event.add('tfg:harvester', 'tfg:harvest_basket')
	event.add('tfg:harvester', 'tfg:aluminium_harvest_basket')

	event.add('tfg:tools/ore_prospectors/copper', 'tfc:metal/propick/copper')
	event.add('tfg:tools/ore_prospectors/bronze', 'tfc:metal/propick/bronze')
	event.add('tfg:tools/ore_prospectors/bronze', 'tfc:metal/propick/bismuth_bronze')
	event.add('tfg:tools/ore_prospectors/bronze', 'tfc:metal/propick/black_bronze')
	event.add('tfg:tools/ore_prospectors/wrought_iron', 'tfc:metal/propick/wrought_iron')
	event.add('tfg:tools/ore_prospectors/steel', 'tfc:metal/propick/steel')
	event.add('tfg:tools/ore_prospectors/black_steel', 'tfc:metal/propick/black_steel')
	event.add('tfg:tools/ore_prospectors/blue_steel', 'tfc:metal/propick/blue_steel')
	event.add('tfg:tools/ore_prospectors/red_steel', 'tfc:metal/propick/red_steel')

	// Spindles TFC owns the 1.21 spindle items and exposes all tiers here.
	// Keep TFG's metal spindles in this aggregate tag as well (startup tags).
	event.add('tfg:tools/spindles', '#c:tools/spindle')

	// Paper from wood
	event.add('tfg:hardwood_strips', 'tfg:hardwood_strip')
	event.add('tfg:hardwood_strips', 'tfg:soaked_hardwood_strip')
	//Adding any of these dusts to the forge dusts/wood tag will make it so you can craft softwood pulp using hardwood pulp. which is not ok.
	event.add('tfg:wood_dusts', 'gtceu:hardwood_dust')
	event.add('tfg:tiny_wood_dusts', 'gtceu:tiny_hardwood_dust')
	event.add('tfg:small_wood_dusts', 'gtceu:small_hardwood_dust')
	event.add('tfg:wood_dusts', 'gtceu:wood_dust')
	event.add('tfg:tiny_wood_dusts', 'gtceu:tiny_wood_dust')
	event.add('tfg:small_wood_dusts', 'gtceu:small_wood_dust')

	// Waxe
	event.add('c:wax', 'gtceu:wax_dust'); // [PORT] forge:wax -> c:wax
	event.add('c:wax', 'tfg:paraffin_wax')
	event.add('c:wax', 'firmalife:beeswax')
	event.add('c:wax', 'tfg:conifer_rosin')
	event.add('c:wax', 'tfg:crimsene_gem')
	event.add('c:wax', 'tfg:warpane_gem')

	// Cloth & String
	event.add('tfg:lightweight_cloth', 'tfc:silk_cloth')
	event.add('tfg:lightweight_cloth', 'tfg:phantom_silk')
	event.add('tfg:lightweight_cloth', 'tfg:polycaprolactam_fabric')
	event.add('c:cloth', 'tfg:phantom_silk') // [PORT] forge:cloth -> c:cloth
	event.add('c:cloth', 'tfg:polycaprolactam_fabric')
	event.add('tfc:high_quality_cloth', 'tfg:phantom_silk')
	event.add('tfc:high_quality_cloth', 'tfg:polycaprolactam_fabric')
	event.add('tfc:sewing_dark_cloth', 'tfg:phantom_silk')
	event.add('tfc:sewing_dark_cloth', 'tfg:polycaprolactam_fabric')
	event.add('c:strings', 'tfg:phantom_thread') // [PORT] forge:string -> c:strings
	event.add('c:strings', 'tfg:polycaprolactam_string')
	event.add('c:strings', 'firmalife:pineapple_yarn')

	// [PORT-FIX] тег tfc:colored_bed в 1.21 нигде не наполняется — наполняем сами
	// (нужен для рецепта отбеливания кроватей в tfg.server.primitive.recipes.dyes.js)
	global.MINECRAFT_DYE_NAMES.forEach(color => {
		if (color !== 'white') {
			event.add('tfc:colored_bed', `minecraft:${color}_bed`)
		}
	})

	// [PORT-Ф4-TODO] Artisan Table (Java-мод TFG) не портирован — теги стола не нужны,
	// пока нет самого блока tfg:artisan_table и типа рецептов tfg:artisan.
	// event.add('tfg:artisan_table_inputs', 'gtceu:empty_mold')
	// event.add('tfg:artisan_table_inputs', 'gtceu:resin_circuit_board')
	// event.add('tfg:artisan_table_inputs', 'gtceu:copper_single_wire')
	// event.add('tfg:artisan_table_inputs', 'gtceu:copper_quadruple_wire')
	// event.add('tfg:artisan_table_inputs', 'gtceu:phenolic_circuit_board')
	// event.add('tfg:artisan_table_inputs', 'gtceu:silver_single_wire')
	// event.add('tfg:artisan_table_inputs', 'gtceu:silver_quadruple_wire')
	// event.add('tfg:artisan_table_inputs', 'tfg:optical_borosilicate_blank')
	// event.add('tfg:artisan_table_inputs', 'gtceu:treated_wood_plate')
	// event.add('tfg:artisan_table_inputs', 'tfc:powder/flux')
	// event.add('tfg:artisan_table_tools', '#c:tools/hammer')
	// event.add('tfg:artisan_table_tools', '#c:tools/mallet')
	// event.add('tfg:artisan_table_tools', '#c:tools/file')
	// event.add('tfg:artisan_table_tools', '#c:tools/wire_cutter')
	// event.add('tfg:artisan_table_tools', '#c:tools/screwdriver')
	// event.add('tfg:artisan_table_tools', '#c:tools/knife')
	// event.add('tfg:artisan_table_tools', '#c:tools/saw')
	// event.add('tfg:artisan_table_tools', '#c:tools/buzzsaws')
	// event.add('tfg:artisan_table_tools', 'tfc:gem_saw')
	// event.add('tfg:artisan_table_tools', '#create:sandpaper')
})

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.tags.primitive block start')

	// [PORT-Ф4-TODO] tfg:ash_pile не зарегистрирован в 1.21.1
	// event.add('minecraft:mineable/shovel', 'tfg:ash_pile')

	event.add('tfg:harvester_harvestable', '#tfc:fruit_tree_leaves')
	event.add('tfg:harvester_harvestable', '#tfc:berry_bushes')
	event.add('tfg:harvester_harvestable', '#tfc:any_spreading_bush')
	event.add('tfg:harvester_harvestable', '#firmalife:grape_strings')
	event.add('tfg:harvester_harvestable', '#firmalife:grape_trellis_posts_plant')
	event.add('tfg:harvester_harvestable', 'firmalife:trellis_planter')
	event.add('tfg:harvester_harvestable', 'firmalife:bonsai_planter')
	event.add('tfg:harvester_harvestable', 'firmalife:hanging_planter')
	//added for QOL but doesnt harvest anything
	event.add('tfg:harvester_harvestable', 'firmalife:grape_fluff_red') // [PORT-CHECK] id проверить в Firmalife 3.0
	event.add('tfg:harvester_harvestable', 'firmalife:grape_fluff_white') // [PORT-CHECK]

	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.add('tfg:decorative_vases/generated', `tfg:decorative_vase/generated/${color}`)
	})
})

ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.tags.primitive fluid start')

	// [PORT-FIX] TFGPropertyKey.TFC_PROPERTY (Java-мод TFG) отсутствует —
	// фильтруем только по кастомному флагу CAN_BE_UNMOLDED (см. startup tfg.flags.js).
	global.forEachMaterial(material => {
		if (!material.hasFlag(global.TFGMaterialFlags.CAN_BE_UNMOLDED)) return;
		if (!material.hasProperty(PropertyKey.FLUID)) return;

		let fluidName = material.getFluid().getFluidType().toString();

		if (!ChemicalHelper.get(TagPrefix.gearSmall, material, 1).isEmpty()) {
			event.add('tfg:usable_in_small_gear_mold', fluidName)
		}

		if (!ChemicalHelper.get(TagPrefix.rod, material, 1).isEmpty()) {
			event.add('tfg:usable_in_rod_mold', fluidName)
		}

		if (!ChemicalHelper.get(TagPrefix.nugget, material, 1).isEmpty()) {
			event.add('tfg:usable_in_nugget_mold', fluidName)
		}

		// [PORT-Ф4-TODO] TFGTagPrefix.lampUnfinished — кастомный tag prefix Java-мода TFG,
		// в 1.21.1 не портирован; жидкости для tfg:usable_in_lamp_mold добавить после порта.
		// if (!ChemicalHelper.get(TFGTagPrefix.lampUnfinished, material, 1).isEmpty()) {
		// 	event.add('tfg:usable_in_lamp_mold', fluidName)
		// }
	})

	event.add('tfg:usable_in_spindle_head_mold', 'gtceu:copper');
	event.add('tfg:usable_in_spindle_head_mold', 'gtceu:bronze');
	event.add('tfg:usable_in_spindle_head_mold', 'gtceu:bismuth_bronze');
	event.add('tfg:usable_in_spindle_head_mold', 'gtceu:black_bronze');
})

ServerEvents.tags('entity_type', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.tags.primitive entity start')

	/**
	 * @type {string[]} - List of entities that can be scooped by fishing nets.
	 * [PORT] wan_ancient_beasts:toxlacanth вырезан — мода нет в 1.21.1
	 */
	const entities = [
		'tfc:salmon',
		'tfc:rainbow_trout',
		'tfc:lake_trout',
		'tfc:bluegill',
		'tfc:largemouth_bass',
		'tfc:smallmouth_bass',
		'tfc:tropical_fish',
		'tfc:crappie',
		'tfc:cod',
		'tfc:pufferfish',
		'tfc:jellyfish',
		'tfc:lobster',
		'tfc:isopod',
		'tfc:crayfish'
	];
	entities.forEach(entity => {
		event.add('tfg:fishing_net_scoopable', entity);
	});
})
