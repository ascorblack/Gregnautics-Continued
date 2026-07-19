// priority: -10
"use strict";

// TFC 4.x recipes predate the TFG port's aggregate crop tags and hard-code
// native canola IDs. Limit replacements to those recipes so unrelated TFC
// progression remains untouched.
ServerEvents.recipes(event => {
	event.replaceInput(
		{ id: 'tfc:quern/canola_paste' },
		'tfc:seeds/canola',
		'#gregnautics:canola_seeds'
	);
	event.replaceInput(
		{ id: 'tfc:crafting/straw_from_canola' },
		'tfc:canola',
		'#gregnautics:canola_products'
	);
});
