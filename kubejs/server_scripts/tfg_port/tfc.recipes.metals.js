// [PORT-FIX] KubeJS 7: server-скрипты делят top-level scope — const-имена уникальны между файлами
// priority: 0
"use strict";

// [PORT] Порт tfc/recipes.metals.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT] TFC 1.21: рецепты alloy принимают ЖИДКОСТИ ({fluid, min, max}), а не имена металлов;
// [PORT] биндинга TFC.alloyPart в kubejs_tfc 2.0 нет — используются plain-объекты (кодек tfc:alloy AlloyRange).
// [PORT-FIX] Ряд recipe id приведён к дефолтным путям TFC 1.21 (heating/metal/ingot/*, anvil/metal/ingot/*,
// [PORT-FIX] welding/metal/ingot/*, heating/raw_iron_bloom и т.п.), чтобы наши рецепты ЗАМЕНЯЛИ ванильные
// [PORT-FIX] TFC-рецепты (в 1.21 у них новые пути; со старыми id остались бы дубликаты со 100 mB).

// [PORT] global.METALS_VI_DURATION_MULT определялся в startup constants.js оригинала;
// [PORT] в KubeJS 7 server-скрипты не могут писать в global — константа инлайнена локально (как в createvintageneoforged.recipes.js).
const METALS_VI_DURATION_MULT = 4;

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfc.recipes.metals recipes start')

	//#region Alloying

	// Fix ratios of TFC alloys to match GT's
	// [PORT-FIX] TFC 1.21: result — жидкость tfc:metal/*, contents — [{fluid, min, max}]

	event.recipes.tfc.alloy('tfc:metal/bronze', [
		{ fluid: 'tfc:metal/copper', min: 0.7, max: 0.8 },
		{ fluid: 'tfc:metal/tin', min: 0.2, max: 0.3 }
	]).id('tfc:alloy/bronze')

	event.recipes.tfc.alloy('tfc:metal/brass', [
		{ fluid: 'tfc:metal/copper', min: 0.7, max: 0.8 },
		{ fluid: 'tfc:metal/zinc', min: 0.2, max: 0.3 }
	]).id('tfc:alloy/brass')

	// New alloys
	// [PORT-FIX] кастомных TFC-металлов tfg:* в 1.21 нет — вместо них жидкости GT (gtceu:*),
	// [PORT-FIX] жидкости TFC-металлов остаются tfc:metal/*

	event.recipes.tfc.alloy('gtceu:red_alloy', [
		{ fluid: 'gtceu:redstone', min: 0.75, max: 0.85 },
		{ fluid: 'tfc:metal/copper', min: 0.15, max: 0.25 }
	]).id('tfg:alloy/red_alloy')

	event.recipes.tfc.alloy('gtceu:tin_alloy', [
		{ fluid: 'tfc:metal/tin', min: 0.45, max: 0.55 },
		{ fluid: 'tfc:metal/cast_iron', min: 0.45, max: 0.55 }
	]).id('tfg:alloy/tin_alloy')

	event.recipes.tfc.alloy('gtceu:invar', [
		{ fluid: 'tfc:metal/nickel', min: 0.30, max: 0.40 },
		{ fluid: 'tfc:metal/cast_iron', min: 0.60, max: 0.70 }
	]).id('tfg:alloy/invar')

	event.recipes.tfc.alloy('gtceu:potin', [
		{ fluid: 'tfc:metal/copper', min: 0.63, max: 0.69 },
		{ fluid: 'tfc:metal/tin', min: 0.19, max: 0.25 },
		{ fluid: 'gtceu:lead', min: 0.08, max: 0.14 }
	]).id('tfg:alloy/potin')

	// [PORT-Ф2] gtceu:aluminium_silicate — кастомный GT-материал TFG (регистрация материалов Ф2 заблокирована,
	// [PORT-Ф2] жидкости gtceu:aluminium_silicate нет в реестре) — рецепт закомментирован
	// event.recipes.tfc.alloy('gtceu:cobalt_brass', [
	// 	{ fluid: 'tfc:metal/brass', min: 0.74, max: 0.81 },
	// 	{ fluid: 'gtceu:cobalt', min: 0.08, max: 0.14 },
	// 	{ fluid: 'gtceu:aluminium_silicate', min: 0.08, max: 0.14 }
	// ]).id('tfg:alloy/cobalt_brass')

	//#endregion

	//#region Рецепты ковки TFC слитков в GT машинах

	// Сырая крица -> Укрепленная крица
	event.recipes.gtceu.forge_hammer('tfg/refined_bloom')
		.itemInputs('tfc:raw_iron_bloom')
		.itemOutputs('tfc:refined_iron_bloom')
		.duration(200)
		.EUt(4)

	// Укрепленная крица -> Слиток кованного железа
	event.recipes.gtceu.forge_hammer('tfg/wrought_iron_ingot')
		.itemInputs('tfc:refined_iron_bloom')
		.itemOutputs('gtceu:wrought_iron_ingot')
		.duration(200)
		.EUt(4)

	// Чугун -> Высокоуглеродная сталь
	event.recipes.gtceu.forge_hammer('tfg/high_carbon_steel')
		.itemInputs('tfc:metal/ingot/pig_iron')
		.itemOutputs('tfc:metal/ingot/high_carbon_steel')
		.duration(300)
		.EUt(4)

	// Высокоуглеродная сталь -> Cталь
	event.recipes.gtceu.forge_hammer('tfg/steel')
		.itemInputs('tfc:metal/ingot/high_carbon_steel')
		.itemOutputs('gtceu:steel_ingot')
		.duration(300)
		.EUt(4)

	// Высокоуглеродная черная сталь -> черная сталь
	event.recipes.gtceu.forge_hammer('tfg/black_steel')
		.itemInputs('tfc:metal/ingot/high_carbon_black_steel')
		.itemOutputs('tfc:metal/ingot/black_steel')
		.duration(300)
		.EUt(4)

	// Высокоуглеродная синяя сталь -> синяя сталь
	event.recipes.gtceu.forge_hammer('tfg/blue_steel')
		.itemInputs('tfc:metal/ingot/high_carbon_blue_steel')
		.itemOutputs('tfc:metal/ingot/blue_steel')
		.duration(400)
		.EUt(4)

	// Высокоуглеродная красная сталь -> красная сталь
	event.recipes.gtceu.forge_hammer('tfg/red_steel')
		.itemInputs('tfc:metal/ingot/high_carbon_red_steel')
		.itemOutputs('tfc:metal/ingot/red_steel')
		.duration(400)
		.EUt(4)

	// Слабая сталь + Чугун -> Высокоуглеродная черная сталь
	// [PORT-FIX] kubejs_tfc 2.0: конструктор welding принимает 3 аргумента, tier задаётся методом .tier()
	// [PORT-FIX] id заменён на дефолтный TFC 1.21 (tfc:welding/metal/ingot/high_carbon_black_steel), чтобы переопределить ванильный рецепт (tier -1)
	event.recipes.tfc.welding(TFC.isp.of('tfc:metal/ingot/high_carbon_black_steel').copyHeat(), 'tfc:metal/ingot/weak_steel', 'tfc:metal/ingot/pig_iron')
		.tier(4)
		.id('tfc:welding/metal/ingot/high_carbon_black_steel')

	// [PORT] greate отсутствует в сборке 1.21.1:
	// event.recipes.greate.compacting('tfc:metal/ingot/high_carbon_black_steel',
	// 	['tfc:metal/ingot/weak_steel', 'tfc:metal/ingot/pig_iron', 'tfc:powder/flux'])
	// 	.heated()
	// 	.recipeTier(1)
	// 	.id(`greate:compacting/high_carbon_black_steel`)

	event.recipes.gtceu.alloy_smelter('tfg/high_carbon_black_steel')
		.itemInputs('tfc:metal/ingot/weak_steel', 'tfc:metal/ingot/pig_iron')
		.itemOutputs('2x tfc:metal/ingot/high_carbon_black_steel')
		.duration(600)
		.EUt(4)

	// Слабая синяя сталь + Черная сталь -> Высокоуглеродная синяя сталь
	event.recipes.tfc.welding(TFC.isp.of('tfc:metal/ingot/high_carbon_blue_steel').copyHeat(), 'tfc:metal/ingot/weak_blue_steel', 'tfc:metal/ingot/black_steel')
		.tier(5)
		.id('tfc:welding/metal/ingot/high_carbon_blue_steel') // [PORT-FIX] дефолтный id TFC 1.21 (переопределение)

	// [PORT] greate отсутствует в сборке 1.21.1:
	// event.recipes.greate.compacting('tfc:metal/ingot/high_carbon_blue_steel',
	// 	['tfc:metal/ingot/weak_blue_steel', 'tfc:metal/ingot/black_steel', 'tfc:powder/flux'])
	// 	.heated()
	// 	.recipeTier(1)
	// 	.id(`greate:compacting/high_carbon_blue_steel`)

	event.recipes.gtceu.alloy_smelter('tfg/high_carbon_blue_steel')
		.itemInputs('tfc:metal/ingot/weak_blue_steel', 'tfc:metal/ingot/black_steel')
		.itemOutputs('2x tfc:metal/ingot/high_carbon_blue_steel')
		.duration(700)
		.EUt(4)

	// Слабая красная сталь + Черная сталь -> Высокоуглеродная красная сталь
	event.recipes.tfc.welding(TFC.isp.of('tfc:metal/ingot/high_carbon_red_steel').copyHeat(), 'tfc:metal/ingot/weak_red_steel', 'tfc:metal/ingot/black_steel')
		.tier(5)
		.id('tfc:welding/metal/ingot/high_carbon_red_steel') // [PORT-FIX] дефолтный id TFC 1.21 (переопределение)

	// [PORT] greate отсутствует в сборке 1.21.1:
	// event.recipes.greate.compacting('tfc:metal/ingot/high_carbon_red_steel',
	// 	['tfc:metal/ingot/weak_red_steel', 'tfc:metal/ingot/black_steel', 'tfc:powder/flux'])
	// 	.heated()
	// 	.recipeTier(1)
	// 	.id(`greate:compacting/high_carbon_red_steel`)

	event.recipes.gtceu.alloy_smelter('tfg/high_carbon_red_steel')
		.itemInputs('tfc:metal/ingot/weak_red_steel', 'tfc:metal/ingot/black_steel')
		.itemOutputs('2x tfc:metal/ingot/high_carbon_red_steel')
		.duration(700)
		.EUt(4)


	const TFC_INTERMEDIATE_METALS =
		[
			{ metal: 'pig_iron', meltTemp: 1535 },
			{ metal: 'high_carbon_steel', meltTemp: 1540 },
			{ metal: 'high_carbon_black_steel', meltTemp: 1540 },
			{ metal: 'high_carbon_red_steel', meltTemp: 1540 },
			{ metal: 'high_carbon_blue_steel', meltTemp: 1540 },
			{ metal: 'weak_steel', meltTemp: 1540 },
			{ metal: 'weak_blue_steel', meltTemp: 1540 },
			{ metal: 'weak_red_steel', meltTemp: 1540 },
			{ metal: 'unknown', meltTemp: 400 }
		]

	TFC_INTERMEDIATE_METALS.forEach(x => {

		// [PORT-FIX] break_chance — опциональный ключ схемы, задаётся методом .breakChance() (как tier у welding)
		event.recipes.tfc.casting(`tfc:metal/ingot/${x.metal}`, 'tfc:ceramic/ingot_mold', Fluid.of(`tfc:metal/${x.metal}`, 144))
			.breakChance(0.1)
			.id(`tfc:casting/${x.metal}_ingot`)

		event.recipes.tfc.casting(`tfc:metal/ingot/${x.metal}`, 'tfc:ceramic/fire_ingot_mold', Fluid.of(`tfc:metal/${x.metal}`, 144))
			.breakChance(0.01)
			.id(`tfc:casting/${x.metal}_fire_ingot`)

		// [PORT-FIX] id заменён на дефолтный TFC 1.21 (tfc:heating/metal/ingot/<metal> вместо tfc:heating/metal/<metal>_ingot),
		// [PORT-FIX] иначе остался бы ванильный рецепт на 100 mB рядом с нашим на 144 mB
		event.recipes.tfc.heating(`tfc:metal/ingot/${x.metal}`, x.meltTemp)
			.resultFluid(Fluid.of(`tfc:metal/${x.metal}`, 144))
			.id(`tfc:heating/metal/ingot/${x.metal}`)

		// [PORT-CHECK] 1.21: NBT удалён, заполненная форма хранит жидкость в data-компоненте TFC —
		// [PORT-CHECK] рецепты create:filling с Item.of(...{tank:...}).strongNBT() не переносимы напрямую, закомментированы
		// event.recipes.create.filling(
		// 	Item.of('tfc:ceramic/ingot_mold',
		// 		{
		// 			tank: {
		// 				FluidName: `tfc:metal/${x.metal}`,
		// 				Amount: 144
		// 			}
		// 		}),
		// 	[
		// 		Fluid.of(`tfc:metal/${x.metal}`, 144),
		// 		Item.of('tfc:ceramic/ingot_mold').strongNBT()
		// 	])
		// 	.id(`tfg:tfc/filling/${x.metal}_ingot`)

		// event.recipes.create.filling(
		// 	Item.of('tfc:ceramic/fire_ingot_mold',
		// 		{
		// 			tank: {
		// 				FluidName: `tfc:metal/${x.metal}`,
		// 				Amount: 144
		// 			}
		// 		}),
		// 	[
		// 		Fluid.of(`tfc:metal/${x.metal}`, 144),
		// 		Item.of('tfc:ceramic/fire_ingot_mold').strongNBT()
		// 	]
		// ).id(`tfg:tfc/filling/${x.metal}_fire_ingot`)
	})

	//#endregion

	//#region Фикс рецептов металлических предметов

	// Рецепт Jacks
	// [PORT-FIX] kubejs_tfc 2.0: tier задаётся методом .tier(); forge: -> c:
	event.recipes.tfc.welding(TFC.isp.of('tfc:jacks').copyHeat().copyForgingBonus(), '#c:rods/brass', '#c:plates/brass')
		.tier(2)
		.id(`tfc:welding/jacks`)

	// [PORT] greate отсутствует в сборке 1.21.1:
	// event.recipes.greate.compacting('tfc:jacks', ['#c:rods/brass', '#c:plates/brass', 'tfc:powder/flux'])
	// 	.heated()
	// 	.recipeTier(0)
	// 	.id('greate:compacting/jacks')

	// Декрафт Jacks
	event.recipes.tfc.heating('tfc:jacks', 930)
		.resultFluid(Fluid.of('gtceu:brass', 144))
		.id(`tfc:heating/jacks`)

	// Декрафт Gem Saw
	event.recipes.tfc.heating('tfc:gem_saw', 930)
		.resultFluid(Fluid.of('gtceu:brass', 72))
		.id(`tfc:heating/gem_saw`)

	// Декрафт сырой крицы в жидкость
	// [PORT-FIX] id заменён на дефолтный TFC 1.21 tfc:heating/raw_iron_bloom (было tfc:heating/raw_bloom — остался бы ванильный дубликат)
	event.recipes.tfc.heating(`tfc:raw_iron_bloom`, 1535)
		.resultFluid(Fluid.of('gtceu:iron', 144))
		.id(`tfc:heating/raw_iron_bloom`)

	// Декрафт укрепленной крицы в жидкость
	// [PORT-FIX] id заменён на дефолтный TFC 1.21 tfc:heating/refined_iron_bloom (было tfc:heating/refined_bloom)
	event.recipes.tfc.heating(`tfc:refined_iron_bloom`, 1535)
		.resultFluid(Fluid.of('gtceu:iron', 144))
		.id(`tfc:heating/refined_iron_bloom`)

	// Гриль
	// [PORT-FIX] id заменён на дефолтный TFC 1.21 tfc:heating/wrought_iron_grill (было tfc:heating/grill)
	event.recipes.tfc.heating('tfc:wrought_iron_grill', 1535)
		.resultFluid(Fluid.of('gtceu:iron', 288))
		.id(`tfc:heating/wrought_iron_grill`)

	// Wrought Iron Grill
	event.recipes.tfc.anvil('tfc:wrought_iron_grill', '#c:double_plates/wrought_iron', ['punch_last', 'draw_any', 'punch_not_last']) // [PORT] forge: -> c:
		.tier(3)
		.id(`tfc:anvil/wrought_iron_grill`)

	// Ванильная дверь декрафт
	event.recipes.tfc.heating('minecraft:iron_door', 1535)
		.resultFluid(Fluid.of('gtceu:iron', 288))
		.id(`tfc:heating/iron_door`)

	// Ванильная дверь на наковальне
	event.recipes.tfc.anvil('minecraft:iron_door', '#c:double_plates/wrought_iron', ['hit_last', 'draw_not_last', 'punch_not_last']) // [PORT] forge: -> c:
		.tier(3)
		.id(`tfc:anvil/iron_door`)

	// Bloom -> Wrought Iron Ingot
	// [PORT-FIX] id заменён на дефолтный TFC 1.21 tfc:anvil/refined_iron_bloom (было tfc:anvil/wrought_iron_from_bloom),
	// [PORT-FIX] чтобы переопределить ванильный рецепт (который даёт tfc:metal/ingot/wrought_iron)
	event.recipes.tfc.anvil('gtceu:wrought_iron_ingot', 'tfc:refined_iron_bloom', ['hit_last', 'hit_second_last', 'hit_third_last'])
		.tier(2)
		.id('tfc:anvil/refined_iron_bloom')

	// High Carbon Steel Ingot -> Steel Ingot
	// [PORT-FIX] id-ы четырёх рецептов ниже заменены на дефолтные TFC 1.21 tfc:anvil/metal/ingot/<metal> (были tfc:anvil/<metal>_ingot)
	event.recipes.tfc.anvil('gtceu:steel_ingot', 'tfc:metal/ingot/high_carbon_steel', ['hit_last', 'hit_second_last', 'hit_third_last'])
		.tier(3)
		.id('tfc:anvil/metal/ingot/steel')

	// High Carbon Black Steel Ingot -> Black Steel Ingot
	event.recipes.tfc.anvil('tfc:metal/ingot/black_steel', 'tfc:metal/ingot/high_carbon_black_steel', ['hit_last', 'hit_second_last', 'hit_third_last'])
		.tier(4)
		.id('tfc:anvil/metal/ingot/black_steel')

	// High Carbon Red Steel Ingot -> Red Steel Ingot
	event.recipes.tfc.anvil('tfc:metal/ingot/red_steel', 'tfc:metal/ingot/high_carbon_red_steel', ['hit_last', 'hit_second_last', 'hit_third_last'])
		.tier(5)
		.id('tfc:anvil/metal/ingot/red_steel')

	// High Carbon Blue Steel Ingot -> Blue Steel Ingot
	event.recipes.tfc.anvil('tfc:metal/ingot/blue_steel', 'tfc:metal/ingot/high_carbon_blue_steel', ['hit_last', 'hit_second_last', 'hit_third_last'])
		.tier(5)
		.id('tfc:anvil/metal/ingot/blue_steel')

	// Cast iron -> Raw Iron Bloom
	event.recipes.tfc.bloomery('tfc:raw_iron_bloom', 'minecraft:charcoal', Fluid.of('gtceu:iron', 144), 15000)
		.id('tfc:bloomery/raw_iron_bloom')

	// Cast Iron -> Pig Iron
	// [PORT-FIX] тега tfc:flux в 1.21 нет — используется tfc:welding_flux (содержит tfc:powder/flux)
	event.recipes.tfc.blast_furnace(Fluid.of('tfc:metal/pig_iron', 1), '#tfc:welding_flux', Fluid.of('gtceu:iron', 1))
		.id('tfc:blast_furnace/pig_iron')

	//#endregion

	//#region Gravel Deposit Washing
	const deposit_ores = [
		'native_gold',
		'native_copper',
		'native_silver',
		'cassiterite'
	];

	global.TFC_STONE_TYPES.forEach(stone => {
		deposit_ores.forEach(ore => {

			event.recipes.gtceu.ore_washer(`tfc:ore_washer/water/deposit/${ore}/${stone}`)
				.itemInputs(`1x tfc:deposit/${ore}/${stone}`)
				.inputFluids("#tfg:clean_water 100")
				.chancedOutput(`1x gtceu:${ore.replace(/native_/g, '')}_dust`, 6000)
				.chancedOutput(`1x gtceu:small_${ore.replace(/native_/g, '')}_dust`, 5000)
				.duration(40)
				.EUt(GTValues.VHA[GTValues.LV])

			event.recipes.gtceu.ore_washer(`tfc:ore_washer/distilled_water/deposit/${ore}/${stone}`)
				.itemInputs(`1x tfc:deposit/${ore}/${stone}`)
				.inputFluids(Fluid.of('gtceu:distilled_water', 50))
				.chancedOutput(`1x gtceu:${ore.replace(/native_/g, '')}_dust`, 6000)
				.chancedOutput(`1x gtceu:small_${ore.replace(/native_/g, '')}_dust`, 5000)
				.duration(20)
				.EUt(GTValues.VHA[GTValues.LV])

			// [PORT] greate отсутствует в сборке 1.21.1 (splashing с fluid-входом и recipeTier — механика greate):
			// event.recipes.greate.splashing(
			// 	[
			// 		Item.of(`1x gtceu:${ore.replace(/native_/g, '')}_dust`).withChance(0.6),
			// 		Item.of(`1x gtceu:small_${ore.replace(/native_/g, '')}_dust`).withChance(0.5)
			// 	],
			// 	[
			// 		`1x tfc:deposit/${ore}/${stone}`,
			// 		Fluid.of('minecraft:water', 250)
			// 	])
			// 	.recipeTier(1)
			// 	.circuitNumber(1)
			// 	.id(`tfg:splashing/${ore}/${stone}_deposit`)

			// event.recipes.greate.splashing(
			// 	[
			// 		Item.of(`1x gtceu:${ore.replace(/native_/g, '')}_dust`).withChance(0.6),
			// 		Item.of(`1x gtceu:small_${ore.replace(/native_/g, '')}_dust`).withChance(0.5)
			// 	],
			// 	[
			// 		`1x tfc:deposit/${ore}/${stone}`,
			// 		Fluid.of('gtceu:distilled_water', 25)
			// 	])
			// 	.recipeTier(1)
			// 	.circuitNumber(2)
			// 	.id(`tfg:splashing/${ore}/${stone}_deposit_distilled`)

			// [PORT] vintageimprovements -> createvintageneoforged
			// [PORT-FIX] шансовые выходы — plain-объекты {id, chance} (CVI-схемы не принимают ProcessingOutput из Item.of().withChance())
			event.recipes.createvintageneoforged.vibrating(
				[
					{ id: `gtceu:${ore.replace(/native_/g, '')}_dust`, chance: 0.6 },
					{ id: `gtceu:small_${ore.replace(/native_/g, '')}_dust`, chance: 0.5 }
				],
				`tfc:deposit/${ore}/${stone}`)
				.processingTime(100 * METALS_VI_DURATION_MULT) // [PORT] global. убран — константа локальная
				.id(`tfg:vi/vibrating/deposits/${stone}_${ore}`)
		})
	})
	//#endregion
})
