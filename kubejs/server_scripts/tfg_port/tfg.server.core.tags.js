// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/tags.js (инлайн-часть registerTFGItemTags / registerTFGBlockTags /
// registerTFGFluidTags / registerTFGEntityTypeTags). Суб-вызовы диспетчеров (registerTFGStoneItemTags,
// registerTFGMoonItemTags, biome/features и т.д.) живут в других исходных файлах и портируются отдельно.
// Главные изменения 1.20→1.21:
//  - forge: -> c: (лизны: c:lenses/<цвет>, проверено по TagPrefix GTM8 — формат lenses/%s)
//  - УЖЕ ПОРТИРОВАНО в 00_tfg_compat.tags.js (не дублируем): track_rods (tfg/tags.js:162),
//    c:rods|screws/any_bronze (:87-93), tfc:mortar, tfg:clean_water (кроме spring_water — добавлен тут)
//  - immersive_aircraft, ad_astra, endermanoverhaul, tfc_gourmet отсутствуют — вырезано [PORT]/[PORT-Ф10]
//  - незарегистрированный tfg:-контент (Ф2/Ф4) — фильтр по реестру, включится автоматически

const $TfgTagsBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $TfgTagsResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

/** Тихая проверка существования предмета — не создаёт warning'ов в логе. */
function tfgTagsItemExists(id) {
	try {
		return $TfgTagsBuiltInRegistries.ITEM.containsKey($TfgTagsResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

function tfgTagsBlockExists(id) {
	try {
		return $TfgTagsBuiltInRegistries.BLOCK.containsKey($TfgTagsResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

function tfgTagsFluidExists(id) {
	try {
		return $TfgTagsBuiltInRegistries.FLUID.containsKey($TfgTagsResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

//#region Items
ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.core item tags start');

	/** Добавление в тег с фильтром по реестру (для Ф2/Ф4-контента). */
	const addIfExists = (tag, id) => {
		if (tfgTagsItemExists(id)) event.add(tag, id);
	};

	// Curios slots for wearables
	// [PORT-Ф4-TODO] tfg:snorkel / tfg:flippers / tfg:snowshoes ещё не зарегистрированы
	addIfExists('curios:face', 'tfg:snorkel');
	addIfExists('curios:clothes_socks', 'tfg:flippers');
	addIfExists('curios:clothes_socks', 'tfg:snowshoes');

	// [PORT-Ф4-TODO] верёвочные лестницы (tfg:wood/rope_ladder/*) ещё не зарегистрированы —
	// цикл forEachTFGRopeLadderVariant -> event.add('tfg:rope_ladders', ...) вернётся с Ф4
	// (WAB/AD_ASTRA/BENEATH-варианты — [PORT-Ф10])

	// Disable auto generation for Vintage Recipes
	// [PORT-Ф2] tfg:basalt_fiber_plate — пластина кастомного GT-материала TFG (rockets)
	addIfExists('tfg:no_vintage_gen', 'tfg:basalt_fiber_plate');

	//Circuit Stuff
	event.add('tfg:components/uv_leds', 'tfg:uv_led');
	event.add('tfg:components/uv_leds', 'tfg:smd_uv_led');

	//Bronze Crates & Drums
	// [PORT-Ф2] black/bismuth_bronze crates/drums генерятся TFG-флагами GT-материалов — фильтр по реестру
	event.add('tfg:any_bronze_crate', 'gtceu:bronze_crate');
	addIfExists('tfg:any_bronze_crate', 'gtceu:black_bronze_crate');
	addIfExists('tfg:any_bronze_crate', 'gtceu:bismuth_bronze_crate');
	event.add('tfg:any_bronze_drum', 'gtceu:bronze_drum');
	addIfExists('tfg:any_bronze_drum', 'gtceu:black_bronze_drum');
	addIfExists('tfg:any_bronze_drum', 'gtceu:bismuth_bronze_drum');

	//Explosive Tag for the Gas Well
	event.add('tfg:explosives', 'gtceu:powderbarrel', 'minecraft:tnt', 'gtceu:industrial_tnt', 'gtceu:dynamite');

	// Tools
	// [PORT-Ф4-TODO] шприцы ДНК ещё не зарегистрированы
	addIfExists('tfg:empty_dna_syringes', 'tfg:empty_dna_syringe');
	addIfExists('tfg:empty_dna_syringes', 'tfg:clean_dna_syringe');

	event.add('tfc:sewing_needles', 'tfg:stainless_steel_needle');

	// Airplane Upgrades
	// [PORT] immersive_aircraft отсутствует — цикл AIRCRAFT_UPGRADES вырезан (global тоже не портирован)

	// Universal Circuits
	global.UNIVERSAL_CIRCUIT_TIERS.forEach(tier => {
		event.add(`gtceu:circuits/${tier}`, `tfg:${tier}_universal_circuit`);
	});

	// Use either cast or wrought iron
	event.add('tfg:any_iron_double_ingot', '#c:double_ingots/iron');
	event.add('tfg:any_iron_double_ingot', '#c:double_ingots/wrought_iron');

	// Allow any bronze type
	event.add('tfg:any_bronze_frame', '#c:frames/bronze');
	event.add('tfg:any_bronze_frame', '#c:frames/bismuth_bronze');
	event.add('tfg:any_bronze_frame', '#c:frames/black_bronze');

	// [PORT] c:rods/any_bronze и c:screws/any_bronze уже добавлены в 00_tfg_compat.tags.js — не дублируем

	// Steam Bloomery
	event.add('tfg:bloomery_basic_fuels', 'minecraft:charcoal');
	event.add('tfg:bloomery_basic_fuels', 'tfc:ore/bituminous_coal');
	event.add('tfg:bloomery_basic_fuels', 'tfc:ore/lignite');

	// Holder materials
	// [PORT-Ф2] holder-материалы (tfg:nitrocellulose, tfg:cellulose_matrix) не зарегистрированы как
	// GT-материалы, а tfg:polycaprolactam_fabric/string зарегистрированы обычными предметами и
	// автоматических GT/TFC-тегов не получают — все event.remove(...) здесь были бы no-op'ами:
	// event.remove('forge:dusts', 'tfg:nitrocellulose') ... event.remove('forge:nuggets/tfg_polycaprolactam', 'tfg:polycaprolactam_string')

	// Tags for the precision fabricator renderer
	// [PORT-Ф2/Ф4] silicon_seed_crystal и mo_50_re_ingot ещё не зарегистрированы — фильтр по реестру
	addIfExists('tfg:precision_fabricator_dipped_items', 'tfg:silicon_seed_crystal');
	addIfExists('tfg:precision_fabricator_dipped_items', 'tfg:worked_optical_borosilicate_blank');
	addIfExists('tfg:precision_fabricator_dipped_items', 'tfg:mo_50_re_ingot');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/amethyst');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/opal');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/diamond');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/sapphire');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/green_sapphire');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/ruby');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/red_garnet');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/yellow_garnet');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/lapis');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/sodalite');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/lazurite');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/blue_topaz');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/topaz');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/emerald');
	event.add('tfg:precision_fabricator_holder_rods', '#c:rods/olivine');

	// Tag for new lenses
	// [PORT-FIX] дублирующие пред-цикловые строки orange/cyan оригинала свёрнуты в цикл.
	// [PORT-Ф2] лизны из новых флагов (spessartine, apatite, yellow_garnet, olivine, grossular,
	// coal, armalcolite) появятся после Ф2 — фильтр по реестру; замена выполняется только если
	// гем-лизна реально существует (иначе остаёмся на стеклянной).
	const LENS_TAGS = [
		['emerald',       'green',      'gtceu:emerald_lens',       'gtceu:green_glass_lens'],
		['sapphire',      'blue',       'gtceu:sapphire_lens',      'gtceu:blue_glass_lens'],
		['ruby',          'red',        'gtceu:ruby_lens',          'gtceu:red_glass_lens'],
		['diamond',       'light_blue', 'gtceu:diamond_lens',       'gtceu:light_blue_glass_lens'],
		['apatite',       'cyan',       'gtceu:apatite_lens',       'gtceu:cyan_glass_lens'],
		['spessartine',   'orange',     'gtceu:spessartine_lens',   'gtceu:orange_glass_lens'],
		['yellow_garnet', 'yellow',     'gtceu:yellow_garnet_lens', 'gtceu:yellow_glass_lens'],
		['olivine',       'lime',       'gtceu:olivine_lens',       'gtceu:lime_glass_lens'],
		['amethyst',      'purple',     'gtceu:amethyst_lens',      'gtceu:purple_glass_lens'],
		['grossular',     'brown',      'gtceu:grossular_lens',     'gtceu:brown_glass_lens'],
		['armalcolite',   'gray',       'gtceu:armalcolite_lens',   'gtceu:gray_glass_lens'],
		['coal',          'black',      'gtceu:coal_lens',          'gtceu:black_glass_lens'],
	];

	LENS_TAGS.forEach(([material, colour, gemLens, glassLens]) => {
		if (!tfgTagsItemExists(gemLens)) return; // [PORT-Ф2]
		event.add(`c:lenses/${colour}`, gemLens); // [PORT] forge:lenses/* -> c:lenses/*
		event.remove(`c:lenses/${colour}`, glassLens);
		event.removeAllTagsFrom(glassLens);
		event.add('c:hidden_from_recipe_viewers', glassLens);
	});

	// [PORT] tfg:track_rods уже в 00_tfg_compat.tags.js — не дублируем (tfg/tags.js:162-163)

	global.TFC_WOOD_TYPES.forEach(wood => {
		event.add('c:hidden_from_recipe_viewers', `railways:track_incomplete_tfc_${wood}`);
		event.add('c:hidden_from_recipe_viewers', `railways:track_incomplete_tfc_${wood}_narrow`);
		event.add('c:hidden_from_recipe_viewers', `railways:track_incomplete_tfc_${wood}_wide`);
	});

	const OTHER_TRACKS = [
		"blackstone", "tieless", "acacia",
		"birch",      "cherry",  "jungle",
		"spruce",     "crimson",  "warped",
		"bamboo",     "stripped_bamboo", "create_andesite"
	];

	OTHER_TRACKS.forEach(rail => {
		// [PORT-FIX] у create_andesite нет базового варианта (только narrow/wide) — фильтр по реестру
		addIfExists('c:hidden_from_recipe_viewers', `railways:track_incomplete_${rail}`);
		addIfExists('c:hidden_from_recipe_viewers', `railways:track_incomplete_${rail}_narrow`);
		addIfExists('c:hidden_from_recipe_viewers', `railways:track_incomplete_${rail}_wide`);
	});

	event.add('c:hidden_from_recipe_viewers', `railways:track_incomplete_monorail`);

	// tag locometal blocks (minus (trap)doors) for emi++ grouping

	const LOCOMETAL_TYPES = [
		"riveted_locometal", "slashed_locometal", "locometal_vent", "flat_riveted_locometal",
		"flat_slashed_locometal", "plated_locometal", "locometal_pillar", "locometal_smokebox",
		"brass_wrapped_locometal", "copper_wrapped_locometal", "iron_wrapped_locometal",
		"wrapped_locometal_smokebox", "copper_wrapped_locometal_smokebox",
		"hazard_stripes_diagonal_on_black", "hazard_stripes_chevron_on_black",
		"hazard_stripes_diagonal_on_white", "hazard_stripes_chevron_on_white",
		"iron_wrapped_locometal_smokebox", "locometal_boiler", "brass_wrapped_locometal_boiler",
		"copper_wrapped_locometal_boiler", "iron_wrapped_locometal_boiler",
		"locometal_flywheel", "locometal_end_ladder", "locometal_rung_ladder",
		"round_pane_locometal_window", "single_pane_locometal_window",
		"two_pane_locometal_window", "four_pane_locometal_window",
	];

	LOCOMETAL_TYPES.forEach(type => {
		addIfExists('tfg:locometal_blocks', `railways:${type}`);
		global.LOCOMETAL_COLORS.forEach(colorObj => {
			colorObj.colors.forEach(subColor => {
				addIfExists('tfg:locometal_blocks', `railways:${subColor}_${type}`);
			});
		});
	});

	//tag smokestacks for emi++ grouping
	const SMOKESTACK_TYPES = [
		"long", "coalburner", "oilburner", "streamlined", "woodburner",
	];

	const SMOKESTACK_MATERIALS = [
	"brass_cap_steel", "copper_cap_steel", "iron_cap_steel", "brass", "iron_cap_copper",
	"copper_cap_brass", "iron_cap_brass", "copper", "brass_cap_copper",
	];

	SMOKESTACK_TYPES.forEach(type => {
		event.add('tfg:smokestacks', `railways:smokestack_${type}`);
		SMOKESTACK_MATERIALS.forEach(mat => {
			event.add('tfg:smokestacks', `railways:smokestack_${type}_${mat}`);
		});
	});

	event.add('tfg:smokestacks', 'railways:smokestack_caboosestyle');

	// links and headstocks

	const TRAIN_LINKS_AND_HEADSTOCKS = [
	"link_and_pin", "link_and_pin_linkless", "knuckle_coupler", "split_knuckle_coupler", "screwlink_coupler",
	];

	TRAIN_LINKS_AND_HEADSTOCKS.forEach(type => {
		addIfExists('tfg:train_connectors', `railways:${type}`);
		addIfExists('tfg:train_connectors', `railways:wooden_headstock_${type}`);
		addIfExists('tfg:train_connectors', `railways:copycat_headstock_${type}`);
	});

	event.add('tfg:train_connectors', 'railways:small_buffer');
	event.add('tfg:train_connectors', 'railways:wooden_headstock_buffer');
	event.add('tfg:train_connectors', 'railways:copycat_headstock_buffer');
	event.add('tfg:train_connectors', 'railways:big_buffer');
	event.add('tfg:train_connectors', 'railways:wooden_headstock');
	event.add('tfg:train_connectors', 'railways:copycat_headstock');

	//wet concrete
	event.add('tfg:wet_concrete_roads', 'rnr:wet_concrete_road');
	event.add('tfg:wet_concrete_roads', 'rnr:wet_concrete_road_control_joint');
	event.add('tfg:wet_concrete_roads', 'rnr:wet_concrete_road_panel');
	event.add('tfg:wet_concrete_roads', 'rnr:wet_concrete_road_sett');
	event.add('tfg:wet_concrete_roads', 'rnr:wet_concrete_road_flagstones');

	// [PORT-Ф4-TODO] смолы для асфальта (tfg:*oil_tar) ещё не зарегистрированы — фильтр по реестру
	const ASPHALT_TARS = [
		'tfg:oil_tar',
		'tfg:raw_oil_tar',
		'tfg:light_oil_tar',
		'tfg:heavy_oil_tar',
	];

	ASPHALT_TARS.forEach(id => {
		addIfExists('tfg:asphalt_tars', id);
	});

	event.add('tfc:usable_on_tool_rack', '#tfg:asphalt_road_stencils');

	// [PORT-Ф4-TODO] tfg:stone_brick ещё не зарегистрирован
	addIfExists('minecraft:brick', 'tfg:stone_brick');
});
//#endregion

//#region Blocks
ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.core block tags start');

	const addBlockIfExists = (tag, id) => {
		if (tfgTagsBlockExists(id)) event.add(tag, id);
	};

	// [PORT] суб-вызовы (registerTFGPrimitiveBlockTags и т.д.) — в других файлах порта

	// [PORT-Ф4-TODO] машинные кейсинги/катушки ещё не зарегистрированы — фильтр по реестру
	addBlockIfExists('gtceu:mineable/pickaxe_or_wrench', 'tfg:superconductor_coil_large');
	addBlockIfExists('gtceu:mineable/pickaxe_or_wrench', 'tfg:superconductor_coil_small');
	addBlockIfExists('gtceu:mineable/pickaxe_or_wrench', 'tfg:electromagnetic_accelerator');
	addBlockIfExists('gtceu:mineable/pickaxe_or_wrench', 'tfg:reflector');
	addBlockIfExists('gtceu:mineable/pickaxe_or_wrench', 'tfg:machine_casing_aluminium_plated_steel');
	addBlockIfExists('gtceu:mineable/pickaxe_or_wrench', 'tfg:machine_casing_power_casing');

	// [PORT-Ф4-TODO] верёвочные лестницы не зарегистрированы — цикл forEachTFGRopeLadderVariant
	// (tfg:rope_ladders, create:copycat_deny, minecraft:fall_damage_resetting, minecraft:climbable)
	// вернётся с Ф4; WAB/AD_ASTRA/BENEATH-варианты — [PORT-Ф10]

	// [PORT-Ф10] tfg:mars_ice / tfg:dry_ice — космоблоки, вернутся с Ф10 (фильтр по реестру)
	addBlockIfExists('minecraft:mineable/pickaxe', 'tfg:mars_ice');
	addBlockIfExists('minecraft:ice', 'tfg:mars_ice');
	addBlockIfExists('minecraft:mineable/pickaxe', 'tfg:dry_ice');

	// [PORT-Ф4-TODO] асфальтовые дороги не зарегистрированы — фильтр по реестру
	addBlockIfExists('tfg:functional_asphalt_roads', 'tfg:asphalt_road');
	addBlockIfExists('tfg:functional_asphalt_road_stairs', 'tfg:asphalt_road_stairs');
	addBlockIfExists('tfg:functional_asphalt_road_slabs', 'tfg:asphalt_road_slab');
});
//#endregion

//#region Fluids
ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.core fluid tags start');

	const addFluidIfExists = (tag, id) => {
		if (tfgTagsFluidExists(id)) event.add(tag, id);
	};

	// [PORT] суб-вызовы (registerTFGAquaponicsFluidTags, registerTFGPrimitiveFluidTags) — в других файлах порта

	// [PORT] tfg:clean_water: minecraft:water и tfc:river_water уже в 00_tfg_compat.tags.js,
	// здесь добавляем недостающий tfc:spring_water (tfg/tags.js:319)
	event.add('tfg:clean_water', 'tfc:spring_water');

	event.add('tfg:water_boiler', 'minecraft:water');
	event.add('tfg:water_boiler_t2', 'gtceu:distilled_water');

	// [PORT-Ф2] жидкости кастомных GT-материалов TFG (semiheavy_*, muddy_water, proto_growth_medium,
	// brown_gravy, rich_stock, light_stock) ещё не зарегистрированы — фильтр по реестру,
	// включатся автоматически после Ф2
	['tfg:semiheavy_ammoniacal_water', 'tfg:muddy_water', 'tfg:semiheavy_water'].forEach(id => {
		addFluidIfExists('tfc:any_water', id);
		addFluidIfExists('tfc:hydrating', id);
		addFluidIfExists('tfc:drinkables', id);
		addFluidIfExists('tfc:any_drinkables', id);
		addFluidIfExists('minecraft:water', id);
	});
	// [PORT-FIX] в оригинале tfc:ingredients только у semiheavy_ammoniacal_water и semiheavy_water (не muddy)
	addFluidIfExists('tfc:ingredients', 'tfg:semiheavy_ammoniacal_water');
	addFluidIfExists('tfc:ingredients', 'tfg:semiheavy_water');

	addFluidIfExists('tfc:drinkables', 'tfg:proto_growth_medium');
	addFluidIfExists('tfc:any_drinkables', 'tfg:proto_growth_medium');

	addFluidIfExists('tfc:drinkables', 'tfg:brown_gravy');
	addFluidIfExists('tfc:any_drinkables', 'tfg:brown_gravy');

	addFluidIfExists('minecraft:water', 'tfg:rich_stock');
	addFluidIfExists('tfc:drinkables', 'tfg:rich_stock');
	addFluidIfExists('tfc:any_drinkables', 'tfg:rich_stock');

	addFluidIfExists('minecraft:water', 'tfg:light_stock');
	addFluidIfExists('tfc:drinkables', 'tfg:light_stock');
	addFluidIfExists('tfc:any_drinkables', 'tfg:light_stock');

	event.add('tfc:drinkables', 'gtceu:ethanol');
	event.add('tfc:any_drinkables', 'gtceu:ethanol');
	event.add('tfc:drinkables', 'gtceu:methanol');
	event.add('tfc:any_drinkables', 'gtceu:methanol');
	event.add('tfc:drinkables', 'gtceu:concrete');
	event.add('tfc:any_drinkables', 'gtceu:concrete');
	event.add('tfc:drinkables', 'rnr:concrete');
	event.add('tfc:any_drinkables', 'rnr:concrete'); // [PORT-FIX] в оригинале опечатка — второй раз gtceu:concrete

	global.ALCOHOLS.forEach(alcohol => {

		if (alcohol.id && tfgTagsFluidExists(alcohol.id)) {
			event.add('tfg:alcohols', alcohol.id);
			event.add('tfg:base_alcohols', alcohol.id);
			event.add(`tfg:alcohols/${alcohol.name}`, alcohol.id);
			if (alcohol.genBase) {
				event.add('tfc:drinkables', alcohol.id);
			}
		}

		if (alcohol.agedId && tfgTagsFluidExists(alcohol.agedId)) {
			event.add('tfg:alcohols', alcohol.agedId);
			event.add(`tfg:alcohols/${alcohol.name}`, alcohol.agedId);
			event.add('tfg:proofed_alcohols', alcohol.agedId);
			if (alcohol.genAged) {
				event.add('tfc:drinkables', alcohol.agedId);
				event.add('tfcagedalcohol:aged_alcohols', alcohol.agedId);
			}
		}

		if (alcohol.vintageId && tfgTagsFluidExists(alcohol.vintageId)) {
			event.add('tfg:alcohols', alcohol.vintageId);
			event.add(`tfg:alcohols/${alcohol.name}`, alcohol.vintageId);
			event.add('tfg:proofed_alcohols', alcohol.vintageId);
			if (alcohol.genVintage) {
				event.add('tfc:drinkables', alcohol.vintageId);
				event.add('tfg:vintage_alcohols', alcohol.vintageId);
			}
		}
	});

	event.add('tfc:drinkables', 'gtceu:ice');
	event.add('tfc:any_drinkables', 'gtceu:ice');

	// [PORT-FIX] GTM8 переименовал нефти: oil_light -> light_oil, oil_medium -> raw_oil, oil_heavy -> heavy_oil
	event.add('tfg:oils', 'gtceu:oil');
	event.add('tfg:oils', 'gtceu:light_oil');
	event.add('tfg:oils', 'gtceu:raw_oil');
	event.add('tfg:oils', 'gtceu:heavy_oil');

	// [PORT] tfc_gourmet отсутствует — kvass/lemonade/nalivka/coffee/cocoa/tea_* вырезаны
	event.add('tfg:cooling_drinks', 'gtceu:ice');

	event.add('tfg:warming_drinks', 'tfc:spring_water');

	// [PORT-Ф10] global.BREATHABLE_COMPRESSED_AIRS не портирован (космоконтент) —
	// цикл tfg:breathable_compressed_air вернётся с Ф10

	// Platline tags
	event.add('tfg:sulfuric_metal_solution', 'gtceu:sulfuric_copper_solution');
	event.add('tfg:sulfuric_metal_solution', 'gtceu:sulfuric_nickel_solution');

	// GT fluid input recipe modification bug workaround
	// GT adds these tags by itself already but not in time for our recipe modification to apply properly.
	event.add('c:polyethylene',      'gtceu:polyethylene');
	event.add('c:sodium_persulfate', 'gtceu:sodium_persulfate');
	event.add('c:iron_iii_chloride', 'gtceu:iron_iii_chloride');
	event.add('c:tin',               'gtceu:tin');
	event.add('c:soldering_alloy',   'gtceu:soldering_alloy');

	// Fluid tag to run the Ore Proc Multiblock
	event.add('tfg:ore_proc_gas', 'gtceu:natural_gas');
});
//#endregion

//#region Entity Types
ServerEvents.tags('entity_type', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.core entity_type tags start');

	// [PORT] суб-вызовы (registerTFGOverworldEntityTypeTags и т.д.) — в других файлах порта

	event.add('tfg:ignores_gravity', 'firmalife:bee');
	// [PORT-Ф10] ad_astra:can_survive_in_space (railways:conductor, endermanoverhaul:*) —
	// ad_astra и endermanoverhaul отсутствуют; аналог для stellaris — с Ф10
});
//#endregion

// [PORT] registerTFGBiomeTags / registerTFGConfiguredFeatures / registerTFGPlacedFeatures —
// чистые диспетчеры к worldgen-файлам (tfg/overworld, tfg/moon и т.д.), портируются отдельно.
