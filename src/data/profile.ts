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
  summary: L10n;
}

export const experience: Experience[] = [
  {
    period: { tr: '2023 — Bugün', en: '2023 — Present' },
    role: { tr: 'Yazılım Geliştirici', en: 'Software Developer' },
    company: 'NSA Teknoloji (Çamlıca Barkod)',
    summary: {
      tr: 'Canlı kurumsal web uygulamalarında frontend geliştirerek başladım; zamanla rolüm backend ve mobili de kapsayacak şekilde genişledi. Çok kanallı e-ticaret yönetim platformunda ve yüzlerce müşteriye hizmet veren ön muhasabe programında yeni özellikler ve arayüz iyileştirmeleri yaptım. E-ticaret platformlarından veri toplayan servisleri API’ye dönüştürüp mevcut uygulamalara bağladım. Kiosk/POS cihazları ve yapay zekâ tabanlı ürünler için mobil uygulamalar geliştirdim.',
      en: 'I started on the frontend of live enterprise web apps; over time my role grew to cover backend and mobile as well. I shipped features and UI improvements on a multi-channel e-commerce management platform and on pre-accounting software used by hundreds of customers. I turned services that collect data from e-commerce platforms into APIs and wired them into existing apps. I built mobile apps for kiosk/POS devices and AI-powered products, and ran their branding and Google Play and App Store releases.',
    },
  },
  {
    period: { tr: '2022', en: '2022' },
    role: { tr: 'Stajyer', en: 'Intern' },
    company: 'Çamlıca Barkod',
    summary: {
      tr: '.NET MVC ve MS SQL Server ile çağrı merkezi otomasyonu; DataTables ile etkileşimli tablolar.',
      en: 'Call center automation with .NET MVC and MS SQL Server; interactive tables with DataTables.',
    },
  },
  {
    period: { tr: '2022', en: '2022' },
    role: { tr: 'Stajyer', en: 'Intern' },
    company: 'WhiteCAD',
    summary: {
      tr: 'Three.js ile sahne, ışık ve animasyon içeren etkileşimli 3D gardırop.',
      en: 'An interactive 3D wardrobe in Three.js with scene setup, lighting and animation.',
    },
  },
  {
    period: { tr: '2019 — 2024', en: '2019 — 2024' },
    role: { tr: 'Bilgisayar Mühendisliği, Lisans', en: 'BSc, Computer Engineering' },
    company: 'Bilecik Şeyh Edebali Üniversitesi',
    summary: { tr: 'GNO 3.32', en: 'GPA 3.32' },
  },
];
