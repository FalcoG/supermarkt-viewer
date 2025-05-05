import uFuzzy from "npm:@leeoniya/ufuzzy";
import type { Signal } from "@preact/signals";
import supermarkets from "../data/supermarkets.json" with { type: "json" };
import { getSimpleUnit } from "../utils/get-simple-unit.ts";
import { createProductUrl } from "../utils/create-product-url.ts";
// import { SupermarketLogo } from "../components/supermarket-logo/SupermarketLogo.tsx";
// import { SupermarketStylizedName } from "../components/SupermarketStylizedName.tsx";

interface ProductResultsProps {
	search: Signal<string>;
}

type SupermarketProduct = {
	n: string;
	l: string;
	p: number;
	s: string;
	supermarket: string;
	supermarket_id: string;
};

type SupermarketProducts = Array<SupermarketProduct>;

const supermarketItems = supermarkets.map((supermarket) => {
	return supermarket.d.map((product) => {
		return {
			supermarket: supermarket.c,
			supermarket_id: supermarket.n,
			// icon: supermarket.i,
			...product,
		};
	});
});

const items = (([] as SupermarketProducts).concat(...supermarketItems))
	.map((item) => {
		const unit = getSimpleUnit(item.s);

		// /convert(12000).from('mm').toBest()
		return {
			// priceByVolume: (item.p / (parseInt(normalizeUnit(item.s)) / 1000)),
			priceByVolume: (item.p / (unit.volume)),
			unit: unit,
			// readableUnit: convertUnits(unit.volume).from(unit.unit).toBest(),
			...item,
		};
	})
	.filter((item) => item.unit.unit !== "onbekend")
	.filter((item) => !Number.isNaN(item.priceByVolume))
	.sort((firstItem, secondItem) =>
		firstItem.priceByVolume - secondItem.priceByVolume
	);

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
							<td>Inhoud</td>
							<td>Prijs</td>
							<td>Inhoud</td>
							<td>
								Prijs per kg/liter
							</td>
						</tr>
					</thead>
					<tbody>
						{visibleResults
							.map((item) => (
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
											href={`${createProductUrl(item.l, item.supermarket_id)}`}
										>
											{item.n}
										</a>
									</td>
									<td>{item.s}</td>
									<td>
										{new Intl.NumberFormat(
											"nl-NL",
											{ style: "currency", currency: "EUR" },
										).format(item.p)}
									</td>
									<td title={`Origineel: ${item.s}`}>
										{item.unit.volume}&nbsp;{item.unit.unit}
									</td>
									<td>
										{new Intl.NumberFormat(
											"nl-NL",
											{ style: "currency", currency: "EUR" },
										).format(item.priceByVolume)}
									</td>
								</tr>
							))}
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
