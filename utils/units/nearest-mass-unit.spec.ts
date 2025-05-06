import { assertEquals } from "jsr:@std/assert";
import { nearestMassUnit } from "./nearest-mass-unit.ts";

Deno.test("nearestMassUnit", () => {
	assertEquals(nearestMassUnit(1000, "g"), {
		unit: "kg",
		value: 1,
	});

	assertEquals(nearestMassUnit(900, "g"), {
		unit: "hg",
		value: 9,
	});

	assertEquals(
		nearestMassUnit(900, "g", {
			whitelist: ["g", "kg"],
		}),
		{
			unit: "g",
			value: 900,
		},
	);
});
