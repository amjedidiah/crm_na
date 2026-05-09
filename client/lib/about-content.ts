import type { TimelineEntry } from "@/lib/types";

export const aboutSectionLinks = [
  { href: "#about", label: "Who We Are" },
  { href: "#welcome", label: "Welcome" },
  { href: "#vision", label: "Vision" },
  { href: "#mission", label: "Mission" },
  { href: "#strategy", label: "Our Strategy" },
  { href: "#history", label: "History" },
  { href: "#leadership", label: "Leadership" },
] as const;

export const aboutOverview = {
  title: "We Charismatics Make The Devil Cry.",
  description:
    "CRM North America belongs to the wider Charismatic Renewal Ministries story and carries a revival mandate across church centers, homes, and communities throughout North America.",
  paragraphs: [
    "The prophetic birthing of Charismatic Renewal Ministries took place on February 18, 1980, at the University of Ife, now Obafemi Awolowo University. The ministry understands itself as God’s idea, commissioned to prepare men for a great harvest.",
    "CRM adopted a Core Group model of leadership marked by plural responsibility and shared stewardship. Within that structure, CRM North America sees itself as part of the wider fulfillment of that original prophetic commission.",
    "What this means in practice is a church family shaped by prayer, Spirit-filled worship, practical discipleship, and a burden to nurture believers who can influence the world through faithful and obedient service.",
  ],
  featurePoints: [
    "Plural leadership and shared responsibility remain part of the ministry’s self-understanding.",
    "Church centers, home clusters, cell groups, and ministry departments are treated as revival structures, not only programs.",
    "The work is aimed at forming believers who can receive, enjoy, and share God’s love and light with humanity.",
  ],
} as const;

export const aboutVision = {
  title: "Preparing men for the great harvest.",
  description:
    "The vision language in CRM NA is direct and historic: the ministry exists to prepare men and women with faithful and obedient hearts for the Lord’s harvest.",
  body: [
    "CRM NA frames this vision as molding believers and influencing the world, not by organizational polish alone, but by raising people who know Christ, walk in the Spirit, and remain steady in obedience.",
    "That conviction shapes how churches gather, how leaders serve, and how ministries are built across North America.",
  ],
} as const;

export const aboutMission = {
  title:
    "To bring people to Christ and help members discover, grow, and mature in their Spirit gifts and calling through serving the Lord.",
  description:
    "The mission language emphasizes conversion, discipleship, and service. People are not only welcomed into church life, but helped toward maturity, calling, and useful ministry.",
  commitments: [
    "Lead people into a growing relationship with Jesus Christ.",
    "Help believers discover and mature in their spiritual gifts and calling.",
    "Build communities where service to God becomes practical, accountable, and joyful.",
  ],
} as const;

export const aboutStrategy = {
  title: "Molding believers, influencing the world.",
  description:
    "CRM NA articulates its strategy as practical ministry action that touches both church life and human need.",
  items: [
    "Preaching and demonstrating the whole gospel.",
    "Teaching converts, training workers, and equipping ministers.",
    "Empowering men, youths, and children for self-discovery in Christ.",
    "Supporting challenged couples, parents, singles, widows, the sick, the poor, the unemployed, the bereaved, and the imprisoned.",
    "Pursuing revival in personal lives, the church, and society.",
  ],
  mandate:
    "CRM NA says this mission finds expression through establishing revival centers that bring divine solutions to human problems.",
} as const;

export const aboutHistoryTimeline: TimelineEntry[] = [
  {
    year: "1980",
    title: "CRM is prophetically birthed",
    description:
      "At the University of Ife, CRM received a prophetic commission to start preparing people for the great harvest.",
  },
  {
    year: "1985",
    title: "North America appears in prophecy",
    description:
      "At a CRM national prayer camp in Ilorin, God said some members would be sent outside Nigeria as arrows of revival.",
  },
  {
    year: "1987",
    title: "The outward movement begins",
    description:
      "About two years later, members began relocating abroad, including Dr. Peter Ezekwenna and his family moving to France for further studies.",
  },
  {
    year: "1994",
    title: "Monthly prayer gatherings start in the USA",
    description:
      "Brethren in the United States began meeting monthly over the phone for prayer, giving CRM NA an early and durable rhythm of fellowship.",
  },
  {
    year: "1997",
    title: "The first missions conference is held in Missouri",
    description:
      "The Rolla, Missouri meeting gathered brethren from the United States and the United Kingdom and set the stage for national coordination.",
  },
  {
    year: "1998",
    title: "The first CRM NA Core Group is constituted",
    description:
      "At the Maryland national conference, the first CRM NA Core Group was formed under Pastor Chris Akpama and the Lord instructed the team to cluster together.",
  },
  {
    year: "Late 1990s",
    title: "Families relocate to Maryland in response",
    description:
      "In response to that direction, the Ezekwenna and Edoga families relocated from Missouri to Maryland, strengthening the emerging national work.",
  },
  {
    year: "2002",
    title: "The first formal CRM NA church center is born",
    description:
      "The bi-annual national conference rhythm birthed 'God is Love' in Maryland, marking the beginning of a more settled church-center phase.",
  },
  {
    year: "Virginia Retreat",
    title: "Vision and mission are clearly articulated",
    description:
      "During a Core Group pre-national conference prayer retreat in Virginia, CRM NA says God clearly articulated the vision and mission of the North American work.",
  },
  {
    year: "Today",
    title: "The revival work continues to expand",
    description:
      "CRM NA now expresses that mandate through church centers, vibrant youth and children groups, support ministries, and missions across the United States and Canada.",
  },
] as const;

/** Curated milestones for the About page (compressed timeline band). */
export const aboutHistoryHighlights: TimelineEntry[] = [
  {
    year: "1980",
    title: "CRM is prophetically birthed",
    description:
      "At the University of Ife, CRM received a prophetic commission to start preparing people for the great harvest.",
  },
  {
    year: "1985",
    title: "North America appears in prophecy",
    description:
      "At a CRM national prayer camp in Ilorin, God said some members would be sent outside Nigeria as arrows of revival.",
  },
  {
    year: "1998",
    title: "The first CRM NA Core Group is constituted",
    description:
      "At the Maryland national conference, the first CRM NA Core Group was formed under Pastor Chris Akpama and the Lord instructed the team to cluster together.",
  },
  {
    year: "2002",
    title: "The first formal CRM NA church center is born",
    description:
      "The bi-annual national conference rhythm birthed 'God is Love' in Maryland, marking the beginning of a more settled church-center phase.",
  },
  {
    year: "Virginia Retreat",
    title: "Vision and mission are clearly articulated",
    description:
      "During a Core Group pre-national conference prayer retreat in Virginia, CRM NA says God clearly articulated the vision and mission of the North American work.",
  },
  {
    year: "Today",
    title: "The revival work continues to expand",
    description:
      "CRM NA now expresses that mandate through church centers, vibrant youth and children groups, support ministries, and missions across the United States and Canada.",
  },
];

export const aboutWelcomeMessage = {
  eyebrow: "Welcome Message from the Overseer",
  title: "A missional community commissioned as arrows of revival.",
  authorName: "Dr. Peter Ezekwenna",
  authorTitle: "National Overseer, CRM North America",
  body: [
    "With great pleasure and delight, we welcome you to Charismatic Renewal Ministries, North America. We are a missional community with a vision and mission to receive, enjoy, and share God’s love and light with humanity.",
    "We believe God has commissioned us as arrows of revival with a mission to ignite revival flames across North America through home clusters, cell groups, revival church centers, and ministry departments.",
    "We also believe the Lord has anointed this work to proffer divine solutions to human problems. That is why the ministry keeps pointing people toward Christ, spiritual growth, worship, fellowship, and practical help for everyday life.",
  ],
} as const;

export const aboutLeadership = {
  title: "Pastors and leaders serving the revival work.",
  description:
    "The public CRM NA leadership story is expressed through overseers, resident pastors, campus elders, regional coordinators, and branch pastors serving across the United States and Canada.",
  lanes: [
    "Shared leadership remains part of the ministry’s structure and theology of service.",
    "Local church centers are the primary places for worship, discipleship, and pastoral care.",
    "Regional and national leadership help maintain cohesion, brotherhood, and mission alignment.",
  ],
  emptyTitle: "Leadership details are being updated.",
  emptyDescription:
    "The broader About page is available, but the current leadership roster is temporarily unavailable. Please check back soon or contact CRM NA for the latest pastoral information.",
} as const;
