// priority: 100
"use strict";

// [PORT] Из TFG startup_scripts/main_startup_script.js (Фаза 1).
// Здесь только утилиты; диспетчер регистраций (registerTFGItems и т.д.)
// будет портирован в Ф2/Ф4 вместе с самими register-функциями.

/**
 * Correct strings to replace invalid characters for use in recipe IDs.
 * @param {string} value - The string to correct.
 * @returns {string} The corrected string. Example: `minecraft:iron_ingot` -> `minecraft_iron_ingot`
 */
global.linuxUnfucker = function(value) {
	let str = (value === undefined || value === null) ? "" : String(value);
	// 1. Convert to en_us lowercase first to handle languages like Turkish.
	// 2. Replace all characters except "a-z", "0-9", and "_" with "_".
	// 3. Remove any leading and trailing underscores.
	return str.toLocaleLowerCase('en-US').replace(/[^0-9_a-z]+/g, "_").replace(/^_+|_+$/g, "");
};

/**
 * [PORT] KubeJS 7 знает только канонические имена MapColor (color_green, snow, ...);
 * старые 1.20-варианты (green, white, lime, terracotta_grey) и undefined валят регистрацию.
 */
global.tfgMapColor = function (c) {
	const FIX = {
		white: 'snow', color_white: 'snow',
		lime: 'color_light_green', color_lime: 'color_light_green',
		green: 'color_green', black: 'color_black', blue: 'color_blue', brown: 'color_brown',
		cyan: 'color_cyan', gray: 'color_gray', grey: 'color_gray',
		light_gray: 'color_light_gray', light_blue: 'color_light_blue',
		magenta: 'color_magenta', orange: 'color_orange', pink: 'color_pink',
		purple: 'color_purple', red: 'color_red', yellow: 'color_yellow',
		terracotta_grey: 'terracotta_gray'
	};
	if (!c) return 'none';
	return FIX[c] || c;
};
