/*
 * Content for the About and Contact pages.
 * Imported word for word from londonkalibari.org in October 2026.
 * Each page is a list of sections: { id, eyebrow, title, html, photos?, bg? }
 * bg is one of "bg-dark" | "bg-red" | "bg-pattern".
 */
window.LKB_PAGES = {

  about: {
    eyebrow: "About Us",
    title: "London Kalibari",
    intro: "Meeting the cultural, spiritual and social needs of the Hindu community in London and the Home Counties since 1982.",
    sections: [
      {
        id: "who-we-are", eyebrow: "About", title: "Who Are We?", bg: "bg-dark",
        html:
          "<p>London Kalibari (LKB) is a registered charity (number 1158269) that exists to meet the cultural, spiritual and social needs of the Hindu Community living in London and the Home Counties. In existence since 1982, we organise social events throughout the year. Events include the Kabi Divas (to commemorate the Birthday of the poet Rabindranath Tagore), Netaji’s Birthday and Kalipuja/Diwali celebrations in late autumn. These events are supported by friends and well wishers from the wider local community.</p>"
      },
      {
        id: "aims", eyebrow: "The Future", title: "What Are London Kalibari’s Aims for the Future?", bg: "bg-red",
        html:
          "<p>The 30,000+ strong Bengali Hindu community in London is keen to realise the long-cherished dream of a Kali Bari that would also serve as a permanent congregation point for religious and cultural functions. The Kali Bari will have a venue for festivities including Bharatiya Divas (Republic Day) in January; Birthday celebrations of Netaji, Vivekanda, Rabindranath Tagore and Rishi Aurobindo at various times in the year; as well as the Kali Puja. Additionally, there are plans to have a school to teach Bengali and Rabindrasangeet. However, to fulfill this ambition we need your sustained and whole-hearted co-operation and would request you to pledge your time and support for this purpose.</p>"
      },
      {
        id: "history", eyebrow: "Since 1982", title: "London Kalibari History", bg: "bg-pattern",
        html:
          "<p>Back in the early 1980’s a group of first generation Hindu Bengalees from India found that there were no suitable facilities that met the social, cultural and spiritual needs of this community. This led to the drafting of a constitution for an organisation that would meet these needs – the London Kalibari organisation.</p>" +
          "<p>A public meeting was convened to discuss the aims and objectives of this organisation and a constitution was subsequently adopted. Following this, an Organisation Committee was formed according to the rules of the constitution. The Committee decided to apply to the Charity Commission for registration of the organisation and the Charity status was granted in 1982. Since then the organisation has been functioning democratically within the local community.</p>" +
          "<p>In 2012, London Kalibari obtained a property on rent to put our goddess Kali at 18 Byron Road, Wealdstone, Harrow. HA3 7ST. The Kalibari is kept closed except during Opening Times.</p>"
      },
      {
        id: "centre", eyebrow: "Our Home", title: "The London Kalibari Centre", bg: "bg-dark",
        html:
          "<p><b>We have established the London Kalibari Centre from 1 February 2012.</b> The address is: <b>18–20 Byron Road, Wealdstone, Harrow, HA3 7ST</b>. This place has a Hall (to accommodate 50 People), two small rooms, two toilets and a kitchen.</p>" +
          "<p><b>We are very happy to announce that we have been able to purchase the property where currently London Kalibari is located. It is undergoing refurbishment and soon will be open to the public. Thanks to all our members and donors for the overwhelming support.</b></p>" +
          "<h3>At the Centre</h3>" +
          "<ul><li>Monthly celebration of Full Moon (Purnima, Satyanarayan).</li>" +
          "<li>Monthly celebration of New Moon (Amabashya).</li>" +
          "<li>It is available for renting for meetings and small parties.</li></ul>" +
          "<p><b>Opening times:</b> Periodically</p>" +
          "<h3>Getting Here</h3>" +
          "<ul><li>Harrow Leisure Centre Car Park is free for the first three hours.</li>" +
          "<li>It is very close to Harrow and Wealdstone Bakerloo Line Tube station and also Overland train from Euston and Watford.</li>" +
          "<li>Bus Route: H9, H10, 182, 140, 186 etc from Wealdstone High Road.</li></ul>" +
          "<p>Read our <a href=\"newsletters.html\">Kalibari Newsletters</a>.</p>",
        photos: [
          "assets/media/centre/2018-11-1_IMG_7405.jpg",
          "assets/media/centre/2018-11-IMG-20181108-WA0020.jpg",
          "assets/media/centre/2018-11-22_IMG_7433.jpg"
        ],
        map: "https://www.openstreetmap.org/export/embed.html?bbox=-0.3382%2C51.5886%2C-0.3222%2C51.5967&layer=mapnik&marker=51.592674%2C-0.330199"
      },
      {
        id: "project", eyebrow: "Community Centre Project", title: "London Kalibari Community Centre Project", bg: "bg-red",
        html:
          "<p>There are no suitable premises for the Hindu Bengalee community in the West/North West London and the Home Counties which can accommodate the services that address its social, cultural and spiritual needs. The objective of the Kalibari Community Centre project is to develop a permanent Community Centre to provide this accommodation.</p>" +
          "<p>The project will support the following main activities:</p>" +
          "<ul><li>Social, spiritual and religious functions</li>" +
          "<li>Family counselling services</li>" +
          "<li>Music, dance, drama, art, literature and language classes</li>" +
          "<li>Yoga, meditation and self-improvement classes</li>" +
          "<li>Meeting facilities particularly for retired people and very young families</li></ul>" +
          "<p>Efforts are being made to obtain external funding, but a significant proportion of the money will have to be raised from the community. London Kalibari has a cash fund of around £50,000 and pledges of some £50,000 have been received from Kalibari members.</p>" +
          "<p>The premises will be available to other groups within the local community for their social, cultural, artistic and educational uses. The centre will facilitate and encourage cultural and spiritual exchanges between the Hindu Bengalee Community and the other communities in the locality and thus provide cultural and spiritual enrichment for the wider society.</p>"
      },
      {
        id: "associated", eyebrow: "Friends", title: "Associated Organisations", bg: "bg-pattern",
        html:
          "<div class=\"address-card\"><h4>Sri Aurobindo Society UK</h4>" +
          "<p>Registered Charity 1037254<br>149 Eastcote Lane<br>South Harrow<br>Middlesex<br>HA2 8RR<br>Tel: <a href=\"tel:+442084229920\">020 8422 9920</a></p></div>"
      }
    ]
  },

  contact: {
    eyebrow: "Contact",
    title: "Contact London Kalibari",
    intro: "We would love to hear from you.",
    sections: [
      {
        id: "details", eyebrow: "Get in Touch", title: "Contact Details", bg: "bg-dark",
        html:
          "<div class=\"address-grid\">" +
            "<div class=\"address-card\"><h4>Registered Office</h4><p>13 Kenton Gardens<br>Harrow<br>Middlesex<br>HA3 8DE</p></div>" +
            "<div class=\"address-card\"><h4>Kalibari Centre <small>(usually locked)</small></h4><p>18 Byron Road<br>Wealdstone<br>Harrow<br>HA3 7ST</p><p><b>Opening times:</b> Periodically</p></div>" +
            "<div class=\"address-card\"><h4>Telephone</h4><p>Mrs. Rama Choudhury<br><a href=\"tel:+442089075946\">+44 20 8907 5946</a></p></div>" +
            "<div class=\"address-card\"><h4>Email</h4><p><a href=\"mailto:kalibarilondon@gmail.com\">kalibarilondon@gmail.com</a></p></div>" +
          "</div>"
      },
      {
        id: "find-us", eyebrow: "Find Us", title: "The Kalibari Centre", bg: "bg-red",
        html:
          "<p>18–20 Byron Road, Wealdstone, Harrow, HA3 7ST. Very close to Harrow and Wealdstone station (Bakerloo Line, and Overland train from Euston and Watford). Bus routes H9, H10, 182, 140, 186 from Wealdstone High Road. Harrow Leisure Centre Car Park is free for the first three hours.</p>",
        map: "https://www.openstreetmap.org/export/embed.html?bbox=-0.3382%2C51.5886%2C-0.3222%2C51.5967&layer=mapnik&marker=51.592674%2C-0.330199"
      }
    ]
  }
};
