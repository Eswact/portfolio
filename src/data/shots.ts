import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

const files = import.meta.glob<ImageMetadata>('../assets/work/**/*.{png,jpg}', { eager: true, import: 'default' });
const get = (path: string) => files[`../assets/work/${path}.png`] ?? files[`../assets/work/${path}.jpg`];

export interface ShotImages {
  light: ImageMetadata;
  dark?: ImageMetadata;
}

export function resolveShot(key: string, lang: Lang): ShotImages {
  const light = get(`${key}-${lang}-light`) ?? get(`${key}-light`) ?? get(key);
  if (!light) throw new Error(`Missing screenshot: ${key} (${lang})`);
  return { light, dark: get(`${key}-${lang}-dark`) ?? get(`${key}-dark`) ?? (get(key) ? light : undefined) };
}
