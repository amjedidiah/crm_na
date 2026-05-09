import { describe, expect, test } from "bun:test";
import { getChurches, getMinistries, getPublicationsByType } from "@/lib/wordpress";

describe("wordpress fallback layer", () => {
  test("returns mock churches", async () => {
    expect((await getChurches()).length).toBeGreaterThan(0);
    expect((await getMinistries()).length).toBeGreaterThan(0);
  });

  test("getPublicationsByType returns only matching type", async () => {
    const devotionals = await getPublicationsByType("devotional");
    expect(devotionals.length).toBeGreaterThan(0);
    expect(devotionals.every((p) => p.type === "devotional")).toBe(true);

    const blogs = await getPublicationsByType("blog");
    expect(blogs.length).toBeGreaterThan(0);
    expect(blogs.every((p) => p.type === "blog")).toBe(true);
  });
});
