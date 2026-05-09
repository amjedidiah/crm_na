import { CONVENTION_REGISTRATION_URL } from "@/lib/convention-public";
import type {
  Church,
  CoreValue,
  Event,
  Leader,
  MediaItem,
  Ministry,
  Publication,
  SiteContact,
  SocialLink,
  TimelineEntry,
} from "@/lib/types";

export const SITE_NAME = "CRM NA";
export const SITE_TITLE = "CRM NA — Charismatic Renewal Ministries";
export const SITE_DESCRIPTION =
  "Charismatic Renewal Ministries North America gathers churches, families, students, and leaders to preach Jesus boldly, welcome the ministry of the Holy Spirit, and form disciples who can carry revival into everyday life.";

export const SITE_CONTACT: SiteContact = {
  name: "CRM North America National Contact",
  email: "hello@crm-na.org",
  phone: "+1 (203) 987-7729",
  addressLabel: "Serving churches across the United States, Canada, and Mexico",
  note: "Use this national channel for prayer requests, ministry questions, and first-time connections.",
};

export const CONTACT_EMAIL = SITE_CONTACT.email;
export const CONTACT_PHONE = SITE_CONTACT.phone;
export const GIVING_URL = "https://crm-na.org/give/";
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "YouTube",
    href: "https://youtube.com/@crmna",
  },
];

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
      "CRM Word of Life serves families in Northern Virginia through prayer, Bible teaching, and pastoral care rooted in charismatic renewal.",
      "The church gathers worshipers who want strong preaching, spiritual family, and a practical path into service and discipleship.",
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
      "CRM Praise Center was inaugurated in 2005 and has grown into a stable New Haven church family with regional influence.",
      "The branch is known for worship, deliverance prayer, pastoral leadership, and ministry opportunities that keep members engaged through the week.",
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
      "CRM Rhode Island started in 2020 with a strong burden for revival, prayer, and discipleship in the Northeast corridor.",
      "The branch serves believers looking for intimate worship, practical teaching, and a church family that grows people in faith.",
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
      "Grace & Glory Sanctuary is one of the core CRM NA branches in the United States and a key gathering point for regional believers.",
      "The Houston church centers its life around worship, leadership formation, intercession, and faithful pastoral presence.",
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
      "The youth ministry gathers students and young adults for Bible study, peer discipleship, and leadership formation across branches.",
      "Its rhythms are designed to help younger believers grow in Scripture, purity, service, and confidence in the gifts of the Spirit.",
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
      "The Charismatic Women League strengthens women through prayer, mentoring, fellowship, and practical support for every season of life.",
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
      "King's Men calls men into prayer, spiritual maturity, accountability, and courageous leadership at home, in church, and in the marketplace.",
    ],
    leaderIds: [],
    meetingSchedule: ["Quarterly fellowship", "Leadership and accountability gatherings"],
    focusAreas: ["Men", "Leadership", "Discipleship"],
  },
];

export const events: Event[] = [
  {
    slug: "crm-usa-national-convention-2026",
    title: "CRM USA National Convention 2026",
    summary:
      "Five days of renewal, worship, and community in Houston — July 29 through August 2. Theme: Bringing In The Harvest.",
    description: [
      "The CRM National Convention is our annual gathering of believers from across the United States and beyond — coming together for powerful worship, Spirit-led teaching, healing prayer, and the deepening of our charismatic faith.",
      "Whether you are new to the renewal or have walked in it for decades, this is a week set apart to seek a fresh outpouring of the Holy Spirit, encounter God's presence together, and return home renewed and equipped for Kingdom work.",
    ],
    startDate: "2026-07-29",
    endDate: "2026-08-02",
    location:
      "Holiday Inn NW Houston, 3539 N Sam Houston Pkwy West, Houston, TX 77086",
    registrationUrl: CONVENTION_REGISTRATION_URL,
  },
];

export const mediaItems: MediaItem[] = [
  {
    slug: "national-overseer-message-april-2026",
    title: "Standing Firm in the Day of Visitation",
    type: "video",
    summary: "Dr. Peter Ezekwenna exhorts the church to combine spiritual hunger with steady obedience in this season of open doors.",
    url: "https://youtube.com/@crmna",
    speaker: "Dr. Peter Ezekwenna",
    publishedAt: "2026-04-21",
  },
  {
    slug: "weekly-livestream",
    title: "Sunday Worship Broadcast",
    type: "livestream",
    summary: "Join the current broadcast or catch the latest replay from CRM North America worship and teaching gatherings.",
    url: "https://youtube.com/@crmna",
    publishedAt: "2026-05-01",
  },
  {
    slug: "faith-and-revival",
    title: "Faith and Revival",
    type: "sermon",
    summary: "Pastor Marcel Odimgbe preaches on the kind of faith that keeps revival alive in homes, churches, and weary hearts.",
    url: "https://youtube.com/@crmna",
    speaker: "Pastor Marcel Odimgbe",
    publishedAt: "2026-03-18",
  },
];

export const publications: Publication[] = [
  {
    slug: "stewarding-revival-in-a-new-season",
    type: "blog" as const,
    title: "Stewarding Revival in a New Season",
    synopsis:
      "A pastoral reflection on protecting spiritual hunger while building a stronger public witness for CRM North America.",
    content: [
      "Revival is never sustained by momentum alone. It is sustained when a people remain yielded to the Spirit, disciplined in prayer, and accountable to the assignment God has given them.",
      "As CRM North America grows, we must resist the temptation to confuse visibility with fruitfulness. The Lord is calling us to deeper consecration, clearer discipleship, and stronger local churches that can carry revival without losing simplicity.",
      "The work ahead is not only organizational. It is spiritual. We are being asked to build structures that serve the move of God rather than compete with it. That means our media, leadership, and church life must all point back to Christ and to the harvest before us.",
    ],
    publishedAt: "2026-01-15",
    authorName: "Dr. Peter Ezekwenna",
    authorTitle: "National Overseer",
  },
  {
    slug: "building-healthy-altars-at-home",
    type: "devotional" as const,
    title: "Building Healthy Altars at Home",
    synopsis:
      "A Pastor's Corner meditation on how families can cultivate consistent prayer, Scripture, and worship beyond Sunday gatherings.",
    content: [
      "Many believers want strong homes, but strong homes are not built accidentally. They are built when families choose patterns that welcome the presence of God into ordinary days.",
      "An altar at home does not need performance. It needs consistency. A short time of prayer, a shared Scripture reading, and a habit of thanksgiving can begin to reshape the atmosphere of a household over time.",
      "When family altars are healthy, church life becomes stronger. Members arrive already stirred, children grow up hearing the language of faith, and the testimony of Christ becomes visible in daily relationships.",
    ],
    publishedAt: "2026-02-10",
    authorName: "Pastor Chizo Nwaneri",
    authorTitle: "Lead Pastor, CRM Praise Center",
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
  title: "We charismatics still make the devil tremble",
  summary:
    "CRM NA is a Pentecost-friendly family of churches and ministries pressing after Jesus with joy, integrity, and courageous faith in the power of the Holy Spirit.",
  points: [
    "We plant and strengthen local church centers that preach the full gospel, train disciples, and prioritize prayer, worship, and Spirit-led witness.",
    "We resource leaders, youth, women, and men with teaching, media, and relational care that keeps revival accountable to Scripture.",
    "We welcome newcomers, returning believers, and long-time members into a clearer picture of the churches, ministries, gatherings, and pastoral voices shaping CRM in North America.",
  ],
};

export const visionContent = {
  title: "Preparing men for the great harvest",
  body: [
    "CRM North America exists to raise disciples who know Christ, move in the power of the Holy Spirit, and carry the gospel into homes, campuses, cities, and nations.",
    "Our vision is not only to gather meetings, but to prepare men and women whose lives, convictions, and service can help sustain a genuine harvest for the kingdom of God.",
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

export function getPublicationBySlug(slug: string) {
  return publications.find((publication) => publication.slug === slug);
}

export function getLeaderById(id: string) {
  return leaders.find((leader) => leader.id === id);
}

/** Highlighted on the home page “Serve with us” band. */
export const HOMEPAGE_MINISTRY_SLUGS: readonly string[] = [
  "youths",
  "cwl-charismatic-women-league",
  "kings-men",
];

export const HOMEPAGE_LEADER_IDS: readonly string[] = [
  "peter-ezekwenna",
  "marcel-odimgbe",
  "chizo-nwaneri",
];

export function getMinistriesFeaturedOnHome(): Ministry[] {
  const list: Ministry[] = [];
  for (const slug of HOMEPAGE_MINISTRY_SLUGS) {
    const ministry = getMinistryBySlug(slug);
    if (ministry) list.push(ministry);
  }
  return list;
}

export function getLeadersFeaturedOnHome(): Leader[] {
  const list: Leader[] = [];
  for (const id of HOMEPAGE_LEADER_IDS) {
    const leader = getLeaderById(id);
    if (leader) list.push(leader);
  }
  return list;
}
