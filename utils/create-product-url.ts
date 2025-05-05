export function createProductUrl(input: string, supermarket: string): string {
	if (supermarket === "jumbo") {
		return `https://jumbo.com/producten/${input}`;
	}

	return input;
}
