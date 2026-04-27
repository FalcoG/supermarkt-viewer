import { useSignal } from "@preact/signals";
import { ProductSearch } from "../islands/ProductSearch.tsx";
import { ProductResults } from "../islands/ProductResults.tsx";
import { UserPreferences } from "../islands/UserPreferences.tsx";
import { PageProps } from "fresh";

export default function Home(props: PageProps) {
	// restore search query from url if form was unnecessarily submitted by user
	const search = useSignal(props.url.searchParams.get("q")?.toString() || "");

	return (
		<div class="px-4 py-8 mx-auto">
			<div class="max-w-screen-md mx-auto flex flex-col justify-center">
				<h1 class="text-4xl font-bold text-emerald-600">🛒Super Prijzen</h1>

				<p className="my-4">Zoek een product en vergelijk</p>

				<ProductSearch search={search} />
				<UserPreferences />
				<ProductResults search={search} />
			</div>
		</div>
	);
}
