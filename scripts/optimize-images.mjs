/**
 * One-shot image optimizer.
 *
 * The logos shipped as full-resolution PNGs (1354x1161 and 2094x751) but
 * are displayed at 44px and 64px tall. That's ~490 KB of bytes for maybe
 * 12 KB of visible pixels, on every page load, on the critical path.
 *
 * This writes 1x/2x WebP (plus a PNG fallback) sized to what the layout
 * actually renders, into public/img/. Re-run it after adding new source
 * images to src/assets/raw/ or changing a target size.
 *
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "img");

/** Rendered CSS height per logo -> we emit 1x and 2x of that. */
const targets = [
  { src: "src/assets/img/footer-logo.png", name: "footer-logo", displayH: 64 },
  { src: "public/logo.png", name: "logo", displayH: 44 },
];

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

await mkdir(outDir, { recursive: true });

for (const t of targets) {
  const abs = path.join(root, t.src);
  if (!existsSync(abs)) {
    console.warn(`skip ${t.src} (missing)`);
    continue;
  }

  const before = (await stat(abs)).size;
  const meta = await sharp(abs).metadata();
  const ratio = meta.width / meta.height;

  for (const scale of [1, 2]) {
    const h = t.displayH * scale;
    const w = Math.round(h * ratio);
    const suffix = scale === 1 ? "" : `@${scale}x`;

    await sharp(abs)
      .resize({ width: w, height: h, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(path.join(outDir, `${t.name}${suffix}.webp`));

    await sharp(abs)
      .resize({ width: w, height: h, fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(outDir, `${t.name}${suffix}.png`));
  }

  const after = (await stat(path.join(outDir, `${t.name}@2x.webp`))).size;
  console.log(
    `${t.name}: ${kb(before)} -> ${kb(after)} (@2x webp)  ${(100 - (after / before) * 100).toFixed(1)}% smaller`
  );
}

console.log("\nwrote:", (await readdir(outDir)).join(", "));
