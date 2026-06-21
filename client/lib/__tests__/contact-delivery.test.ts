import { describe, expect, test } from "bun:test";
import { mockContactListings } from "@/lib/__tests__/contact-test-fixtures";
import {
  resolveContactEmailRecipients,
  slugsForContactEmail,
} from "@/lib/contact-delivery";
import type { ContactFormPurpose } from "@/lib/types";

const EMPTY_CONTACT_SLUGS = {
  churchSlug: undefined,
  ministrySlug: undefined,
  eventSlug: undefined,
};

const NATIONAL_INBOX = "info@crm-na.org";

type ContactSlugInputs = {
  church?: string;
  ministry?: string;
  event?: string;
};

function expectContactSlugs(
  purpose: ContactFormPurpose,
  inputs: ContactSlugInputs,
  expected: {
    churchSlug?: string;
    ministrySlug?: string;
    eventSlug?: string;
  },
) {
  expect(
    slugsForContactEmail(
      purpose,
      inputs.church,
      inputs.ministry,
      inputs.event,
    ),
  ).toEqual(expected);
}

function expectContactRecipients(
  purpose: ContactFormPurpose,
  inputs: ContactSlugInputs,
  expected: { to: string; cc?: string[] },
  nationalRecipient?: string,
) {
  expect(
    resolveContactEmailRecipients(
      purpose,
      inputs.church,
      inputs.ministry,
      inputs.event,
      mockContactListings,
      nationalRecipient,
    ),
  ).toEqual(expected);
}

describe("slugsForContactEmail", () => {
  test("keeps church slug only for churches purpose", () => {
    const inputs = { church: "crm-ottawa" };
    expectContactSlugs("churches", inputs, {
      ...EMPTY_CONTACT_SLUGS,
      churchSlug: "crm-ottawa",
    });
    expectContactSlugs("general", inputs, EMPTY_CONTACT_SLUGS);
  });

  test("keeps ministry slug only for ministries purpose", () => {
    const inputs = { ministry: "youths" };
    expectContactSlugs("ministries", inputs, {
      ...EMPTY_CONTACT_SLUGS,
      ministrySlug: "youths",
    });
    expectContactSlugs("events", inputs, EMPTY_CONTACT_SLUGS);
  });

  test("strips all listing slugs for plan-visit and prayer-request", () => {
    const inputs = {
      church: "crm-ottawa",
      ministry: "youths",
      event: "crm-usa-national-convention-2026",
    };

    for (const purpose of ["plan-visit", "prayer-request"] as const) {
      expectContactSlugs(purpose, inputs, EMPTY_CONTACT_SLUGS);
    }
  });

  test("keeps event slug only for events purpose", () => {
    const inputs = { event: "crm-usa-national-convention-2026" };
    expectContactSlugs("events", inputs, {
      ...EMPTY_CONTACT_SLUGS,
      eventSlug: "crm-usa-national-convention-2026",
    });
    expectContactSlugs("general", inputs, EMPTY_CONTACT_SLUGS);
  });
});

describe("resolveContactEmailRecipients", () => {
  test("keeps the national inbox as primary and cc's a church-specific address", () => {
    expectContactRecipients(
      "churches",
      { church: "crm-praise-center" },
      { to: NATIONAL_INBOX, cc: ["crmpraisecenter@gmail.com"] },
    );
  });

  test("does not cc a church when it already uses the national inbox", () => {
    expectContactRecipients(
      "churches",
      { church: "crm-ottawa" },
      { to: NATIONAL_INBOX },
    );
  });

  test("does not cc a missing ministry or event contact email", () => {
    expectContactRecipients(
      "ministries",
      { ministry: "youths" },
      { to: NATIONAL_INBOX },
    );
    expectContactRecipients(
      "events",
      { event: "crm-usa-national-convention-2026" },
      { to: NATIONAL_INBOX },
    );
  });

  test("does not duplicate the local recipient when the national inbox is overridden", () => {
    expectContactRecipients(
      "churches",
      { church: "crm-rhode-island" },
      { to: "ops@crm-na.org" },
      "ops@crm-na.org",
    );
  });
});
