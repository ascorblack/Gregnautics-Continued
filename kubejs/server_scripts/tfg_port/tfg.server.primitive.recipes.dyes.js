// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.dyes.js (Ф4).
// Главные изменения 1.20→1.21:
//  - tfc:saws → c:tools/saw
//  - barrel_instant: конструктор (input_fluid) + .inputItem/.outputItem; TFC.fluidStackIngredient удалён
//  - createMilling → event.recipes.create.milling; голый '#tag' в create-схемах парсится как жидкость →
//    plain-объект {tag: ...}
//  - тег tfc:colored_bed наполняется в tfg.server.primitive.tags.primitive.js [PORT-FIX]

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.dyes start')

	// [PORT-FIX/PORT-Ф5] Теги tfc:makes_*_dye наполняются растениями tfg:plant/* (Ф5 ещё не портирована) —
	// пустой тег валит create.milling на этапе конструирования Ingredient. Рецепт добавляется только при непустом теге.
	const addTfgDyeMilling = (dye) => {
		// [PORT-FIX] NeoForge подставляет minecraft:barrier для пустых тегов — фильтруем его
		const dyeTagItems = Ingredient.of(`#tfc:makes_${dye}_dye`).itemIds.toArray().filter(x => String(x) !== 'minecraft:barrier' && String(x) !== 'minecraft:air')
		if (dyeTagItems.length === 0) {
			console.warn(`[Gregnautics] [PORT-Ф5] тег tfc:makes_${dye}_dye пуст — milling-рецепт ${dye}_dye пропущен`)
			return
		}
		event.recipes.create.milling(`2x minecraft:${dye}_dye`, { tag: `tfc:makes_${dye}_dye` })
			.id(`tfg:milling/${dye}_dye`)
	}

	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		event.remove({ id: `minecraft:dye_${dye}_wool` })
		event.remove({ id: `minecraft:${dye}_candle` })
		event.remove({ id: `minecraft:dye_${dye}_carpet` })
		event.remove({ id: `minecraft:${dye}_bed` })
		event.remove({ id: `minecraft:dye_${dye}_bed` })
		event.remove({ id: `tfc:crafting/vanilla/color/${dye}_concrete_powder` })

		global.TFGDamageShapeless(event,`2x minecraft:${dye}_carpet`, [
			'#c:tools/saw', // [PORT] tfc:saws -> c:tools/saw
			`minecraft:${dye}_wool`
		]).id(`minecraft:${dye}_carpet`)

		if (dye !== 'white') {
			event.recipes.gtceu.chemical_bath(`tfg:${dye}_carpet`)
				.itemInputs(`minecraft:white_carpet`)
				.inputFluids(Fluid.of(`tfc:${dye}_dye`, 72))
				.itemOutputs(`minecraft:${dye}_carpet`)
				.duration(300)
				.EUt(4)
				.category(GTRecipeCategories.CHEM_DYES)
		}

		// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_instant(input_fluid); .inputs() нет
		event.recipes.tfc.barrel_instant(Fluid.of('minecraft:water', 100))
			.inputItem(`minecraft:${dye}_concrete_powder`)
			.outputItem(`minecraft:${dye}_concrete`)
			.id(`tfg:barrel/dye/${dye}_concrete`);
	})

	// White
	event.remove({ id: 'minecraft:white_dye_from_lily_of_the_valley' })
	event.remove({ id: 'gtceu:extractor/lily_of_the_valley_dye' })

	event.recipes.gtceu.extractor('white_dye')
		.itemInputs('1x #tfc:makes_white_dye')
		.itemOutputs('2x minecraft:white_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('white') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Red
	event.remove({ id: 'minecraft:red_dye_from_tulip' })
	event.remove({ id: 'minecraft:red_dye_from_rose_bush' })
	event.remove({ id: 'minecraft:red_dye_from_poppy' })
	event.remove({ id: 'minecraft:red_dye_from_beetroot' })
	event.remove({ id: 'gtceu:extractor/rose_bush_dye' })
	event.remove({ id: 'gtceu:extractor/red_tulip_dye' })
	event.remove({ id: 'gtceu:extractor/poppy_dye' })
	event.remove({ id: 'gtceu:extractor/beetroot_dye' })

	event.recipes.gtceu.extractor('red_dye')
		.itemInputs('1x #tfc:makes_red_dye')
		.itemOutputs('2x minecraft:red_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('red') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Lime
	event.remove({ id: 'minecraft:lime_dye_from_smelting' })

	event.recipes.gtceu.extractor('lime_dye')
		.itemInputs('1x tfc:plant/moss')
		.itemOutputs('2x minecraft:lime_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('lime') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Light Blue
	event.remove({ id: 'minecraft:light_blue_dye_from_blue_orchid' })
	event.remove({ id: 'gtceu:extractor/blue_orchid_dye' })

	event.recipes.gtceu.extractor('light_blue_dye')
		.itemInputs('1x #tfc:makes_light_blue_dye')
		.itemOutputs('2x minecraft:light_blue_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('light_blue') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Green
	event.remove({ id: 'minecraft:green_dye' })

	event.recipes.gtceu.extractor('green_dye')
		.itemInputs('1x #tfc:makes_green_dye')
		.itemOutputs('2x minecraft:green_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('green') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Magenta
	event.remove({ id: 'minecraft:magenta_dye_from_lilac' })
	event.remove({ id: 'minecraft:magenta_dye_from_allium' })
	event.remove({ id: 'gtceu:extractor/lilac_dye' })
	event.remove({ id: 'gtceu:extractor/allium_dye' })

	event.recipes.gtceu.extractor('magenta_dye')
		.itemInputs('1x #tfc:makes_magenta_dye')
		.itemOutputs('2x minecraft:magenta_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('magenta') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Orange
	event.remove({ id: 'minecraft:orange_dye_from_torchflower' })
	event.remove({ id: 'minecraft:orange_dye_from_orange_tulip' })
	event.remove({ id: 'gtceu:extractor/orange_tulip_dye' })

	event.recipes.gtceu.extractor('orange_dye')
		.itemInputs('1x #tfc:makes_orange_dye')
		.itemOutputs('2x minecraft:orange_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('orange') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Purple
	event.recipes.gtceu.extractor('purple_dye')
		.itemInputs('1x #tfc:makes_purple_dye')
		.itemOutputs('2x minecraft:purple_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('purple') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Brown
	event.remove({ id: 'minecraft:brown_dye' })

	event.recipes.gtceu.extractor('brown_dye')
		.itemInputs('1x #tfc:makes_brown_dye')
		.itemOutputs('2x minecraft:brown_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('brown') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Light Gray
	event.remove({ id: 'minecraft:light_gray_dye_from_white_tulip' })
	event.remove({ id: 'minecraft:light_gray_dye_from_azure_bluet' })
	event.remove({ id: 'minecraft:light_gray_dye_from_oxeye_daisy' })
	event.remove({ id: 'gtceu:extractor/white_tulip_dye' })
	event.remove({ id: 'gtceu:extractor/azure_bluet_dye' })
	event.remove({ id: 'gtceu:extractor/oxeye_daisy_dye' })

	event.recipes.gtceu.extractor('light_gray_dye')
		.itemInputs('1x tfc:plant/yucca')
		.itemOutputs('2x minecraft:light_gray_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('light_gray') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Yellow
	event.remove({ id: 'minecraft:yellow_dye_from_sunflower' })
	event.remove({ id: 'minecraft:yellow_dye_from_dandelion' })
	event.remove({ id: 'gtceu:extractor/sunflower_dye' })
	event.remove({ id: 'gtceu:extractor/dandelion_dye' })

	event.recipes.gtceu.extractor('yellow_dye')
		.itemInputs('1x #tfc:makes_yellow_dye')
		.itemOutputs('2x minecraft:yellow_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('yellow') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Blue
	event.remove({ id: 'minecraft:blue_dye_from_cornflower' })
	event.remove({ id: 'gtceu:extractor/cornflower_dye' })

	event.recipes.gtceu.extractor('blue_dye')
		.itemInputs('1x #tfc:makes_blue_dye')
		.itemOutputs('2x minecraft:blue_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('blue') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Pink
	event.remove({ id: 'minecraft:pink_dye_from_pink_petals' })
	event.remove({ id: 'minecraft:pink_dye_from_pink_tulip' })
	event.remove({ id: 'minecraft:pink_dye_from_peony' })
	event.remove({ id: 'gtceu:extractor/pink_tulip_dye' })
	event.remove({ id: 'gtceu:extractor/peony_dye' })

	event.recipes.gtceu.extractor('pink_dye')
		.itemInputs('1x #tfc:makes_pink_dye')
		.itemOutputs('2x minecraft:pink_dye')
		.duration(200)
		.EUt(2)

	addTfgDyeMilling('pink') // [PORT-FIX] create.milling валится на пустом теге — рецепт добавляется только при непустом

	// Cyan
	event.remove({ id: 'minecraft:cyan_dye_from_pitcher_plant' })

	// Black
	event.remove({ id: 'minecraft:black_dye_from_wither_rose' })
	event.remove({ id: 'gtceu:extractor/wither_rose_dye' })


	//#region Выход: Кровати

	event.recipes.gtceu.chemical_bath(`bed_decolor`)
		.itemInputs('#tfc:colored_bed')
		.inputFluids(Fluid.of(`gtceu:chlorine`, 72))
		.itemOutputs(`minecraft:white_bed`)
		.duration(300)
		.EUt(4)
		.category(GTRecipeCategories.CHEM_DYES)

	//#endregion
})
