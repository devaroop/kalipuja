/*
 * Renders the home page from window.SITE (config.js).
 * No content lives here — edit config.js instead.
 * Shared header/footer/helpers live in common.js.
 */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  var L = window.LKB, $ = L.$, $$ = L.$$, paras = L.paras, heading = L.heading, section = L.section, ICONS = L.ICONS;

  /* Optional "read more" button: { label, href } */
  function more(m) {
    return m ? '<p class="section-more"><a class="btn btn-ghost" href="' + m.href + '">' + m.label + " &rarr;</a></p>" : "";
  }

  /* Past Kali Pujas from the event archive (content/events.js), newest first, one per year. */
  function pastPujas() {
    var A = window.LKB_EVENTS, seen = {}, now = S.event.start.slice(0, 10);
    if (!A) return [];
    return A.events.filter(function (e) {
      var y = e.date.slice(0, 4);
      if (e.date >= now || !/^Kali Puj/i.test(e.title) || seen[y]) return false;
      return (seen[y] = true);
    }).map(function (e) { return { year: e.date.slice(0, 4), link: "event.html?e=" + e.slug }; });
  }

  /* Decorative yantra drawn behind the hero */
  function yantra() {
    var petals = "";
    for (var i = 0; i < 16; i++) {
      petals += '<ellipse cx="200" cy="72" rx="16" ry="42" transform="rotate(' + (i * 22.5) + ' 200 200)"/>';
    }
    return '<svg class="yantra" viewBox="0 0 400 400" aria-hidden="true">' +
             '<g fill="none" stroke="currentColor" stroke-width="1.2">' +
               '<circle cx="200" cy="200" r="190"/><circle cx="200" cy="200" r="180"/>' +
               '<g class="petals">' + petals + "</g>" +
               '<circle cx="200" cy="200" r="118"/>' +
               '<polygon points="200,90 295,255 105,255"/>' +
               '<polygon points="200,310 295,145 105,145"/>' +
               '<polygon points="200,120 270,240 130,240"/>' +
               '<circle cx="200" cy="200" r="6" fill="currentColor"/>' +
             "</g></svg>";
  }

  /* Section renderers
  -------------------------------------------------------------------*/
  var E = S.event, H = S.hero;

  var renderers = {
    home: {
      html: function () {
        var bg = H.backgroundImage ? ' style="background-image:url(\'' + H.backgroundImage + '\')"' : "";
        var units = [["days", "Days"], ["hours", "Hours"], ["minutes", "Minutes"], ["seconds", "Seconds"]];
        var diyas = "";
        for (var i = 0; i < 9; i++) diyas += '<div class="diya" style="animation-delay:' + (i * 0.17).toFixed(2) + 's"><span class="flame"></span></div>';

        return '<section id="home" class="hero"' + bg + ">" +
          yantra() +
          '<div class="container">' +
            (S.logo ? '<img class="hero-logo" src="' + S.logo + '" alt="' + S.name + ' logo">' : "") +
            '<p class="mantra">' + H.mantra.join("<br>") + "</p>" +
            '<h1 class="site-title">' + (S.eventName || S.name) + "<small>" + S.name + "</small></h1>" +
            '<p class="tagline">' + S.tagline + "</p>" +
            '<div class="event-date">' +
              "<span>" + E.dayLabel + "</span>" +
              "<strong>" + E.dateLabel + "</strong>" +
              "<span>" + E.timeLabel + "</span>" +
            "</div>" +
            '<div id="time_countdown" class="time-count-container">' +
              units.map(function (u) {
                return '<div class="time-box"><span class="time-number" data-unit="' + u[0] + '">00</span>' +
                       '<span class="time-name">' + u[1] + "</span></div>";
              }).join("") +
            "</div>" +
            '<p id="countdown-message" class="countdown-message" hidden></p>' +
            '<div class="hero-actions">' +
              '<a class="btn btn-primary" href="#contact">Venue &amp; Directions</a>' +
              '<button class="btn btn-ghost" id="add-to-calendar" type="button">Add to Calendar</button>' +
            "</div>" +
            (H.quote ? '<blockquote class="hero-quote">“' + H.quote + '”<cite>— ' + H.quoteAuthor + "</cite></blockquote>" : "") +
          "</div>" +
          '<div class="diya-row" aria-hidden="true">' + diyas + "</div>" +
          '<a class="next-section" href="#about" aria-label="Next section"><span></span></a>' +
        "</section>";
      }
    },

    about: {
      html: function () {
        var A = S.about;
        return section("about",
          heading(A.eyebrow, A.title) + paras(A.paragraphs) +
          (A.prayer ? '<div class="prayer"><h4>' + A.prayerTitle + "</h4><p>" + A.prayer + "</p>" +
                      (A.prayerTranslation ? '<p class="translation">' + A.prayerTranslation + "</p>" : "") + "</div>" : ""),
          "bg-dark");
      }
    },

    schedule: {
      html: function () {
        var C = S.schedule;
        var rows = C.items.map(function (r) {
          return "<li><span class='slot'>" + r.time + "</span><span class='what'>" + r.event + "</span></li>";
        }).join("");
        return section("schedule",
          heading(C.eyebrow, C.title) +
          '<p class="section-sub">' + E.dayLabel + ", " + E.dateLabel + "</p>" +
          '<ol class="timeline">' + rows + "</ol>" +
          (C.note ? '<p class="note">' + C.note + "</p>" : ""),
          "bg-red");
      }
    },

    highlights: {
      html: function () {
        var C = S.highlights;
        var cards = C.items.map(function (c) {
          return '<div class="card"><div class="card-icon">' + c.icon + "</div><h4>" + c.title + "</h4><p>" + c.text + "</p></div>";
        }).join("");
        return section("highlights", heading(C.eyebrow, C.title) + '<div class="cards">' + cards + "</div>", "bg-dark");
      }
    },

    gallery: {
      skip: function () { return !(S.gallery.years.length || pastPujas().length); },
      html: function () {
        var C = S.gallery;
        var list = C.years.length ? C.years : pastPujas();
        var years = list.map(function (y) {
          var ext = /^https?:/.test(y.link) ? ' target="_blank" rel="noopener"' : "";
          return '<a class="year-chip"' + ext + ' href="' + y.link + '">' + y.year + "</a>";
        }).join("");
        return section("gallery", heading(C.eyebrow, C.title) + '<p class="section-description">' + C.text + "</p>" +
                       '<div class="years">' + years + "</div>" + more(C.more), "bg-red");
      }
    },

    aboutus: {
      html: function () {
        var C = S.aboutUs;
        return section("aboutus", heading(C.eyebrow, C.title) + paras(C.paragraphs) + more(C.more), "bg-pattern");
      }
    },

    contact: {
      html: function () {
        var C = S.contact;
        var links = [];
        if (C.email) links.push('<a href="mailto:' + C.email + '">' + ICONS.email + C.email + "</a>");
        (C.phones || []).forEach(function (p) {
          links.push('<a href="tel:' + p.replace(/[^\d+]/g, "") + '">' + ICONS.phone + p + "</a>");
        });
        (C.social || []).forEach(function (s) {
          links.push('<a target="_blank" rel="noopener" href="' + s.link + '">' + (ICONS[s.icon] || "") + s.label + "</a>");
        });
        return section("contact",
          heading(C.eyebrow, C.title) +
          '<div class="contact-grid">' +
            '<div class="venue">' +
              "<h4>" + ICONS.pin + E.venueName + "</h4>" +
              "<p>" + E.venueAddress + "</p>" +
              "<p>" + E.dayLabel + ", " + E.dateLabel + "<br>" + E.timeLabel + "</p>" +
              (E.notes ? '<ul class="venue-notes">' + E.notes.map(function (n) { return "<li>" + n + "</li>"; }).join("") + "</ul>" : "") +
              (E.mapLink ? '<p><a class="btn btn-ghost" target="_blank" rel="noopener" href="' + E.mapLink + '">Open in Maps</a></p>' : "") +
              '<div class="contact-links">' + links.join("") + "</div>" +
            "</div>" +
            (E.mapEmbed ? '<div class="map"><iframe title="Venue map" loading="lazy" src="' + E.mapEmbed + '"></iframe></div>' : "") +
          "</div>" +
          (E.highlightNote ? '<p class="impinfo">' + E.highlightNote + "</p>" : "") + more(C.more),
          "bg-dark");
      }
    }
  };

  /* Build page
  -------------------------------------------------------------------*/
  var active = S.sections.filter(function (k) { return renderers[k] && !(renderers[k].skip && renderers[k].skip()); });
  $("#sections").innerHTML = active.map(function (k) { return renderers[k].html(); }).join("");
  L.chrome({
    title: (S.eventName ? S.eventName + " \u00b7 " : "") + S.name + (E.dateLabel ? " \u00b7 " + E.dateLabel : ""),
    spy: active
  });
  var year = new Date(E.start).getFullYear();

  /* Countdown
  -------------------------------------------------------------------*/
  var start = new Date(E.start).getTime();
  var end = E.end ? new Date(E.end).getTime() : start + 6 * 3600 * 1000;
  var numbers = {};
  $$("#time_countdown .time-number").forEach(function (el) { numbers[el.getAttribute("data-unit")] = el; });

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var now = Date.now(), diff = start - now;
    if (diff <= 0) {
      $("#time_countdown").hidden = true;
      var msg = $("#countdown-message");
      msg.hidden = false;
      msg.innerHTML = now < end ? E.liveMessage : E.pastMessage;
      return false;
    }
    var s = Math.floor(diff / 1000);
    numbers.days.textContent = pad(Math.floor(s / 86400));
    numbers.hours.textContent = pad(Math.floor(s % 86400 / 3600));
    numbers.minutes.textContent = pad(Math.floor(s % 3600 / 60));
    numbers.seconds.textContent = pad(s % 60);
    return true;
  }
  if (numbers.days && tick()) {
    var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000);
  }

  /* Add to calendar (.ics download)
  -------------------------------------------------------------------*/
  var calBtn = $("#add-to-calendar");
  if (calBtn) calBtn.addEventListener("click", function () {
    function ics(t) { return new Date(t).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
    var body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//" + S.name + "//EN", "BEGIN:VEVENT",
      "UID:" + ics(start) + "@" + location.hostname,
      "DTSTAMP:" + ics(Date.now()),
      "DTSTART:" + ics(start), "DTEND:" + ics(end),
      "SUMMARY:" + (S.eventName ? S.eventName + " - " : "") + S.name,
      "LOCATION:" + (E.venueName + ", " + E.venueAddress).replace(/,/g, "\\,"),
      "DESCRIPTION:" + S.description + (E.mapLink ? "\\n" + E.mapLink : ""),
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    a.download = ((S.eventName ? S.eventName + " " : "") + S.name).replace(/\s+/g, "-").toLowerCase() + "-" + year + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
  });

})();
