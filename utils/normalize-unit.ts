export function normalizeUnit(input: string) {
	input = input.toLowerCase();

	let itemVolume;
	let quantity = 1;
	const multiplier = input.includes("x");
	if (multiplier) {
		// multiple items

		const [left, right] = input.split("x");
		quantity = parseInt(left);
		itemVolume = right;
	} else {
		// just one

		itemVolume = input;
	}

	if (itemVolume.startsWith("los")) {
		itemVolume = itemVolume.replace("los ", "");
		itemVolume = itemVolume.replace("los", "");
	}
	itemVolume = itemVolume.replace(/\([^()]*\)/, ""); // remove parentheses with its content, assuming it's not important
	itemVolume = itemVolume.replace(/\.+$/, ""); // trailing dots begone!
	itemVolume = itemVolume.replace(/ {2}/g, " "); // deduplicate spaces
	itemVolume = itemVolume.replace(/[ \t]+$/, ""); // remove trailing spaces

	itemVolume = itemVolume.replace("per kilo", "1 kg");
	if (itemVolume.startsWith("per")) {
		// e.g.: Per 100 gram - this is meaningless so it can be stripped
		itemVolume = itemVolume.replace("per ", "");
		itemVolume = itemVolume.replace("per", "");
	}
	itemVolume = itemVolume.replace("ca.", ""); // short for 'circa' a.k.a. marks that it has a margin of error
	itemVolume = itemVolume.replace("stuk(s)", "stuks");

	if (!itemVolume.includes("stuks")) {
		if (itemVolume.includes("stuk")) {
			itemVolume = itemVolume.replace("stuk", "stuks");
		}
		if (itemVolume.includes("st")) {
			itemVolume = itemVolume.replace("st", "stuks");
		}
	}

	if (itemVolume.includes("stuks")) {
		quantity = parseInt(itemVolume);
		return {
			volume: NaN,
			unit: undefined,
			quantity: quantity || 1,
		};
	}

	if (!itemVolume.includes("gram")) {
		// make it "kg" if gram is missing
		itemVolume = itemVolume.replace("kilo", "kg");
	} else {
		itemVolume = itemVolume.replace("kilo", "k");
	}
	itemVolume = itemVolume.replace("mili", "m"); // human typos

	itemVolume = itemVolume.replace("ml l", "ml");
	itemVolume = itemVolume.replace(/lt$/, "l"); // $ means it must match at end of string
	itemVolume = itemVolume.replace("ctl", "cl");
	itemVolume = itemVolume.replace("сl", "cl"); // Cyrillic Small Letter Es

	// simplify
	itemVolume = itemVolume.replace("grams", "g");
	itemVolume = itemVolume.replace("gram", "g");
	itemVolume = itemVolume.replace("milli", "m");
	itemVolume = itemVolume.replace("liters", "l");
	itemVolume = itemVolume.replace("liter", "l");

	// # solids
	if (
		itemVolume.endsWith("kg")
	) {
		// assume we wont have 1000kg+ items
		itemVolume = itemVolume.replace(",", ".");
		return {
			volume: parseFloat(itemVolume),
			unit: "kg",
			quantity,
		};
	}

	if (
		itemVolume.endsWith("g") ||
		itemVolume.endsWith("gr")
	) {
		return {
			volume: parseFloat(itemVolume),
			unit: "g",
			quantity,
		};
	}

	// # liquids
	if (
		itemVolume.endsWith("ml")
	) {
		itemVolume = itemVolume.replace(",", ".");

		return {
			volume: parseFloat(itemVolume),
			unit: "ml",
			quantity,
		};
	}

	if (
		itemVolume.endsWith("cl")
	) {
		// assume we wont have 1000+ cl items
		itemVolume = itemVolume.replace(",", ".");

		return {
			volume: parseFloat(itemVolume),
			unit: "cl",
			quantity,
		};
	}

	if (
		itemVolume.endsWith("l")
	) {
		// assume we wont have 1000+ liter items
		itemVolume = itemVolume.replace(",", ".");

		return {
			volume: parseFloat(itemVolume),
			unit: "l",
			quantity,
		};
	}

	// return false;
	return {
		volume: NaN,
		unit: undefined,
		quantity: NaN,
	};
}
