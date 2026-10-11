import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

// Real screenshots under src/assets/work/<project>/<surface>/, named <shot>-<lang>-<theme>.png.
// Captures that do not change with language or theme (a signage screen) are plain <shot>.png.
const files = import.meta.glob<ImageMetadata>('../assets/work/**/*.png', { eager: true, import: 'default' });
const get = (path: string) => files[`../assets/work/${path}.png`];

export interface ShotImages {
  light: ImageMetadata;
  /** Missing when the product itself has no dark mode; the page dims the light capture instead. */
  dark?: ImageMetadata;
}

export function resolveShot(key: string, lang: Lang): ShotImages {
  const light = get(`${key}-${lang}-light`) ?? get(key);
  if (!light) throw new Error(`Missing screenshot: ${key} (${lang})`);
  return { light, dark: get(`${key}-${lang}-dark`) ?? (get(key) ? light : undefined) };
}
