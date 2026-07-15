// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.glass.js (Ф4).
// Блоки tfg:glass/smooth_* зарегистрированы в startup tfg.blocks.glass.js.

function tfgCreateGlassRecipe(event, name) {
	event.recipes.shapeless(`tfg:glass/smooth_${name}`, [ `minecraft:${name}` ]).id(`tfg:shapeless/${name}_to_smooth_${name}`)
	event.recipes.shapeless(`minecraft:${name}`, [ `tfg:glass/smooth_${name}` ]).id(`tfg:shapeless/smooth_${name}_to_${name}`)
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.glass start')

	tfgCreateGlassRecipe(event, 'glass')
	tfgCreateGlassRecipe(event, 'tinted_glass')

	global.MINECRAFT_DYE_NAMES.forEach(color => {
		tfgCreateGlassRecipe(event, `${color}_stained_glass`)
	})
})
