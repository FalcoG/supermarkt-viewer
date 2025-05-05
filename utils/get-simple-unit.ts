import { getUnitFromString } from "./get-unit-from-string.ts";

export type TSimpleUnit = {
	unit: "liter" | "kilogram" | string; // https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier
	volume: number;
	itemVolume: number;
	itemQuantity: number;
};

export function getSimpleUnit(input: string): TSimpleUnit {
	let quantity = 1;
	let itemVolumeRaw;
	const multiplier = input.includes("x");

	if (multiplier) {
		// multiple items

		const [left, right] = input.split("x");
		quantity = parseInt(left);
		console.log("left", left, "right", right);
		itemVolumeRaw = right;
	} else {
		itemVolumeRaw = input;
		// just one
	}

	const { unit, volume } = getUnitFromString(itemVolumeRaw);

	return {
		unit,
		volume: (quantity * (volume * 1000)) / 1000, // extreme dislike for javascript float issues! - item qty + item volume
		itemQuantity: quantity,
		itemVolume: volume,
	};
}
