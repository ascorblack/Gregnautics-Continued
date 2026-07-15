// priority: 0
"use strict";

// [PORT] Портировано из create_additions/tags.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] KubeJS 7: регистрация напрямую через ServerEvents.tags вместо диспетчера register*

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port createaddition item tags start')

	event.add('c:hidden_from_recipe_viewers', "createaddition:creative_energy")
	event.add('c:hidden_from_recipe_viewers', "createaddition:copper_spool")
	event.add('c:hidden_from_recipe_viewers', "createaddition:festive_spool")
	event.add('c:hidden_from_recipe_viewers', "createaddition:small_light_connector")
})

ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port createaddition fluid tags start')

	// Добавляем тег для скрытия в EMI
	event.add('c:hidden_from_recipe_viewers', 'createaddition:seed_oil')
	event.removeAllTagsFrom('createaddition:seed_oil')
	event.add('c:hidden_from_recipe_viewers', 'createaddition:bioethanol')
	event.removeAllTagsFrom('createaddition:bioethanol')
	// [PORT] в 1.21 flowing-варианты — отдельные fluid id, скрываем их тоже
	event.add('c:hidden_from_recipe_viewers', 'createaddition:flowing_seed_oil')
	event.removeAllTagsFrom('createaddition:flowing_seed_oil')
	event.add('c:hidden_from_recipe_viewers', 'createaddition:flowing_bioethanol')
	event.removeAllTagsFrom('createaddition:flowing_bioethanol')
})
