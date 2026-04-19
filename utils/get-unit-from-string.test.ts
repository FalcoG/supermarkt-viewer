import { assertEquals } from "@std/assert";
import { getUnitFromString } from "./get-unit-from-string.ts";

Deno.test("getUnitFromString", () => {
	assertEquals(getUnitFromString("0,25 l"), { unit: "l", volume: 0.25 });
});
