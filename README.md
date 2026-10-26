# Kali Puja website

Single-page static site for the community Kali Puja, styled after kalimandir.org and built like the
`saraswatipuja` site. It needs no build step and runs on GitHub Pages as it is.

## Updating the site

**All content lives in [`config.js`](config.js).** You don't need to touch the HTML, CSS or JS.

Each year, usually only these change:

| What | Where in `config.js` |
|---|---|
| Date / countdown | `event.start`, `event.end` (ISO with timezone, e.g. `2026-11-07T18:00:00+00:00`) |
| Date text shown | `event.dayLabel`, `event.dateLabel`, `event.timeLabel` |
| Venue | `event.venueName`, `event.venueAddress`, `event.mapLink`, `event.mapEmbed` |
| Programme | `schedule.items` |
| Past year photo links | `gallery.years` (section is hidden while empty) |

Other options:

- **Show/hide/reorder sections:** edit the `sections` array.
- **Hero photo:** put an image in `assets/images/` and set `hero.backgroundImage`.
- Text fields accept simple HTML (`<b>`, `<i>`, `<br>`, `<a>`).

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
3. Optional custom domain: add a `CNAME` file containing the domain, e.g. `www.watfordkalipuja.co.uk`.

## Structure

```
index.html          page shell (rarely needs editing)
config.js           ALL site content
assets/css/style.css
assets/js/app.js    renders sections from config.js, countdown, nav, calendar
assets/images/      optional photos
.nojekyll           tells GitHub Pages to serve files as-is
```
