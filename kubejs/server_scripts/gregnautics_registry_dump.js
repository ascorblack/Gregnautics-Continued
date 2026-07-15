// priority: 1000
"use strict";

const GREGNAUTICS_REGISTRY_DUMP_ROOT = "kubejs/exported/registries";
const GREGNAUTICS_REGISTRY_DUMP_ENABLED = false;

function gregnauticsRegistryIds(registry) {
	const ids = [];
	const iterator = registry.keySet().iterator();

	while (iterator.hasNext()) {
		ids.push(String(iterator.next()));
	}

	ids.sort();
	return ids;
}

function gregnauticsIdsByNamespace(ids) {
	const byNamespace = {};

	ids.forEach(id => {
		const namespace = id.split(":")[0];
		if (byNamespace[namespace] === undefined) {
			byNamespace[namespace] = [];
		}
		byNamespace[namespace].push(id);
	});

	return byNamespace;
}

function gregnauticsSearchRows(ids) {
	return ids.map(id => {
		const parts = id.split(":");
		const namespace = parts[0];
		const path = parts.slice(1).join(":");

		return {
			namespace: namespace,
			id: id,
			path: path,
			terms: path.replace(/[\/_]/g, " ")
		};
	});
}

function gregnauticsDumpRegistry(name, registry) {
	const ids = gregnauticsRegistryIds(registry);

	JsonIO.write(`${GREGNAUTICS_REGISTRY_DUMP_ROOT}/${name}.json`, {
		count: ids.length,
		all: ids,
		by_namespace: gregnauticsIdsByNamespace(ids),
		search: gregnauticsSearchRows(ids)
	});

	return ids.length;
}

function gregnauticsDumpRegistries() {
	const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
	const itemCount = gregnauticsDumpRegistry("items", $BuiltInRegistries.ITEM);
	const blockCount = gregnauticsDumpRegistry("blocks", $BuiltInRegistries.BLOCK);
	const fluidCount = gregnauticsDumpRegistry("fluids", $BuiltInRegistries.FLUID);

	console.info(`[Gregnautics] Exported ${itemCount} item ids, ${blockCount} block ids, ${fluidCount} fluid ids to ${GREGNAUTICS_REGISTRY_DUMP_ROOT}`);
}

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: registry_dump recipes event start");
	if (!GREGNAUTICS_REGISTRY_DUMP_ENABLED) {
		return;
	}

	gregnauticsDumpRegistries();
});
