type LiquidUnits = "l" | "dl" | "cl" | "ml";

export function nearestLiquidUnit(
	volume: number,
	unit: string,
	options: {
		whitelist?: Array<LiquidUnits>;
		blacklist?: Array<LiquidUnits>;
	} = {},
): {
	unit: LiquidUnits;
	volume: number;
} {
	// https://en.wikipedia.org/wiki/Litre#SI_prefixes_applied_to_the_litre

	// factor array order impacts the first found factor
	const factors: Array<{ unit: LiquidUnits; multiple: number }> = [
		{ unit: "l", multiple: 1 },
		{ unit: "dl", multiple: 1e-1 },
		{ unit: "cl", multiple: 1e-2 },
		{ unit: "ml", multiple: 1e-3 },
	];

	// todo: precision float fixer - aka take lowest/highest factor so there are no floats
	const currentFactor = factors.find((factor) => factor.unit === unit);

	if (!currentFactor) {
		throw new Error(`The liquid "${unit}" is not implemented.`);
	}

	const baseline = volume * currentFactor.multiple;

	console.log(
		"baseline (liter)",
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
		const convertedVolume = baseline / factor.multiple;

		if (convertedVolume >= 1) return true;
	});

	if (relevantFactor) {
		return {
			unit: relevantFactor.unit,
			volume: baseline / relevantFactor.multiple,
		};
	} else {
		throw new Error(`Unable to determine most relevant unit`);
	}
}
