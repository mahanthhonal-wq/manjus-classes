# Manju's Classes website

A responsive, single-page website draft for Manju's Classes in Mysuru.

## Files

This is a static site. The entry page is index.html; styles.css and script.js provide its design and interactions. No build step is required.

## Interactions

- Course cards can be filtered by pathway.
- Mobile navigation opens and closes from the menu button.
- The appearance control switches between light and dark palettes.
- Campus illustrations open in an image preview dialog.
- Scroll progress, reveal motion, and a back-to-top control respond to scrolling.
- Reduced-motion preferences are respected.

## Publish with GitHub Pages

The workflow in .github/workflows/deploy.yml deploys the root of the repository whenever code is pushed to main. For the first deployment, enable GitHub Pages in the repository's Settings > Pages and select GitHub Actions as the publishing source. GitHub Pages is available on the free plan for public repositories.

## Photos and branding

The site uses custom, student-free SVG illustrations for the classroom and exterior, clearly labeled as illustrations. Replace assets/classroom-illustration.svg and assets/building-illustration.svg with approved photos when available, and remove the illustration labels in index.html.

The palette follows the navy and gold colors visible in the institution listing. The small assets/mark.svg is a matching draft mark rather than a copy of the listing artwork.

## Content source

Institution name, location, address, phone number, offline mode, and exam categories were taken from the Justdial listing supplied by the institution. Confirm current batches, fees, and timings directly with the centre before publishing changes to those details.
