import { PageProps } from "fresh";
import {
	getSupermarketProducts,
	SupermarketProducts,
} from "../../utils/get-supermarket-data.ts";
import { normalizeUnit } from "../../utils/normalize-unit.ts";
import { nearestLiquidUnit } from "../../utils/units/nearest-liquid-unit.ts";
import { LiquidUnits } from "../../utils/units/factors/liquid.ts";
import { MassUnits } from "../../utils/units/factors/mass.ts";
import { nearestMassUnit } from "../../utils/units/nearest-mass-unit.ts";

export default function UnitConversion(_props: PageProps) {
	const items =
		(([] as SupermarketProducts).concat(...getSupermarketProducts()))
			.map((item) => {
				const unit = normalizeUnit(item.s);

				return {
					unit: unit,
					...item,
				};
			});

	return (
		<div>
			Hello
			<table>
				<thead>
					<tr>
						<td>supermarkt</td>
						<td>naam</td>
						<td>eenheid</td>
						<td>eenheid versimpeld</td>
						<td>output</td>
					</tr>
				</thead>
				<tbody>
					{items
						// .filter((item) => Number.isNaN(item.unit.volume) && item.s !== "")
						.filter((item) => item.s !== "")
						.map((item) => {
							let output;
							const isLiquid = item.unit.unit &&
								["ml", "cl", "l"].includes(item.unit.unit);

							const isMass = item.unit.unit &&
								["kg", "g"].includes(item.unit.unit);

							if (
								isLiquid && !Number.isNaN(item.unit.volume)
							) {
								output = nearestLiquidUnit(
									item.unit.volume * item.unit.quantity,
									item.unit.unit as LiquidUnits,
									{
										whitelist: ["l"],
									},
								);
							}

							if (
								isMass && !Number.isNaN(item.unit.volume)
							) {
								output = nearestMassUnit(
									item.unit.volume * item.unit.quantity,
									item.unit.unit as MassUnits,
									{
										whitelist: ["kg"],
									},
								);
							}

							return (
								<tr>
									<td>{item.supermarket}</td>
									<td>{item.n}</td>
									<td>{item.s}</td>
									<td>{JSON.stringify(item.unit)}</td>
									<td>{JSON.stringify(output)}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}
