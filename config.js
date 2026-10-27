/*
 * ============================================================
 *  SITE CONTENT — edit this file only to update the website.
 * ============================================================
 *  Every year, usually only `event` (date / venue) and
 *  `schedule` need changing. Text fields may contain simple
 *  HTML such as <b>, <i>, <br> or <a href="...">.
 *
 *  To hide a section, remove it from `sections` below.
 * ============================================================
 */
window.SITE = {

  /* ---------- Identity ---------- */
  name: "London Kalibari",
  eventName: "Kali Puja",          // used in page title, calendar entry
  tagline: "Shyama Puja · Deepavali · Amavasya Night",
  description: "London Kalibari's annual Kali Puja and Diwali celebration in North London, UK.",
  logo: "assets/images/lkb-logo.png",        // circular logo (hero + favicon)
  logoText: "London Kalibari",               // shown next to the logo in the navigation bar
  charity: "Registered Charity No. 1158269",

  /* Home page section order (and which sections are shown). */
  sections: ["home", "about", "schedule", "highlights", "gallery", "aboutus", "contact"],

  /* Top menu and footer links, shared by every page.
     "index.html#section" links scroll within the home page. */
  nav: [
    { label: "Home",           href: "index.html#home" },
    { label: "Kali Puja 2026", href: "index.html#schedule" },
    { label: "Events",         href: "events.html" },
    { label: "About Us",       href: "about.html" },
    { label: "Newsletters",    href: "newsletters.html" },
    { label: "Contact",        href: "contact.html" }
  ],

  /* ---------- Hero / home ---------- */
  hero: {
    mantra: [
      "ॐ Kali Kali Mahakali Kalike Parameshvari",
      "Sarvanandakare Devi Narayani Namo’stute"
    ],
    quote: "Kali Herself is Brahman, Brahman Itself is Kali!",
    quoteAuthor: "Sri Ramakrishna",
    backgroundImage: ""           // optional e.g. "assets/images/hero.jpg"
  },

  /* ---------- Event details ---------- */
  event: {
    // ISO date-time WITH timezone offset (UK is +00:00 in November, +01:00 in summer).
    start: "2026-11-08T16:00:00+00:00",
    end:   "2026-11-08T20:00:00+00:00",
    dayLabel:  "Sunday",
    dateLabel: "8 November 2026",
    timeLabel: "4:00 PM – 8:00 PM",
    venueName: "Barnet Multi Cultural Community Centre",
    venueAddress: "Algernon Road, Hendon, London NW4 3TA",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Barnet+Multi+Cultural+Community+Centre+Algernon+Road+NW4+3TA",
    // Optional embedded map. Leave empty to hide.
    mapEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=-0.2449%2C51.5753%2C-0.2289%2C51.5834&layer=mapnik&marker=51.57936%2C-0.236915",
    // Practical notes shown under the venue (from the London Kalibari event notice).
    notes: [
      "Venue: Hendon Sports Centre (Youth &amp; Community Centre), Algernon Rd, London NW4 3TA.",
      "For catering purposes, please confirm attendance to <a href=\"mailto:kalibarilondon@gmail.com\">kalibarilondon@gmail.com</a>.",
      "There is limited parking at the venue, and free parking on the roads nearby.",
      "If you would like to make a donation, please note that London Kalibari\u2019s bank details have changed."
    ],
    highlightNote: "All are welcome",
    // Shown in place of the countdown once the puja has started.
    liveMessage: "Jai Maa Kali! The puja is underway — come and join us.",
    pastMessage: "Thank you for celebrating with us. See you next year!"
  },

  /* ---------- About the festival ---------- */
  about: {
    eyebrow: "Kali Puja",
    title: "The Festival",
    paragraphs: [
      "Kali Puja, also known as <b>Shyama Puja</b>, is celebrated on the new-moon night (Amavasya) of the month of Kartik, the same night as Deepavali. While much of India worships Goddess Lakshmi on this night, Bengal, Assam and Odisha worship Maa Kali, the fierce and compassionate form of the Divine Mother.",
      "Kali is the power of Time itself — she who destroys ignorance and ego, and protects her children from all evil. Her dark complexion represents the infinite, formless void from which all creation arises and into which it returns. Her garland of heads and her raised sword symbolise the severing of the ego; her raised hand of blessing (abhaya mudra) tells her devotees: <i>do not fear</i>.",
      "The puja is performed through the night, with offerings of red hibiscus (<i>jaba</i>) flowers, lamps, sweets and bhog. Homes and temples are lit with diyas and candles to dispel the darkness of the moonless night, and devotees sing Shyama Sangeet in praise of the Mother."
    ],
    prayerTitle: "Pranam Mantra",
    prayer: "Om Jayanti Mangala Kali Bhadrakali Kapalini<br>Durga Shiva Kshama Dhatri Svaha Svadha Namo’stute",
    prayerTranslation: "Salutations to the victorious, auspicious Kali, the benevolent Bhadrakali, Durga, Shiva, the forgiving one, the sustainer of all."
  },

  /* ---------- Schedule ---------- */
  schedule: {
    eyebrow: "Schedule",
    title: "What’s Happening",
    note: "Timings are approximate and follow the auspicious tithi.",
    items: [
      { time: "04:00 PM",            event: "Doors open · Diya lighting" },
      { time: "04:30 PM - 06:00 PM", event: "Kali Puja" },
      { time: "06:00 PM - 06:30 PM", event: "Pushpanjali & Aarti" },
      { time: "06:30 PM - 07:15 PM", event: "Cultural programme & Shyama Sangeet" },
      { time: "07:15 PM - 08:00 PM", event: "Prasad & bhog distribution" }
    ]
  },

  /* ---------- Highlights (cards) ---------- */
  highlights: {
    eyebrow: "Celebrate",
    title: "On the Night",
    items: [
      { icon: "🪔", title: "Deepavali Lights",  text: "Diyas lit together to welcome the Mother on the darkest night of the year." },
      { icon: "🌺", title: "Pushpanjali",       text: "Offer red hibiscus flowers to Maa Kali with the traditional anjali mantras." },
      { icon: "🎶", title: "Shyama Sangeet",    text: "Devotional songs of Ramprasad and Kamalakanta, sung by our community." },
      { icon: "🍛", title: "Prasad & Bhog",     text: "Share the Mother’s blessings with family, friends and neighbours." }
    ]
  },

  /* ---------- Past years / gallery ---------- */
  gallery: {
    eyebrow: "Memories",
    title: "Past Celebrations",
    text: "Kali Puja celebrations from previous years.",
    // Leave empty to list past Kali Pujas from the event archive automatically.
    years: [
      // { year: "2025", link: "https://drive.google.com/..." }
    ],
    more: { label: "All events, photos & videos", href: "events.html" }
  },

  /* ---------- About us ---------- */
  aboutUs: {
    eyebrow: "About Us",
    title: "Who We Are",
    paragraphs: [
      "<b>London Kalibari (LKB)</b> is a registered charity (No. 1158269) serving the cultural, spiritual and social needs of the Hindu community in London and the Home Counties. We have been bringing the community together since 1982.",
      "Through the year we celebrate Kabi Divas (Rabindranath Tagore’s birthday), Netaji’s birthday, monthly Purnima and Amavasya pujas, and our annual Kali Puja and Diwali celebration, supported by friends and well-wishers from across the wider community.",
      "Our long-cherished dream is a permanent Kali Bari: a home for religious and cultural festivals, and a place to teach Bengali and Rabindrasangeet. The London Kalibari Centre at 18–20 Byron Road, Wealdstone, Harrow HA3 7ST is now ours and is being refurbished. We are grateful to every member and donor whose support has made this possible."
    ],
    more: { label: "Our story, history & the Kalibari Centre", href: "about.html" }
  },

  /* ---------- Contact ---------- */
  contact: {
    eyebrow: "Location",
    title: "Join Us",
    email: "kalibarilondon@gmail.com",
    phones: ["+44 20 8907 5946"],
    social: [
      { icon: "web", label: "londonkalibari.co.uk", link: "https://londonkalibari.co.uk/" }
    ],
    more: { label: "All contact details", href: "contact.html" }
  },

  /* ---------- Footer ---------- */
  footer: {
    copyright: "London Kalibari",
    disclaimer: "We may upload photos / videos taken at the Kali Puja event to this website. If you do not wish to appear, please contact us and the content will be removed promptly. To protect the privacy of individuals and children, no one will be identified without written approval."
  }
};
