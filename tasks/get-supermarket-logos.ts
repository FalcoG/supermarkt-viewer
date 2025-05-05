// // standalone - do not import!
// import supermarkets from "../data/supermarkets.json" with { type: "json" };
//
// export async function getSupermarketLogos() {
// 	const logos = {
// 		ah:
// 			"https://static.ah.nl/ah-static/images/ah-ui-bridge-components/logo/logo-ah.svg",
// 		aldi:
// 			"https://www.aldi-nord.de/etc/designs/aldi/web/frontend/aldi/images/logo.svg.res/1653373463803/logo.svg",
// 	};
//
// 	console.log(
// 		supermarkets.map((item) => ({
// 			icon: item.i,
// 			supermarket: item.c,
// 			base_url: item.u,
// 		})),
// 	);
//
// 	try {
// 		// Fetch an image
// 		const response = await fetch(
// 			"https://www.hoogvliet.com/INTERSHOP/static/WFS/org-webshop-Site/-/-/nl_NL/img/smart_banner_icon.png",
// 		);
// 		const blob = await response.blob();
//
// 		// Cropping parameters
// 		const croppedBitmap = await createImageBitmap(
// 			blob,
// 			0, // sx: start x
// 			0, // sy: start y
// 			50, // sw: source width
// 			50, // sh: source height
// 		);
//
// 		const file = await Deno.create("logo-test.bmp");
// 		const imageBytes = new Uint8Array(croppedBitmap);
// 		const written = await file.write(imageBytes);
//
// 		// Cleanup when done
// 		croppedBitmap.close();
// 	} catch (error) {
// 		console.error("Failed to create ImageBitmap:", error);
// 	}
// }
