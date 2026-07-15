// priority: -200
"use strict";

const GREGNAUTICS_DISABLED_CREATE_MIXING_RECIPE_IDS = [
	"createbigcannons:mixing/alloy_steel",
	"createbigcannons:mixing/steel",
	"createbigcannons:mixing/alloy_bronze",
	"createbigcannons:mixing/bronze",
	"create:mixing/brass",
	"create:mixing/brass_ingot",
	"createaddition:mixing/electrum",
	"tfmg:mixing/steel",
	"tfmg:mixing/constantan",
	"tfmg:mixing/brass",
	"tfmg:mixing/bronze"
];

const GREGNAUTICS_DISABLED_CREATE_MIXING_ALLOYS = [
	"bronze",
	"brass",
	"steel",
	"constantan",
	"electrum"
];

const GREGNAUTICS_DISABLED_CREATE_MIXING_FLUID_OUTPUTS = {
	bronze: ["gtceu:bronze", "tfc:metal/bronze", "createbigcannons:molten_bronze"],
	brass: ["gtceu:brass", "tfc:metal/brass"],
	steel: ["gtceu:steel", "tfc:metal/steel", "tfmg:molten_steel", "createbigcannons:molten_steel"],
	constantan: [],
	electrum: ["gtceu:electrum"]
};

function gregnauticsRemoveCreateMixingOutput(event, item) {
	if (Item.exists(item)) {
		event.remove({ type: "create:mixing", output: item });
	}
}

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: create_mixing_cleanup recipes event start");
	GREGNAUTICS_DISABLED_CREATE_MIXING_RECIPE_IDS.forEach(id => {
		event.remove({ id: id });
	});

	GREGNAUTICS_DISABLED_CREATE_MIXING_ALLOYS.forEach(alloy => {
		[
			`gtceu:${alloy}_nugget`,
			`gtceu:${alloy}_ingot`,
			`gtceu:${alloy}_block`,
			`tfc:metal/ingot/${alloy}`,
			`tfc:metal/block/${alloy}`,
			`create:${alloy}_ingot`,
			`create:${alloy}_block`,
			`tfmg:${alloy}_ingot`,
			`tfmg:${alloy}_nugget`,
			`tfmg:${alloy}_block`,
			`createaddition:${alloy}_ingot`,
			`createaddition:${alloy}_nugget`,
			`createaddition:${alloy}_block`,
			`createbigcannons:${alloy}_ingot`,
			`createbigcannons:${alloy}_scrap`,
			`createbigcannons:${alloy}_block`
		].forEach(item => {
			gregnauticsRemoveCreateMixingOutput(event, item);
		});

		(GREGNAUTICS_DISABLED_CREATE_MIXING_FLUID_OUTPUTS[alloy] || []).forEach(fluid => {
			event.remove({ type: "create:mixing", output: Fluid.of(fluid) });
		});
	});
});
