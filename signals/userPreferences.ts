import { effect, signal } from "@preact/signals";
import { getSupermarketCompanies } from "../utils/get-supermarket-data.ts";

const storageKeySupermarkets = "userPreferences_supermarkets";

function getSavedPreferences(key: string) {
	const storageValues = localStorage.getItem(key);

	try {
		if (!storageValues) return null

		return JSON.parse(storageValues)
	} catch {
		return null
	}
}

const defaultValues = getSupermarketCompanies().map((supermarket) =>
	supermarket.supermarket_id
);

export const userPreferenceSupermarkets = signal<Array<string>>(
	getSavedPreferences(storageKeySupermarkets) || defaultValues
);

effect(() => {
	// triggered on every value change
	localStorage.setItem(storageKeySupermarkets, JSON.stringify(userPreferenceSupermarkets.value))
});