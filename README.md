# Portfolio

Personal portfolio for Josiah Yule, served from `docs/` via GitHub Pages at [www.josiahyule.ca](https://www.josiahyule.ca).

## Structure

- `docs/index.html` holds the whole site: hero, work, services, about, contact
- `docs/portfolio.css` / `docs/portfolio.js` hold the styles and behaviour. The page is fully readable with JavaScript off; the script only adds the header border, the current-section dot in the nav, and form validation.
- `docs/fonts/` holds self-hosted variable fonts: Newsreader (headings and text) and Martian Mono (labels, specs, buttons). Both are trimmed to the weight range the site uses.
- `docs/work/<id>/index.html` are redirect stubs for the retired case-study URLs. Each one sends old links to its project on the home page (for example `/work/logodesign/` goes to `/#claros`).

There is no build step. Everything is static and edited by hand.

## Design system

Colour tokens live at the top of `portfolio.css`, with a dark set under `prefers-color-scheme: dark`. Vermilion is the only accent and it has three jobs: things you can act on (the contact band, button hovers), things that are live (the dot in a spec sheet's Status row), and where you are (the dot beside the current nav link). Keep it to those jobs.

## Editing projects

Projects live in the `#work` section of `docs/index.html`. There are three layouts:

- `project--lead` is the three staffing sites, shown as a stack of browser frames with the text and spec sheet underneath.
- `project--split` puts an image beside the text. Add `project--flip` to swap sides.
- `project--card` is for projects without a screenshot. The two cards sit side by side inside `.pair` and carry a small diagram instead.

Every project ends with a `<dl class="spec">` spec sheet. Wrap a status in `<span class="live">` only when the project is public and running.

Screenshots should be WebP with an 800w and 1600w variant, matching the `srcset` shape used by the existing entries. Put them in a `<figure class="frame">` with a `frame__bar` naming the site.

The Claros seal (`claros-seal-640.webp`) is a transparent image used as a CSS mask, so the light and dark panels come from one file. `logo-cover.jpg` is the 3000px source it was cut from (it is a PNG despite the extension).

## Local preview

```sh
cd docs && python3 -m http.server 8000
```
