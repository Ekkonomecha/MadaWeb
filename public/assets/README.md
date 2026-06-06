# Mada — Website Assets

All files here are served statically by Next.js. A file at
`public/assets/logo/mada-logo.svg` is available in the browser at
`/assets/logo/mada-logo.svg` and in JSX as `<img src="/assets/logo/mada-logo.svg" />`.

```
public/assets/
├── logo/
│   ├── mada-logo.svg / .png         Full lockup (mark + wordmark + tagline) — light bg
│   ├── mada-logo-light.svg / .png   Full lockup for dark backgrounds
│   ├── mada-mark.svg / .png         Icon only (yellow blob + "m")
├── characters/                      The 6 curriculum-pillar mascots
│   ├── brushi.svg / .png            🎨 Creativity & Art      (salmon)
│   ├── ratio.svg / .png             🔢 Logic & Math          (blue)
│   ├── lingo.svg / .png             🗣️ Languages & Phonics   (purple)
│   ├── akktiv.svg / .png            ⚡ Physical & Movement   (yellow)
│   ├── cuddies.svg / .png           ❤️ Emotional IQ          (pale pink)
│   └── scopii.svg / .png            🌿 Science & Discovery   (cyan)
└── media/
    ├── hero/                        Drop hero / banner photos here
    └── gallery/                     Drop gallery & section photos here
```

## Formats
- **SVG** is the source of truth for the logo and characters — crisp at any size, tiny file. Prefer it on the web.
- **PNG** versions (500×500 for characters, transparent background) are provided for places that need a raster (social cards, email, slide decks).

## Regenerating
The logo SVGs are hand-authored. The character SVGs + all PNGs are generated:

```bash
node scripts/gen-characters.mjs   # rebuilds character svg + png
```

Brand palette: yellow `#FFDA3B` · pink `#FF3B61` · salmon `#FE7163` ·
pale pink `#FFB3AF` · blue `#005CFF` · cyan `#64FFD5` · purple `#4628D3` ·
dark blue `#0A1240`.

## Adding photos
Drop real photography into `media/hero/` and `media/gallery/`, then swap the
Unsplash URLs in the pages for local paths, e.g.
`src="/assets/media/gallery/playtime.jpg"`. Use `.webp` where possible and keep
long edges ≤ 1600px for fast loads.
