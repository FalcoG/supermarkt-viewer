import { createContext } from "preact";
import { ReactNode } from "preact/compat";
import { useCallback, useState } from "preact/hooks";

export type TUserPreferencesContext = {
	activeSupermarkets: Array<string>;
	toggleSupermarket: (id: string, state: boolean) => void;
	// setActiveSupermarkets?: Dispatch<StateUpdater<string[]>>
};

export const UserPreferencesContext = createContext<TUserPreferencesContext>({
	activeSupermarkets: [],
	toggleSupermarket: (id: string, state: boolean) => {
		console.log("Initial handler");
	},
});

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
	const [activeSupermarkets, setActiveSupermarkets] = useState<
		TUserPreferencesContext["activeSupermarkets"]
	>(["ah"]);

	// useEffect(() => {
	// 	console.log("supermarket preferences updated", activeSupermarkets);
	// }, [activeSupermarkets]);

	const toggleSupermarket: TUserPreferencesContext["toggleSupermarket"] =
		useCallback((id: string, state: boolean) => {
			console.log("toggle supermarket...", id, state);
		}, []);

	return (
		<UserPreferencesContext
			value={{
				activeSupermarkets,
				toggleSupermarket,
			}}
		>
			{children}
		</UserPreferencesContext>
	);
}
