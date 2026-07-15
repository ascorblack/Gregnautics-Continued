// priority: 20
"use strict";

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: field_guide_recipe_aliases recipes event start");
	if (Item.exists("tfc:ore/saltpeter") && Item.exists("tfc:powder/saltpeter")) {
		event.recipes.tfc.quern("4x tfc:powder/saltpeter", "tfc:ore/saltpeter")
			.id("tfc:quern/saltpeter");
	}

	if (Item.exists("tfc:ore/sulfur") && Item.exists("tfc:powder/sulfur")) {
		event.recipes.tfc.quern("4x tfc:powder/sulfur", "tfc:ore/sulfur")
			.id("tfc:quern/sulfur");
	}

	if (Item.exists("tfc:powder/saltpeter") && Item.exists("tfc:powder/sulfur") && Item.exists("tfc:powder/charcoal") && Item.exists("tfc:powder/graphite")) {
		event.shapeless("12x minecraft:gunpowder", [
			"tfc:powder/saltpeter",
			"tfc:powder/saltpeter",
			"tfc:powder/saltpeter",
			"tfc:powder/saltpeter",
			"tfc:powder/sulfur",
			"tfc:powder/sulfur",
			"tfc:powder/charcoal",
			"tfc:powder/charcoal",
			"tfc:powder/graphite"
		]).id("tfc:crafting/gunpowder_graphite");
	}

	if (Item.exists("minecraft:clay") && Item.exists("minecraft:clay_ball")) {
		event.shaped("minecraft:clay", [
			"AA",
			"AA"
		], {
			A: "minecraft:clay_ball"
		}).id("minecraft:clay");

		event.shapeless("4x minecraft:clay_ball", [
			"minecraft:clay"
		]).id("minecraft:clay_to_clay_ball");
	}

	if (Item.exists("advancedtfctech:fleshing_blades")) {
		event.recipes.tfc.anvil(
			"advancedtfctech:fleshing_blades",
			"#c:sheets/wrought_iron",
			["upset_third_last", "shrink_second_last", "hit_last"]
		)
			.tier(3)
			.applyBonus()
			.id("advancedtfctech:anvil/fleshing_blades");
	}

	if (Item.exists("rnr:roof_frame")) {
		event.shaped("6x rnr:roof_frame", [
			"XYX",
			"Y Y",
			"XYX"
		], {
			X: "#tfc:lumber",
			Y: "#c:rods/wooden"
		}).id("rnr:crafting/roof_framing");
	}
});
