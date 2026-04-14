// tasks to be executed before Deno server starts
import { getSupermarketsScrape } from "./tasks/get-supermarkets-scrape.ts";
// import { getSupermarketLogos } from "./tasks/get-supermarket-logos.ts";

export async function prepare() {
	try {
		await Deno.lstat("data");
	} catch (err) {
		if (!(err instanceof Deno.errors.NotFound)) {
			throw err;
		}
		await Deno.mkdir("data");
	}

	await getSupermarketsScrape();
	// await getSupermarketLogos();

	console.log("prepare OK");
}

await prepare();
