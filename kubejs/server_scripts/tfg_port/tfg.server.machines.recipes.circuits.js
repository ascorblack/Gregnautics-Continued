// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.circuits.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] Жидкости tfg:woods_metal и tfg:bi_pb_sn_cd_in_tl — GT-материалы TFG (tfg.materials.solders.js),
//   регистрация заблокирована (апстрим-баг GTM8). Все рецепты/замены с ними закомментированы.
// [PORT] global.modifyRecipe (замена жидкостей в стоковых рецептах) не портирован — блоки массовых замен
//   припоя (CIRCUIT_ASSEMBLER_RECIPE_TIERS / ASSEMBLY_LINE_RECIPE_TIERS) отключены целиком. [PORT-TODO]
// [PORT] KubeJS 7: запись в global из серверных скриптов запрещена — global.SOLDER_TIERS -> локальная const.
// [PORT] Активна только переработка мейнфрейма IV (требование nano-чипа): tin-варианты используют
//   стоковую gtceu:soldering_alloy.

const TIN_REPLACEMENT = "tin_replacement"
const SOLDER_REPLACEMENT = "solder_replacement"

// [PORT] было global.SOLDER_TIERS (KubeJS 7: глобали в server_scripts read-only)
const SOLDER_TIERS = {
	"mv": {
		"tin_replacement": "gtceu:soldering_alloy",
		"solder_replacement": "tfg:woods_metal"
	},
	"hv": {
		"tin_replacement": "gtceu:soldering_alloy",
		"solder_replacement": "tfg:woods_metal"
	},
	"ev": {
		"tin_replacement": "tfg:woods_metal",
		"solder_replacement": "tfg:bi_pb_sn_cd_in_tl"
	},
	"iv": {
		"tin_replacement": "tfg:woods_metal",
		"solder_replacement": "tfg:bi_pb_sn_cd_in_tl"
	},
	"luv": {
		"tin_replacement": "tfg:woods_metal",
		"solder_replacement": "tfg:bi_pb_sn_cd_in_tl"
	},
	"zpm": {
		"tin_replacement": "tfg:woods_metal",
		"solder_replacement": "tfg:bi_pb_sn_cd_in_tl"
	},
	"uv": {
		"tin_replacement": "tfg:woods_metal",
		"solder_replacement": "tfg:bi_pb_sn_cd_in_tl"
	}
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.circuits start')

	//#region Microprocessor mainframe requires nano chips

	event.remove({ id: 'gtceu:circuit_assembler/mainframe_iv_asmd_soldering_alloy'})
	event.remove({ id: 'gtceu:circuit_assembler/mainframe_iv'})
	event.remove({ id: 'gtceu:circuit_assembler/mainframe_iv_soldering_alloy'})
	event.remove({ id: 'gtceu:circuit_assembler/mainframe_iv_asmd'})

	event.recipes.gtceu.circuit_assembler('tfg:mainframe_iv')
		.itemInputs('2x gtceu:aluminium_frame', '2x gtceu:micro_processor_computer', '8x #gtceu:inductors', '16x #gtceu:capacitors', 'gtceu:nano_cpu_chip', '16x gtceu:annealed_copper_single_wire')
		.inputFluids(Fluid.of(SOLDER_TIERS["hv"][TIN_REPLACEMENT], 576))
		.itemOutputs('gtceu:micro_processor_mainframe')
		.duration(20 * 40)
		.EUt(GTValues.VA[GTValues.HV])
		.cleanroom(CleanroomType.CLEANROOM)

	// [PORT-Ф2] tfg:woods_metal (дешёвый вариант с «продвинутым припоем») — жидкость не зарегистрирована
	// event.recipes.gtceu.circuit_assembler('tfg:mainframe_iv_soldering_alloy')
	// 	.itemInputs('2x gtceu:aluminium_frame', '2x gtceu:micro_processor_computer', '8x #gtceu:inductors', '16x #gtceu:capacitors', 'gtceu:nano_cpu_chip', '16x gtceu:annealed_copper_single_wire')
	// 	.inputFluids(Fluid.of(SOLDER_TIERS["hv"][SOLDER_REPLACEMENT], 288))
	// 	.itemOutputs('gtceu:micro_processor_mainframe')
	// 	.duration(20 * 40)
	// 	.EUt(GTValues.VA[GTValues.HV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	event.recipes.gtceu.circuit_assembler('tfg:mainframe_iv_asmd')
		.itemInputs('2x gtceu:aluminium_frame', '2x gtceu:micro_processor_computer', '2x gtceu:advanced_smd_inductor', '4x gtceu:advanced_smd_capacitor', 'gtceu:nano_cpu_chip', '16x gtceu:annealed_copper_single_wire')
		.inputFluids(Fluid.of(SOLDER_TIERS["hv"][TIN_REPLACEMENT], 576))
		.itemOutputs('gtceu:micro_processor_mainframe')
		.duration(20 * 20)
		.EUt(GTValues.VA[GTValues.HV])
		.cleanroom(CleanroomType.CLEANROOM)

	// [PORT-Ф2] tfg:woods_metal
	// event.recipes.gtceu.circuit_assembler('tfg:mainframe_iv_asmd_soldering_alloy')
	// 	.itemInputs('2x gtceu:aluminium_frame', '2x gtceu:micro_processor_computer', '2x gtceu:advanced_smd_inductor', '4x gtceu:advanced_smd_capacitor', 'gtceu:nano_cpu_chip', '16x gtceu:annealed_copper_single_wire')
	// 	.inputFluids(Fluid.of(SOLDER_TIERS["hv"][SOLDER_REPLACEMENT], 288))
	// 	.itemOutputs('gtceu:micro_processor_mainframe')
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VA[GTValues.HV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	//#endregion

	//#region Replace solders

	// Circuit assembler recipes

	// [PORT] Отключено целиком: global.modifyRecipe не портирован, а замены ev+ тиров требуют Ф2-жидкости.
	// mv/hv-тиры (forge:tin -> gtceu:soldering_alloy) можно вернуть локальным хелпером после Ф2. [PORT-TODO]
	// const CIRCUIT_ASSEMBLER_RECIPE_TIERS = {
	// 	"gtceu:circuit_assembler/integrated_circuit_lv":           "mv",
	// 	"gtceu:circuit_assembler/integrated_circuit_mv":           "mv",
	// 	"gtceu:circuit_assembler/integrated_circuit_hv":           "mv",
	// 	"gtceu:circuit_assembler/nand_chip_ulv_good_board":        "hv",
	// 	"gtceu:circuit_assembler/nand_chip_ulv_plastic_board":     "hv",
	// 	"gtceu:circuit_assembler/microprocessor_lv":               "hv",
	// 	"gtceu:circuit_assembler/microprocessor_lv_soc":           "hv",
	// 	"gtceu:circuit_assembler/processor_mv":                    "hv",
	// 	"gtceu:circuit_assembler/processor_mv_soc":                "hv",
	// 	"gtceu:circuit_assembler/processor_assembly_hv":           "hv",
	// 	"gtceu:circuit_assembler/workstation_ev":                  "hv",
	// 	// Microprocessor mainframes handled above
	// 	"gtceu:circuit_assembler/data_stick":                      "hv",
	// 	"gtceu:circuit_assembler/nano_processor_hv":               "ev",
	// 	"gtceu:circuit_assembler/nano_processor_hv_asmd":          "ev",
	// 	"gtceu:circuit_assembler/nano_processor_hv_soc":           "ev",
	// 	"gtceu:circuit_assembler/nano_processor_assembly_ev":      "ev",
	// 	"gtceu:circuit_assembler/nano_processor_assembly_ev_asmd": "ev",
	// 	"gtceu:circuit_assembler/nano_computer_iv":                "ev",
	// 	"gtceu:circuit_assembler/nano_computer_iv_asmd":           "ev",
	// 	"gtceu:circuit_assembler/nano_mainframe_luv":              "ev",
	// 	"gtceu:circuit_assembler/nano_mainframe_luv_asmd":         "ev",
	// 	"gtceu:circuit_assembler/lapotronic_energy_orb":           "ev",
	// 	"gtceu:circuit_assembler/data_orb":                        "ev",
	// 	"gtceu:circuit_assembler/quantum_processor_ev":            "iv",
	// 	"gtceu:circuit_assembler/quantum_processor_ev_asmd":       "iv",
	// 	"gtceu:circuit_assembler/quantum_processor_ev_soc":        "iv",
	// 	"gtceu:circuit_assembler/quantum_assembly_iv":             "iv",
	// 	"gtceu:circuit_assembler/quantum_assembly_iv_asmd":        "iv",
	// 	"gtceu:circuit_assembler/quantum_computer_luv":            "iv",
	// 	"gtceu:circuit_assembler/quantum_computer_luv_asmd":       "iv",
	// 	"gtceu:circuit_assembler/quantum_mainframe_zpm":           "iv",
	// 	"gtceu:circuit_assembler/quantum_mainframe_zpm_asmd":      "iv",
	// 	"gtceu:circuit_assembler/crystal_processor_iv":            "luv",
	// 	"gtceu:circuit_assembler/crystal_processor_iv_soc":        "luv",
	// 	"gtceu:circuit_assembler/crystal_assembly_luv":            "luv",
	// 	"gtceu:circuit_assembler/crystal_computer_zpm":            "luv",
	// 	"gtceu:circuit_assembler/wetware_processor_luv":           "zpm",
	// 	"gtceu:circuit_assembler/wetware_processor_luv_soc":       "zpm",
	// 	"gtceu:circuit_assembler/wetware_processor_assembly_zpm":  "zpm",
	// 	"gtceu:circuit_assembler/data_module":                     "zpm",
	// }

	// Object.keys(CIRCUIT_ASSEMBLER_RECIPE_TIERS).forEach((recipe) => { ... global.modifyRecipe ... })

	// Assembly line recipes

	// [PORT-Ф2] Все замены требуют tfg:woods_metal / tfg:bi_pb_sn_cd_in_tl + global.modifyRecipe — отключено.
	// const ASSEMBLY_LINE_RECIPE_TIERS = { ... } // [PORT] см. оригинал (luv/zpm/uv списки)
	// Object.keys(ASSEMBLY_LINE_RECIPE_TIERS).forEach((recipe) => { ... })

	//#endregion

	//#region Solder recipes

	// Woods metal

	// [PORT-Ф2] Материал woods_metal в стоковом GTM8 не существует — удалять нечего
	// event.remove({ id: 'gtceu:extractor/extract_woods_metal_dust' })
	// event.remove({ id: 'gtceu:extractor/extract_woods_metal_ingot' })
	// event.remove({ id: 'gtceu:extractor/extract_woods_metal_nugget' })
	// event.remove({ id: 'gtceu:extractor/extract_woods_metal_block' })

	// [PORT-Ф2] c:dusts/woods_metal и жидкость tfg:woods_metal не зарегистрированы
	// event.recipes.gtceu.mixer('tfg:woods_metal')
	// 	.itemInputs('4x #c:dusts/bismuth', '2x #c:dusts/lead', '1x #c:dusts/tin', '1x #c:dusts/cadmium')
	// 	.itemOutputs('8x #c:dusts/woods_metal')
	// 	.duration(20 * 10)
	// 	.circuit(3)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.pyrolyse_oven('tfg:liquid_woods_metal')
	// 	.itemInputs('8x #c:dusts/woods_metal')
	// 	.outputFluids(Fluid.of('tfg:woods_metal', 1152))
	// 	.duration(20 * 96)
	// 	.circuit(1)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// event.recipes.gtceu.pyrolyse_oven('tfg:liquid_woods_metal_boosted')
	// 	.itemInputs('8x #c:dusts/woods_metal')
	// 	.inputFluids(Fluid.of('gtceu:nitrogen', 1000))
	// 	.outputFluids(Fluid.of('tfg:woods_metal', 1152))
	// 	.duration(20 * 48)
	// 	.circuit(2)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// BiPbSnCdInTl

	// [PORT-Ф2] lorandite/thallium_sulfate/thallium/zinc_sulfate — материалы TFG (tfg.materials.solders.js)
	// event.recipes.gtceu.large_chemical_reactor('tfg:lorandite_to_thallium_sulfate')
	// 	.itemInputs('8x #c:dusts/lorandite')
	// 	.inputFluids(Fluid.of('gtceu:sulfuric_acid', 2000))
	// 	.itemOutputs('7x #c:dusts/thallium_sulfate', '5x #c:dusts/arsenic_trioxide', '4x #c:dusts/sulfur')
	// 	.outputFluids(Fluid.of('minecraft:water', 1000), Fluid.of('gtceu:hydrogen_sulfide', 1000))
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VA[GTValues.EV])

	// event.recipes.gtceu.chemical_reactor('tfg:thallium_sulfate_to_zinc_sulfate')
	// 	.itemInputs('7x #c:dusts/thallium_sulfate', '1x #c:dusts/zinc')
	// 	.itemOutputs('2x #c:dusts/thallium', '6x #c:dusts/zinc_sulfate')
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VA[GTValues.EV])

	// event.recipes.gtceu.alloy_blast_smelter('tfg:bi_pb_sn_cd_in_tl')
	// 	.itemInputs('8x #c:dusts/bismuth', '4x #c:dusts/lead', '2x #c:dusts/tin', '3x #c:dusts/indium', '2x #c:dusts/cadmium', '1x #c:dusts/thallium')
	// 	.outputFluids(Fluid.of('tfg:bi_pb_sn_cd_in_tl', 2880))
	// 	.duration(20 * 480)
	// 	.blastFurnaceTemp(3700)
	// 	.EUt(GTValues.VA[GTValues.EV])

	// event.recipes.gtceu.alloy_blast_smelter('tfg:bi_pb_sn_cd_in_tl_boosted')
	// 	.itemInputs('8x #c:dusts/bismuth', '4x #c:dusts/lead', '2x #c:dusts/tin', '3x #c:dusts/indium', '2x #c:dusts/cadmium', '1x #c:dusts/thallium')
	// 	.inputFluids(Fluid.of('gtceu:helium', 2000))
	// 	.outputFluids(Fluid.of('tfg:bi_pb_sn_cd_in_tl', 2880))
	// 	.duration(20 * 321.6)
	// 	.blastFurnaceTemp(3700)
	// 	.EUt(GTValues.VA[GTValues.EV])

	//#endregion
})
