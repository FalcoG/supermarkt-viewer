export const liquid = [
	// factor array order impacts the first found factor
	// could be implemented in code but might be hardware intensive
	{ unit: "l", multiple: 1 },
	{ unit: "dl", multiple: 1e-1 },
	{ unit: "cl", multiple: 1e-2 },
	{ unit: "ml", multiple: 1e-3 },
] as const;

// todo: implement all multiples
// https://en.wikipedia.org/wiki/Litre#SI_prefixes_applied_to_the_litre

export type LiquidUnits = typeof liquid[number]["unit"];
