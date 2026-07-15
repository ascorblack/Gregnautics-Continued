// priority: 0
"use strict";

// [PORT] Порт tfc/data.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFCDataForTFC -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы, диспетчер не используется).
// [PORT-FIX] kubejs_tfc 2.0.1: itemHeat/fuel/lampFuel/fertilizer/knappingType(позиционные арги) не существуют —
//            методы принимают codec-объекты (форматы сверены с data/tfc/tfc/*/ в TerraFirmaCraft-NeoForge-1.21.1-4.2.5.jar):
//            heat({ingredient, heat_capacity, forging_temperature?, welding_temperature?})
//            fuel({ingredient, duration, temperature, purity?})
//            lampFuel({fluid:{fluid}, lamps:'#tag', burn_rate})
//            fertilizer({ingredient, nitrogen?, phosphorus?, potassium?})
//            knappingType({input:{item,count}, amount_to_consume?, click_sound, consume_after_complete, has_off_texture, spawns_particles, icon:{id,count}}, id)

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port tfc.data start')

	registerTFCHeats(event)
	registerTFCFuels(event)
	registerTFCLampFuels(event)
	registerTFCFertilizers(event)
	registerTFCKnappingTypes(event)
})


function registerTFCHeats(event) {

	// Ведро из синей стали
	event.heat({ ingredient: 'tfc:metal/bucket/blue_steel', heat_capacity: 1.429, forging_temperature: 924, welding_temperature: 1232 })

	// Ведро из красной
	event.heat({ ingredient: 'tfc:metal/bucket/red_steel', heat_capacity: 1.429, forging_temperature: 924, welding_temperature: 1232 })

	// Seaweed and Kelp
	event.heat({ ingredient: 'tfc:groundcover/seaweed', heat_capacity: 1.0 })
	event.heat({ ingredient: 'tfc:plant/leafy_kelp', heat_capacity: 1.0 })
	event.heat({ ingredient: 'tfc:plant/winged_kelp', heat_capacity: 1.0 })

	// Baked Potato
	event.heat({ ingredient: 'tfc:food/baked_potato', heat_capacity: 1.0 })

	// Soybean
	event.heat({ ingredient: 'tfc:food/soybean', heat_capacity: 1.0 })

	// [PORT] тег tfc:kaolin_blocks (item) создаётся в tfg_port/tfc.tags.js — в самом TFC 1.21 его нет
	event.heat({ ingredient: '#tfc:kaolin_blocks', heat_capacity: 3.0 })
}


function registerTFCFuels(event) {
	event.fuel({ ingredient: 'gtceu:coke_gem', temperature: 1415, duration: 4400, purity: 1.0 })
	event.fuel({ ingredient: 'gtceu:coke_dust', temperature: 1415, duration: 1200, purity: 0.95 })

	// [PORT] beneath отсутствует в 1.21.1
	// event.fuel({ ingredient: 'beneath:cursecoal', temperature: 1540, duration: 2200, purity: 1.0 })

	event.fuel({ ingredient: 'gtceu:charcoal_block', temperature: 1350, duration: 1800 * 9, purity: 1.0 })
	event.fuel({ ingredient: 'gtceu:charcoal_dust', temperature: 1350, duration: 600, purity: 1.0 })

	event.fuel({ ingredient: 'minecraft:coal_block', temperature: 1415, duration: 1900 * 4.5, purity: 1.0 })
	event.fuel({ ingredient: 'gtceu:flawless_coal_gem', temperature: 1415, duration: 1900 * 2, purity: 1.0 })
	event.fuel({ ingredient: 'gtceu:exquisite_coal_gem', temperature: 1415, duration: 1900 * 4, purity: 1.0 })
	// [PORT] GTM 8.0: flawed/chipped варианты гемов угля не генерируются (gtceu:flawed_coal_gem / gtceu:chipped_coal_gem отсутствуют в реестре)
	// event.fuel({ ingredient: 'gtceu:flawed_coal_gem', temperature: 1415, duration: 1900 / 2, purity: 1.0 })
	// event.fuel({ ingredient: 'gtceu:chipped_coal_gem', temperature: 1415, duration: 1900 / 4, purity: 1.0 })

	event.fuel({ ingredient: 'gtceu:coal_dust', temperature: 1415, duration: 600, purity: 0.85 })
	event.fuel({ ingredient: 'gtceu:small_coal_dust', temperature: 1415, duration: 600 / 4, purity: 0.85 })
	event.fuel({ ingredient: 'gtceu:tiny_coal_dust', temperature: 1415, duration: Math.floor(600 / 9), purity: 0.85 }) // [PORT-FIX] duration — int в кодеке Fuel

	// [PORT-Ф4-TODO] блоки tfg:wood/* (beech/araucaria/mahoe) ещё не зарегистрированы в startup_scripts/tfg_port (Ф4)
	// event.fuel({ ingredient: 'tfg:wood/wood/beech', temperature: 720, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/log/beech', temperature: 720, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/stripped_wood/beech', temperature: 720, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/stripped_log/beech', temperature: 720, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/wood/araucaria', temperature: 627, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/log/araucaria', temperature: 627, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/stripped_wood/araucaria', temperature: 627, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/stripped_log/araucaria', temperature: 627, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/wood/mahoe', temperature: 651, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/log/mahoe', temperature: 651, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/stripped_wood/mahoe', temperature: 651, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'tfg:wood/stripped_log/mahoe', temperature: 651, duration: 3000, purity: 0.95 })

	// [PORT] wan_ancient_beasts отсутствует в 1.21.1
	// event.fuel({ ingredient: 'wan_ancient_beasts:ginkgo_wood', temperature: 690, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'wan_ancient_beasts:ginkgo_log', temperature: 690, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'wan_ancient_beasts:stripped_ginkgo_wood', temperature: 690, duration: 3000, purity: 0.95 })
	// event.fuel({ ingredient: 'wan_ancient_beasts:stripped_ginkgo_log', temperature: 690, duration: 3000, purity: 0.95 })
}


function registerTFCLampFuels(event) {
	event.lampFuel({ fluid: 'gtceu:creosote' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 1000 })
	event.lampFuel({ fluid: 'gtceu:oil' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 1000 })
	// [PORT-FIX] GTM 8.0: oil_light/oil_medium/oil_heavy переименованы в light_oil/raw_oil/heavy_oil
	event.lampFuel({ fluid: 'gtceu:light_oil' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 1000 })
	event.lampFuel({ fluid: 'gtceu:raw_oil' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 1000 })
	event.lampFuel({ fluid: 'gtceu:heavy_oil' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 1000 })
	event.lampFuel({ fluid: 'gtceu:seed_oil' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 7000 })
	event.lampFuel({ fluid: 'gtceu:fish_oil' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 7000 })
	// [PORT-Ф2] tfg:peanut_oil — флюид кастомного GT-материала TFG (upstream-баг регистрации материалов)
	// event.lampFuel({ fluid: 'tfg:peanut_oil' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: 7000 })
	event.lampFuel({ fluid: 'gtceu:glowstone' /* [PORT-FIX] FluidIngredient — строкой */, lamps: '#tfc:lamps', burn_rate: -1 })
}


function registerTFCFertilizers(event) {
	event.fertilizer({ ingredient: 'gtceu:fertilizer', nitrogen: 0.15, phosphorus: 0.15, potassium: 0.15 })

	event.fertilizer({ ingredient: 'gtceu:tiny_potassium_dust', potassium: 0.016 })
	event.fertilizer({ ingredient: 'gtceu:small_potassium_dust', potassium: 0.037 })
	event.fertilizer({ ingredient: 'gtceu:potassium_dust', potassium: 0.15 })

	event.fertilizer({ ingredient: 'gtceu:tiny_phosphorus_dust', phosphorus: 0.016 })
	event.fertilizer({ ingredient: 'gtceu:small_phosphorus_dust', phosphorus: 0.037 })
	event.fertilizer({ ingredient: 'gtceu:phosphorus_dust', phosphorus: 0.15 })

	event.fertilizer({ ingredient: 'gtceu:tiny_bone_dust', phosphorus: 0.01 })
	event.fertilizer({ ingredient: 'gtceu:small_bone_dust', phosphorus: 0.025 })

	event.fertilizer({ ingredient: 'gtceu:tiny_apatite_dust', phosphorus: 0.016 })
	event.fertilizer({ ingredient: 'gtceu:small_apatite_dust', phosphorus: 0.037 })
	event.fertilizer({ ingredient: 'gtceu:apatite_dust', phosphorus: 0.15 })

	event.fertilizer({ ingredient: 'gtceu:tiny_tricalcium_phosphate_dust', phosphorus: 0.016 })
	event.fertilizer({ ingredient: 'gtceu:small_tricalcium_phosphate_dust', phosphorus: 0.037 })
	event.fertilizer({ ingredient: 'gtceu:tricalcium_phosphate_dust', phosphorus: 0.15 })

	event.fertilizer({ ingredient: 'gtceu:tiny_phosphate_dust', phosphorus: 0.02 })
	event.fertilizer({ ingredient: 'gtceu:small_phosphate_dust', phosphorus: 0.05 })
	event.fertilizer({ ingredient: 'gtceu:phosphate_dust', phosphorus: 0.2 })

	event.fertilizer({ ingredient: 'gtceu:tiny_saltpeter_dust', nitrogen: 0.01, potassium: 0.038 })
	event.fertilizer({ ingredient: 'gtceu:small_saltpeter_dust', nitrogen: 0.025, potassium: 0.0875 })
	event.fertilizer({ ingredient: 'gtceu:saltpeter_dust', nitrogen: 0.10, potassium: 0.35 })

	event.fertilizer({ ingredient: 'gtceu:tiny_rock_salt_dust', potassium: 0.025 })
	event.fertilizer({ ingredient: 'gtceu:small_rock_salt_dust', potassium: 0.0625 })
	event.fertilizer({ ingredient: 'gtceu:rock_salt_dust', potassium: 0.25 })

	event.fertilizer({ ingredient: 'gtceu:tiny_potassium_sulfate_dust', potassium: 0.03 })
	event.fertilizer({ ingredient: 'gtceu:small_potassium_sulfate_dust', potassium: 0.075 })
	event.fertilizer({ ingredient: 'gtceu:potassium_sulfate_dust', potassium: 0.3 })

	event.fertilizer({ ingredient: 'gtceu:tiny_ammonium_chloride_dust', nitrogen: 0.03 })
	event.fertilizer({ ingredient: 'gtceu:small_ammonium_chloride_dust', nitrogen: 0.075 })
	event.fertilizer({ ingredient: 'gtceu:ammonium_chloride_dust', nitrogen: 0.3 })

	event.fertilizer({ ingredient: 'gtceu:tiny_ash_dust', phosphorus: 0.01, potassium: 0.03 })
	event.fertilizer({ ingredient: 'gtceu:small_ash_dust', phosphorus: 0.025, potassium: 0.075 })
	event.fertilizer({ ingredient: 'gtceu:ash_dust', phosphorus: 0.1, potassium: 0.3 })

	event.fertilizer({ ingredient: 'gtceu:tiny_dark_ash_dust', phosphorus: 0.01, potassium: 0.03 })
	event.fertilizer({ ingredient: 'gtceu:small_dark_ash_dust', phosphorus: 0.025, potassium: 0.075 })
	event.fertilizer({ ingredient: 'gtceu:dark_ash_dust', phosphorus: 0.1, potassium: 0.3 })

	event.fertilizer({ ingredient: 'ae2:ender_dust', nitrogen: 0.5, potassium: 0.5 })
	event.fertilizer({ ingredient: 'gtceu:small_ender_pearl_dust', nitrogen: 0.125, potassium: 0.125 })
	event.fertilizer({ ingredient: 'gtceu:tiny_ender_pearl_dust', nitrogen: 0.055, potassium: 0.055 })
}


function registerTFCKnappingTypes(event) {
	// [PORT-FIX] knappingType(item, amount, amountToConsume, sound, consumeAfter, offTexture, particles, jeiIcon, id)
	//            -> codec-объект KnappingType (FLAT_CODEC, формат как data/tfc/tfc/knapping_type/*.json) + id вторым аргументом
	// [PORT-FIX] KubeJS конструирует KnappingType по именам ПОЛЕЙ класса (bean),
	// а не по codec-ключам (см. run/kubejs пример kubejs_tfc)
	event.knappingType({
		inputItem: Ingredient.of('minecraft:flint', 1),
		amountToConsume: 1,
		clickSound: 'tfc:item.knapping.stone',
		consumeAfterComplete: true,
		hasOffTexture: false,
		spawnsParticles: true,
		icon: 'minecraft:flint'
	}, 'tfg:flint')

	event.knappingType({
		inputItem: Ingredient.of('tfc:straw', 4),
		amountToConsume: 4,
		clickSound: 'tfc:item.knapping.leather',
		consumeAfterComplete: false,
		hasOffTexture: false,
		spawnsParticles: false,
		icon: 'tfc:straw'
	}, 'tfg:straw')
}
