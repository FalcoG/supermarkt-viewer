import { assertEquals } from "jsr:@std/assert";
import { normalizeUnit } from "./normalize-unit.ts";

Deno.test("normalizeUnit", () => {
	// quantities without unit
	assertEquals(normalizeUnit("100 stuk(s)"), "100 stuks");
	assertEquals(normalizeUnit("100 stuks"), "100 stuks");

	// liquid
	assertEquals(normalizeUnit("50ml"), "50 ml");

	assertEquals(normalizeUnit("0,2cl"), "2 ml");
	assertEquals(normalizeUnit("33 cl"), "330 ml");
	assertEquals(normalizeUnit("40 cl"), "400 ml");
	assertEquals(normalizeUnit("40 сl"), "400 ml"); // Cyrillic Small Letter Es

	assertEquals(normalizeUnit("20 l."), "20000 ml");
	assertEquals(normalizeUnit("20 liter"), "20000 ml");
	assertEquals(normalizeUnit("7 l"), "7000 ml");
	assertEquals(normalizeUnit("0.2 L"), "200 ml");
	assertEquals(normalizeUnit("0,2l"), "200 ml");

	// weight
	assertEquals(normalizeUnit("50 gram"), "50 g");
	assertEquals(normalizeUnit("50gram"), "50 g");
	assertEquals(normalizeUnit("50  g"), "50 g");
	assertEquals(normalizeUnit("50g"), "50 g");
	assertEquals(normalizeUnit("1kg"), "1000 g");
	assertEquals(normalizeUnit("1,5kg"), "1500 g");
	assertEquals(normalizeUnit("1.5kg"), "1500 g");
	assertEquals(normalizeUnit("3,50kg"), "3500 g");

	// length - todo: implement in util
	// assertEquals(normalizeUnit("50 meter"), "50 meter");
	// assertEquals(normalizeUnit("50 m"), "50 meter");

	// "24 rol", "24 rollen" -- probably make them non-applicable? or copy 1:1 as unit
});
