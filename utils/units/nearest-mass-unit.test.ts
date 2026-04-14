import { assertEquals } from "@std/assert";
import { nearestMassUnit } from "./nearest-mass-unit.ts";

Deno.test("nearestMassUnit", () => {
	assertEquals(nearestMassUnit(1000, "g"), {
		unit: "kg",
		volume: 1,
	});

	assertEquals(nearestMassUnit(900, "g"), {
		unit: "hg",
		volume: 9,
	});

	assertEquals(nearestMassUnit(-900, "g"), {
		unit: "hg",
		volume: -9,
	});

	assertEquals(
		nearestMassUnit(900, "g", {
			whitelist: ["g", "kg"],
		}),
		{
			unit: "g",
			volume: 900,
		},
	);
});
