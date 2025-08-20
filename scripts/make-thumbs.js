// npm run thumbs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC = 'public/images/skladanie';
const OUT = path.join(SRC, 'thumbs'); // public/images/skladanie/thumbs
const widths = [360, 720]; // 2 rozmiary na srcset

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

for (const f of files) {
  const src = path.join(SRC, f);
  const base = path.parse(f).name; // "1" z "1.webp"
  for (const w of widths) {
    const outWebp = path.join(OUT, `${base}-${w}.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(outWebp);
    console.log('ok', outWebp);
  }
}
console.log('DONE');
