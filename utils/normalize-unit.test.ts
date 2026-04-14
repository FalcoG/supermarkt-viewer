import { assertEquals } from "@std/assert";
import { normalizeUnit } from "./normalize-unit.ts";

Deno.test("normalizeUnit", () => {
	// quantities without unit
	assertEquals(normalizeUnit("100 stuk(s)"), {
		volume: NaN,
		unit: undefined,
		quantity: 100,
	});
	assertEquals(normalizeUnit("100 stuks"), {
		volume: NaN,
		unit: undefined,
		quantity: 100,
	});
	assertEquals(normalizeUnit("Per 12 st"), {
		volume: NaN,
		unit: undefined,
		quantity: 12,
	});
	assertEquals(normalizeUnit("per stuk"), {
		volume: NaN,
		unit: undefined,
		quantity: 1,
	});
	// todo: implement
	// assertEquals(normalizeUnit("5 x 2 stuks"), {
	// 	volume: NaN,
	// 	unit: undefined,
	// 	quantity: 10,
	// });

	// liquid
	assertEquals(normalizeUnit("50ml"), {
		volume: 50,
		unit: "ml",
		quantity: 1,
	});

	assertEquals(normalizeUnit("0,2cl"), {
		volume: 0.2,
		unit: "cl",
		quantity: 1,
	});
	assertEquals(normalizeUnit("33 cl"), {
		volume: 33,
		unit: "cl",
		quantity: 1,
	});
	assertEquals(normalizeUnit("40 cl"), {
		volume: 40,
		unit: "cl",
		quantity: 1,
	});
	assertEquals(normalizeUnit("40 сl"), {
		volume: 40,
		unit: "cl",
		quantity: 1,
	}); // Cyrillic Small Letter Es

	assertEquals(normalizeUnit("20 l."), {
		volume: 20,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("1.5 l ."), {
		volume: 1.5,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("20 liter"), {
		volume: 20,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("7 l"), {
		volume: 7,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("0.2 L"), {
		volume: 0.2,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("0,2l"), {
		volume: 0.2,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("0,25 lt"), {
		volume: 0.25,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("0.81 Liters"), {
		volume: 0.81,
		unit: "l",
		quantity: 1,
	});
	assertEquals(normalizeUnit("145 Mililiters"), {
		volume: 145,
		unit: "ml",
		quantity: 1,
	});

	// liquid - stranger cases
	assertEquals(normalizeUnit("3000 ml (3L)"), {
		volume: 3000,
		unit: "ml",
		quantity: 1,
	});
	assertEquals(normalizeUnit("Per 1320 ml"), {
		volume: 1320,
		unit: "ml",
		quantity: 1,
	});
	assertEquals(normalizeUnit("6 x 43.1 ml"), {
		volume: 43.1,
		unit: "ml",
		quantity: 6,
	});
	assertEquals(normalizeUnit("4 x 33 CL"), {
		volume: 33,
		unit: "cl",
		quantity: 4,
	});

	// weight
	assertEquals(normalizeUnit("50 gram"), {
		volume: 50,
		unit: "g",
		quantity: 1,
	});
	assertEquals(normalizeUnit("50gram"), {
		volume: 50,
		unit: "g",
		quantity: 1,
	});
	assertEquals(normalizeUnit("50  g"), {
		volume: 50,
		unit: "g",
		quantity: 1,
	});
	assertEquals(normalizeUnit("50g"), {
		volume: 50,
		unit: "g",
		quantity: 1,
	});
	assertEquals(normalizeUnit("1kg"), {
		volume: 1,
		unit: "kg",
		quantity: 1,
	});
	assertEquals(normalizeUnit("1,5kg"), {
		volume: 1.5,
		unit: "kg",
		quantity: 1,
	});
	assertEquals(normalizeUnit("1.5kg"), {
		volume: 1.5,
		unit: "kg",
		quantity: 1,
	});
	assertEquals(normalizeUnit("3,50kg"), {
		volume: 3.5,
		unit: "kg",
		quantity: 1,
	});
	assertEquals(normalizeUnit("Per kilo"), {
		volume: 1,
		unit: "kg",
		quantity: 1,
	});
	assertEquals(normalizeUnit("2 x 125 GRAM"), {
		volume: 125,
		unit: "g",
		quantity: 2,
	});
	assertEquals(normalizeUnit("ca. 400 g"), {
		volume: 400,
		unit: "g",
		quantity: 1,
	});
	assertEquals(normalizeUnit("333 Grams"), {
		volume: 333,
		unit: "g",
		quantity: 1,
	});
	// really, this exists! ...what weight do they use themselves for price/kg?! very strange.
	assertEquals(normalizeUnit("400-415 g"), {
		volume: 400,
		unit: "g",
		quantity: 1,
	});
	assertEquals(normalizeUnit("los per kilo"), {
		volume: 1,
		unit: "kg",
		quantity: 1,
	});
	assertEquals(normalizeUnit("los per 2 kilo"), {
		volume: 2,
		unit: "kg",
		quantity: 1,
	});
	assertEquals(normalizeUnit("los per 500 g"), {
		volume: 500,
		unit: "g",
		quantity: 1,
	});
	// todo: implement
	// assertEquals(normalizeUnit("1 kg, verpakt"), {
	// 	volume: 1,
	// 	unit: "kg",
	// 	quantity: 1,
	// });
	// assertEquals(normalizeUnit("311 g, 24 cm" /* this is about pizza */), {
	// 	volume: 311,
	// 	unit: "g",
	// 	quantity: 1,
	// });

	// length - todo: implement in util
	assertEquals(normalizeUnit("50 meter"), {
		volume: NaN,
		unit: undefined,
		quantity: NaN,
	});
	assertEquals(normalizeUnit("100 m"), {
		volume: NaN,
		unit: undefined,
		quantity: NaN,
	});
	assertEquals(normalizeUnit("just random text"), {
		volume: NaN,
		unit: undefined,
		quantity: NaN,
	});
	assertEquals(normalizeUnit("60 tabletten"), {
		volume: NaN,
		unit: undefined,
		quantity: NaN,
	});
	assertEquals(normalizeUnit("20 rollen"), {
		volume: NaN,
		unit: undefined,
		quantity: NaN,
	});
	// assertEquals(normalizeUnit("50 m"), "50 meter");

	// "24 rol", "24 rollen" -- probably make them non-applicable? or copy 1:1 as unit
});
