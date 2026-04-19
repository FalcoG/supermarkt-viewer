import { useMemo } from "preact/hooks";
import { getSupermarketCompanies } from "../utils/get-supermarket-data.ts";
import { userPreferenceSupermarkets } from "../signals/userPreferences.ts";

export function UserPreferences() {
	const stores = useMemo(() => getSupermarketCompanies(), []);

	return (
		<form action="">
			Resultaten van:

			{stores.map((store) => {
				return (
					<label>
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
										const nextState = userPreferenceSupermarkets.value.filter((
											val,
										) => val !== store.supermarket_id);

										userPreferenceSupermarkets.value = nextState;
									}
								}
							}}
						/>{" "}
						{store.supermarket}
					</label>
				);
			})}
		</form>
	);
}
