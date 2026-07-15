// priority: 0
"use strict";

// [PORT] Порт vintage_improvements/recipes.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] modid: vintageimprovements -> createvintageneoforged (Create Vintage Improvements Neoforged).
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT] global.VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER определялся в startup constants.js оригинала;
// [PORT] в KubeJS 7 server-скрипты не могут писать в global — константа инлайнена локально.
const VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER = 4;

ServerEvents.recipes(event => {
	// [PORT-FIX] CVI-схемы (vibrating и др.) не принимают ProcessingOutput из CreateItem.of —
	// шансовый выход передаём plain-объектом create:processing_output ({id, count, chance}).
	const viChanced = (stack, chance) => {
		if (typeof stack === 'string') return { id: stack, chance: chance };
		if (!stack || stack.isEmpty()) return null;
		return { id: stack.getId(), count: stack.getCount(), chance: chance };
	};

	console.info('[Gregnautics] progress: tfg_port createvintageneoforged recipes start')

	event.remove({ mod: 'createvintageneoforged' }) // [PORT] vintageimprovements -> createvintageneoforged

	// #region Machines

	event.recipes.gtceu.shaped('createvintageneoforged:spring_coiling_machine', [
		'CDF',
		'CAF',
		'EBE'
	], {
		A: 'gtceu:ulv_machine_hull',
		B: 'tfmg:steel_cogwheel', // [PORT] greate отсутствует в сборке 1.21.1: greate:steel_cogwheel -> tfmg:steel_cogwheel
		C: '#c:rods/steel', // [PORT] forge: -> c:
		D: '#c:double_ingots/black_steel', // [PORT] forge: -> c:
		E: '#c:gears/blue_steel', // [PORT-FIX] c:small_gears/blue_steel пуст (gtceu:small_blue_steel_gear не генерируется в текущей сборке) — заменено на c:gears/blue_steel (наполняется tfc_items/gtceu)
		F: '#gtceu:circuits/ulv'
	}).addMaterialInfo().id('tfg:vi/shaped/spring_coiling_machine')

	event.recipes.gtceu.shaped('createvintageneoforged:vacuum_chamber', [
		'EBE',
		'DAG',
		'FCF'
	], {
		A: 'gtceu:ulv_machine_casing',
		B: 'tfmg:steel_mechanical_pump', // [PORT] greate отсутствует в сборке 1.21.1: greate:steel_mechanical_pump -> tfmg:steel_mechanical_pump
		C: 'minecraft:piston',
		D: '#c:springs/steel', // [PORT-FIX] c:springs/blue_steel пуст (gtceu:blue_steel_spring не генерируется в текущей сборке) — заменено на c:springs/steel (gtceu:steel_spring существует)
		E: 'create:electron_tube',
		F: '#c:plates/black_steel', // [PORT] forge: -> c:
		G: 'create:precision_mechanism'
	}).addMaterialInfo().id('tfg:vi/shaped/vacuum_chamber')

	event.recipes.gtceu.shaped('createvintageneoforged:vibrating_table', [
		'BCB',
		'DAD',
		'BEB'
	], {
		A: 'gtceu:ulv_machine_hull',
		B: '#c:springs/wrought_iron', // [PORT] forge: -> c:
		C: '#c:plates/black_steel', // [PORT] forge: -> c:
		D: '#gtceu:circuits/ulv',
		E: 'tfmg:steel_cogwheel' // [PORT] greate отсутствует в сборке 1.21.1: greate:steel_cogwheel -> tfmg:steel_cogwheel
	}).addMaterialInfo().id('tfg:vi/shaped/vibrating_table')

	event.recipes.create.mechanical_crafting('createvintageneoforged:centrifuge', [
		'   A   ',
		'   B   ',
		'  DAD  ',
		'ABACABA',
		'  EAE  ',
		'   B   ',
		'   A   '
	], {
		A: '#c:plates/treated_wood', // [PORT] forge: -> c:
		B: '#c:rods/black_steel', // [PORT] forge: -> c:
		C: 'create:andesite_casing',
		D: '#c:frames/treated_wood', // [PORT] forge: -> c:
		E: 'tfmg:steel_cogwheel' // [PORT] greate отсутствует в сборке 1.21.1: greate:steel_cogwheel -> tfmg:steel_cogwheel
	}).id('tfg:vi/mechanical_crafting/centrifuge')

	// [PORT] TFGHelpers — Java-хелпер мода TFG-Core, отсутствует в 1.21.1:
	// [PORT] TFGHelpers.registerMaterialInfo('vintageimprovements:centrifuge', [GTMaterials.WroughtIron, 3, GTMaterials.BlackSteel, 2]);

	event.recipes.gtceu.shaped('createvintageneoforged:curving_press', [
		'DBD',
		'FAF',
		'CEC'
	], {
		A: 'gtceu:ulv_machine_hull',
		B: 'create:shaft', // [PORT] greate отсутствует в сборке 1.21.1: greate:steel_shaft -> create:shaft (стального вала в 1.21.1 нет)
		C: '#c:rods/steel', // [PORT] forge: -> c:
		D: '#gtceu:circuits/ulv',
		E: '#c:plates/black_steel', // [PORT] forge: -> c:
		F: '#c:springs/wrought_iron' // [PORT] forge: -> c:
	}).addMaterialInfo().id('tfg:vi/shaped/curving_press')

	event.shaped('createvintageneoforged:helve_hammer', [
		'F A',
		'BBE',
		'C D'
	], {
		A: '#tfg:any_bronze_frame', // [PORT-CHECK] тег наполняется в tfg/tags.js (ещё не портирован) — до его порта рецепт нескрафтываем
		B: '#tfg:hardwood',
		C: '#tfg:any_iron_double_ingot', // [PORT-CHECK] тег наполняется в tfg/tags.js (ещё не портирован)
		D: 'create:cogwheel', // [PORT] greate отсутствует в сборке 1.21.1: greate:andesite_alloy_cogwheel -> create:cogwheel
		E: '#minecraft:planks',
		F: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('tfg:vi/shaped/helve_hammer')

	// [PORT] TFGHelpers — Java-хелпер мода TFG-Core, отсутствует в 1.21.1:
	// [PORT] TFGHelpers.registerMaterialInfo('vintageimprovements:helve_hammer', [GTMaterials.Iron, 2]);

	event.shaped('createvintageneoforged:grinder_belt', [
		'AAA',
		'CBC'
	], {
		A: 'createaddition:diamond_grit_sandpaper',
		B: 'create:belt_connector', // [PORT] greate отсутствует в сборке 1.21.1: greate:rubber_belt_connector -> create:belt_connector
		C: 'tfc:glue'
	}).id('tfg:vi/shaped/grinder_belt')

	event.recipes.gtceu.shaped('createvintageneoforged:belt_grinder', [
		'GBG',
		'EAF',
		'DCD'
	], {
		A: 'gtceu:ulv_machine_hull',
		B: 'createvintageneoforged:grinder_belt', // [PORT] vintageimprovements -> createvintageneoforged
		C: 'tfmg:steel_cogwheel', // [PORT] greate отсутствует в сборке 1.21.1: greate:steel_cogwheel -> tfmg:steel_cogwheel
		D: '#gtceu:circuits/ulv',
		E: 'create:precision_mechanism',
		F: 'minecraft:diamond',
		G: '#c:rods/black_steel' // [PORT] forge: -> c:
	}).addMaterialInfo().id('tfg:vi/shaped/belt_grinder')

	// #endregion

	// #region Components

	// [PORT] Предметы redstone_module / incomplete_redstone_module удалены в 1.21.1-версии мода
	// [PORT] (проверено по exported/registries/items.json) — рецепты sequenced_assembly и assembler не портируются:
	// [PORT] event.recipes.createSequencedAssembly(['vintageimprovements:redstone_module'], '#forge:plates/red_alloy', [...])
	// [PORT] event.recipes.gtceu.assembler('tfg:vi/redstone_module') ... .itemOutputs('vintageimprovements:redstone_module')

	event.shaped('createvintageneoforged:helve_hammer_slot_cover', [
		'B B',
		'CA ',
		'B B'
	], {
		A: '#c:plates/brass', // [PORT] forge: -> c:
		B: '#c:screws/wrought_iron', // [PORT] forge: -> c:
		C: '#c:tools/screwdriver' // [PORT] forge: -> c:
	})

	// #endregion

	//#region Hammer

	const STARTING_BLOWS = 6;

	// Tier 1
	let HAMMERING_MATERIALS = [
		{ material: GTMaterials.Copper, blows: STARTING_BLOWS },
		{ material: GTMaterials.Zinc, blows: STARTING_BLOWS },
		{ material: GTMaterials.Nickel, blows: STARTING_BLOWS },
		{ material: GTMaterials.Gold, blows: STARTING_BLOWS },
		{ material: GTMaterials.Bismuth, blows: STARTING_BLOWS },
		{ material: GTMaterials.RoseGold, blows: STARTING_BLOWS },
		{ material: GTMaterials.Silver, blows: STARTING_BLOWS },
		{ material: GTMaterials.SterlingSilver, blows: STARTING_BLOWS },
		{ material: GTMaterials.Tin, blows: STARTING_BLOWS },
		{ material: GTMaterials.Lead, blows: STARTING_BLOWS }
	]

	let HAMMERING_ITEMS = [
		// [PORT-Ф2] gtceu:thermochemically_treated_hardwood_dust (кастомный материал TFG) и tfg:soaked_unrefined_paper (предмет Ф4):
		// { input: 'gtceu:thermochemically_treated_hardwood_dust', output: 'tfg:soaked_unrefined_paper', blows: 3 }
	]

	HAMMERING_MATERIALS.forEach(x => {
		generateHammeringRecipe(event, x.material, x.blows, 'copper');
		x.blows--;
	})

	HAMMERING_ITEMS.forEach(x => {
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'copper');
		x.blows--;
	})

	// Tier 2
	HAMMERING_MATERIALS.push({ material: GTMaterials.Bronze, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.BlackBronze, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.BismuthBronze, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.Brass, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.RedAlloy, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.Potin, blows: STARTING_BLOWS })

	HAMMERING_ITEMS.push({ input: 'tfc:raw_iron_bloom', output: 'tfc:refined_iron_bloom', blows: STARTING_BLOWS })
	HAMMERING_ITEMS.push({ input: 'tfc:refined_iron_bloom', output: 'gtceu:wrought_iron_ingot', blows: STARTING_BLOWS })

	HAMMERING_MATERIALS.forEach(x => {
		generateHammeringRecipe(event, x.material, x.blows, 'bronze');
		generateHammeringRecipe(event, x.material, x.blows, 'black_bronze');
		generateHammeringRecipe(event, x.material, x.blows, 'bismuth_bronze');
		x.blows--;
	})
	HAMMERING_ITEMS.forEach(x => {
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'bronze');
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'black_bronze');
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'bismuth_bronze');
		x.blows--;
	})

	// Tier 3
	HAMMERING_MATERIALS.push({ material: GTMaterials.TinAlloy, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.Iron, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.WroughtIron, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.Invar, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.Cobalt, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.CobaltBrass, blows: STARTING_BLOWS })
	HAMMERING_ITEMS.push({ input: 'tfc:metal/ingot/pig_iron', output: 'tfc:metal/ingot/high_carbon_steel', blows: STARTING_BLOWS })
	HAMMERING_ITEMS.push({ input: 'tfc:metal/ingot/high_carbon_steel', output: 'gtceu:steel_ingot', blows: STARTING_BLOWS })

	HAMMERING_MATERIALS.forEach(x => {
		generateHammeringRecipe(event, x.material, x.blows, 'wrought_iron');
		x.blows--;
	})
	HAMMERING_ITEMS.forEach(x => {
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'wrought_iron');
		x.blows--;
	})

	// Tier 4
	HAMMERING_MATERIALS.push({ material: GTMaterials.Steel, blows: STARTING_BLOWS })
	HAMMERING_ITEMS.push({ input: 'tfc:metal/ingot/high_carbon_black_steel', output: 'tfc:metal/ingot/black_steel', blows: STARTING_BLOWS })

	HAMMERING_MATERIALS.forEach(x => {
		generateHammeringRecipe(event, x.material, x.blows, 'steel');
		x.blows--;
	})
	HAMMERING_ITEMS.forEach(x => {
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'steel');
		x.blows--;
	})

	// Tier 5
	HAMMERING_MATERIALS.push({ material: GTMaterials.BlackSteel, blows: STARTING_BLOWS })
	HAMMERING_ITEMS.push({ input: 'tfc:metal/ingot/high_carbon_red_steel', output: 'tfc:metal/ingot/red_steel', blows: STARTING_BLOWS })
	HAMMERING_ITEMS.push({ input: 'tfc:metal/ingot/high_carbon_blue_steel', output: 'tfc:metal/ingot/blue_steel', blows: STARTING_BLOWS })

	HAMMERING_MATERIALS.forEach(x => {
		generateHammeringRecipe(event, x.material, x.blows, 'black_steel');
		x.blows--;
	})
	HAMMERING_ITEMS.forEach(x => {
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'black_steel');
		x.blows--;
	})

	// Tier 6
	HAMMERING_MATERIALS.push({ material: GTMaterials.RedSteel, blows: STARTING_BLOWS })
	HAMMERING_MATERIALS.push({ material: GTMaterials.BlueSteel, blows: STARTING_BLOWS })

	HAMMERING_MATERIALS.forEach(x => {
		generateHammeringRecipe(event, x.material, x.blows, 'red_steel');
		generateHammeringRecipe(event, x.material, x.blows, 'blue_steel');
		x.blows--;
	})
	HAMMERING_ITEMS.forEach(x => {
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'red_steel');
		generateHammeringRecipeFromItem(event, x.input, x.output, x.blows, 'blue_steel');
		x.blows--;
	})
	// #endregion

	// [PORT] greate отсутствует в сборке 1.21.1 — Java.loadClass("electrolyte.greate.registry.GreateMaterials") убран;
	// [PORT] материал andesite_alloy (регистрировался greate) ищем через GTMaterials.get с защитой от null.
	// [PORT-FIX] MaterialFlags -> GTMaterialFlags (имя биндинга GTCEu 8.0 KubeJS-плагина).
	// [PORT-FIX] .springColor() удалён: схемы coiling в CVI 1.21.1 (create:base/processing_unwrapped) не имеют такого поля/функции.
	const andesiteAlloyMaterial = GTMaterials.get('andesite_alloy')
	global.forEachMaterial(material => { // [PORT] forEachMaterial вызывается через global (изолированные скоупы KubeJS 7)
		if (andesiteAlloyMaterial != null && material == andesiteAlloyMaterial)
			return;

		const ingotItem = ChemicalHelper.get(TagPrefix.ingot, material, 1);
		if (ingotItem !== null && !ingotItem.isEmpty() && ingotItem.hasTag('c:hidden_from_recipe_viewers')) // [PORT] ChemicalHelper.get возвращает пустой стак, а не null — добавлена проверка isEmpty
			return;

		const gemItem = ChemicalHelper.get(TagPrefix.gem, material, 1);
		if (gemItem !== null && !gemItem.isEmpty() && gemItem.hasTag('c:hidden_from_recipe_viewers')) // [PORT] см. выше
			return;

		if ((ingotItem === null || ingotItem.isEmpty()) && (gemItem === null || gemItem.isEmpty())) // [PORT] см. выше
			return;

		// #region Coiling

		if (material.hasFlag(GTMaterialFlags.GENERATE_ROD) && material.hasFlag(GTMaterialFlags.GENERATE_SPRING_SMALL)) {
			event.recipes.createvintageneoforged.coiling(
				ChemicalHelper.get(TagPrefix.springSmall, material, 2),
				ChemicalHelper.get(TagPrefix.rod, material, 1))
				.processingTime((material.getMass() / 2) * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
				.id(`tfg:vi/coiling/${material.getName()}_small_spring`)
		}

		if (material.hasFlag(GTMaterialFlags.GENERATE_LONG_ROD) && material.hasFlag(GTMaterialFlags.GENERATE_SPRING)) {
			event.recipes.createvintageneoforged.coiling(
				ChemicalHelper.get(TagPrefix.spring, material, 1),
				ChemicalHelper.get(TagPrefix.rodLong, material, 1))
				.processingTime(material.getMass() * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
				.id(`tfg:vi/coiling/${material.getName()}_spring`)
		}

		const singleWire = ChemicalHelper.get(TagPrefix.wireGtSingle, material, 2)
		if (singleWire !== null && !singleWire.isEmpty()) { // [PORT] добавлена проверка isEmpty
			event.recipes.createvintageneoforged.coiling(singleWire, ChemicalHelper.get(TagPrefix.ingot, material, 1))
				.processingTime(material.getMass() * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
				.id(`tfg:vi/coiling/${material.getName()}_single_wire`)
		}

		if (material.hasFlag(GTMaterialFlags.GENERATE_FINE_WIRE)) {
			if (singleWire !== null && !singleWire.isEmpty()) { // [PORT] добавлена проверка isEmpty
				event.recipes.createvintageneoforged.coiling(
					ChemicalHelper.get(TagPrefix.wireFine, material, 4),
					ChemicalHelper.get(TagPrefix.wireGtSingle, material, 1))
					.processingTime(material.getMass() * 3 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
					.id(`tfg:vi/coiling/${material.getName()}_fine_wire`)
			} else {
				event.recipes.createvintageneoforged.coiling(
					ChemicalHelper.get(TagPrefix.wireFine, material, 8),
					ChemicalHelper.get(TagPrefix.ingot, material, 1))
					.processingTime(material.getMass() * 3 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
					.id(`tfg:vi/coiling/${material.getName()}_fine_wire`)
			}
		}

		// #endregion

		// #region Vibrating

		if (material.hasProperty(PropertyKey.ORE)
			&& material.hasProperty(PropertyKey.GEM)
			&& material !== GTMaterials.Coal
			&& material !== GTMaterials.get('gtceu:lignite') // [PORT-FIX] HEAD: голое имя резолвится в minecraft: -> namespace gtceu:
			&& material !== GTMaterials.get('gtceu:anthracite')) {

			let highYield = material.hasFlag(GTMaterialFlags.HIGH_SIFTER_OUTPUT)

			event.recipes.createvintageneoforged.vibrating(
				[
					// [PORT-FIX] plain-объекты processing_output вместо CreateItem.of (см. viChanced)
					viChanced(ChemicalHelper.get(TagPrefix.gemExquisite, material, 1), highYield ? 0.05 : 0.03),
					viChanced(ChemicalHelper.get(TagPrefix.gemFlawless, material, 1), highYield ? 0.15 : 0.10),
					viChanced(ChemicalHelper.get(TagPrefix.gem, material, 1), highYield ? 0.50 : 0.35),
					viChanced(ChemicalHelper.get(TagPrefix.dustPure, material, 1), highYield ? 0.25 : 0.50),
					viChanced(ChemicalHelper.get(TagPrefix.gemFlawed, material, 1), highYield ? 0.20 : 0.25),
					viChanced(ChemicalHelper.get(TagPrefix.gemChipped, material, 1), highYield ? 0.30 : 0.35)
				].filter(x => x !== null),
				ChemicalHelper.get(TagPrefix.crushedPurified, material, 1))
					.processingTime(500 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
					.id(`tfg:vi/vibrating/${material.getName()}`)
		}

		// #endregion

		// #region Lathe

		if (material.hasFlag(GTMaterialFlags.GENERATE_ROD) && !material.hasFlag(GTMaterialFlags.IS_MAGNETIC)) {

			let latheInput = material.hasProperty(PropertyKey.GEM)
				? ChemicalHelper.get(TagPrefix.gem, material, 1)
				: ChemicalHelper.get(TagPrefix.ingot, material, 1)

			if (latheInput !== null && !latheInput.isEmpty()) { // [PORT] добавлена проверка isEmpty
				event.recipes.createvintageneoforged.polishing(ChemicalHelper.get(TagPrefix.rod, material, 2), latheInput)
					.speedLimits(3)
					.processingTime(material.getMass() * 4 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
					.id(`tfg:vi/lathe/${material.getName()}_to_rod`)

				if (material.hasProperty(PropertyKey.GEM)) { // [PORT] перенесено под проверку latheInput (в оригинале latheInput мог быть пустым)
					event.recipes.create.sandpaper_polishing(ChemicalHelper.get(TagPrefix.rod, material, 1), latheInput)
						.id(`tfg:polishing/${material.getName()}_rod`)
				}
			}
		}

		if (material.hasFlag(GTMaterialFlags.GENERATE_BOLT_SCREW)) {
			event.recipes.createvintageneoforged.polishing(
				ChemicalHelper.get(TagPrefix.screw, material, 1),
				ChemicalHelper.get(TagPrefix.bolt, material, 1))
				.speedLimits(2)
				.processingTime(Math.max(1, material.getMass() / 8) * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
				.id(`tfg:vi/lathe/${material.getName()}_bolt_to_screw`)
		}

		// #endregion
	})


	// #region Vibrating

	event.recipes.createvintageneoforged.vibrating([
			// [PORT-FIX] plain-объекты processing_output вместо CreateItem.of (см. viChanced)
			Item.of('minecraft:flint'),
			viChanced('minecraft:flint', 0.9),
			viChanced('minecraft:flint', 0.8),
			viChanced('minecraft:flint', 0.6),
			viChanced('minecraft:flint', 0.33),
			viChanced('minecraft:flint', 0.25)
		], { tag: 'c:gravels' }  /* [PORT-FIX] item-тега tfc:rock/gravel нет в 1.21, есть c:gravels */) // [PORT-FIX] строка '#тег' парсится как fluid-тег, а Ingredient.of не проходит either-кодек — передан plain-объект {tag}
		.processingTime(250 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id(`tfg:vi/vibrating/gravel`)

	// #endregion

	// #region Lathe

	event.recipes.createvintageneoforged.polishing('tfc:lens', { tag: 'c:glass_blocks' }) // [PORT] forge: -> c: // [PORT-FIX] plain-объект {tag} вместо Ingredient.of (Ingredient.of не проходит either-кодек)
		.speedLimits(1)
		.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id(`tfg:vi/lathe/lens`)

	// [PORT-Ф2] rose_quartz — кастомный GT-материал TFG (в GTCEu 8.0 нет материала rose_quartz, есть только create:rose_quartz):
	// event.recipes.createvintageneoforged.polishing(['#c:lenses/rose_quartz', '2x #c:dusts/rose_quartz'], '#c:exquisite_gems/rose_quartz')
	// 	.speedLimits(1)
	// 	.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id(`tfg:vi/lathe/rose_quartz_lens`)

	event.recipes.createvintageneoforged.polishing(['gtceu:amethyst_lens', '2x gtceu:amethyst_dust'], { tag: 'c:exquisite_gems/amethyst' }) // [PORT-FIX] тег в выходе рецепта недопустим (processing_output) — заменён на конкретные предметы gtceu; вход — plain-объект {tag} (Ingredient.of не проходит either-кодек)
		.speedLimits(1)
		.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id(`tfg:vi/lathe/amethyst_lens`)

	// #endregion

	// #region Curving Press

	// Copied from https://github.com/ThePansmith/Monifactory/blob/15c109298104e0c0b5083b266264bd6c158c6154/kubejs/server_scripts/mods/optionalCompats/create.js#L251
	// [PORT-CHECK] формат JSON GT-рецептов мог измениться в 1.21.1 (кодеки NeoForge) — цикл обёрнут в try/catch,
	// [PORT-CHECK] требуется проверка в игре, что curving-копии extruder-рецептов реально создаются.
	event.forEachRecipe([{ type: 'gtceu:extruder' }],
		recipe => {
			try {
				let r = JSON.parse(recipe.json)

				// LV recipes only
				let EUt = (r.tickInputs && r.tickInputs.eu) ? r.tickInputs.eu[0].content : null;

				if (EUt > 32) return
				// Skip this one
				if (r.outputs.item[0].content.ingredient.item === "gtceu:nan_certificate") return
				// Skip glass too
				if (r.inputs.item[0].content.ingredient.item === "gtceu:glass_dust") return
				// And this
				// [PORT] forge:ingots -> c:ingots (оставлены обе формы записи тега — с '#' и без)
				if (r.inputs.item[0].content.ingredient.tag === "#c:ingots/damascus_steel") return
				if (r.inputs.item[0].content.ingredient.tag === "c:ingots/damascus_steel") return

				// [PORT-FIX] curving поддерживает только 1 предмет на входе — extruder-рецепты с count>1 пропускаем
				if (r.inputs.item[0].content.count > 1) return
				let input_array = [r.inputs.item[0].content.ingredient];

				let output = r.outputs.item[0].content.ingredient;

				// [PORT-FIX] Тип createvintageneoforged:curving c полем head отсутствует в CVI 1.21.1 —
				// [PORT-FIX] копия extruder-рецепта создаётся как curving_concave (без привязки к экструдерной форме).
				if (!output.item) return // [PORT-FIX] выход-тег невозможен в results (processing_output)
				event.custom({
					type: 'createvintageneoforged:curving_concave',
					ingredients: input_array,
					results: [{ id: output.item, count: r.outputs.item[0].content.count }]
				}).id(`tfg:vi/curving/${recipe.getId().split(':')[1]}`)
			} catch (e) {
				console.warn(`[Gregnautics] vi curving copy failed for ${recipe.getId()}: ${e}`) // [PORT] защита от изменившегося формата JSON
			}
		}
	)

	// #endregion

	// #region Vacuum

	// Item to fluids: vacuumizing
	// Fluids to item: pressurizing

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:glue', 50), 'tfc:glue')
		.heated()
		.processingTime(50 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/glue_melting')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:glue', 100), 'gtceu:sticky_resin')
		.heated()
		.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/glue_from_resin')

	// [PORT-Ф4] tfg:conifer_rosin — предмет tfg появится в фазе 4:
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:glue', 50), 'tfg:conifer_rosin')
	// 	.heated()
	// 	.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id('tfg:vi/vacuumizing/glue_from_rosin')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:glue', 50), [Fluid.of('tfc:limewater', 500), 'minecraft:bone_meal'])
		.heated()
		.processingTime(50 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/glue_from_bone_meal')

	event.recipes.createvintageneoforged.pressurizing('tfc:glue', Fluid.of('gtceu:glue', 50))
		.heated()
		.processingTime(50 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id('tfg:vi/pressurizing/glue_solidifying')


	// Seed oils
	// [PORT-Ф4] tfg:sunflower_product / tfg:rapeseed_product / tfg:peanut_product / tfg:peanut_oil — контент tfg появится в фазе 4:
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:seed_oil', 500), 'tfg:sunflower_product')
	// 	.processingTime(500 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id('tfg:vi/vacuumizing/sunflower')
	//
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:seed_oil', 600), 'tfg:rapeseed_product')
	// 	.processingTime(500 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id('tfg:vi/vacuumizing/rapeseed')
	//
	// event.recipes.createvintageneoforged.vacuumizing(Fluid.of('tfg:peanut_oil', 500), 'tfg:peanut_product')
	// 	.processingTime(500 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id('tfg:vi/vacuumizing/peanut')

	event.recipes.createvintageneoforged.vacuumizing(Fluid.of('gtceu:seed_oil', 16), { tag: 'c:seeds' }) // [PORT] forge: -> c: // [PORT-FIX] plain-объект {tag} вместо Ingredient.of (Ingredient.of не проходит either-кодек)
		.processingTime(50 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id('tfg:vi/vacuumizing/seed_oil')

	event.recipes.createvintageneoforged.pressurizing('gtceu:sodium_hydroxide_dust', Fluid.of('tfc:lye', 1000)) // [PORT-FIX] тег в выходе рецепта недопустим (processing_output) — заменён на конкретный предмет gtceu
		.processingTime(150 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.heated()
		.id('tfg:vi/pressurizing/lye')

	// #endregion

	// #region Coiling
	event.recipes.createvintageneoforged.coiling('8x tfc:wool_yarn', 'tfc:wool')
		.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id(`tfg:vi/coiling/wool_yarn`)

	// [PORT-Ф4] tfg:glacian_wool — предмет tfg появится в фазе 4:
	// event.recipes.createvintageneoforged.coiling('8x tfc:wool_yarn', 'tfg:glacian_wool')
	// 	.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id(`tfg:vi/coiling/glacian_wool_yarn`)
	// 	.springColor('FFCCFC')

	// [PORT-Ф4] tfg:phantom_thread — предмет tfg появится в фазе 4:
	// event.recipes.createvintageneoforged.coiling('16x tfg:phantom_thread', 'minecraft:phantom_membrane')
	// 	.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id(`tfg:vi/coiling/phantom_thread`)
	// 	.springColor('E1C4C4')

	event.recipes.createvintageneoforged.coiling('8x firmalife:pineapple_yarn', 'firmalife:pineapple_fiber')
		.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
		.id(`tfg:vi/coiling/pineapple_yarn`) // [PORT-FIX] .springColor() удалён — в схеме coiling CVI 1.21.1 такого поля нет

	// [PORT-Ф4] tfg:polycaprolactam_string — предмет tfg появится в фазе 4:
	// event.recipes.createvintageneoforged.coiling('32x tfg:polycaprolactam_string', ChemicalHelper.get(TagPrefix.ingot, GTMaterials.Polycaprolactam, 1))
	// 	.processingTime(100 * VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
	// 	.id(`tfg:vi/coiling/nylon_string`)
	// 	.springColor('000000')

	// #endregion

	// #region Curving

	// [PORT-FIX] В CVI 1.21.1 нет типа рецепта createvintageneoforged:curving с полем head (кастомная голова-пресс-форма):
	// [PORT-FIX] вместо него 4 типа по форме головы (curving_concave/convex/v_shaped/w_shaped) с полями requiredBonks/headDamage.
	// [PORT-FIX] Механика TFG «экструдерная форма как голова» невоспроизводима — рецепты переведены на curving_concave/v_shaped через event.custom.
	event.custom({
		type: 'createvintageneoforged:curving_concave',
		ingredients: [{ item: 'minecraft:clay_ball' }],
		results: [{ id: 'tfc:ceramic/unfired_brick' }]
	}).id(`tfg:vi/curving/clay_brick`)

	event.custom({
		type: 'createvintageneoforged:curving_concave',
		ingredients: [{ item: 'tfc:fire_clay' }],
		results: [{ id: 'tfc:ceramic/unfired_fire_brick' }]
	}).id(`tfg:vi/curving/fire_brick`)

	event.custom({
		type: 'createvintageneoforged:curving_v_shaped', // [PORT-FIX] bottle_extruder_mold -> V-образная голова (ближайший аналог)
		ingredients: [{ tag: 'c:ingots/copper' }], // [PORT] forge: -> c:
		results: [{ id: 'afc:tree_tap' }]
	}).id(`tfg:vi/curving/tree_tap`)

	// [PORT-Ф4] tfg:small_casing_extruder_mold — предмет tfg появится в фазе 4:
	// event.recipes.createvintageneoforged.curving('firmalife:sprinkler', '#c:plates/copper')
	// 	.head('tfg:small_casing_extruder_mold')
	// 	.id(`tfg:vi/curving/sprinkler`)

	// [PORT-Ф4] tfg:large_casing_extruder_mold — предмет tfg появится в фазе 4:
	// event.recipes.createvintageneoforged.curving('tfc:wrought_iron_grill', '#c:double_plates/wrought_iron')
	// 	.head('tfg:large_casing_extruder_mold')
	// 	.id(`tfg:vi/curving/wrought_iron_grill`)

	// #endregion
})

function generateHammeringRecipe(event, material, blows, anvil) {
	// [PORT] TFGTagPrefix.ingotDouble (Java-мод TFG) отсутствует в 1.21.1 — входом служит унифицированный тег
	// [PORT] c:double_ingots/<материал> (наполняется TFC и gregnautics_material_recipe_normalization.js).
	const materialName = material.getName()
	if (!Item.exists(`tfc:metal/double_ingot/${materialName}`) && !Item.exists(`gtceu:double_${materialName}_ingot`)) // [PORT] у материала нет двойного слитка в 1.21.1 — рецепт пропускается
		return
	const plate = ChemicalHelper.get(TagPrefix.plate, material, 1)
	if (plate === null || plate.isEmpty()) // [PORT] защита от пустого выхода
		return
	event.recipes.createvintageneoforged.hammering( // [PORT] vintageimprovements -> createvintageneoforged
		plate,
		{ tag: `c:double_ingots/${materialName}` }) // [PORT-FIX] plain-объект {tag} вместо Ingredient.of (строка '#тег' парсится как fluid-тег, Ingredient.of не проходит either-кодек)
		.anvilBlock(`tfc:metal/anvil/${anvil}`)
		.hammerBlows(Math.max(blows, 1))
		.id(`tfg:vi/hammer/${materialName}_plate_on_${anvil}_anvil`)
}

function generateHammeringRecipeFromItem(event, input, output, blows, anvil) {
	event.recipes.createvintageneoforged.hammering(output, input) // [PORT] vintageimprovements -> createvintageneoforged
		.anvilBlock(`tfc:metal/anvil/${anvil}`)
		.hammerBlows(Math.max(blows, 1))
		.id(`tfg:vi/hammer/${global.linuxUnfucker(input)}_on_${anvil}_anvil`)
}
