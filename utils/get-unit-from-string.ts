type TUnitFromString = {
	unit: string;
	volume: number;
};
export function getUnitFromString(input: string): TUnitFromString {
	input = input.toLowerCase();
	input = input.replace(/ \([\s\S]*?\)/g, "");

	input = input.replace("stuk(s)", "stuks");

	// # solids
	if (
		input.endsWith("kg") ||
		input.endsWith("kilo") ||
		input.endsWith("kilogram")
	) {
		// assume we wont have 1000kg+ items
		input = input.replace(",", ".");
		// return `${parseFloat(input) * 1000} g`;
		return {
			unit: "kg",
			volume: parseFloat(input),
		};
	}

	if (
		input.endsWith("g") ||
		input.endsWith("g.") ||
		input.endsWith("gr") ||
		input.endsWith("gr.") ||
		input.endsWith("gram")
	) {
		return {
			unit: "kg",
			volume: parseFloat(input) / 1000,
		};
	}

	// # liquids
	if (
		input.endsWith("milliliter") ||
		input.endsWith("mililiter") || // it's hard to spell
		input.endsWith("ml") ||
		input.endsWith("ml l") || // sometimes "ml l" occurs - should we patch this?
		input.includes("ml.")
	) {
		return {
			unit: "l",
			volume: parseFloat(input) / 1000,
		};
	}

	if (
		input.endsWith("cl") ||
		input.endsWith("cl.") ||
		input.endsWith("сl") || // Cyrillic Small Letter Es
		input.endsWith("ctl") ||
		input.endsWith("centiliter")
	) {
		// assume we wont have 1000+ cl items
		input = input.replace(",", ".");
		return {
			unit: "l",
			volume: parseFloat(input) / 100,
		};
	}

	if (
		/[\d\s]l$/.test(input) || // ends with [numeral][any space/no space]["l"]
		input.endsWith("l.") ||
		input.endsWith("liter")
	) {
		// assume we wont have 1000+ liter items
		input = input.replace(",", ".");
		return {
			unit: "l",
			volume: parseFloat(input),
		};
	}

	return {
		unit: "onbekend",
		volume: parseFloat(input),
	};
}
