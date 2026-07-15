// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/ores_and_materials/recipes.pipes_hidden.js
//        (registerTFGMaterialHiddenPipesTags -> ServerEvents.tags('item'),
//         registerTFGMaterialRemovePipesRecipes -> ServerEvents.recipes).
// [PORT] forge:* -> c:*.
// [PORT] Часть материалов (ostrum — космос Ф10; tungsten_bismuth_oxide_composite — TFG-материал Ф2;
//        blue_steel/red_steel/black_bronze и пр. трубы появятся только после Ф2-модификаций материалов)
//        сейчас не имеет труб — соответствующие теги пусты, add/remove по ним безвредны и оставлены,
//        чтобы сработать автоматически после разблокировки Ф2.

//#region Hide Items

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.pipes_hidden tags start')

	// Hide Fluid Pipes from EMI

	const hideFluidPipes = (material) => {
		const sizes = ['tiny', 'small', 'normal', 'large', 'huge', 'quadruple', 'nonuple'];
		sizes.forEach(size => {
			event.add('c:hidden_from_recipe_viewers', `#c:${size}_fluid_pipes/${material}`);
		});
	};

	hideFluidPipes('treated_wood');
	hideFluidPipes('bismuth_bronze');
	hideFluidPipes('black_bronze');
	hideFluidPipes('lead');
	hideFluidPipes('chromium');
	hideFluidPipes('blue_steel');
	hideFluidPipes('red_steel');
	hideFluidPipes('vanadium_steel');
	hideFluidPipes('tungsten');
	hideFluidPipes('ostrum'); // [PORT-Ф10]
	hideFluidPipes('tungsten_carbide');
	hideFluidPipes('tungsten_bismuth_oxide_composite'); // [PORT-Ф2]
	hideFluidPipes('europium');

	// Hide Item Pipes from EMI

	const hideItemPipes = (material) => {
		const sizes = ['small', 'normal', 'large', 'huge'];
		const types = ['item_pipes', 'restrictive_pipes'];
		sizes.forEach(size => {
			types.forEach(type => {
				event.add('c:hidden_from_recipe_viewers', `#c:${size}_${type}/${material}`);
			});
		});
	};

	hideItemPipes('nickel');
	hideItemPipes('platinum');
	hideItemPipes('bismuth');
	hideItemPipes('rose_gold');
	hideItemPipes('sterling_silver');
	hideItemPipes('cobalt_brass');
	hideItemPipes('cupronickel');
	hideItemPipes('magnalium');
	hideItemPipes('osmium');
	hideItemPipes('osmiridium');
	hideItemPipes('americium');

	const materialPlastic = ['polybenzimidazole', 'polytetrafluoroethylene', 'polyethylene'];
	const toolsPlastic = ['mallet', 'plunger'];
	materialPlastic.forEach(material => {
		toolsPlastic.forEach(tool => {
			event.removeAllTagsFrom(`gtceu:${material}_${tool}`);
			event.add('c:hidden_from_recipe_viewers', `gtceu:${material}_${tool}`);
		});
	});

	// Add Gregtech Tools Tag

	const materialTagTools = ['neutronium'];
	const toolsTagTools = ['pickaxe', 'wrench', 'screwdriver', 'wire_cutter', 'hard_hammer'];

	materialTagTools.forEach(material => {
		toolsTagTools.forEach(tool => {
			event.removeAllTagsFrom(`gtceu:${material}_${tool}`);
			event.add('c:hidden_from_recipe_viewers', `gtceu:${material}_${tool}`);
		});
	});

	//#endregion
})

//#region Remove Recipes

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.pipes_hidden recipes start')

	// Remove Fluid Pipes recipes

	const removeFluidPipes = (material) => {
		const sizes = ['tiny', 'small', 'normal', 'large', 'huge', 'quadruple', 'nonuple'];
		sizes.forEach(size => {
			event.remove({ output: `#c:${size}_fluid_pipes/${material}` });
		});
	};

	removeFluidPipes('treated_wood');
	removeFluidPipes('bismuth_bronze');
	removeFluidPipes('black_bronze');
	removeFluidPipes('lead');
	removeFluidPipes('chromium');
	removeFluidPipes('blue_steel');
	removeFluidPipes('red_steel');
	removeFluidPipes('vanadium_steel');
	removeFluidPipes('tungsten');
	removeFluidPipes('ostrum'); // [PORT-Ф10]
	removeFluidPipes('tungsten_carbide');
	removeFluidPipes('tungsten_bismuth_oxide_composite'); // [PORT-Ф2]
	removeFluidPipes('europium');

	// Remove Item Pipes recipes

	const removeItemPipes = (material) => {
		const sizes = ['small', 'normal', 'large', 'huge'];
		const types = ['item_pipes', 'restrictive_pipes'];
		sizes.forEach(size => {
			types.forEach(type => {
				event.remove({ output: `#c:${size}_${type}/${material}` });
			});
		});
	};

	removeItemPipes('nickel');
	removeItemPipes('platinum');
	removeItemPipes('bismuth');
	removeItemPipes('rose_gold');
	removeItemPipes('sterling_silver');
	removeItemPipes('cobalt_brass');
	removeItemPipes('cupronickel');
	removeItemPipes('magnalium');
	removeItemPipes('osmium');
	removeItemPipes('osmiridium');
	removeItemPipes('americium');

	// Remove Plastic Tools recipes

	const materialRemovePlastic = ['polybenzimidazole', 'polytetrafluoroethylene', 'polyethylene'];
	const toolsRemovePlastic = ['mallet', 'plunger'];

	materialRemovePlastic.forEach(material => {
		toolsRemovePlastic.forEach(tool => {
			event.remove({ output: `gtceu:${material}_${tool}` });
		});
	});

	// Remove Gregtech Tools recipes

	const materialRemoveTools = ['neutronium'];
	const toolsRemoveTools = ['pickaxe', 'wrench', 'screwdriver', 'wire_cutter', 'hard_hammer'];

	materialRemoveTools.forEach(material => {
		toolsRemoveTools.forEach(tool => {
			event.remove({ output: `gtceu:${material}_${tool}` });
		});
	});

	//#endregion
})
