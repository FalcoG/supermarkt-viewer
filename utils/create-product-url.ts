export function createProductUrl(input: string, supermarket: string): string {
	if (supermarket === "jumbo") {
		return `https://jumbo.com/producten/${input}`;
	}

	if (supermarket === "ah") {
		return `https://www.ah.nl/producten/product/${input}`;
	}

	if (supermarket === "plus") {
		return `https://www.plus.nl/product/${input}`;
	}

	if (supermarket === "hoogvliet") {
		return `https://www.hoogvliet.com/product/${input}`;
	}

	return input;
}
