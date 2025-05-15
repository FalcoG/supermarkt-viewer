import { liquid, LiquidUnits } from "./factors/liquid.ts";
import { nearestByDynamicFactors } from "./nearest-by-dynamic-factors.ts";
import { GenericStandardFunction } from "./types.ts";

export const nearestLiquidUnit: GenericStandardFunction<LiquidUnits> = (
	volume,
	unit,
	options = {},
) => {
	return nearestByDynamicFactors<typeof liquid>(liquid, volume, unit, options);
};
