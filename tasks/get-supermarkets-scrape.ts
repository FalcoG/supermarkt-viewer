export async function getSupermarketsScrape() {
	// todo: check file age
	const buffer = await fetch(
		"https://raw.githubusercontent.com/supermarkt/checkjebon/refs/heads/main/data/supermarkets.json",
	).then((r) => r.arrayBuffer());
	await Deno.writeFile("data/supermarkets.json", new Uint8Array(buffer));
}
