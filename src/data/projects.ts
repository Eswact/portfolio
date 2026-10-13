import type { L10n, Lang } from '../i18n/ui';

export interface Project {
  slug: string;
  /** A name that differs by language (e.g. a group of sites) is an L10n. */
  title: string | L10n;
  type: L10n;
  stack: string[];
  summary: L10n;
  /** Only featured projects get a case study page. */
  featured?: boolean;
  /** Catalogue card fields (featured projects only). */
  card?: {
    code: string;
    year: number;
    status: 'live' | 'source' | 'apk';
    platform: L10n;
    /** Shape of the layered object drawn on the card. */
    object: 'phone' | 'api' | 'screen' | 'voice' | 'meeting';
    /** Layer labels, top to bottom. */
    layers: L10n[];
  };
  details?: L10n[];
  live?: string;
  /** Download page for an installable build (GitHub Releases). */
  release?: string;
  /** Store listing of a published app; the link is named after the store. */
  store?: { name: 'App Store' | 'Google Play'; href: string };
  /** Overrides the status derived from links (an index row with a live demo that is still only a part). */
  status?: 'live' | 'source' | 'apk';
  source?: string[];
  /** A row that groups several sites or packages; each is listed with its own link. */
  sites?: { name: string; href?: string }[];
}

export const projects: Project[] = [
  {
    slug: 'fibi',
    title: 'Fibi',
    featured: true,
    card: {
      code: 'ES-01',
      year: 2026,
      status: 'apk',
      platform: { tr: 'Android (APK)', en: 'Android (APK)' },
      object: 'phone',
      layers: [
        { tr: 'Arayüz', en: 'Interface' },
        { tr: 'Cihazda ayrıştırıcı', en: 'On-device parser' },
        { tr: 'LLM zinciri', en: 'LLM fallback chain' },
        { tr: 'SQLite', en: 'SQLite' },
      ],
    },
    type: { tr: 'Sesli finans ve envanter uygulaması', en: 'Voice-first finance & inventory app' },
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'LLM'],
    summary: {
      tr: '“3700 liraya kulaklık aldım” gibi tek bir cümleyi hem gider hem envanter kaydına dönüştüren mobil uygulama.',
      en: 'A mobile app that turns a single sentence like “bought headphones for 3700 lira” into both an expense and an inventory record.',
    },
    details: [
      {
        tr: 'Cümleler önce cihazdaki kural tabanlı ayrıştırıcıdan geçer; belirsiz olanlar çok katmanlı bir fallback zinciriyle LLM’e yönlendirilir. Tutar ve tarih her durumda kodla doğrulanır.',
        en: 'Input first goes through an on-device rule-based parser; ambiguous sentences are routed to LLMs through a multi-layer fallback chain. Amount and date are always verified in code.',
      },
      {
        tr: 'Taksit, abonelik ve gelecek ay planlaması, canlı fiyatlı yatırım takibi (BIST, altın, döviz, kripto) ve banka SMS’inden gider önerileri.',
        en: 'Installments, subscriptions and monthly cash-flow planning, investment tracking with live prices (stocks, gold, FX, crypto) and expense suggestions from bank SMS.',
      },
      {
        tr: 'Local-first mimari: tüm veriler SQLite ile cihazda kalır, JSON/CSV yedekleme ve geri yükleme desteklenir.',
        en: 'Local-first: all data stays on-device in SQLite, with JSON/CSV backup and restore.',
      },
    ],
    live: 'https://fibi-app.vercel.app',
    release: 'https://github.com/Eswact/fibi/releases',
    source: ['https://github.com/Eswact/fibi'],
  },
  {
    slug: 'barcode-api',
    title: 'Barcode Lookup API',
    featured: true,
    card: {
      code: 'ES-02',
      year: 2025,
      status: 'live',
      platform: { tr: 'REST API · SSE', en: 'REST API · SSE' },
      object: 'api',
      layers: [
        { tr: 'REST + SSE', en: 'REST + SSE' },
        { tr: '8 kazıyıcı', en: '8 scrapers' },
        { tr: 'Redis önbellek', en: 'Redis cache' },
      ],
    },
    type: { tr: 'Barkod tabanlı sorgulama API’si', en: 'Barcode-based product lookup API' },
    stack: ['Node.js', 'Puppeteer', 'Cheerio', 'Redis', 'SSE'],
    summary: {
      tr: '8 Türk e-ticaret platformundan barkod bazlı fiyat karşılaştırması ve ürün bilgisi çeken REST API.',
      en: 'A REST API that fetches barcode-based price comparisons and product info from 8 Turkish e-commerce platforms.',
    },
    details: [
      {
        tr: 'Önce iki ayrı servis olarak geliştirdiğim yapıları tek bir serviste birleştirip yeniden yapılandırdım.',
        en: 'Merged two services I had originally built separately into a single restructured service.',
      },
      {
        tr: 'Fiyat karşılaştırma modunda tüm platformlar paralel taranır ve sonuçlar SSE ile gerçek zamanlı akar. Ürün bilgisi modunda “ilk bulan kazanır” stratejisi hızlı sonuç döndürür.',
        en: 'In price comparison mode all platforms are scraped in parallel and results stream in real time over SSE. In product info mode a “first-found-wins” strategy returns results fast.',
      },
      {
        tr: 'Sonuçlar Redis ile önbelleğe alınır.',
        en: 'Results are cached with Redis.',
      },
    ],
    live: 'https://barcode-scraper-api.onrender.com',
    source: ['https://github.com/Eswact/barcode-scraper-api'],
  },
  {
    slug: 'meetnal',
    title: 'Meetnal',
    featured: true,
    card: {
      code: 'ES-03',
      year: 2026,
      status: 'live',
      platform: { tr: 'Android · iOS', en: 'Android · iOS' },
      object: 'meeting',
      layers: [
        { tr: 'Kayıt', en: 'Recording' },
        { tr: 'Cihazda saklama', en: 'On-device storage' },
        { tr: 'Eşleştirme', en: 'Pairing' },
        { tr: 'Analiz servisi', en: 'Analysis service' },
      ],
    },
    type: { tr: 'Toplantı kayıt ve analiz uygulaması', en: 'Meeting recording & analysis app' },
    stack: ['React Native', 'Expo', 'expo-audio', 'OAuth', 'i18n'],
    summary: {
      tr: 'NSA Teknoloji’de çalışırken geliştirdiğim, toplantıyı kaydedip analize gönderen ve özet, karar ve puanlarla dönen raporu telefonda gösteren mobil uygulama.',
      en: 'A mobile app I built while working at NSA Teknoloji that records a meeting, sends it for analysis and shows the report, with its summary, decisions and scores, on the phone.',
    },
    store: { name: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.nsasoft.meetnal' },
  },
  {
    slug: 'digital-signage',
    title: 'Digital Signage',
    featured: true,
    card: {
      code: 'ES-04',
      year: 2026,
      status: 'source',
      platform: { tr: 'Android · Web', en: 'Android · Web' },
      object: 'screen',
      layers: [
        { tr: 'Android ekran', en: 'Android screen' },
        { tr: 'Yönetim paneli', en: 'Admin panel' },
        { tr: 'WebSocket', en: 'WebSocket' },
        { tr: 'NestJS', en: 'NestJS' },
      ],
    },
    type: { tr: 'Dijital ekran yönetim sistemi', en: 'Screen management system' },
    stack: ['NestJS', 'Next.js', 'Kotlin', 'Jetpack Compose', 'WebSocket', 'Docker'],
    summary: {
      tr: 'Android ekranlara video yerine küçük JSON dokümanları gönderip cihazda şablonlarla render eden gerçek zamanlı sistem.',
      en: 'A real-time system that sends lightweight JSON documents instead of videos to Android screens, which render them with templates.',
    },
    details: [
      {
        tr: 'Backend (NestJS + WebSocket), yönetim paneli (Next.js) ve native Android uygulaması (Kotlin/Compose) uçtan uca projede.',
        en: 'Spans the backend (NestJS + WebSocket), an admin panel (Next.js) and a native Android app (Kotlin/Compose).',
      },
      {
        tr: 'Çok kiracılı organizasyon ve ekip yapısı, içerik zamanlama ve cihazda önbelleğe alınan medyanın offline oynatılması.',
        en: 'Multi-tenant organizations and teams, content scheduling and offline playback of media cached on-device.',
      },
      {
        tr: 'Docker Compose + Caddy ile otomatik TLS’li deploy.',
        en: 'Docker Compose + Caddy deployment with automatic TLS.',
      },
    ],
    source: ['https://github.com/Eswact/digital-signage'],
  },
  {
    slug: 'warbly',
    title: 'Warbly',
    featured: true,
    card: {
      code: 'ES-05',
      year: 2026,
      status: 'live',
      platform: { tr: 'iOS · Android', en: 'iOS · Android' },
      object: 'voice',
      layers: [
        { tr: 'Ses ve metin', en: 'Voice and text' },
        { tr: 'Whisper', en: 'Whisper' },
        { tr: 'Niyet (LLM)', en: 'Intent (LLM)' },
        { tr: 'Reducer', en: 'Reducer' },
      ],
    },
    type: { tr: 'Sesli görev asistanı', en: 'Voice-first task assistant' },
    stack: ['React Native', 'Expo', 'Whisper', 'LLM', 'Node.js', 'SQLite'],
    summary: {
      tr: 'NSA Teknoloji’de çalışırken geliştirdiğim, konuşarak ya da yazarak söyleneni tarihi, saati ve alt görevleriyle bir göreve çeviren mobil uygulama.',
      en: 'A mobile app I built while working at NSA Teknoloji that turns what you say or type into a task, with its date, time and subtasks.',
    },
    store: { name: 'App Store', href: 'https://apps.apple.com/tr/app/warbly-sesli-g%C3%B6revler/id6818455214' },
  },
  {
    slug: 'promo-sites',
    title: { tr: 'Tanıtım Siteleri', en: 'Promotional Sites' },
    type: { tr: 'Tanıtım siteleri', en: 'Promotional websites' },
    stack: ['Vue', 'Next.js', 'i18n', 'SEO'],
    summary: { tr: 'nsasoft.com.tr, Fibi ve Shood tanıtım siteleri.', en: 'Promotional sites for nsasoft.com.tr, Fibi and Shood.' },
    live: 'https://www.nsasoft.com.tr',
    sites: [
      { name: 'nsasoft.com.tr', href: 'https://www.nsasoft.com.tr' },
      { name: 'Fibi', href: 'https://fibi-app.vercel.app' },
      { name: 'Shood', href: 'https://shood-introduction.vercel.app' },
    ],
  },
  {
    slug: 'wardrobe-3d',
    title: 'Wardrobe 3D',
    type: { tr: 'Etkileşimli 3D gardırop', en: 'Interactive 3D wardrobe' },
    stack: ['Three.js', 'JavaScript'],
    summary: { tr: 'Kapıları açılabilen Three.js gardırop simülasyonu.', en: 'A Three.js wardrobe simulation with openable doors.' },
    live: 'https://wardrobe-3d.netlify.app',
    source: ['https://github.com/Eswact/wardrobe-3D'],
  },
  {
    slug: 'scale-pos',
    title: 'Scale POS',
    type: { tr: 'TamPOS’un terazi arayüzü', en: 'TamPOS scale interface' },
    stack: ['JavaScript', 'jQuery', 'Cordova'],
    summary: {
      tr: 'TamPOS’un terazi modunda kullanılan arayüz; ürünü kameradan tanıyan uygulamayı arka planda çağırıyor.',
      en: 'The interface used in TamPOS’s scale mode; it calls the camera-based product recognition app in the background.',
    },
    live: 'https://scale-pos.netlify.app',
    status: 'source',
    source: ['https://github.com/Eswact/scale-pos'],
  },
  {
    slug: 'blexpo',
    title: 'BLExpo',
    type: { tr: 'Bluetooth geliştirici altyapısı', en: 'Bluetooth developer toolkit' },
    stack: ['React Native', 'Expo', 'BLE', 'Classic Bluetooth'],
    summary: { tr: 'Android’de Bluetooth denemeleri için Expo uygulaması.', en: 'An Expo app for experimenting with Bluetooth on Android.' },
    source: ['https://github.com/Eswact/blexpo'],
  },
  {
    slug: 'datatable-plugins',
    title: { tr: 'DataTable Eklentileri', en: 'DataTable Plugins' },
    type: { tr: 'Tablo eklentileri (npm)', en: 'Table plugins (npm)' },
    stack: ['JavaScript', 'jQuery', 'DataTables', 'npm'],
    summary: {
      tr: 'DataTables için iki npm paketi: mobilde satır detayını modalde gösteren görünüm ve kolonları gizleyip sürükleyerek sıralayan ayarlar.',
      en: 'Two npm packages for DataTables: a mobile modal row-detail view, and settings for hiding and drag-reordering columns.',
    },
    status: 'source',
    sites: [
      { name: 'Responsive Modal', href: 'https://github.com/Eswact/datatable-responsive-modal' },
      { name: 'Visibility Settings', href: 'https://github.com/Eswact/datatable-visibility-settings' },
    ],
  },
  {
    slug: 'voidrun',
    title: 'VOIDRUN',
    type: { tr: 'Mobil oyun', en: 'Mobile game' },
    stack: ['Godot'],
    summary: { tr: 'Godot ile yapılmış bullet-hell hayatta kalma oyunu.', en: 'A bullet-hell survival game made with Godot.' },
    status: 'apk',
    release: 'https://github.com/Eswact/voidrun/releases',
    source: ['https://github.com/Eswact/voidrun'],
  },
];

export type FeaturedProject = Project & { title: string; card: NonNullable<Project['card']> };

export const featured = projects.filter((p): p is FeaturedProject => !!p.featured && !!p.card && typeof p.title === 'string');

export type Status = 'live' | 'source' | 'apk';

export const nameOf = (p: Project, lang: Lang) => (typeof p.title === 'string' ? p.title : p.title[lang]);

/** The rest of the catalogue, numbered after the featured cards (ES-06…). */
export const others = projects
  .filter((p) => !p.featured)
  .map((p, i) => ({
    ...p,
    code: `ES-${String(featured.length + i + 1).padStart(2, '0')}`,
    status: (p.status ?? (p.live ? 'live' : 'source')) as Status,
    // Open-source parts (e.g. Scale POS) lead to their code, even when a demo is online.
    href: p.status === 'source' ? (p.source?.[0] ?? p.live) : (p.live ?? p.release ?? p.source?.[0]),
  }));
