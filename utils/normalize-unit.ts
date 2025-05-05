export function normalizeUnit(input: string) {
	input = input.toLowerCase();
	input = input.replace(/ \([\s\S]*?\)/g, "");

	input = input.replace("stuk(s)", "stuks");

	// # solids
	if (
		input.includes("kg") ||
		input.includes("kilo")
	) {
		// assume we wont have 1000kg+ items
		input = input.replace(",", ".");
		return `${parseFloat(input) * 1000} g`;
	}

	if (
		input.includes("g") ||
		input.includes("gr") ||
		input.includes("gram")
	) {
		return `${parseFloat(input)} g`;
	}

	// # liquids
	if (
		input.includes("milliliter") ||
		input.includes("mililiter") || // it's hard to spell
		input.includes("ml") // sometimes "ml l" occurs
	) {
		return `${parseFloat(input)} ml`;
	}

	if (
		input.includes("cl") ||
		input.includes("сl") || // Cyrillic Small Letter Es
		input.includes("ctl")
	) {
		// assume we wont have 1000+ cl items
		input = input.replace(",", ".");
		return `${parseFloat(input) * 10} ml`;
	}

	if (
		input.includes("l") || // be cautious, "l" is quite fuzzy - only do it at last!
		input.includes("liter")
	) {
		// assume we wont have 1000+ liter items
		input = input.replace(",", ".");
		return `${parseFloat(input) * 1000} ml`;
	}

	return input;
}
