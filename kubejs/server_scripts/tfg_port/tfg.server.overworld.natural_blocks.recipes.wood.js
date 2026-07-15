// [PORT-FIX] KubeJS 7: server-скрипты делят top-level scope — const-имена уникальны между файлами
// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.wood.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Изменения:
//  - forge:* -> c:* (tools/saws->tools/saw, tools/knives->tools/knife, tools/hammers->tools/hammer,
//    tools/screwdrivers->tools/screwdriver, string->strings, rods/wood|wooden->rods/wooden);
//  - vintageimprovements -> createvintageneoforged; greate.compacting -> create.compacting;
//  - id ванильных рецептов TFC 1.21 переехали (crafting/wood/{wood}_planks -> crafting/wood/planks/{wood} и т.д.),
//    AFC 2.1.1 использует ту же схему;
//  - wan_ancient_beasts / ad_astra / beneath / firmaciv отсутствуют в сборке — их блоки вырезаны
//    ([PORT] / [PORT-Ф10] космодревесина);
//  - TFGHelpers.registerMaterialInfo — хелпер TFG-мода, отсутствует (Ф4) — recycling закомментирован;
//  - незарегистрированные предметы (TFG-деревья Ф4-отложены, tfg:wood/lumber/bamboo и т.п.)
//    отфильтровываются санитайзером opt() — рецепты появятся автоматически с регистрацией предметов.

const $WoodBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $WoodResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

// [PORT] global.NB_WOOD_VI_DURATION_MULT определялся в startup constants.js оригинала;
// в порте — локальная копия (как в createvintageneoforged.recipes.js)
const NB_WOOD_VI_DURATION_MULT = 4;

function woodItemExists(id) {
	try {
		return $WoodBuiltInRegistries.ITEM.containsKey($WoodResourceLocation.parse(String(id).replace(/^\d+x\s+/, '')))
	} catch (e) {
		return false
	}
}

/** [PORT] Санитайзер: null для незарегистрированных предметов; теги проверяем на непустоту в рантайме */
function woodOpt(id) {
	if (id == null) return null
	let s = String(id)
	if (s.startsWith('#')) {
		try {
			// [PORT-FIX] NeoForge подставляет заглушку minecraft:barrier вместо пустого/несуществующего
			// тега — голый length > 0 давал ложный проход (валились рецепты с пустым тегом)
			return Ingredient.of(s).itemIds.toArray().map(String)
				.filter(x => x !== 'minecraft:barrier' && x !== 'minecraft:air').length > 0 ? id : null
		} catch (e) {
			return null
		}
	}
	return woodItemExists(s) ? id : null
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.wood start')

	// #region TFG Wood Builder

	/**
	 * Generates most basic wooden recipes.
	 *
	 * All parameters are optional. Name is used for the ID.
	 * [PORT] Все параметры-предметы проходят через woodOpt() — незарегистрированный контент выпадает в null.
	 */
	function TFGWoodBuilder(event, name, lumber, logs, log, stripped_log, plank, stair, slab, door, trapdoor, fence, log_fence,
		fence_gate, support, pressure_plate, button, log_wood, stripped_wood, tool_rack, workbench, bookshelf, chest, trapped_chest,
		loom, sluice, barrel, lectern, scribing_table, sewing_table, jar_shelf, food_shelf, hanger, jarbnet, big_barrel,
		stomping_barrel, barrel_press, wine_shelf, sign, hanging_sign, crafting_station, workbench_as_material, rope_ladder) {

		lumber = woodOpt(lumber); logs = woodOpt(logs); log = woodOpt(log); stripped_log = woodOpt(stripped_log);
		plank = woodOpt(plank); stair = woodOpt(stair); slab = woodOpt(slab); door = woodOpt(door); trapdoor = woodOpt(trapdoor);
		fence = woodOpt(fence); log_fence = woodOpt(log_fence); fence_gate = woodOpt(fence_gate); support = woodOpt(support);
		pressure_plate = woodOpt(pressure_plate); button = woodOpt(button); log_wood = woodOpt(log_wood); stripped_wood = woodOpt(stripped_wood);
		tool_rack = woodOpt(tool_rack); workbench = woodOpt(workbench); bookshelf = woodOpt(bookshelf); chest = woodOpt(chest);
		trapped_chest = woodOpt(trapped_chest); loom = woodOpt(loom); sluice = woodOpt(sluice); barrel = woodOpt(barrel);
		lectern = woodOpt(lectern); scribing_table = woodOpt(scribing_table); sewing_table = woodOpt(sewing_table);
		jar_shelf = woodOpt(jar_shelf); food_shelf = woodOpt(food_shelf); hanger = woodOpt(hanger); jarbnet = woodOpt(jarbnet);
		big_barrel = woodOpt(big_barrel); stomping_barrel = woodOpt(stomping_barrel); barrel_press = woodOpt(barrel_press);
		wine_shelf = woodOpt(wine_shelf); sign = woodOpt(sign); hanging_sign = woodOpt(hanging_sign);
		crafting_station = woodOpt(crafting_station); workbench_as_material = woodOpt(workbench_as_material); rope_ladder = woodOpt(rope_ladder);

		// Stripped log from log
		if (log && stripped_log && name) {
			event.recipes.gtceu.lathe(`tfg:${name}_stripped_log_from_log`)
				.itemInputs(log)
				.itemOutputs(stripped_log)
				.duration(50)
				.EUt(GTValues.VA[GTValues.ULV])

			event.recipes.createvintageneoforged.polishing(stripped_log, log) // [PORT] vintageimprovements -> createvintageneoforged
				.speedLimits(0)
				.processingTime(50 * NB_WOOD_VI_DURATION_MULT)
				.id(`tfg:vi/lathe/${name}_stripped_log_from_log`)
		};

		// Stripped wood from log wood
		if (log_wood && stripped_wood && name) {
			event.recipes.gtceu.lathe(`tfg:${name}_stripped_wood_from_log_wood`)
				.itemInputs(log_wood)
				.itemOutputs(stripped_wood)
				.duration(50)
				.EUt(GTValues.VA[GTValues.ULV])

			event.recipes.createvintageneoforged.polishing(stripped_wood, log_wood)
				.speedLimits(0)
				.processingTime(50 * NB_WOOD_VI_DURATION_MULT)
				.id(`tfg:vi/lathe/${name}_stripped_wood_from_log_wood`)
		};

		// Lumber from log
		if (logs && lumber && name) {
			event.shapeless(`8x ${lumber}`,
				[logs, '#c:tools/saw']
			)
				.id(`tfg:shapeless/${name}_lumber_from_log`)

			global.generateCutterRecipe(event, logs, `16x ${lumber}`, 50, 7, `${name}_lumber_from_log`)
		};

		if (plank && lumber && name) {
			// Lumber from plank
			event.shapeless(`4x ${lumber}`,
				[plank, '#c:tools/saw']
			)
				.id(`tfg:shapeless/${name}_lumber_from_plank`)

			event.recipes.gtceu.packer(`tfg:${name}_lumber_from_plank`)
				.itemInputs(`${plank}`)
				.circuit(1)
				.itemOutputs(`4x ${lumber}`)
				.duration(50)
				.EUt(GTValues.VA[GTValues.ULV])

			// Plank from lumber
			event.shaped(plank, [
				'AA',
				'AA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_plank_from_lumber`)
		};

		// Lumber from slab
		if (slab && lumber && name) {
			event.shapeless(`2x ${lumber}`,
				[slab, '#c:tools/saw']
			)
				.id(`tfg:shapeless/${name}_lumber_from_slab`)

			global.generateCutterRecipe(event, slab, `2x ${lumber}`, 50, 7, `${name}_lumber_from_slab`)
		};

		// Slab from lumber
		if (slab && lumber && name) {
			event.shaped(slab, [
				'AA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_slab_from_lumber`)
		};

		// Slab from plank
		if (slab && plank && name) {
			event.shaped(`6x ${slab}`, [
				'AAA'
			], {
				A: plank
			})
				.id(`tfg:shaped/${name}_slab_from_plank`)

			global.generateCutterRecipe(event, plank, `2x ${slab}`, 50, 7 , `${name}_slab_from_plank`)
		}

		// Lumber from stair
		if (stair && lumber && name) {
			event.shapeless(`3x ${lumber}`,
				[stair, '#c:tools/saw']
			)
				.id(`tfg:shapeless/${name}_lumber_from_stair`)

			global.generateCutterRecipe(event, stair, `3x ${lumber}`, 50, 7, `${name}_lumber_from_stair`)
		};

		// Stair from lumber
		if (stair && lumber && name) {
			event.shaped(stair, [
				'A ',
				'AA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_stair_from_lumber`)
		};

		// Stair from plank
		if (stair && plank && name) {
			event.shaped(`8x ${stair}`, [
				'A  ',
				'AA ',
				'AAA'
			], {
				A: plank
			})
				.id(`tfg:shaped/${name}_stair_from_plank`)
		};

		// Door from lumber
		if (door && lumber && name) {
			event.shaped(`2x ${door}`, [
				'AA',
				'AA',
				'AA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_door_from_lumber`)
		};

		// Trapdoor from lumber
		if (trapdoor && lumber && name) {
			event.shaped(`3x ${trapdoor}`, [
				'AAA',
				'AAA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_trapdoor_from_lumber`)
		};

		// Fence from lumber & plank
		if (fence && lumber && plank && name) {
			event.shaped(`8x ${fence}`, [
				'ABA',
				'ABA'
			], {
				A: plank,
				B: lumber
			})
				.id(`tfg:shaped/${name}_fence_from_lumber_and_plank`)
		};

		// Log Fence from log and lumber
		if (log_fence && log && lumber && name) {
			event.shaped(`8x ${log_fence}`, [
				'ABA',
				'ABA'
			], {
				A: log,
				B: lumber
			})
				.id(`tfg:shaped/${name}_log_fence_from_log_and_lumber`)
		};

		// Fence gate from lumber and plank
		if (fence_gate && lumber && plank && name) {
			event.shaped(`2x ${fence_gate}`, [
				'ABA',
				'ABA'
			], {
				A: lumber,
				B: plank
			})
				.id(`tfg:shaped/${name}_fence_gate_from_lumber_and_plank`)
		};

		// Support from logs
		if (support && logs && name) {
			event.shapeless(`8x ${support}`,
				[`2x ${logs}`, '#c:tools/saw']
			)
				.id(`tfg:shapeless/${name}_support_from_logs`)

			event.recipes.gtceu.assembler(`tfg:${name}_support_from_logs`)
				.itemInputs(`2x ${logs}`)
				.itemOutputs(`8x ${support}`)
				.duration(50)
				.circuit(4)
				.EUt(GTValues.VA[GTValues.ULV])
		};

		// Pressure plate
		if (pressure_plate && slab && name) {
			event.shaped(pressure_plate, [
				' B ',
				'ACA',
				' D '
			], {
				A: slab,
				B: '#c:tools/hammer',
				C: '#c:small_springs',
				D: '#c:tools/screwdriver'
			})
				.id(`tfg:shaped/${name}_pressure_plate`)

			event.recipes.gtceu.assembler(`tfg:${name}_pressure_plate`)
				.itemInputs(`2x ${slab}`, '#c:small_springs')
				.itemOutputs(`${pressure_plate}`)
				.duration(50)
				.circuit(3)
				.EUt(GTValues.VA[GTValues.ULV])
		};

		// Button from pressure plate
		if (button && pressure_plate && name) {
			event.recipes.gtceu.cutter(`tfg:${name}_button_from_pressure_plate`)
				.itemInputs(pressure_plate)
				.itemOutputs(`6x ${button}`)
				.duration(50)
				.EUt(GTValues.VA[GTValues.ULV])

			event.shapeless(`3x ${button}`, [pressure_plate, '#c:tools/saw'])
				.id(`tfg:shapeless/saw_${name}_pressure_plate_to_button`)
		};

		// Tool Rack
		if (tool_rack && lumber && name) {
			event.shaped(tool_rack, [
				'AAA',
				'   ',
				'AAA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_tool_rack`)
		};

		// Workbench
		if (workbench && plank && name) {
			event.shaped(workbench, [
				'AA',
				'AA'
			], {
				A: plank
			})
				.id(`tfg:shaped/${name}_workbench`)
		};

		// Bookshelf
		if (bookshelf && lumber && name) {
			event.shaped(bookshelf, [
				'AAA',
				'BBB',
				'AAA'
			], {
				A: lumber,
				B: '#c:rods/wooden'
			})
				.id(`tfg:shaped/${name}_bookshelf`)
		};

		// Chest
		if (chest && lumber && name) {
			event.shaped(chest, [
				'AAA',
				'A A',
				'AAA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_chest`)
		};

		// Trapped Chest from Chest
		if (trapped_chest && chest && name) {
			event.shapeless(trapped_chest, [chest, 'minecraft:tripwire_hook'])
				.id(`tfg:shapeless/${name}_trapped_chest`)
		};

		// Loom
		if (loom && lumber && name) {
			event.shaped(loom, [
				'AAA',
				'ABA',
				'A A'
			], {
				A: lumber,
				B: '#c:rods/wooden'
			})
				.id(`tfg:shaped/${name}_loom`)
		};

		// Sluice
		if (sluice && lumber && name) {
			event.shaped(sluice, [
				'  A',
				' AB',
				'ABB'
			], {
				A: '#c:rods/wooden',
				B: lumber
			})
				.id(`tfg:shaped/${name}_sluice`)
		};

		// Barrel
		if (barrel && lumber && name) {
			event.shaped(barrel, [
				'A A',
				'A A',
				'AAA'
			], {
				A: lumber
			})
				.id(`tfg:shaped/${name}_barrel`)
		};

		// Lectern
		if (lectern && lumber && bookshelf && name) {
			event.shaped(lectern, [
				'AAA',
				' B ',
				' A '
			], {
				A: lumber,
				B: bookshelf
			})
				.id(`tfg:shaped/${name}_lectern`)
		};

		// Scribing Table
		if (scribing_table && plank && slab && name) {
			event.shaped(scribing_table, [
				'A B',
				'CCC',
				'D D'
			], {
				A: 'minecraft:feather',
				B: 'minecraft:black_dye',
				C: slab,
				D: plank
			})
				.id(`tfg:shaped/${name}_scribing_table`)
		};

		// Sewing Table
		if (sewing_table && log && plank && name) {
			event.shaped(sewing_table, [
				' AB',
				'CCC',
				'D D'
			], {
				A: '#c:leather', // [PORT] forge:leather -> c:leather
				B: '#c:tools/knife',
				C: plank,
				D: log
			})
				.id(`tfg:shaped/${name}_sewing_table`)
		};

		// Jar Shelf
		if (jar_shelf && lumber && plank && name) {
			event.shaped(`2x ${jar_shelf}`, [
				'AAA',
				'B B',
				'C C'
			], {
				A: plank,
				B: lumber,
				C: '#c:rods/wooden'
			})
				.id(`tfg:shaped/${name}_jar_shelf`)
		};

		// Food Shelf
		if (food_shelf && lumber && plank && name) {
			event.shaped(food_shelf, [
				'AAA',
				'BBB',
				'AAA'
			], {
				A: plank,
				B: lumber
			})
				.id(`tfg:shaped/${name}_food_shelf`)
		};

		// Hanger
		if (hanger && plank && name) {
			event.shaped(hanger, [
				'AAA',
				' B ',
				' B '
			], {
				A: plank,
				B: '#c:strings' // [PORT] forge:string -> c:strings
			})
				.id(`tfg:shaped/${name}_hanger`)
		};

		// Jarbnet
		if (jarbnet && lumber && log && name) {
			event.shaped(`2x ${jarbnet}`, [
				'A  ',
				'BCC',
				'A  '
			], {
				A: log,
				B: '#c:rods/brass',
				C: lumber
			})
				.id(`tfg:shaped/${name}_jarbnet`)
		};

		// Keg
		if (big_barrel && log && name) {
			event.shaped(big_barrel, [
				'ABA',
				'BCB',
				'ABA'
			], {
				A: log,
				B: 'firmalife:barrel_stave',
				C: 'tfc:glue'
			})
				.id(`tfg:shaped/${name}_big_barrel`)
		};

		// Stomping Barrel
		if (stomping_barrel && lumber && name) {
			event.shaped(stomping_barrel, [
				'ABA',
				'AAA',
				'BBB'
			], {
				A: lumber,
				B: 'tfc:glue'
			})
				.id(`tfg:shaped/${name}_stomping_barrel`)
		};

		// Barrel Press from Stomping Barrel
		// [PORT-Ф2] тег c:small_gears/brass пуст до флага GENERATE_SMALL_GEAR из Фазы 2 —
		// shapeless с пустым тегом отбрасывается загрузчиком 1.21, до Ф2 не регистрируем
		// if (barrel_press && stomping_barrel && name) {
		// 	event.shapeless(barrel_press, [
		// 		stomping_barrel,
		// 		'#c:rods/wrought_iron',
		// 		'#c:plates/wrought_iron',
		// 		'#c:small_gears/brass'
		// 	])
		// 		.id(`tfg:shaped/${name}_barrel_press`)
		// };

		// Wine Shelf
		if (wine_shelf && log && name) {
			event.shaped(`4x ${wine_shelf}`, [
				'ABA',
				'ABA',
				'ABA'
			], {
				A: log,
				B: 'firmalife:treated_lumber'
			})
				.id(`tfg:shaped/${name}_wine_shelf`)
		};

		// Sign
		if (sign && lumber && name) {
			event.shaped(`3x ${sign}`, [
				'AAA',
				'AAA',
				' B '
			], {
				A: lumber,
				B: '#c:rods/wooden'
			})
				.id(`tfg:shaped/${name}_sign`)
		};

		// Hanging Sign
		if (hanging_sign && lumber && name) {
			event.shaped(`3x ${hanging_sign}`, [
				'A A',
				'BBB',
				'BBB'
			], {
				A: '#c:chains', // [PORT] forge:chains -> c:chains
				B: lumber
			})
				.id(`tfg:shaped/${name}_hanging_sign`)
		};

		// Crafting Station
		if (crafting_station && lumber && workbench_as_material && name) {
			event.shaped(crafting_station, [
				'BCB',
				'ADA',
				'AEA'
			], {
				A: lumber,
				B: '#c:screws/any_bronze', // [PORT] агрегатный тег из 00_tfg_compat.tags.js
				C: workbench_as_material,
				D: '#c:tools/saw',
				E: '#c:tools/hammer'
			}).id(`tfg:shaped/${name}_crafting_station`)

			if (woodItemExists(`${crafting_station}_slab`)) {
				event.shapeless(`2x ${crafting_station}_slab`, [crafting_station]).id(`tfg:shapeless/${name}_crafting_station_slab`)
			}

			event.recipes.gtceu.assembler(`tfg:${name}_crafting_station`)
				.itemInputs(`4x ${lumber}`, '2x #c:screws/any_bronze', workbench_as_material)
				.itemOutputs(crafting_station)
				.duration(20)
				.circuit(10)
				.EUt(GTValues.VA[GTValues.LV])
		};

		// Rope ladder
		if (lumber && rope_ladder && name) {
			if (woodOpt('#tfg:burlap_fiber')) { // [PORT-Ф4-TODO] тег пуст, пока нет джутового волокна
				event.shaped(`8x ${rope_ladder}`, [
					'RLR',
					'RLR',
					'RLR'
				], {
					R: '#tfg:burlap_fiber',
					L: lumber
				}).id(`tfg:shaped/${name}_rope_ladder`);
			}

			// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:rope_coil)
			// event.shaped(`16x ${rope_ladder}`, [
			// 	' L ',
			// 	'RL ',
			// 	' L '
			// ], {
			// 	R: 'firmaciv:rope_coil',
			// 	L: lumber
			// }).id(`tfg:shaped/${name}_rope_ladder_coil`);
		}
	}

	// #endregion

	// #region TFG Mosaic Builder

	function TFGMosaicWoodBuilder(event, wood, lumber, plank, mosaic_plank, stair, mosaic_stair, slab, mosaic_slab) {

		// Mosaic plank
		// [PORT] damage_inputs_shapeless_crafting удалён — plain shapeless
		event.shapeless(`${mosaic_plank}`, [`${plank}`, '#c:tools/chisel'])
			.id(`tfg:shapeless/${wood}_mosaic_plank`);

		event.stonecutting(`${plank}`, `${mosaic_plank}`);
		event.stonecutting(`${mosaic_plank}`, `${plank}`);

		event.recipes.tfc.chisel(`${mosaic_plank}`, [`${plank}`], 'tfc:smooth'); // [PORT] массив + неймспейс режима

		// Lumber from mosaic plank
		if (woodOpt(lumber)) { // [PORT] tfg:wood/lumber/bamboo не зарегистрирован — гвард
			event.shapeless(`4x ${lumber}`, [`${mosaic_plank}`, '#c:tools/saw'])
				.id(`tfg:shapeless/${wood}_lumber_from_mosaic_plank`);

			global.generateCutterRecipe(event, `${mosaic_plank}`, `4x ${lumber}`, 50, 7, `${wood}_lumber_from_mosaic_plank`);
		}

		// Mosaic stair
		event.shapeless(`${mosaic_stair}`, [`${stair}`, '#c:tools/chisel'])
			.id(`tfg:shapeless/${wood}_mosaic_stair`);

		event.stonecutting(`${stair}`, `${mosaic_stair}`);
		event.stonecutting(`${mosaic_stair}`, `${stair}`);

		event.recipes.tfc.chisel(`${mosaic_stair}`, [`${mosaic_plank}`], 'tfc:stair');

		// Lumber from mosaic stairs
		if (woodOpt(lumber)) {
			event.shapeless(`3x ${lumber}`, [`${mosaic_stair}`, '#c:tools/saw'])
				.id(`tfg:shapeless/${wood}_lumber_from_mosaic_stair`);

			global.generateCutterRecipe(event, `${mosaic_stair}`, `3x ${lumber}`, 50, 7, `${wood}_lumber_from_mosaic_stair`);
		}

		// Mosaic slab
		event.shapeless(`${mosaic_slab}`, [`${slab}`, '#c:tools/chisel'])
			.id(`tfg:shapeless/${wood}_mosaic_slab`);

		event.stonecutting(`${slab}`, `${mosaic_slab}`);
		event.stonecutting(`${mosaic_slab}`, `${slab}`);

		event.recipes.tfc.chisel(`${mosaic_slab}`, [`${mosaic_plank}`], 'tfc:slab');

		// Lumber from mosaic slab
		if (woodOpt(lumber)) {
			event.shapeless(`2x ${lumber}`, [`${mosaic_slab}`, '#c:tools/saw'])
				.id(`tfg:shapeless/${wood}_lumber_from_mosaic_slab`);

			global.generateCutterRecipe(event, `${mosaic_slab}`, `2x ${lumber}`, 50, 7, `${wood}_lumber_from_mosaic_slab`);
		}
	};

	// #endregion

	// #region TFG Logs to Wood

	function TFGLogToWoodBuilder(event, name, log, stripped_log, wood, stripped_wood) {
		if (!woodItemExists(log) || !woodItemExists(wood)) return; // [PORT] гвард Ф4-контента

		event.shaped(Item.of(wood).withCount(3), [
			'AA',
			'AA'
		], {
			A: log
		}).id(`tfg:shaped/${name}_log_to_wood`);

		if (woodItemExists(stripped_log) && woodItemExists(stripped_wood)) {
			event.shaped(Item.of(stripped_wood).withCount(3), [
				'AA',
				'AA'
			], {
				A: stripped_log
			}).id(`tfg:shaped/${name}_stripped_log_to_wood`);
		}
	}

	// #endregion

	// #region TFG Wood Recycling
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo — хелпер TFG-мода, отсутствует в сборке.
	// Индекс и функции сохранены закомментированными для возврата 1:1 после Ф4.

	// const TFGWoodRecyclingIndex = [
	// 	['{mod}:wood/chest_minecart/{type}', ['{wood}', 4, GTMaterials.WroughtIron, 5]],
	// 	['{mod}:wood/planks/{type}', ['{wood}', 2]],
	// 	['{mod}:wood/planks/{type}_workbench', ['{wood}', 8]],
	// 	['{mod}:wood/planks/{type}_loom', ['{wood}', 7 / 2]],
	// 	['{mod}:wood/planks/{type}_door', ['{wood}', 3 / 2]],
	// 	['{mod}:wood/planks/{type}_trapdoor', ['{wood}', 1]],
	// 	['{mod}:wood/planks/{type}_fence', ['{wood}', 4]],
	// 	['{mod}:wood/planks/{type}_log_fence', ['{wood}', 8]],
	// 	['{mod}:wood/planks/{type}_fence_gate', ['{wood}', 8]],
	// 	['{mod}:wood/planks/{type}_slab', ['{wood}', 1]],
	// 	['{mod}:wood/planks/{type}_stairs', ['{wood}', 3 / 2]],
	// 	['{mod}:wood/planks/{type}_pressure_plate', ['{wood}', 2]],
	// 	['{mod}:wood/planks/{type}_button', ['{wood}', 1 / 4]],
	// 	['{mod}:wood/chest/{type}', ['{wood}', 4]],
	// 	['{mod}:wood/trapped_chest/{type}', ['{wood}', 4, GTMaterials.WroughtIron, 4 / 9, GTMaterials.Wood, 1]],
	// 	['{mod}:wood/sluice/{type}', ['{wood}', 3 / 2]],
	// 	['{mod}:wood/barrel/{type}', ['{wood}', 7 / 2]],
	// 	['{mod}:wood/sign/{type}', ['{wood}', 1]],
	// 	['{mod}:wood/lectern/{type}', ['{wood}', 5]],
	// 	['{mod}:wood/planks/{type}_bookshelf', ['{wood}', 3]],
	// 	['{mod}:wood/planks/{type}_tool_rack', ['{wood}', 3]],
	// 	['{mod}:wood/jar_shelf/{type}', ['{wood}', 7 / 2]],
	// 	['{mod}:wood/scribing_table/{type}', ['{wood}', 7]],
	// 	['{mod}:wood/sewing_table/{type}', ['{wood}', 14]]
	// ];
	//
	// function resolveArgs(materials, woodMaterial) {
	// 	return materials.map(mats => mats === '{wood}' ? woodMaterial : mats);
	// };
	//
	// function registerTFGWoodRecycling(mod, woodname, woodMaterial) {
	// 	woodname.forEach(name => {
	// 		TFGWoodRecyclingIndex.forEach(([template, args]) => {
	// 			const item = template
	// 				.replace('{mod}', mod)
	// 				.replace('{type}', name);
	// 			const resolvedArgs = resolveArgs(args, woodMaterial);
	// 			TFGHelpers.registerMaterialInfo(item, resolvedArgs);
	// 		});
	// 	});
	// };

	// #endregion

	// #region TFG

	// [PORT-Ф4-TODO] Деревья TFG отложены (kubejs_tfc 2.0.1 vs TFC 4.2.5) — из tfg:wood/* зарегистрированы
	// только support/leaves/sapling; woodOpt() внутри билдера пропустит недостающее и подхватит после регистрации.
	global.TFG_NEW_WOOD_TYPES.forEach(wood => {
		TFGWoodBuilder(
			event,
			wood.name,
			`tfg:wood/lumber/${wood.name}`,
			`#tfg:${wood.name}_logs`,
			`tfg:wood/log/${wood.name}`,
			`tfg:wood/stripped_log/${wood.name}`,
			`tfg:wood/planks/${wood.name}`,
			`tfg:wood/stairs/${wood.name}`,
			`tfg:wood/slab/${wood.name}`,
			`tfg:wood/door/${wood.name}`,
			`tfg:wood/trapdoor/${wood.name}`,
			`tfg:wood/fence/${wood.name}`,
			`tfg:wood/log_fence/${wood.name}`,
			`tfg:wood/fence_gate/${wood.name}`,
			`tfg:wood/support/${wood.name}`,
			`tfg:wood/pressure_plate/${wood.name}`,
			`tfg:wood/button/${wood.name}`,
			`tfg:wood/wood/${wood.name}`,
			`tfg:wood/stripped_wood/${wood.name}`,
			`tfg:wood/tool_rack/${wood.name}`,
			`tfg:wood/workbench/${wood.name}`,
			`tfg:wood/bookshelf/${wood.name}`,
			`tfg:wood/chest/${wood.name}`,
			`tfg:wood/trapped_chest/${wood.name}`,
			`tfg:wood/loom/${wood.name}`,
			`tfg:wood/sluice/${wood.name}`,
			`tfg:wood/barrel/${wood.name}`,
			`tfg:wood/lectern/${wood.name}`,
			`tfg:wood/scribing_table/${wood.name}`,
			`tfg:wood/sewing_table/${wood.name}`,
			`tfg:wood/jar_shelf/${wood.name}`,
			`tfg:wood/food_shelf/${wood.name}`,
			`tfg:wood/hanger/${wood.name}`,
			`tfg:wood/jarbnet/${wood.name}`,
			`tfg:wood/big_barrel/${wood.name}`,
			`tfg:wood/stomping_barrel/${wood.name}`,
			`tfg:wood/barrel_press/${wood.name}`,
			`tfg:wood/wine_shelf/${wood.name}`,
			`tfg:wood/sign/${wood.name}`,
			`tfg:wood/hanging_sign/${wood.name}`,
			`tfg:wood/crafting_station/${wood.name}`,
			`tfg:wood/workbench/${wood.name}`,
			`tfg:wood/rope_ladder/${wood.name}`
		)

		TFGLogToWoodBuilder(event, wood.name,
			`tfg:wood/log/${wood.name}`, `tfg:wood/stripped_log/${wood.name}`,
			`tfg:wood/wood/${wood.name}`, `tfg:wood/stripped_wood/${wood.name}`)
	})

	// #endregion

	// #region WAB
	// [PORT] wan_ancient_beasts отсутствует в сборке 1.21.1 — блок вырезан (global.WAB_WOOD тоже не портирован)
	// global.WAB_WOOD.forEach(wood => { TFGWoodBuilder(event, wood.name, ...) })
	// #endregion

	// #region Ad Astra
	// [PORT-Ф10] ad_astra отсутствует в сборке 1.21.1 — космодревесина (aeronos/strophar) не портируется
	// (global.AD_ASTRA_WOOD не портирован; stellaris не авто-ремапим)
	// global.AD_ASTRA_WOOD.forEach(wood => { TFGWoodBuilder(event, wood.name, ...) });
	//
	// event.shaped('8x ad_astra:aeronos_ladder', [...], { A: 'tfg:wood/lumber/aeronos', B: ... })
	// event.shaped('8x ad_astra:strophar_ladder', [...], { A: 'tfg:wood/lumber/strophar', B: ... })
	// #endregion

	// #region Beneath
	// [PORT] beneath отсутствует в сборке 1.21.1 — блок вырезан (global.BENEATH_WOOD_TYPES не портирован)
	// global.BENEATH_WOOD_TYPES.forEach(wood => { ... });
	// registerTFGWoodRecycling('beneath', ['crimson'], GTMaterials.get('hardwood'));
	// registerTFGWoodRecycling('beneath', ['warped'], GTMaterials.Wood);
	// #endregion

	// #region AFC

	global.AFC_WOOD_TYPES.forEach(wood => {

		// Removed unused assets
		// [PORT-FIX] id рецептов AFC 2.1.1 (1.21): crafting/wood/{wood}_{kind} -> crafting/wood/{kind}/{wood}
		event.remove({ id: `afc:crafting/wood/axle/${wood}` });
		event.remove({ id: `afc:crafting/wood/bladed_axle/${wood}` });
		event.remove({ id: `afc:crafting/wood/encased_axle/${wood}` });
		event.remove({ id: `afc:crafting/wood/clutch/${wood}` });
		event.remove({ id: `afc:crafting/wood/gear_box/${wood}` });
		event.remove({ id: `afc:crafting/wood/water_wheel/${wood}` });

		// Removed recipe changes
		event.remove({ id: `afc:crafting/wood/planks/${wood}` });
		event.remove({ id: `afc:crafting/wood/pressure_plate/${wood}` });
		event.remove({ id: `afc:crafting/wood/lumber/${wood}_from_logs` });
		event.remove({ id: `afc:crafting/wood/planks/${wood}_stairs` });
		event.remove({ id: `afc:crafting/wood/lumber/${wood}_from_stairs` });
		event.remove({ id: `afc:crafting/wood/planks/${wood}_slab` });
		event.remove({ id: `afc:crafting/wood/button/${wood}` });
		event.remove({ id: `afc:crafting/wood/stomping_barrel/${wood}` });
		event.remove({ id: `afc:crafting/wood/lumber/${wood}_from_planks` });
		event.remove({ id: `afc:crafting/wood/lumber/${wood}_from_slabs` });

		TFGWoodBuilder(
			event,
			`${wood}`,
			`afc:wood/lumber/${wood}`,
			`#afc:${wood}_logs`,
			`afc:wood/log/${wood}`,
			`afc:wood/stripped_log/${wood}`,
			`afc:wood/planks/${wood}`,
			`afc:wood/planks/${wood}_stairs`,
			`afc:wood/planks/${wood}_slab`,
			null,
			null,
			null,
			null,
			null,
			null,
			`afc:wood/planks/${wood}_pressure_plate`,
			`afc:wood/planks/${wood}_button`,
			`afc:wood/wood/${wood}`,
			`afc:wood/stripped_wood/${wood}`,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			`afc:wood/stomping_barrel/${wood}`,
			null,
			null,
			null,
			null,
			`tfg:wood/crafting_station/${wood}`,
			`afc:wood/planks/${wood}_workbench`,
			`tfg:wood/rope_ladder/${wood}`
		);
	});

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo отсутствует — recycling вернуть после Ф4
	// registerTFGWoodRecycling('afc', global.AFC_HARDWOOD_TYPES, GTMaterials.get('hardwood'));
	// registerTFGWoodRecycling('afc', global.AFC_SOFTWOOD_TYPES, GTMaterials.Wood);

	// Outliers
	const AFC_MORE_STRIPPING = [
		{ name: 'black_oak', stripped: 'oak', stripped_mod: 'tfc' },
		{ name: 'rainbow_eucalyptus', stripped: 'eucalyptus', stripped_mod: 'afc' },
		{ name: 'gum_arabic', stripped: 'acacia', stripped_mod: 'tfc' },
		{ name: 'redcedar', stripped: 'cypress', stripped_mod: 'afc' },
		{ name: 'rubber_fig', stripped: 'fig', stripped_mod: 'afc' },
		{ name: 'poplar', stripped: 'aspen', stripped_mod: 'tfc' }
	];

	AFC_MORE_STRIPPING.forEach(x => {
		if (!woodItemExists(`afc:wood/log/${x.name}`) || !woodItemExists(`${x.stripped_mod}:wood/stripped_log/${x.stripped}`)) return; // [PORT] гвард

		event.recipes.gtceu
			.lathe(`tfg:${x.name}_stripped_log_from_log`)
			.itemInputs(`afc:wood/log/${x.name}`)
			.itemOutputs(`${x.stripped_mod}:wood/stripped_log/${x.stripped}`)
			.duration(50)
			.EUt(GTValues.VA[GTValues.ULV]);

		event.recipes.createvintageneoforged
			.polishing(`${x.stripped_mod}:wood/stripped_log/${x.stripped}`, `afc:wood/log/${x.name}`)
			.speedLimits(0)
			.processingTime(50 * NB_WOOD_VI_DURATION_MULT)
			.id(`tfg:vi/lathe/${x.name}_stripped_log_from_log`);

		event.recipes.gtceu
			.lathe(`tfg:${x.name}_stripped_wood_from_log_wood`)
			.itemInputs(`afc:wood/wood/${x.name}`)
			.itemOutputs(`${x.stripped_mod}:wood/stripped_wood/${x.stripped}`)
			.duration(50)
			.EUt(GTValues.VA[GTValues.ULV]);

		event.recipes.createvintageneoforged
			.polishing(`${x.stripped_mod}:wood/stripped_wood/${x.stripped}`, `afc:wood/wood/${x.name}`)
			.speedLimits(0)
			.processingTime(50 * NB_WOOD_VI_DURATION_MULT)
			.id(`tfg:vi/lathe/${x.name}_stripped_wood_from_log_wood`);
	});

	// #endregion

	// #region General

	// Ladder
	event.shaped('8x minecraft:ladder', [
		'A A',
		'AAA',
		'A A'
	], {
		A: '#c:rods/wooden'
	})
		.id('gtceu:shaped/ladder');

	// [PORT-Ф10] ad_astra отсутствует — вычитать aeronos/strophar не из чего, остаётся весь #tfc:lumber

	// [PORT-GTM-REPLACE] replaceOutput по GT-рецепту крашится (UOE, immutable) + '8x' невалиден для replace —
	// компенсируем отдельным рецептом с бОльшим выходом ниже (tfg:ladder_from_lumber даёт 16x).
	// event.replaceOutput({ id: 'gtceu:assembler/ladder' }, 'minecraft:ladder', '8x minecraft:ladder')

	// [PORT-Ф10] замена входа сводилась к вычитанию космодревесины ad_astra из #tfc:lumber —
	// без ad_astra замена вырождается в no-op (1.20-id: tfc:crafting/vanilla/ladder -> 1.21: tfc:crafting/ladder)
	// event.replaceInput({ id: 'tfc:crafting/ladder' }, '#tfc:lumber', nonAdAstraLumber)

	event.recipes.gtceu.assembler('tfg:ladder_from_lumber')
		.itemInputs('6x #tfc:lumber') // [PORT] Ingredient.withCount -> sized-строка
		.itemOutputs('16x minecraft:ladder')
		.circuit(7)
		.duration(40)
		.EUt(4)

	// Sticks
	event.remove({ id: 'gtceu:shaped/stick_normal' });
	event.remove({ id: 'gtceu:lathe/lathe_planks' });
	event.remove({ id: 'gtceu:lathe/lathe_saplings' });

	event.recipes.gtceu.lathe('tfg:planks_to_sticks')
		.itemInputs('#minecraft:planks')
		.itemOutputs('8x minecraft:stick')
		.duration(20)
		.EUt(7)

	event.shapeless('2x minecraft:stick', ['#minecraft:saplings', '#c:tools/knife'])
		.id('tfg:strip_saplings')

	event.recipes.gtceu.cutter('tfg:saplings_to_sticks')
		.itemInputs('#minecraft:saplings')
		.itemOutputs('2x minecraft:stick')
		.duration(20)
		.EUt(7)

	event.recipes.gtceu.packer('tfg:stick_bunch')
		.itemInputs('9x #c:rods/wooden')
		.circuit(5)
		.itemOutputs('tfc:stick_bunch')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.packer('tfg:stick_bundle')
		.itemInputs('18x #c:rods/wooden')
		.circuit(8)
		.itemOutputs('tfc:stick_bundle')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT] greate.compacting -> create.compacting (circuitNumber/recipeTier — расширения greate, вырезаны);
	// голые '#теги' в Create-схемах парсятся как жидкость -> {tag: ...}-объекты
	event.recipes.create.compacting('tfc:stick_bunch', [
		{ tag: 'c:rods/wooden' }, { tag: 'c:rods/wooden' }, { tag: 'c:rods/wooden' },
		{ tag: 'c:rods/wooden' }, { tag: 'c:rods/wooden' }, { tag: 'c:rods/wooden' },
		{ tag: 'c:rods/wooden' }, { tag: 'c:rods/wooden' }, { tag: 'c:rods/wooden' }])
		.id('tfg:pressing/stick_bunch')

	event.recipes.create.compacting('tfc:stick_bundle', ['tfc:stick_bunch', 'tfc:stick_bunch'])
		.id('tfg:pressing/stick_bundle')

	// #endregion

	// #region TFC

	global.TFC_WOOD_TYPES.forEach(wood => {

		// Removed unused assets
		// [PORT-FIX] id рецептов TFC 1.21: crafting/wood/{wood}_{kind} -> crafting/wood/{kind}/{wood}
		event.remove({ id: `tfc:crafting/wood/axle/${wood}` });
		event.remove({ id: `tfc:crafting/wood/bladed_axle/${wood}` });
		event.remove({ id: `tfc:crafting/wood/encased_axle/${wood}` });
		event.remove({ id: `tfc:crafting/wood/clutch/${wood}` });
		event.remove({ id: `tfc:crafting/wood/gear_box/${wood}` });
		event.remove({ id: `tfc:crafting/wood/water_wheel/${wood}` });

		// Removed recipe changes
		event.remove({ id: `tfc:crafting/wood/planks/${wood}` });
		event.remove({ id: `tfc:crafting/wood/pressure_plate/${wood}` });
		event.remove({ id: `tfc:crafting/wood/lumber/${wood}_from_logs` });
		event.remove({ id: `tfc:crafting/wood/button/${wood}` });
		event.remove({ id: `tfc:crafting/wood/planks/${wood}_slab` });
		event.remove({ id: `tfc:crafting/wood/lumber/${wood}_from_slabs` });
		event.remove({ id: `tfc:crafting/wood/lumber/${wood}_from_planks` });
		event.remove({ id: `tfc:crafting/wood/planks/${wood}_stairs` });
		event.remove({ id: `tfc:crafting/wood/lumber/${wood}_from_stairs` });

		TFGWoodBuilder(
			event,
			`${wood}`,
			`tfc:wood/lumber/${wood}`,
			`#tfc:${wood}_logs`,
			`tfc:wood/log/${wood}`,
			`tfc:wood/stripped_log/${wood}`,
			`tfc:wood/planks/${wood}`,
			`tfc:wood/planks/${wood}_stairs`,
			`tfc:wood/planks/${wood}_slab`,
			null,
			null,
			null,
			null,
			null,
			null,
			`tfc:wood/planks/${wood}_pressure_plate`,
			`tfc:wood/planks/${wood}_button`,
			`tfc:wood/wood/${wood}`,
			`tfc:wood/stripped_wood/${wood}`,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			`tfg:wood/crafting_station/${wood}`,
			`tfc:wood/planks/${wood}_workbench`,
			`tfg:wood/rope_ladder/${wood}`
		);
	});

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo отсутствует — recycling вернуть после Ф4
	// registerTFGWoodRecycling('tfc', global.TFC_HARDWOOD_TYPES, GTMaterials.get('hardwood'));
	// registerTFGWoodRecycling('tfc', global.TFC_SOFTWOOD_TYPES, GTMaterials.Wood);

	// Special handling for the palm mosaics

	// [PORT-FIX] В TFC 1.21 рецептов palm_mosaic в датапаке нет — удалять нечего, свои добавляем ниже
	// event.remove({ id: `tfc:crafting/wood/palm_mosaic` });
	// event.remove({ id: `tfc:crafting/wood/palm_mosaic_slab` });
	// event.remove({ id: `tfc:crafting/wood/palm_mosaic_slab_undo` });
	// event.remove({ id: `tfc:crafting/wood/palm_mosaic_stairs` });
	// event.remove({ id: `tfc:crafting/wood/palm_mosaic_stairs_undo` });

	TFGMosaicWoodBuilder(
		event,
		'palm',
		'tfc:wood/lumber/palm',
		'tfc:wood/planks/palm',
		'tfc:wood/planks/palm_mosaic',
		'tfc:wood/planks/palm_stairs',
		'tfc:wood/planks/palm_mosaic_stairs',
		'tfc:wood/planks/palm_slab',
		'tfc:wood/planks/palm_mosaic_slab'
	);

	// #endregion

	// #region Minecraft

	// Bamboo

	// Removed recipe changes
	event.remove({ output: 'minecraft:stripped_bamboo_block' });
	event.remove({ output: 'minecraft:bamboo_planks' });
	event.remove({ output: 'minecraft:bamboo_slab' });
	event.remove({ output: 'minecraft:bamboo_stairs' });
	event.remove({ output: 'minecraft:bamboo_fence' });
	event.remove({ output: 'minecraft:bamboo_fence_gate' });
	event.remove({ output: 'minecraft:bamboo_door' });
	event.remove({ output: 'minecraft:bamboo_trapdoor' });
	event.remove({ output: 'minecraft:bamboo_button' });
	event.remove({ output: 'minecraft:bamboo_mosaic' });
	event.remove({ output: 'minecraft:bamboo_mosaic_slab' });
	event.remove({ output: 'minecraft:bamboo_mosaic_stairs' });
	event.remove({ output: 'minecraft:bamboo_pressure_plate' });

	// [PORT-Ф4-TODO] tfg:wood/lumber/bamboo не зарегистрирован — lumber-рецепты пропустятся до его появления
	TFGWoodBuilder(
		event,
		'bamboo',
		'tfg:wood/lumber/bamboo',
		'#minecraft:bamboo_blocks',
		'minecraft:bamboo_block',
		'minecraft:stripped_bamboo_block',
		'minecraft:bamboo_planks',
		'minecraft:bamboo_stairs',
		'minecraft:bamboo_slab',
		'minecraft:bamboo_door',
		'minecraft:bamboo_trapdoor',
		'minecraft:bamboo_fence',
		null,
		'minecraft:bamboo_fence_gate',
		null,
		'minecraft:bamboo_pressure_plate',
		'minecraft:bamboo_button',
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null
	);

	TFGMosaicWoodBuilder(
		event,
		'bamboo',
		'tfg:wood/lumber/bamboo',
		'minecraft:bamboo_planks',
		'minecraft:bamboo_mosaic',
		'minecraft:bamboo_stairs',
		'minecraft:bamboo_mosaic_stairs',
		'minecraft:bamboo_slab',
		'minecraft:bamboo_mosaic_slab'
	);

	// #endregion

	// #region Gregtech

	// Removed recipe changes
	event.remove({ output: 'gtceu:treated_wood_door' });
	event.remove({ output: 'gtceu:treated_wood_trapdoor' });
	event.remove({ output: 'gtceu:treated_wood_slab' });
	event.remove({ output: 'gtceu:treated_wood_stairs' });
	event.remove({ output: 'gtceu:treated_wood_fence' });
	event.remove({ output: 'gtceu:treated_wood_fence_gate' });
	event.remove({ output: 'gtceu:treated_wood_button' });
	event.remove({ output: 'gtceu:treated_wood_pressure_plate' });

	// Treated wood
	TFGWoodBuilder(
		event,
		'treated_wood',
		'gtceu:treated_wood_plate',
		null,
		null,
		null,
		'gtceu:treated_wood_planks',
		'gtceu:treated_wood_stairs',
		'gtceu:treated_wood_slab',
		'gtceu:treated_wood_door',
		'gtceu:treated_wood_trapdoor',
		'gtceu:treated_wood_fence',
		null,
		'gtceu:treated_wood_fence_gate',
		null,
		'gtceu:treated_wood_pressure_plate',
		'gtceu:treated_wood_button',
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null
	);

	// #endregion

})
