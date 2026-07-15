// priority: 5
"use strict";

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: create_gravel_sand_clay_cleanup recipes event start");
	event.remove({ id: "create:splashing/sand" });
	event.remove({ id: "create:crushing/gravel" });
	event.recipes.create.crushing(
		[
			"minecraft:sand",
			CreateItem.of("minecraft:flint", 0.1)
		],
		"minecraft:gravel"
	).id("create:crushing/gravel");
});
