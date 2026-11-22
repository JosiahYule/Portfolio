# Portfolio

Personal portfolio for Josiah Yule, served from `docs/` via GitHub Pages at [www.josiahyule.ca](https://www.josiahyule.ca).

## Structure

- `docs/index.html` holds the whole site: hero, work, services, about, contact
- `docs/portfolio.css` / `docs/portfolio.js` hold the styles and behaviour. The page is fully readable with JavaScript off; the script only sets the footer year and handles form validation and sending.
- `docs/fonts/` holds self-hosted variable fonts: Newsreader (headings and text) and Martian Mono (labels, specs, buttons). Both are trimmed to the weight range the site uses.
- `docs/work/<id>/index.html` are redirect stubs for the retired case-study URLs. Each one sends old links to its project on the home page (for example `/work/logodesign/` goes to `/#claros`).

There is no build step. Everything is static and edited by hand.

## Design system

The look is a quiet brutalism: one continuous sheet of paper ruled in ink, square corners, no shadows, no rounded pills, and links that fill in with ink on hover instead of fading.

Two typefaces, each with a job. Newsreader is the design voice (headings, names, paragraphs). Martian Mono is the build voice (labels, links, addresses, buttons). The hero says this out loud: "I design websites," is set in Newsreader and "then I build them." in Martian Mono.

The hero is a poster. "I design websites," is sized to run exactly edge to edge using container query units: `.hero > .wrap` is a size container, so `1cqi` is 1% of its width. The line is 6.565 times as wide as its font size, so `font-size: 15.2cqi` (100 / 6.565) fills it. **If you change the wording of that line, this number must change too.** Measure the new line's width at a font size of 100px in the browser, then use 100 / (width / 100). Phones use a slightly larger figure (15.7) because the typeface draws narrower letters at small sizes.

The page varies its scale on purpose: two large features (staffing, Claros), one brief (Westwood Hills), and Services set as one large sentence with small notes underneath.

Everything sits on one 12-column grid. Names and pictures sit on the left; every paragraph starts on column 7, so the text forms a single column down the page. The staffing gallery is the one element allowed off the grid: it runs to the right edge of the screen.

Colour tokens live at the top of `portfolio.css`, with a dark set under `prefers-color-scheme: dark`. The header and hero sit on a dark brown (`#2E2018`), the same in both themes. That block redefines the page's colour tokens for itself, so links and rules inside it need no extra styles. Vermilion is kept for the contact band, where you act. Keep it there.

## Editing projects

Projects live in the `#work` section of `docs/index.html`. Each is an `<article class="project">` with a `project__title` (the client's name), its pictures, and a `project__body` paragraph on the text column.

- Every screenshot is an `<a class="shot">` linking to the live site, with a `shot__tag` in its corner naming the address.
- `.gallery` is the three staffing sites: one large, two stacked, on a 1px ink grid.
- `.claros` puts the seal (light and dark) beside the site screenshot. `.wwhra` is a brief: a smaller screenshot with a smaller title (`project__title--brief`) and the text beside it.

Screenshots should be WebP with an 800w and 1600w variant, matching the `srcset` shape used by the staffing entries.

The Claros seal (`claros-seal-1400.webp`) is a transparent image used as a CSS mask, so the large dark panel and the small light detail come from one file. `logo-cover.jpg` is the 3000px source it was cut from (it is a PNG despite the extension). The headshot files are no longer shown on the page; `headshot-800.webp` is still referenced by the structured data in `<head>`.

## Local preview

```sh
cd docs && python3 -m http.server 8000
```
