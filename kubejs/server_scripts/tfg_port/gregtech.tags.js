// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/gregtech/tags.js (Фаза 3).
// Главные изменения 1.20→1.21: forge:→c: (с исключениями из remap_tables.json:
// tools/saws→tools/saw и т.п.), greate/ad_astra отсутствуют в сборке.
// Файл регистрирует события сам (в KubeJS 7 нет общего скоупа для диспетчера TFG).

const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

/** Тихая проверка существования предмета — не создаёт warning'ов в логе. */
function gtItemExists(id) {
	try {
		return $BuiltInRegistries.ITEM.containsKey($ResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port gregtech item tags start');

	// Удаление тегов у отключенных предметов
	global.GTCEU_HIDED_ITEMS.forEach((item) => {
		event.add("c:hidden_from_recipe_viewers", item);
	});

	// Face curio slot for mask
	event.remove("curios:head", "gtceu:face_mask")
	event.add("curios:face", "gtceu:face_mask")

	// Добавление тега EMI для скрытия всех руд
	event.add("c:hidden_from_recipe_viewers", "#c:ores");

	event.remove("minecraft:planks", "gtceu:treated_wood_planks");
	event.remove("minecraft:planks", "gtceu:treated_wood_plate");

	event.remove("minecraft:planks", "gtceu:wood_plate");

	global.MINECRAFT_DYE_NAMES.forEach((dyeName) => {
		event.remove("ae2:p2p_attunements/fluid_p2p_tunnel", `gtceu:${dyeName}_dye_bucket`);
	});

	event.remove("c:gems", "gtceu:coke_gem");

	// [PORT] Rose Quartz Lens (greate) — мод отсутствует в сборке 1.21.1

	event.add("tfc:saws", "#c:tools/buzzsaws");
	event.add("tfc:saws", "#c:tools/chainsaws");

	const saws = event.get('c:tools/saw').getObjectIds().concat(event.get('c:tools/chainsaws').getObjectIds());
	saws.forEach(sawId =>
	{
		const id = `${sawId.getNamespace()}:${sawId.getPath()}`;
		if (global.ICE_SAW_BLACKLIST.includes(id) || Item.of(sawId).hasTag('c:tools/buzzsaws'))
		{
			return;
		}

		event.add("tfg:silk_harvest_ice", id);
	});

	// [PORT] tfg:-формы появятся в Ф4 — до этого фильтруем несуществующие, чтобы не мусорить в лог
	global.GTCEU_CASTING_MOLDS.concat(global.TFG_CASTING_MOLDS).filter(gtItemExists).forEach((mold) => {
		event.add("gtceu:casting_molds", mold);
	});

	global.GTCEU_EXTRUDER_MOLDS.concat(global.TFG_EXTRUDER_MOLDS).filter(gtItemExists).forEach((mold) => {
		event.add("gtceu:extruder_molds", mold);
	});

	// @ts-expect-error According to KJS docs adding tags to tags is supported.
	event.add("gtceu:molds", "#gtceu:casting_molds", "#gtceu:extruder_molds", "gtceu:empty_mold");

	// Groups up concrete blocks into tags.
	Object.entries(global.GTCEU_CONCRETE_BLOCKS).forEach(([type, ids]) => {
		event.add(`tfg:gtceu_concrete_blocks/${type}`, ids);
		event.add('tfg:gtceu_concrete_blocks', ids);
	});

	//greens
	event.add('tfc:compost_greens', 'gtceu:bio_chaff');
	event.add('tfc:compost_greens', 'gtceu:plant_ball');

	// lamp tag for EMI++
	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.add('gtceu:lamps', `gtceu:${color}_lamp`)
		event.add('gtceu:lamps', `gtceu:${color}_borderless_lamp`)
	})

	// any rubber plate
	// [PORT] GTM8: sheets→plates уже отражено, forge:→c:
	event.add('tfg:rubber_plates', '#c:plates/rubber', '#c:plates/silicone_rubber', '#c:plates/styrene_butadiene_rubber')

	// rubber rings
	event.add('tfg:rubber_rings', 'gtceu:rubber_ring')
	event.add('tfg:rubber_rings', 'gtceu:silicone_rubber_ring')
	event.add('tfg:rubber_rings', 'gtceu:styrene_butadiene_rubber_ring')

	// rubber foils
	event.add('tfg:rubber_foils', 'gtceu:rubber_foil')
	event.add('tfg:rubber_foils', 'gtceu:silicone_rubber_foil')
	event.add('tfg:rubber_foils', 'gtceu:styrene_butadiene_rubber_foil')

	// Remove slurry bucket
	event.add('c:hidden_from_recipe_viewers', 'gtceu:ruby_slurry_bucket', 'gtceu:green_sapphire_slurry_bucket', 'gtceu:sapphire_slurry_bucket')

	/**
	 * @type {string[]} List of Super Tanks.
	 */
	const superTanks = [
		'gtceu:ulv_super_tank',
		'gtceu:lv_super_tank',
		'gtceu:mv_super_tank',
		'gtceu:hv_super_tank',
		'gtceu:ev_super_tank',
		'gtceu:iv_quantum_tank',
		'gtceu:luv_quantum_tank',
		'gtceu:zpm_quantum_tank',
		'gtceu:uv_quantum_tank',
		'gtceu:uhv_quantum_tank'
	];
	superTanks.filter(gtItemExists).forEach(tank => {
		event.add('gtceu:super_tanks', tank)
	});

	/**
	 * @type {string[]} List of Fluid Cells.
	 */
	const fluidCells = [
		'gtceu:glass_vial',
		'gtceu:fluid_cell',
		'gtceu:universal_fluid_cell',
		'gtceu:steel_fluid_cell',
		'gtceu:aluminium_fluid_cell',
		'gtceu:stainless_steel_fluid_cell',
		'gtceu:titanium_fluid_cell',
		'gtceu:tungsten_steel_fluid_cell'
	];
	fluidCells.filter(gtItemExists).forEach(cell => {
		event.add('gtceu:fluid_cells', cell);
	});

	/**
	 * @type {string[]}
	 */
	const drums = [
		'gtceu:bronze_drum',
		'gtceu:bismuth_bronze_drum',
		'gtceu:black_bronze_drum',
		'gtceu:steel_drum',
		'gtceu:aluminium_drum',
		'gtceu:stainless_steel_drum',
		'gtceu:gold_drum',
		'gtceu:titanium_drum',
		'gtceu:tungstensteel_drum'
	];
	drums.filter(gtItemExists).forEach(drum => {
		event.add('gtceu:drums', drum);
	});
});

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port gregtech block tags start');

	event.add('gtceu:mineable/pickaxe_or_wrench', 'gtceu:ulv_hermetic_casing');

	event.remove("gtceu:cleanroom_doors", "#minecraft:wooden_doors");
	event.add("gtceu:cleanroom_doors", "firmalife:sealed_door");
	event.add("gtceu:cleanroom_doors", "firmalife:iron_greenhouse_door");
	event.add("gtceu:cleanroom_doors", "firmalife:copper_greenhouse_door");
	event.add("gtceu:cleanroom_doors", "firmalife:stainless_steel_greenhouse_door");
	event.add("gtceu:cleanroom_doors", "create:andesite_door");
	event.add("gtceu:cleanroom_doors", "create:brass_door");
	event.add("gtceu:cleanroom_doors", "create:copper_door");
	event.add("gtceu:cleanroom_doors", "create:train_door");
	event.add("gtceu:cleanroom_doors", "create:framed_glass_door");
	event.add("gtceu:cleanroom_doors", "createdeco:andesite_door");
	event.add("gtceu:cleanroom_doors", "createdeco:locked_andesite_door");
	event.add("gtceu:cleanroom_doors", "createdeco:brass_door");
	event.add("gtceu:cleanroom_doors", "createdeco:locked_brass_door");
	event.add("gtceu:cleanroom_doors", "createdeco:copper_door");
	event.add("gtceu:cleanroom_doors", "createdeco:locked_copper_door");
	event.add("gtceu:cleanroom_doors", "createdeco:industrial_iron_door");
	event.add("gtceu:cleanroom_doors", "createdeco:locked_industrial_iron_door");
	event.add("gtceu:cleanroom_doors", "createdeco:zinc_door");
	event.add("gtceu:cleanroom_doors", "createdeco:locked_zinc_door");
	// [PORT] двери ad_astra — мод отсутствует в сборке 1.21.1

	// [PORT-Ф2] gtceu:incoloy_ma_956_frame — материал TFG (Ф2, заблокирована апстримом)
	// event.remove("neoforge:needs_netherite_tool", "gtceu:incoloy_ma_956_frame");

	event.add("c:hidden_from_recipe_viewers", "gtceu:bronze_large_boiler")
	event.add("c:hidden_from_recipe_viewers", "gtceu:steel_large_boiler")
	event.add("c:hidden_from_recipe_viewers", "gtceu:titanium_large_boiler")
	event.add("c:hidden_from_recipe_viewers", "gtceu:tungstensteel_large_boiler")

	// Groups up concrete blocks into tags.
	Object.entries(global.GTCEU_CONCRETE_BLOCKS).forEach(([type, ids]) => {
		event.add(`tfg:gtceu_concrete_blocks/${type}`, ids);
		event.add('tfg:gtceu_concrete_blocks', ids);
	});

	// lamp tag for EMI++
	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.add('gtceu:lamps', `gtceu:${color}_lamp`)
		event.add('gtceu:lamps', `gtceu:${color}_borderless_lamp`)
	})

	event.add('gtceu:mineable/pickaxe_or_wrench', '#gtceu:lamps')
});

ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port gregtech fluid tags start');

	event.add("c:hidden_from_recipe_viewers", /gtceu.*potion.*/);

	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_black_steel");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_red_steel");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_blue_steel");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_black_bronze");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_bismuth_bronze");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_rose_gold");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_sterling_silver");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_stainless_steel");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_manganese_phosphide");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_vanadium_steel");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_gallium_arsenide");
	event.add("c:hidden_from_recipe_viewers", "gtceu:molten_hsla_steel");
	event.add("c:hidden_from_recipe_viewers", "gtceu:damascus_steel");
	event.add("c:hidden_from_recipe_viewers", "gtceu:blaze");
	event.add("c:hidden_from_recipe_viewers", "gtceu:thorium");

	// [PORT-Ф2] tfg:molten_weak_red_steel / tfg:molten_weak_blue_steel — материалы TFG (Ф2)
	// event.add("c:hidden_from_recipe_viewers", "tfg:molten_weak_red_steel");
	// event.add("c:hidden_from_recipe_viewers", "tfg:molten_weak_blue_steel");

	event.add("c:hidden_from_recipe_viewers", "gtceu:ruby_slurry");
	event.add("c:hidden_from_recipe_viewers", "gtceu:green_sapphire_slurry");
	event.add("c:hidden_from_recipe_viewers", "gtceu:sapphire_slurry");

	event.add("c:hidden_from_recipe_viewers", "gtceu:nether_air");
	event.add("c:hidden_from_recipe_viewers", "gtceu:liquid_nether_air");
	event.add("c:hidden_from_recipe_viewers", "gtceu:ender_air");
	event.add("c:hidden_from_recipe_viewers", "gtceu:liquid_ender_air");
});
