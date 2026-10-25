import type { ImageMetadata } from 'astro';
import type { L10n } from '../i18n/ui';

const files = import.meta.glob<ImageMetadata>('../assets/me/*.jpg', { eager: true, import: 'default' });
const covers = import.meta.glob<ImageMetadata>('../assets/me/covers/*.{jpg,webp}', { eager: true, import: 'default' });

const cover = (name: string) => {
  const image = covers[`../assets/me/covers/${name}.jpg`] ?? covers[`../assets/me/covers/${name}.webp`];
  if (!image) throw new Error(`Missing cover: ${name}`);
  return image;
};

interface Photo {
  image: ImageMetadata;
  alt: L10n;
  focus?: string;
  caption?: string;
}

export interface Title {
  name: string | L10n;
  note: string | L10n;
  lang: 'en' | 'tr';
  cover: ImageMetadata;
  tag?: L10n;
}

interface Playlist {
  name: string;
  href: string;
  cover: ImageMetadata;
}

const photo = (file: string, alt: L10n, extra: Omit<Photo, 'image' | 'alt'> = {}): Photo => {
  const image = files[`../assets/me/${file}.jpg`];
  if (!image) throw new Error(`Missing photo: ${file}`);
  return { image, alt, ...extra };
};

export const photos: Photo[] = [
  photo('01', { tr: 'Bebekken beşikte, gülerken', en: 'As a baby in a crib, laughing' }, { focus: '72% 50%' }),
  photo('02', { tr: 'Gece bir terasta', en: 'On a terrace at night' }, { focus: '50% 44%' }),
  photo('03', { tr: 'Bir film karesi: kot ceketli bir adam kapının önünde', en: 'A film still: a man in a denim jacket by a door' }, { focus: '50% 30%', caption: 'literally me' }),
  photo('04', { tr: 'Bir fuarın girişinde, Ekim 2026', en: 'Outside a trade fair, October 2026' }, { focus: '50% 56%' }),
  photo('05', { tr: 'Kedi halıda sırtüstü', en: 'The cat lying on its back on a rug' }, { focus: '50% 18%' }),
];

export const films: Title[] = [
  { name: 'The Matrix', note: '1999', lang: 'en', cover: cover('matrix') },
  { name: 'The Prestige', note: '2006', lang: 'en', cover: cover('prestige') },
  { name: 'Good Will Hunting', note: '1997', lang: 'en', cover: cover('good-will-hunting') },
  { name: 'Se7en', note: '1995', lang: 'en', cover: cover('se7en') },
  { name: 'The Dark Knight', note: '2008', lang: 'en', cover: cover('the-dark-knight') },
];

export const series: Title[] = [
  { name: 'True Detective', note: '2014', tag: { tr: '1. sezon', en: 'Season 1' }, lang: 'en', cover: cover('true-detective') },
  { name: 'Cowboy Bebop', note: '1998', lang: 'en', cover: cover('cowboy-bebop') },
  { name: 'Brooklyn Nine-Nine', note: '2013', lang: 'en', cover: cover('brooklyn-nine-nine') },
  { name: 'Sherlock', note: '2010', lang: 'en', cover: cover('sherlock') },
  { name: 'The Bear', note: '2022', lang: 'en', cover: cover('the-bear') },
];

export const games: Title[] = [
  { name: 'Need for Speed: Most Wanted', note: '2005', lang: 'en', cover: cover('nfs-most-wanted') },
  { name: 'Rocket League', note: '2015', lang: 'en', cover: cover('rocket-league') },
  { name: 'Mount & Blade: Warband', note: '2010', lang: 'en', cover: cover('mount-and-blade-warband') },
  { name: 'Project Zomboid', note: '2013', lang: 'en', cover: cover('project-zomboid') },
  { name: 'Dying Light', note: '2015', lang: 'en', cover: cover('dying-light') },
];

export const birthday = '2001-12-23';

const playlist = (name: string, id: string): Playlist => ({
  name,
  href: `https://open.spotify.com/playlist/${id}`,
  cover: cover(`pl-${id}`),
});

export const playlists: Playlist[] = [
  playlist('Main', '17mkIk2JrPvSCFAUPYxgAW'),
  playlist('🌙', '63fpUl0W96cJxn5hjhJSzV'),
  playlist('⚡️', '66Kxm2soGo1VQb9LzAlGCO'),
  playlist('🌊', '5KxDZ6DxOqGU21csAFBr5Y'),
  playlist('🪩', '6oF9G6lAYiWKWKl29vYErK'),
];

export const brands = {
  instagram: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077',
  spotify: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  letterboxd: 'M8.224 14.352a4.447 4.447 0 0 1-3.775 2.092C1.992 16.444 0 14.454 0 12s1.992-4.444 4.45-4.444c1.592 0 2.988.836 3.774 2.092-.427.682-.673 1.488-.673 2.352s.246 1.67.673 2.352zM15.101 12c0-.864.247-1.67.674-2.352-.786-1.256-2.183-2.092-3.775-2.092s-2.989.836-3.775 2.092c.427.682.674 1.488.674 2.352s-.247 1.67-.674 2.352c.786 1.256 2.183 2.092 3.775 2.092s2.989-.836 3.775-2.092A4.42 4.42 0 0 1 15.1 12zm4.45-4.444a4.447 4.447 0 0 0-3.775 2.092c.427.682.673 1.488.673 2.352s-.246 1.67-.673 2.352a4.447 4.447 0 0 0 3.775 2.092C22.008 16.444 24 14.454 24 12s-1.992-4.444-4.45-4.444z',
  serializd: 'M1 12a11 11 0 1 0 22 0a11 11 0 1 0-22 0zM10.92 17.96L16.12 7.56A1.7 1.7 0 0 0 13.08 6.04L7.88 16.44A1.7 1.7 0 0 0 10.92 17.96z',
  steam: 'M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z',
};

export const links = {
  letterboxd: 'https://letterboxd.com/eswact/',
  serializd: 'https://www.serializd.com/user/Eswact',
  spotify: 'https://open.spotify.com/user/0a3vmo1o412d7yuk94w5lrnw2',
  instagram: 'https://www.instagram.com/erensaribay',
  steam: 'https://steamcommunity.com/profiles/76561198362479545/',
};
