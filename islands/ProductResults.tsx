import uFuzzy from "npm:@leeoniya/ufuzzy";
import type { Signal } from "@preact/signals";
import { createProductUrl } from "../utils/create-product-url.ts";
import {
	getSupermarketData,
	SupermarketProducts,
} from "../utils/get-supermarket-data.ts";
import { normalizeUnit } from "../utils/normalize-unit.ts";
import { nearestLiquidUnit } from "../utils/units/nearest-liquid-unit.ts";
import { LiquidUnits } from "../utils/units/factors/liquid.ts";
import { nearestMassUnit } from "../utils/units/nearest-mass-unit.ts";
import { MassUnits } from "../utils/units/factors/mass.ts";
// import { SupermarketLogo } from "../components/supermarket-logo/SupermarketLogo.tsx";
// import { SupermarketStylizedName } from "../components/SupermarketStylizedName.tsx";

interface ProductResultsProps {
	search: Signal<string>;
}

const items = (([] as SupermarketProducts).concat(...getSupermarketData()))
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

export function ProductResults({ search }: ProductResultsProps) {
	const [idxs, info, order] = uf.search(haystack, search.value, 1, 1e3);

	const result = idxs && idxs.map((i) => items[i]) || items;
	const visibleResults = result.slice(0, 100);
	console.log("fuzzy out", result);

	return (
		<div class="flex py-6 gap-6 flex-col">
			<div>
				<p className="text-3xl tabular-nums">
					Resultaten voor: <u>{search.value}</u>
				</p>
			</div>
			<div>
				<table className="border-separate border-spacing-2 table-auto">
					<thead>
						<tr>
							<td>Winkel</td>
							<td>Naam</td>
							<td>
								Prijs per volume
							</td>
							<td>Inhoud</td>
							<td>Prijs</td>
						</tr>
					</thead>
					<tbody>
						{visibleResults
							.map((item) => {
								const relativePrice = (item.priceByVolume && item.priceByUnit)
									? `${
										new Intl.NumberFormat(
											"nl-NL",
											{ style: "currency", currency: "EUR" },
										).format(item.priceByVolume)
									} / ${item.priceByUnit.unit}`
									: "-";

								const readableVolume = item.unit.volume && item.unit.unit
									? (
										<>
											{item.unit.quantity !== 1 && `${item.unit.quantity} x `}
											{new Intl.NumberFormat("nl-NL").format(
												item.unit.volume,
											)}&nbsp;{item.unit.unit}
										</>
									)
									: item.s;

								return (
									<tr>
										<td className={`logo ${item.supermarket_id}`}>
											{item.supermarket}
											{/*<SupermarketStylizedName*/}
											{/*	supermarketId={item.supermarket_id}*/}
											{/*	supermarketName={item.supermarket}*/}
											{/*/>*/}
										</td>
										<td>
											<a
												href={`${
													createProductUrl(item.l, item.supermarket_id)
												}`}
											>
												{item.n}
											</a>
										</td>
										<td className="text-emerald-500">
											{relativePrice}
										</td>
										<td
											title={`Origineel: ${item.s}`}
										>
											{readableVolume}
										</td>
										<td>
											{new Intl.NumberFormat(
												"nl-NL",
												{ style: "currency", currency: "EUR" },
											).format(item.p)}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			{visibleResults.length !== result.length && (
				<p>
					{visibleResults.length} van de {result.length} resultaten
				</p>
			)}
		</div>
	);
}
