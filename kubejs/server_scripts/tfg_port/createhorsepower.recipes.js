// priority: 0
"use strict";

// [PORT] исходник: create_horse_power/recipes.js (registerCreateHorsePowerBlockRecipes) — регистрируем напрямую через ServerEvents.recipes
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port createhorsepower recipes start')

	event.remove({id: 'createhorsepower:horse_crank' })

	event.shaped('createhorsepower:horse_crank', [
		' A ',
		'EBD',
		'CCC'
	], {
		A: '#c:fences/wooden', // [PORT] forge -> c
		B: '#c:small_gears/bronze', // [PORT] forge -> c
		C: '#tfc:rock/raw',
		D: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		E: '#c:tools/saw' // [PORT] forge:tools/saws -> c:tools/saw
	}).id('tfg:shaped/horse_crank_bronze')

	event.shaped('createhorsepower:horse_crank', [
		' A ',
		'EBD',
		'CCC'
	], {
		A: '#c:fences/wooden', // [PORT] forge -> c
		B: '#c:small_gears/bismuth_bronze', // [PORT] forge -> c
		C: '#tfc:rock/raw',
		D: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		E: '#c:tools/saw' // [PORT] forge:tools/saws -> c:tools/saw
	}).id('tfg:shaped/horse_crank_bismuth_bronze')

	event.shaped('createhorsepower:horse_crank', [
		' A ',
		'EBD',
		'CCC'
	], {
		A: '#c:fences/wooden', // [PORT] forge -> c
		B: '#c:small_gears/black_bronze', // [PORT] forge -> c
		C: '#tfc:rock/raw',
		D: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		E: '#c:tools/saw' // [PORT] forge:tools/saws -> c:tools/saw
	}).id('tfg:shaped/horse_crank_black_bronze')
})
