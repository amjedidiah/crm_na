import type { Devotional } from "@/lib/types";
import mayRemainder from "@/lib/devotionals-may-2026-remainder.json";

const devotionals: Devotional[] = [
  {
    date: "2026-05-08",
    dayLabel: "Friday, May 8, 2026",
    title: "Strength for the Work Before You",
    scriptureRef: "Isaiah 40:31",
    scriptureText:
      "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.",
    message: [
      "The work of God is rarely sustained by excitement alone. The Lord strengthens people who learn to wait on Him, listen carefully, and move in step with His grace.",
      "Some believers are tired not because they lack calling, but because they have been carrying assignments without returning often enough to the presence of God. Heaven does not only send instruction; it also sends strength.",
      "As CRM North America serves across cities, churches, ministries, and families, we must keep drawing fresh strength from the Lord. Waiting on Him is not delay. It is preparation for durable obedience.",
    ],
    memoryVerse:
      "They that wait upon the LORD shall renew their strength. Isaiah 40:31",
    actionPoint:
      "Set aside deliberate quiet time today to pray before you plan, respond, or move into your next responsibility.",
    prayerPoints: [
      "Ask the Lord to renew your spiritual strength.",
      "Pray for endurance for pastors, workers, and families across CRM NA.",
      "Ask God to teach you how to wait on Him without frustration.",
    ],
    bibleReading: "Isaiah 40-42",
  },
  {
    date: "2026-05-09",
    dayLabel: "Saturday, May 9, 2026",
    title: "Guard the Fire on the Altar",
    scriptureRef: "Leviticus 6:13",
    scriptureText: "The fire shall ever be burning upon the altar; it shall never go out.",
    message: [
      "God does not call His people to momentary flashes of zeal. He calls us to a sustained altar life where prayer, worship, and devotion remain active even when public momentum slows down.",
      "A burning altar is protected through simple faithfulness: prayer when no one is watching, Scripture when the heart feels dry, thanksgiving when the day is ordinary, and obedience when the cost is real.",
      "If the altar stays alive, ministry can remain pure. Churches, leaders, and families across CRM North America will be strongest when private fire continues to feed public witness.",
    ],
    memoryVerse:
      "The fire shall ever be burning upon the altar; it shall never go out. Leviticus 6:13",
    actionPoint:
      "Identify one habit that keeps your spiritual altar burning and strengthen it intentionally today.",
    prayerPoints: [
      "Pray for a deeper hunger for prayer and worship.",
      "Ask God to preserve holy fire in every CRM NA church and ministry.",
      "Pray against distraction, coldness, and spiritual drift.",
    ],
    bibleReading: "Leviticus 6-7",
  },
  {
    date: "2026-05-10",
    dayLabel: "Sunday, May 10, 2026",
    title: "Grace for the Gathering",
    scriptureRef: "Psalm 122:1",
    scriptureText:
      "I was glad when they said unto me, Let us go into the house of the LORD.",
    message: [
      "There is grace attached to gathering with the people of God. Corporate worship reorders the heart, lifts heavy spirits, and places believers again under the sound of truth.",
      "Joy in God's house is not produced only by music or routine. It grows when believers come expecting the Lord to speak, heal, correct, and strengthen them together.",
      "Every church gathering in CRM North America should be approached with expectation. God meets individuals, but He also does strategic work when His people gather in unity.",
    ],
    memoryVerse:
      "I was glad when they said unto me, Let us go into the house of the LORD. Psalm 122:1",
    actionPoint:
      "Approach the next worship gathering with deliberate expectation and pray for someone else before the service begins.",
    prayerPoints: [
      "Pray that church gatherings will carry fresh joy and spiritual weight.",
      "Ask God to visit worshipers, first-time guests, and workers.",
      "Pray for unity and sensitivity to the Holy Spirit in every assembly.",
    ],
    bibleReading: "Psalms 120-124",
  },
  ...(mayRemainder as Devotional[]),
];

export function getDevotionalByDate(date: string): Devotional | null {
  return devotionals.find((devotional) => devotional.date === date) ?? null;
}

export function getTodaysDevotional(): Devotional | null {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return getDevotionalByDate(today);
}

export function getAllDevotionals(): Devotional[] {
  return devotionals;
}
