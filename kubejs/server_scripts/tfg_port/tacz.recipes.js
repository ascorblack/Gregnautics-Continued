"use strict";

// [PORT] из tacz/recipes.js (TFG 1.20.1); функция registerTACZRecipes заменена на прямую регистрацию ServerEvents.recipes
// [PORT] вызовы registerTACZMiscRecipes / Gun / Attach / Ammo убраны — эти обработчики регистрируются в своих файлах
//        (tacz.recipes.misc.js / tacz.recipes.guns.js / tacz.recipes.attach.js / tacz.recipes.ammo.js)

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tacz recipes (removals) start')

	// [PORT-CHECK-TEMP] remove-all ВРЕМЕННО ОТКЛЮЧЁН: TFG-рецепты оружия/патронов/обвесов
	// используют NBT-выводы (tacz gun_id) и закомментированы до проверки data components —
	// с remove-all всё оружие стало бы некрафтовым. Вернуть вместе с [PORT-CHECK]-рецептами.
	// event.remove({ mod: 'tacz' })
	// [PORT] create_armorer отсутствует в сборке 1.21.1 (ганпак-мод 1.20; сами ID ганпака остаются в данных TaCZ)
	//event.remove({ mod: 'create_armorer' })
	// [PORT] applied_armorer отсутствует в сборке 1.21.1
	//event.remove({ mod: 'applied_armorer' })
})
