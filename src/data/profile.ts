import type { L10n } from '../i18n/ui';

export const profile = {
  name: 'Eren Sarıbay',
  email: 'eren99srb@gmail.com',
  github: 'https://github.com/Eswact',
  linkedin: 'https://www.linkedin.com/in/eren-saribay/',
  cv: {
    tr: '/cv/eren-saribay-cv-tr.pdf',
    en: '/cv/eren-saribay-cv-en.pdf',
  } satisfies L10n,
  currentCompany: 'NSA Teknoloji',
};

export interface Experience {
  period: L10n;
  role: L10n;
  company: string;
  /** A sentence, or a list of points for a longer role. */
  summary: L10n | L10n[];
  /** Projects made in this role, linked under the summary: a project slug, or a plain external link. */
  projects?: (string | { name: string; href: string })[];
}

export const experience: Experience[] = [
  {
    period: { tr: '2023 — Bugün', en: '2023 — Present' },
    role: { tr: 'Yazılım Geliştirici', en: 'Software Developer' },
    company: 'NSA Teknoloji (Çamlıca Barkod)',
    // One short, plain sentence per point.
    summary: [
      {
        tr: 'Canlı kurumsal web uygulamalarında frontend geliştirici olarak başladım. Zamanla rolüm backend ve mobili de kapsayacak şekilde genişledi.',
        en: 'I started as a frontend developer on live enterprise web apps. Over time my role grew to cover backend and mobile.',
      },
      {
        tr: 'Çok kanallı e-ticaret yönetim platformunda ve ön muhasabe programında yeni özellikler ve arayüz iyileştirmeleri gerçekleştirdim.',
        en: 'I shipped new features and UI improvements on a multi-channel e-commerce management platform and on pre-accounting software.',
      },
      {
        tr: 'E-ticaret platformlarından veri toplayan servisleri gerçek zamanlı bir API’ye dönüştürüp mevcut uygulamalara entegre ettim.',
        en: 'I turned services that collect data from e-commerce platforms into a real-time API and integrated it into existing apps.',
      },
      {
        tr: 'Kiosk/POS cihazları ve yapay zekâ tabanlı ürünler için mobil uygulamalar geliştirdim.',
        en: 'I built mobile apps for kiosk/POS devices and AI-powered products.',
      },
    ],
    projects: ['meetnal', 'warbly', { name: 'nsasoft.com.tr', href: 'https://www.nsasoft.com.tr' }],
  },
  {
    period: { tr: '2022', en: '2022' },
    role: { tr: 'Stajyer', en: 'Intern' },
    company: 'Çamlıca Barkod',
    summary: {
      tr: '.NET MVC ve MS SQL Server ile bir çağrı merkezi otomasyonu geliştirdim. DataTables ile etkileşimli tablolar oluşturdum.',
      en: 'I built a call center automation app with .NET MVC and MS SQL Server. I created interactive tables with DataTables.',
    },
  },
  {
    period: { tr: '2022', en: '2022' },
    role: { tr: 'Stajyer', en: 'Intern' },
    company: 'WhiteCAD',
    summary: {
      tr: 'Three.js ile sahne, ışık ve animasyon içeren etkileşimli bir 3D gardırop geliştirdim.',
      en: 'I built an interactive 3D wardrobe in Three.js with scene setup, lighting and animation.',
    },
    projects: ['wardrobe-3d'],
  },
  {
    period: { tr: '2019 — 2024', en: '2019 — 2024' },
    role: { tr: 'Bilgisayar Mühendisliği, Lisans', en: 'BSc, Computer Engineering' },
    company: 'Bilecik Şeyh Edebali Üniversitesi',
    summary: { tr: 'GNO 3.32', en: 'GPA 3.32' },
  },
];
