import type { Signal } from "@preact/signals";
import { createProductUrl } from "../utils/create-product-url.ts";
import { useSupermarketProducts } from "../hooks/useSupermarketProducts.ts";

interface ProductResultsProps {
	search: Signal<string>;
}

export function ProductResults({ search }: ProductResultsProps) {
	const [queryProducts] = useSupermarketProducts();
	const results = queryProducts(search.value);
	const visibleResults = results.slice(0, 100);

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
										<td className="text-emerald-500
										" /* todo: calculate cheapest, and ~50% percentile, and then colour gradient it based on the best value */>
											{relativePrice}
										</td>
										<td
											title={`Origineel: ${item.s}`}
											className="font-mono text-sm"
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
			{visibleResults.length !== results.length && (
				<p>
					{visibleResults.length} van de {results.length} resultaten
				</p>
			)}
		</div>
	);
}
