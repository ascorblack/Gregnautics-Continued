// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.ice.js (Ф4).
// Главные изменения 1.20→1.21:
//  - forge:→c:; теги в выходах рецептов заменены на конкретные предметы (gtceu:ice_dust и т.п.)
//  - barrel_sealed: конструктор (input_fluid, duration); .inputFluid() в схеме нет
//  - pot: .fluidOutput() из схемы kubejs_tfc 2.0
//  - firmalife vat: kubejs_tfc 2.0.1 не поддерживает схемы firmalife; кодек firmalife:vat
//    ТРЕБУЕТ input_item — чисто жидкостный рецепт (лёд→вода) невозможен [PORT-CHECK]
//  - tfg:muddy_water (жидкость) и tfg:dry_ice не зарегистрированы [PORT-Ф4-TODO]

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.ice start')

	// Dirty water
	// [PORT-Ф4-TODO] жидкость tfg:muddy_water не зарегистрирована в 1.21.1
	// event.recipes.tfc.barrel_instant(Fluid.of('tfg:muddy_water', 1000))
	// 	.inputItem('tfc:jute_net')
	// 	.outputItem('tfc:dirty_jute_net')
	// 	.outputFluid(Fluid.of('minecraft:water', 1000))
	//
	// event.recipes.gtceu.centrifuge('tfg:muddy_water')
	// 	.inputFluids(Fluid.of('tfg:muddy_water', 1000))
	// 	.outputFluids(Fluid.of('minecraft:water', 1000))
	// 	.duration(50)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// Ice
	event.remove({ id: 'gtceu:compressor/ice_from_dust' })
	event.remove({ id: 'gtceu:compressor/ice_from_snow' })

	event.shapeless('gtceu:ice_dust', ['#c:tools/mortar', '4x firmalife:ice_shavings']) // [PORT-FIX] тег в выходе -> конкретный предмет; tools/mortars -> tools/mortar
		.id('tfg:shaped/ice_shavings')

	event.recipes.tfc.quern('gtceu:small_ice_dust', 'firmalife:ice_shavings') // [PORT-FIX] тег в выходе -> конкретный предмет
		.id('tfg:quern/ice_dust')

	event.recipes.gtceu.macerator('tfg:macerating_ice_shavings')
		.itemInputs('firmalife:ice_shavings')
		.itemOutputs('gtceu:small_ice_dust') // [PORT-FIX]
		.duration(10)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.macerator('tfg:macerating_ice_shavings_reverse')
		.itemInputs('#c:dusts/ice') // [PORT] forge: -> c:
		.itemOutputs('4x firmalife:ice_shavings')
		.duration(20)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.fluid_solidifier('tfg:ice')
		.inputFluids("#tfg:clean_water 144")
		.notConsumableItem('gtceu:block_casting_mold') // [PORT-FIX] notConsumable(string) -> notConsumableItem
		.itemOutputs('minecraft:ice')
		.duration(200)
		.EUt(GTValues.VA[GTValues.LV])

	global.TFGDamageShapeless(event,'4x firmalife:ice_shavings', ['#c:dusts/ice', '#c:tools/hammer']) // [PORT] tools/hammers -> tools/hammer

	// [PORT-Ф4-TODO] tfg:dry_ice не зарегистрирован в 1.21.1
	// event.recipes.gtceu.mixer('tfg:ice_slush_from_dry_ice')
	// 	.itemInputs('1x tfg:dry_ice')
	// 	.inputFluids("#tfc:water 8000")
	// 	.outputFluids(Fluid.of('gtceu:ice', 8000))
	// 	.duration(80)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// Cooling water
	// [PORT-Ф4-TODO] tfg:dry_ice не зарегистрирован
	// event.recipes.tfc.barrel_sealed(Fluid.of('minecraft:water', 5000), 250)
	// 	.inputItem('1x tfg:dry_ice')
	// 	.outputFluid(Fluid.of('gtceu:ice', 5000))
	// 	.id('tfg:barrel/cooling_water_0')

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration)
	event.recipes.tfc.barrel_sealed(Fluid.of('minecraft:water', 144), 1000)
		.inputItem('1x #c:dusts/ice')
		.outputFluid(Fluid.of('gtceu:ice', 144))
		.id('tfg:barrel/cooling_water_1')

	event.recipes.tfc.barrel_sealed(Fluid.of('minecraft:water', 144), 1000)
		.inputItem('16x minecraft:snowball')
		.outputFluid(Fluid.of('gtceu:ice', 144))
		.id('tfg:barrel/cooling_water_2')

	event.recipes.tfc.barrel_sealed(Fluid.of('tfc:salt_water', 144), 2000)
		.inputItem('1x #c:dusts/ice')
		.outputFluid(Fluid.of('gtceu:ice', 144))
		.id('tfg:barrel/cooling_water_3')

	event.recipes.tfc.barrel_sealed(Fluid.of('tfc:salt_water', 144), 2000)
		.inputItem('16x minecraft:snowball')
		.outputFluid(Fluid.of('gtceu:ice', 144))
		.id('tfg:barrel/cooling_water_4')

	// Freezing it
	event.recipes.tfc.barrel_sealed(Fluid.of('gtceu:ice', 144), 3000)
		.inputItem('9x #c:dusts/ice')
		.outputItem('minecraft:packed_ice')
		.id('tfg:barrel/packed_ice')

	// Heating it back up
	event.recipes.tfc.pot([], Fluid.of('gtceu:ice', 144), 300, 100)
		.fluidOutput(Fluid.of('minecraft:water', 144))

	// [PORT-CHECK] кодек firmalife:vat в 3.0 ТРЕБУЕТ input_item — чисто жидкостный рецепт невозможен.
	// event.recipes.firmalife.vat()
	// 	.inputFluid(Fluid.of('gtceu:ice', 144))
	// 	.outputFluid(Fluid.of('minecraft:water', 144))
	// 	.length(300)
	// 	.temperature(100)

	// Snow
	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — stomping через event.custom
	event.custom({
		"type": "firmalife:stomping",
		"ingredient": { "item": "minecraft:snowball" },
		"input_texture": "minecraft:block/snow",
		"output_texture": "minecraft:block/snow",
		"sound": "minecraft:block.snow.place",
		"result": { "id": "minecraft:snow" }
	}).id('tfg:stomping/snow_layer')

	event.shapeless('minecraft:snow_block', ['8x minecraft:snow'])
		.id('tfg:shapeless/snow_block')

	event.shapeless('8x minecraft:snowball', ['minecraft:snow_block'])
		.id('tfg:shapeless/snowball')

	global.TFGDamageShapeless(event,'8x minecraft:snow', ['minecraft:snow_block', '#c:tools/saw']) // [PORT] tools/saws -> tools/saw
		.id('tfg:shapeless/snow')
})
