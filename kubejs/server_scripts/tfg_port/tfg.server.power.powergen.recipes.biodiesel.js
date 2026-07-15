// priority: 0
"use strict";

// [PORT] Порт tfg/powergen/recipes.biodiesel.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT] forge: -> c: в тегах; жидкость tfg:peanut_oil — GT-материал TFG (tfg.materials.food.js),
// [PORT] система материалов Ф2 отключена (диспетчер 05_startup.dispatch.js.disabled) — рецепты с ней закомментированы [PORT-Ф2].

// [PORT-FIX] Флюид-тег tfg:alcohols наполнялся в оригинальном tfg/tags.js (ещё не портирован).
// Без него все рецепты биодизеля на спиртах мертвы — временно наполняем здесь из TFC/TFC Aged Alcohol.
// Убрать этот блок при порте tfg/tags.js, чтобы не дублировать записи.
ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.power powergen.recipes.biodiesel fluid tags start')

	;['tfc:beer', 'tfc:cider', 'tfc:rum', 'tfc:sake', 'tfc:vodka', 'tfc:whiskey', 'tfc:corn_whiskey', 'tfc:rye_whiskey'].forEach(f => event.add('tfg:alcohols', f))
	;['aged_beer', 'aged_cider', 'aged_rum', 'aged_sake', 'aged_vodka', 'aged_whiskey', 'aged_corn_whiskey', 'aged_rye_whiskey', 'aged_mead'].forEach(f => event.add('tfg:alcohols', `tfcagedalcohol:${f}`))
})

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.power powergen.recipes.biodiesel start')

	// Biofuels

	event.recipes.gtceu.chemical_reactor(`seed_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('gtceu:seed_oil', 6000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	// So you can craft Biodiesel without Chemical Reactor
	event.recipes.gtceu.mixer(`tfg:seed_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('gtceu:seed_oil', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 500))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	// [PORT-Ф2] tfg:peanut_oil — GT-материал TFG (tfg.materials.food.js), система материалов Ф2 отключена:
	// event.recipes.gtceu.chemical_reactor(`peanut_oil_alcohol_biodiesel`)
	// 	.inputFluids("#tfg:alcohols 1000", Fluid.of('tfg:peanut_oil', 6000))
	// 	.itemInputs('#c:tiny_dusts/sodium_hydroxide')
	// 	.outputFluids(Fluid.of('gtceu:bio_diesel', 6000))
	// 	.duration(20 * 10)
	// 	.EUt(GTValues.VHA[GTValues.ULV])

	// So you can craft Biodiesel without Chemical Reactor
	// [PORT-Ф2] tfg:peanut_oil — см. выше:
	// event.recipes.gtceu.mixer(`tfg:peanut_oil_alcohol_biodiesel`)
	// 	.inputFluids("#tfg:alcohols 1000", Fluid.of('tfg:peanut_oil', 1000))
	// 	.itemInputs('#c:tiny_dusts/sodium_hydroxide')
	// 	.outputFluids(Fluid.of('gtceu:bio_diesel', 500))
	// 	.duration(20 * 10)
	// 	.EUt(GTValues.VHA[GTValues.ULV])

	event.recipes.gtceu.chemical_reactor(`olive_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('tfc:olive_oil', 4000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	// So you can craft Biodiesel without Chemical Reactor
	event.recipes.gtceu.mixer(`tfg:olive_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('tfc:olive_oil', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 500))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	event.recipes.gtceu.chemical_reactor(`soybean_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('firmalife:soybean_oil', 4000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	// So you can craft Biodiesel without Chemical Reactor
	event.recipes.gtceu.mixer(`tfg:soybean_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('firmalife:soybean_oil', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 500))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	event.recipes.gtceu.chemical_reactor(`fish_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('gtceu:fish_oil', 6000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	event.recipes.gtceu.chemical_reactor(`tallow_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('tfc:tallow', 6000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])


	// So you can craft Biodiesel without Chemical Reactor
	event.recipes.gtceu.mixer(`tfg:fish_oil_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('gtceu:fish_oil', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 500))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])


	event.recipes.gtceu.mixer(`tfg:tallow_alcohol_biodiesel`)
		.inputFluids("#tfg:alcohols 1000", Fluid.of('tfc:tallow', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:bio_diesel', 500))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.ULV])

	event.recipes.gtceu.chemical_reactor(`olive_oil_ethanol_biodiesel`)
		.inputFluids(Fluid.of('tfc:olive_oil', 4000), Fluid.of('gtceu:ethanol', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:glycerol'), Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.LV])

	event.recipes.gtceu.chemical_reactor(`olive_oil_methanol_biodiesel`)
		.inputFluids(Fluid.of('tfc:olive_oil', 4000), Fluid.of('gtceu:methanol', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:glycerol'), Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.LV])

	event.recipes.gtceu.chemical_reactor(`soybean_oil_ethanol_biodiesel`)
		.inputFluids(Fluid.of('firmalife:soybean_oil', 4000), Fluid.of('gtceu:ethanol', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:glycerol'), Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.LV])

	event.recipes.gtceu.chemical_reactor(`soybean_oil_methanol_biodiesel`)
		.inputFluids(Fluid.of('firmalife:soybean_oil', 4000), Fluid.of('gtceu:methanol', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:glycerol'), Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.LV])

	event.recipes.gtceu.chemical_reactor(`tallow_methanol_biodiesel`)
		.inputFluids(Fluid.of('tfc:tallow', 6000), Fluid.of('gtceu:methanol', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:glycerol'), Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.LV])

	event.recipes.gtceu.chemical_reactor(`tallow_ethanol_biodiesel`)
		.inputFluids(Fluid.of('tfc:tallow', 6000), Fluid.of('gtceu:ethanol', 1000))
		.itemInputs('#c:tiny_dusts/sodium_hydroxide') // [PORT] forge: -> c:
		.outputFluids(Fluid.of('gtceu:glycerol'), Fluid.of('gtceu:bio_diesel', 6000))
		.duration(20 * 10)
		.EUt(GTValues.VHA[GTValues.LV])
})
