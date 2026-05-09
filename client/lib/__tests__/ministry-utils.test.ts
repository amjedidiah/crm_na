import { describe, expect, test } from "bun:test";
import type { Ministry } from "@/lib/types";
import { getSiblingMinistries } from "@/lib/ministry-utils";

const base = {
  summary: "S",
  description: [] as string[],
  leaderIds: [] as string[],
  meetingSchedule: [] as string[],
  focusAreas: [] as string[],
};

describe("ministry utils", () => {
  test("getSiblingMinistries excludes current and sorts by name", () => {
    const list: Ministry[] = [
      { ...base, slug: "zebra", name: "Zebra Ministry" },
      { ...base, slug: "alpha", name: "Alpha Ministry" },
      { ...base, slug: "mid", name: "Mid Ministry" },
    ];
    const siblings = getSiblingMinistries("mid", list);
    expect(siblings.map((m) => m.slug)).toEqual(["alpha", "zebra"]);
  });

  test("getSiblingMinistries returns empty when only one ministry", () => {
    const list: Ministry[] = [{ ...base, slug: "only", name: "Only" }];
    expect(getSiblingMinistries("only", list)).toEqual([]);
  });
});
