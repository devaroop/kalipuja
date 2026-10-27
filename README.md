# Kali Puja website

Static site for **London Kalibari**: the annual Kali Puja home page plus sub pages holding all the
content imported from the old WordPress site (londonkalibari.org). The layout draws on kalimandir.org, and the logo,
colours and fonts follow the LKB brand. It needs no build step and runs on GitHub Pages as it is.

Live: https://londonkalibari.co.uk/

## Pages

| Page | Content file |
|---|---|
| `index.html` — Kali Puja home page (countdown, schedule, venue) | `config.js` |
| `events.html` — upcoming events, archive of 88 events since 2008 (filter by category), venues | `content/events.js` |
| `event.html?e=<slug>` — one event: notice, photos, videos, files | `content/events.js` |
| `about.html` — who we are, aims, history, the Kalibari Centre, community centre project, associated organisations | `content/pages.js` |
| `newsletters.html` — Kalibari Newsletter archive 2013–2024 | `content/newsletters.js` |
| `contact.html` — registered office, centre, phone, email, map | `content/pages.js` |

The top menu and footer links for every page come from `nav` in `config.js`.

Imported media lives in `assets/media/` (`events/` photos, `video/`, `files/`, `newsletters/`, `centre/`).
Larger videos stay on London Kalibari's Amazon S3 and are streamed from there.

## Updating the site

**All content lives in [`config.js`](config.js) and [`content/`](content/).** You don't need to touch the HTML, CSS or JS.

Each year, usually only these change:

| What | Where in `config.js` |
|---|---|
| Date / countdown | `event.start`, `event.end` (ISO with timezone, e.g. `2026-11-08T18:30:00+00:00`) |
| Date text shown | `event.dayLabel`, `event.dateLabel`, `event.timeLabel` |
| Venue | `event.venueName`, `event.venueAddress`, `event.mapLink`, `event.mapEmbed` |
| Programme | `schedule.items` |
| Past year photo links | `gallery.years` (section is hidden while empty) |

Other options:

- **Show/hide/reorder home page sections:** edit the `sections` array.
- **Add an event:** add an entry at the top of `events` in `content/events.js` (photos go in `assets/media/events/`).
- **Add a newsletter:** put the file in `assets/media/newsletters/` and add it at the top of `content/newsletters.js`.
- **Past Celebrations** on the home page lists past Kali Pujas from the event archive automatically.
- **Hero photo:** put an image in `assets/images/` and set `hero.backgroundImage`.
- **Logo:** `logo` (the circular LKB logo is also used as the favicon).
- Text fields accept simple HTML (`<b>`, `<i>`, `<br>`, `<a>`).

## Brand

- Colours (LKB logo): red `#C32126`, black `#010101`, greys `#555554` / `#A7A6A6`, white. See `:root` in `style.css`.
- Fonts (self-hosted in `assets/fonts/`, SIL Open Font License): **Archivo Black** for headings,
  **Glacial Indifference** for labels and navigation, and **Open Sauce Sans** for body text.
- Logos: `assets/images/lkb-logo.png` (circular) and `assets/images/lkb-wordmark.png` (horizontal),
  both exported from `LKB.pdf`.

The countdown changes to `event.liveMessage` when the puja starts, and to `event.pastMessage` after `event.end`.
The **Add to Calendar** button downloads an `.ics` file built from the event details.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**, select **Deploy from a branch**, then choose `master` (or `main`) and `/ (root)`.
3. Optional custom domain: add a `CNAME` file containing the domain, currently `londonkalibari.co.uk`.

## Structure

```
index.html          home page shell (rarely needs editing)
*.html              sub page shells (about, contact, events, event, newsletters)
config.js           home page content, menu, footer
content/            sub page content (events, pages, newsletters)
assets/css/style.css
assets/js/common.js shared header, menu, footer, helpers
assets/js/app.js    home page sections, countdown, calendar
assets/js/pages.js  sub page renderers
assets/media/       imported photos, videos, files, newsletters
assets/fonts/       brand fonts + licences
assets/images/      logos, favicon, optional photos
.nojekyll           tells GitHub Pages to serve files as-is
```
