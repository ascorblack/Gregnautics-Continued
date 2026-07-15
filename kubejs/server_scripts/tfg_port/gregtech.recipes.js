// [PORT-FIX] KubeJS 7: server-скрипты делят top-level scope — const-имена уникальны между файлами
// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/gregtech/recipes.js (Фаза 3).
// Вызовы registerGTCEURecyclingRecipes / registerGTCEuMachineRecipes / removeGTCEURecipes
// удалены: эти функции живут в соседних файлах (recipes.recycling.js / recipes.machines.js /
// recipes.removes.js) и портируются отдельными файлами со своими обработчиками —
// в KubeJS 7 каждый файл имеет изолированный скоуп.
// Главные изменения 1.20→1.21: forge:→c:, .notConsumable(строка)→.notConsumableItem,
// NBT-рецепты (фасады, matchbox, турбинный ротор) — data components, см. [PORT-CHECK].

const $GtRecipesRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $GtRecipesRL = Java.loadClass('net.minecraft.resources.ResourceLocation');

/** Тихая проверка существования предмета — не создаёт warning'ов в логе. */
function gtItemExists(id) {
	try {
		return $GtRecipesRegistries.ITEM.containsKey($GtRecipesRL.parse(id));
	} catch (e) {
		return false;
	}
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port gregtech.recipes start');

	// Drilling fluid from all stone dusts
	// [PORT-Ф2] gtceu:drilling_fluid — материал java-мода TFG (TFGMaterials), в GTM 8 и в
	// нашем стартапе не зарегистрирован. Вернуть при разблокировке кастомных материалов.
	// generateMixerRecipe(event, ['2x #tfg:stone_dusts'], ['gtceu:lubricant 20', "#tfg:clean_water 4000"],
	// 	[], null, Fluid.of('gtceu:drilling_fluid', 5000), 40, 16, 64, 'drilling_fluid')

	// #region Move MV superconductor to mid-late MV instead of post-vac freezer

	event.remove({ id: 'gtceu:shaped/mv_chemical_bath' })
	event.shaped('gtceu:mv_chemical_bath', [
		'ABC',
		'DEA',
		'FGF'
	], {
		A: 'gtceu:mv_conveyor_module',
		B: '#c:glass_blocks', // [PORT] forge:glass -> c:glass_blocks
		C: 'gtceu:copper_single_cable',
		D: 'gtceu:mv_electric_pump',
		// swap one of the tempered glass for a PE pipe to ensure they've finished the plastic part of MV
		E: 'gtceu:polyethylene_normal_fluid_pipe',
		F: '#gtceu:circuits/mv',
		G: 'gtceu:mv_machine_hull'
	}).id('tfg:shaped/mv_chemical_bath')

	event.recipes.gtceu.chemical_bath('tfg:magnesium_diboride_cool_down_distilled_water')
		.itemInputs('gtceu:hot_magnesium_diboride_ingot')
		.inputFluids(Fluid.of('gtceu:distilled_water', 100))
		.itemOutputs('gtceu:magnesium_diboride_ingot')
		.duration(250)
		.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.chemical_bath('tfg:magnesium_diboride_cool_down')
		.itemInputs('gtceu:hot_magnesium_diboride_ingot')
		.inputFluids(Fluid.of('minecraft:water', 100))
		.itemOutputs('gtceu:magnesium_diboride_ingot')
		.duration(400)
		.EUt(GTValues.VA[GTValues.MV])

	// Move EV to after Uranium Reactor

	event.remove({ id: 'gtceu:mixer/uranium_triplatinum' })
	// [PORT] greate отсутствует в сборке 1.21.1
	// event.remove({ id: 'greate:mixing/integration/gtceu/mixer/uranium_triplatinum' })
	event.recipes.gtceu.mixer('tfg:uranium_triplatinum')
		.itemInputs(Item.of('gtceu:uranium_238_dust', 1), Item.of('gtceu:platinum_dust', 3)) // [PORT-FIX] gtceu:uranium_dust -> uranium_238_dust (GTM8 rename)
		.inputFluids(Fluid.of('gtceu:radon', 10))
		.itemOutputs(Item.of('gtceu:uranium_triplatinum_dust', 4))
		.duration(20*10)
		.EUt(GTValues.VA[GTValues.EV])
		.circuit(4)

	event.remove({ id: 'gtceu:alloy_blast_smelter/uranium_triplatinum' })
	event.remove({ id: 'gtceu:alloy_blast_smelter/uranium_triplatinum_gas' })

	event.recipes.gtceu.alloy_blast_smelter('tfg:uranium_triplatinum')
		.itemInputs(Item.of('gtceu:uranium_238_dust', 1), Item.of('gtceu:platinum_dust', 3)) // [PORT-FIX] gtceu:uranium_dust -> uranium_238_dust (GTM8 rename)
		.inputFluids(Fluid.of('gtceu:radon', 10))
		.outputFluids(Fluid.of('gtceu:uranium_triplatinum', 576)) // [PORT-FIX] в GTM8 без префикса molten_ (проверить); было molten_uranium_triplatinum
		.duration(20*150)
		.blastFurnaceTemp(4400)
		.EUt(GTValues.VA[GTValues.EV])
		.circuit(2)

	event.recipes.gtceu.alloy_blast_smelter('tfg:uranium_triplatinum_gas')
		.itemInputs(Item.of('gtceu:uranium_238_dust', 1), Item.of('gtceu:platinum_dust', 3)) // [PORT-FIX] gtceu:uranium_dust -> uranium_238_dust (GTM8 rename)
		.inputFluids(Fluid.of('gtceu:helium', 400), Fluid.of('gtceu:radon', 10))
		.outputFluids(Fluid.of('gtceu:uranium_triplatinum', 576)) // [PORT-FIX] в GTM8 без префикса molten_ (проверить); было molten_uranium_triplatinum
		.duration(20*100.5)
		.blastFurnaceTemp(4400)
		.EUt(GTValues.VA[GTValues.EV])
		.circuit(12)

	// Move Superconductor to EV and make them cheap

	// [PORT-Ф2] ostrum_iodide — кастомный материал TFG (tfg.materials.mars.js), регистрация
	// материалов Ф2 заблокирована (upstream bug) → фольги ostrum_iodide нет. Ванильный
	// рецепт laser_cable оставлен (remove тоже закомментирован, иначе кабель нескрафтить).
	// event.remove({ id: 'gtceu:assembler/laser_cable' })
	// event.recipes.gtceu.assembler('tfg:laser_cable')
	// 	.itemInputs(Item.of('gtceu:laminated_glass', 1), Item.of('2x #forge:foils/ostrum_iodide', 2))
	// 	.itemOutputs(Item.of('gtceu:normal_laser_pipe', 16))
	// 	.inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144))
	// 	.duration(20*5)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('gtceu:normal_laser_pipe', [GTMaterials.Air, 1]) — хелпер мода TFG отсутствует
	// [PORT-Ф2] removes переработки laser_pipe закомментированы вместе с рецептом выше
	// event.remove({ id: 'gtceu:arc_furnace/arc_normal_laser_pipe' })
	// removeMaceratorRecipe(event, 'macerate_normal_laser_pipe') // [PORT] хелпер живёт в recipes.removes.js (изолированный скоуп)

	// #endregion

	//#region Voiding covers

	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/cover_fluid_voiding' },
	// 'minecraft:ender_pearl', 'ae2:ender_dust');

	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:assembler/cover_fluid_voiding' },
	// 'minecraft:ender_pearl', 'ae2:ender_dust');

	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/cover_item_voiding' },
	// 'minecraft:ender_pearl', 'ae2:ender_dust');

	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:assembler/cover_item_voiding' },
	// 'minecraft:ender_pearl', 'ae2:ender_dust');

	//#endregion


	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/nightvision_goggles' }, 'gtceu:glass_lens', 'tfc:lens')
	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/nightvision_goggles' }, 'gtceu:lv_sodium_battery', '#gtceu:batteries/lv')

	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/note_block' }, 'minecraft:iron_bars', '#tfg:metal_bars')
	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/note_block' }, 'gtceu:wood_plate', '#tfc:lumber')

	// [PORT-FIX] тег tfg:sugars не портирован (пустой) — замена сломала бы все рецепты
	// gtceu с сахаром; вернуть после порта tfg/food/tags.food.js
	// event.replaceInput({ mod: 'gtceu' }, 'minecraft:sugar', '#tfg:sugars')
	// [PORT-GTM-REPLACE] replaceInput по GT-рецептам крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ mod: 'gtceu' }, 'minecraft:string', '#c:strings') // [PORT] forge:string -> c:strings

	// [PORT-CHECK] тег tfg:components/uv_leds определяется в tfg/tags.js (ещё не портирован);
	// сами предметы tfg:uv_led / tfg:smd_uv_led уже зарегистрированы (Ф4). Пока тег пуст,
	// blacklight будет нескрафтить — после порта tfg.tags.js всё оживёт.
	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/blacklight' }, 'gtceu:tungsten_carbide_screw', '#tfg:components/uv_leds')


	// Fix Snow in Compressor

	event.remove({ id: 'gtceu:compressor/snowballs_to_snow' })
	event.recipes.gtceu.compressor('gtceu:compressor/snowballs_to_snow_fixed')
		.itemInputs('8x minecraft:snowball')
		.itemOutputs('minecraft:snow_block')
		.duration(20 * 10)
		.EUt(2)

	// Tape
	event.shaped('gtceu:basic_tape', [
		' A ',
		'ABA',
		' A '
	], {
		A: 'minecraft:paper',
		B: 'tfc:glue'
	}).id('tfg:shaped/basic_tape_from_glue')

	event.recipes.gtceu.assembler('basic_tape_from_glue')
		.itemInputs('2x minecraft:paper', 'tfc:glue')
		.itemOutputs('2x gtceu:basic_tape')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])


	// GT Facades
	// [PORT-CHECK] Фасадные рецепты 1.20 построены на NBT ({Facade:...}) + modifyResult;
	// в 1.21 фасад хранится в data component'е GTM — портировать после выяснения формата
	// компонента (иначе краш кодека). Ванильный gtceu:crafting/facade_cover оставлен,
	// remove закомментирован, чтобы фасады оставались скрафчиваемыми.
	// event.remove({ id: 'gtceu:crafting/facade_cover' })
	//
	// event.shapeless(Item.of('gtceu:facade_cover', 8, '{Facade: {Count:1b,id:"minecraft:stone"}}'), ['3x #forge:plates/iron', "#tfg:whitelisted/facades"])
	// 	.modifyResult(...) ... .id('gtceu:facade_cover');
	// event.shapeless(Item.of('gtceu:facade_cover', 32, ...), ['3x #forge:plates/titanium', "#tfg:whitelisted/facades"]) ... .id('gtceu:facade_cover32');
	// event.shapeless(Item.of('gtceu:facade_cover', 8, ...), ['4x gtceu:facade_cover', "#tfg:whitelisted/facades", '4x gtceu:facade_cover']) ... .id('gtceu:facade_cover_recycle');

	// Diamond gear
	if (gtItemExists('gtceu:diamond_gear')) {
		event.recipes.gtceu.laser_engraver('tfg:diamond_gear')
			.itemInputs('4x #c:plates/diamond')
			.itemOutputs('gtceu:diamond_gear') // [PORT-FIX] тег-выход #forge:gears/diamond -> конкретный предмет
			.notConsumableItem('gtceu:glass_lens') // [PORT] .notConsumable(строка) удалён в GTM 8
			.duration(200)
			.EUt(GTValues.VA[GTValues.MV])
	}

	//#region Multiblock Tanks

	event.recipes.gtceu.assembler('tfg:assembler/wood_wall')
		.itemInputs('4x #c:treated_wood', ChemicalHelper.get(TagPrefix.plate, GTMaterials.Copper, 1))
		.itemOutputs('gtceu:wood_wall')
		.circuit(4)
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('tfg:assembler/wooden_multiblock_tank')
		.itemInputs('gtceu:wood_wall', ChemicalHelper.get(TagPrefix.ring, GTMaterials.Copper, 2))
		.itemOutputs('gtceu:wooden_multiblock_tank')
		.circuit(4)
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('tfg:assembler/wooden_tank_valve')
		.itemInputs('gtceu:wood_wall', ChemicalHelper.get(TagPrefix.ring, GTMaterials.Copper, 1), ChemicalHelper.get(TagPrefix.rotor, GTMaterials.Copper, 1))
		.itemOutputs('gtceu:wooden_tank_valve')
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('tfg:assembler/steel_multiblock_tank')
		.itemInputs('gtceu:solid_machine_casing', ChemicalHelper.get(TagPrefix.ring, GTMaterials.Steel, 2))
		.itemOutputs('gtceu:steel_multiblock_tank')
		.circuit(4)
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('tfg:assembler/steel_tank_valve')
		.itemInputs('gtceu:solid_machine_casing', ChemicalHelper.get(TagPrefix.ring, GTMaterials.Steel, 1), ChemicalHelper.get(TagPrefix.rotor, GTMaterials.Steel, 1))
		.itemOutputs('gtceu:steel_tank_valve')
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])

	//#endregion

	//#region Circuit Fixes

	// [PORT-CHECK] addCircuitToRecipe сознательно не портирован (см. 01_server_shared.startup.js):
	// хелпер мутировал recipe.json Gson-хаками формата 1.20, в GTM 8 рецепты на codecs.
	// Константа global.ADD_CIRCUIT уже есть в startup (gtceu.constants.js) — вернуть цикл,
	// когда появится рабочий аналог хелпера.
	// global.ADD_CIRCUIT.forEach(item => {
	// 	addCircuitToRecipe(event, item.recipeId, item.circuitNumber)
	// })

	//#endregion

	// Matches

	event.shapeless('4x gtceu:matches', ['#c:dusts/phosphorus', 'tfc:glue', '4x #c:bolts/wood'])
		.id('tfg:shapeless/phosphorus_matches')

	event.shapeless('4x gtceu:matches', ['#c:dusts/tricalcium_phosphate', 'tfc:glue', '4x #c:bolts/wood'])
		.id('tfg:shapeless/tricalcium_phosphate_matches')

	// [PORT-FIX] NBT {usesLeft:8} убран — в 1.21 это data component GTM (matchbox крафтится полным)
	event.shapeless(Item.of('gtceu:matchbox'), ['minecraft:paper', '8x gtceu:matches'])
		.id('tfg:shapeless/matchbox')

	if (gtItemExists('gtceu:dense_lead_plate')) { // [PORT] dense-пластина свинца зависит от флага GENERATE_DENSE
		event.recipes.gtceu.implosion_compressor('tfg:dense_lead_plate')
			.itemInputs('16x #c:ingots/lead', '16x #c:ingots/lead', '6x #c:ingots/lead')
			.itemInputs('gtceu:industrial_tnt')
			.itemOutputs('4x gtceu:dense_lead_plate') // [PORT-FIX] тег-выход -> конкретный предмет
			.duration(20 * 1)
			.EUt(GTValues.VA[GTValues.LV])
	}

	// Remove Plutonium from centrifuging Uranium dust

	event.remove({ id: 'gtceu:centrifuge/uranium_238_separation' })

	event.recipes.gtceu.centrifuge('tfg:uranium_238_separation')
		.itemInputs('#c:dusts/uranium')
		.chancedOutput('gtceu:tiny_uranium_235_dust', 2300) // [PORT-FIX] тег-выход -> конкретный предмет
		.duration(20*40)
		.EUt(GTValues.VA[GTValues.HV])

	// Change the Large Centrifugal Unit to be craftable at EV

	if (gtItemExists('gtceu:molybdenum_disilicide_spring')) { // [PORT] пружина MoSi2 зависит от флага GENERATE_SPRING
		event.remove({ id: 'gtceu:shaped/large_centrifuge' })

		event.shaped('gtceu:large_centrifuge', [
			'EFE',
			'ADA',
			'BCB'
		], {
			A: '#gtceu:circuits/ev',
			B: 'gtceu:ev_electric_motor',
			C: 'gtceu:aluminium_single_cable',
			D: 'gtceu:ev_centrifuge',
			E: 'gtceu:molybdenum_disilicide_spring',
			F: 'gtceu:stainless_steel_huge_fluid_pipe'
		}).id('tfg:shaped/large_centrifuge')
	}

	// ME Pattern Buffer
	event.remove({ id: 'gtceu:assembly_line/me_pattern_buffer_proxy' })
	event.recipes.gtceu.assembly_line('tfg:me_pattern_buffer_proxy')
		.itemInputs(
			'gtceu:luv_machine_hull',
			'2x gtceu:luv_sensor',
			'#gtceu:circuits/luv',
			'gtceu:fusion_glass',
			'2x ae2:quantum_ring',
			// tom insists on keeping this jank, it feels like a bug to me but apparently it's "intended base gt behaviour"
			'32x gtceu:fine_europium_wire',
			'32x gtceu:fine_europium_wire',
			'16x megacells:accumulation_processor')
		.inputFluids(Fluid.of('gtceu:lubricant', 500))
		.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 4)) // [PORT] жидкость зарегистрирована в tfg.core.fluids.js (Ф4)
		.itemOutputs('gtceu:me_pattern_buffer_proxy')
		.duration(30 * 20)
		.EUt(GTValues.VA[GTValues.ZPM])
		// [PORT-FIX] апстрим-NPE #5106: stationResearch требует уже инициализированного списка условий —
		// cleanroom (addCondition) идёт ПЕРЕД ним
		.cleanroom(CleanroomType.CLEANROOM)
		.stationResearch(b => b.researchStack(Item.of('gtceu:me_pattern_buffer')).EUt(GTValues.VA[GTValues.LuV]).CWUt(32))

	// [PORT] expatternprovider -> extendedae (ремап modid)
	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:assembly_line/me_pattern_buffer' }, 'ae2:pattern_provider', '3x extendedae:ex_pattern_provider')
	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:assembly_line/me_pattern_buffer' }, 'ae2:interface', '3x extendedae:oversize_interface')


	// Modify Rotor Holder to require an Assembler
	// [PORT] каждый тир завёрнут в проверку существования шестерён: часть материалов могла
	// получать GENERATE_GEAR/GENERATE_SMALL_GEAR от TFG (Ф2 заблокирована). Если шестерён нет,
	// ванильный shaped-рецепт остаётся, чтобы Rotor Holder был скрафчиваемым.

	//event.remove({ id: 'gtceu:shaped/rotor_holder_hv' }) Keep it craftable before the Assembler

	if (gtItemExists('gtceu:black_steel_gear') && gtItemExists('gtceu:small_stainless_steel_gear')) {
		event.recipes.gtceu.assembler('tfg:rotor_holder_hv')
			.itemInputs('4x #c:gears/black_steel', '4x #c:small_gears/stainless_steel', 'gtceu:hv_machine_hull')
			.itemOutputs('gtceu:hv_rotor_holder')
			.duration(20 * 6)
			.EUt(GTValues.VA[GTValues.HV])
	}

	if (gtItemExists('gtceu:ultimet_gear') && gtItemExists('gtceu:small_titanium_gear')) {
		event.remove({ id: 'gtceu:shaped/rotor_holder_ev' })
		event.recipes.gtceu.assembler('tfg:rotor_holder_ev')
			.itemInputs('4x #c:gears/ultimet', '4x #c:small_gears/titanium', 'gtceu:ev_machine_hull')
			.itemOutputs('gtceu:ev_rotor_holder')
			.duration(20 * 6)
			.EUt(GTValues.VA[GTValues.EV])
	}

	if (gtItemExists('gtceu:hssg_gear') && gtItemExists('gtceu:small_tungsten_steel_gear')) {
		event.remove({ id: 'gtceu:shaped/rotor_holder_iv' })
		event.recipes.gtceu.assembler('tfg:rotor_holder_iv')
			.itemInputs('4x #c:gears/hssg', '4x #c:small_gears/tungsten_steel', 'gtceu:iv_machine_hull')
			.itemOutputs('gtceu:iv_rotor_holder')
			.duration(20 * 6)
			.EUt(GTValues.VA[GTValues.IV])
	}

	if (gtItemExists('gtceu:ruthenium_gear') && gtItemExists('gtceu:small_rhodium_plated_palladium_gear')) {
		event.remove({ id: 'gtceu:shaped/rotor_holder_luv' })
		event.recipes.gtceu.assembler('tfg:rotor_holder_luv')
			.itemInputs('4x #c:gears/ruthenium', '4x #c:small_gears/rhodium_plated_palladium', 'gtceu:luv_machine_hull')
			.itemOutputs('gtceu:luv_rotor_holder')
			.duration(20 * 6)
			.EUt(GTValues.VA[GTValues.LuV])
	}

	if (gtItemExists('gtceu:trinium_gear') && gtItemExists('gtceu:small_naquadah_alloy_gear')) {
		event.remove({ id: 'gtceu:shaped/rotor_holder_zpm' })
		event.recipes.gtceu.assembler('tfg:rotor_holder_zpm')
			.itemInputs('4x #c:gears/trinium', '4x #c:small_gears/naquadah_alloy', 'gtceu:zpm_machine_hull')
			.itemOutputs('gtceu:zpm_rotor_holder')
			.duration(20 * 6)
			.EUt(GTValues.VA[GTValues.ZPM])
	}

	if (gtItemExists('gtceu:tritanium_gear') && gtItemExists('gtceu:small_darmstadtium_gear')) {
		event.remove({ id: 'gtceu:shaped/rotor_holder_uv' })
		event.recipes.gtceu.assembler('tfg:rotor_holder_uv')
			.itemInputs('4x #c:gears/tritanium', '4x #c:small_gears/darmstadtium', 'gtceu:uv_machine_hull')
			.itemOutputs('gtceu:uv_rotor_holder')
			.duration(20 * 6)
			.EUt(GTValues.VA[GTValues.UV])
	}


	// [PORT-Ф2] ostrum_iodide — кастомный материал TFG, пластин нет → замена сломала бы nano_saber
	// event.replaceInput({ output: 'gtceu:nano_saber' }, 'gtceu:ruridit_plate', '#forge:plates/ostrum_iodide')

	// Intentionally long to encourage reuse instead of mindlessly creating and distilling
	event.recipes.gtceu.mixer('tfg:diluted_hcl_acid')
		.inputFluids(Fluid.of('gtceu:hydrochloric_acid', 1000), Fluid.of('minecraft:water'))
		.outputFluids(Fluid.of('gtceu:diluted_hydrochloric_acid', 2000))
		.duration(30 * 20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('tfg:diluted_sulf_acid')
		.inputFluids(Fluid.of('gtceu:sulfuric_acid', 2000), Fluid.of('minecraft:water'))
		.outputFluids(Fluid.of('gtceu:diluted_sulfuric_acid', 3000))
		.duration(30 * 20)
		.EUt(GTValues.VA[GTValues.LV])

	// Pills
	// [PORT-FIX] Материалы rad_away/paracetamol и таблетки апстримлены в GTM 8:
	// tfg:rad_away_pill -> gtceu:rad_away_pill, tfg:paracetamol_pill -> gtceu:paracetamol_pill
	event.remove({ id: 'gtceu:canner/pack_paracetamol' })
	event.remove({ id: 'gtceu:canner/pack_rad_away' })

	event.recipes.gtceu.forming_press('tfg:pack_rad_away')
		.itemInputs('16x #c:dusts/rad_away')
		.notConsumableItem('gtceu:pill_casting_mold') // [PORT] .notConsumable(строка) удалён в GTM 8
		.itemOutputs('gtceu:rad_away_pill')
		.duration(3 * 20)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.forming_press('gtceu:pack_paracetamol')
		.itemInputs('16x #c:dusts/paracetamol')
		.notConsumableItem('gtceu:pill_casting_mold') // [PORT] .notConsumable(строка) удалён в GTM 8
		.itemOutputs('gtceu:paracetamol_pill')
		.duration(3 * 20)
		.EUt(GTValues.VA[GTValues.LV])

	// Glass lens
	event.recipes.gtceu.lathe('tfg:gt_glass_lens')
		.itemInputs('#c:plates/glass')
		.itemOutputs('gtceu:glass_lens', 'gtceu:small_glass_dust') // [PORT-FIX] теги-выходы -> конкретные предметы
		.duration(60 * 20)
		.EUt(GTValues.VA[GTValues.MV])

	// Magnetic iron
	// [PORT] plate/bolt магнитного железа зависят от флагов материала — проверка существования
	event.shapeless('gtceu:magnetic_iron_ingot', ['#c:ingots/iron', '8x minecraft:redstone'])
	if (gtItemExists('gtceu:magnetic_iron_plate')) {
		event.shapeless('gtceu:magnetic_iron_plate', ['#c:plates/iron', '8x minecraft:redstone'])
	}
	if (gtItemExists('gtceu:magnetic_iron_bolt')) {
		event.shapeless('gtceu:magnetic_iron_bolt', ['#c:bolts/iron', '2x minecraft:redstone'])
	}

	// Reverting
	event.smelting('minecraft:iron_ingot', '#c:ingots/wrought_iron')
		.id('tfg:revert_wrought_iron_ingot')
	event.smelting('minecraft:copper_ingot', '#c:ingots/annealed_copper')
		.id('tfg:revert_annealed_copper_ingot')

	// Heavy Oil at LV

	event.remove({ id: 'gtceu:distillery/distill_heavy_oil_to_sulfuric_heavy_fuel' })

	event.recipes.gtceu.distillery('tfg:sulfuric_heavy_fuel')
		.inputFluids(Fluid.of('gtceu:heavy_oil' /* [PORT-FIX] GTM8: oil_heavy -> heavy_oil */, 50))
		.outputFluids(Fluid.of('gtceu:sulfuric_heavy_fuel', 125))
		.duration(20*2)
		.EUt(GTValues.VA[GTValues.LV])
		.circuit(1)

	// Increase casing costs

	// [PORT-CHECK] проверить, что теги c:normal_fluid_pipes/steel и c:huge_fluid_pipes/steel существуют в GTM 8
	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/casing_steel_pipe' }, '#c:normal_fluid_pipes/steel', '#c:huge_fluid_pipes/steel')
	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/casing_steel_pipe' }, '#c:plates/steel', '#c:double_plates/steel')

	// Modify HV Dynamo Hatch to be craftable before Cleanroom
	// [PORT] fine wire чёрной стали и пружина золота могли зависеть от TFG-флагов (Ф2) — проверки существования

	if (gtItemExists('gtceu:fine_black_steel_wire')) {
		event.recipes.gtceu.assembler('gtceu:voltage_coil_hv')
			.itemInputs('#c:rods/magnetic_steel', '16x #c:fine_wires/black_steel')
			.itemOutputs('gtceu:hv_voltage_coil')
			.circuit(1)
			.duration(20*20)
			.EUt(GTValues.VA[GTValues.MV])
	}

	if (gtItemExists('gtceu:gold_spring')) {
		event.recipes.gtceu.assembler('gtceu:dynamo_hatch_hv')
			.itemInputs('gtceu:hv_machine_hull', '2x #c:springs/gold', '2x gtceu:ulpic_chip', 'gtceu:hv_voltage_coil')
			.inputFluids('gtceu:sodium_potassium 1000')
			.itemOutputs('gtceu:hv_energy_output_hatch')
			.duration(20*20)
			.EUt(GTValues.VA[GTValues.MV])
	}

	// Change Sterling Silver Turbine Rotor to be craftable at MV

	// modifyRecipe doesn't work for turbine blades
	// [PORT-CHECK] выход с NBT {GT.PartStats:...} — в 1.21 статы ротора хранятся в data
	// component'е GTM; портировать после выяснения формата компонента.
	// event.recipes.gtceu.assembler('gtceu:assemble_sterling_silver_turbine_blade')
	// 	.itemInputs('8x #forge:turbine_blades/sterling_silver', '#forge:rods/long/magnalium')
	// 	.itemOutputs(Item.of('gtceu:turbine_rotor', '{GT.PartStats:{Material:"gtceu:sterling_silver"}}'))
	// 	.duration(10*20)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// Change Red Alloy in the ABS to match

	// [PORT-CHECK] global.modifyRecipe не портирован: хелпер разбирал/пересобирал JSON
	// рецепта в формате 1.20, в GTM 8 формат на codecs. Нужно либо портировать хелпер,
	// либо снять с игры JSON рецепта gtceu:alloy_blast_smelter/red_alloy и добавить
	// замену вручную (fluidOutputs gtceu:molten_red_alloy 720).
	// global.modifyRecipe(event, "gtceu:alloy_blast_smelter/red_alloy", {
	//     newId: "tfg:red_alloy",
	//     fluidOutputs: { "gtceu:red_alloy": 720 }
	// });

	// Change Cracker to require Cleanroom

	// [PORT-GTM-REPLACE] replaceInput по GT-рецепту крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: 'gtceu:shaped/cracking_unit' }, '#gtceu:circuits/hv', '#gtceu:circuits/ev')

	// Allow alternate rubbers for hazmat pieces

	const HAZMAT_PIECES_TO_REPLACE = [
		"chestpiece",
		"leggings",
		"boots"
	]
	HAZMAT_PIECES_TO_REPLACE.forEach(piece => {
		// [PORT-GTM-REPLACE] replaceInput по GT-рецептам крашится в b71dec5 (UOE) — включить с патченным GTM:
	// event.replaceInput({ id: `gtceu:assembler/hazmat_${piece}` },
	// '#c:plates/rubber', '#tfg:rubber_plates');
	})

})
