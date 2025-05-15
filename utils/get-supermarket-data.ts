import supermarkets from "../data/supermarkets.json" with { type: "json" };

export type SupermarketProduct = {
	n: string;
	l: string;
	p: number;
	s: string;
	supermarket: string;
	supermarket_id: string;
};

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

export function getSupermarketData() {
	return supermarketItems;
}
