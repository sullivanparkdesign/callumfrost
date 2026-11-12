# callum frost. 2.0

Redesign of [callumfrost.com](https://www.callumfrost.com) by [Sullivan Park Design](https://sullivanparkdesign.com).
Plain HTML, CSS and JavaScript: no build step and no dependencies, so it runs on GitHub Pages or any static host.

## Pages

| File | Page |
| --- | --- |
| `index.html` | home |
| `about.html` | about |
| `resume.html` | resume (download PDF + print) |
| `portfolio.html` | gallery |
| `headshots.html`, `film-and-tv.html`, `theatre.html` | gallery categories |
| `newsies.html`, `hsm.html`, `aladdin.html` | theatre show galleries |
| `media.html` | media / demo reel |
| `contact.html` | contact |

## Where to tweak things

- **Styles:** `assets/css/site.css` (colours, buttons, film-frame shadows, motion, photo viewer, print styles for the resume).
- **Behaviour:** `assets/js/site.js` (click-to-enlarge photo viewer with arrows, Esc and thumbnails; resume print button; the timecode on the home hero).
- **Photos:** `assets/img/`. Any image with a `data-lb="N"` attribute opens the viewer at photo N. Each page lists its viewer photos in the `cf-photos` JSON block at the bottom of the page.
- **Soft film reel shadow:** the `shade sh-reel` element on `index.html` and `contact.html`. Change `sh-reel` to `sh-strip` for the film strip, or delete the element to remove it.

## Turning on GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → Save.
The site appears at `https://<account>.github.io/<repo>/` after a minute or two.

## Before this goes live

1. Remove the `<meta name="robots" content="noindex, nofollow">` line from every page and delete `robots.txt`. They stop Google indexing this preview as a copy of the live site.
2. The resume "download pdf" button links to the PDF on callumfrost.com. If the site moves host, add the PDF to the repo and update the link in `resume.html`.
