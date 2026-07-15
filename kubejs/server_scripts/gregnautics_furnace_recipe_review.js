// priority: 5
"use strict";

const GREGNAUTICS_FURNACE_TO_GRILL_RECIPE_IDS = [
	"ae2:network/blocks/energy_vibration_chamber",
	"createthrusters:processing_upgrade_smelting_t1",
	"sophisticatedbackpacks:smelting_upgrade"
];

const GREGNAUTICS_GTCEU_FURNACE_OUTPUTS_TO_GRILL = [
	"gtceu:lp_steam_furnace",
	"gtceu:hp_steam_furnace",
	"gtceu:lv_electric_furnace",
	"gtceu:mv_electric_furnace",
	"gtceu:hv_electric_furnace",
	"gtceu:ev_electric_furnace",
	"gtceu:iv_electric_furnace",
	"gtceu:luv_electric_furnace",
	"gtceu:zpm_electric_furnace",
	"gtceu:uv_electric_furnace",
	"gtceu:lv_arc_furnace",
	"gtceu:mv_arc_furnace",
	"gtceu:hv_arc_furnace",
	"gtceu:ev_arc_furnace",
	"gtceu:iv_arc_furnace",
	"gtceu:luv_arc_furnace",
	"gtceu:zpm_arc_furnace",
	"gtceu:uv_arc_furnace",
	"gtceu:rotary_hearth_furnace"
];

const GREGNAUTICS_GTCEU_HEAT_MACHINE_OUTPUTS_TO_GRILL = [
	"gtceu:lp_steam_solid_boiler",
	"gtceu:hp_steam_solid_boiler",
	"gtceu:lp_steam_alloy_smelter",
	"gtceu:hp_steam_alloy_smelter",
	"gtceu:lv_alloy_smelter",
	"gtceu:mv_alloy_smelter",
	"gtceu:hv_alloy_smelter",
	"gtceu:ev_alloy_smelter",
	"gtceu:iv_alloy_smelter",
	"gtceu:luv_alloy_smelter",
	"gtceu:zpm_alloy_smelter",
	"gtceu:uv_alloy_smelter"
];

const GREGNAUTICS_METAL_GRILLS = "#gregnautics:metal_grills";

ServerEvents.tags("item", event => {
	event.add("gregnautics:metal_grills", "tfc:wrought_iron_grill");
	event.add("gregnautics:metal_grills", "castirongrill:cast_iron_grill");
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: furnace_recipe_review recipes event start");
	GREGNAUTICS_FURNACE_TO_GRILL_RECIPE_IDS.forEach(id => {
		event.replaceInput({ id: id, type: "minecraft:crafting_shaped" }, "minecraft:furnace", GREGNAUTICS_METAL_GRILLS);
	});

	GREGNAUTICS_GTCEU_FURNACE_OUTPUTS_TO_GRILL.forEach(output => {
		event.replaceInput({ output: output, type: "minecraft:crafting_shaped" }, "minecraft:furnace", GREGNAUTICS_METAL_GRILLS);
	});

	GREGNAUTICS_GTCEU_HEAT_MACHINE_OUTPUTS_TO_GRILL.forEach(output => {
		event.replaceInput({ output: output, type: "minecraft:crafting_shaped" }, "minecraft:furnace", GREGNAUTICS_METAL_GRILLS);
	});

	event.replaceInput({ output: "gtceu:multi_smelter", type: "minecraft:crafting_shaped" }, "minecraft:furnace", "tfc:blast_furnace");
});
