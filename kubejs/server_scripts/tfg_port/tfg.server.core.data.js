// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/data.js (registerTFGHeatData / registerTFGItemSize / registerTFGSupportData).
// Остальные функции диспетчера registerTFCDataForTFG (food, crop ranges, planters, fauna,
// equipment, aquaponics) живут в других исходных файлах и портируются отдельно
// (registerTFGCropRanges уже в tfg.data.crops.js).
// [PORT-FIX] kubejs_tfc 2.0:
//  - itemHeat(id, cap, forge, weld) -> event.heat({ingredient, heat_capacity, forging_temperature?, welding_temperature?})
//  - itemSize(ing, size, weight, id) -> event.itemSize({ingredient, size, weight}, id)
//  - support(id, up, down, horiz, id) -> event.support(BlockIngredient, {up, down, horizontal}, id)
//    (BlockIngredient — через TFC.ingredient.blockIngredient(Collection<Block>), нужны реальные Block)
// [PORT] KubeJS 7: Ingredient.subtract() -> .except(); orArray(...) -> Ingredient.of([массив]) (compound).

const $TfgDataBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $TfgDataResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

/** Тихая проверка существования предмета (реестр уже заполнен на этапе TFCEvents.data). */
function tfgDataItemExists(id) {
	try {
		return $TfgDataBuiltInRegistries.ITEM.containsKey($TfgDataResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

function tfgDataBlockExists(id) {
	try {
		return $TfgDataBuiltInRegistries.BLOCK.containsKey($TfgDataResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

function tfgDataBlock(id) {
	return $TfgDataBuiltInRegistries.BLOCK.get($TfgDataResourceLocation.parse(id));
}

//#region Heat Data

/** @param {Internal.KubeTFCDataEvent} event */
function registerTFGHeatData(event) {
	event.heat({ ingredient: 'tfg:latex_soaked_gloves', heatCapacity: 1 });

	global.MINECRAFT_DYE_NAMES.forEach((color) => {
		event.heat({ ingredient: `tfg:decorative_vase/unfired/${color}`, heatCapacity: 1 });
	});
	event.heat({ ingredient: 'tfg:decorative_vase/unfired', heatCapacity: 1 });

	event.heat({ ingredient: 'tfc:powder/native_copper', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/native_silver', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/native_gold', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/hematite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/cassiterite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/bismuthinite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/garnierite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/malachite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/magnetite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/limonite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/sphalerite', heatCapacity: 1 });
	event.heat({ ingredient: 'tfc:powder/tetrahedrite', heatCapacity: 1 });

	event.heat({ ingredient: 'tfg:unfired_rod_mold', heatCapacity: 1.0 });
	event.heat({ ingredient: 'tfg:unfired_spindle_head_mold', heatCapacity: 1.0 });
	event.heat({ ingredient: 'tfg:unfired_small_gear_mold', heatCapacity: 1.0 });
	event.heat({ ingredient: 'tfg:unfired_nugget_mold', heatCapacity: 1.0 });
	event.heat({ ingredient: 'tfg:unfired_lamp_mold', heatCapacity: 1.0 });

	// [PORT] betterend отсутствует в сборке 1.21.1 — нагрев charnia_* вырезан
	// event.itemHeat('betterend:charnia_orange', 0.25, ...) и т.д.
}

//#endregion
//#region Item Size

/** @param {Internal.KubeTFCDataEvent} event */
function registerTFGItemSize(event) {

	// [PORT] registerTFGFoodItemSize(event) — живёт в tfg/food/* (Ф4), портируется отдельно

	// [PORT] orArray(...) заменён на Ingredient.of([...]) — KubeJS 7 собирает compound-ингредиент из массива

	global.MINECRAFT_DYE_NAMES.forEach((color) => {
		event.itemSize({ ingredient: `tfg:decorative_vase/${color}`, size: 'normal', weight: 'medium' }, `decorative_vase/${color}`);
		event.itemSize({ ingredient: `tfg:decorative_vase/unfired/${color}`, size: 'normal', weight: 'medium' }, `decorative_vase/unfired/${color}`);
	});
	event.itemSize({ ingredient: 'tfg:decorative_vase', size: 'normal', weight: 'medium' }, 'decorative_vase');
	event.itemSize({ ingredient: 'tfg:decorative_vase/unfired', size: 'normal', weight: 'medium' }, 'decorative_vase/unfired');
	// [PORT-Ф4-TODO] верёвочные лестницы ещё не зарегистрированы — тег пока пуст, запись безвредна
	event.itemSize({ ingredient: '#tfg:rope_ladders', size: 'normal', weight: 'light' }, 'rope_ladders');

	event.itemSize({ ingredient: 'tfg:fishing_net/wood', size: 'large', weight: 'medium' }, 'wood_fishing_net');
	event.itemSize({ ingredient: 'tfg:fishing_net/brass', size: 'large', weight: 'medium' }, 'brass_fishing_net');
	event.itemSize({ ingredient: 'tfg:fishing_net/rose_gold', size: 'large', weight: 'medium' }, 'rose_gold_fishing_net');
	event.itemSize({ ingredient: 'tfg:fishing_net/sterling_silver', size: 'large', weight: 'medium' }, 'sterling_silver_fishing_net');
	event.itemSize({ ingredient: 'tfg:fishing_net/invar', size: 'large', weight: 'medium' }, 'invar_fishing_net');
	event.itemSize({ ingredient: 'tfg:fishing_net/cupronickel', size: 'large', weight: 'medium' }, 'cupronickel_fishing_net');
	event.itemSize({ ingredient: 'tfg:fishing_net/tin_alloy', size: 'large', weight: 'medium' }, 'tin_alloy_fishing_net');
	event.itemSize({ ingredient: 'tfg:fishing_net/magnalium', size: 'large', weight: 'medium' }, 'magnalium_fishing_net');

	// [PORT-Ф4-TODO] предметы ещё не зарегистрированы в startup — включатся автоматически после Ф4
	if (tfgDataItemExists('tfg:trowel'))
		event.itemSize({ ingredient: 'tfg:trowel', size: 'large', weight: 'medium' }, 'trowel');
	if (tfgDataItemExists('tfg:rnr_plow'))
		event.itemSize({ ingredient: 'tfg:rnr_plow', size: 'very_large', weight: 'heavy' }, 'rnr_plow');

	if (tfgDataItemExists('tfg:railgun_ammo_shell'))
		event.itemSize({ ingredient: 'tfg:railgun_ammo_shell', size: 'large', weight: 'light' }, 'railgun_ammo_shell');
	if (tfgDataItemExists('tfg:quartz_crucible'))
		event.itemSize({ ingredient: 'tfg:quartz_crucible', size: 'large', weight: 'very_heavy' }, 'quartz_crucible');

	event.itemSize({ ingredient: 'tfg:harvest_basket', size: 'large', weight: 'medium' }, 'harvest_basket');
	event.itemSize({ ingredient: 'tfg:aluminium_harvest_basket', size: 'large', weight: 'medium' }, 'aluminium_harvest_basket');

	event.itemSize({ ingredient: '#minecraft:buttons', size: 'very_small', weight: 'very_light' }, 'buttons');
	event.itemSize({ ingredient: '#c:buzz_saw_blades', size: 'large', weight: 'heavy' }, 'buzz_saw_blades'); // [PORT] forge:buzz_saw_heads -> c:buzz_saw_blades
	// [PORT] domum_ornamentum отсутствует — floating_carpet вырезан
	event.itemSize({ ingredient: '#minecraft:wool_carpets', size: 'small', weight: 'very_light' }, 'carpets');
	event.itemSize({ ingredient: 'create:chain_conveyor', size: 'large', weight: 'medium' }, 'chain_conveyor');
	event.itemSize({ ingredient: 'create:flywheel', size: 'large', weight: 'medium' }, 'flywheel');
	event.itemSize({ ingredient: 'create:large_water_wheel', size: 'very_large', weight: 'heavy' }, 'large_water_wheel');
	event.itemSize({ ingredient: 'create:water_wheel', size: 'large', weight: 'medium' }, 'water_wheel');
	event.itemSize({ ingredient: '#c:double_plates', size: 'large', weight: 'medium' }, 'double_plates');
	event.itemSize({ ingredient: '#c:dense_plates', size: 'large', weight: 'medium' }, 'dense_plates');
	event.itemSize({ ingredient: '#c:dusts', size: 'small', weight: 'very_light' }, 'dusts');
	event.itemSize({ ingredient: '#c:pure_dusts', size: 'small', weight: 'very_light' }, 'pure_dusts');
	event.itemSize({ ingredient: '#c:impure_dusts', size: 'small', weight: 'very_light' }, 'impure_dusts');
	event.itemSize({ ingredient: Ingredient.of(global.FRAMED_HALF_BLOCKS), size: 'small', weight: 'very_light' }, 'framed_half_blocks');
	event.itemSize({ ingredient: Ingredient.of(global.FRAMED_TINY_BLOCKS), size: 'very_small', weight: 'very_light' }, 'framed_tiny_blocks');
	event.itemSize({ ingredient: '#c:gears', size: 'large', weight: 'heavy' }, 'gears');
	event.itemSize({ ingredient: '#c:glass_panes', size: 'small', weight: 'very_light' }, 'glass_panes');
	event.itemSize({ ingredient: 'create:crushing_wheel', size: 'large', weight: 'medium' }, 'crushing_wheels'); // [PORT] greate отсутствует — тег #greate:crushing_wheels заменён предметом Create
	event.itemSize({ ingredient: '#gtceu:molds', size: 'large', weight: 'heavy' }, 'gregtech_molds');
	event.itemSize({ ingredient: '#c:hot_ingots', size: 'large', weight: 'medium' }, 'hot_ingots');
	event.itemSize({ ingredient: '#c:rods/long', size: 'large', weight: 'medium' }, 'long_rods');
	event.itemSize({ ingredient: '#tfg:metal_bars', size: 'small', weight: 'very_light' }, 'metal_bars');
	event.itemSize({
		ingredient: Ingredient.of('#tfc:dry_mud_bricks').or(Ingredient.of('#tfc:wet_mud_bricks')),
		size: 'very_small',
		weight: 'very_light'
	}, 'mud_bricks');
	event.itemSize({ ingredient: '#c:rotors', size: 'normal', weight: 'medium' }, 'rotors');
	event.itemSize({ ingredient: '#c:small_gears', size: 'normal', weight: 'medium' }, 'small_gears');
	event.itemSize({ ingredient: '#c:small_springs', size: 'small', weight: 'very_light' }, 'small_springs');
	event.itemSize({ ingredient: '#c:springs', size: 'large', weight: 'medium' }, 'springs');
	event.itemSize({
		// [PORT] .subtract() -> .except() (KubeJS 7)
		ingredient: Ingredient.of('#c:storage_blocks').except(Ingredient.of([
			'minecraft:stone',
			'minecraft:bricks',
			'minecraft:quartz_block',
			'minecraft:amethyst_block',
			'minecraft:glass',
			'minecraft:clay',
			'minecraft:ice',
			'minecraft:bone_block',
			'minecraft:obsidian',
			'minecraft:glowstone',
			'ae2:quartz_block',
			'gtceu:red_granite',
			'gtceu:light_concrete',
			'gtceu:dark_concrete',
			'create:cardboard_block'
		])),
		size: 'large',
		weight: 'medium'
	}, 'storage_blocks');
	event.itemSize({ ingredient: '#c:turbine_blades', size: 'large', weight: 'heavy' }, 'turbine_blades');
	event.itemSize({ ingredient: 'gtceu:turbine_rotor', size: 'very_large', weight: 'very_heavy' }, 'turbine_rotors');
	// [PORT] modid remap: vintageimprovements -> createvintageneoforged
	event.itemSize({ ingredient: 'createvintageneoforged:centrifuge', size: 'very_large', weight: 'heavy' }, 'vintage_centrifuge');
	event.itemSize({ ingredient: 'createvintageneoforged:helve_hammer', size: 'large', weight: 'medium' }, 'vintage_helve_hammer');
	event.itemSize({ ingredient: 'createvintageneoforged:lathe', size: 'normal', weight: 'medium' }, 'vintage_lathe');
	event.itemSize({ ingredient: '#c:whisks', size: 'large', weight: 'medium' }, 'whisks');

	// Fluid pipes
	event.itemSize({ ingredient: '#c:tiny_fluid_pipes', size: 'tiny', weight: 'very_light' }, 'tiny_fluid_pipes');
	event.itemSize({ ingredient: '#c:small_fluid_pipes', size: 'very_small', weight: 'very_light' }, 'small_fluid_pipes');
	event.itemSize({ ingredient: '#c:large_fluid_pipes', size: 'normal', weight: 'light' }, 'large_fluid_pipes');
	event.itemSize({ ingredient: '#c:huge_fluid_pipes', size: 'normal', weight: 'medium' }, 'huge_fluid_pipes');
	event.itemSize({
		ingredient: Ingredient.of('#c:quadruple_fluid_pipes').or(Ingredient.of('#c:nonuple_fluid_pipes')),
		size: 'normal',
		weight: 'medium'
	}, 'multiple_fluid_pipes');

	// Item pipes
	event.itemSize({
		ingredient: Ingredient.of('#c:small_item_pipes').or(Ingredient.of('#c:small_restrictive_pipes')),
		size: 'very_small',
		weight: 'very_light'
	}, 'small_item_pipes');
	event.itemSize({
		ingredient: Ingredient.of('#c:large_item_pipes').or(Ingredient.of('#c:large_restrictive_pipes')),
		size: 'normal',
		weight: 'light'
	}, 'large_item_pipes');
	event.itemSize({
		ingredient: Ingredient.of('#c:huge_item_pipes').or(Ingredient.of('#c:huge_restrictive_pipes')),
		size: 'normal',
		weight: 'medium'
	}, 'huge_item_pipes');

	// Air ducts
	event.itemSize({ ingredient: 'gtceu:small_duct_pipe', size: 'very_small', weight: 'very_light' }, 'small_duct_pipe');
	event.itemSize({ ingredient: 'gtceu:large_duct_pipe', size: 'normal', weight: 'light' }, 'large_duct_pipe');
	event.itemSize({ ingredient: 'gtceu:huge_duct_pipe', size: 'normal', weight: 'medium' }, 'huge_duct_pipe');

	// Nuclear Rod
	event.itemSize({ ingredient: '#tfg:fission_rods', size: 'very_large', weight: 'heavy' });

	// Cables
	event.itemSize({ ingredient: Ingredient.of('#c:single_cables').or(Ingredient.of('#c:single_wires')), size: 'tiny', weight: 'very_light' }, 'cables_1x');
	event.itemSize({ ingredient: Ingredient.of('#c:double_cables').or(Ingredient.of('#c:double_wires')), size: 'very_small', weight: 'very_light' }, 'cables_2x');
	event.itemSize({ ingredient: Ingredient.of('#c:octal_cables').or(Ingredient.of('#c:octal_wires')), size: 'normal', weight: 'light' }, 'cables_8x');
	event.itemSize({ ingredient: Ingredient.of('#c:hex_cables').or(Ingredient.of('#c:hex_wires')), size: 'normal', weight: 'medium' }, 'cables_16x');
	// [PORT] computercraft отсутствует — networking_cable вырезан
	event.itemSize({ ingredient: 'gtceu:normal_optical_pipe', size: 'very_small', weight: 'very_light' }, 'optical_fiber_cable');
	event.itemSize({
		ingredient: Ingredient.of('#ae2:glass_cable').or(Ingredient.of('#ae2:covered_cable')).or(Ingredient.of('#ae2:smart_cable')),
		size: 'very_small',
		weight: 'very_light'
	}, 'me_cables');
	event.itemSize({
		ingredient: Ingredient.of('#ae2:covered_dense_cable').or(Ingredient.of('#ae2:smart_dense_cable')),
		size: 'normal',
		weight: 'light'
	}, 'me_dense_cables');

	// [PORT] modid remap: expatternprovider -> extendedae; фильтрация по реестру —
	// часть портов ExtendedAE 1.21 переименована (ex_interface_part -> ei_part и т.п.)
	let ae2TinyParts = [
		'ae2:quartz_fixture',
		'ae2:light_detector',
		'ae2:wireless_access_point',
		'ae2:quartz_fiber',
		'ae2:toggle_bus',
		'ae2:inverted_toggle_bus',
		'ae2:cable_anchor',
		'ae2:level_emitter',
		'ae2:energy_level_emitter',
		'extendedae:threshold_level_emitter'
	].filter(tfgDataItemExists);
	event.itemSize({ ingredient: Ingredient.of(ae2TinyParts), size: 'tiny', weight: 'very_light' }, 'ae2_tiny_parts');

	let ae2SmallParts = [
		'ae2:monitor',
		'ae2:semi_dark_monitor',
		'ae2:dark_monitor',
		'ae2:storage_bus',
		'ae2:import_bus',
		'ae2:export_bus',
		'ae2:annihilation_plane',
		'ae2:formation_plane',
		'ae2:pattern_encoding_terminal',
		'ae2:crafting_terminal',
		'ae2:terminal',
		'ae2:storage_monitor',
		'ae2:conversion_monitor',
		'ae2:cable_pattern_provider',
		'ae2:cable_interface',
		'ae2:pattern_access_terminal',
		'ae2:cable_energy_acceptor',
		'ae2:me_p2p_tunnel',
		'ae2:redstone_p2p_tunnel',
		'ae2:item_p2p_tunnel',
		'ae2:fluid_p2p_tunnel',
		'ae2:light_p2p_tunnel',
		'ae2:facade',
		'extendedae:ei_part', // [PORT] expatternprovider:ex_interface_part -> extendedae:ei_part
		'extendedae:ex_export_bus_part',
		'extendedae:ex_import_bus_part',
		'extendedae:ex_pattern_access_part',
		'extendedae:tag_storage_bus',
		'extendedae:tag_export_bus',
		'extendedae:mod_storage_bus',
		'extendedae:mod_export_bus',
		'extendedae:active_formation_plane',
		'extendedae:precise_export_bus',
		'extendedae:precise_storage_bus',
		'extendedae:threshold_export_bus',
		'extendedae:oversize_interface_part'
	].filter(tfgDataItemExists);
	event.itemSize({ ingredient: Ingredient.of(ae2SmallParts), size: 'very_small', weight: 'very_light' }, 'ae2_small_parts');

	event.itemSize({ ingredient: 'tfg:lab_equipment', size: 'normal', weight: 'medium' }, 'lab_equipment/lab_equipment');
	event.itemSize({ ingredient: 'tfg:dirty_lab_equipment', size: 'normal', weight: 'medium' }, 'lab_equipment/dirty_lab_equipment');
	event.itemSize({ ingredient: 'gtceu:petri_dish', size: 'tiny', weight: 'light' }, 'gtceu/petri_dish');

	// These items don't like to have their size changed for some reason.
	// This is the only combination that I could get to work. V
	event.itemSize({ ingredient: 'tfg:beaker', size: 'large', weight: 'heavy' }, 'tfg/beaker');
	event.itemSize({ ingredient: 'tfg:flask', size: 'normal', weight: 'medium' }, 'tfg/flask');
	event.itemSize({ ingredient: 'tfg:vial', size: 'tiny', weight: 'light' }, 'tfg/vial');

	event.itemSize({ ingredient: '#tfc:ore_pieces', size: 'very_small', weight: 'very_light' }, 'tfc_ores');

	// [PORT] GTM8: c:tools/* в единственном числе
	event.itemSize({ ingredient: '#c:tools/wrench', size: 'very_large', weight: 'very_heavy' }, 'wrenches');
	event.itemSize({ ingredient: '#c:tools/mining_hammer', size: 'very_large', weight: 'very_heavy' }, 'mining_hammers');
	event.itemSize({ ingredient: '#c:tools/spade', size: 'very_large', weight: 'very_heavy' }, 'spades');

	event.itemSize({
		ingredient: Ingredient.of([
			'tfg:unfired_rod_mold',
			'tfg:unfired_spindle_head_mold',
			'tfg:unfired_small_gear_mold',
			'tfg:unfired_nugget_mold',
			'tfg:unfired_lamp_mold',
			'tfg:rod_mold',
			'tfg:spindle_head_mold',
			'tfg:small_gear_mold',
			'tfg:nugget_mold',
			'tfg:lamp_mold'
		]),
		size: 'normal',
		weight: 'medium'
	}, 'molds');

	//Universal Compost Bags
	event.itemSize({ ingredient: 'tfg:universal_compost_browns_bag', size: 'tiny', weight: 'medium' });
	event.itemSize({ ingredient: 'tfg:universal_compost_greens_bag', size: 'tiny', weight: 'medium' });

	//Crafting Station
	// [PORT-Ф4-TODO] tfg:wood/crafting_station/* ещё не зарегистрированы — фильтр по реестру,
	// включатся автоматически после Ф4.
	// [PORT-Ф10] циклы WAB_WOOD / AD_ASTRA_WOOD / BENEATH_WOOD_TYPES вырезаны (моды отсутствуют).
	// [PORT-FIX] AFC_WOOD_TYPES/TFC_WOOD_TYPES — массивы строк (в оригинале обращение wood.name — баг TFG)
	global.TFG_NEW_WOOD_TYPES.forEach(wood => {
		if (tfgDataItemExists(`tfg:wood/crafting_station/${wood.name}`))
			event.itemSize({ ingredient: `tfg:wood/crafting_station/${wood.name}`, size: 'large', weight: 'heavy' }, `${wood.name}_crafting_station`);
	});

	global.AFC_WOOD_TYPES.forEach(wood => {
		if (tfgDataItemExists(`tfg:wood/crafting_station/${wood}`))
			event.itemSize({ ingredient: `tfg:wood/crafting_station/${wood}`, size: 'large', weight: 'heavy' }, `${wood}_crafting_station`);
	});

	global.TFC_WOOD_TYPES.forEach(wood => {
		if (tfgDataItemExists(`tfg:wood/crafting_station/${wood}`))
			event.itemSize({ ingredient: `tfg:wood/crafting_station/${wood}`, size: 'large', weight: 'heavy' }, `${wood}_crafting_station`);
	});
}

//#endregion
//#region Support Data

//up, down, horizontal
/** @param {Internal.KubeTFCDataEvent} event */
function registerTFGSupportData(event) {

	// [PORT-FIX] kubejs_tfc 2.0: support(BlockIngredient, {up, down, horizontal}, id)
	function tfgSupport(blockId, up, down, horizontal, id) {
		if (!tfgDataBlockExists(blockId)) return; // [PORT-Ф4-TODO] незарегистрированные опоры включатся после Ф4
		event.support(
			TFC.ingredient.blockIngredient([tfgDataBlock(blockId)]),
			{ up: up, down: down, horizontal: horizontal },
			id
		);
	}

	tfgSupport('tfg:light_concrete_support_horizontal', 4, 4, 8, 'light_concrete_support');
	tfgSupport('tfg:dark_concrete_support_horizontal', 4, 4, 8, 'dark_concrete_support');
	tfgSupport('tfg:reinforced_light_concrete_support_horizontal', 6, 6, 16, 'reinforced_light_concrete_support');
	tfgSupport('tfg:reinforced_dark_concrete_support_horizontal', 6, 6, 16, 'reinforced_dark_concrete_support');
	tfgSupport('tfg:rebar_support_horizontal', 4, 4, 8, 'rebar_support');
	tfgSupport('tfg:steel_support_horizontal', 6, 6, 16, 'steel_support');

	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {
		if (rock.support) {
			if (rockId === 'light_concrete' || rockId === 'dark_concrete')
				continue;
			tfgSupport(`${rock.support}_horizontal`, 2, 2, 4, `${rockId}_support`);
		}
	}

	// [PORT-Ф10] циклы AD_ASTRA_WOOD / WAB_WOOD вырезаны (моды отсутствуют, космоконтент — Ф10)
	global.TFG_NEW_WOOD_TYPES.forEach((wood) => {
		tfgSupport(`tfg:wood/support/${wood.name}_horizontal`, 2, 2, 4, `${wood.name}_support`);
	});
}

//#endregion

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.core data start');
	registerTFGHeatData(event);
	registerTFGItemSize(event);
	registerTFGSupportData(event);
});
