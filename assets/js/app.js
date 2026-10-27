/*
 * Renders the single-page site from window.SITE (config.js).
 * No content lives here — edit config.js instead.
 */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  /* Helpers
  -------------------------------------------------------------------*/
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function paras(list) {
    return (list || []).map(function (p) { return '<p class="section-description">' + p + "</p>"; }).join("");
  }
  function heading(eyebrow, title) {
    return '<h3 class="section-name"><span>' + eyebrow + '</span></h3>' +
           '<h2 class="section-title">' + title + "</h2>";
  }
  function section(id, inner, cls) {
    return '<section id="' + id + '" class="section-style ' + (cls || "") + '">' +
             '<div class="container">' + inner + "</div>" +
           "</section>";
  }

  var ICONS = {
    facebook:  '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
    youtube:   '<svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>',
    email:     '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    phone:     '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.3 1l-2.2 2.2z"/></svg>',
    web:       '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.4 1.1-2.8 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.4-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4z"/></svg>',
    pin:       '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'
  };

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
      label: "Home",
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
      label: "About Kali Puja",
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
      label: "Schedule",
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
      label: "Highlights",
      html: function () {
        var C = S.highlights;
        var cards = C.items.map(function (c) {
          return '<div class="card"><div class="card-icon">' + c.icon + "</div><h4>" + c.title + "</h4><p>" + c.text + "</p></div>";
        }).join("");
        return section("highlights", heading(C.eyebrow, C.title) + '<div class="cards">' + cards + "</div>", "bg-dark");
      }
    },

    gallery: {
      label: "Gallery",
      skip: function () { return !S.gallery.years.length; },
      html: function () {
        var C = S.gallery;
        var years = C.years.map(function (y) {
          return '<a class="year-chip" target="_blank" rel="noopener" href="' + y.link + '">' + y.year + "</a>";
        }).join("");
        return section("gallery", heading(C.eyebrow, C.title) + '<p class="section-description">' + C.text + "</p>" +
                       '<div class="years">' + years + "</div>", "bg-red");
      }
    },

    aboutus: {
      label: "About Us",
      html: function () {
        var C = S.aboutUs;
        return section("aboutus", heading(C.eyebrow, C.title) + paras(C.paragraphs), "bg-pattern");
      }
    },

    contact: {
      label: "Contact",
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
              (E.mapLink ? '<p><a class="btn btn-ghost" target="_blank" rel="noopener" href="' + E.mapLink + '">Open in Maps</a></p>' : "") +
              '<div class="contact-links">' + links.join("") + "</div>" +
            "</div>" +
            (E.mapEmbed ? '<div class="map"><iframe title="Venue map" loading="lazy" src="' + E.mapEmbed + '"></iframe></div>' : "") +
          "</div>" +
          (E.highlightNote ? '<p class="impinfo">' + E.highlightNote + "</p>" : ""),
          "bg-dark");
      }
    }
  };

  /* Build page
  -------------------------------------------------------------------*/
  document.title = (S.eventName ? S.eventName + " · " : "") + S.name + (E.dateLabel ? " · " + E.dateLabel : "");
  $('meta[name="description"]').setAttribute("content", S.description);
  $("#main-menu .brand").innerHTML = (S.logo ? '<img src="' + S.logo + '" alt="">' : "") + "<span>" + (S.logoText || S.name) + "</span>";
  if (S.logo) $('link[rel="icon"]').setAttribute("href", S.logo);

  var active = S.sections.filter(function (k) { return renderers[k] && !(renderers[k].skip && renderers[k].skip()); });
  $("#sections").innerHTML = active.map(function (k) { return renderers[k].html(); }).join("");
  $("#headernavigation").innerHTML = active.map(function (k) {
    return '<li><a href="#' + k + '">' + renderers[k].label + "</a></li>";
  }).join("");

  var year = new Date(E.start).getFullYear();
  $("#footer-section").innerHTML =
    '<p class="copyright">&copy; ' + S.footer.copyright + " " + year + ". All rights reserved." +
      (S.charity ? "<br>" + S.charity : "") + "</p>" +
    '<p class="disclaimer">' + S.footer.disclaimer + "</p>";

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

  /* Navigation: mobile toggle, solid on scroll, active link
  -------------------------------------------------------------------*/
  var header = $("#main-menu"), toggle = $(".nav-toggle");
  toggle.addEventListener("click", function () {
    var open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#headernavigation a").forEach(function (a) {
    a.addEventListener("click", function () { header.classList.remove("open"); toggle.setAttribute("aria-expanded", false); });
  });
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var links = {};
    $$("#headernavigation a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$("#headernavigation a").forEach(function (a) { a.classList.remove("active"); });
        if (links[en.target.id]) links[en.target.id].classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    active.forEach(function (k) { spy.observe(document.getElementById(k)); });

    /* Reveal on scroll */
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".section-style .container").forEach(function (el) { el.classList.add("reveal"); reveal.observe(el); });
  }

  /* Preloader
  -------------------------------------------------------------------*/
  window.addEventListener("load", function () { $("#preloader").classList.add("done"); });
  setTimeout(function () { $("#preloader").classList.add("done"); }, 2500);
})();
