"use strict";

const GREGNAUTICS_VANILLA_ANVILS = [
	"minecraft:anvil",
	"minecraft:chipped_anvil",
	"minecraft:damaged_anvil"
];

const GREGNAUTICS_LOW_PRESSURE_MACHINE_OUTPUTS = [
	"gtceu:lp_steam_alloy_smelter",
	"gtceu:lp_steam_compressor",
	"gtceu:lp_steam_extractor",
	"gtceu:lp_steam_forge_hammer",
	"gtceu:lp_steam_furnace",
	"gtceu:lp_steam_liquid_boiler",
	"gtceu:lp_steam_macerator",
	"gtceu:lp_steam_miner",
	"gtceu:lp_steam_rock_crusher",
	"gtceu:lp_steam_solar_boiler",
	"gtceu:lp_steam_solid_boiler"
];

function gregnauticsReplaceVanillaAnvils(event, filter, replacement) {
	GREGNAUTICS_VANILLA_ANVILS.forEach(anvil => {
		event.replaceInput(filter, anvil, replacement);
	});
}

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: anvil_recipe_unification recipes event start");
	GREGNAUTICS_LOW_PRESSURE_MACHINE_OUTPUTS.forEach(output => {
		gregnauticsReplaceVanillaAnvils(
			event,
			{ type: "minecraft:crafting_shaped", output: output },
			"tfc:metal/anvil/steel"
		);
		gregnauticsReplaceVanillaAnvils(
			event,
			{ type: "minecraft:crafting_shapeless", output: output },
			"tfc:metal/anvil/steel"
		);
	});

	gregnauticsReplaceVanillaAnvils(event, [
		{ type: "minecraft:crafting_shaped" },
		{ type: "minecraft:crafting_shapeless" }
	], "tfc:metal/anvil/black_steel");

	event.remove({ type: "minecraft:crafting_shaped", output: "minecraft:anvil" });
	event.remove({ type: "minecraft:crafting_shapeless", output: "minecraft:anvil" });
});
