// [PORT-FIX] KubeJS 7: server-скрипты ДЕЛЯТ top-level scope — имена const должны быть уникальны между файлами
// priority: 0
"use strict";

// [PORT] Портировано из tfc/recipes.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerTFCRecipes -> прямой обработчик ServerEvents.recipes (KubeJS 7: изолированные скоупы);
// [PORT] removeTFCRecipes -> tfc.recipes.removes.js; registerTFCMetalsRecipes/registerTFCDyeRecipes -> отдельные файлы порта
// [PORT] Основные замены: forge:* -> c:* (tools/* в ед. числе), tfc:foods/breads -> c:foods/bread,
// [PORT] tfc:foods/fruits -> c:foods/fruit, tfc:knives -> c:tools/knife, tfc:sweetener -> tfc:foods/sweeteners,
// [PORT] tfg:alcohols -> tfc:alcohols (tfc_gourmet отсутствует), tfc:any_water -> tfc:any_infinite_water (тег удалён в TFC 4.x)
// [PORT] kubejs_tfc 2.0: barrel_sealed(fluid, duration), barrel_instant(fluid), TFC.fluidStackIngredient удалён ('fluid amount'/'#tag amount'),
// [PORT] TFC.ingredient.heatable(min, null) -> TFC.ingredient.heat(min), TFC.isp.copyInput() -> TFC.isp.empty().copy(),
// [PORT] .chance(N) у heating -> ISP-модификатор tfc:chance (TFC.isp.of(...).chance(N))

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfc.recipes start')

	event.remove({ mod: 'tfc', type: 'tfc:casting' });

	// Доменная печь
	event.recipes.gtceu.shaped('tfc:blast_furnace', [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: '#c:double_plates/wrought_iron', // [PORT] forge: -> c:
		B: 'tfc:crucible'
	}).id('tfc:crafting/blast_furnace')

	// Тыква -> Кусочки тыквы
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('4x tfc:food/pumpkin_chunks').copyFood(), // [PORT] TFC.itemStackProvider -> TFC.isp
		[TFC.ingredient.and('tfc:pumpkin', TFC.ingredient.notRotten()), '#c:tools/hammer'], 'tfc:pumpkin') // [PORT] forge:tools/hammers -> c:tools/hammer; [PORT-FIX] notRotten(string) -> and(x, notRotten()) (kubejs_tfc 2.0)
		.id(`tfc:crafting/pumpkin_chunks_hammer`)

	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('4x tfc:food/pumpkin_chunks').copyFood(),
		[TFC.ingredient.and('tfc:pumpkin', TFC.ingredient.notRotten()), '#c:tools/knife'], 'tfc:pumpkin') // [PORT] tfc:knives -> c:tools/knife (TFC 4.x); [PORT-FIX] notRotten(string) -> and(x, notRotten()) (kubejs_tfc 2.0)
		.id(`tfc:crafting/pumpkin_chunks_knife`)

	// Flux + Lime
	event.smelting('tfc:powder/lime', 'tfc:powder/flux')
		.id('tfg:smelting/lime')

	event.recipes.gtceu.macerator('flux')
		.itemInputs('#tfc:fluxstone')
		.itemOutputs('2x tfc:powder/flux')
		.duration(30)
		.EUt(2)

	event.recipes.gtceu.forge_hammer('flux')
		.itemInputs('#tfc:fluxstone')
		.itemOutputs('2x tfc:powder/flux')
		.duration(30)
		.EUt(2)

	// [PORT] greate отсутствует в 1.21.1:
	// event.recipes.greate.pressing('2x tfc:powder/flux', '#tfc:fluxstone')
	// 	.recipeTier(0)
	// 	.id('greate:pressing/flux')

	// Salt Water
	event.recipes.tfc.pot([], Fluid.of('tfc:salt_water', 625), 300, 100)
		.itemOutput('gtceu:small_salt_dust')
		.id('tfg:tfc/pot/salt')

	global.generateMixerRecipe(event, ['#c:dusts/salt'], "#tfg:clean_water 1000",
		[], 2, Fluid.of('tfc:salt_water', 1000), 40, 7, 64, 'tfg:tfc/salt_water') // [PORT] forge: -> c:

	event.recipes.gtceu.centrifuge('centrifuging_tfc_salt_water')
		.inputFluids(Fluid.of('tfc:salt_water', 1000))
		.itemOutputs('1x gtceu:salt_dust')
		.outputFluids(Fluid.of('minecraft:water', 1000))
		.duration(51)
		.EUt(30)
		.circuit(1)

	event.recipes.gtceu.electrolyzer('electrolyze_tfc_salt_water')
		.inputFluids(Fluid.of('tfc:salt_water', 1000))
		.itemOutputs('1x gtceu:sodium_hydroxide_dust', '2x gtceu:small_sodium_hydroxide_dust')
		.outputFluids(Fluid.of('gtceu:chlorine', 500), Fluid.of('gtceu:hydrogen', 500))
		.duration(720)
		.EUt(30)

	// Add circuit to gregtech salt water mixer recipe
	event.remove({ id: 'gtceu:mixer/salt_water' })
	global.generateMixerRecipe(event, ['2x #c:dusts/salt'], Fluid.of('minecraft:water', 1000), [], 1, Fluid.of('gtceu:salt_water', 1000), 40, 7, 64, 'tfg:gtceu/salt_water') // [PORT] forge: -> c:

	// [PORT-FIX] kubejs_tfc 2.0: barrel_instant(input_fluid); .inputFluid() удалён
	event.recipes.tfc.barrel_instant(Fluid.of('minecraft:water', 1000))
		.inputItem(ChemicalHelper.get(TagPrefix.dust, GTMaterials.Salt, 1))
		.outputFluid(Fluid.of('tfc:salt_water', 1000))
		.id('tfg:barrel/water_to_salt_water')

	event.recipes.tfc.barrel_instant(Fluid.of('minecraft:water', 250))
		.inputItem("tfc:powder/salt")
		.outputFluid(Fluid.of('tfc:salt_water', 250))
		.id('tfg:barrel/water_to_salt_water_tfc')

	// Seaweed and kelp
	event.recipes.tfc.heating('tfc:groundcover/seaweed', 200)
		.resultItem('tfc:food/dried_seaweed')
	event.recipes.tfc.heating('tfc:plant/leafy_kelp', 200)
		.resultItem('tfc:food/dried_kelp')
	event.recipes.tfc.heating('tfc:plant/winged_kelp', 200)
		.resultItem('tfc:food/dried_kelp')

	// Burning Bread
	event.recipes.tfc.heating('#c:foods/bread', 850) // [PORT] tfc:foods/breads -> c:foods/bread (TFC 4.x)

	// Soda Ash
	event.smelting('3x tfc:powder/soda_ash', 'tfc:food/dried_seaweed').id('tfg:smelting/dried_seaweed_to_soda')
	event.smelting('3x tfc:powder/soda_ash', 'tfc:food/dried_kelp').id('tfg:smelting/dried_kelp_to_soda')
	event.smelting('3x tfc:powder/soda_ash', 'tfc:food/fresh_seaweed').id('tfg:smelting/fresh_seaweed_to_soda')
	event.smelting('3x tfc:powder/soda_ash', 'tfc:groundcover/seaweed').id('tfg:smelting/seaweed_to_soda')
	event.smelting('3x tfc:powder/soda_ash', 'tfc:plant/winged_kelp').id('tfg:smelting/winged_kelp_to_soda')
	event.smelting('3x tfc:powder/soda_ash', 'tfc:plant/leafy_kelp').id('tfg:smelting/leafy_kelp_to_soda')
	event.smelting('3x tfc:powder/soda_ash', 'tfc:plant/giant_kelp_flower').id('tfg:smelting/giant_kelp_to_soda')

	//More accesible solar drier
	// [PORT-CHECK] рецепт firmalife:crafting/solar_drier с GT-стержнями пока нигде не переопределяется в порте —
	// replaceInput сработает вхолостую, пока не портирован соответствующий firmalife-скрипт
	event.replaceInput({ id: 'firmalife:crafting/solar_drier' }, 'gtceu:stainless_steel_rod', 'gtceu:silver_rod')

	// Kaolinte blocks to powder
	// [PORT-FIX] тега tfc:kaolin_blocks нет в TFC 4.2.5 — перечислены блоки каолина явно
	// [PORT-FIX] .chance() у heating удалён в kubejs_tfc 2.0 -> ISP-модификатор tfc:chance
	event.recipes.tfc.heating(['tfc:white_kaolin_clay', 'tfc:pink_kaolin_clay', 'tfc:red_kaolin_clay'], 500)
		.resultItem(TFC.isp.of('tfc:powder/kaolinite').chance(0.8))
		.id('tfg:tfc/heating/kaolinite_blocks')

	//Lye
	global.generateMixerRecipe(event, 'tfc:powder/wood_ash', "#tfg:clean_water 200",
		[], null, Fluid.of('tfc:lye', 200), 100, 2, 64, 'lye_from_wood_ash')
	global.generateMixerRecipe(event, '#c:dusts/sodium_hydroxide', "#tfg:clean_water 1000",
		[], null, Fluid.of('tfc:lye', 1000), 100, 2, 64, 'lye_from_sodium_hydroxide') // [PORT] forge: -> c:

	event.recipes.gtceu.distillery('lye_to_sodium_hydroxide')
		.inputFluids('tfc:lye 1000')
		.itemOutputs('gtceu:sodium_hydroxide_dust')
		.duration(100)
		.EUt(2)

	// Brass Mechanism
	// [PORT-Ф2] gtceu:small_brass_gear не существует — флаг small_gears для Brass добавляется TFG-модификацией
	// материалов (заблокировано upstream-багом Ф2); вернуть после разблокировки флагов
	// event.replaceInput({ input: 'tfc:brass_mechanisms' }, 'tfc:brass_mechanisms', 'gtceu:small_brass_gear')

	// Rennet
	event.recipes.gtceu.fermenter('tfg:fermenter/vegetable_rennet')
		.itemInputs('#tfg:ferments_to_rennet')
		.itemOutputs('firmalife:rennet')
		.duration(400)
		.EUt(16)

	event.recipes.gtceu.fermenter('tfg:fermenter/biomass_rennet')
		.inputFluids(Fluid.of('gtceu:fermented_biomass', 100))
		.itemOutputs('firmalife:rennet')
		.duration(2400)
		.EUt(16)

	// Brine
	event.recipes.gtceu.mixer('tfg:tfc/brine')
		.inputFluids(Fluid.of('tfc:salt_water', 900))
		.inputFluids(Fluid.of('tfc:vinegar', 100))
		.outputFluids(Fluid.of('tfc:brine', 1000))
		.duration(100)
		.EUt(16)

	// LimeWater + Sand -> Mortar
	event.recipes.gtceu.mixer('mortar')
		.itemInputs('#c:sands') // [PORT] forge:sand -> c:sands
		.inputFluids(Fluid.of('tfc:limewater', 100))
		.itemOutputs('16x tfc:mortar')
		.duration(800)
		.EUt(8)

	// Jar lids

	event.shapeless('8x tfc:jar_lid', [
		'gtceu:tin_ingot',
		'#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		'#c:tools/saw' // [PORT] forge:tools/saws -> c:tools/saw
	]).id('tfc:shapeless/jar_lid')

	event.replaceInput({ mod: 'tfc' }, 'minecraft:sugar', '#tfg:sugars')

	event.replaceInput(
		{ type: 'tfc:pot_jam' },
		'#tfg:sugars',
		'#tfc:foods/sweeteners' // [PORT] tfc:sweetener -> tfc:foods/sweeteners (TFC 4.x)
	)

	// jute net -> burlap net
	event.replaceInput({ id: 'tfc:crafting/jute_net' }, 'tfc:jute_fiber', '#tfg:burlap_fiber')
	// [PORT-FIX] {input:...} без типа падает на чтении GT-жидкостных входов (10000) -> тип-фильтр item-крафта
	event.replaceInput([
		{ type: 'minecraft:crafting_shaped' },
		{ type: 'minecraft:crafting_shapeless' },
		{ type: 'gtceu:shaped' },
		{ type: 'gtceu:shapeless' },
		{ type: 'tfc:advanced_shaped_crafting' },
		{ type: 'tfc:advanced_shapeless_crafting' }
	], 'minecraft:slime_ball', 'tfc:glue')

	// horse armor to use burlap
	global.TFC_EQUIPMENT_METALS.forEach(material => {
		event.replaceInput({ id: `tfc:crafting/${material}_horse_armor` }, `tfc:jute_fiber`, `#tfg:burlap_fiber`)
	})

	event.recipes.gtceu.centrifuge('tfg:soot')
		.itemInputs('tfc:soot')
		.itemOutputs('gtceu:carbon_dust') // [PORT-FIX] тег #forge:dusts/carbon как ВЫХОД невалиден в GTM8 -> конкретный предмет
		.duration(20)
		.EUt(2)

	// [PORT-Ф4-TODO] предмет tfg:large_casing_extruder_mold ещё не зарегистрирован (формы экструдера — Ф4);
	// [PORT] заодно .notConsumable(string) -> .notConsumableItem(...) в GTM8
	// event.recipes.gtceu.extruder('tfg:wrought_iron_grill_electric_only')
	// 	.itemInputs('2x #c:plates/wrought_iron')
	// 	.notConsumableItem('tfg:large_casing_extruder_mold')
	// 	.itemOutputs('tfc:wrought_iron_grill')
	// 	.duration(60)
	// 	.EUt(8)

	// acetic acid to vinegar conversion

	event.recipes.gtceu.mixer('vinegar_from_acetic_acid')
		.inputFluids(
			Fluid.of('minecraft:water', 950),
			Fluid.of('gtceu:acetic_acid', 50)
		)
		.outputFluids(
			Fluid.of('tfc:vinegar', 1000)
		)
		.circuit(1)
		.duration(30)
		.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.distillery('acetic_acid_from_vinegar')
		.inputFluids(
			Fluid.of('tfc:vinegar', 1000)
		)
		.outputFluids(
			Fluid.of('gtceu:acetic_acid', 50)
		)
		.circuit(1)
		.duration(50)
		.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.distillery('water_from_vinegar')
		.inputFluids(
			Fluid.of('tfc:vinegar', 1000)
		)
		.outputFluids(
			Fluid.of('minecraft:water', 950)
		)
		.circuit(2)
		.duration(50)
		.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.distillation_tower('vinegar_distillation')
		.inputFluids(
			Fluid.of('tfc:vinegar', 1000)
		)
		.outputFluids(
			Fluid.of('gtceu:acetic_acid', 50),
			Fluid.of('minecraft:water', 950)
		)
		.duration(80)
		.EUt(GTValues.VA[GTValues.MV])

	// fix alcohol tag for vinegar
	// [PORT-FIX] kubejs_tfc 2.0: barrel_sealed(input_fluid, duration), .inputs() удалён;
	// [PORT-FIX] tfg:alcohols не наполняется (tfc_gourmet отсутствует) -> базовый #tfc:alcohols
	event.recipes.tfc.barrel_sealed('#tfc:alcohols 250', 8000)
		.inputItem('#c:foods/fruit') // [PORT] tfc:foods/fruits -> c:foods/fruit (TFC 4.x)
		.outputFluid(Fluid.of('tfc:vinegar', 250))
		.id('tfc:barrel/vinegar')

	// Clay dust to balls
	event.recipes.tfc.barrel_sealed('minecraft:water 250', 8000)
		.inputItem('gtceu:clay_dust')
		.outputItem('1x minecraft:clay_ball')
		.id('tfc:barrel/clay_ball')

	// Borax to flux
	event.recipes.tfc.quern('4x tfc:powder/flux', 'gtceu:borax_dust')
		.id(`tfg:quern/borax`)

	event.recipes.gtceu.macerator('borax_to_flux')
		.itemInputs("#c:dusts/borax") // [PORT] forge: -> c:
		.itemOutputs("4x tfc:powder/flux")
		.duration(50)
		.EUt(2);

	event.shapeless('4x tfc:fire_clay', ['tfc:fire_clay_block']).id('tfg:shapeless/fire_clay_block_uncraft') // [PORT] явный id

	event.shapeless('4x tfc:kaolin_clay', ['tfc:white_kaolin_clay']).id('tfg:shapeless/white_kaolin_clay_uncraft') // [PORT] явный id
	event.shapeless('4x tfc:kaolin_clay', ['tfc:pink_kaolin_clay']).id('tfg:shapeless/pink_kaolin_clay_uncraft') // [PORT] явный id
	event.shapeless('4x tfc:kaolin_clay', ['tfc:red_kaolin_clay']).id('tfg:shapeless/red_kaolin_clay_uncraft') // [PORT] явный id

	global.TFC_WOOD_TYPES.forEach(element => {
		event.shaped(`4x tfc:wood/fallen_leaves/${element}`, [
			'AA',
			'AA'
		], {
			A: `tfc:wood/leaves/${element}`
		}).id(`tfg:shaped/tfc/${element}_leaves_to_fallen_leaves`);
	});

	/**
	 * @property {string[]} krummholz_types - List of krummholz wood types.
	 */
	const krummholz_types = [
		'aspen',
		'douglas_fir',
		'pine',
		'spruce',
		'white_cedar'
	];
	krummholz_types.forEach(type => {
		event.shaped(`1x tfc:plant/${type}_krummholz`, [
			'A',
			'A'
		], {
			A: `tfc:wood/sapling/${type}`
		}).id(`tfg:shaped/tfc/${type}_krummholz`);
	});

	event.shapeless('minecraft:stick', ['tfc:groundcover/driftwood', '#c:tools/knife']) // [PORT] forge:tools/knives -> c:tools/knife
		.id('tfg:shapeless/driftwood_to_stick')

	// Buff Lamp Glass for easier early game
	event.remove({ id: 'tfc:glassworking/lamp_glass' })
	event.recipes.tfc.glassworking(
		'4x tfc:lamp_glass',
		'#tfc:glass_batches',
		[ // [PORT-FIX] glass_operation требует неймспейс tfc:
			'tfc:blow',
			'tfc:flatten',
			'tfc:blow',
			'tfc:saw'
		]
	).id('tfg:glassworking/lamp_glass')

	event.recipes.gtceu.macerator('tfg:candle')
		.itemInputs("#minecraft:candles")
		.itemOutputs("gtceu:small_wax_dust")
		.duration(50)
		.EUt(2)
		.category(GTRecipeCategories.MACERATOR_RECYCLING);

	event.recipes.tfc.quern("gtceu:small_wax_dust", "#minecraft:candles")
		.id("tfg:quern/candles")
	// [PORT-Ф2] gtceu:wax_nugget не существует — nugget для материала Wax добавляется TFG-флагом (заблокировано Ф2)
	// event.recipes.tfc.quern("gtceu:tiny_wax_dust", "gtceu:wax_nugget")
	// 	.id("tfg:quern/wax_nugget")

	// Hot item cooling
	// [PORT-FIX] kubejs_tfc 2.0: TFC.ingredient.heatable(1, null) -> TFC.ingredient.heat(1) (tfc:heat, min °C);
	// [PORT-FIX] TFC.isp.copyInput() -> TFC.isp.empty().copy() (модификатор tfc:copy_input);
	// [PORT-FIX] tfc:any_water удалён в TFC 4.x -> tfc:any_infinite_water (пресная + солёная)
	event.recipes.tfc.barrel_instant(Fluid.of('gtceu:ice', 1))
		.inputItem(TFC.ingredient.heat(1))
		.outputItem(TFC.isp.empty().copy().addHeat(-20))
		.sound('minecraft:block.fire.extinguish')
		.id('tfg:barrel/ice_slush_cooling')

	event.recipes.tfc.barrel_instant('#firmalife:oils 1')
		.inputItem(TFC.ingredient.heat(1))
		.outputItem(TFC.isp.empty().copy().addHeat(-40))
		.sound('minecraft:block.fire.extinguish')
		.id('tfg:barrel/oils_cooling')

	event.recipes.tfc.barrel_instant('#tfc:any_infinite_water 1')
		.inputItem(TFC.ingredient.heat(1))
		.outputItem(TFC.isp.empty().copy().addHeat(-5))
		.sound('minecraft:block.fire.extinguish')
		.id('tfg:barrel/waters_cooling')
})
