import type { Signal } from "@preact/signals";

interface ProductSearchProps {
	search: Signal<string>;
}

export function ProductSearch({ search }: ProductSearchProps) {
	return (
		<div class="flex gap-8 py-6">
			<form action="">
				<input
					class="px-2 py-1 border-gray-500 border-2 rounded bg-white dark:bg-black hover:border-gray-800 dark:hover:border-gray-400"
					type="text"
					placeholder="Zoeken... bijv: Pindakaas"
					onInput={(e) => {
						if (e.target instanceof HTMLInputElement) {search.value =
								e.target.value;}
					}}
					value={search}
				/>
			</form>
		</div>
	);
}
