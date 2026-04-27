export function createProductUrl(input: string, supermarket: string): string {
	if (supermarket === "jumbo") {
		return `https://jumbo.com/producten/${input}`;
	}

	if (supermarket === "ah") {
		return `https://www.ah.nl/producten/product/${input}`;
	}

	return input;
}
