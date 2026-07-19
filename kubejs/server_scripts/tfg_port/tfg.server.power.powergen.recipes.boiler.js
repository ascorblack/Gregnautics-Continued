// priority: 0
"use strict";

// [PORT] Порт tfg/powergen/recipes.boiler.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT] Переименования жидкостей GTM8: gtceu:oil_heavy -> gtceu:heavy_oil, gtceu:oil_medium -> gtceu:raw_oil,
// [PORT] gtceu:oil_light -> gtceu:light_oil (проверено по kubejs/exported/registries/fluids.json).
// [PORT] Мод beneath отсутствует в сборке 1.21.1 — рецепты с beneath:cursecoal вырезаны.
// [PORT-Ф4] Тип рецептов super_boiler — кастомная машина TFG, машины Ф4 не портированы
// [PORT-Ф4] (см. startup_scripts/tfg_port/gtceu.recipe_types.js и 05_startup.dispatch.js.disabled) — блок закомментирован.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.power powergen.recipes.boiler start')

	function removeBoilerRecipe(id) {
		event.remove({ id: `gtceu:steam_boiler/${id}` })
		event.remove({ id: `gtceu:large_boiler/${id}` })
	}

	removeBoilerRecipe('minecraft_chest')
	removeBoilerRecipe('minecraft_cartography_table')
	removeBoilerRecipe('minecraft_smithing_table')
	removeBoilerRecipe('minecraft_note_block')
	removeBoilerRecipe('minecraft_crossbow')
	removeBoilerRecipe('minecraft_lectern')
	removeBoilerRecipe('minecraft_daylight_detector')
	removeBoilerRecipe('minecraft_ladder')
	removeBoilerRecipe('minecraft_bamboo_mosaic')
	removeBoilerRecipe('minecraft_bamboo_mosaic_slab')
	removeBoilerRecipe('minecraft_bamboo_mosaic_stairs')
	removeBoilerRecipe('minecraft_bow')
	removeBoilerRecipe('minecraft_bowl')
	removeBoilerRecipe('minecraft_scaffolding')
	removeBoilerRecipe('minecraft_cartography_table')
	removeBoilerRecipe('minecraft_jukebox')
	removeBoilerRecipe('minecraft_loom')
	removeBoilerRecipe('minecraft_bamboo')
	removeBoilerRecipe('minecraft_stick')
	removeBoilerRecipe('create_cardboard')
	removeBoilerRecipe('create_cardboard_block')
	removeBoilerRecipe('create_bound_cardboard_block')
	removeBoilerRecipe('create_cardboard_sword')
	removeBoilerRecipe('create_cardboard_helmet')
	removeBoilerRecipe('create_cardboard_chestplate')
	removeBoilerRecipe('create_cardboard_leggings')
	removeBoilerRecipe('create_cardboard_boots')
	removeBoilerRecipe('gtceu_bio_chaff')
	removeBoilerRecipe('gtceu_plant_ball')
	removeBoilerRecipe('gtceu_wood_plate')
	removeBoilerRecipe('gtceu_treated_wood_plate')
	removeBoilerRecipe('gtceu_sticky_resin')
	removeBoilerRecipe('gtceu_small_wood_dust')
	removeBoilerRecipe('gtceu_small_treated_wood_dust')
	removeBoilerRecipe('gtceu_tiny_wood_dust')
	removeBoilerRecipe('gtceu_tiny_treated_wood_dust')
	removeBoilerRecipe('gtceu_wood_bolt')
	removeBoilerRecipe('gtceu_wood_frame')
	removeBoilerRecipe('gtceu_wood_screw')
	removeBoilerRecipe('gtceu_treated_wood_rod')
	removeBoilerRecipe('gtceu_treated_wood_frame')
	removeBoilerRecipe('gtceu_long_wood_rod')
	removeBoilerRecipe('gtceu_long_treated_wood_rod')
	removeBoilerRecipe('gtceu_small_wood_gear')
	removeBoilerRecipe('gtceu_wood_gear')
	removeBoilerRecipe('gtceu_wood_dust')
	removeBoilerRecipe('gtceu_treated_wood_dust')
	removeBoilerRecipe('gtceu_small_coke_dust')
	removeBoilerRecipe('gtceu_small_charcoal_dust')
	removeBoilerRecipe('gtceu_small_coal_dust')
	removeBoilerRecipe('gtceu_tiny_coke_dust')
	removeBoilerRecipe('gtceu_tiny_coal_dust')
	removeBoilerRecipe('gtceu_tiny_charcoal_dust')
	removeBoilerRecipe('gtceu_pure_coal_dust')
	removeBoilerRecipe('gtceu_impure_coal_dust')
	removeBoilerRecipe('gtceu_coal_lens')
	removeBoilerRecipe('createaddition_biomass_pellet')
	removeBoilerRecipe('createaddition_biomass_pellet_block')

	//Re-add some recipes to the boiler under tags
	event.recipes.gtceu.steam_boiler('tfg:logs')
		.itemInputs('#minecraft:logs')
		.duration(300)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:saplings')
		.itemInputs('#minecraft:saplings')
		.duration(100)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:planks')
		.itemInputs('#minecraft:planks')
		.duration(75)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	// [PORT] Мод beneath отсутствует в сборке 1.21.1 (beneath:cursecoal — антрацит):
	// event.recipes.gtceu.steam_boiler('tfg:anthracite')
	// 	.itemInputs('beneath:cursecoal')
	// 	.duration(160 * 20)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:flora_pellets')
		.itemInputs('tfg:flora_pellets')
		.duration(1200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:lignite')
		.itemInputs('tfc:ore/lignite')
		.duration(60 * 20) // same as charcoal
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:bituminous_coal')
		.itemInputs('tfc:ore/bituminous_coal')
		.duration(80 * 20) // same as vanilla coal used to be
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	// Small nerf to charcoal

	// [PORT-FIX] KubeJS 7: recipe.get()/recipe.set() из оригинала недоступны — правим длительность
	// через JSON-пересборку (event.custom + remove), по образцу create.recipes.js этого порта.
	// [PORT-CHECK] структура JSON GT-рецептов могла измениться — обёрнуто в try/catch, проверить в игре.
	let charcoalNerfRemovals = []
	event.forEachRecipe({ id: /gtceu:(steam_boiler|large_boiler)\/.*charcoal.*/ }, recipe => {
		try {
			let obj = JSON.parse(String(recipe.json))
			if (typeof obj.duration !== 'number') return
			obj.duration = Math.floor(obj.duration / 4 * 3)
			event.custom(obj).id(`tfg:${global.linuxUnfucker(recipe.getId())}`)
			charcoalNerfRemovals.push(String(recipe.getId()))
		} catch (e) {
			console.warn(`[Gregnautics] [PORT-CHECK] charcoal boiler nerf failed for ${recipe.getId()}: ${e}`)
		}
	})
	charcoalNerfRemovals.forEach(id => event.remove({ id: id }))

	// Allow oil in small boilers

	event.remove({ id: "gtceu:large_boiler/gtceu_oil" })
	event.remove({ id: "gtceu:large_boiler/gtceu_oil_heavy" })
	event.remove({ id: "gtceu:large_boiler/gtceu_heavy_oil" }) // [PORT] GTM8: материал переименован oil_heavy -> heavy_oil (старый id оставлен на всякий случай)
	event.remove({ id: "gtceu:large_boiler/gtceu_fish_oil" })

	// Booster
	event.remove({ id: "gtceu:large_boiler/gtceu_creosote" })
	event.remove({ id: "gtceu:large_boiler/wood_gas" })

	// This generates both a small boiler and large boiler recipe. Remove it above to avoid a duplicate
	event.recipes.gtceu.steam_boiler('tfg:oil')
		.inputFluids(Fluid.of('gtceu:oil', 200))
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:heavy_oil')
		.inputFluids(Fluid.of('gtceu:heavy_oil', 32)) // [PORT] gtceu:oil_heavy -> gtceu:heavy_oil
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:fish_oil')
		.inputFluids(Fluid.of('gtceu:fish_oil', 160))
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	// These aren't in base GT, but they have the same stats as oil
	event.recipes.gtceu.steam_boiler('tfg:raw_oil')
		.inputFluids(Fluid.of('gtceu:raw_oil', 200)) // [PORT] gtceu:oil_medium -> gtceu:raw_oil
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:light_oil')
		.inputFluids(Fluid.of('gtceu:light_oil', 200)) // [PORT] gtceu:oil_light -> gtceu:light_oil
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	// Same stats as fish oil

	event.recipes.gtceu.steam_boiler('tfg:seed_oil')
		.inputFluids(Fluid.of('gtceu:seed_oil', 160))
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	// [PORT-Ф2] tfg:peanut_oil — GT-материал TFG (tfg.materials.food.js), система материалов Ф2 отключена:
	// event.recipes.gtceu.steam_boiler('tfg:peanut_oil')
	// 	.inputFluids(Fluid.of('tfg:peanut_oil', 160))
	// 	.duration(200)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:soybean_oil')
		.inputFluids(Fluid.of('firmalife:soybean_oil', 160))
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	event.recipes.gtceu.steam_boiler('tfg:tallow')
		.inputFluids(Fluid.of('tfc:tallow', 160))
		.duration(200)
		.dimension('minecraft:overworld')
		.dimension('minecraft:the_nether')

	// Super Fuel Boiler
	// Weird test

	// [PORT-Ф4] Тип рецептов gtceu:super_boiler — кастомная машина TFG, машины Ф4 не портированы;
	// [PORT-Ф2] жидкость tfg:syngas — GT-материал TFG, система материалов Ф2 отключена. Весь блок закомментирован:
	// event.recipes.gtceu.super_boiler('tfg:syngas_fuel_binder')
	// 	.itemInputs(Item.of('gtceu:bio_chaff', 1))
	// 	.inputFluids(Fluid.of('tfg:syngas', 20000))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')
	//
	// event.recipes.gtceu.super_boiler('tfg:syngas_fuel')
	// 	.itemInputs(Item.of('#minecraft:coals', 1))
	// 	.inputFluids(Fluid.of('tfg:syngas', 20000*4))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')
	//
	// event.recipes.gtceu.super_boiler('tfg:light_fuel_binder')
	// 	.itemInputs(Item.of('gtceu:bio_chaff', 1))
	// 	.inputFluids(Fluid.of('gtceu:light_fuel', 20000))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')
	//
	// event.recipes.gtceu.super_boiler('tfg:light_fuel')
	// 	.itemInputs(Item.of('minecraft:charcoal', 1))
	// 	.inputFluids(Fluid.of('gtceu:light_fuel', 20000*4))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')
	//
	// event.recipes.gtceu.super_boiler('tfg:heavy_fuel_binder')
	// 	.itemInputs(Item.of('gtceu:bio_chaff', 1))
	// 	.inputFluids(Fluid.of('gtceu:heavy_fuel', 20000))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')
	//
	// event.recipes.gtceu.super_boiler('tfg:heavy_fuel')
	// 	.itemInputs(Item.of('minecraft:charcoal', 1))
	// 	.inputFluids(Fluid.of('gtceu:heavy_fuel', 20000*4))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')
	//
	// event.recipes.gtceu.super_boiler('tfg:naphtha_binder')
	// 	.itemInputs(Item.of('gtceu:bio_chaff', 1))
	// 	.inputFluids(Fluid.of('gtceu:naphtha', 20000))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')
	//
	// event.recipes.gtceu.super_boiler('tfg:naphtha_fuel')
	// 	.itemInputs(Item.of('minecraft:charcoal', 1))
	// 	.inputFluids(Fluid.of('gtceu:naphtha', 20000*4))
	// 	.duration(20*150)
	// 	.dimension('minecraft:overworld')
	// 	.dimension('minecraft:the_nether')

	// fish oil extraction
	event.recipes.gtceu.extractor(`tfg:fish_oil`)
		.itemInputs('#minecraft:fishes')
		.outputFluids(Fluid.of('gtceu:fish_oil', 400))
		.duration(40)
		.EUt(4)

	event.recipes.gtceu.extractor(`tfg:tallow`)
		.itemInputs('tfc:blubber')
		.outputFluids(Fluid.of('tfc:tallow', 400))
		.duration(40)
		.EUt(4)

	// Seed oil
	event.recipes.gtceu.extractor(`tfg:seed_oil`)
		.itemInputs('#tfc:seeds')
		.outputFluids(Fluid.of('gtceu:seed_oil', 50))
		.duration(32)
		.EUt(2)

	event.recipes.gtceu.extractor(`rapeseed_oil`)
		.itemInputs('#gregnautics:canola_products')
		.outputFluids(Fluid.of('gtceu:seed_oil', 600))
		.duration(20 * 5)
		.EUt(GTValues.VHA[GTValues.ULV])

	event.recipes.gtceu.extractor(`sunflower_oil`)
		.itemInputs('tfg:sunflower_product')
		.outputFluids(Fluid.of('gtceu:seed_oil', 500))
		.duration(20 * 5)
		.EUt(GTValues.VHA[GTValues.ULV])

	// [PORT-Ф2] жидкость tfg:peanut_oil — GT-материал TFG, система материалов Ф2 отключена:
	// event.recipes.gtceu.extractor(`tfg:peanut_oil`)
	// 	.itemInputs('tfg:peanut_product')
	// 	.outputFluids(Fluid.of('tfg:peanut_oil', 500))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VHA[GTValues.ULV])

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); .inputs() заменён на .inputItem(), .outputFluid() сохранён
	event.recipes.tfc.barrel_sealed(Fluid.of('minecraft:water', 100), 1000)
		.inputItem('#gregnautics:canola_products')
		.outputFluid(Fluid.of('gtceu:seed_oil', 250))
		.id('tfg:barrel/rapeseed_to_oil')

	event.recipes.tfc.barrel_sealed(Fluid.of('minecraft:water', 100), 1000) // [PORT-FIX] kubejs_tfc 2.0: barrel_sealed(input_fluid, duration)
		.inputItem('tfg:sunflower_product')
		.outputFluid(Fluid.of('gtceu:seed_oil', 200))
		.id('tfg:barrel/sunflower_to_oil')

	// [PORT-Ф2] жидкость tfg:peanut_oil — GT-материал TFG, система материалов Ф2 отключена:
	// event.recipes.tfc.barrel_sealed(Fluid.of('minecraft:water', 100), 1000)
	// 	.inputItem('tfg:peanut_product')
	// 	.outputFluid(Fluid.of('tfg:peanut_oil', 200))
	// 	.id('tfg:barrel/peanut_to_oil')
})
