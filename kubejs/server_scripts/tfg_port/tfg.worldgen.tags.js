// priority: 0
"use strict";

// [PORT] TFG 1.20.1 tfg/overworld/tags.overworld.js (частично) -> 1.21.1 (Gregnautics), Ф5 (worldgen).
// Основная привязка жил (removeAll('tfc:in_biome/veins') + список gregnautics:earth/vein/*)
// живёт в gregnautics_worldgen_tags.js — здесь только дополнения для TFC 4.x.

ServerEvents.tags("worldgen/placed_feature", event => {
	// [PORT-FIX] TFC 4.x разбил тег жил на под-теги (data/tfc/tags/worldgen/placed_feature/in_biome/veins/*):
	// montane, river, collisional_mountains, kaolin. removeAll('tfc:in_biome/veins') их НЕ чистит —
	// без этого дефолтные TFC-жилы (montane_*, amethyst/opal, ruby_marble_belt) продолжали бы генерироваться.
	event.removeAll("tfc:in_biome/veins/montane");
	event.removeAll("tfc:in_biome/veins/river");
	event.removeAll("tfc:in_biome/veins/collisional_mountains");
	// tfc:in_biome/veins/kaolin оставляем — TFG возвращал tfc:vein/kaolin_disc.

	// Дикие посевы TFG + травы/специи Firmalife.
	// tfc:feature/crops входит в tfc:feature/land_plants (проверено по jar TFC 4.2.5).
	[
		"gregnautics:earth/crop/sunflower_patch",
		"gregnautics:earth/crop/rapeseed_patch",
		"gregnautics:earth/crop/flax_patch",
		"gregnautics:earth/crop/radish_patch",
		"gregnautics:earth/crop/lentil_patch",
		"gregnautics:earth/crop/cucumber_patch",
		// Травы и специи (Firmalife)
		"gregnautics:earth/crop/basil_patch",
		"gregnautics:earth/crop/bay_laurel_patch",
		"gregnautics:earth/crop/cardamom_patch",
		"gregnautics:earth/crop/cilantro_patch",
		"gregnautics:earth/crop/cumin_patch",
		"gregnautics:earth/crop/oregano_patch",
		"gregnautics:earth/crop/pimento_patch",
		"gregnautics:earth/crop/vanilla_patch"
	].forEach(feature => event.add("tfc:feature/crops", feature));

	// [PORT-FIX] TFC 4.x сам добавил дикие чечевицу и редис (в TFC 3.x их не было —
	// их добавлял TFG). Убираем нативные, чтобы не дублировались с tfg:lentil_wild/tfg:radish_wild.
	event.remove("tfc:feature/crops", "tfc:plant/wild_crop/lentil_patch");
	event.remove("tfc:feature/crops", "tfc:plant/wild_crop/radish_patch");

	// Подземная декорация: кремень и песок в пещерах (из ориг. registerTFGOverworldPlacedFeatures).
	// tfg:glow_lichen, tfg:earth/sulfur_patch (beneath:sulfur), tfg:earth/oil_spout — отложены (см. F5_WORLDGEN_NOTES.md).
	event.add("tfc:in_biome/underground_decoration", "gregnautics:earth/flint_patch");
	// [PORT-Ф4-TODO] event.add("tfc:in_biome/underground_decoration", "gregnautics:earth/sand"); — кучки песка ждут блоков tfg:pile/*
});
