import { assertEquals } from "jsr:@std/assert";
import { getSimpleUnit } from "./get-simple-unit.ts";

Deno.test("getSimpleUnit", () => {
	assertEquals(getSimpleUnit("12 x 0,25 l"), {
		unit: "liter",
		volume: 3,
		itemVolume: 0.25,
		itemQuantity: 12,
	});

	assertEquals(getSimpleUnit("6 x 0,33 l"), {
		unit: "liter",
		volume: 1.98,
		itemVolume: 0.33,
		itemQuantity: 6,
	});

	// an example of javascript rounding issues
	assertEquals(getSimpleUnit("24 x 200 ml"), {
		unit: "liter",
		volume: 4.8,
		itemVolume: 0.2,
		itemQuantity: 24,
	});

	assertEquals(getSimpleUnit("1,2 liter"), {
		unit: "liter",
		volume: 1.2,
		itemVolume: 1.2,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("951 milliliter"), {
		unit: "liter",
		volume: 0.951,
		itemVolume: 0.951,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("50  g"), {
		unit: "kilogram",
		volume: 0.05,
		itemVolume: 0.05,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("24 rol"), {
		unit: "rol",
		volume: 1,
		itemVolume: 1,
		itemQuantity: 24,
	});
	// assertEquals(getSimpleUnit("24 rollen"), {
	// 	unit: "rollen",
	// 	volume: 1,
	// 	itemVolume: 1,
	// 	itemQuantity: 24,
	// });

	// assertEquals(getSimpleUnit("11 - 16 kg, 20 stuks"), {
	// 	unit: "stuks",
	// 	volume: 1,
	// 	itemVolume: 1,
	// 	itemQuantity: 20,
	// });

	// quantities without unit
	assertEquals(getSimpleUnit("100 stuk(s)"), {
		// unit: "stuks",
		unit: "onbekend",
		volume: 100,
		itemVolume: 100,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("100 stuks"), {
		unit: "onbekend",
		volume: 100,
		itemVolume: 100,
		itemQuantity: 1,
	});

	// liquid
	assertEquals(getSimpleUnit("50ml"), {
		unit: "liter",
		volume: 0.05,
		itemVolume: 0.05,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("0,2cl"), {
		unit: "liter",
		volume: 0.002,
		itemVolume: 0.002,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("33 cl"), {
		unit: "liter",
		volume: 0.33,
		itemVolume: 0.33,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("40 cl"), {
		unit: "liter",
		volume: 0.4,
		itemVolume: 0.4,
		itemQuantity: 1,
	});

	// Cyrillic Small Letter Es
	assertEquals(getSimpleUnit("40 сl"), {
		unit: "liter",
		volume: 0.4,
		itemVolume: 0.4,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("20 l."), {
		unit: "liter",
		volume: 20,
		itemVolume: 20,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("20 liter"), {
		unit: "liter",
		volume: 20,
		itemVolume: 20,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("7 l"), {
		unit: "liter",
		volume: 7,
		itemVolume: 7,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("0.2 L"), {
		unit: "liter",
		volume: 0.2,
		itemVolume: 0.2,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("0,2l"), {
		unit: "liter",
		volume: 0.2,
		itemVolume: 0.2,
		itemQuantity: 1,
	});

	// weight
	assertEquals(getSimpleUnit("50 gram"), {
		unit: "kilogram",
		volume: 0.05,
		itemVolume: 0.05,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("50gram"), {
		unit: "kilogram",
		volume: 0.05,
		itemVolume: 0.05,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("50  g"), {
		unit: "kilogram",
		volume: 0.050,
		itemVolume: 0.050,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("50g"), {
		unit: "kilogram",
		volume: 0.050,
		itemVolume: 0.050,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("1kg"), {
		unit: "kilogram",
		volume: 1,
		itemVolume: 1,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("1,5kg"), {
		unit: "kilogram",
		volume: 1.5,
		itemVolume: 1.5,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("1.5kg"), {
		unit: "kilogram",
		volume: 1.5,
		itemVolume: 1.5,
		itemQuantity: 1,
	});

	assertEquals(getSimpleUnit("3,50kg"), {
		unit: "kilogram",
		volume: 3.5,
		itemVolume: 3.5,
		itemQuantity: 1,
	});
});
