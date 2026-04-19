import { useContext, useEffect, useMemo } from "preact/hooks";
import { getSupermarketCompanies } from "../utils/get-supermarket-data.ts";
import { UserPreferencesContext } from "../contexts/UserPreferences.tsx";

export function UserPreferences() {
	const stores = useMemo(() => getSupermarketCompanies(), []);
	const { activeSupermarkets, toggleSupermarket } = useContext(
		UserPreferencesContext,
	);

	useEffect(() => {
		console.log("supermarkets update", activeSupermarkets);
	}, [activeSupermarkets]);

	useEffect(() => {
		console.log("supermarkets toggler", toggleSupermarket);
	}, [toggleSupermarket]);

	return (
		<form action="">
			CURRENT PREF: {JSON.stringify(activeSupermarkets)}

			{stores.map((store) => {
				return (
					<label>
						<input
							type="checkbox"
							name={`supermarket-name-${store.supermarket_id}`}
							// onInput={onChange}
							// checked={selectedFruit === 'apple'}
							checked={activeSupermarkets.includes(store.supermarket_id) ||
								activeSupermarkets.length === 0}
							onChange={(event) => {
								if (event.target && "checked" in event.target) {
									const enabled = !!event.target.checked;

									console.log("toggle, ", enabled, toggleSupermarket);

									toggleSupermarket(store.supermarket_id, enabled);

									// console.log(store, 'state change to', event.target.checked)
									//
									// console.log(setActiveSupermarkets)
									//
									// setActiveSupermarkets !== undefined && setActiveSupermarkets((prev) => {
									//     console.log('prev state', prev)
									//     if (!enabled) {
									//         console.log('is enabled', enabled)
									//         if (prev.length === 0) {
									//             // populate the entries if the array was already empty before disabling the specific supermarket
									//             const nextState = stores.map((store) => store.supermarket_id).filter((id) => id !== store.supermarket_id)
									//
									//             console.log('next state', nextState)
									//             return nextState
									//         }
									//
									//         return prev.filter((id) => id !== store.supermarket_id)
									//     } else {
									//         return [...prev, store.supermarket_id]
									//     }
									// })
								}
							}}
						/>{" "}
						{store.supermarket_id}
					</label>
				);
			})}
		</form>
	);
}
