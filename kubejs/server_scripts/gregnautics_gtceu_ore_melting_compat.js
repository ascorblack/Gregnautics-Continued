// priority: 0
"use strict";

const GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_PREFIXES = [
	"", "andesite_", "basalt_", "chalk_", "chert_", "claystone_", "conglomerate_", "dacite_", "diorite_",
	"dolomite_", "gabbro_", "gneiss_", "granite_", "limestone_", "marble_", "phyllite_", "quartzite_",
	"rhyolite_", "schist_", "shale_", "slate_", "tuff_",
	"black_sand_", "brown_sand_", "green_sand_", "pink_sand_", "red_sand_", "white_sand_", "yellow_sand_"
];

const GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_MATERIALS = {
	aluminium: { metal: "aluminium", melt: 660, percent: 100 },
	antimony: { metal: "antimony", melt: 630, percent: 100 },
	bismuth: { metal: "bismuth", melt: 270, percent: 100 },
	bornite: { metal: "copper", melt: 1080, percent: 90 },
	cassiterite: { metal: "tin", melt: 230, percent: 100 },
	cassiterite_sand: { metal: "tin", melt: 230, percent: 100 },
	chalcocite: { metal: "copper", melt: 1080, percent: 90 },
	chalcopyrite: { metal: "copper", melt: 1080, percent: 90 },
	cobalt: { metal: "cobalt", melt: 1495, percent: 100 },
	copper: { metal: "copper", melt: 1080, percent: 100 },
	galena: { metal: "lead", melt: 330, percent: 90 },
	garnierite: { metal: "nickel", melt: 1453, percent: 100 },
	goethite: { metal: "iron", melt: 1535, percent: 90 },
	gold: { metal: "gold", melt: 1060, percent: 100 },
	hematite: { metal: "iron", melt: 1535, percent: 90 },
	iron: { metal: "iron", melt: 1535, percent: 100 },
	lead: { metal: "lead", melt: 330, percent: 100 },
	magnetite: { metal: "iron", melt: 1535, percent: 90 },
	malachite: { metal: "copper", melt: 1080, percent: 90 },
	nickel: { metal: "nickel", melt: 1453, percent: 100 },
	pentlandite: { metal: "nickel", melt: 1453, percent: 90 },
	silver: { metal: "silver", melt: 961, percent: 100 },
	sphalerite: { metal: "zinc", melt: 420, percent: 90 },
	stibnite: { metal: "antimony", melt: 630, percent: 90 },
	tetrahedrite: { metal: "copper", melt: 1080, percent: 90 },
	tin: { metal: "tin", melt: 230, percent: 100 },
	vanadium_magnetite: { metal: "iron", melt: 1535, percent: 90 },
	yellow_limonite: { metal: "iron", melt: 1535, percent: 90 },
	zinc: { metal: "zinc", melt: 420, percent: 100 }
};

const GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_RAW_AMOUNT = 72;
const GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_RAW_BLOCK_AMOUNT = GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_RAW_AMOUNT * 9;

const GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_FORMS = [
	{ id: "raw", item: material => `gtceu:raw_${material}`, amount: GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_RAW_AMOUNT, heat: 1 },
	{ id: "raw_block", item: material => `gtceu:raw_${material}_block`, amount: GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_RAW_BLOCK_AMOUNT, heat: 9 },
	{ id: "crushed", item: material => `gtceu:crushed_${material}_ore`, amount: 80, heat: 1 },
	{ id: "purified", item: material => `gtceu:purified_${material}_ore`, amount: 100, heat: 1 },
	{ id: "refined", item: material => `gtceu:refined_${material}_ore`, amount: 110, heat: 1 },
	// Dust forms: only for mineral ores whose GT material name differs from the target metal.
	// Pure metals (aluminium, tin, etc.) already have dust heating via GREGNAUTICS_GT_METALS.
	// useDurability must be false for dusts — they have no durability, causing div-by-zero in TFC.
	{ id: "dust", item: material => `gtceu:${material}_dust`, amount: 144, heat: 1.429, oreOnly: true, useDurability: false },
	{ id: "small_dust", item: material => `gtceu:small_${material}_dust`, amount: 36, heat: 0.714, oreOnly: true, useDurability: false },
	{ id: "tiny_dust", item: material => `gtceu:tiny_${material}_dust`, amount: 16, heat: 0.357, oreOnly: true, useDurability: false }
];

const GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_NON_DUST_FORMS = GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_FORMS
	.filter(form => !["dust", "small_dust", "tiny_dust"].includes(form.id));

function gregnauticsGtceuOreMeltingCompatItemExists(item) {
	return Item.exists(item);
}

function gregnauticsGtceuOreMeltingCompatScaledAmount(defaultAmount, percent) {
	const percentPerItem = percent / Math.ceil(percent / 100);
	const value = defaultAmount * (percentPerItem / 100);
	return value % 2 === 0 ? value : Math.round(value) - 1;
}

function gregnauticsGtceuOreMeltingCompatFluid(data) {
	return data.metal === "iron" ? "tfc:metal/cast_iron" : `gtceu:${data.metal}`;
}

function gregnauticsGtceuOreMeltingCompatOreItem(prefix, material) {
	return `gtceu:${prefix}${material}_ore`;
}

function gregnauticsGtceuOreMeltingCompatRegexEscape(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---- Индекс существующих рецептов нагрева ----
// Раньше на каждый железный предмет делались event.remove({input: ...}) и два
// regex-remove по всему реестру. input-фильтр заставляет KubeJS парсить
// ингредиенты ВСЕХ ~70k рецептов (включая экзотические типы сторонних модов —
// на этом загрузка мира зависала), а сотни remove-вызовов = сотни полных
// проходов. Теперь: один forEachRecipe-проход по двум типам, разбор сырого
// JSON и одно batched-удаление.

function gregnauticsGtceuOreMeltingCompatInputItems(type, obj) {
	const items = [];
	const collect = ing => {
		if (!ing) return;
		if (typeof ing.item === "string") items.push(ing.item);
		if (ing.ingredient) collect(ing.ingredient);
	};
	if (type === "tfc:heating") {
		collect(obj.ingredient);
	} else {
		(obj.ingredients || []).forEach(collect);
	}
	return items;
}

function gregnauticsGtceuOreMeltingCompatBuildIndex(event) {
	const index = { byInput: {}, gtceuIds: [] };
	["tfc:heating", "woodencog:heated_mixing"].forEach(type => {
		event.forEachRecipe({ type: type }, r => {
			const id = String(r.getId());
			let obj = null;
			try {
				obj = JSON.parse(String(r.json));
			} catch (err) {
				return;
			}
			gregnauticsGtceuOreMeltingCompatInputItems(type, obj).forEach(item => {
				if (index.byInput[item] === undefined) index.byInput[item] = [];
				index.byInput[item].push(id);
			});
			if (id.startsWith("gtceu:")) {
				index.gtceuIds.push(id);
			}
		});
	});
	return index;
}

function gregnauticsGtceuOreMeltingCompatCollectIronRemovals(index, item, material, removeIds) {
	(index.byInput[item] || []).forEach(id => removeIds.push(id));
	const path = item.split(":")[1];
	index.gtceuIds.forEach(id => {
		if (id.indexOf(path) !== -1 || id.indexOf(material) !== -1) {
			removeIds.push(id);
		}
	});
}

function gregnauticsGtceuOreMeltingCompatFlushRemovals(event, removeIds) {
	const unique = removeIds.filter((id, i) => removeIds.indexOf(id) === i);
	const CHUNK = 200;
	for (let i = 0; i < unique.length; i += CHUNK) {
		const chunk = unique.slice(i, i + CHUNK).map(gregnauticsGtceuOreMeltingCompatRegexEscape);
		event.remove({ id: new RegExp(`^(?:${chunk.join("|")})$`) });
	}
	return unique.length;
}

function gregnauticsGtceuOreMeltingCompatAddHeatData(event, item, heat, id) {
	if (!gregnauticsGtceuOreMeltingCompatItemExists(item)) {
		return false;
	}

	event.heat({
		ingredient: item,
		heatCapacity: heat
	}, id);

	return true;
}

function gregnauticsGtceuOreMeltingCompatAddHeating(event, material, data, item, amount, id, useDurability) {
	if (!gregnauticsGtceuOreMeltingCompatItemExists(item)) {
		return false;
	}

	// удаления старых железных рецептов выполняются batched-проходом в recipes-событии
	const recipe = event.recipes.tfc.heating(item, data.melt)
		.resultFluid(Fluid.of(gregnauticsGtceuOreMeltingCompatFluid(data), gregnauticsGtceuOreMeltingCompatScaledAmount(amount, data.percent)));
	if (useDurability !== false) {
		recipe.useDurability(true);
	}
	recipe.id(id);

	return true;
}

function gregnauticsGtceuOreMeltingCompatHeatedIngredient(item, data) {
	return {
		type: "woodencog:heated",
		ingredient: { item: item },
		max_temp: Math.max(3000, data.melt + 200),
		min_temp: Math.max(1, Math.round(data.melt * 0.85))
	};
}

function gregnauticsGtceuOreMeltingCompatAddHeatedMixing(event, material, data, item, amount, id) {
	if (!gregnauticsGtceuOreMeltingCompatItemExists(item)) {
		return false;
	}

	// удаления старых железных рецептов и дедупликация id — batched-проходом ниже
	event.custom({
		type: "woodencog:heated_mixing",
		heat_requirement: data.melt,
		ingredients: [
			gregnauticsGtceuOreMeltingCompatHeatedIngredient(item, data)
		],
		results: [
			{
				amount: gregnauticsGtceuOreMeltingCompatScaledAmount(amount, data.percent),
				id: gregnauticsGtceuOreMeltingCompatFluid(data)
			}
		]
	}).id(id);

	return true;
}

TFCEvents.data(event => {
	let heatData = 0;

	Object.keys(GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_MATERIALS).forEach(material => {
		const data = GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_MATERIALS[material];

		GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_PREFIXES.forEach(prefix => {
			if (gregnauticsGtceuOreMeltingCompatAddHeatData(
				event,
				gregnauticsGtceuOreMeltingCompatOreItem(prefix, material),
				1,
				`gregnautics:gtceu_ore_melting/${material}/${prefix || "base"}ore`
			)) {
				heatData++;
			}
		});

		GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_NON_DUST_FORMS.forEach(form => {
			if (form.oreOnly && material === data.metal) return;
			if (gregnauticsGtceuOreMeltingCompatAddHeatData(
				event,
				form.item(material),
				form.heat,
				`gregnautics:gtceu_ore_melting/${material}/${form.id}`
			)) {
				heatData++;
			}
		});
	});

	console.info(`[Gregnautics] GTCEu ore melting compat: ${heatData} heat data entries.`);
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] GTCEu ore melting compat: recipes event start");
	let heatingRecipes = 0;
	let heatedMixingRecipes = 0;

	// Фаза 1: один проход-индексация + сбор всех удалений (замена сотен
	// input:/regex-remove по всему реестру рецептов).
	const index = gregnauticsGtceuOreMeltingCompatBuildIndex(event);
	const removeIds = [];
	Object.keys(GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_MATERIALS).forEach(material => {
		const data = GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_MATERIALS[material];
		if (data.metal !== "iron") {
			return;
		}
		GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_PREFIXES.forEach(prefix => {
			const item = gregnauticsGtceuOreMeltingCompatOreItem(prefix, material);
			if (gregnauticsGtceuOreMeltingCompatItemExists(item)) {
				gregnauticsGtceuOreMeltingCompatCollectIronRemovals(index, item, material, removeIds);
			}
		});
		GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_NON_DUST_FORMS.forEach(form => {
			if (form.oreOnly && material === data.metal) return;
			const item = form.item(material);
			if (gregnauticsGtceuOreMeltingCompatItemExists(item)) {
				gregnauticsGtceuOreMeltingCompatCollectIronRemovals(index, item, material, removeIds);
			}
		});
	});
	const removed = gregnauticsGtceuOreMeltingCompatFlushRemovals(event, removeIds);
	console.info(`[Gregnautics] GTCEu ore melting compat: removed ${removed} old iron heating recipes.`);

	// Фаза 2: добавления.
	Object.keys(GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_MATERIALS).forEach(material => {
		const data = GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_MATERIALS[material];

		GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_PREFIXES.forEach(prefix => {
			if (gregnauticsGtceuOreMeltingCompatAddHeating(
				event,
				material,
				data,
				gregnauticsGtceuOreMeltingCompatOreItem(prefix, material),
				GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_RAW_AMOUNT,
				`gregnautics:heating/gtceu_ore_melting/${prefix || "base"}${material}_ore`
			)) {
				heatingRecipes++;
			}

			if (gregnauticsGtceuOreMeltingCompatAddHeatedMixing(
				event,
				material,
				data,
				gregnauticsGtceuOreMeltingCompatOreItem(prefix, material),
				GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_RAW_AMOUNT,
				`gregnautics:woodencog/heated_mixing/gtceu_ore_melting/${prefix || "base"}${material}_ore`
			)) {
				heatedMixingRecipes++;
			}
		});

		GREGNAUTICS_GTCEU_ORE_MELTING_COMPAT_NON_DUST_FORMS.forEach(form => {
			if (form.oreOnly && material === data.metal) return;
			if (gregnauticsGtceuOreMeltingCompatAddHeating(
				event,
				material,
				data,
				form.item(material),
				form.amount,
				`gregnautics:heating/gtceu_ore_melting/${material}_${form.id}`,
				form.useDurability
			)) {
				heatingRecipes++;
			}

			if (gregnauticsGtceuOreMeltingCompatAddHeatedMixing(
				event,
				material,
				data,
				form.item(material),
				form.amount,
				`gregnautics:woodencog/heated_mixing/gtceu_ore_melting/${material}_${form.id}`
			)) {
				heatedMixingRecipes++;
			}
		});
	});

	console.info(`[Gregnautics] GTCEu ore melting compat: ${heatingRecipes} heating recipes, ${heatedMixingRecipes} heated mixing recipes.`);
});
