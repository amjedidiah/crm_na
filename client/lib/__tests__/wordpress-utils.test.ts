import { describe, expect, test } from "bun:test";
import { getChurches, getMinistries } from "@/lib/wordpress";

describe("wordpress fallback layer", () => {
  test("returns mock churches", async () => {
    expect((await getChurches()).length).toBeGreaterThan(0);
    expect((await getMinistries()).length).toBeGreaterThan(0);
  });
});
