import { GenericStandardFunction, GenericStandardUnits } from "./types.ts";

export function nearestByDynamicFactors<
	T extends GenericStandardUnits,
>(
	factors: T,
	value: number,
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

	const baseline = ((value * floatFixPrecision) * currentFactor.multiple) /
		floatFixPrecision;

	console.log(
		"baseline",
		baseline,
	);

	const relevantFactor = factors.filter((factor) => {
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
	}).find((factor) => {
		const convertedValue = baseline / factor.multiple;

		if (convertedValue >= 1) return true;
	});

	if (relevantFactor) {
		return {
			unit: relevantFactor.unit,
			value: ((baseline * floatFixPrecision) / relevantFactor.multiple) /
				floatFixPrecision,
		};
	} else {
		throw new Error(`Unable to determine most relevant unit`);
	}
}
