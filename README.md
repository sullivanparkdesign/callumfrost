# callum frost.

The website for Vancouver actor Callum Frost: [www.callumfrost.com](https://www.callumfrost.com).
Designed and built by [Sullivan Park Design](https://sullivanparkdesign.com). Hosted on GitHub Pages.

Plain HTML, CSS and JavaScript: no build step and no dependencies.

## Pages

Page addresses match the old Squarespace site, so existing links and Google results keep working.

| Address | File |
| --- | --- |
| `/` | `index.html` |
| `/about` | `about.html` |
| `/resume` | `resume.html` (download + print; the PDF is `s/Callum-Resume.pdf`) |
| `/portfolio/` | `portfolio/index.html` (gallery) |
| `/portfolio/headshots`, `/portfolio/film-and-tv`, `/portfolio/theatre` | `portfolio/*.html` |
| `/newsies`, `/hsm`, `/aladdin` | theatre show galleries |
| `/media` | `media.html` |
| `/contact` | `contact.html` |
| anything else | `404.html` |

## Where to tweak things

- **Styles:** `assets/css/site.css` (colours, buttons, film-frame shadows, motion, photo viewer, resume print styles).
- **Behaviour:** `assets/js/site.js` (click-to-enlarge photo viewer with arrows, Esc and thumbnails; resume print button; home hero timecode).
- **Photos:** `assets/img/`. Any element with `data-lb="N"` opens the viewer at photo N; each page lists its viewer photos in the `cf-photos` JSON block at the bottom.
- **New resume:** replace `s/Callum-Resume.pdf` (keep the same name) and update the text in `resume.html`.
- **Soft film reel shadow:** the `shade sh-reel` element on `index.html` and `contact.html` (`sh-strip` for the film strip, or delete it).

## SEO

Each page has its own title, description, canonical URL and social-share image. `sitemap.xml` lists every page for Google Search Console, and the home and about pages carry Person structured data.

## Domain

`CNAME` holds `www.callumfrost.com`. DNS (managed in Squarespace Domains): four A records for `@` pointing to GitHub Pages and a `www` CNAME to `sullivanparkdesign.github.io`.
