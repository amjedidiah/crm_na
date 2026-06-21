import { describe, expect, test } from "bun:test";
import { resolveRevalidationTags } from "@/lib/revalidation-tags";

describe("resolveRevalidationTags", () => {
  test("revalidates all tags when post type is unknown", () => {
    expect(resolveRevalidationTags("unknown-type")).toEqual([
      "churches",
      "leaders",
      "ministries",
      "events",
      "gallery",
      "about",
    ]);
  });

  test("maps church post type to churches collection tag", () => {
    expect(resolveRevalidationTags("church")).toEqual(["churches"]);
  });

  test("maps leader post type to related collection tags", () => {
    expect(resolveRevalidationTags("leader")).toEqual([
      "leaders",
      "churches",
      "ministries",
      "about",
    ]);
  });

  test("includes item tag when slug is provided", () => {
    expect(resolveRevalidationTags("event", "crm-usa-national-convention-2026")).toEqual(
      ["events", "event-crm-usa-national-convention-2026"],
    );
  });

  test("maps media_item to gallery tags", () => {
    expect(resolveRevalidationTags("media_item", "retreat-photos")).toEqual([
      "gallery",
      "gallery-retreat-photos",
    ]);
  });
});
