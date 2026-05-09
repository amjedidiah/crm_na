import type { GivingContent } from "@/lib/giving";

/** Matches crmusa2026-convention (Zeffy donation form + Zelle treasury). */
export const CONVENTION_ZEFFY_DONATION_URL =
  "https://www.zeffy.com/en-US/donation-form/donate-to-facilitate-the-work-of-this-ministry";

export const CONVENTION_ZELLE_EMAIL = "crmnaexec@gmail.com";

/** One-tap Zelle enrollment link (same recipient as convention registration flow). */
export const CONVENTION_ZELLE_QUICK_PAY_HREF =
  "https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiQ1JNIFVTQSBOYXRpb25hbCBDb252ZW50aW9uIDIwMjYiLCJ0b2tlbiI6ImNybW5hZXhlY0BnbWFpbC5jb20iLCJ0b2tlblR5cGUiOiJFTUFJTCJ9";

/** QR targeting the same Zelle quick-pay URL (crmusa2026-convention index.html). */
export const CONVENTION_ZELLE_QR_IMAGE_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=6D1ED4&bgcolor=0B1628&data=https%3A%2F%2Fenroll.zellepay.com%2Fqr-codes%3Fdata%3DeyJuYW1lIjoiQ1JNIFVTQSBOYXRpb25hbCBDb252ZW50aW9uIDIwMjYiLCJ0b2tlbiI6ImNybW5hZXhlY0BnbWFpbC5jb20iLCJ0b2tlblR5cGUiOiJFTUFJTCJ9";

export const givingContent: GivingContent = {
  methods: [
    {
      id: "zeffy",
      title: "Zeffy (card)",
      description: "Give securely by debit or credit card through Zeffy",
      icon: "credit-card",
      primary: true,
      ctaLabel: "Give through Zeffy",
      ctaHref: CONVENTION_ZEFFY_DONATION_URL,
      detailLines: [
        "Opens the Zeffy donation form in a new tab.",
        "For event or pledge reconciliation, follow any memo or registration-code instructions you received by email.",
      ],
    },
    {
      id: "zelle",
      title: "Zelle",
      description:
        "Send directly from your bank’s Zelle experience. Use the treasury email below; include a clear memo so we can thank you and record your gift appropriately.",
      icon: "smartphone",
      ctaLabel: "Open one-tap Zelle page",
      ctaHref: CONVENTION_ZELLE_QUICK_PAY_HREF,
      detailLines: [
        `Recipient email: ${CONVENTION_ZELLE_EMAIL}`,
        "In your banking app, choose Send with Zelle and enter that email as the recipient.",
        "Add a short memo such as “CRM NA gift” or your pledge / registration code if you were given one.",
      ],
      qrImageSrc: CONVENTION_ZELLE_QR_IMAGE_SRC,
      qrImageAlt:
        "QR code that opens Zelle enrollment for the CRM USA treasury email",
    },
  ],
  categories: [
    {
      id: "local-churches",
      title: "Local churches & branches",
      description:
        "Gifts help CRM congregations disciple families, serve neighborhoods, and keep pastoral care within reach across North America.",
    },
    {
      id: "students-nextgen",
      title: "Students & next generation",
      description:
        "Your support fuels camps, campus outreach, and leadership formation so young believers can carry revival into their schools and cities.",
    },
    {
      id: "national-gatherings",
      title: "National gatherings & teaching",
      description:
        "Contributions make conferences, training, and shared teaching accessible so the wider CRM family can be equipped in one place.",
    },
  ],
  faq: [
    {
      id: "tax-receipt",
      question: "Will I receive a tax receipt?",
      answer:
        "CRM North America issues acknowledgements consistent with U.S. nonprofit practice for qualifying donations. If you need a formal letter for a specific gift, contact us through the national contact form and we will route your request to the right office.",
    },
    {
      id: "zelle-timing",
      question: "How long do Zelle gifts take to show up?",
      answer:
        "Zelle transfers usually move within minutes, but treasury review and internal recording can take a few business days — the same manual reconciliation flow used for CRM USA convention payments. If you need confirmation sooner, reach out via the contact page with the date and amount you sent.",
    },
    {
      id: "memo-registration",
      question: "What should I put in the memo field?",
      answer:
        "For general support, a short note such as “CRM NA gift” is enough. If you are fulfilling a pledge or registration balance, use the code or wording provided in your confirmation email so staff can match your payment quickly.",
    },
    {
      id: "international",
      question: "Can I give from outside the United States?",
      answer:
        "Zeffy may be the simplest option where cards are supported. Zelle is U.S.-bank oriented; if neither works in your region, use the contact page and we will help you explore alternatives.",
    },
  ],
};
