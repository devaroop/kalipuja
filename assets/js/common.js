/*
 * Shared page chrome for every page: navigation, footer, favicon,
 * preloader and scroll effects, plus small HTML helpers.
 * Exposes window.LKB for app.js (home page) and pages.js (sub pages).
 */
(function () {
  "use strict";

  var S = window.SITE;

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
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var ICONS = {
    facebook:  '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
    youtube:   '<svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>',
    email:     '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    phone:     '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.3 1l-2.2 2.2z"/></svg>',
    web:       '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.4 1.1-2.8 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.4-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 0 1-4.3 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4z"/></svg>',
    pin:       '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>',
    calendar:  '<svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10z"/></svg>',
    clock:     '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.5 2.1-.8 1.3L11 13V7h2v5.4z"/></svg>',
    file:      '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM12 18l-4-4h2.5v-4h3v4H16l-4 4z"/></svg>'
  };

  /* Navigation helpers
  -------------------------------------------------------------------*/
  var page = (location.pathname.split("/").pop() || "index.html");
  var onHome = page === "index.html";

  /* On the home page, "index.html#x" links become plain "#x" anchors. */
  function navHref(href) {
    return onHome && href.indexOf("index.html#") === 0 ? href.slice(10) : href;
  }

  /*
   * chrome(opts) renders the header, footer and behaviours.
   *   opts.title      document title (optional)
   *   opts.navKey     href of the nav item to mark active (sub pages)
   *   opts.spy        section ids to scroll-spy (home page)
   */
  function chrome(opts) {
    opts = opts || {};
    if (opts.title) document.title = opts.title;
    var desc = $('meta[name="description"]');
    if (desc && !desc.getAttribute("content")) desc.setAttribute("content", S.description);
    $("#main-menu .brand").setAttribute("href", onHome ? "#home" : "index.html");
    $("#main-menu .brand").innerHTML = (S.logo ? '<img src="' + S.logo + '" alt="">' : "") + "<span>" + (S.logoText || S.name) + "</span>";
    if (S.logo) $('link[rel="icon"]').setAttribute("href", S.logo);

    $("#headernavigation").innerHTML = S.nav.map(function (n) {
      var cls = !onHome && n.href === opts.navKey ? ' class="active"' : "";
      return '<li><a href="' + navHref(n.href) + '"' + cls + ">" + n.label + "</a></li>";
    }).join("");

    var year = new Date(S.event.start).getFullYear();
    $("#footer-section").innerHTML =
      '<ul class="footer-links">' + S.nav.map(function (n) {
        return '<li><a href="' + navHref(n.href) + '">' + n.label + "</a></li>";
      }).join("") + "</ul>" +
      '<p class="copyright">&copy; ' + S.footer.copyright + " " + year + ". All rights reserved." +
        (S.charity ? "<br>" + S.charity : "") + "</p>" +
      '<p class="disclaimer">' + S.footer.disclaimer + "</p>";

    /* Mobile toggle and solid header on scroll */
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
      if (opts.spy) {
        var links = {};
        $$("#headernavigation a").forEach(function (a) {
          var h = a.getAttribute("href");
          if (h.charAt(0) === "#") links[h.slice(1)] = a;
        });
        var spy = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting || !links[en.target.id]) return;
            $$("#headernavigation a").forEach(function (a) { a.classList.remove("active"); });
            links[en.target.id].classList.add("active");
          });
        }, { rootMargin: "-45% 0px -50% 0px" });
        opts.spy.forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
      }

      /* Reveal on scroll */
      var reveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); } });
      }, { threshold: 0.05 });
      $$(".section-style .container").forEach(function (el) { el.classList.add("reveal"); reveal.observe(el); });
    }

    /* Preloader: the home page waits for its fonts and images; sub pages
       (which can hold many photos) only for the first paint. */
    function hidePreloader() { $("#preloader").classList.add("done"); }
    if (onHome) {
      window.addEventListener("load", hidePreloader);
      setTimeout(hidePreloader, 2500);
    } else {
      requestAnimationFrame(function () { setTimeout(hidePreloader, 150); });
    }
  }

  window.LKB = { $: $, $$: $$, paras: paras, heading: heading, section: section, esc: esc, ICONS: ICONS, chrome: chrome };
})();
