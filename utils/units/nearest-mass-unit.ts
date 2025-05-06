import { mass, MassUnits } from "./factors/mass.ts";
import { nearestByDynamicFactors } from "./nearest-by-dynamic-factors.ts";
import { GenericStandardFunction } from "./types.ts";

export const nearestMassUnit: GenericStandardFunction<MassUnits> = (
	value,
	unit,
	options = {},
) => {
	return nearestByDynamicFactors<typeof mass>(mass, value, unit, options);
};
