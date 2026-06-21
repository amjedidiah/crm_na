import { describe, expect, test } from "bun:test";
import {
  getAboutContent,
  getChurches,
  getGalleryAlbums,
  getMinistries,
  getPublicationsByType,
  hasWordPress,
} from "@/lib/wordpress";

describe("wordpress fallback layer", () => {
  test("hasWordPress is false without endpoint in test env", () => {
    expect(hasWordPress()).toBe(false);
  });

  test("returns mock churches, ministries, and gallery albums", async () => {
    expect((await getChurches()).length).toBeGreaterThan(0);
    expect((await getMinistries()).length).toBeGreaterThan(0);
    expect((await getGalleryAlbums()).length).toBeGreaterThanOrEqual(0);
  });

  test("getPublicationsByType returns only matching type", async () => {
    const devotionals = await getPublicationsByType("devotional");
    expect(devotionals.length).toBeGreaterThan(0);
    expect(devotionals.every((p) => p.type === "devotional")).toBe(true);

    const blogs = await getPublicationsByType("blog");
    expect(blogs.length).toBeGreaterThan(0);
    expect(blogs.every((p) => p.type === "blog")).toBe(true);
  });

  test("getAboutContent returns structured about bundle from fallback", async () => {
    const about = await getAboutContent();
    expect(about.overview.title.length).toBeGreaterThan(0);
    expect(about.whoWeAreIntro.points.length).toBeGreaterThan(0);
    expect(about.historyHighlights.length).toBeGreaterThan(0);
  });
});
