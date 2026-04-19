import { useSignal } from "@preact/signals";
import { ProductSearch } from "../islands/ProductSearch.tsx";
import { ProductResults } from "../islands/ProductResults.tsx";
import { UserPreferencesProvider } from "../contexts/UserPreferences.tsx";
import { UserPreferences } from "../islands/UserPreferences.tsx";

export default function Home() {
	const search = useSignal("");

	return (
		<div class="px-4 py-8 mx-auto">
			<div class="max-w-screen-md mx-auto flex flex-col justify-center">
				<h1 class="text-4xl font-bold text-emerald-600">🛒Super Prijzen</h1>

				<p className="my-4">Zoek een product en vergelijk</p>

				<UserPreferencesProvider>
					<UserPreferences />
					<ProductSearch search={search} />
					<ProductResults search={search} />
				</UserPreferencesProvider>
			</div>
		</div>
	);
}
