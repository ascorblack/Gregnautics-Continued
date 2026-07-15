// priority: -100
"use strict";

ServerEvents.tags("item", event => {
	event.remove("woodencog:unburnable", "woodencog:fireclay_crucible");
	event.remove("woodencog:unburnable", "woodencog:unfired_fireclay_crucible");
	event.remove("tfc:unfired_pottery", "woodencog:unfired_fireclay_crucible");

	event.remove("c:foods", "htm:fish_fillet");
	event.remove("c:foods/raw_fish/fish_fillet", "htm:fish_fillet");
	event.remove("c:foods/raw_meat/bacon", "farmersdelight:raw_bacon");

	event.remove("tfcsbu:forge_tools", "touhou_little_maid:smart_slab_has_maid");
});
