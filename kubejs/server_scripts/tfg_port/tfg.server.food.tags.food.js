// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/tags.food.js (registerTFGFoodItemTags / registerTFGFoodBlockTags).
// Главные замены 1.20 -> 1.21 (TFC 4.x перевёл категории еды в c:):
//  tfc:foods -> c:foods; tfc:foods/fruits -> c:foods/fruit; vegetables -> c:foods/vegetable;
//  meats -> c:foods/meat (raw_meat/cooked_meat); dairy -> c:foods/dairy;
//  tfc:foods/usable_in_* -> tfc:usable_in_*; tfc:compost_greens_high -> tfc:compost_greens/high;
//  tfc:sealed_jars -> tfc:foods/sealed_preserves.
// Отсутствующие моды вырезаны с [PORT]: wan_ancient_beasts, species (частично), tfc_gourmet,
// tfcchannelcasting, beneath, ad_astra. Незарегистрированные tfg:-предметы пропускаются через guard.

const $FoodTagsRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $FoodTagsResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

/** Тихая проверка существования предмета (теги считаются существующими). */
function foodTagItemExists(id) {
	try {
		if (String(id).startsWith('#')) return true;
		return $FoodTagsRegistries.ITEM.containsKey($FoodTagsResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

function foodTagBlockExists(id) {
	try {
		return $FoodTagsRegistries.BLOCK.containsKey($FoodTagsResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.tags.food item tags start');

	/** event.add c guard'ом — незарегистрированные предметы (Ф4/Ф10) пропускаются молча. */
	const addIf = (tag, id) => {
		if (foodTagItemExists(id)) event.add(tag, id);
		else console.debug(`[Gregnautics] [PORT-Ф4-TODO] тег ${tag}: предмет ${id} не зарегистрирован — пропуск`);
	};

	// Crops
	addIf('tfc:seeds', 'tfg:sunflower_seeds');
	addIf('tfc:seeds', 'tfg:rapeseed_seeds');
	addIf('tfc:seeds', 'tfg:flax_seeds');

	// [PORT] tfc:compost_greens_high -> tfc:compost_greens/high (TFC 4.x)
	addIf('tfc:compost_greens/high', 'tfg:rapeseed_product');
	addIf('tfc:compost_greens/high', 'tfg:sunflower_product');
	addIf('tfc:compost_greens/high', 'tfg:flax_product');
	addIf('tfc:compost_greens/high', 'tfg:lunar_chorus_flower'); // [PORT-Ф10] лунный контент — предмет ещё не портирован

	addIf('tfg:sugars', 'minecraft:sugar');
	addIf('tfg:sugars', 'afc:birch_sugar');
	addIf('tfg:sugars', 'afc:maple_sugar');

	addIf('c:foods/vegetable', 'tfg:food/lavacado'); // [PORT] tfc:foods/vegetables -> c:foods/vegetable
	addIf('c:foods/fruit', 'tfg:food/magmango'); // [PORT] tfc:foods/fruits -> c:foods/fruit

	const RAW_MEATS = [
		'tfg:food/raw_birt',
		'tfg:food/raw_crawlermari',
		'tfg:food/raw_limpet'
	];
	RAW_MEATS.forEach(meat => {
		addIf('c:foods', meat); // [PORT] tfc:foods -> c:foods
		addIf('c:foods/meat', meat); // [PORT] tfc:foods/meats -> c:foods/meat
		addIf('c:foods/raw_meat', meat); // [PORT] tfc:foods/raw_meats -> c:foods/raw_meat
	});

	const COOKED_MEATS = [
		'tfg:food/cooked_birt',
		'tfg:food/cooked_crawlermari',
		'tfg:food/cooked_limpet'
	];
	COOKED_MEATS.forEach(meat => {
		addIf('c:foods', meat);
		addIf('c:foods/meat', meat);
		addIf('c:foods/cooked_meat', meat); // [PORT] tfc:foods/cooked_meats -> c:foods/cooked_meat
	});

	//These tags are used to add the tooltips and for searchability
	global.COOLING_FOODS.forEach(food => { addIf('tfg:cooling_foods', food) });

	addIf('tfg:cooling_foods_strong', 'tfg:food/ice_soup');

	global.WARMING_FOODS.forEach(food => { addIf('tfg:warming_foods', food) });

	// Alias of tfc:foods/preserves, used to give the 2-jam sandwich recipe a distinct tree key in GT's RecipeDB.
	event.add('tfc:foods/preserves_2', '#tfc:foods/preserves');

	// [PORT] tfc:sealed_jars -> tfc:foods/sealed_preserves (TFC 4.x)
	event.add('tfg:foods/all_jams', '#tfc:foods/sealed_preserves');
	event.add('tfg:foods/all_jams', '#tfc:foods/preserves');

	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_sniffer_beef');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_wraptor');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_springling_collar');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_walker_steak');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_glider_wings');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_whole_soarer');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_crusher_meat');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_goober_meat');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_cruncher_ribs');
	addIf('tfg:raw_dinosaur_meat', 'tfg:food/raw_surfer_steak');
	// [PORT] wan_ancient_beasts отсутствует на 1.21: wan_ancient_beasts:raw_ancient_meat вырезан
	// TODO add meat for charger, raider, snatcher

	/**
	 * List of items that can make light stock.
	 * @type {string[]}
	 */
	const makesLightStock = [
		'tfc:food/chicken',
		'tfc:food/cooked_chicken',
		'tfc:food/quail',
		'tfc:food/cooked_quail',
		'tfc:food/pheasant',
		'tfc:food/cooked_pheasant',
		'tfc:food/grouse',
		'tfc:food/cooked_grouse',
		'tfc:food/turkey',
		'tfc:food/cooked_turkey',
		'tfc:food/peafowl',
		'tfc:food/cooked_peafowl',
		'tfc:food/rabbit',
		'tfc:food/cooked_rabbit',
		'tfc:food/duck',
		'tfc:food/cooked_duck',
		'tfg:food/raw_birt',
		'tfg:food/cooked_birt',
		'tfg:food/raw_moon_rabbit',
		'tfg:food/cooked_moon_rabbit',
		'tfg:food/raw_wraptor',
		'tfg:food/cooked_wraptor',
		'tfg:food/raw_glider_wings',
		'tfg:food/cooked_glider_wings',
		'tfg:food/raw_whole_soarer',
		'tfg:food/cooked_whole_soarer'
	];
	makesLightStock.forEach(item => {
		addIf('tfg:foods/makes_light_stock', item);
	});

	/**
	 * List of items that can make rich stock.
	 * @type {string[]}
	 */
	const makesRichStock = [
		'tfc:food/beef',
		'tfc:food/cooked_beef',
		'tfc:food/mutton',
		'tfc:food/cooked_mutton',
		'tfc:food/bear',
		'tfc:food/cooked_bear',
		'tfc:food/horse_meat',
		'tfc:food/cooked_horse_meat',
		'tfc:food/venison',
		'tfc:food/cooked_venison',
		'tfc:food/chevon',
		'tfc:food/cooked_chevon',
		'tfc:food/gran_feline',
		'tfc:food/cooked_gran_feline',
		'tfc:food/turtle',
		'tfc:food/cooked_turtle',
		'tfc:food/camelidae',
		'tfc:food/cooked_camelidae',
		'tfg:food/raw_glacian_mutton',
		'tfg:food/cooked_glacian_mutton',
		'tfg:food/raw_sniffer_beef',
		'tfg:food/cooked_sniffer_beef',
		'tfg:food/raw_walker_steak',
		'tfg:food/cooked_walker_steak',
		'tfg:food/raw_crusher_meat',
		'tfg:food/cooked_crusher_meat',
		'tfg:food/raw_bison_meat',
		'tfg:food/cooked_bison_meat'
		// [PORT] wan_ancient_beasts отсутствует — raw/cooked_ancient_meat вырезаны
	];
	makesRichStock.forEach(item => {
		addIf('tfg:foods/makes_rich_stock', item);
	});

	/**
	 * @type {string[]} - List of cheese curd item IDs.
	 */
	const cheeseCurds = [
		'firmalife:food/yak_curd',
		'firmalife:food/goat_curd',
		'firmalife:food/milk_curd'
		// [PORT] tfc_gourmet отсутствует — ox/sheep/alpaca_curd вырезаны
	];
	cheeseCurds.forEach(item => {
		addIf('tfg:foods/cheese_curds', item);
	});

	/**
	 * @type {string[]} - List of item tags and item IDs that can be used on burgers.
	 */
	const usable_in_burgers = [
		'#c:foods/vegetable', // [PORT] tfc:foods/vegetables -> c:foods/vegetable
		'firmalife:food/cooked_bacon',
		'tfc:food/cooked_egg',
		'firmalife:food/tofu'
	];
	usable_in_burgers.forEach(item => {
		addIf('tfg:foods/usable_in_burgers', item);
	});

	/**
	 * @type {string[]} - List of cheese tags and item IDs that can be used on a cheeseburger.
	 */
	const cheeses = [
		'#firmalife:foods/cheeses',
		'tfg:food/slice_of_cheese',
		'firmalife:food/shredded_cheese'
		// [PORT] tfc_gourmet отсутствует — #tfc_gourmet:foods/brinza вырезан
	];
	cheeses.forEach(item => {
		addIf('tfg:foods/cheeses', item);
	});

	/**
	 * @type {string[]} - List of item IDs that can be used as burger meats.
	 */
	const burgerMeats = [
		'tfc:food/beef',
		'tfc:food/turkey',
		'tfc:food/venison',
		'tfg:food/raw_sniffer_beef',
		'tfg:food/raw_crusher_meat',
		'tfg:food/raw_bison_meat'
		// [PORT] wan_ancient_beasts отсутствует — raw_ancient_meat вырезан
	];
	burgerMeats.forEach(item => {
		addIf('tfg:foods/burger_meats', item);
	});

	// Spice tags
	global.SPICES.forEach(spice => {
		addIf('tfg:foods/spices', spice.product);
		addIf('tfg:foods/spice_plants', spice.plant);
	});

	/**
	 * @type {string[]} - List of item tags and item IDs that are allowed to be used in oatmeal.
	 */
	const usable_in_oatmeal = [
		'#c:foods/fruit', // [PORT] tfc:foods/fruits -> c:foods/fruit
		'tfc:food/oat_grain',
		'#firmalife:foods/chocolate'
	];
	usable_in_oatmeal.forEach(item => {
		addIf('tfg:foods/usable_in_oatmeal', item);
	});

	/**
	 * @type {string[]} - List of citrus fruit item IDs.
	 */
	const citrus_fruits = [
		'tfc:food/orange',
		'tfc:jar/orange_unsealed',
		'tfc:food/lemon',
		'tfc:jar/lemon_unsealed',
		'minecraft:glow_berries'
	];
	citrus_fruits.forEach(item => {
		addIf('tfg:foods/citrus_fruits', item);
	});

	/**
	 * List of item tags and item IDs that are allowed to be used in a meal bag.
	 * @type {string[]}
	 */
	const usable_in_meal_bag = [
		'#c:foods/meat', // [PORT] tfc:foods/meats -> c:foods/meat
		'#minecraft:fishes',
		'#c:foods/grain', // [PORT] tfc:foods/grains -> c:foods/grain
		'#c:foods/vegetable',
		'#c:foods/fruit',
		'#c:foods/dairy', // [PORT] tfc:foods/dairy -> c:foods/dairy
		'#tfc:foods/preserves',
		'#firmalife:foods/chocolate',
		// [PORT] tfcchannelcasting отсутствует — #tfcchannelcasting:foods/chocolate_sweet вырезан
		'firmalife:food/sugar_cookie',
		'firmalife:food/chocolate_chip_cookie',
		'firmalife:food/vanilla_ice_cream',
		'firmalife:food/strawberry_ice_cream',
		'firmalife:food/chocolate_ice_cream',
		'tfc:food/cooked_egg',
		'tfc:food/boiled_egg',
		'firmalife:food/pickled_egg',
		'tfc:food/cooked_rice',
		'firmalife:food/cooked_pasta',
		'firmalife:food/pasta_with_tomato_sauce',
		'firmalife:food/cooked_rice_noodles',
		'firmalife:food/tortilla_chips',
		'firmalife:food/shredded_cheese',
		'firmalife:food/salsa',
		'firmalife:food/tomato_sauce',
		'tfg:roasted_sunflower_seeds',
		'tfg:food/cooked_dino_nugget',
		'firmalife:food/toast',
		'firmalife:food/toast_with_butter',
		'firmalife:food/toast_with_jam',
		'firmalife:food/butter',
		// [PORT] tfc_gourmet отсутствует — adjika/tzatziki/falafel/hummus/sauerkraut/bratwurst вырезаны
		'tfg:food/buttered_popcorn' // [PORT-FIX] в оригинале 'tfg:buttered_popcorn' — предмет зарегистрирован как tfg:food/buttered_popcorn
	];
	usable_in_meal_bag.forEach(item => {
		addIf('tfg:foods/usable_in_meal_bag', item);
	});

	/** @type {{String[]}} List of items that can go in a savory pie */
	const usable_in_savory_pie = [
		'#c:foods/meat',
		'#c:foods/vegetable',
	];
	usable_in_savory_pie.forEach(item => {
		addIf('tfg:foods/usable_in_savory_pie', item);
	});

	addIf('tfg:foil_packs', 'tfg:foil_pack');
	addIf('tfg:foil_packs', 'tfg:clean_foil_pack');

	addIf('tfg:solid_fats', 'firmalife:food/butter');
	addIf('tfg:solid_fats', 'tfc:blubber');

	// Space foods
	addIf('c:foods', 'minecraft:glow_berries');
	addIf('c:foods', 'minecraft:chorus_fruit');
	addIf('c:foods', 'minecraft:popped_chorus_fruit');

	addIf('c:foods/vegetable', 'tfg:food/fly_agaric');
	addIf('c:foods/fruit', 'minecraft:glow_berries');
	addIf('c:foods/fruit', 'minecraft:chorus_fruit');
	addIf('c:foods/fruit', 'minecraft:popped_chorus_fruit');

	// [PORT] beneath отсутствует — блок beneath:usable_in_juicer вырезан целиком

	// [PORT] tfc:foods/usable_in_soup -> tfc:usable_in_soup (TFC 4.x)
	addIf('tfc:usable_in_soup', 'tfg:food/fly_agaric');
	addIf('tfc:usable_in_soup', 'minecraft:glow_berries');
	addIf('tfc:usable_in_soup', 'minecraft:chorus_fruit');
	addIf('tfc:usable_in_soup', 'minecraft:popped_chorus_fruit');

	// Make eggs not useless
	addIf('tfc:usable_in_salad', 'firmalife:food/pickled_egg');
	addIf('tfc:usable_in_salad', 'tfc:food/cooked_egg');
	addIf('tfc:usable_in_salad', 'tfc:food/boiled_egg');
	addIf('tfc:usable_in_jam_sandwich', 'tfc:food/cooked_egg');
	addIf('tfc:usable_in_jam_sandwich', 'tfc:food/boiled_egg');
	addIf('tfc:usable_in_sandwich', 'tfc:food/cooked_egg');
	addIf('tfc:usable_in_sandwich', 'tfc:food/boiled_egg');
	addIf('tfc:usable_in_sandwich', 'firmalife:food/pickled_egg');

	addIf('tfc:usable_in_salad', 'tfg:food/fly_agaric');
	addIf('tfc:usable_in_salad', 'minecraft:glow_berries');
	addIf('tfc:usable_in_salad', 'minecraft:chorus_fruit');
	addIf('tfc:usable_in_salad', 'minecraft:popped_chorus_fruit');

	addIf('tfc:rabbit_food', 'minecraft:chorus_fruit');
	addIf('tfc:rabbit_food', 'minecraft:popped_chorus_fruit');

	// [PORT-Ф10] ad_astra отсутствует (stellaris — не авто-ремап): блок ad_astra:cheese вырезан

	// Auto-eat blacklist for backpack feeding upgrade and quarktech helmet
	const AUTO_EAT_BLACKLIST = [
		'#tfg:medicine',
		'minecraft:rotten_flesh'
		// [PORT] beneath отсутствует — #beneath:poisonous_mushrooms вырезан
	];
	AUTO_EAT_BLACKLIST.forEach(food => {
		addIf('tfg:auto_eat_blacklist', food);
	});
});

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.tags.food block tags start');

	const addBlockIf = (tag, id) => {
		if (foodTagBlockExists(id)) event.add(tag, id);
		else console.debug(`[Gregnautics] [PORT-Ф4-TODO] тег ${tag}: блок ${id} не зарегистрирован — пропуск`);
	};

	//crop stuff
	addBlockIf('tfc:crops', 'tfg:rapeseed');
	addBlockIf('tfc:mineable_with_sharp_tool', 'tfg:rapeseed');

	addBlockIf('tfc:crops', 'tfg:sunflower');
	addBlockIf('tfc:mineable_with_sharp_tool', 'tfg:sunflower');

	addBlockIf('tfc:crops', 'tfg:flax');
	addBlockIf('tfc:mineable_with_sharp_tool', 'tfg:flax');

	// [PORT-Ф10] ad_astra отсутствует — теги ad_astra:destroyed_in_space вырезаны
});
