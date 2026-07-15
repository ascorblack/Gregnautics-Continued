// priority: 0
"use strict";

// [PORT] exposure/tags.js — dispatcher-функция registerExposureItemTags заменена на прямую регистрацию события

ServerEvents.tags('item', evt => {
	console.info('[Gregnautics] progress: tfg_port exposure tags start')

	evt.add('exposure:black_printing_dyes', '#c:dyes/black') // [PORT] forge: -> c:
	evt.add('exposure:yellow_printing_dyes', '#c:dyes/yellow') // [PORT] forge: -> c:
	evt.add('exposure:cyan_printing_dyes', '#c:dyes/cyan') // [PORT] forge: -> c:
	evt.add('exposure:magenta_printing_dyes', '#c:dyes/magenta') // [PORT] forge: -> c:

	evt.add('exposure:photo_agers', '#c:dyes/brown') // [PORT] forge: -> c:

	// evt.add('exposure:flashes', 'simplylight:illuminant_block') // [PORT] simplylight отсутствует в сборке 1.21.1
	evt.add('exposure:flashes', 'create:rose_quartz_lamp')
	evt.add('exposure:flashes', 'gtceu:white_lamp')
})
