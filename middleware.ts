
export const config = {
  matcher: ['/((?!_astro/|cv/|.*\\.).*)'],
};

const next = () => new Response(null, { headers: { 'x-middleware-next': '1' } });

const redirect = (url: URL, pathname: string) => {
  url.pathname = pathname;
  return new Response(null, {
    status: 307,
    headers: { Location: url.toString(), Vary: 'Accept-Language, Cookie' },
  });
};

const prefersTurkish = (header: string | null) => {
  if (!header) return false;
  const ranked = header
    .split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = Number(params.find((p) => p.trim().startsWith('q='))?.trim().slice(2) ?? 1);
      return { lang: tag.split('-')[0], q: Number.isNaN(q) ? 0 : q, i };
    })
    .filter((l) => l.q > 0 && (l.lang === 'tr' || l.lang === 'en'))
    .sort((a, b) => b.q - a.q || a.i - b.i);
  return ranked[0]?.lang === 'tr';
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const isTr = path === '/tr' || path.startsWith('/tr/');
  const chosen = /(?:^|;\s*)lang=(tr|en)(?:;|$)/.exec(request.headers.get('cookie') ?? '')?.[1];

  if (isTr) {
    return chosen === 'en' ? redirect(url, path.slice(3) || '/') : next();
  }
  if (chosen === 'tr' || (!chosen && prefersTurkish(request.headers.get('accept-language')))) {
    return redirect(url, path === '/' ? '/tr' : `/tr${path}`);
  }
  return next();
}
