// import {createProductUrl} from "../utils/create-product-url.ts";
import uFuzzy from "@leeoniya/ufuzzy";

import {
	getSupermarketProducts,
	SupermarketProducts,
} from "../utils/get-supermarket-data.ts";
import { normalizeUnit } from "../utils/normalize-unit.ts";
import { nearestLiquidUnit } from "../utils/units/nearest-liquid-unit.ts";
import { LiquidUnits } from "../utils/units/factors/liquid.ts";
import { nearestMassUnit } from "../utils/units/nearest-mass-unit.ts";
import { MassUnits } from "../utils/units/factors/mass.ts";
import { useCallback, useMemo } from "preact/hooks";
import { userPreferenceSupermarkets } from "../signals/userPreferences.ts";

export function useSupermarketProducts() {
	const [haystack, uf, items] = useMemo(() => {
		const items = (([] as SupermarketProducts).concat(
			...getSupermarketProducts(userPreferenceSupermarkets.value),
		))
			// const items = [getSupermarketProducts()
			.map((item) => {
				const unit = normalizeUnit(item.s);

				let output;
				const isLiquid = unit.unit &&
					["ml", "cl", "l"].includes(unit.unit);

				const isMass = unit.unit &&
					["kg", "g"].includes(unit.unit);

				let humaneUnit: ReturnType<typeof normalizeUnit> | undefined;

				if (
					isLiquid && !Number.isNaN(unit.volume)
				) {
					output = nearestLiquidUnit(
						unit.volume * unit.quantity,
						unit.unit as LiquidUnits,
						{
							whitelist: ["l"],
						},
					);

					humaneUnit = {
						quantity: unit.quantity,
						...nearestLiquidUnit(unit.volume, unit.unit as LiquidUnits, {
							whitelist: ["ml", "l"],
						}),
					};
				}

				if (
					isMass && !Number.isNaN(unit.volume)
				) {
					output = nearestMassUnit(
						unit.volume * unit.quantity,
						unit.unit as MassUnits,
						{
							whitelist: ["kg"],
						},
					);
					humaneUnit = {
						quantity: unit.quantity,
						...nearestMassUnit(unit.volume, unit.unit as MassUnits, {
							whitelist: ["g", "kg"],
						}),
					};
				}

				return {
					unit: humaneUnit || unit,
					...item,
					priceByUnit: output,
					priceByVolume: output && item.p / output.volume,
				};
			})
			// .filter((item) => item.priceByVolume !== undefined)
			.sort((firstItem, secondItem) => {
				if (firstItem.priceByVolume && secondItem.priceByVolume) {
					return firstItem.priceByVolume - secondItem.priceByVolume;
				}
				// todo: sorting by price is OK but when we search for "aardbeien" it will not show the most relevant products on top - find a solution for this!

				if (!firstItem.priceByVolume && secondItem.priceByVolume) {
					return 1;
				}
				if (firstItem.priceByVolume && !secondItem.priceByVolume) {
					return -1;
				}

				/**
				 * You need to return 0 if the two elements are equal, a negative number if 1st should be before 2nd and a positive number if 2nd should be before 1st.
				 */

				return 0;
			});

		const uf = new uFuzzy({});
		const haystack = items.map((r) => `${r.n}`); // build a haystack from a complex object

		return [haystack, uf, items];
	}, [userPreferenceSupermarkets.value]);

	const queryProducts = useCallback((query: string) => {
		const [idxs] = uf.search(haystack, query, 1, 1_000);

		const result = idxs && idxs.map((i) => items[i]) || items;

		return result;
	}, [haystack, uf, items]);

	return [queryProducts];
}
