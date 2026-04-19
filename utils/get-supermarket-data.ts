import supermarkets from "../data/supermarkets.json" with { type: "json" };

export type Supermarket = {
	supermarket: string;
	supermarket_id: string;
	supermarket_logo: string;
};

export type SupermarketProduct = {
	n: string;
	l: string;
	p: number;
	s: string;
} & Pick<Supermarket, "supermarket" | "supermarket_id">;

export type SupermarketProducts = Array<SupermarketProduct>;

export function getSupermarketCompanies(): Array<Supermarket> {
	return supermarkets.map((supermarket) => {
		return {
			supermarket: supermarket.c,
			supermarket_id: supermarket.n,
			supermarket_logo: supermarket.i,
		};
	});
}

export function getSupermarketProducts(
	whitelist: Array<string> = [],
) {
	return supermarkets
		.filter((supermarket) => {
			// show all if whitelist empty
			if (whitelist.length === 0) return true;

			// filter out companies by (user) preference
			return whitelist.includes(supermarket.n);
		})
		.map((supermarket) => {
			return supermarket.d.map((product) => {
				return {
					supermarket: supermarket.c,
					supermarket_id: supermarket.n,
					// icon: supermarket.i,
					...product,
				};
			});
		});
}
