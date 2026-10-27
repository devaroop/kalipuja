/*
 * Renders the sub pages. Which page is chosen by <body data-page="...">:
 *   about, contact      -> content/pages.js
 *   events, event       -> content/events.js   (event.html?e=<slug>)
 *   newsletters         -> content/newsletters.js
 * No content lives here — edit the files in content/ instead.
 */
(function () {
  "use strict";

  var S = window.SITE, L = window.LKB;
  var $ = L.$, $$ = L.$$, heading = L.heading, section = L.section, esc = L.esc, ICONS = L.ICONS;
  var pageKey = document.body.getAttribute("data-page");
  var A = window.LKB_EVENTS;

  /* Helpers
  -------------------------------------------------------------------*/
  function parseDate(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +(p[2] || 1)); }
  function longDate(iso) {
    return parseDate(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }
  function eventDates(e) {
    return longDate(e.date) + (e.endDate ? " – " + longDate(e.endDate) : "");
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  function mapsLink(parts) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(parts.join(", "));
  }
  function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function pageHero(eyebrow, title, intro) {
    return '<section id="top" class="page-hero">' +
             '<div class="container">' +
               '<h3 class="section-name"><span>' + eyebrow + "</span></h3>" +
               '<h1 class="page-title">' + title + "</h1>" +
               (intro ? '<p class="page-intro">' + intro + "</p>" : "") +
             "</div>" +
           "</section>";
  }
  function mapFrame(src) {
    return src ? '<div class="map page-map"><iframe title="Map" loading="lazy" src="' + src + '"></iframe></div>' : "";
  }
  function photoGrid(list) {
    return list && list.length ? '<div class="photo-grid">' + list.map(function (src, i) {
      var cap = typeof src === "object" ? src.caption : "";
      src = typeof src === "object" ? src.src : src;
      return '<a class="photo" href="' + src + '" data-index="' + i + '"><img loading="lazy" src="' + src + '" alt="' + esc(cap || "") + '">' +
             (cap ? "<span>" + esc(cap) + "</span>" : "") + "</a>";
    }).join("") + "</div>" : "";
  }
  function fileSize(n) { return n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.round(n / 1024) + " KB"; }
  function venueOf(e) { return A.venues[e.venue] || null; }

  /* Lightbox for photo grids
  -------------------------------------------------------------------*/
  function lightbox() {
    var box = document.createElement("div");
    box.className = "lightbox"; box.hidden = true;
    box.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button>' +
                    '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
                    '<img alt=""><button class="lb-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(box);
    var img = $("img", box), group = [], idx = 0;
    function show(i) { idx = (i + group.length) % group.length; img.src = group[idx].getAttribute("href"); }
    function close() { box.hidden = true; img.src = ""; }
    $$(".photo-grid").forEach(function (grid) {
      var items = $$(".photo", grid);
      items.forEach(function (a, i) {
        a.addEventListener("click", function (ev) { ev.preventDefault(); group = items; box.hidden = false; show(i); });
      });
    });
    $(".lb-close", box).addEventListener("click", close);
    $(".lb-prev", box).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", box).addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (ev) { if (ev.target === box) close(); });
    document.addEventListener("keydown", function (ev) {
      if (box.hidden) return;
      if (ev.key === "Escape") close();
      if (ev.key === "ArrowLeft") show(idx - 1);
      if (ev.key === "ArrowRight") show(idx + 1);
    });
  }

  /* About / Contact: content/pages.js
  -------------------------------------------------------------------*/
  function renderContentPage(P, navKey) {
    var html = pageHero(P.eyebrow, P.title, P.intro);
    html += '<nav class="page-toc container" aria-label="On this page">' + P.sections.map(function (s) {
      return '<a href="#' + s.id + '">' + s.title + "</a>";
    }).join("") + "</nav>";
    html += P.sections.map(function (s) {
      return section(s.id,
        heading(s.eyebrow, s.title) +
        '<div class="prose">' + s.html + "</div>" +
        photoGrid(s.photos) + mapFrame(s.map),
        s.bg || "bg-dark");
    }).join("");
    $("#sections").innerHTML = html;
    L.chrome({ title: P.title + " · " + S.name, navKey: navKey });
  }

  /* Events list: content/events.js
  -------------------------------------------------------------------*/
  function eventCard(e) {
    var v = venueOf(e), d = parseDate(e.date), media = e.media || [];
    var photos = media.filter(function (m) { return m.type === "image"; }).length;
    var videos = media.length - photos;
    return '<li class="event-item" data-cats="' + e.categories.map(slugify).join(" ") + '">' +
      '<a href="event.html?e=' + e.slug + '">' +
        '<span class="ev-date"><b>' + d.getDate() + "</b>" +
          d.toLocaleDateString("en-GB", { month: "short" }) + "<i>" + d.getFullYear() + "</i></span>" +
        '<span class="event-main">' +
          '<span class="event-title">' + esc(e.title) + "</span>" +
          '<span class="event-meta">' + esc(e.time) + (v ? " · " + esc(v.name) : "") + "</span>" +
          '<span class="event-tags">' + e.categories.map(function (c) { return "<em>" + esc(c) + "</em>"; }).join("") +
            (photos ? '<em class="media">' + photos + " photo" + (photos > 1 ? "s" : "") + "</em>" : "") +
            (videos ? '<em class="media">' + videos + " video" + (videos > 1 ? "s" : "") + "</em>" : "") +
          "</span>" +
        "</span>" +
      "</a></li>";
  }

  function renderEvents() {
    var now = today();
    var upcoming = A.events.filter(function (e) { return (e.endDate || e.date) >= now; }).reverse();
    var past = A.events.filter(function (e) { return (e.endDate || e.date) < now; });
    var cats = {};
    A.events.forEach(function (e) { e.categories.forEach(function (c) { cats[c] = (cats[c] || 0) + 1; }); });

    var html = pageHero("Events", "Events & Celebrations",
      "Pujas, cultural evenings and community gatherings organised by London Kalibari since 2008.");

    html += section("upcoming", heading("What’s On", "Upcoming") +
      (upcoming.length ? upcoming.map(function (e) {
        var v = venueOf(e);
        return '<div class="feature-event">' +
          '<h3>' + esc(e.title) + "</h3>" +
          '<p class="event-line">' + ICONS.calendar + eventDates(e) + "</p>" +
          '<p class="event-line">' + ICONS.clock + esc(e.time) + "</p>" +
          (v ? '<p class="event-line">' + ICONS.pin + esc(v.name) + ", " + esc(v.address.join(", ")) + "</p>" : "") +
          '<p class="section-more">' +
            (e.current ? '<a class="btn btn-primary" href="index.html">Kali Puja ' + e.date.slice(0, 4) + " details</a> " : "") +
            '<a class="btn btn-ghost" href="event.html?e=' + e.slug + '">Event notice &rarr;</a></p>' +
        "</div>";
      }).join("") : '<p class="section-description">No upcoming events at the moment. Please check back soon.</p>'),
      "bg-red");

    var years = {};
    past.forEach(function (e) { var y = e.date.slice(0, 4); (years[y] = years[y] || []).push(e); });
    html += section("past", heading("Archive", "Past Events") +
      '<div class="filters" role="group" aria-label="Filter by category">' +
        '<button class="chip active" data-cat="">All <small>' + past.length + "</small></button>" +
        Object.keys(cats).sort().map(function (c) {
          return '<button class="chip" data-cat="' + slugify(c) + '">' + esc(c) + " <small>" + cats[c] + "</small></button>";
        }).join("") +
      "</div>" +
      Object.keys(years).sort().reverse().map(function (y) {
        return '<div class="year-group"><h3 class="year-heading">' + y + '</h3><ol class="event-list">' +
               years[y].map(eventCard).join("") + "</ol></div>";
      }).join(""),
      "bg-dark");

    var count = {};
    A.events.forEach(function (e) { count[e.venue] = (count[e.venue] || 0) + 1; });
    html += section("venues", heading("Where We Meet", "Venues") +
      '<div class="address-grid">' + Object.keys(A.venues).map(function (k) {
        var v = A.venues[k];
        return '<div class="address-card"><h4>' + esc(v.name) + "</h4><p>" + v.address.map(esc).join("<br>") + "</p>" +
               '<p class="card-foot"><a target="_blank" rel="noopener" href="' + mapsLink([v.name].concat(v.address)) + '">Map</a>' +
               (count[k] ? " · " + count[k] + " event" + (count[k] > 1 ? "s" : "") : "") + "</p></div>";
      }).join("") + "</div>",
      "bg-pattern");

    $("#sections").innerHTML = html;
    L.chrome({ title: "Events · " + S.name, navKey: "events.html" });

    /* Category filter */
    $$(".filters .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var c = chip.getAttribute("data-cat");
        $$(".filters .chip").forEach(function (x) { x.classList.toggle("active", x === chip); });
        $$(".event-item").forEach(function (li) {
          li.hidden = c && (" " + li.getAttribute("data-cats") + " ").indexOf(" " + c + " ") < 0;
        });
        $$(".year-group").forEach(function (g) { g.hidden = !$$(".event-item", g).some(function (li) { return !li.hidden; }); });
      });
    });
  }

  /* Single event: event.html?e=<slug>
  -------------------------------------------------------------------*/
  function renderEvent() {
    var slug = (location.search.match(/[?&]e=([^&]+)/) || [])[1];
    var i = -1;
    A.events.forEach(function (e, n) { if (e.slug === slug) i = n; });
    if (i < 0) {
      $("#sections").innerHTML = pageHero("Events", "Event not found",
        'Sorry, we couldn’t find that event. <a href="events.html">See all events</a>.');
      L.chrome({ title: "Event not found · " + S.name, navKey: "events.html" });
      return;
    }
    var e = A.events[i], v = venueOf(e), media = e.media || [];
    var photos = media.filter(function (m) { return m.type === "image"; });
    var videos = media.filter(function (m) { return m.type !== "image"; });
    var newer = A.events[i - 1], older = A.events[i + 1];

    var html = pageHero(e.categories.join(" · ") || "Event", esc(e.title), eventDates(e));

    html += section("details",
      '<div class="event-detail">' +
        '<aside class="event-facts">' +
          '<p class="event-line">' + ICONS.calendar + eventDates(e) + "</p>" +
          '<p class="event-line">' + ICONS.clock + esc(e.time) + "</p>" +
          (v ? '<p class="event-line">' + ICONS.pin + "<span><b>" + esc(v.name) + "</b><br>" + v.address.map(esc).join(", ") +
               '<br><a target="_blank" rel="noopener" href="' + mapsLink([v.name].concat(v.address)) + '">Open in Maps</a></span></p>' : "") +
          (e.current ? '<p><a class="btn btn-primary" href="index.html">Kali Puja ' + e.date.slice(0, 4) + " details</a></p>" : "") +
        "</aside>" +
        '<div class="prose">' + e.body +
          (e.files ? '<ul class="file-list">' + e.files.map(function (f) {
            return '<li><a href="' + f.href + '" target="_blank" rel="noopener">' + ICONS.file + esc(f.label) + "</a></li>";
          }).join("") + "</ul>" : "") +
        "</div>" +
      "</div>",
      "bg-dark");

    if (photos.length) html += section("photos", heading("Gallery", "Photos") + photoGrid(photos), "bg-red");
    if (videos.length) html += section("videos", heading("Watch", "Videos") +
      '<div class="video-grid">' + videos.map(function (m) {
        if (m.type === "youtube") {
          return '<div class="video"><iframe loading="lazy" title="' + esc(m.caption || e.title) + '" src="https://www.youtube-nocookie.com/embed/' + m.id +
                 '" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
        }
        return '<div class="video"><video controls preload="none" src="' + m.src + '"></video>' +
               '<a class="video-link" href="' + m.src + '" target="_blank" rel="noopener">Open video</a></div>';
      }).join("") + "</div>",
      photos.length ? "bg-dark" : "bg-red");

    html += '<nav class="event-pager container">' +
      (newer ? '<a href="event.html?e=' + newer.slug + '"><small>&larr; Newer</small>' + esc(newer.title) + "</a>" : "<span></span>") +
      '<a class="all" href="events.html">All events</a>' +
      (older ? '<a href="event.html?e=' + older.slug + '"><small>Older &rarr;</small>' + esc(older.title) + "</a>" : "<span></span>") +
    "</nav>";

    $("#sections").innerHTML = html;
    L.chrome({ title: e.title + " · " + S.name, navKey: "events.html" });
    lightbox();
  }

  /* Newsletters: content/newsletters.js
  -------------------------------------------------------------------*/
  function renderNewsletters() {
    var N = window.LKB_NEWSLETTERS, years = {};
    N.forEach(function (n) { var y = n.date.slice(0, 4); (years[y] = years[y] || []).push(n); });
    var html = pageHero("Newsletters", "Kalibari Newsletter", "News, reports and announcements from London Kalibari, 2013 – 2024.");
    html += section("issues", heading("Archive", "All Issues") +
      Object.keys(years).sort().reverse().map(function (y) {
        return '<div class="year-group"><h3 class="year-heading">' + y + '</h3><div class="address-grid">' +
          years[y].map(function (n) {
            return '<div class="address-card newsletter"><h4>' + esc(n.title) + "</h4>" +
              '<ul class="file-list">' + n.files.map(function (f) {
                return '<li><a href="' + f.href + '" target="_blank" rel="noopener">' + ICONS.file + esc(f.label) +
                       " <small>" + fileSize(f.size) + "</small></a></li>";
              }).join("") + "</ul></div>";
          }).join("") + "</div></div>";
      }).join(""),
      "bg-dark");
    $("#sections").innerHTML = html;
    L.chrome({ title: "Newsletters · " + S.name, navKey: "newsletters.html" });
  }

  /* Dispatch
  -------------------------------------------------------------------*/
  if (pageKey === "about") { renderContentPage(window.LKB_PAGES.about, "about.html"); lightbox(); }
  if (pageKey === "contact") renderContentPage(window.LKB_PAGES.contact, "contact.html");
  if (pageKey === "events") renderEvents();
  if (pageKey === "event") renderEvent();
  if (pageKey === "newsletters") renderNewsletters();
})();
