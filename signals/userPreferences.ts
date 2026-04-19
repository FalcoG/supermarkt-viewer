import { signal } from "@preact/signals";
import { getSupermarketCompanies } from "../utils/get-supermarket-data.ts";

const defaultValues = getSupermarketCompanies().map((supermarket) =>
	supermarket.supermarket_id
);

export const userPreferenceSupermarkets = signal<Array<string>>(defaultValues);
