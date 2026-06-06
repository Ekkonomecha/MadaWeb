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
├── characters/                      The 6 curriculum-pillar mascots (official art, 625×625 PNG, transparent)
│   ├── brushi.png                   🎨 Creativity & Art      (salmon tint)
│   ├── ratio.png                    🔢 Logic & Math          (blue tint)
│   ├── lingo.png                    🗣️ Languages & Phonics   (purple tint)
│   ├── akktiv.png                   ⚡ Physical & Movement   (yellow tint)
│   ├── cuddies.png                  ❤️ Emotional IQ          (pale pink tint)
│   └── scopii.png                   🌿 Science & Discovery   (cyan tint)
├── stages/                          The 4 program age-stage face icons (625×625 PNG, transparent)
│   ├── infants.png                  3m – 1yr     (salmon tint)
│   ├── toddlers.png                 1yr – 2yr    (cyan tint)
│   ├── preschool.png                2yr – 3yr    (pale pink tint)
│   └── kindergarten.png             3yr – 5yr    (yellow tint)
└── media/
    ├── hero/                        Drop hero / banner photos here
    └── gallery/                     Drop gallery & section photos here
```

## Formats
- **Logo** — SVG is the source of truth (crisp at any size); PNG versions provided for rasters.
- **Characters** — official hand-illustrated PNGs with transparent backgrounds. On the site they sit inside a soft, color-tinted organic blob and are referenced by id, e.g. `/assets/characters/brushi.png`.

## Brand palette: yellow `#FFDA3B` · pink `#FF3B61` · salmon `#FE7163` ·
pale pink `#FFB3AF` · blue `#005CFF` · cyan `#64FFD5` · purple `#4628D3` ·
dark blue `#0A1240`.

## Adding photos
Drop real photography into `media/hero/` and `media/gallery/`, then swap the
Unsplash URLs in the pages for local paths, e.g.
`src="/assets/media/gallery/playtime.jpg"`. Use `.webp` where possible and keep
long edges ≤ 1600px for fast loads.
