// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/primitive/items.primitive.js (Ф4).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// Главные изменения 1.20→1.21 (kubejs 2101.7.2 / kubejs_tfc 2.0.1):
//  - .textureJson({layer0}) → .textures({layer0})
//  - Молды: .texture("base"/"fluid",...) → .textures(base, fluid);
//    .fluidTagAccept → .allowedFluids; .tfcccAllowedInMoldTable → .moldTable
//    (мод TFC Casting Channels отсутствует, mold table теперь нативный)
//  - Color.DYE в KubeJS 7 содержит алиас-ключи (white_dye/whiteDye/...) и KubeColor
//    без getHexJS — заменено на таблицу канонических цветов красителей
//  - forge:string → c:strings, forge:cloth → c:cloth

// [PORT] Канонические цвета красителей (DyeColor.textureDiffuseColors)
const TFG_DYE_HEX = {
	white: '#F9FFFE',
	orange: '#F9801D',
	magenta: '#C74EBD',
	light_blue: '#3AB3DA',
	yellow: '#FED83D',
	lime: '#80C71F',
	pink: '#F38BAA',
	gray: '#474F52',
	light_gray: '#9D9D97',
	cyan: '#169C9C',
	purple: '#8932B8',
	blue: '#3C44AA',
	brown: '#835432',
	green: '#5E7C16',
	red: '#B02E26',
	black: '#1D1D21'
};

function registerTFGPrimitiveItems(event) {

	event.create('tfg:unstrung_bow');

	// Paper making
	event.create('tfg:hardwood_strip')
	event.create('tfg:soaked_hardwood_strip')
	event.create('tfg:soaked_unrefined_paper')

	// Chalk
	event.create('tfg:unfired_chalk')

	// [PORT] Color.DYE.forEach → MINECRAFT_DYE_NAMES + таблица цветов
	global.MINECRAFT_DYE_NAMES.forEach(dyeName => {
		event.create(`tfg:wet_${dyeName}_chalk`)
			.textures({
				layer0: 'tfg:item/unfired_chalk'
			}) // [PORT] textureJson → textures
			.color(0, TFG_DYE_HEX[dyeName]);
	});

	// Primitive rubber gloves
	event.create('tfg:prepared_leather_gloves')
	event.create('tfg:latex_soaked_gloves')

	// Chipboard
	event.create('tfg:chipboard_composite')
	event.create('tfg:treated_chipboard_composite')

	// Wax
	event.create('tfg:paraffin_wax')
	event.create('tfg:conifer_rosin')

	// Tools
	event.create('tfg:flint_club_head')

	event.create('tfg:flint_arrow_head')
	event.create('tfg:fletching')

	event.create('tfg:armor_stand_arms')

	event.create('tfg:copper_spindle')
		.tag('tfg:tools/spindles')
		.tag('tfc:usable_on_tool_rack')
		.maxDamage(120)
		.texture('tfg:item/copper_spindle')
	event.create('tfg:copper_spindle_head')
		.texture('tfg:item/copper_spindle_head')

	event.create('tfg:bronze_spindle')
		.tag('tfg:tools/spindles')
		.tag('tfc:usable_on_tool_rack')
		.maxDamage(192)
		.texture('tfg:item/bronze_spindle')
	event.create('tfg:bronze_spindle_head')
		.texture('tfg:item/bronze_spindle_head')

	event.create('tfg:bismuth_bronze_spindle')
		.tag('tfg:tools/spindles')
		.tag('tfc:usable_on_tool_rack')
		.maxDamage(160)
		.texture('tfg:item/bismuth_bronze_spindle')
	event.create('tfg:bismuth_bronze_spindle_head')
		.texture('tfg:item/bismuth_bronze_spindle_head')

	event.create('tfg:black_bronze_spindle')
		.tag('tfg:tools/spindles')
		.tag('tfc:usable_on_tool_rack')
		.maxDamage(220)
		.texture('tfg:item/black_bronze_spindle')
	event.create('tfg:black_bronze_spindle_head')
		.texture('tfg:item/black_bronze_spindle_head')

	event.create('tfg:wrought_iron_spindle')
		.tag('tfg:tools/spindles')
		.tag('tfc:usable_on_tool_rack')
		.maxDamage(480)
		.texture('tfg:item/wrought_iron_spindle')
	event.create('tfg:wrought_iron_spindle_head')
		.texture('tfg:item/wrought_iron_spindle_head')

	event.create('tfg:harvest_basket')
		.parentModel('tfg:item/harvest_basket')
		.maxDamage(256)

	event.create('tfg:aluminium_harvest_basket')
		.parentModel('tfg:item/aluminium_harvest_basket')
		.unstackable()

	// Carts
	event.create('tfg:cobalt_brass_wheel')

	// Fishing Nets
	event.create('tfg:fishing_net/wood')
		.translationKey('item.tfg.fishing_net.wood')
		.parentModel('tfg:item/fishing_nets/wood_fishing_net')
		.texture('tfg:item/fishing_nets/wood_fishing_net')
		.maxDamage(112)

	event.create('tfg:fishing_net/brass')
		.translationKey('item.tfg.fishing_net.brass')
		.parentModel('tfg:item/fishing_nets/brass_fishing_net')
		.texture('tfg:item/fishing_nets/brass_fishing_net')
		.maxDamage(326)

	event.create('tfg:fishing_net/rose_gold')
		.translationKey('item.tfg.fishing_net.rose_gold')
		.parentModel('tfg:item/fishing_nets/rose_gold_fishing_net')
		.texture('tfg:item/fishing_nets/rose_gold_fishing_net')
		.maxDamage(380)

	event.create('tfg:fishing_net/sterling_silver')
		.translationKey('item.tfg.fishing_net.sterling_silver')
		.parentModel('tfg:item/fishing_nets/sterling_silver_fishing_net')
		.texture('tfg:item/fishing_nets/sterling_silver_fishing_net')
		.maxDamage(380)

	event.create('tfg:fishing_net/invar')
		.translationKey('item.tfg.fishing_net.invar')
		.parentModel('tfg:item/fishing_nets/invar_fishing_net')
		.texture('tfg:item/fishing_nets/invar_fishing_net')
		.maxDamage(740)

	event.create('tfg:fishing_net/tin_alloy')
		.translationKey('item.tfg.fishing_net.tin_alloy')
		.parentModel('tfg:item/fishing_nets/tin_alloy_fishing_net')
		.texture('tfg:item/fishing_nets/tin_alloy_fishing_net')
		.maxDamage(710)

	event.create('tfg:fishing_net/cupronickel')
		.translationKey('item.tfg.fishing_net.cupronickel')
		.parentModel('tfg:item/fishing_nets/cupronickel_fishing_net')
		.texture('tfg:item/fishing_nets/cupronickel_fishing_net')
		.maxDamage(560)

	event.create('tfg:fishing_net/magnalium')
		.translationKey('item.tfg.fishing_net.magnalium')
		.parentModel('tfg:item/fishing_nets/magnalium_fishing_net')
		.texture('tfg:item/fishing_nets/magnalium_fishing_net')
		.maxDamage(1830)

	// Universal compost items
	event.create('tfg:universal_compost_browns')
		.tag('tfc:compost_browns_low')
		.translationKey('item.tfg.universal_compost_browns')

	event.create('tfg:universal_compost_greens')
		.tag('tfc:compost_greens_low')
		.translationKey('item.tfg.universal_compost_greens')

	// Universal compost bag items
	event.create('tfg:universal_compost_browns_bag')
		.tag('tfc:compost_browns_high')
		.translationKey('item.tfg.universal_compost_browns_bag')

	event.create('tfg:universal_compost_greens_bag')
		.tag('tfc:compost_greens_high')
		.translationKey('item.tfg.universal_compost_greens_bag')

	// Etched Diamond Etching Tip
	event.create('tfg:etching_diamond_tip')

	// Cloth & String
	event.create('tfg:polycaprolactam_fabric')
	event.create('tfg:polycaprolactam_string')
	event.create('tfg:phantom_silk')
	event.create('tfg:phantom_thread')

	// Flax Stuff
	event.create('tfg:flax_waste')
		.tag('tfc:scrapable')
	event.create('tfg:flax_tow')
		.tag('tfg:burlap_fiber')
		.tag('tfc:compost_browns')
	event.create('tfg:flax_line')
		.tag('tfc:compost_browns_low')
	event.create('tfg:linen_thread')
		.tag('c:strings') // [PORT] forge:string → c:strings
	event.create('tfg:linen_cloth')
		.tag('c:cloth') // [PORT] forge:cloth → c:cloth
		.tag('tfc:sewing_light_cloth')

	event.create('tfg:flax_bundle')
		.tag('tfc:scrapable')
		.texture('tfg:item/flax_bundle')

	event.create('tfg:bundled_scraped_flax')
		.tag('tfc:scrapable')
		.texture('tfg:item/bundled_scraped_flax')

		// Molds
	event.create('tfg:rod_mold', 'tfc:mold')
		.capacity(72)
		.textures('tfg:item/mold/fired/rod_mold_empty', 'tfg:item/mold/fired/rod_mold_overlay') // [PORT] texture("base"/"fluid") → textures(base, fluid)
		.tag('tfc:fired_molds')
		.tag('tfc:molds')
		.allowedFluids('tfg:usable_in_rod_mold') // [PORT] fluidTagAccept → allowedFluids
		.moldTable([ // [PORT] tfcccAllowedInMoldTable → moldTable
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXX  XX",
			"XXXXXXXXX   XX",
			"XXXXXXXX   XXX",
			"XXXXXXX   XXXX",
			"XXXXXX   XXXXX",
			"XXXXX   XXXXXX",
			"XXXX   XXXXXXX",
			"XXX   XXXXXXXX",
			"XX   XXXXXXXXX",
			"XX  XXXXXXXXXX",
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX"
		])


	event.create('tfg:spindle_head_mold', 'tfc:mold')
		.capacity(72)
		.textures('tfg:item/mold/fired/spindle_head_empty', 'tfg:item/mold/fired/spindle_head_overlay') // [PORT]
		.tag('tfc:fired_molds')
		.tag('tfc:molds')
		.allowedFluids('tfg:usable_in_spindle_head_mold') // [PORT]
		.moldTable([ // [PORT]
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXX  XX",
			"XXXXXXXXX   XX",
			"XXXXXX     XXX",
			"XXXXX     XXXX",
			"XXXX     XXXXX",
			"XXXX    XXXXXX",
			"XXXX   XXXXXXX",
			"XXX   XXXXXXXX",
			"XX   XXXXXXXXX",
			"XX  XXXXXXXXXX",
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX"
		])

	event.create('tfg:small_gear_mold', 'tfc:mold')
		.capacity(144)
		.textures('tfg:item/mold/fired/small_gear_mold_empty', 'tfg:item/mold/fired/small_gear_mold_overlay') // [PORT]
		.tag('tfc:fired_molds')
		.tag('tfc:molds')
		.allowedFluids('tfg:usable_in_small_gear_mold') // [PORT]
		.moldTable([ // [PORT]
			"XXXXXXXXXXXXXX",
			"XXXXXXX   XXXX",
			"XX   X    XXXX",
			"XX        XXXX",
			"XX           X",
			"XXX          X",
			"XX    XX     X",
			"X     XX    XX",
			"X          XXX",
			"X           XX",
			"XXXX        XX",
			"XXX    X    XX",
			"XXX   XXXXXXXX",
			"XXXXXXXXXXXXXX"
		])

	event.create('tfg:nugget_mold', 'tfc:mold')
		.capacity(64)
		.textures('tfg:item/mold/fired/nugget_mold_empty', 'tfg:item/mold/fired/nugget_mold_overlay') // [PORT]
		.tag('tfc:fired_molds')
		.tag('tfc:molds')
		.allowedFluids('tfg:usable_in_nugget_mold') // [PORT]
		.moldTable([ // [PORT]
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX",
			"XXX  XXXXX XXX",
			"XX    XXX   XX",
			"XX    XX    XX",
			"XXX XXXXX  XXX",
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX",
			"XXX  XXXX  XXX",
			"XX    XXX   XX",
			"XX   XXX    XX",
			"XXX XXXXX  XXX",
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX"
		])

	event.create('tfg:lamp_mold', 'tfc:mold')
		.capacity(144)
		.textures('tfg:item/mold/fired/lamp_mold_empty', 'tfg:item/mold/fired/lamp_mold_overlay') // [PORT]
		.tag('tfc:fired_molds')
		.tag('tfc:molds')
		.allowedFluids('tfg:usable_in_lamp_mold') // [PORT]
		.moldTable([ // [PORT]
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX",
			"XXXXXX XXXXXXX",
			"XXXXX    XXXXX",
			"XXXXX    XXXXX",
			"XXXX      XXXX",
			"XXXX XXXX XXXX",
			"XXXX XXXX XXXX",
			"XXXX XXXX XXXX",
			"XXXX XXXX XXXX",
			"XXXX XXXX XXXX",
			"XXXX      XXXX",
			"XXXXXXXXXXXXXX",
			"XXXXXXXXXXXXXX"
		])

	// Unfired Molds
	event.create('tfg:unfired_rod_mold')
		.texture("tfg:item/mold/unfired/unfired_rod_mold")
		.tag('tfc:unfired_molds')
		.tag('tfc:fire_clay_recycle_5')
		.tag('tfc:molds')
		.tag('tfc:unfired_pottery')

	event.create('tfg:unfired_spindle_head_mold')
		.texture("tfg:item/mold/unfired/unfired_spindle_head_mold")
		.tag('tfc:unfired_molds')
		.tag('tfc:clay_recycle_5')
		.tag('tfc:molds')
		.tag('tfc:unfired_pottery')

	event.create('tfg:unfired_small_gear_mold')
		.texture("tfg:item/mold/unfired/unfired_small_gear_mold")
		.tag('tfc:unfired_molds')
		.tag('tfc:fire_clay_recycle_5')
		.tag('tfc:molds')
		.tag('tfc:unfired_pottery')

	event.create('tfg:unfired_nugget_mold')
		.texture("tfg:item/mold/unfired/unfired_nugget_mold")
		.tag('tfc:unfired_molds')
		.tag('tfc:clay_recycle_5')
		.tag('tfc:molds')
		.tag('tfc:unfired_pottery')

	event.create('tfg:unfired_lamp_mold')
		.texture("tfg:item/mold/unfired/unfired_lamp_mold")
		.tag('tfc:unfired_molds')
		.tag('tfc:clay_recycle_5')
		.tag('tfc:molds')
		.tag('tfc:unfired_pottery')
}

// [PORT] Прямая регистрация вместо диспетчера Ф2
StartupEvents.registry('item', event => {
	console.info('[Gregnautics] progress: tfg_port primitive registry start')
	registerTFGPrimitiveItems(event)
})
