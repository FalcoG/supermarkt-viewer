import { GenericStandardFunction, GenericStandardUnits } from "./types.ts";

export function nearestByDynamicFactors<
	T extends GenericStandardUnits,
>(
	factors: T,
	volume: number,
	unit: T[number]["unit"],
	options: {
		whitelist?: Array<T[number]["unit"]>;
		blacklist?: Array<T[number]["unit"]>;
	} = {},
): ReturnType<GenericStandardFunction<T[number]["unit"]>> {
	const floatFixPrecision = 1000;
	const currentFactor = factors.find((factor) => factor.unit === unit);

	if (!currentFactor) {
		throw new Error(`The unit "${unit}" is not implemented.`);
	}

	const baseline = ((volume * floatFixPrecision) * currentFactor.multiple) /
		floatFixPrecision;

	const allowedFactors = factors.filter((factor) => {
		if (options.whitelist) {
			return options.whitelist.includes(
				factor.unit,
			);
		} else if (options.blacklist) {
			return !options.blacklist.includes(
				factor.unit,
			);
		} else {
			return true;
		}
	});

	const relevantFactor = allowedFactors.find((factor) => {
		const convertedValue = Math.abs(baseline) / factor.multiple;

		// breaks if input value is less than 1 with smallest unit
		if (convertedValue >= 1) return true;
	}) || allowedFactors[0]; // todo: fall back to lowest available factor

	if (relevantFactor) {
		return {
			unit: relevantFactor.unit,
			volume: ((baseline * floatFixPrecision) / relevantFactor.multiple) /
				floatFixPrecision,
		};
	} else {
		throw new Error(`Unable to determine most relevant unit`);
	}
}
