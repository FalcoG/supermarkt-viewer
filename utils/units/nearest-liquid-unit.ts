import { liquid, LiquidUnits } from "./factors/liquid.ts";
import { nearestByDynamicFactors } from "./nearest-by-dynamic-factors.ts";
import { GenericStandardFunction } from "./types.ts";

export const nearestLiquidUnit: GenericStandardFunction<LiquidUnits> = (
	value,
	unit,
	options = {},
) => {
	return nearestByDynamicFactors<typeof liquid>(liquid, value, unit, options);
};
