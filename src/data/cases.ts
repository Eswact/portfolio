import type { L10n } from '../i18n/ui';

/** Case study content for featured projects. Facts come from each project's README and docs. */
export interface Case {
  /** One-line promise shown beside the title. */
  claim: L10n;
  role: L10n;
  /** Which live demo the stage plays. */
  demo: 'fibi' | 'barcode' | 'signage';
  /** Layers of the architecture drawing, top to bottom. */
  layers: { title: L10n; detail: L10n }[];
  sections: { title: L10n; body: L10n }[];
  /** Real screenshots grouped by surface; `key` resolves through src/data/shots.ts. */
  gallery: GallerySurface[];
}

export interface GallerySurface {
  id: string;
  label: L10n;
  device: 'phone' | 'browser' | 'screen';
  /** Shown in the browser frame's address bar. */
  address?: string;
  /** `note` is the one sentence shown beside the stage. */
  shots: { key: string; caption: L10n; note: L10n; alt: L10n }[];
}

export const cases: Record<string, Case> = {
  fibi: {
    claim: {
      tr: 'Bir cümle söyle; gider de envanter de kaydolsun.',
      en: 'Say one sentence; the expense and the item are both recorded.',
    },
    role: { tr: 'Ürün, mobil uygulama, sunucu', en: 'Product, mobile app, server' },
    demo: 'fibi',
    layers: [
      {
        title: { tr: 'Arayüz', en: 'Interface' },
        detail: {
          tr: 'React Native + Expo. Ses, metin veya ürün linki aynı önizle-onayla kartına düşer.',
          en: 'React Native + Expo. Voice, text or a product link all land on the same preview-and-confirm card.',
        },
      },
      {
        title: { tr: 'Cihazda ayrıştırıcı', en: 'On-device parser' },
        detail: {
          tr: 'Kural tabanlı, anahtarsız çalışır. Net cümleler telefondan çıkmadan anlaşılır.',
          en: 'Rule based, works without any key. Clear sentences are understood without leaving the phone.',
        },
      },
      {
        title: { tr: 'LLM zinciri', en: 'LLM fallback chain' },
        detail: {
          tr: 'Sadece belirsiz cümleler için. Tutar ve tarih her durumda kodla doğrulanır.',
          en: 'Only for unclear sentences. Amount and date are always verified in code.',
        },
      },
      {
        title: { tr: 'Yerel veri', en: 'Local data' },
        detail: {
          tr: 'SQLite, günlük yerel yedek, fotoğraflı JSON ve CSV dışa aktarım.',
          en: 'SQLite, a daily local backup, JSON export with photos and CSV.',
        },
      },
    ],
    gallery: [
      {
        id: 'app',
        label: { tr: 'Uygulama', en: 'App' },
        device: 'phone',
        shots: [
          {
            key: 'fibi/app/home',
            caption: { tr: 'Ana sayfa', en: 'Home' },
            note: {
              tr: 'Bu ayki toplam, yaklaşan taksitler ve abonelikler tek bakışta.',
              en: 'This month’s total, upcoming installments and subscriptions at a glance.',
            },
            alt: {
              tr: 'Fibi ana sayfası: bu ayki harcama toplamı, yaklaşan taksit ve abonelik ödemeleri, son harcamalar.',
              en: 'Fibi home: this month’s spending total, upcoming installments and subscriptions, recent spending.',
            },
          },
          {
            key: 'fibi/app/preview',
            caption: { tr: 'Kontrol et ve kaydet', en: 'Review and save' },
            note: {
              tr: '“3700 liraya kulaklık aldım” kaydedilmeden önce: tutar, kategori ve envanter.',
              en: 'Before “bought headphones for 3700 lira” is saved: amount, category and inventory.',
            },
            alt: {
              tr: '“3700 liraya kulaklık aldım” cümlesinden çıkan önizleme: ₺3.700, Teknoloji › Ses kategorisi ve açık “Envantere ekle” anahtarı.',
              en: 'The review card for “bought headphones for 3700 lira”: ₺3,700, the Tech › Audio category and “Add to inventory” switched on.',
            },
          },
          {
            key: 'fibi/app/expenses',
            caption: { tr: 'Harcamalar', en: 'Expenses' },
            note: {
              tr: 'Kategori dağılımı, arama ve güne göre liste.',
              en: 'Category breakdown, search and a list by day.',
            },
            alt: {
              tr: 'Aylık harcamalar: kategori dağılımı çubuğu, arama, gruplama ve güne göre liste.',
              en: 'Monthly expenses: a category breakdown bar, search, grouping and a list by day.',
            },
          },
          {
            key: 'fibi/app/analysis',
            caption: { tr: 'Analiz', en: 'Analytics' },
            note: {
              tr: 'Altı ay; gelecek aylar planlanan tutar olarak kesikli çubuklarda.',
              en: 'Six months; future months appear as dashed bars of planned amounts.',
            },
            alt: {
              tr: 'Altı aylık harcama grafiği; gelecek aylar kesikli çubuklarla planlanan tutar olarak görünüyor.',
              en: 'A six-month spending chart; future months appear as dashed bars of planned amounts.',
            },
          },
          {
            key: 'fibi/app/inventory',
            caption: { tr: 'Envanter', en: 'Inventory' },
            note: {
              tr: 'Sahip olunan her şey, değeri ve kategorisiyle.',
              en: 'Everything owned, with its value and category.',
            },
            alt: {
              tr: 'Envanter: toplam değer, arama ve Büyük Varlıklar, Teknoloji, Giyim kategorileri.',
              en: 'Inventory: total value, search and the Big Assets, Tech and Clothing categories.',
            },
          },
        ],
      },
      {
        id: 'web',
        label: { tr: 'Web sitesi', en: 'Website' },
        device: 'browser',
        address: 'fibi-app.vercel.app',
        shots: [
          {
            key: 'fibi/web/hero',
            caption: { tr: 'Tanıtım sitesi', en: 'Website' },
            note: {
              tr: 'Uygulamanın tanıtım sitesi, Türkçe ve İngilizce.',
              en: 'The app’s website, in Turkish and English.',
            },
            alt: {
              tr: 'Fibi tanıtım sitesinin ilk ekranı: “Bir cümle. İki kayıt.” başlığı ve limon yeşili F logosu.',
              en: 'The first screen of the Fibi website: “One sentence. Two records.” and the lime F logo.',
            },
          },
          {
            key: 'fibi/web/features',
            caption: { tr: 'Özellikler', en: 'Features' },
            note: {
              tr: 'Nakit akışı, envanter, almadan önce kontrol ve hedefler.',
              en: 'Cash flow, inventory, check before you buy and targets.',
            },
            alt: {
              tr: 'Sitenin özellikler bölümü: nakit akışı, envanter, almadan önce kontrol ve hedefler.',
              en: 'The website’s features section: cash flow, inventory, check before you buy and targets.',
            },
          },
        ],
      },
    ],
    sections: [
      {
        title: { tr: 'Tek girdi, iki kayıt', en: 'One input, two records' },
        body: {
          tr: '“3700 liraya kulaklık aldım” dediğinde Fibi ₺3.700’lük bir gider ekliyor ve kulaklığı Teknoloji › Ses altına envantere koyuyor. “Markete 640 lira” ise sadece gider oluyor. Taksitler vadesinde, abonelikler her ay kendiliğinden düşüyor; gelecek ayın ne kadar tutacağı baştan görünüyor.',
          en: 'Say “bought headphones for 3700 lira” and Fibi adds a ₺3,700 expense and puts the headphones in the inventory under Tech › Audio. “640 lira at the grocery store” is just an expense. Installments land on their due dates, subscriptions come in by themselves every month, and next month’s total is visible up front.',
        },
      },
      {
        title: { tr: 'Önce kurallar, sonra LLM', en: 'Rules first, then the LLM' },
        body: {
          tr: 'Net cümleleri telefondaki kural tabanlı ayrıştırıcı anlıyor; bunun için internet ya da anahtar gerekmiyor. Yalnızca emin olunamayan cümleler LLM’e gidiyor ve oradan dönen tutar ile tarih yine kodla kontrol ediliyor. Kullandıkça kuralların daha tutarlı olduğunu gördüm; düzeni de bu yüzden bu sırayla kurdum.',
          en: 'Clear sentences are understood by a rule-based parser on the phone, with no internet or key needed. Only sentences it is unsure about go to an LLM, and the amount and date that come back are still checked in code. In daily use the rules turned out to be more consistent, which is why it is built in this order.',
        },
      },
      {
        title: { tr: 'Konuşurken araya giren duraklamalar', en: 'Pauses in the middle of a sentence' },
        body: {
          tr: 'Telefonun konuşma tanıması kısa bir duraklamada kaydı bitirip tutarı yarıda bırakabiliyordu. Bunun için “akıllı devam” ekledim: kayıt ilk sessizlikte kapanmıyor, gerekirse alternatif metinler ve tutar seçenekleri sunuluyor. Sesten gelen her şey kaydedilmeden önce önizleme kartında onaylanıyor.',
          en: 'The phone’s speech recognition could stop at a short pause and cut the amount in half. So I added “smart continue”: recording does not end at the first silence, and alternative transcripts and amounts are offered when needed. Everything that comes from voice is confirmed on the review card before it is saved.',
        },
      },
      {
        title: { tr: 'Veri cihazda kalır', en: 'Data stays on the device' },
        body: {
          tr: 'Hesap açmak gerekmiyor; her şey telefondaki SQLite’ta duruyor, günlük yedek alınıyor ve JSON ya da CSV olarak dışa aktarılabiliyor. Banka SMS’inden gider önerisi isteğe bağlı ve SMS metni telefondan hiç çıkmıyor. İsteyen kendi yapay zekâ anahtarını ekleyebiliyor; anahtar yalnızca telefonun güvenli deposunda saklanıyor.',
          en: 'No account needed: everything lives in SQLite on the phone, with a daily backup and JSON or CSV export. Expense suggestions from bank SMS are optional and the SMS text never leaves the phone. You can add your own AI key, which is kept only in the phone’s secure storage.',
        },
      },
    ],
  },

  'barcode-api': {
    claim: {
      tr: 'Bir barkod, 8 market, sonuçlar geldikçe ekranda.',
      en: 'One barcode, 8 marketplaces, results on screen as they arrive.',
    },
    role: { tr: 'Backend, veri toplama', en: 'Backend, data collection' },
    demo: 'barcode',
    layers: [
      {
        title: { tr: 'REST + SSE', en: 'REST + SSE' },
        detail: {
          tr: 'Express. Fiyat karşılaştırması Server-Sent Events ile akar, en ucuz fiyat otomatik işaretlenir, CSV’ye aktarılır.',
          en: 'Express. Price comparisons stream over Server-Sent Events, the cheapest price is marked automatically and exports to CSV.',
        },
      },
      {
        title: { tr: '8 kazıyıcı', en: '8 scrapers' },
        detail: {
          tr: 'Sunucuda render edilen sitelere düz HTTP + Cheerio; Chrome sadece gereken yerde.',
          en: 'Plain HTTP + Cheerio for server-rendered sites; Chrome only where it is needed.',
        },
      },
      {
        title: { tr: 'Redis önbellek', en: 'Redis cache' },
        detail: {
          tr: 'Her barkod:platform çifti 24 saat. Redis yoksa API önbelleksiz çalışmaya devam eder.',
          en: 'Each barcode:platform pair for 24 hours. Without Redis the API keeps working, uncached.',
        },
      },
    ],
    gallery: [
      {
        id: 'web',
        label: { tr: 'Arayüz', en: 'Interface' },
        device: 'browser',
        address: 'Barcode Scraper',
        shots: [
          {
            key: 'barcode/web/prices',
            caption: { tr: 'Fiyat karşılaştırma, gerçek sorgu', en: 'Price comparison, a real query' },
            note: {
              tr: 'İki barkod için 8 marketin fiyatları; bulunamayanlar gri, en ucuz işaretli.',
              en: 'Prices from 8 marketplaces for two barcodes; missing ones in grey, the cheapest marked.',
            },
            alt: {
              tr: 'İki barkod için market market fiyatlar; bulunamayanlar gri, en ucuz fiyat işaretli.',
              en: 'Prices per marketplace for two barcodes; missing ones in grey, the cheapest marked.',
            },
          },
          {
            key: 'barcode/web/products',
            caption: { tr: 'Ürün bilgisi, ilk bulan kazanır', en: 'Product info, first found wins' },
            note: {
              tr: 'İlk bulan kazanır: ürün adı, görseli, fiyatı ve kategori yolu.',
              en: 'First found wins: name, image, price and category path.',
            },
            alt: {
              tr: 'Ürün bilgisi sonucu: ürün adı, görseli, fiyatı, kaynak market ve kategori yolu.',
              en: 'A product info result: name, image, price, source marketplace and category path.',
            },
          },
        ],
      },
    ],
    sections: [
      {
        title: { tr: 'İki servis, tek API', en: 'Two services, one API' },
        body: {
          tr: 'Fiyat karşılaştırma ve ürün bilgisi başta iki ayrı servisti. Onları ortak tarayıcı ve önbellek katmanı olan tek bir serviste birleştirip yeniden yapılandırdım. Trendyol, Hepsiburada, Pazarama, CarrefourSA, Mopaş, Afta Market, Şok Market ve Market Karşılaştır destekleniyor.',
          en: 'Price comparison and product info started as two separate services. I merged and restructured them into one service with a shared browser and cache layer. Supported: Trendyol, Hepsiburada, Pazarama, CarrefourSA, Mopaş, Afta Market, Şok Market and Market Karşılaştır.',
        },
      },
      {
        title: { tr: 'Paralel tarama, akan sonuçlar', en: 'Parallel scraping, streaming results' },
        body: {
          tr: 'Fiyat modunda 8 platform aynı anda taranır, her biri kendi sekmesinde. Kullanıcı en yavaş marketi beklemez: her sonuç bulunduğu an SSE ile ekrana gelir.',
          en: 'In price mode all 8 platforms are scraped at once, each in its own tab. Nobody waits for the slowest marketplace: every result reaches the screen over SSE the moment it is found.',
        },
      },
      {
        title: { tr: 'Chrome’u sadece gerektiğinde açmak', en: 'Opening Chrome only when needed' },
        body: {
          tr: 'Sunucuda render edilen sitelerde aynı HTML’i düz bir HTTP isteği de veriyor; bunlara Chrome yerine axios ile gidilir, çok daha az CPU ve RAM harcanır. Tarayıcı gereken sitelerde Puppeteer (stealth) kullanılır ve görsel, stil, font, medya istekleri baştan engellenir.',
          en: 'Server-rendered sites return the same HTML to a plain HTTP request, so they are fetched with axios instead of Chrome, using far less CPU and RAM. Where a browser is needed, Puppeteer (stealth) runs with image, style, font and media requests blocked up front.',
        },
      },
      {
        title: { tr: 'İlk bulan kazanır', en: 'First found wins' },
        body: {
          tr: 'Ürün bilgisi modunda tüm platformlar paralel aranır ve ürünü ilk bulan kazanır; ardından ürün sayfasından kategori yolu çıkarılır. Bulunan ürünler kaydedilip sonraki isteklerde anında döner, bulunamayan barkodlar bir daha taranmaz.',
          en: 'In product info mode every platform is searched in parallel and the first to find the product wins; the category path is then read from the product page. Found products are stored and served instantly next time, and barcodes that were not found are skipped in later runs.',
        },
      },
      {
        title: { tr: 'Gerçek kullanımda', en: 'In real use' },
        body: {
          tr: 'API, çalıştığım şirketin ön muhasabe programına entegre edildi. Program içinden barkodla ürün fiyatı çekmek ve platformlar arasında karşılaştırmak için kullanılıyor.',
          en: 'The API is integrated into the pre-accounting software of the company I work for. It is used inside that program to fetch product prices by barcode and compare them across platforms.',
        },
      },
    ],
  },

  'digital-signage': {
    claim: {
      tr: 'Ekrana video değil, küçük bir JSON gider; tasarım cihazda çizilir.',
      en: 'Screens get a small JSON, not a video; the design is drawn on the device.',
    },
    role: { tr: 'Backend, yönetim paneli, Android', en: 'Backend, admin panel, Android' },
    demo: 'signage',
    layers: [
      {
        title: { tr: 'Android ekran', en: 'Android screen' },
        detail: {
          tr: 'Kotlin + Jetpack Compose. Şablonlar APK’nın içinde; yeni şablon bir satır kayıt ve bir Composable.',
          en: 'Kotlin + Jetpack Compose. Templates live in the APK; a new template is one registry line and one Composable.',
        },
      },
      {
        title: { tr: 'Yönetim paneli', en: 'Admin panel' },
        detail: {
          tr: 'Next.js. Ekranlar, cihazlar, medya, zamanlama ve ekip; önizleme cihazla aynı ölçülerle çizilir.',
          en: 'Next.js. Screens, devices, media, schedules and team; the preview is drawn with the same measures as the device.',
        },
      },
      {
        title: { tr: 'WebSocket', en: 'WebSocket' },
        detail: {
          tr: 'OkHttp ile konuşabilen ham WebSocket; değişiklikler RFC 6902 delta olarak gider.',
          en: 'A raw WebSocket that OkHttp can speak; changes travel as RFC 6902 deltas.',
        },
      },
      {
        title: { tr: 'NestJS + SQLite', en: 'NestJS + SQLite' },
        detail: {
          tr: 'Çok kiracılı organizasyonlar, roller, davetler, plan limitleri ve zamanlama motoru.',
          en: 'Multi-tenant organizations, roles, invitations, plan limits and the schedule engine.',
        },
      },
    ],
    gallery: [
      {
        id: 'panel',
        label: { tr: 'Yönetim paneli', en: 'Admin panel' },
        device: 'browser',
        address: 'Signage',
        shots: [
          {
            key: 'signage/panel/screens',
            caption: { tr: 'Ekranlar', en: 'Screens' },
            note: {
              tr: 'Dört şablonla dört ekran: bilgi, sipariş, sıra numarası ve medya.',
              en: 'Four screens on four templates: info, orders, queue number and media.',
            },
            alt: {
              tr: 'Ekranlar sayfası: bilgi panosu, sipariş panosu, sıra numarası ve medya şablonlarıyla dört ekran.',
              en: 'The screens page: four screens using the info board, order board, queue number and media templates.',
            },
          },
          {
            key: 'signage/panel/editor',
            caption: { tr: 'Sipariş panosu editörü', en: 'Order board editor' },
            note: {
              tr: 'Solda sütunlar ve siparişler, sağda cihazla aynı ölçülerde önizleme.',
              en: 'Columns and orders on the left, a preview with the device’s measures on the right.',
            },
            alt: {
              tr: 'Sipariş panosu editörü: solda sütunlar ve siparişler, sağda cihazla aynı ölçülerde önizleme.',
              en: 'The order board editor: columns and orders on the left, a preview with the device’s measures on the right.',
            },
          },
          {
            key: 'signage/panel/media',
            caption: { tr: 'Medya kütüphanesi', en: 'Media library' },
            note: {
              tr: 'Organizasyonun medya kütüphanesi; kota ve kullanım durumu.',
              en: 'The organization’s media library, with quota and usage.',
            },
            alt: {
              tr: 'Medya kütüphanesi: dosya ve depolama kotası, kullanımdaki görseller ve videolar.',
              en: 'The media library: file and storage quota, images and videos in use.',
            },
          },
        ],
      },
      {
        id: 'device',
        label: { tr: 'Cihaz ekranı', en: 'Device screen' },
        device: 'screen',
        shots: [
          {
            key: 'signage/device/pairing',
            caption: { tr: 'Eşleştirme', en: 'Pairing' },
            note: {
              tr: 'Yeni cihaz kimliğini ve QR kodunu gösterir; panelden kodla eşleştirilir.',
              en: 'A new device shows its ID and a QR code, and is paired from the panel with that code.',
            },
            alt: {
              tr: 'Signage Android uygulamasının eşleştirme ekranı: 8 karakterli cihaz kimliği, adımlar ve QR kod.',
              en: 'The Signage Android app’s pairing screen: an 8-character device ID, the steps and a QR code.',
            },
          },
          {
            key: 'signage/device/order',
            caption: { tr: 'Sipariş panosu, Android', en: 'Order board, Android' },
            note: {
              tr: 'Panelden gelen JSON, cihazda Jetpack Compose ile çiziliyor.',
              en: 'The JSON from the panel, drawn on the device with Jetpack Compose.',
            },
            alt: {
              tr: 'Android cihazda çizilen sipariş panosu: Hazırlanıyor, Hazır ve Teslim edildi sütunları.',
              en: 'The order board drawn on an Android device: Preparing, Ready and Picked up columns.',
            },
          },
          {
            key: 'signage/device/queue',
            caption: { tr: 'Sıra numarası, Android', en: 'Queue number, Android' },
            note: {
              tr: 'Sıramatik API’siyle ilerleyen numara ve sıradakiler.',
              en: 'The number advanced by the queue-machine API, and who is next.',
            },
            alt: {
              tr: 'Sıra numarası ekranı: büyük A042 numarası ve sıradaki üç numara.',
              en: 'The queue number screen: a large A042 and the next three numbers.',
            },
          },
          {
            key: 'signage/device/info',
            caption: { tr: 'Bilgi panosu, Android', en: 'Info board, Android' },
            note: {
              tr: 'Serbest metin blokları ve alttaki banner.',
              en: 'Free text blocks and the banner below.',
            },
            alt: {
              tr: 'Bilgi panosu: başlık, madde işaretli bilgiler ve alt banner.',
              en: 'The info board: a title, bullet points and a bottom banner.',
            },
          },
        ],
      },
    ],
    sections: [
      {
        title: { tr: 'Kontrol düzlemi JSON', en: 'The control plane is JSON' },
        body: {
          tr: 'Sunucu ekrana sadece “bu şablonu bu veriyle çiz” der. Ağır medya ayrı bir kütüphanede durur; cihaz onu önceden indirir, SHA-256 ile doğrular ve diskten oynatır. Böylece değişiklik neredeyse hiç bant genişliği harcamadan, bir saniyenin altında cihaza ulaşacak şekilde tasarlandı.',
          en: 'The server only tells a screen “render this template with this data”. Heavy media sits in a separate library; the device downloads it ahead of time, verifies it with SHA-256 and plays it from disk. Changes are designed to reach a device in under a second with almost no bandwidth.',
        },
      },
      {
        title: { tr: 'Sadece fark gider', en: 'Only the difference travels' },
        body: {
          tr: 'Yeni bir sipariş eklendiğinde ekranın tamamı değil, yalnızca değişen alanlar gider. Cihaz farkı uygulayamazsa tam veriyi kendisi ister. Panelden gelen HTTP değişikliği, süreç içi bir olay veri yolu üzerinden cihazın bağlı olduğu WebSocket’e aktarılır.',
          en: 'When an order is added, only the changed fields travel, not the whole screen. If a device cannot apply a patch it asks for the full data itself. A change arriving from the panel over HTTP is handed to the device’s WebSocket through an in-process event bus.',
        },
      },
      {
        title: { tr: 'Ağ gidince ekran kararmaz', en: 'When the network drops, the screen stays on' },
        body: {
          tr: 'Son ekran cihazda saklanır ve bağlantı yokken ya da açılışta gösterilir; medya önbellekten oynar. Cihaz artan aralıklarla yeniden bağlanır, uygulama çökerse kendini yeniden başlatır ve bozuk bir sürümde sonsuz döngüye girmemek için 2 dakikada 3 çökmeden sonra durur.',
          en: 'The last screen is stored on the device and shown when offline or at startup; media plays from the cache. The device reconnects with a growing delay, the app restarts itself after a crash and gives up after 3 crashes in 2 minutes so a broken build never loops forever.',
        },
      },
      {
        title: { tr: 'Gerçek bir ürün gibi', en: 'Built like a real product' },
        body: {
          tr: 'Organizasyonlar, sahip/editör/izleyici rolleri, e-posta davetleri, iki adımlı doğrulama, ekran bazlı API anahtarlarıyla POS ve sıramatik entegrasyonu. Kurulum Docker Compose ve Caddy ile tek komut, HTTPS otomatik.',
          en: 'Organizations, owner/editor/viewer roles, email invitations, two-factor authentication, POS and queue-machine integration with screen-scoped API keys. Deployment is one command with Docker Compose and Caddy, with automatic HTTPS.',
        },
      },
    ],
  },
};
