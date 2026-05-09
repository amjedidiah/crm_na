import { CONVENTION_REGISTRATION_URL } from "@/lib/convention-public";
import type {
  Church,
  CoreValue,
  Event,
  GalleryAlbum,
  GalleryCategory,
  Leader,
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
  email: "info@crm-na.org",
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

const LEADER_PLACEHOLDER_IMAGE = "https://i.ibb.co/DP3Wjy63/avatar.png";

export const leaders: Leader[] = [
  {
    id: "peter-ezekwenna",
    name: "Dr. Peter Ezekwenna",
    title: "National Overseer, CRM North America",
    region: "USA",
    imageSrc:
      "https://i0.wp.com/crm-na.org/wp-content/uploads/2016/05/PETER-EZ.jpg",
    imageAlt: "Portrait placeholder for Dr. Peter Ezekwenna",
    bio: "Current National Overseer for CRM North America, founding CRM leader, and member of the founding General Core Group.",
  },
  {
    id: "marcel-odimgbe",
    name: "Pastor Marcel Odimgbe",
    title: "Senior Pastor, CRM Word of Life",
    churchSlug: "crm-word-of-life",
    region: "USA",
    imageSrc: LEADER_PLACEHOLDER_IMAGE,
    imageAlt: "Portrait placeholder for Pastor Marcel Odimgbe",
    bio: "Senior Pastor of Charismatic Renewal Ministries Word of Life Fellowship in Woodbridge, Virginia, serving alongside a strong family and pastoral ministry presence.",
  },
  {
    id: "francisca-odimgbe",
    name: "Pastor Francisca Odimgbe",
    title: "Pastoral Leader, CRM Word of Life",
    churchSlug: "crm-word-of-life",
    region: "USA",
    imageSrc: LEADER_PLACEHOLDER_IMAGE,
    imageAlt: "Portrait placeholder for Pastor Francisca Odimgbe",
    bio: "Serves within the pastoral leadership of CRM Word of Life and reflects the couple-led ministry presence highlighted in CRM NA public materials.",
  },
  {
    id: "chizo-nwaneri",
    name: "Pastor Chizo Nwaneri",
    title: "Lead Pastor, CRM Praise Center",
    churchSlug: "crm-praise-center",
    region: "USA",
    imageSrc: "https://i.ibb.co/Kzhmd5vh/7D6A1016.jpg",
    imageAlt: "Portrait placeholder for Pastor Chizo Nwaneri",
    bio: "Lead Pastor of CRM Praise Center and a regional coordinator focused on cohesion, support, and brotherhood across CRM branches.",
  },
  {
    id: "chinyere-ezeama",
    name: "Pastor Chinyere Ezeama",
    title: "Campus Elder, CRM Rhode Island",
    churchSlug: "crm-rhode-island",
    region: "USA",
    imageSrc:
      "https://i0.wp.com/crm-na.org/wp-content/uploads/2016/05/Pastor-Chinyere-e1655006200738.jpg",
    imageAlt: "Portrait placeholder for Pastor Chinyere Ezeama",
    bio: "Pastored CRM Umuzike in Orlu, Imo State, Nigeria from 2003 to 2019 and helped start CRM Rhode Island in April 2020.",
  },
  {
    id: "mike-ekwem",
    name: "Pastor Mike Ekwem",
    title: "Resident Pastor, Grace & Glory Sanctuary",
    churchSlug: "grace-glory-sanctuary",
    region: "USA",
    imageSrc:
      "https://i0.wp.com/crm-na.org/wp-content/uploads/2022/06/Pastor-Mike-Ekwem-GGS-Houston-scaled-e1655006432178.jpg",
    imageAlt: "Portrait placeholder for Pastor Mike Ekwem",
    bio: "Resident Pastor and administrator of Grace & Glory Sanctuary in Houston, Texas, and instrumental to its start-up.",
  },
  {
    id: "solomon-inikori",
    name: "Dr. Solomon Inikori",
    title: "Campus Elder, Grace & Glory Sanctuary",
    churchSlug: "grace-glory-sanctuary",
    region: "USA",
    imageSrc:
      "https://i0.wp.com/crm-na.org/wp-content/uploads/2022/04/Dr.-Solomon-O.-Inikori-Snr-Pastor-GGS-Houston-min.jpg",
    imageAlt: "Portrait placeholder for Dr. Solomon Inikori",
    bio: "Campus Elder of Grace & Glory Sanctuary in Houston, Texas, with long-standing service in CRM NA leadership.",
  },
  {
    id: "prudent-okoli",
    name: "Pastor Prudent Okoli",
    title: "Youth Leader, CRM NA",
    ministrySlug: "youths",
    region: "USA",
    imageSrc:
      "https://i0.wp.com/crm-na.org/wp-content/uploads/2016/05/Prudential-Okoli-1.jpg",
    imageAlt: "Portrait placeholder for Pastor Prudent Okoli",
    bio: "Coordinates CRM NA youth ministry and helped establish the North America youth forum across branches.",
  },
  {
    id: "joe-atodo",
    name: "Joe Atodo",
    title: "Lead Pastor, CRM Ottawa",
    region: "Canada",
    imageSrc: LEADER_PLACEHOLDER_IMAGE,
    imageAlt: "Portrait placeholder for Joe Atodo",
    bio: "Provides local pastoral leadership for CRM Ottawa within the Canadian expression of the ministry.",
  },
  {
    id: "pastor-tony",
    name: "Pastor Tony",
    title: "Lead Pastor, CRM Alberta",
    region: "Canada",
    imageSrc: LEADER_PLACEHOLDER_IMAGE,
    imageAlt: "Portrait placeholder for Pastor Tony",
    bio: "Serves as lead pastor in Alberta and represents CRM NA leadership within western Canada.",
  },
  {
    id: "pastor-matthew",
    name: "Pastor Matthew",
    title: "Pastor, CRM North Bay",
    region: "Canada",
    imageSrc: LEADER_PLACEHOLDER_IMAGE,
    imageAlt: "Portrait placeholder for Pastor Matthew",
    bio: "Pastors the North Bay fellowship and contributes to the ministry's pastoral presence in Canada.",
  },
  {
    id: "ignatius-nwafor",
    name: "Ignatius Nwafor",
    title: "CRM Canada National Overseer",
    region: "Canada",
    imageSrc: LEADER_PLACEHOLDER_IMAGE,
    imageAlt: "Portrait placeholder for Ignatius Nwafor",
    bio: "Provides national oversight for CRM Canada within the wider North American ministry family.",
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
    summary:
      "A revival church center serving families in Woodbridge, Virginia.",
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
    programs: [{ title: "Evangelism", cadence: "Saturday", note: "4:00 PM" }],
  },
  {
    slug: "crm-praise-center",
    legacyPath: "/crm-praise-center/",
    name: "CRM Praise Center",
    region: "USA",
    city: "New Haven",
    stateOrProvince: "Connecticut",
    country: "United States",
    summary:
      "A CRM NA branch with strong ministry programming and regional leadership presence.",
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
      {
        label: "Thursday Miracle & Deliverance",
        day: "Thursday",
        time: "7:00 PM",
      },
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
    summary:
      "A newer CRM NA church center with a strong revival and discipleship emphasis.",
    story: [
      "CRM Rhode Island started in 2020 with a strong burden for revival, prayer, and discipleship in the Northeast corridor.",
      "The branch serves believers looking for intimate worship, practical teaching, and a church family that grows people in faith.",
    ],
    address: "Rhode Island, United States",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    livestreamUrl: "https://youtube.com/@crmna",
    pastorId: "chinyere-ezeama",
    serviceTimes: [
      { label: "Sunday Fellowship", day: "Sunday", time: "10:00 AM" },
    ],
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
    summary:
      "A Houston-based church center with resident and senior leadership functions.",
    story: [
      "Grace & Glory Sanctuary is one of the core CRM NA branches in the United States and a key gathering point for regional believers.",
      "The Houston church centers its life around worship, leadership formation, intercession, and faithful pastoral presence.",
    ],
    address: "Houston, TX, United States",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    livestreamUrl: "https://youtube.com/@crmna",
    pastorId: "solomon-inikori",
    serviceTimes: [
      { label: "Sunday Worship", day: "Sunday", time: "10:00 AM" },
    ],
    programs: [{ title: "Prayer and Teaching", cadence: "Weekly" }],
  },
];

export const ministries: Ministry[] = [
  {
    slug: "youths",
    name: "Youths",
    summary:
      "CRM NA youth ministry with weekly virtual Bible study and leadership development.",
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
    imageSrc: "https://placehold.co/1200x800/23395B/F7F2E8?text=CRM+NA+Youths",
    galleryImages: [
      {
        src: "https://placehold.co/1200x800/23395B/F7F2E8?text=Youth+Prayer+Night",
        alt: "CRM NA youths gathering for prayer night",
        caption: "Prayer night and peer discipleship",
      },
      {
        src: "https://placehold.co/1200x800/406E8E/F7F2E8?text=Bible+Study",
        alt: "Youth Bible study discussion group",
        caption: "Weekly Bible study rhythms",
      },
      {
        src: "https://placehold.co/1200x800/8EA8C3/1B1B1B?text=Youth+Leadership",
        alt: "Young leaders serving during a CRM NA gathering",
        caption: "Leadership formation across branches",
      },
    ],
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
    imageSrc: "https://placehold.co/1200x800/8C3B3B/F7F2E8?text=CWL+Gathering",
    galleryImages: [
      {
        src: "https://placehold.co/1200x800/8C3B3B/F7F2E8?text=CWL+Prayer",
        alt: "Women praying together during a CWL gathering",
        caption: "Prayer and support gatherings",
      },
      {
        src: "https://placehold.co/1200x800/B85C38/F7F2E8?text=Women's+Fellowship",
        alt: "CWL fellowship table and conversation",
        caption: "Encouragement across every season of life",
      },
      {
        src: "https://placehold.co/1200x800/D9A441/1B1B1B?text=Mentoring+Circle",
        alt: "Women gathered in a mentoring circle",
        caption: "Mentoring and discipleship",
      },
    ],
  },
  {
    slug: "kings-men",
    legacyPath: "/kings-men/",
    name: "King’s Men",
    summary:
      "Men’s ministry focused on spiritual maturity, leadership, and family life.",
    description: [
      "King's Men calls men into prayer, spiritual maturity, accountability, and courageous leadership at home, in church, and in the marketplace.",
    ],
    leaderIds: [],
    meetingSchedule: [
      "Quarterly fellowship",
      "Leadership and accountability gatherings",
    ],
    focusAreas: ["Men", "Leadership", "Discipleship"],
    imageSrc: "https://placehold.co/1200x800/2F5233/F7F2E8?text=King's+Men",
    galleryImages: [
      {
        src: "https://placehold.co/1200x800/2F5233/F7F2E8?text=Men's+Prayer",
        alt: "Men praying together in a CRM NA meeting",
        caption: "Prayer and accountability",
      },
      {
        src: "https://placehold.co/1200x800/5C7A29/F7F2E8?text=Leadership+Talk",
        alt: "Men listening during a leadership teaching session",
        caption: "Leadership and family life conversations",
      },
      {
        src: "https://placehold.co/1200x800/A1C181/1B1B1B?text=Fellowship",
        alt: "Men in fellowship after a ministry gathering",
        caption: "Brotherhood and follow-through",
      },
    ],
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
    imageSrc:
      "https://placehold.co/1600x900/6A1B2D/F7F2E8?text=Convention+2026",
    galleryImages: [
      {
        src: "https://placehold.co/1200x800/6A1B2D/F7F2E8?text=Opening+Night",
        alt: "Convention opening night worship gathering",
        caption: "Opening night worship",
      },
      {
        src: "https://placehold.co/1200x800/0F4C5C/F7F2E8?text=Teaching+Session",
        alt: "Delegates gathered during a teaching session",
        caption: "Teaching and ministry moments",
      },
      {
        src: "https://placehold.co/1200x800/E36414/F7F2E8?text=Prayer+Altar",
        alt: "Prayer ministry at the convention altar",
        caption: "Prayer and response time",
      },
      {
        src: "https://placehold.co/1200x800/FB8B24/1B1B1B?text=Fellowship+Hall",
        alt: "Convention fellowship and networking moments",
        caption: "Fellowship across the network",
      },
    ],
  },
];

export const GALLERY_CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All albums" },
  { value: "events", label: "Events" },
  { value: "ministries", label: "Ministries" },
  { value: "general", label: "General" },
];

export const standaloneGalleryAlbums: GalleryAlbum[] = [
  {
    id: "general-prayer-retreat",
    slug: "prayer-retreat-weekend",
    title: "Prayer Retreat Weekend",
    date: "2026-03-07",
    category: "general",
    coverImage: {
      src: "https://placehold.co/1200x800/5A189A/F7F2E8?text=Prayer+Retreat",
      alt: "CRM NA prayer retreat worship session",
      caption: "Retreat worship and intercession",
    },
    images: [
      {
        src: "https://placehold.co/1200x800/5A189A/F7F2E8?text=Retreat+Worship",
        alt: "Worship during the prayer retreat",
        caption: "Extended worship sessions",
      },
      {
        src: "https://placehold.co/1200x800/7B2CBF/F7F2E8?text=Morning+Prayer",
        alt: "Morning prayer circle during the retreat",
        caption: "Morning prayer watches",
      },
      {
        src: "https://placehold.co/1200x800/9D4EDD/F7F2E8?text=Teaching+Circle",
        alt: "Teaching circle during the retreat weekend",
        caption: "Word, prayer, and response",
      },
    ],
  },
  {
    id: "general-network-fellowship",
    slug: "network-fellowship-summer",
    title: "Network Fellowship Summer",
    date: "2025-08-16",
    category: "general",
    coverImage: {
      src: "https://placehold.co/1200x800/1D3557/F7F2E8?text=Network+Fellowship",
      alt: "CRM NA fellowship table and conversation",
      caption: "Summer fellowship across branches",
    },
    images: [
      {
        src: "https://placehold.co/1200x800/1D3557/F7F2E8?text=Shared+Meal",
        alt: "Shared meal during a CRM NA network fellowship",
        caption: "Shared meals and reconnection",
      },
      {
        src: "https://placehold.co/1200x800/457B9D/F7F2E8?text=Families+Together",
        alt: "Families gathered together in fellowship",
        caption: "Families across the network",
      },
      {
        src: "https://placehold.co/1200x800/A8DADC/1B1B1B?text=Prayer+Circle",
        alt: "Closing prayer circle after a fellowship event",
        caption: "Closing prayer and encouragement",
      },
    ],
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
    title: "Whole Gospel",
    scripture: "Mark 16:15-18",
    description:
      "CRM NA emphasizes preaching and demonstrating the whole gospel through word, prayer, and Spirit-led ministry.",
  },
  {
    title: "Equipping",
    scripture: "Ephesians 4:11-13",
    description:
      "The ministry exists to teach converts, train workers, and equip ministers for faithful service.",
  },
  {
    title: "Care",
    scripture: "Galatians 6:2",
    description:
      "Pastoral care includes practical support for families, singles, the sick, the poor, the unemployed, the bereaved, and the imprisoned.",
  },
  {
    title: "Revival",
    scripture: "Habakkuk 3:2",
    description:
      "CRM NA pursues revival in personal lives, the church, and society through church centers and ministry departments.",
  },
];

export const historyTimeline: TimelineEntry[] = [
  {
    year: "1980",
    title: "CRM Is Prophetically Birthed",
    description:
      "The ministry traces its origin to the prophetic birthing of CRM at the University of Ife.",
  },
  {
    year: "1985",
    title: "North America Prophecy",
    description:
      "A CRM prayer camp prophecy described members being sent out as arrows of revival beyond Nigeria.",
  },
  {
    year: "1997",
    title: "First Missions Conference",
    description:
      "Brethren in the United States and United Kingdom gathered for the first missions conference in Missouri.",
  },
  {
    year: "1998",
    title: "First CRM NA Core Group",
    description:
      "At the Maryland national conference, the first CRM NA Core Group was constituted and Pastor Chris Akpama headed the team.",
  },
  {
    year: "2002",
    title: "First Formal CRM NA Church Center",
    description:
      "The 2002 national conference birthed the first formal CRM NA church center, God is Love, in Maryland.",
  },
];

export const whoWeAreIntro = {
  title: "We Charismatics Make The Devil Cry",
  summary:
    "CRM NA is a revival family shaped by prayer, Spirit-filled worship, plural leadership, and the call to prepare people for the great harvest.",
  points: [
    "We build church centers, home clusters, cell groups, and ministry departments as practical revival structures.",
    "We help believers discover, grow, and mature in their gifts and calling through serving the Lord.",
    "We welcome newcomers and long-time members into a church family that values Scripture, spiritual gifts, pastoral care, and mission.",
  ],
};

export const visionContent = {
  title: "Preparing men for the great harvest",
  body: [
    "CRM North America exists to prepare men and women with faithful and obedient hearts for the Lord's harvest.",
    "That vision is expressed through prayer, discipleship, church centers, and ministries that help believers receive, enjoy, and share God's love and light with humanity.",
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

export function getGalleryAlbums() {
  const eventAlbums: GalleryAlbum[] = events
    .filter((event) => event.galleryImages?.length)
    .map((event) => ({
      id: `event-${event.slug}`,
      slug: event.slug,
      title: event.title,
      date: event.startDate,
      category: "events",
      coverImage: event.galleryImages![0],
      images: event.galleryImages!,
      sourceHref: `/events/${event.slug}`,
    }));

  const ministryAlbums: GalleryAlbum[] = ministries
    .filter((ministry) => ministry.galleryImages?.length)
    .map((ministry) => ({
      id: `ministry-${ministry.slug}`,
      slug: ministry.slug,
      title: ministry.name,
      category: "ministries",
      coverImage: ministry.galleryImages![0],
      images: ministry.galleryImages!,
      sourceHref: `/ministries/${ministry.slug}`,
    }));

  return [...eventAlbums, ...ministryAlbums, ...standaloneGalleryAlbums];
}

export function getAlbumBySlug(slug: string) {
  return getGalleryAlbums().find((album) => album.slug === slug);
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
