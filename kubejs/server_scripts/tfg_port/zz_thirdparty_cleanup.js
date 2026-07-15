// priority: -10
"use strict";

// [PORT-FIX] Чистка битых рецептов сторонних модов, которые светятся ошибками в чате.
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port thirdparty cleanup start');

	// createstellaris 1.5.0: rocket_nose_cone требует предмет createstellaris:rocketnosecone,
	// которого не существует (есть только *incomplete) — шаги deploying падают при
	// ре-сериализации KubeJS. Сам рецепт мёртвый, удаляем.
	event.remove({ id: 'createstellaris:squenched_assembly/rocket_nose_cone' });
});
