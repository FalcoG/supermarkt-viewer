export type GenericStandardUnits = Readonly<
	Array<{ unit: string; multiple: number }>
>;

export type GenericStandardReturn<T> = {
	unit: T;
	volume: number;
};

export type GenericStandardFunction<T> = (
	volume: number,
	unit: T,
	options?: {
		whitelist?: Array<T>;
		blacklist?: Array<T>;
	},
) => GenericStandardReturn<T>;

// beyond broken atm
export type GenericStandardWithFactorsFunction<T extends GenericStandardUnits> =
	(
		factors: T,
		...args: Parameters<GenericStandardFunction<T[number]["unit"]>>
	) => ReturnType<GenericStandardFunction<T[number]["unit"]>>;
