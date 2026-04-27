import { useMemo } from "preact/hooks";
import { getSupermarketCompanies } from "../utils/get-supermarket-data.ts";
import { userPreferenceSupermarkets } from "../signals/userPreferences.ts";

export function UserPreferences() {
	const stores = useMemo(() => getSupermarketCompanies(), []);

	return (
		<form action="">
			Producten tonen van:

			<div class="-ml-1">
				{stores.map((store) => {
					return (
						<label class="bg-gray-50 dark:bg-gray-700 p-2 m-1 inline-block rounded">
							<input
								type="checkbox"
								name={`supermarket-name-${store.supermarket_id}`}
								checked={userPreferenceSupermarkets.value.includes(
									store.supermarket_id,
								)}
								onChange={(event) => {
									if (event.target && "checked" in event.target) {
										const enabled = !!event.target.checked;

										if (enabled) {
											const nextState = [
												...userPreferenceSupermarkets.value,
												store.supermarket_id,
											];

											userPreferenceSupermarkets.value = nextState;
										} else {
											const nextState = userPreferenceSupermarkets.value.filter(
												(
													val,
												) => val !== store.supermarket_id,
											);

											userPreferenceSupermarkets.value = nextState;
										}
									}
								}}
							/>{" "}
							<img
								src={`/supermarket-logos/${store.supermarket_id}.svg`}
								width="32px"
								height="32px"
								class="inline"
								alt={store.supermarket}
							/>
						</label>
					);
				})}
			</div>
		</form>
	);
}
