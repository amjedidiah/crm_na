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
    title: "CRM NA Youth Director",
    ministrySlug: "youths",
    region: "USA",
    imageSrc:
      "https://i0.wp.com/crm-na.org/wp-content/uploads/2016/05/Prudential-Okoli-1.jpg",
    imageAlt: "Pastor Prudent Okoli",
    bio: "CRM NA Youth Director and Co-Pastor of Seattle Christian Center (CRM NA Inc.), Seattle, Washington.",
  },
  {
    id: "okezie-ofoegbu",
    name: "Pastor Okezie Ofoegbu",
    title: "Youth Coordinator — Grace Life Center, Maryland",
    ministrySlug: "youths",
    region: "USA",
    imageSrc: LEADER_PLACEHOLDER_IMAGE,
    imageAlt: "Pastor Okezie Ofoegbu",
    bio: "Pastors Grace Life Center (Maryland) and assists CRM NA Youth Ministry alongside the national director.",
  },
  {
    id: "joe-atodo",
    name: "Joe Atodo",
    title: "Lead Pastor, CRM Ottawa",
    churchSlug: "crm-ottawa",
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
    churchSlug: "crm-north-bay",
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
    mode: "internal-page",
    directoryOrder: 1,
    legacyPath: "/crm-word-of-life/",
    name: "CRM Word of Life",
    region: "USA",
    city: "Woodbridge",
    stateOrProvince: "Virginia",
    country: "United States",
    summary:
      "A revival church center in Woodbridge led by Pastor Marcel and Pastor Francisca Odimgbe—discipleship, prayer, and Spirit-led worship for Northern Virginia.",
    story: [
      "CRM Word of Life Fellowship gathers families across Northern Virginia for biblical preaching, charismatic worship, and practical discipleship.",
      "Pastor Marcel Odimgbe serves as Senior Pastor with Pastor Francisca Odimgbe; together they steward Word of Life’s vision alongside resident pastoral care and national CRM NA responsibilities.",
      "Weekly rhythms include Sunday worship and Thursday Digging Deep prayer (often hosted virtually), plus evangelism and outreach that invite neighbors into faith and fellowship.",
    ],
    address: "12827 Chandon Cross Road, Woodbridge, VA 22193",
    phone: "+1 571-991-9555",
    email: "wolf_dlc@yahoo.com",
    livestreamUrl:
      "https://us02web.zoom.us/j/81676721857?pwd=L1FxOXNqaFIyRlJWVkM3bXRFL1FTZz09",
    pastorId: "marcel-odimgbe",
    serviceTimes: [
      { label: "Sunday Worship", day: "Sunday", time: "10:00 AM" },
      {
        label: "Digging Deep / Prayer",
        day: "Thursday",
        time: "7:00 PM",
        note: "Zoom — https://us02web.zoom.us/j/88418721286?pwd=d0srSXZDVjZRSVM0KzA1aWQwZ1kxQT09",
      },
    ],
    programs: [{ title: "Evangelism", cadence: "Saturday", note: "4:00 PM" }],
  },
  {
    slug: "crm-praise-center",
    mode: "slug-redirect",
    directoryOrder: 2,
    legacyPath: "/crm-praise-center/",
    name: "CRM Praise Center",
    region: "USA",
    city: "New Haven",
    stateOrProvince: "Connecticut",
    country: "United States",
    summary:
      "Lead Pastor Chizo Nwaneri and a vibrant New Haven congregation committed to worship, deliverance prayer, and discipleship across the week.",
    story: [
      "CRM Praise Center was inaugurated in 2005 and has grown into a flagship CRM NA branch in Connecticut.",
      "The fellowship began in New Britain before moving into New Haven and, under God’s provision, into its current building—alive with Sunday power services, Thursday miracle and deliverance prayer, house fellowships, and serving ministries.",
      "Leaders and volunteers serve through welfare, evangelism, worship, prayer, follow-up, and pastoral care so families can grow in Scripture and the Holy Spirit.",
    ],
    address: "16 Norton St, New Haven, CT 06511",
    phone: "+1 203-987-7729",
    email: "crmpraisecenter@gmail.com",
    website: "https://www.crmpraisecenter.org/",
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
    mode: "internal-page",
    directoryOrder: 3,
    legacyPath: "/crm-rhode-island/",
    name: "CRM Rhode Island",
    region: "USA",
    city: "North Providence",
    stateOrProvince: "Rhode Island",
    country: "United States",
    summary:
      "A newer CRM NA church center with a strong revival and discipleship emphasis.",
    story: [
      "CRM Rhode Island started in 2020 with a strong burden for revival, prayer, and discipleship in the Northeast corridor.",
      "The branch serves believers looking for intimate worship, practical teaching, and a church family that grows people in faith.",
    ],
    address: "1882 Smith Street, Apt 2, North Providence, RI 02911",
    phone: "+1 401-572-4572",
    email: CONTACT_EMAIL,
    pastorId: "chinyere-ezeama",
    serviceTimes: [
      { label: "Sunday Fellowship", day: "Sunday", time: "10:00 AM" },
    ],
    programs: [{ title: "Counseling and Prayer", cadence: "By appointment" }],
  },
  {
    slug: "grace-glory-sanctuary",
    mode: "internal-page",
    directoryOrder: 4,
    legacyPath: "/grace-glory-sanctuary/",
    name: "Grace & Glory Sanctuary",
    region: "USA",
    city: "Sugar Land",
    stateOrProvince: "Texas",
    country: "United States",
    summary:
      "A Houston-based church center with resident and senior leadership functions.",
    story: [
      "Grace & Glory Sanctuary is one of the core CRM NA branches in the United States and a key gathering point for regional believers.",
      "The Houston church centers its life around worship, leadership formation, intercession, and faithful pastoral presence.",
    ],
    address: "10055 Belknap Road, Suite 109, Sugar Land, TX 77498",
    phone: "+1 859-354-7486",
    email: "ggs.crmhouston@gmail.com",
    pastorId: "solomon-inikori",
    serviceTimes: [
      {
        label: "Tuesday Prayer Meeting",
        day: "Tuesday",
        time: "7:00 PM – 8:00 PM",
        note: "Physical & virtual · Zoom ID 807 536 9089 · Passcode crmhouston",
      },
      {
        label: "Thursday Bible Study",
        day: "Thursday",
        time: "7:00 PM – 8:00 PM",
        note: "Physical & virtual · Zoom ID 807 536 9089 · Passcode crmhouston",
      },
      {
        label: "Sunday Service",
        day: "Sunday",
        time: "9:30 AM – 11:45 AM",
        note: "Physical & virtual · Zoom ID 807 536 9089 · Passcode crmhouston",
      },
      {
        label: "Night Vigil",
        day: "Friday",
        time: "9:00 PM – 12:00 AM",
        note: "Last Friday of each month · Physical & virtual",
      },
    ],
    programs: [{ title: "Prayer and Teaching", cadence: "Weekly" }],
  },
  {
    slug: "crm-brampton",
    mode: "slug-redirect",
    directoryOrder: 5,
    name: "CRM Brampton",
    region: "Canada",
    city: "Brampton",
    stateOrProvince: "Ontario",
    country: "Canada",
    summary:
      "CRM Canada fellowship in the Greater Toronto Area, served through the national Canadian ministry network.",
    story: [
      "CRM Brampton connects believers in the GTA into worship, discipleship, and pastoral care alongside other CRM Canada expressions.",
      "Visit CRM Canada online for locations, service details, and national oversight contacts.",
    ],
    address: "Greater Toronto Area, Ontario, Canada",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    website: "https://crm-can.org/",
    serviceTimes: [],
    programs: [],
  },
  {
    slug: "crm-ottawa",
    mode: "external-link-only",
    directoryOrder: 6,
    name: "CRM Ottawa",
    region: "Canada",
    city: "Ottawa",
    stateOrProvince: "Ontario",
    country: "Canada",
    summary:
      "National-capital church family rooted in CRM Canada’s revival vision and pastoral oversight.",
    story: [
      "CRM Ottawa gathers believers who hunger for Spirit-led worship, biblical teaching, and close-knit church family life.",
      "Local rhythms connect into CRM Canada’s wider Canadian fellowship for encouragement, alignment, and mission.",
    ],
    address: "Ottawa, Ontario, Canada",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    website: "https://crm-can.org/",
    pastorId: "joe-atodo",
    serviceTimes: [
      { label: "Sunday Worship", day: "Sunday", time: "10:00 AM" },
    ],
    programs: [{ title: "Midweek gathering", cadence: "As scheduled locally" }],
  },
  {
    slug: "crm-north-bay",
    mode: "listing-only",
    directoryOrder: 7,
    name: "CRM North Bay",
    region: "Canada",
    city: "North Bay",
    stateOrProvince: "Ontario",
    country: "Canada",
    summary:
      "A Canadian fellowship listed with CRM NA; contact the national office for current gathering details.",
    story: [],
    address: "North Bay, Ontario, Canada",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    pastorId: "pastor-matthew",
    serviceTimes: [],
    programs: [],
  },
  {
    slug: "crm-mexico-city",
    mode: "listing-only",
    directoryOrder: 8,
    name: "CRM Mexico City",
    region: "Mexico",
    city: "Mexico City",
    stateOrProvince: "CDMX",
    country: "Mexico",
    summary:
      "CRM expression in Mexico City; reach out through CRM NA for connection and pastoral guidance.",
    story: [],
    address: "Mexico City, Mexico",
    phone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    serviceTimes: [],
    programs: [],
  },
];

export const ministries: Ministry[] = [
  {
    slug: "youths",
    name: "CRM NA Youth Ministry",
    summary:
      "National Youth Forum with weekly virtual Bible studies across North America—senior, junior, and Connecticut gatherings.",
    description: [
      "The Charismatic Renewal Ministries North America Youth Forum began under Pastor Prudent Okoli. She is a wife and mother of three, Co-Pastor of Seattle Christian Center (SCC), CRM NA Inc., in Seattle, Washington, and CRM NA Youth Director.",
      "She is assisted by Pastor Okezie Ofoegbu (Grace Life Center, Maryland) and Dr. Solomon Inikori (Grace and Glory Sanctuary, Houston, Texas). Together they coordinate CRM NA youth ministry nationally.",
      "They serve alongside a committee of youth leaders: Miracle Okoli, Glory Okoli, Praise Okoli, Chinaza Abonyi, Obiomachi Abonyi, Goziechi Abonyi, Emmanuel Ezeife (Kendo), Jesse Ezeama, Josephwise Chinedu Ezeama, Goodness Ezeama, Jean Dopavogui, Emeka Nzenwa, Feji Inikori, Rukky Inikori, and Jovana Atuhaire.",
      "Those leaders are supported by countless young believers across North America who are pursuing God’s glory in their generation.",
    ],
    leaderIds: ["prudent-okoli", "okezie-ofoegbu", "solomon-inikori"],
    meetingSchedule: [
      "Senior Youths Virtual Bible Study — Thursdays: 9–10 PM EST · 8–9 PM CST · 6–7 PM PST",
      "Junior Youths Virtual Bible Study — Wednesdays: 7–8 PM EST · 6–7 PM CST · 4–5 PM PST",
      "Connecticut Youths Virtual Bible Study — Fridays: 8–9 PM EST · 7–8 PM CST · 5–6 PM PST",
      "Request Zoom links or host-city details through the contact form — our ministry office routes each note to the youth team.",
    ],
    focusAreas: [
      "Virtual Bible study",
      "National Youth Forum",
      "Peer leadership",
    ],
    imageSrc: "https://placehold.co/1200x800/23395B/F7F2E8?text=CRM+NA+Youths",
    galleryImages: [],
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
    galleryImages: [],
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
    galleryImages: [],
  },
];

export const events: Event[] = [
  {
    slug: "crm-usa-national-convention-2026",
    mode: "internal-page",
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
      "https://i.ibb.co/RGqCTRFN/Whats-App-Image-2026-05-09-at-17-37-05-1.jpg",
    galleryImages: [],
  },
];

export const GALLERY_CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All albums" },
  { value: "events", label: "Events" },
  { value: "ministries", label: "Ministries" },
  { value: "general", label: "General" },
];

/** Initial visible album count on `/gallery` before “Load more”. */
export const GALLERY_ALBUM_PAGE_SIZE = 6;

export const standaloneGalleryAlbums: GalleryAlbum[] = [
  // {
  //   id: "general-prayer-retreat",
  //   slug: "prayer-retreat-weekend",
  //   title: "Prayer Retreat Weekend",
  //   date: "2026-03-07",
  //   category: "general",
  //   coverImage: {
  //     src: "https://placehold.co/1200x800/5A189A/F7F2E8?text=Prayer+Retreat",
  //     alt: "CRM NA prayer retreat worship session",
  //     caption: "Retreat worship and intercession",
  //   },
  //   images: [],
  // },
  // {
  //   id: "general-network-fellowship",
  //   slug: "network-fellowship-summer",
  //   title: "Network Fellowship Summer",
  //   date: "2025-08-16",
  //   category: "general",
  //   coverImage: {
  //     src: "https://placehold.co/1200x800/5A189A/F7F2E8?text=Network+Fellowship",
  //     alt: "CRM NA network fellowship summer gathering",
  //     caption: "Network fellowship summer gathering",
  //   },
  //   images: [],
  // },
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
