import supermarkets from "../data/supermarkets.json" with { type: "json" };

export type Supermarket = {
	supermarket: string;
	supermarket_id: string;
};

export type SupermarketProduct = {
	n: string;
	l: string;
	p: number;
	s: string;
} & Supermarket;

export type SupermarketProducts = Array<SupermarketProduct>;

const supermarketItems = supermarkets.map((supermarket) => {
	return supermarket.d.map((product) => {
		return {
			supermarket: supermarket.c,
			supermarket_id: supermarket.n,
			// icon: supermarket.i,
			...product,
		};
	});
});

export function getSupermarketCompanies(): Array<Supermarket> {
	return supermarkets.map((supermarket) => {
		return {
			supermarket: supermarket.c,
			supermarket_id: supermarket.n,
		};
	});
}

export function getSupermarketData() {
	return supermarketItems;
}
