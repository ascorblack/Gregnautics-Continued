"use strict";

// [PORT] Порт tfg/aquaponics/tags.aquaponics.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFGAquaponicsItemTags/BlockTags/FluidTags -> прямые обработчики ServerEvents.tags.
// [PORT-FIX] ПРЕДМЕТНЫЕ теги кейсингов теплиц (tfg:*_greenhouse_casings) уже наполняются в
// 00_tfg_compat.tags.js — здесь не дублируются. БЛОЧНЫЕ теги compat-файл не покрывает — добавлены тут.

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc aquaponics item tags start')

	// [PORT-FIX] tfg:*_greenhouse_casings / tfg:all_greenhouse_casings (item) — см. 00_tfg_compat.tags.js

	// [PORT-Ф4-TODO] tfg:fish_roe не зарегистрирован (аквапоника-предметы TFG-Core, Ф4) — теги еды отключены.
	// event.add('tfc:foods/usable_in_salad', 'tfg:fish_roe');
	// event.add('tfc:foods/usable_in_jam_sandwich', 'tfg:fish_roe');
	// event.add('tfc:foods/usable_in_sandwich', 'tfg:fish_roe');
	// event.add('tfc:foods/can_be_salted', 'tfg:fish_roe');
	// event.add('tfc:foods', 'tfg:fish_roe');
	// event.add('firmalife:foods/raw_fish', 'tfg:fish_roe');
	// event.add('minecraft:fishes', 'tfg:fish_roe');

	event.add('tfg:advanced_fish_food', 'tfg:flora_pellets');
	event.add('create:blaze_burner_fuel/regular', "tfg:flora_pellets");
});

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc aquaponics block tags start')

	// [PORT] Блоки firmalife:*_greenhouse_wall есть в Firmalife-NeoForge-1.21.1-3.0.11
	event.add('tfg:treated_wood_greenhouse_casings', 'firmalife:treated_wood_greenhouse_wall');
	event.add('tfg:all_greenhouse_casings', 'firmalife:treated_wood_greenhouse_wall');

	event.add('tfg:copper_greenhouse_casings', 'firmalife:copper_greenhouse_wall');
	event.add('tfg:all_greenhouse_casings', 'firmalife:copper_greenhouse_wall');

	event.add('tfg:iron_greenhouse_casings', 'firmalife:iron_greenhouse_wall');
	event.add('tfg:all_greenhouse_casings', 'firmalife:iron_greenhouse_wall');

	event.add('tfg:stainless_steel_greenhouse_casings', 'firmalife:stainless_steel_greenhouse_wall');
	event.add('tfg:all_greenhouse_casings', 'firmalife:stainless_steel_greenhouse_wall');
});

ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc aquaponics fluid tags start')

	event.add('tfg:pisciculture_fishery_fluids', 'minecraft:water')
	event.add('tfg:pisciculture_fishery_fluids', 'tfc:salt_water')
	// [PORT-Ф2] tfg:semiheavy_ammoniacal_water — жидкость TFG GT-материала (tfg.materials.nuclear.js),
	// регистрация материалов заблокирована (05_startup.dispatch.js.disabled) — жидкости не существует.
	// event.add('tfg:pisciculture_fishery_fluids', 'tfg:semiheavy_ammoniacal_water')
});
