import { describe, expect, test } from "bun:test";
import { getMockAboutContent } from "@/lib/wordpress/fallback";
import {
  htmlToParagraphs,
  mapAboutPageFields,
  mapChurch,
  mapEvent,
  mapLeader,
  mapMediaItemToGalleryAlbum,
  mapMinistry,
} from "@/lib/wordpress/mappers";
import type {
  WPChurchNode,
  WPEventNode,
  WPLeaderNode,
  WPMediaItemNode,
  WPMinistryNode,
} from "@/lib/wordpress/wp-types";

describe("htmlToParagraphs", () => {
  test("splits HTML content into paragraphs", () => {
    expect(
      htmlToParagraphs("<p>First paragraph.</p><p>Second paragraph.</p>"),
    ).toEqual(["First paragraph.", "Second paragraph."]);
  });
});

describe("mapLeader", () => {
  test("maps slug to id and photo fields", () => {
    const leader = mapLeader({
      slug: "peter-ezekwenna",
      title: "Dr. Peter Ezekwenna",
      leaderDetails: {
        title: "National Overseer",
        bio: "Overseer bio",
        photo: {
          node: {
            sourceUrl: "https://example.com/peter.jpg",
            altText: "Peter",
          },
        },
        region: "USA",
        church: { nodes: [{ slug: "crm-word-of-life" }] },
        ministry: null,
      },
    } satisfies WPLeaderNode);

    expect(leader.id).toBe("peter-ezekwenna");
    expect(leader.imageSrc).toBe("https://example.com/peter.jpg");
    expect(leader.churchSlug).toBe("crm-word-of-life");
  });
});

describe("mapChurch", () => {
  test("maps church details and leader relationships", () => {
    const church = mapChurch({
      slug: "crm-word-of-life",
      title: "CRM Word of Life",
      content: "<p>Story paragraph.</p>",
      churchDetails: {
        mode: "internal-page",
        directoryOrder: 1,
        region: "USA",
        city: "Woodbridge",
        stateOrProvince: "Virginia",
        country: "United States",
        summary: "Summary text",
        storyParagraphs: [{ paragraph: "Repeater story." }],
        address: "12827 Chandon Cross Road",
        phone: "+1 571-991-9555",
        email: "wolf@example.com",
        livestreamUrl: "https://example.com/live",
        primaryLeader: { nodes: [{ slug: "marcel-odimgbe" }] },
        secondaryLeaders: { nodes: [{ slug: "francisca-odimgbe" }] },
        serviceTimes: [{ label: "Sunday", day: "Sunday", time: "10:00 AM" }],
        programs: [{ title: "Evangelism", cadence: "Saturday" }],
      },
    } satisfies WPChurchNode);

    expect(church.slug).toBe("crm-word-of-life");
    expect(church.pastorId).toBe("marcel-odimgbe");
    expect(church.leaderIds).toEqual(["francisca-odimgbe"]);
    expect(church.story).toEqual(["Repeater story."]);
  });
});

describe("mapMinistry", () => {
  test("strips HTML from excerpt summaries", () => {
    const ministry = mapMinistry({
      slug: "youths",
      title: "Youth Ministry",
      content: "<p>Full description.</p>",
      excerpt: "<p>Short <strong>summary</strong>.</p>",
      ministryDetails: {
        leaders: null,
        meetingSchedule: null,
        focusAreas: null,
        photoGallery: null,
      },
    } satisfies WPMinistryNode);

    expect(ministry.summary).toBe("Short summary.");
  });

  test("maps ministry leaders and gallery images", () => {
    const ministry = mapMinistry({
      slug: "youths",
      title: "CRM NA Youth Ministry",
      content: "<p>Description paragraph.</p>",
      excerpt: "Youth summary",
      ministryDetails: {
        email: "youth@example.com",
        leaders: { nodes: [{ slug: "prudent-okoli" }] },
        meetingSchedule: [{ line: "Thursdays 9 PM EST" }],
        focusAreas: [{ area: "Discipleship" }],
        photoGallery: {
          nodes: [{ sourceUrl: "https://example.com/youth.jpg", altText: "Youth" }],
        },
      },
    } satisfies WPMinistryNode);

    expect(ministry.leaderIds).toEqual(["prudent-okoli"]);
    expect(ministry.galleryImages?.[0]?.src).toBe("https://example.com/youth.jpg");
  });
});

describe("mapEvent", () => {
  test("maps event relationships and dates", () => {
    const event = mapEvent({
      slug: "crm-usa-national-convention-2026",
      title: "CRM USA National Convention 2026",
      content: "<p>Event details.</p>",
      eventDetails: {
        mode: "internal-page",
        startDate: "2026-07-29",
        endDate: "2026-08-02",
        location: "Houston, TX",
        email: "events@example.com",
        church: { nodes: [{ slug: "grace-glory-sanctuary" }] },
        ministry: null,
        registrationUrl: "https://example.com/register",
      },
    } satisfies WPEventNode);

    expect(event.churchSlug).toBe("grace-glory-sanctuary");
    expect(event.startDate).toBe("2026-07-29");
  });
});

describe("mapMediaItemToGalleryAlbum", () => {
  test("maps media_item CPT to gallery album", () => {
    const album = mapMediaItemToGalleryAlbum({
      slug: "prayer-retreat-weekend",
      title: "Prayer Retreat Weekend",
      mediaItemDetails: {
        albumDate: "2026-03-07",
        category: "general",
        coverImage: {
          node: {
            sourceUrl: "https://example.com/cover.jpg",
            altText: "Retreat cover",
          },
        },
        galleryImages: {
          nodes: [
            { sourceUrl: "https://example.com/one.jpg", altText: "One" },
            { sourceUrl: "https://example.com/two.jpg", altText: "Two" },
          ],
        },
      },
    } satisfies WPMediaItemNode);

    expect(album?.slug).toBe("prayer-retreat-weekend");
    expect(album?.category).toBe("general");
    expect(album?.images).toHaveLength(2);
  });
});

describe("mapAboutPageFields", () => {
  test("falls back when CMS fields are empty", () => {
    const fallback = getMockAboutContent();
    expect(mapAboutPageFields(null, fallback)).toEqual(fallback);
  });

  test("overrides fallback with CMS values when present", () => {
    const fallback = getMockAboutContent();
    const mapped = mapAboutPageFields(
      {
        overviewTitle: "CMS Overview Title",
        whoWeAreTitle: "CMS Welcome Title",
      },
      fallback,
    );
    expect(mapped.overview.title).toBe("CMS Overview Title");
    expect(mapped.whoWeAreIntro.title).toBe("CMS Welcome Title");
    expect(mapped.vision.title).toBe(fallback.vision.title);
  });
});
