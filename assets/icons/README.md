# Profile technology logo sources

This directory holds **logo-only SVGs** and the generated `pack.json` registry for [Emblem](https://github.com/XDanfr/Emblem). It intentionally contains **no Material 3 Expressive shape geometry**.

- Simple Icons logos: CC0-1.0 contributions (trademarks remain with owners).
- CSS3 and C# logos: Devicon, MIT.
- `pack.json` maps every icon to its original SVG paths, dimensions, source and licence, in Emblem's `--icons` format.

## Generate the shape artwork with Emblem

From the profile repository with a local Emblem checkout alongside it:

```sh
# Build ../Emblem once:
(cd ../Emblem && npm ci && npm run build)

# Generate assets/emblems/*.svg using the actual Emblem renderer:
node scripts/render-emblems.mjs ../Emblem/dist/cli.js
```

The images under `assets/emblems/` are **generated outputs** (and therefore contain geometry rendered by Emblem). Only the brand icon sources here are intended to be geometry-free.
