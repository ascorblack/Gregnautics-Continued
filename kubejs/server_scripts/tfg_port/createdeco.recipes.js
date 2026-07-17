// priority: 0
"use strict";

// [PORT] исходник: createdeco/recipes.js (registerCreatedecoRecipes) — регистрируем напрямую через ServerEvents.recipes
// [PORT] createdeco 1.21 удалил: facades (все), iron_bars, iron_trapdoor, copper_trapdoor, iron_door, copper_door (заменены ванильными аналогами 1.21)
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port createdeco recipes start')

	//#region Item Replacements
	const replacements = {
		'create:zinc_ingot': '#c:ingots/zinc', // [PORT] forge -> c (везде ниже)
		'createdeco:zinc_sheet': '#c:plates/zinc',
		'create:zinc_nugget': '#c:nuggets/zinc',
		'create:brass_ingot': '#c:ingots/brass',
		'create:brass_sheet': '#c:plates/brass',
		'create:brass_nugget': '#c:nuggets/brass',
		'minecraft:iron_ingot': '#c:ingots/wrought_iron',
		'create:iron_sheet': '#c:plates/wrought_iron',
		'minecraft:iron_nugget': '#c:nuggets/wrought_iron',
		'createdeco:industrial_iron_ingot': '#c:ingots/steel',
		'createdeco:industrial_iron_sheet': '#c:plates/steel',
		'createdeco:industrial_iron_nugget': '#c:nuggets/steel',
		'minecraft:torch': 'minecraft:glowstone',
		'minecraft:vine': '#tfc:moss',
		'create:andesite_alloy': '#c:ingots/tin_alloy',
		'createdeco:andesite_sheet': '#c:plates/tin_alloy',
		'create:copper_nugget': '#c:nuggets/copper',
		'createdeco:netherite_nugget': '#c:nuggets/blue_steel',
		'minecraft:string': '#c:string' // [PORT] forge:string -> c:string (как в остальных портированных файлах)
	};

	// Iterate through the replacement list and update recipes
	Object.keys(replacements).forEach(missingItem => {
		const replacementItem = replacements[missingItem];

		event.replaceInput({ mod: "createdeco" }, missingItem, replacementItem);
	});
	//#endregion

	//#region Recipe Removal

	event.remove({ id: 'gtceu:assembler/bricks' })

	//#endregion

	//#region Lamp Recipes

	function lampRecipe(output, lampType, lampColor) {

		let replacementLampType = lampType;
		if (lampType === 'industrial_iron') {
			replacementLampType = 'steel';
		}
		if (lampType === 'andesite') {
			replacementLampType = 'wrought_iron';
		}

		// [PORT] ключи D/X со значением null убраны: KubeJS 7 не принимает null-ингредиенты; X был пустым слотом — заменён пробелом в шаблоне
		let ingredients = {
			T: `minecraft:glowstone`,
			N: `#c:bolts/${replacementLampType}`, // [PORT] forge -> c
			P: `#c:plates/${replacementLampType}`, // [PORT] forge -> c
			D: `gtceu:small_copper_dust`
		};

		// Adjust based on the color
		if (lampColor === 'green') {
			ingredients.D = 'gtceu:small_copper_dust';
		} else if (lampColor === 'blue') {
			ingredients.D = 'gtceu:small_sulfur_dust';
		} else if (lampColor === 'red') {
			ingredients.D = `gtceu:small_lithium_dust`;
		} else if (lampColor === 'yellow') {
			ingredients.D = `gtceu:small_salt_dust`;
		}

		if (lampType === 'iron') {
			ingredients.N = '#c:bolts/wrought_iron'; // [PORT] forge -> c
			ingredients.P = '#c:plates/wrought_iron'; // [PORT] forge -> c
		}
		if (lampType === 'andesite') {
			ingredients.N = '#c:bolts/tin_alloy'; // [PORT] forge -> c
			ingredients.P = '#c:plates/tin_alloy'; // [PORT] forge -> c
		}
		if (lampType === 'industrial_iron') {
			ingredients.N = '#c:bolts/steel'; // [PORT] forge -> c
			ingredients.P = '#c:plates/steel'; // [PORT] forge -> c
		}


		// Create the shaped recipe

		return event.shaped(output, [
			' N ', // [PORT] X (null/пустой слот) заменён пробелом
			'DT ',
			' P '
		], ingredients);
	}

	// Loop through each lamp type and color to create the recipes
	const lampColors = ['blue', 'green', 'red', 'yellow'];
	const lampTypes = ['zinc', 'brass', 'iron', 'industrial_iron', 'copper', 'andesite'];
	lampTypes.forEach(lampType => {
		lampColors.forEach(lampColor => {
			let output = `2x createdeco:${lampColor}_${lampType}_lamp`; // Define the output item ID
			lampRecipe(output, lampType, lampColor) // Call the lampRecipe function for each combination
				.id(`tfg:shaped/cdeco_${lampColor}_${lampType}_lamp`)
		});
	});
	//#endregion

	//#region Brick Recipes
	const dyeTypes = ['black', 'red', 'gray', 'green', 'blue', 'white', 'brown']

	global.CREATE_DECO_BRICK_TYPES.forEach((type, index) => {
		if (type !== "red") {
			const dye = `#c:dyes/${dyeTypes[index]}`; // [PORT] forge -> c
			event.shaped(`4x createdeco:${type}_bricks`, [
				'BDB',
				'MBM',
				'BMB'
			], {
				B: `minecraft:brick`,
				D: dye,
				M: `tfc:mortar`
			}).id(`tfg:shaped/cdeco_${type}_bricks`);

			event.recipes.gtceu.assembler(`createdeco:${type}_bricks`)
				.itemInputs('5x minecraft:brick', dye)
				.inputFluids(Fluid.of('gtceu:concrete', 144))
				.itemOutputs(`4x createdeco:${type}_bricks`)
				.circuit(3)
				.duration(50)
				.EUt(7)
		}
	});
	//#endregion

	//#region Dyes
	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.remove({ output: `createdeco:${color}_shipping_container`, input: 'minecraft:barrel' });

		event.replaceInput({ mod: "createdeco" }, `minecraft:${color}_dye`, `#c:dyes/${color}`); // [PORT] forge -> c
	});
	//#endregion

	event.stonecutting('4x createdeco:andesite_mesh_fence', '#c:ingots/tin_alloy') // [PORT] forge -> c (везде ниже)
	event.stonecutting('4x createdeco:andesite_catwalk', '#c:ingots/tin_alloy')
	event.stonecutting('2x createdeco:andesite_catwalk_stairs', '#c:ingots/tin_alloy')
	event.stonecutting('8x createdeco:andesite_catwalk_railing', '#c:ingots/tin_alloy')
	// [PORT] createdeco:andesite_facade удалён в createdeco 1.21 (facades больше не существуют)
	// event.stonecutting('4x createdeco:andesite_facade', '#c:ingots/tin_alloy')
	event.stonecutting('3x createdeco:andesite_support_wedge', '#c:ingots/tin_alloy')
	event.stonecutting('4x createdeco:iron_mesh_fence', '#c:ingots/wrought_iron')
	event.stonecutting('4x createdeco:iron_catwalk', '#c:ingots/wrought_iron')
	event.stonecutting('2x createdeco:iron_catwalk_stairs', '#c:ingots/wrought_iron')
	event.stonecutting('8x createdeco:iron_catwalk_railing', '#c:ingots/wrought_iron')
	// [PORT] createdeco:iron_facade удалён в createdeco 1.21 (facades больше не существуют)
	// event.stonecutting('4x createdeco:iron_facade', '#c:ingots/wrought_iron')
	event.stonecutting('3x createdeco:iron_support_wedge', '#c:ingots/wrought_iron')

	event.shaped('8x createdeco:iron_catwalk_railing', [
		'AAA',
		'B B',
		'B B'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge -> c
		B: 'tfc:metal/bars/wrought_iron'
	}).id('createdeco:iron_catwalk_railing')

	event.shaped('4x createdeco:iron_catwalk', [
		' A ',
		'ABA',
		' A '
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge -> c
		B: 'tfc:metal/bars/wrought_iron'
	}).id('createdeco:iron_catwalk')

	event.shaped('2x createdeco:iron_catwalk_stairs', [
		' A',
		'AB'
	], {
		A: 'createdeco:iron_catwalk',
		B: 'tfc:metal/bars/wrought_iron'
	}).id('createdeco:iron_catwalk_stairs')


	// #region Bars + Doors

	const metalThings = [
		{ metal: 'andesite', material: 'tin_alloy', tier: 3 },
		{ metal: 'brass', material: 'brass', tier: 2 },
		{ metal: 'iron', material: 'wrought_iron', tier: 3 },
		{ metal: 'copper', material: 'copper', tier: 1 },
		{ metal: 'industrial_iron', material: 'steel', tier: 4 },
		{ metal: 'zinc', material: 'zinc', tier: 1 }
	];

	metalThings.forEach(bar => {
		event.remove({ id: `createdeco:${bar.metal}_trapdoor` })
		event.remove({ id: `createdeco:${bar.metal}_door` })


		if (bar.metal !== 'iron') {
			// Bars
			event.remove({ type: 'minecraft:stonecutting', output: `createdeco:${bar.metal}_bars` })

			event.recipes.tfc.anvil(`4x createdeco:${bar.metal}_bars`, `#c:ingots/${bar.material}`, ['upset_last', 'punch_second_last', 'punch_third_last']) // [PORT] forge -> c
				.tier(bar.tier).id(`tfg:anvil/createdeco_${bar.metal}_bars`)

			event.stonecutting(`4x createdeco:${bar.metal}_bars`, `#c:ingots/${bar.material}`) // [PORT] forge -> c

			// [PORT-Ф4] TFGHelpers.registerMaterialInfo(`createdeco:${bar.metal}_bars`, [GTMaterials.get(bar.material), 0.25]) — хелпер мода TFG отсутствует

			// [PORT-FIX] тег c:double_ingots/tin_alloy пуст в 1.21 (TFC/GTCEu не генерируют double ingot для tin_alloy) — пропускаем
			if (bar.material !== 'tin_alloy') { // [PORT-CHECK] вернуть, когда TFG добавит double ingot для tin_alloy
				event.recipes.tfc.anvil(`8x createdeco:${bar.metal}_bars`, `#c:double_ingots/${bar.material}`, ['upset_last', 'punch_second_last', 'punch_third_last']) // [PORT] forge -> c
					.tier(bar.tier).id(`tfg:anvil/createdeco_${bar.metal}_bars_double`)
			}

			// Door
			if (bar.metal !== 'copper') { // [PORT] createdeco:copper_door удалён в createdeco 1.21 (ванильный minecraft:copper_door)
				event.recipes.tfc.anvil(`createdeco:${bar.metal}_door`, `#c:double_plates/${bar.material}`, ['draw_last', 'draw_second_last', 'punch_third_last']) // [PORT] forge -> c
					.tier(bar.tier).id(`tfg:anvil/createdeco_${bar.metal}_door`)

				event.recipes.gtceu.cutter(`tfg:${bar.material}_create_deco_door`)
					.itemInputs(`#c:double_plates/${bar.material}`) // [PORT] forge -> c
					.itemOutputs(`createdeco:${bar.metal}_door`)
					.duration(100)
					.EUt(GTValues.VA[GTValues.LV])

				// [PORT-Ф4] TFGHelpers.registerMaterialInfo(`createdeco:${bar.metal}_door`, [GTMaterials.get(bar.material), 2]) — хелпер мода TFG отсутствует
			}
		}

		// Overlay bars
		event.remove({ type: 'minecraft:stonecutting', output: `createdeco:${bar.metal}_bars_overlay` })

		event.recipes.tfc.anvil(`4x createdeco:${bar.metal}_bars_overlay`, `#c:ingots/${bar.material}`, ['upset_last', 'punch_second_last', 'punch_third_last']) // [PORT] forge -> c
			.tier(bar.tier).id(`tfg:anvil/createdeco_${bar.metal}_bars_overlay`)

		event.stonecutting(`4x createdeco:${bar.metal}_bars_overlay`, `#c:ingots/${bar.material}`) // [PORT] forge -> c

		// [PORT-FIX] тег c:double_ingots/tin_alloy пуст в 1.21 — пропускаем tin_alloy
		if (bar.material !== 'tin_alloy') { // [PORT-CHECK] вернуть, когда TFG добавит double ingot для tin_alloy
			event.recipes.tfc.anvil(`8x createdeco:${bar.metal}_bars_overlay`, `#c:double_ingots/${bar.material}`, ['upset_last', 'punch_second_last', 'punch_third_last']) // [PORT] forge -> c
				.tier(bar.tier).id(`tfg:anvil/createdeco_${bar.metal}_bars_overlay_double`)
		}

		// [PORT-Ф4] TFGHelpers.registerMaterialInfo(`createdeco:${bar.metal}_bars_overlay`, [GTMaterials.get(bar.material), 0.25]) — хелпер мода TFG отсутствует

		// Facade
		// [PORT] facades удалены в createdeco 1.21 — рецепт убран
		// event.shaped(`4x createdeco:${bar.metal}_facade`, [
		// 	' A ',
		// 	'ABA',
		// 	' A '
		// ], {
		// 	A: `#c:rods/${bar.material}`,
		// 	B: `createdeco:${bar.metal}_mesh_fence`
		// }).id(`tfg:shaped/createdeco_${bar.metal}_facade`)
	})

	// #endregion

	// #region Trapdoors

	// [PORT] createdeco:copper_trapdoor удалён в createdeco 1.21 — конвертация перенесена на ванильный minecraft:copper_trapdoor
	event.shapeless(`minecraft:copper_trapdoor`, `tfc:metal/trapdoor/copper`)
	event.shapeless(`tfc:metal/trapdoor/copper`, `minecraft:copper_trapdoor`)
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:copper_trapdoor', [GTMaterials.Copper, 1]) — хелпер мода TFG отсутствует

	event.shapeless(`createdeco:industrial_iron_trapdoor`, `tfc:metal/trapdoor/steel`)
	event.shapeless(`tfc:metal/trapdoor/steel`, `createdeco:industrial_iron_trapdoor`)
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:industrial_iron_trapdoor', [GTMaterials.Steel, 1]) — хелпер мода TFG отсутствует

	// TODO: move these two into the tag prefixes in tfg-core, then remove these recipes

	event.recipes.tfc.anvil(`createdeco:brass_trapdoor`, `#c:ingots/brass`, ['shrink_last', 'draw_second_last', 'draw_third_last']) // [PORT] forge -> c
		.tier(2).id(`createdeco:anvil/brass_trapdoor`)

	// [PORT-Ф4] рецепты alloy_smelter/fluid_solidifier используют tfg:trapdoor_casting_mold — предмет tfg: ещё не существует (фаза 4)
	// event.recipes.gtceu.alloy_smelter(`tfg:cast_brass_trapdoor`)
	// 	.itemInputs('#c:ingots/brass')
	// 	.notConsumableItem('tfg:trapdoor_casting_mold') // [PORT-FIX] notConsumableItem
	// 	.itemOutputs('createdeco:brass_trapdoor')
	// 	.duration(GTMaterials.Brass.getMass())
	// 	.category(GTRecipeCategories.INGOT_MOLDING)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] tfg:trapdoor_casting_mold ещё не существует (фаза 4)
	// event.recipes.gtceu.fluid_solidifier(`tfg:solidify_brass_trapdoor`)
	// 	.inputFluids(Fluid.of(GTMaterials.Brass.getFluid(), 144))
	// 	.notConsumableItem('tfg:trapdoor_casting_mold') // [PORT-FIX] notConsumableItem
	// 	.itemOutputs('createdeco:brass_trapdoor')
	// 	.duration(GTMaterials.Brass.getMass())
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:brass_trapdoor', [GTMaterials.Brass, 1]) — хелпер мода TFG отсутствует

	event.recipes.tfc.anvil(`createdeco:zinc_trapdoor`, `#c:ingots/zinc`, ['shrink_last', 'draw_second_last', 'draw_third_last']) // [PORT] forge -> c
		.tier(1).id(`createdeco:anvil/zinc_trapdoor`)

	// [PORT-Ф4] tfg:trapdoor_casting_mold ещё не существует (фаза 4)
	// event.recipes.gtceu.alloy_smelter(`tfg:cast_zinc_trapdoor`)
	// 	.itemInputs('#c:ingots/zinc')
	// 	.notConsumableItem('tfg:trapdoor_casting_mold') // [PORT-FIX] notConsumableItem
	// 	.itemOutputs('createdeco:zinc_trapdoor')
	// 	.duration(GTMaterials.Zinc.getMass())
	// 	.category(GTRecipeCategories.INGOT_MOLDING)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] tfg:trapdoor_casting_mold ещё не существует (фаза 4)
	// event.recipes.gtceu.fluid_solidifier(`tfg:solidify_zinc_trapdoor`)
	// 	.inputFluids(Fluid.of(GTMaterials.Zinc.getFluid(), 144))
	// 	.notConsumableItem('tfg:trapdoor_casting_mold') // [PORT-FIX] notConsumableItem
	// 	.itemOutputs('createdeco:zinc_trapdoor')
	// 	.duration(GTMaterials.Zinc.getMass())
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:zinc_trapdoor', [GTMaterials.Zinc, 1]) — хелпер мода TFG отсутствует

	event.recipes.tfc.anvil(`createdeco:andesite_trapdoor`, `#c:ingots/tin_alloy`, ['shrink_last', 'draw_second_last', 'draw_third_last']) // [PORT] forge -> c
		.tier(3).id(`createdeco:anvil/andesite_trapdoor`)

	// [PORT-Ф4] tfg:trapdoor_casting_mold ещё не существует (фаза 4)
	// event.recipes.gtceu.alloy_smelter(`tfg:cast_tin_alloy_trapdoor`)
	// 	.itemInputs('#c:ingots/tin_alloy')
	// 	.notConsumableItem('tfg:trapdoor_casting_mold') // [PORT-FIX] notConsumableItem
	// 	.itemOutputs('createdeco:andesite_trapdoor')
	// 	.duration(GTMaterials.TinAlloy.getMass())
	// 	.category(GTRecipeCategories.INGOT_MOLDING)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] tfg:trapdoor_casting_mold ещё не существует (фаза 4)
	// event.recipes.gtceu.fluid_solidifier(`tfg:solidify_tin_alloy_trapdoor`)
	// 	.inputFluids(Fluid.of(GTMaterials.TinAlloy.getFluid(), 144))
	// 	.notConsumableItem('tfg:trapdoor_casting_mold') // [PORT-FIX] notConsumableItem
	// 	.itemOutputs('createdeco:andesite_trapdoor')
	// 	.duration(GTMaterials.TinAlloy.getMass())
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:andesite_trapdoor', [GTMaterials.TinAlloy, 1]) — хелпер мода TFG отсутствует

	// #endregion

	//#region Coins

	event.recipes.gtceu.forming_press('createdeco:gold_coin')
		.itemInputs('#c:nuggets/gold') // [PORT] forge -> c
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 — notConsumableItem
		.itemOutputs('createdeco:gold_coin')
		.duration(50)
		.EUt(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:gold_coin', [GTMaterials.Gold, 1/9]) — хелпер мода TFG отсутствует

	event.recipes.gtceu.forming_press('createdeco:netherite_coin')
		.itemInputs('#c:nuggets/blue_steel') // [PORT] forge -> c
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 — notConsumableItem
		.itemOutputs('createdeco:netherite_coin')
		.duration(50)
		.EUt(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:netherite_coin', [GTMaterials.BlueSteel, 1/9]) — хелпер мода TFG отсутствует

	event.recipes.gtceu.forming_press('createdeco:brass_coin')
		.itemInputs('#c:nuggets/brass') // [PORT] forge -> c
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 — notConsumableItem
		.itemOutputs('createdeco:brass_coin')
		.duration(50)
		.EUt(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:brass_coin', [GTMaterials.Brass, 1/9]) — хелпер мода TFG отсутствует

	event.recipes.gtceu.forming_press('createdeco:iron_coin')
		.itemInputs('#c:nuggets/wrought_iron') // [PORT] forge -> c
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 — notConsumableItem
		.itemOutputs('createdeco:iron_coin')
		.duration(50)
		.EUt(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:iron_coin', [GTMaterials.WroughtIron, 1/9]) — хелпер мода TFG отсутствует

	event.recipes.gtceu.forming_press('createdeco:copper_coin')
		.itemInputs('#c:nuggets/copper') // [PORT] forge -> c
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 — notConsumableItem
		.itemOutputs('createdeco:copper_coin')
		.duration(50)
		.EUt(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:copper_coin', [GTMaterials.Copper, 1/9]) — хелпер мода TFG отсутствует

	event.recipes.gtceu.forming_press('createdeco:industrial_iron_coin')
		.itemInputs('#c:nuggets/steel') // [PORT] forge -> c
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 — notConsumableItem
		.itemOutputs('createdeco:industrial_iron_coin')
		.duration(50)
		.EUt(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:industrial_iron_coin', [GTMaterials.Steel, 1/9]) — хелпер мода TFG отсутствует

	event.recipes.gtceu.forming_press('createdeco:zinc_coin')
		.itemInputs('#c:nuggets/zinc') // [PORT] forge -> c
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 — notConsumableItem
		.itemOutputs('createdeco:zinc_coin')
		.duration(50)
		.EUt(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:zinc_coin', [GTMaterials.Zinc, 1/9]) — хелпер мода TFG отсутствует

	// #region

	// #region Window panes

	const CREATE_DECO_GLASS_WINDOWS =
	[
		['andesite', '#c:rods/tin_alloy'], // [PORT] forge -> c (весь список)
		['copper', '#c:rods/copper'],
		['iron', '#c:rods/wrought_iron'],
		['industrial_iron', '#c:rods/steel'],
		['brass', '#c:rods/brass'],
		['zinc', '#c:rods/zinc']
	]

	CREATE_DECO_GLASS_WINDOWS.forEach(x => {
		event.shaped(`2x createdeco:${x[0]}_window`,
			[
				' B ',
				'BAB'
			], {
			A: '#c:glass', // [PORT] forge -> c
			B: x[1]
		}).id(`createdeco:${x[0]}_window`)

		global.TFGDamageShapeless(event,`2x createdeco:${x[0]}_window_pane`,
			[
				`createdeco:${x[0]}_window`,
				'#c:tools/saw' // [PORT] forge:tools/saws -> c:tools/saw
			])
			.id(`createdeco:${x[0]}_window_pane`)

		event.recipes.gtceu.cutter(`tfg:createdeco/${x[0]}_window_pane`)
			.itemInputs(`3x createdeco:${x[0]}_window`)
			.itemOutputs(`8x createdeco:${x[0]}_window_pane`)
			.duration(40)
			.EUt(7)
	})

	// #endregion

	// #region Ladders

	event.shaped('7x createdeco:iron_ladder', [
		'A A',
		'AAA',
		'A A'
	], {
		A: '#c:rods/wrought_iron' // [PORT] forge -> c
	}).id('tfg:createdeco/shaped/iron_ladder')

	event.stonecutting('2x createdeco:iron_ladder', '#c:ingots/wrought_iron') // [PORT] forge -> c

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:iron_ladder', [GTMaterials.WroughtIron, 0.5]) — хелпер мода TFG отсутствует

	event.shaped('7x createdeco:zinc_ladder', [
		'A A',
		'AAA',
		'A A'
	], {
		A: '#c:rods/zinc' // [PORT] forge -> c
	}).id('tfg:createdeco/shaped/zinc_ladder')

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:zinc_ladder', [GTMaterials.Zinc, 0.5]) — хелпер мода TFG отсутствует

	event.shaped('7x createdeco:industrial_iron_ladder', [
		'A A',
		'AAA',
		'A A'
	], {
		A: '#c:rods/steel' // [PORT] forge -> c
	}).id('tfg:createdeco/shaped/industrial_iron_ladder')

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:industrial_iron_ladder', [GTMaterials.Steel, 0.5]) — хелпер мода TFG отсутствует

	// #endregion

	// #region Shipping Containers

	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.remove({ id: `createdeco:${color}_shipping_container_from_dyeing_vaults` })

		event.recipes.gtceu.chemical_bath(`createdeco:${color}_shipping_container`)
			.itemInputs('create:item_vault')
			.inputFluids(Fluid.of(`tfc:${color}_dye`, 144))
			.itemOutputs(`createdeco:${color}_shipping_container`)
			.duration(100)
			.EUt(16)
			.category(GTRecipeCategories.CHEM_DYES);

		event.recipes.gtceu.chemical_bath(`createdeco:${color}_shipping_container_recolor`)
			.itemInputs('#createdeco:shipping_containers')
			.inputFluids(Fluid.of(`tfc:${color}_dye`, 144))
			.itemOutputs(`createdeco:${color}_shipping_container`)
			.duration(100)
			.EUt(16)
			.category(GTRecipeCategories.CHEM_DYES);
	})

	event.recipes.gtceu.chemical_bath(`createdeco:bleach_shipping_container`)
		.itemInputs('#createdeco:shipping_containers')
		.inputFluids(Fluid.of('gtceu:chlorine', 144))
		.itemOutputs('create:item_vault')
		.duration(100)
		.EUt(16)
		.category(GTRecipeCategories.CHEM_DYES);

	// #endregion

	// #region Sheet Metal

	event.stonecutting('4x createdeco:andesite_sheet_metal', '#c:plates/tin_alloy') // [PORT] forge -> c (весь блок)
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:andesite_sheet_metal', [GTMaterials.TinAlloy, 0.25]) — хелпер мода TFG отсутствует
	event.stonecutting('4x createdeco:brass_sheet_metal', '#c:plates/brass')
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:brass_sheet_metal', [GTMaterials.Brass, 0.25]) — хелпер мода TFG отсутствует
	event.stonecutting('4x createdeco:iron_sheet_metal', '#c:plates/wrought_iron')
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:iron_sheet_metal', [GTMaterials.WroughtIron, 0.25]) — хелпер мода TFG отсутствует
	event.stonecutting('4x createdeco:copper_sheet_metal', '#c:plates/copper')
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:copper_sheet_metal', [GTMaterials.Copper, 0.25]) — хелпер мода TFG отсутствует
	event.stonecutting('4x createdeco:industrial_iron_sheet_metal', '#c:plates/steel')
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:industrial_iron_sheet_metal', [GTMaterials.Steel, 0.25]) — хелпер мода TFG отсутствует
	event.stonecutting('4x createdeco:zinc_sheet_metal', '#c:plates/zinc')
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('createdeco:zinc_sheet_metal', [GTMaterials.Zinc, 0.25]) — хелпер мода TFG отсутствует

	// #endregion
})
