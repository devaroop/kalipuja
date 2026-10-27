# Kali Puja website

Single-page static site for the **London Kalibari** Kali Puja. The layout draws on kalimandir.org, and the logo,
colours and fonts follow the LKB brand. It needs no build step and runs on GitHub Pages as it is.

Live: https://devaroop.github.io/kalipuja/

## Updating the site

**All content lives in [`config.js`](config.js).** You don't need to touch the HTML, CSS or JS.

Each year, usually only these change:

| What | Where in `config.js` |
|---|---|
| Date / countdown | `event.start`, `event.end` (ISO with timezone, e.g. `2026-11-08T18:30:00+00:00`) |
| Date text shown | `event.dayLabel`, `event.dateLabel`, `event.timeLabel` |
| Venue | `event.venueName`, `event.venueAddress`, `event.mapLink`, `event.mapEmbed` |
| Programme | `schedule.items` |
| Past year photo links | `gallery.years` (section is hidden while empty) |

Other options:

- **Show/hide/reorder sections:** edit the `sections` array.
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
3. Optional custom domain: add a `CNAME` file containing the domain, e.g. `kalipuja.londonkalibari.org`.

## Structure

```
index.html          page shell (rarely needs editing)
config.js           ALL site content
assets/css/style.css
assets/js/app.js    renders sections from config.js, countdown, nav, calendar
assets/fonts/       brand fonts + licences
assets/images/      logos, favicon, optional photos
.nojekyll           tells GitHub Pages to serve files as-is
```
