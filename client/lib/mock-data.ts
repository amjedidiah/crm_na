import type {
  Church,
  CoreValue,
  Event,
  Leader,
  MediaItem,
  Ministry,
  Publication,
  TimelineEntry,
} from "@/lib/types";

export const SITE_NAME = "CRM NA";
export const SITE_TITLE = "CRM NA — Charismatic Renewal Ministries";
export const SITE_DESCRIPTION =
  "A Next.js rebuild scaffold for CRM North America, using the convention microsite design language and a WordPress backend.";

export const CONTACT_EMAIL = "hello@crm-na.org";
export const CONTACT_PHONE = "+1 (800) 123-1234";
export const GIVING_URL = "https://crm-na.org/give/";

export const leaders: Leader[] = [
  {
    id: "peter-ezekwenna",
    name: "Dr. Peter Ezekwenna",
    title: "National Overseer",
    region: "USA",
    bio: "Founding CRM NA leader with oversight responsibility for the North America expression of the ministry.",
  },
  {
    id: "marcel-odimgbe",
    name: "Pastor Marcel Odimgbe",
    title: "Senior Pastor, CRM Word of Life",
    churchSlug: "crm-word-of-life",
    region: "USA",
    bio: "Leads CRM Word of Life in Woodbridge, Virginia and serves in national leadership functions.",
  },
  {
    id: "chizo-nwaneri",
    name: "Pastor Chizo Nwaneri",
    title: "Lead Pastor, CRM Praise Center",
    churchSlug: "crm-praise-center",
    region: "USA",
    bio: "Leads CRM Praise Center and provides regional coordination support for the northeast.",
  },
  {
    id: "chinyere-ezeama",
    name: "Pastor Chinyere Ezeama",
    title: "Campus Elder, CRM Rhode Island",
    churchSlug: "crm-rhode-island",
    region: "USA",
    bio: "Started CRM Rhode Island in 2020 after many years of pastoral service in Nigeria.",
  },
  {
    id: "solomon-inikori",
    name: "Dr. Solomon Inikori",
    title: "Senior Pastor, Grace & Glory Sanctuary",
    churchSlug: "grace-glory-sanctuary",
    region: "USA",
    bio: "Senior pastor of Grace & Glory Sanctuary in Houston, Texas.",
  },
  {
    id: "prudent-okoli",
    name: "Pastor Prudent Okoli",
    title: "Youth Leader, CRM NA",
    ministrySlug: "youths",
    region: "USA",
    bio: "Coordinates the CRM NA youth ministry and virtual Bible study rhythms across regions.",
  },
];

export const churches: Church[] = [
  {
    slug: "crm-word-of-life",
    legacyPath: "/crm-word-of-life/",
    name: "CRM Word of Life",
    region: "USA",
    city: "Woodbridge",
    stateOrProvince: "Virginia",
    country: "United States",
    summary: "A revival church center serving families in Woodbridge, Virginia.",
    story: [
      "CRM Word of Life serves as one of the established CRM NA church centers in the United States.",
      "Its public page centers on pastoral leadership, weekly services, and livestream access.",
    ],
    address: "12827 Chandon Cross Road, Woodbridge, VA 22193",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    livestreamUrl: "https://youtube.com/@crmna",
    pastorId: "marcel-odimgbe",
    serviceTimes: [
      { label: "Sunday Worship", day: "Sunday", time: "10:00 AM" },
      { label: "Digging Deep / Prayer", day: "Thursday", time: "7:00 PM" },
    ],
    programs: [
      { title: "Evangelism", cadence: "Saturday", note: "4:00 PM" },
    ],
  },
  {
    slug: "crm-praise-center",
    legacyPath: "/crm-praise-center/",
    name: "CRM Praise Center",
    region: "USA",
    city: "New Haven",
    stateOrProvince: "Connecticut",
    country: "United States",
    summary: "A CRM NA branch with strong ministry programming and regional leadership presence.",
    story: [
      "Praise Center was inaugurated in 2005 and grew from rented meeting space into a stable local church center.",
      "Its legacy page contains church story, ministry programs, and pastor profile content that should be normalized into structured fields.",
    ],
    address: "16 Norton St, New Haven, CT 06511",
    phone: "+1 203-987-7729",
    email: "crmpraisecenter@gmail.com",
    website: "https://crmpraisecenter.org",
    livestreamUrl: "https://youtube.com/@crmpraisecenter",
    pastorId: "chizo-nwaneri",
    serviceTimes: [
      { label: "Sunday Power Service", day: "Sunday", time: "10:00 AM" },
      { label: "Thursday Miracle & Deliverance", day: "Thursday", time: "7:00 PM" },
    ],
    programs: [
      { title: "Weekly House Fellowships", cadence: "Weekly" },
      { title: "Prayer Squad", cadence: "Saturday Morning" },
    ],
  },
  {
    slug: "crm-rhode-island",
    legacyPath: "/crm-rhode-island/",
    name: "CRM Rhode Island",
    region: "USA",
    city: "Providence",
    stateOrProvince: "Rhode Island",
    country: "United States",
    summary: "A newer CRM NA church center with a strong revival and discipleship emphasis.",
    story: [
      "CRM Rhode Island started in 2020 and should use the same canonical church template as the more mature branches.",
      "The rebuild should remove content inconsistencies inherited from the old page-builder template.",
    ],
    address: "Rhode Island, United States",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    livestreamUrl: "https://youtube.com/@crmna",
    pastorId: "chinyere-ezeama",
    serviceTimes: [{ label: "Sunday Fellowship", day: "Sunday", time: "10:00 AM" }],
    programs: [{ title: "Counseling and Prayer", cadence: "By appointment" }],
  },
  {
    slug: "grace-glory-sanctuary",
    legacyPath: "/grace-glory-sanctuary/",
    name: "Grace & Glory Sanctuary",
    region: "USA",
    city: "Houston",
    stateOrProvince: "Texas",
    country: "United States",
    summary: "A Houston-based church center with resident and senior leadership functions.",
    story: [
      "Grace & Glory Sanctuary is one of the core United States branches in the current CRM NA network.",
      "Its existing page is rich enough to migrate into structured church, leader, and program content.",
    ],
    address: "Houston, TX, United States",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    livestreamUrl: "https://youtube.com/@crmna",
    pastorId: "solomon-inikori",
    serviceTimes: [{ label: "Sunday Worship", day: "Sunday", time: "10:00 AM" }],
    programs: [{ title: "Prayer and Teaching", cadence: "Weekly" }],
  },
];

export const ministries: Ministry[] = [
  {
    slug: "youths",
    name: "Youths",
    summary: "CRM NA youth ministry with weekly virtual Bible study and leadership development.",
    description: [
      "The CRM NA youth ministry is one of the most developed ministry pages on the legacy site.",
      "It already includes leadership, support team, and recurring study schedules that can be normalized into reusable fields.",
    ],
    leaderIds: ["prudent-okoli"],
    meetingSchedule: [
      "Senior Youths Bible Study — Thursdays, 9:00 PM EST",
      "Junior Youths Bible Study — Wednesdays, 7:00 PM EST",
      "Connecticut Youths Bible Study — Fridays, 8:00 PM EST",
    ],
    focusAreas: ["Discipleship", "Bible study", "Peer leadership"],
  },
  {
    slug: "cwl-charismatic-women-league",
    legacyPath: "/cwl-charismatic-women-league/",
    name: "CWL (Charismatic Women League)",
    summary: "Women-focused discipleship and fellowship ministry.",
    description: [
      "The legacy page is empty, so the initial scaffold should establish structure rather than depend on migrated content.",
    ],
    leaderIds: [],
    meetingSchedule: ["Quarterly fellowship", "Prayer and support gatherings"],
    focusAreas: ["Women", "Prayer", "Mentorship"],
  },
  {
    slug: "kings-men",
    legacyPath: "/kings-men/",
    name: "King’s Men",
    summary: "Men’s ministry focused on spiritual maturity, leadership, and family life.",
    description: [
      "The legacy page is empty, so the rebuild should create a proper ministry detail template ready for future content.",
    ],
    leaderIds: [],
    meetingSchedule: ["Quarterly fellowship", "Leadership and accountability gatherings"],
    focusAreas: ["Men", "Leadership", "Discipleship"],
  },
];

export const events: Event[] = [
  {
    slug: "national-prayer-conference",
    title: "National Prayer Conference",
    summary: "A network-wide prayer and teaching gathering for CRM NA leaders and members.",
    description: [
      "This is mock content used to scaffold the events archive and event detail route.",
      "Real event data should be sourced from WordPress through WPGraphQL once the backend is ready.",
    ],
    startDate: "2026-08-14",
    endDate: "2026-08-16",
    location: "Houston, Texas",
    churchSlug: "grace-glory-sanctuary",
    registrationUrl: "https://crm-na.org/events/",
  },
  {
    slug: "youth-revival-night",
    title: "Youth Revival Night",
    summary: "A youth-focused night of worship, Bible teaching, and intercession.",
    description: [
      "Connected to the CRM NA youth ministry and designed to exercise the ministry/event relationship.",
    ],
    startDate: "2026-06-20",
    location: "Online",
    ministrySlug: "youths",
    livestreamUrl: "https://youtube.com/@crmna",
  },
  {
    slug: "leaders-roundtable",
    title: "Leaders Roundtable",
    summary: "A strategy and pastoral care session for regional and branch leaders.",
    description: [
      "Used to scaffold the leadership and events relationship in the frontend.",
    ],
    startDate: "2026-05-24",
    location: "New Haven, Connecticut",
    churchSlug: "crm-praise-center",
  },
];

export const mediaItems: MediaItem[] = [
  {
    slug: "national-overseer-message-april-2026",
    title: "National Overseer Message",
    type: "video",
    summary: "A sample teaching video entry for the media hub scaffold.",
    url: "https://youtube.com/@crmna",
    speaker: "Dr. Peter Ezekwenna",
    publishedAt: "2026-04-21",
  },
  {
    slug: "weekly-livestream",
    title: "Weekly Livestream Replay",
    type: "livestream",
    summary: "Replay entry for the watch live and media sections.",
    url: "https://youtube.com/@crmna",
    publishedAt: "2026-05-01",
  },
  {
    slug: "faith-and-revival",
    title: "Faith and Revival",
    type: "sermon",
    summary: "Sample sermon entry replacing the stale placeholder content on the legacy site.",
    url: "https://youtube.com/@crmna",
    speaker: "Pastor Marcel Odimgbe",
    publishedAt: "2026-03-18",
  },
];

export const publications: Publication[] = [
  {
    slug: "crm-na-vision-guide",
    title: "CRM NA Vision Guide",
    summary: "Starter publication entry for the publications route scaffold.",
    url: "https://crm-na.org/publications/",
    publishedAt: "2026-01-15",
  },
  {
    slug: "leadership-prayer-notes",
    title: "Leadership Prayer Notes",
    summary: "Example downloadable publication record for WordPress modeling.",
    url: "https://crm-na.org/publications/",
    publishedAt: "2026-02-10",
  },
];

export const coreValues: CoreValue[] = [
  {
    title: "Faithfulness",
    scripture: "1 Corinthians 4:2",
    description: "We prioritize obedience, consistency, and integrity in ministry stewardship.",
  },
  {
    title: "Revival",
    scripture: "Habakkuk 3:2",
    description: "We exist to carry spiritual renewal into churches, homes, and communities.",
  },
  {
    title: "Love",
    scripture: "John 13:35",
    description: "Love is a non-negotiable marker of our life together and our witness.",
  },
  {
    title: "Service",
    scripture: "Mark 10:45",
    description: "We develop believers to serve with humility, courage, and spiritual maturity.",
  },
];

export const historyTimeline: TimelineEntry[] = [
  {
    year: "1980",
    title: "CRM Prophetic Beginning",
    description: "The ministry traces its origin to the prophetic birthing of CRM at the University of Ife.",
  },
  {
    year: "1985",
    title: "North America Prophecy",
    description: "A CRM prayer camp prophecy described members being sent out as arrows of revival beyond Nigeria.",
  },
  {
    year: "1997",
    title: "First Missions Conference",
    description: "Brethren in the United States and United Kingdom gathered for the first missions conference in Missouri.",
  },
  {
    year: "2002",
    title: "First Formal CRM NA Church Center",
    description: "The 2002 national conference birthed the first formal CRM NA church center in Maryland.",
  },
];

export const whoWeAreIntro = {
  title: "We Charismatics Make The Devil Cry",
  summary:
    "CRM NA is a revival movement with a church network, ministries, and media presence across North America.",
  points: [
    "We are rebuilding the public site around real CRM NA content rather than page-builder fragments.",
    "The new frontend will be shaped by the convention microsite's visual language and a cleaner content model.",
  ],
};

export const visionContent = {
  title: "Preparing men for the great harvest",
  body: [
    "The legacy vision page mixes CRM-wide history, Catholic charismatic context, and the original prophetic mandate.",
    "The rebuilt page should preserve that history but present it with clearer editorial structure and readable sections.",
  ],
};

export function getChurchBySlug(slug: string) {
  return churches.find((church) => church.slug === slug);
}

export function getMinistryBySlug(slug: string) {
  return ministries.find((ministry) => ministry.slug === slug);
}

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getLeaderById(id: string) {
  return leaders.find((leader) => leader.id === id);
}
