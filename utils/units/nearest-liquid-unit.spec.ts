import { assertEquals } from "jsr:@std/assert";
import { nearestLiquidUnit } from "./nearest-liquid-unit.ts";

Deno.test("nearestLiquidUnit", () => {
	assertEquals(nearestLiquidUnit(1000, "ml"), {
		unit: "l",
		volume: 1,
	});

	assertEquals(nearestLiquidUnit(3000, "ml"), {
		unit: "l",
		volume: 3,
	});

	assertEquals(nearestLiquidUnit(0.33, "l"), {
		unit: "dl",
		volume: 3.3,
	});

	// whitelist test
	assertEquals(
		nearestLiquidUnit(0.33, "l", {
			whitelist: ["l", "ml"],
		}),
		{
			unit: "ml",
			volume: 330,
		},
	);

	// whitelist test
	assertEquals(nearestLiquidUnit(1100, "ml", { whitelist: ["l", "ml"] }), {
		unit: "l",
		volume: 1.1,
	});

	// blacklist test
	assertEquals(nearestLiquidUnit(1.1, "l", { blacklist: ["l"] }), {
		unit: "dl",
		volume: 11,
	});

	assertEquals(nearestLiquidUnit(330, "cl"), {
		unit: "l",
		volume: 3.3,
	});

	// assertEquals(nearestLiquidUnit(30, "ml"), {
	// 	unit: "l",
	// 	volume: 1,
	// });
});
