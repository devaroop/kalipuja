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
  name: "Watford Kali Puja",
  tagline: "Shyama Puja · Deepavali · Amavasya Night",
  description: "Annual community Kali Puja celebration in Watford, Hertfordshire, UK.",
  logoText: "Kali Puja",          // shown in the top navigation bar

  /* Section order (and which sections are shown). */
  sections: ["home", "about", "schedule", "highlights", "gallery", "aboutus", "contact"],

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
    start: "2026-11-07T18:00:00+00:00",
    end:   "2026-11-08T01:00:00+00:00",
    dayLabel:  "Saturday",
    dateLabel: "7 November 2026",
    timeLabel: "6:00 PM till late",
    venueName: "Holywell Community Centre",
    venueAddress: "Chaffinch Lane, Watford, WD18 9QD",
    mapLink: "https://goo.gl/maps/FA3UQkF9L6CYUjqB6",
    // Optional embedded map. Leave empty to hide.
    mapEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=-0.4245%2C51.6450%2C-0.4105%2C51.6520&layer=mapnik",
    highlightNote: "Free entry · Free parking · Bhog for all",
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
      { time: "06:00 PM",            event: "Doors open · Puja preparation" },
      { time: "06:30 PM - 07:30 PM", event: "Diya lighting & Rangoli" },
      { time: "07:30 PM - 08:30 PM", event: "Cultural programme & Shyama Sangeet" },
      { time: "08:30 PM - 09:30 PM", event: "Bhog distribution (Khichuri, Labra, Payesh)" },
      { time: "09:30 PM - 11:30 PM", event: "Kali Puja (Nishi Puja)" },
      { time: "11:30 PM - 12:00 AM", event: "Pushpanjali & Aarti" },
      { time: "12:00 AM onwards",    event: "Prasad distribution & closure" }
    ]
  },

  /* ---------- Highlights (cards) ---------- */
  highlights: {
    eyebrow: "Celebrate",
    title: "On the Night",
    items: [
      { icon: "🪔", title: "Deepavali Lights",  text: "Hundreds of diyas lit together to welcome the Mother on the darkest night of the year." },
      { icon: "🌺", title: "Pushpanjali",       text: "Offer red hibiscus flowers to Maa Kali with the traditional anjali mantras." },
      { icon: "🎶", title: "Shyama Sangeet",    text: "Devotional songs of Ramprasad and Kamalakanta, sung by our community." },
      { icon: "🍛", title: "Bhog for All",      text: "Freshly cooked bhog served to every guest, free of charge." }
    ]
  },

  /* ---------- Past years / gallery ---------- */
  gallery: {
    eyebrow: "Memories",
    title: "Past Celebrations",
    text: "Photos and videos from previous years.",
    years: [
      // { year: "2025", link: "https://drive.google.com/..." }
    ]
  },

  /* ---------- About us ---------- */
  aboutUs: {
    eyebrow: "About Us",
    title: "Who We Are",
    paragraphs: [
      "We are a group of families from the Indian community living in Hertfordshire and its surroundings, the same community that brings you the Watford Saraswati Puja.",
      "Our aim is to provide a forum to come together and celebrate our cultural, religious, artistic and social heritage; to promote multiculturalism; and to pass our traditions on to the next generation.",
      "Everyone is welcome. If you would like to volunteer, perform, or contribute towards the puja, please get in touch."
    ]
  },

  /* ---------- Contact ---------- */
  contact: {
    eyebrow: "Location",
    title: "Join Us",
    email: "watfordsaraswatipuja@gmail.com",
    phones: ["(+44) 7930825516", "(+44) 7795104802"],
    social: [
      { icon: "facebook", label: "Like us on Facebook", link: "https://www.facebook.com/Saraswati-Puja-Watford-1627791004152250" }
    ]
  },

  /* ---------- Footer ---------- */
  footer: {
    copyright: "Watford Kali Puja",
    disclaimer: "We may upload photos / videos taken at the Kali Puja event to this website. If you do not wish to appear, please contact us and the content will be removed promptly. To protect the privacy of individuals and children, no one will be identified without written approval."
  }
};
