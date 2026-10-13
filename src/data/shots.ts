import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

// Real screenshots under src/assets/work/<project>/<surface>/, named <shot>-<lang>-<theme>.png.
// A product in one language only (Warbly, Meetnal) drops the language: <shot>-<theme>.png. Captures that
// change with neither (a signage screen) are plain <shot>.png; photos the user sent stay .jpg.
const files = import.meta.glob<ImageMetadata>('../assets/work/**/*.{png,jpg}', { eager: true, import: 'default' });
const get = (path: string) => files[`../assets/work/${path}.png`] ?? files[`../assets/work/${path}.jpg`];

export interface ShotImages {
  light: ImageMetadata;
  /** Missing when the product itself has no dark mode; the page dims the light capture instead. */
  dark?: ImageMetadata;
}

export function resolveShot(key: string, lang: Lang): ShotImages {
  const light = get(`${key}-${lang}-light`) ?? get(`${key}-light`) ?? get(key);
  if (!light) throw new Error(`Missing screenshot: ${key} (${lang})`);
  return { light, dark: get(`${key}-${lang}-dark`) ?? get(`${key}-dark`) ?? (get(key) ? light : undefined) };
}
