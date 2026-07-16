// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/gregtech/data.js (registerTFCDataForGTCEU) -> прямой обработчик TFCEvents.data.
// Главные изменения 1.20 -> 1.21 (kubejs_tfc 2.0.1 / TFC 4.2.5 / GTM8):
//  - event.itemHeat(item, cap, forge, weld) НЕ существует -> event.heat({ingredient, heat_capacity,
//    forging_temperature?, welding_temperature?}, id) (codec-поля HeatDefinition, проверено по jar).
//  - event.metal(...) НЕ существует: TFC 1.21 заменил metals-данные на fluid_heat
//    (net.dries007.tfc.util.data.FluidHeat, codec: {fluid, melt_temperature, specific_heat_capacity}) ->
//    event.fluidHeat({...}, id). Поля ingots/double_ingots/sheets/tier из старого metal-кодека удалены.
//  - [PORT-FIX] Оригинал перезаписывал tfc:copper и т.п. на gtceu-жидкости. В 1.21 fluid_heat ищется
//    ПО ЖИДКОСТИ, перезапись tfc:* id лишь удалила бы данные у tfc:metal/* жидкостей (сломав ванильные
//    heating-рецепты TFC). Поэтому регистрируем НОВЫЕ записи tfg:metal/* для gtceu-жидкостей, не трогая TFC.
//  - TFGPropertyKey.TFC_PROPERTY (Java TFG-Core) недоступен — material_modification.tfc.js не портирован (Ф3).
//    Таблица forging/welding температур перенесена сюда дословно из
//    startup_scripts/tfg/materials/material_modification.tfc.js (1.20).
//  - GTMaterials.Limonite -> Goethite (GTM8), одна запись вместо двух.
//  - TFGTagPrefix.* (ingotDouble, rich/poorRawOre, toolHead* TFC-инструментов, repairKit) не зарегистрированы
//    в порте — закомментированы [PORT-Ф4-TODO] (см. startup_scripts/tfg_port/tfg.tag_prefixes.js).
//  - registerGTCEUBedrockFluidVeins (Moon/Mars/Venus) — тела функций в других файлах (космос, Ф10),
//    здесь не портируются.

// [PORT] Java.loadClass только на верхнем уровне файла (Rhino "redeclaration of var" внутри обработчика).
const $GtDataToolHelper = Java.loadClass('com.gregtechceu.gtceu.api.item.tool.ToolHelper')
const $GtDataToolType = Java.loadClass('com.gregtechceu.gtceu.api.item.tool.GTToolType')
const $GtDataBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')

/**
 * event.heat(
	{
		ingredient: Ingredient,
		heatCapacity: number,
		forgingTemperature: @Nullable number,
		weldingTemperature: @Nullable number
	},
	id?: string
	)
 */
TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port gregtech.data start')

	// [PORT] Таблица TFC_PROPERTY из material_modification.tfc.js (1.20): material -> [forging temp, welding temp].
	// Java-механики TFCProperty (tier наковальни, выплавка руды с процентом выхода) не переносимы (Ф3),
	// здесь используются только температуры для item_heat.
	let TFC_HEAT_PROPERTIES = {
		'gtceu:copper': [648, 864],
		'gtceu:bismuth_bronze': [591, 788],
		'gtceu:bronze': [570, 760],
		'gtceu:black_bronze': [642, 856],
		'gtceu:wrought_iron': [921, 1228],
		'gtceu:steel': [924, 1232],
		'gtceu:black_steel': [891, 1188],
		'gtceu:blue_steel': [924, 1232],
		'gtceu:red_steel': [924, 1232],
		'tfg:weak_blue_steel': [924, 1232],
		'tfg:weak_red_steel': [924, 1232],

		'gtceu:gold': [636, 848],
		'gtceu:bismuth': [162, 216],
		'gtceu:brass': [558, 744],
		'gtceu:nickel': [872, 1162],
		'gtceu:rose_gold': [576, 768],
		'gtceu:silver': [577, 769],
		'gtceu:tin': [138, 184],
		'gtceu:zinc': [252, 336],
		'gtceu:sterling_silver': [570, 760],
		'gtceu:iron': [921, 1228],

		'gtceu:hematite': [921, 1228],
		// [PORT] Limonite переименован в Goethite в GTM8 — одна запись
		'gtceu:magnetite': [921, 1228],
		'gtceu:pyrite': [921, 1228],
		'gtceu:goethite': [921, 1228],
		'gtceu:basaltic_mineral_sand': [921, 1228],
		'gtceu:granitic_mineral_sand': [921, 1228],
		'gtceu:vanadium_magnetite': [921, 1228],

		'gtceu:malachite': [138, 184],
		'gtceu:tetrahedrite': [138, 184],
		'gtceu:chalcopyrite': [138, 184],
		'gtceu:chalcocite': [138, 184],
		'gtceu:bornite': [138, 184],

		'gtceu:cassiterite': [648, 864],
		'gtceu:cassiterite_sand': [138, 184],
		'gtceu:sphalerite': [138, 184],
		'gtceu:garnierite': [138, 184],
		'gtceu:pentlandite': [138, 184],

		'gtceu:redstone': [240, 320],
		'gtceu:red_alloy': [570, 650],
		'gtceu:tin_alloy': [1000, 1100],
		'gtceu:lead': [330 * 0.6, 330 * 0.8],
		'gtceu:galena': [330 * 0.6, 330 * 0.8],
		'gtceu:invar': [1494 * 0.6, 1494 * 0.8],
		'gtceu:potin': [807 * 0.6, 807 * 0.8],
		'gtceu:cobalt': [1495 * 0.6, 1495 * 0.8],
		'gtceu:cobaltite': [1495 * 0.6, 1495 * 0.8],
		'gtceu:cobalt_brass': [1060 * 0.6, 1060 * 0.8],
		'gtceu:aluminium_silicate': [1540, 1540],
		'gtceu:kyanite': [1540, 1540],
		'gtceu:mica': [1540, 1540],
		'gtceu:spodumene': [1540, 1540],
		'gtceu:pollucite': [1540, 1540],
		'gtceu:lapis': [1540, 1540],
		'gtceu:lazurite': [1540, 1540],
		'gtceu:sodalite': [1540, 1540]
	}

	// [tagPrefix, имя для id, heat capacity]
	let PREFIX_HEAT_CAPACITIES = [
		[TagPrefix.dustTiny, 'dust_tiny', 0.357],
		[TagPrefix.dustSmall, 'dust_small', 0.714],
		[TagPrefix.dust, 'dust', 1.429],
		[TagPrefix.rod, 'rod', 0.567],
		[TagPrefix.bolt, 'bolt', 0.245],
		[TagPrefix.screw, 'screw', 0.567],
		[TagPrefix.nugget, 'nugget', 0.124],
		[TagPrefix.block, 'block', 20],
		[TagPrefix.rodLong, 'rod_long', 1.429],
		[TagPrefix.gearSmall, 'gear_small', 1.429],
		[TagPrefix.gear, 'gear', 2.875],
		[TagPrefix.plate, 'plate', 2.875],
		[TagPrefix.plateDouble, 'plate_double', 5.75],
		[TagPrefix.springSmall, 'spring_small', 0.567],
		[TagPrefix.spring, 'spring', 1.429],
		[TagPrefix.ring, 'ring', 0.567],

		[TagPrefix.ingot, 'ingot', 1.429],
		// [PORT-Ф4-TODO] TFGTagPrefix.ingotDouble (2.875) — кастомный префикс TFG-Core, не зарегистрирован в порте

		[TagPrefix.rawOre, 'raw_ore', 1.429],
		// [PORT-Ф4-TODO] TFGTagPrefix.richRawOre / poorRawOre (1.429) — не зарегистрированы в порте

		// Ore processing stages
		[TagPrefix.dustImpure, 'dust_impure', 1.429],
		[TagPrefix.dustPure, 'dust_pure', 1.429],
		[TagPrefix.crushed, 'crushed', 1.429],
		[TagPrefix.crushedPurified, 'crushed_purified', 1.429],
		[TagPrefix.crushedRefined, 'crushed_refined', 1.429],

		[TagPrefix.toolHeadWrench, 'tool_head_wrench', 2.875],
		[TagPrefix.toolHeadBuzzSaw, 'tool_head_buzz_saw', 2.875],
		[TagPrefix.toolHeadScrewdriver, 'tool_head_screwdriver', 1.429],
		[TagPrefix.toolHeadWireCutter, 'tool_head_wire_cutter', 1.429]
		// [PORT-Ф4-TODO] TFGTagPrefix.toolHeadSword/Shovel/Scythe/Pickaxe/Saw/Knife/Hoe/Hammer/Axe/File/
		// ButcheryKnife/MiningHammer/Spade и unfiredRepairKit/repairKit — кастомные префиксы TFG-Core,
		// не зарегистрированы в порте (см. tfg.tag_prefixes.js)
	]

	// [GTToolType, имя для id, heat capacity]
	let TOOL_HEAT_CAPACITIES = [
		[$GtDataToolType.SWORD, 'sword', 1.429],
		[$GtDataToolType.PICKAXE, 'pickaxe', 1.429],
		[$GtDataToolType.SHOVEL, 'shovel', 1.429],
		[$GtDataToolType.AXE, 'axe', 1.429],
		[$GtDataToolType.HOE, 'hoe', 1.429],
		[$GtDataToolType.SAW, 'saw', 1.429],
		[$GtDataToolType.HARD_HAMMER, 'hard_hammer', 2.875],
		[$GtDataToolType.FILE, 'file', 1.429],
		[$GtDataToolType.SCYTHE, 'scythe', 1.429],
		[$GtDataToolType.KNIFE, 'knife', 1.429],
		[$GtDataToolType.BUTCHERY_KNIFE, 'butchery_knife', 2.875],
		[$GtDataToolType.MINING_HAMMER, 'mining_hammer', 1.429],
		[$GtDataToolType.SPADE, 'spade', 2.875],
		[$GtDataToolType.WRENCH, 'wrench', 2.875],
		[$GtDataToolType.SCREWDRIVER, 'screwdriver', 1.429],
		[$GtDataToolType.MORTAR, 'mortar', 1.429],
		[$GtDataToolType.WIRE_CUTTER, 'wire_cutter', 1.429],
		[$GtDataToolType.CROWBAR, 'crowbar', 1.429]
	]

	function makeItemHeatByTagPrefix(tagPrefix, prefixName, material, matPath, forgingTemp, weldingTemp, heatCapacity) {
		let item = ChemicalHelper.get(tagPrefix, material, 1)
		if (!item.isEmpty()) {
			event.heat({
				ingredient: item.getId(),
				heatCapacity: heatCapacity,
				forgingTemperature: forgingTemp,
				weldingTemperature: weldingTemp
			}, 'tfg:item_heat/' + matPath + '/' + prefixName)
		}
	}

	function makeItemHeatByToolType(toolType, toolName, material, matPath, forgingTemp, weldingTemp, heatCapacity) {
		let tool = $GtDataToolHelper.get(toolType, material)
		if (!tool.isEmpty()) {
			event.heat({
				ingredient: tool.getId(),
				heatCapacity: heatCapacity,
				forgingTemperature: forgingTemp,
				weldingTemperature: weldingTemp
			}, 'tfg:item_heat/' + matPath + '/tool/' + toolName)
		}
	}

	for (let [matId, temps] of Object.entries(TFC_HEAT_PROPERTIES)) {
		let material = null
		try {
			material = GTRegistries.MATERIALS.getMaterial(matId)
		} catch (e) {
			material = null
		}
		if (material == null) continue

		let matPath = matId.replace(':', '/')

		for (let p of PREFIX_HEAT_CAPACITIES) {
			makeItemHeatByTagPrefix(p[0], p[1], material, matPath, temps[0], temps[1], p[2])
		}
		for (let t of TOOL_HEAT_CAPACITIES) {
			makeItemHeatByToolType(t[0], t[1], material, matPath, temps[0], temps[1], t[2])
		}
	}

	event.heat({ ingredient: 'gtceu:compressed_coke_clay', heatCapacity: 0.1242 }, 'tfg:item_heat/gtceu/compressed_coke_clay') // [PORT-FIX] itemHeat -> heat, null-температуры опущены

	/***********************************************************************************************************
	*
	* registerGTCEUMetals -> fluid_heat (TFC 1.21)
	*
	***********************************************************************************************************/

	// [material id, melt temperature, specific heat capacity, имя записи]
	// [PORT-FIX] Старые аргументы ingot/double_ingot/sheet тегов и tier удалены из кодека TFC 1.21;
	// жидкость берётся из GT-материала (getFluid), а не хардкодом — id жидкостей в GTM8 могли измениться.
	let METAL_FLUID_HEATS = [
		['gtceu:copper', 1080, 0.00857, 'copper'],
		['gtceu:bismuth_bronze', 985, 0.00857, 'bismuth_bronze'],
		['gtceu:bronze', 950, 0.00857, 'bronze'],
		['gtceu:black_bronze', 1070, 0.00857, 'black_bronze'],
		['gtceu:wrought_iron', 1535, 0.00857, 'wrought_iron'],
		['gtceu:steel', 1540, 0.00857, 'steel'],
		['gtceu:black_steel', 1485, 0.00857, 'black_steel'],
		['gtceu:blue_steel', 1540, 0.00857, 'blue_steel'],
		['gtceu:red_steel', 1540, 0.00857, 'red_steel'],

		['gtceu:iron', 1535, 0.00857, 'cast_iron'],
		['gtceu:tin', 230, 0.02143, 'tin'],
		['gtceu:bismuth', 270, 0.02143, 'bismuth'],
		['gtceu:zinc', 420, 0.01429, 'zinc'],
		['gtceu:sterling_silver', 950, 0.00857, 'sterling_silver'],
		['gtceu:rose_gold', 960, 0.00857, 'rose_gold'],
		['gtceu:silver', 961, 0.00625, 'silver'],
		['gtceu:gold', 1060, 0.005, 'gold'],
		['gtceu:nickel', 1453, 0.00625, 'nickel'],
		['gtceu:brass', 930, 0.00857, 'brass'],

		['gtceu:redstone', 460, 0.01729, 'redstone'],
		['gtceu:red_alloy', 740, 0.01529, 'red_alloy'],
		['gtceu:tin_alloy', 1250, 0.00829, 'tin_alloy'],
		['gtceu:lead', 330, 0.01729, 'lead'],
		['gtceu:invar', 1494, 0.00741, 'invar'],
		['gtceu:potin', 807, 0.0124, 'potin'],
		['gtceu:cobalt', 1495, 0.00857, 'cobalt'],
		['gtceu:cobalt_brass', 1060, 0.00857, 'cobalt_brass'],
		['gtceu:aluminium_silicate', 1540, 0.00857, 'aluminium_silicate']
	]

	for (let m of METAL_FLUID_HEATS) {
		let material = null
		try {
			material = GTRegistries.MATERIALS.getMaterial(m[0])
		} catch (e) {
			material = null
		}
		if (material == null || !material.hasProperty(PropertyKey.FLUID)) continue

		let fluid = material.getFluid()
		if (fluid == null) continue

		let fluidId = $GtDataBuiltInRegistries.FLUID.getKey(fluid).toString()
		event.fluidHeat({
			fluid: fluidId,
			meltTemperature: m[1],
			specificHeatCapacity: m[2]
		}, 'tfg:metal/' + m[3])
	}
})
