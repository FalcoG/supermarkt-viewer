export const mass = [
	// factor array order impacts the first found factor
	// could be implemented in code but might be hardware intensive
	{ unit: "kg", multiple: 1e3 },
	{ unit: "hg", multiple: 1e2 },
	{ unit: "dag", multiple: 1e1 },
	{ unit: "g", multiple: 1 },
	{ unit: "dg", multiple: 1e-1 },
	{ unit: "cg", multiple: 1e-2 },
	{ unit: "mg", multiple: 1e-3 },
] as const;

// todo: implement all multiples
// https://en.wikipedia.org/wiki/Orders_of_magnitude_(mass)

export type MassUnits = typeof mass[number]["unit"];
