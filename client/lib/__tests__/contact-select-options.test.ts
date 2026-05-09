import { describe, expect, test } from "bun:test";
import {
  buildChurchContactSelectOptions,
  buildEventContactSelectOptions,
  buildMinistryContactSelectOptions,
  labelForContactSelectValue,
} from "@/lib/contact-select-options";
import { churches, events, ministries } from "@/lib/mock-data";

describe("contact select options", () => {
  test("church options include empty row then sorted churches", () => {
    const opts = buildChurchContactSelectOptions(churches);
    expect(opts[0]?.value).toBe("");
    expect(opts.length).toBeGreaterThan(1);
    expect(labelForContactSelectValue(opts, "crm-ottawa")).toBeDefined();
  });

  test("ministry options include empty row", () => {
    const opts = buildMinistryContactSelectOptions(ministries);
    expect(opts[0]?.value).toBe("");
    expect(labelForContactSelectValue(opts, "youths")).toBeDefined();
  });

  test("event options include empty row", () => {
    const opts = buildEventContactSelectOptions(events);
    expect(opts[0]?.value).toBe("");
    expect(
      labelForContactSelectValue(opts, "crm-usa-national-convention-2026"),
    ).toBeDefined();
  });
});
