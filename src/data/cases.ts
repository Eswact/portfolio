import type { L10n } from '../i18n/ui';

export interface Case {
  claim: L10n;
  role: L10n;
  demo: 'fibi' | 'barcode' | 'signage' | 'warbly' | 'meetnal';
  layers: { title: L10n; detail: L10n }[];
  sections: { title: L10n; body: L10n }[];
  gallery: GallerySurface[];
  galleryNote?: L10n;
}

export interface GallerySurface {
  id: string;
  label: L10n;
  device: 'phone' | 'browser' | 'screen';
  address?: string;
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
          tr: 'React Native + Expo. Ses, metin, ürün linki ya da ana ekrandaki ses widget’ı aynı önizle-onayla kartına düşer.',
          en: 'React Native + Expo. Voice, text, a product link or the home screen voice widget all land on the same preview-and-confirm card.',
        },
      },
      {
        title: { tr: 'Cihazda ayrıştırıcı', en: 'On-device parser' },
        detail: {
          tr: 'Kural tabanlı, anahtarsız çalışır. Her kelimesini anladığı net cümleler telefondan çıkmadan çözülür.',
          en: 'Rule based, works without any key. Clear sentences, where it understands every word, are resolved without leaving the phone.',
        },
      },
      {
        title: { tr: 'LLM zinciri', en: 'LLM fallback chain' },
        detail: {
          tr: 'Sadece belirsiz cümleler için; istek sunucudan ya da kullanıcının kendi anahtarıyla doğrudan sağlayıcıya gider. Tutar ve tarih her durumda kodla doğrulanır.',
          en: 'Only for unclear sentences; the request goes through the server, or straight to the provider with the user’s own key. Amount and date are always verified in code.',
        },
      },
      {
        title: { tr: 'Yerel veri', en: 'Local data' },
        detail: {
          tr: 'SQLite, günlük yerel yedek, fotoğraflı JSON ve CSV dışa aktarım.',
          en: 'SQLite, a daily local backup, JSON export with photos and CSV.',
        },
      },
      {
        title: { tr: 'Sunucu', en: 'Server' },
        detail: {
          tr: 'Node.js + PostgreSQL. Ürün linklerini okur, piyasa fiyatlarını önbelleğe alır, isteğe bağlı hesabı ve Fibi Pro’yu tutar.',
          en: 'Node.js + PostgreSQL. Reads product links, caches market prices and keeps the optional account and Fibi Pro.',
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
        title: { tr: 'Almadan önce: bundan zaten var mı?', en: 'Before buying: do I have one already?' },
        body: {
          tr: 'Mağaza uygulamasında beğenilen ürün Fibi’ye paylaşılınca adı, fiyatı ve görseli okunuyor; envanterdeki benzerler, kategori hedefi ve o kategorideki son alımlar yan yana geliyor. İstenirse fiyat takibe alınıyor ve değişince bildirim geliyor. Sunucuları engelleyen mağazaların sayfası telefonda, görünmeyen bir tarayıcıda okunuyor.',
          en: 'Share a product from a shop’s app to Fibi and it reads the name, price and image, then puts similar items you own, the category target and recent purchases in that category side by side. The price can be tracked, with a notification when it changes. Shops that block servers are read on the phone, in a hidden browser.',
        },
      },
      {
        title: { tr: 'Veri cihazda kalır', en: 'Data stays on the device' },
        body: {
          tr: 'Hesap açmak gerekmiyor; Fibi misafir olarak açılıyor, kayıtlar telefondaki SQLite’ta duruyor, her gün yedek alınıyor ve JSON ya da CSV olarak dışa aktarılabiliyor. Google ya da Apple hesabı bağlamak isteğe bağlı; Fibi Pro aboneliği bu hesapla diğer cihazlarda da açılıyor, kayıtların cihazlar arasında eşitlenmesi sıradaki adım. İsteyen kendi yapay zekâ anahtarını ekleyebiliyor; anahtar yalnızca telefonun güvenli deposunda saklanıyor.',
          en: 'No account needed: Fibi opens as a guest, and records live in SQLite on the phone, with a daily backup and JSON or CSV export. Linking a Google or Apple account is optional; it carries a Fibi Pro subscription to your other devices, and syncing records between them is the next step. You can add your own AI key, which is kept only in the phone’s secure storage.',
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
          tr: 'API, çalıştığım şirketin ön muhasebe programı dahil birkaç projesine entegre edildi. Buradaki demo Render’ın ücretsiz katmanında çalıştığı için daha yavaş ve Redis önbelleği kapalı.',
          en: 'The API is integrated into several projects at the company I work for, including its pre-accounting software. The demo here runs on Render’s free tier, so it is slower and has no Redis cache.',
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
        title: { tr: 'Ekipler, entegrasyonlar ve kurulum', en: 'Teams, integrations and setup' },
        body: {
          tr: 'Organizasyonlar, sahip/editör/izleyici rolleri, e-posta davetleri, iki adımlı doğrulama, ekran bazlı API anahtarlarıyla POS ve sıramatik entegrasyonu. Kurulum Docker Compose ve Caddy ile tek komut, HTTPS otomatik.',
          en: 'Organizations, owner/editor/viewer roles, email invitations, two-factor authentication, POS and queue-machine integration with screen-scoped API keys. Deployment is one command with Docker Compose and Caddy, with automatic HTTPS.',
        },
      },
    ],
  },

  warbly: {
    claim: {
      tr: 'Ne yapacağını söyle; görev tarihi ve saatiyle yazılsın.',
      en: 'Say what you need to do; the task is written down with its date and time.',
    },
    role: { tr: 'Ürün, mobil uygulama, sunucu', en: 'Product, mobile app, server' },
    demo: 'warbly',
    layers: [
      {
        title: { tr: 'Arayüz', en: 'Interface' },
        detail: {
          tr: 'React Native + Expo. Mikrofon, yazı kutusu ve ana ekrandaki ses ve Bugün widget’ları aynı akışa girer.',
          en: 'React Native + Expo. The microphone, the text box and the voice and Today widgets on the home screen all feed the same flow.',
        },
      },
      {
        title: { tr: 'Sesten metne', en: 'Speech to text' },
        detail: {
          tr: 'Yeni telefonlarda telefonun kendi ses tanıması kullanılır, metin konuşurken oluşur. Eski Android’de kayıt sunucuda Whisper ile yazıya dökülür; sessiz bir kayıttan uydurulan metin göreve dönüşmeden elenir.',
          en: 'Newer phones use their own speech recognition, so the text forms as you speak. On older Android the recording is transcribed on the server with Whisper, and text made up from a silent recording is dropped before it can become a task.',
        },
      },
      {
        title: { tr: 'Niyet', en: 'Intent' },
        detail: {
          tr: 'Basit cümleleri kurallar, daha önce gelmiş bir cümleyi önbellek çözer. Kalanlar için LLM sadece kalıbı belli bir niyet üretir: ekle, tamamla, güncelle, alt görev. Gemini önce, Groq yedekte.',
          en: 'Simple sentences are solved by rules, and a sentence seen before by a cache. For the rest the LLM only produces an intent of a fixed shape: add, complete, update, subtask. Gemini first, Groq as backup.',
        },
      },
      {
        title: { tr: 'Görev listesi', en: 'Task list' },
        detail: {
          tr: 'Listeyi saf bir reducer günceller; “yarın”, “Cuma akşamı” gibi tarihler kodla çözülür. Veri sunucuda SQLite’ta, her kullanıcıya ayrı; telefon son listeyi ve çevrimdışı yapılan değişiklikleri tutar.',
          en: 'A pure reducer updates the list; dates like “tomorrow” or “Friday evening” are resolved in code. Data lives in SQLite on the server, separate for each user; the phone keeps the latest list and any changes made offline.',
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
            key: 'warbly/app/listening',
            caption: { tr: 'Konuşurken', en: 'While you speak' },
            note: {
              tr: 'Söylenen cümle yazıya dökülürken görev listesi arkada bekliyor.',
              en: 'The sentence is transcribed while the task list waits behind it.',
            },
            alt: {
              tr: 'Warbly dinleme ekranı: “Bu akşam saat 9’da anneannemi ziyarete gideceğim. Ziyarete gitmeden önce ona çiçek alacağım.” cümlesi anlaşılıyor.',
              en: 'Warbly listening: the Turkish sentence “Tonight at 9 I’ll visit my grandmother. Before I go I’ll buy her flowers.” is being understood.',
            },
          },
          {
            key: 'warbly/app/tasks',
            caption: { tr: 'Görevler', en: 'Tasks' },
            note: {
              tr: 'Yeni görev saatiyle listede; az önce eklenen tek dokunuşla geri alınabiliyor.',
              en: 'The new task is on the list with its time; what was just added can be undone with one tap.',
            },
            alt: {
              tr: 'Görevler listesi: Pazara git (0/5 alt görev), her iki günde bir Spora git ve yeni eklenen Anneanneme ziyaret (13 Eki 2026 21:00); altta “1 görev, 1 alt görev eklendi” bildirimi ve Geri Al düğmesi.',
              en: 'The task list: Go to the market (0/5 subtasks), Go to the gym every two days and the newly added Visit grandmother (13 Oct 2026 21:00); below, a “1 task, 1 subtask added” notice with an Undo button.',
            },
          },
          {
            key: 'warbly/app/calendar',
            caption: { tr: 'Takvim', en: 'Calendar' },
            note: {
              tr: 'Haftalık şerit ve seçilen günün görevleri.',
              en: 'A week strip and the chosen day’s tasks.',
            },
            alt: {
              tr: 'Takvim: haftalık şerit, bugün (13 Ekim) seçili, Anneanneme ziyaret görevi 21:00’de.',
              en: 'Calendar: a week strip with today (13 October) selected and the Visit grandmother task at 21:00.',
            },
          },
          {
            key: 'warbly/app/agenda',
            caption: { tr: 'Ajanda', en: 'Agenda' },
            note: {
              tr: 'Yaklaşan görevler güne göre sıralanıyor.',
              en: 'Upcoming tasks, grouped by day.',
            },
            alt: {
              tr: 'Ajanda: Bugün altında Anneanneme ziyaret, Yarın altında Pazara git ve Spora git.',
              en: 'Agenda: Visit grandmother under Today, Go to the market and Go to the gym under Tomorrow.',
            },
          },
          {
            key: 'warbly/app/history',
            caption: { tr: 'Geçmiş', en: 'History' },
            note: {
              tr: 'Sesle ya da yazıyla yapılan her değişiklik burada ve her biri geri alınabiliyor.',
              en: 'Every change made by voice or text is listed here, and each one can be undone.',
            },
            alt: {
              tr: 'Geçmiş: eklenen üç görev ve alt görevleri, her birinin yanında Geri Al düğmesi.',
              en: 'History: three added tasks and their subtasks, each with an Undo button.',
            },
          },
          {
            key: 'warbly/app/settings',
            caption: { tr: 'Ayarlar', en: 'Settings' },
            note: {
              tr: 'Hesap, koyu mod ve altı vurgu rengi; etiketler, çöp kutusu ve geçmiş de buradan açılıyor.',
              en: 'Account, dark mode and six accent colours; tags, the trash and history open from here too.',
            },
            alt: {
              tr: 'Ayarlar: demo hesap, Çıkış yap, Hesabı Sil, Koyu Mod anahtarı, altı vurgu rengi, Etiketler, Çöp Kutusu ve Geçmiş.',
              en: 'Settings: a demo account, Sign out, Delete account, the Dark mode switch, six accent colours, Tags, Trash and History.',
            },
          },
        ],
      },
    ],
    galleryNote: {
      tr: 'Demo hesapla gerçek ekran görüntüleri, Türkçe; açık temada lacivert, koyu temada varsayılan yeşil vurgu',
      en: 'Real screenshots with a demo account, in Turkish; navy accent in the light theme, the default green in the dark',
    },
    sections: [
      {
        title: { tr: 'Bir cümlede birden fazla şey', en: 'More than one thing in a sentence' },
        body: {
          tr: '“Bu akşam saat 9’da anneanneme ziyarete gideceğim, gitmeden önce çiçek alacağım” dediğinde Warbly bugün 21.00 için “Anneanneme ziyaret et” görevini açıyor ve “Çiçek al”ı altına ekliyor. Aynı yoldan görev tamamlanıyor, erteleniyor, tekrar eden göreve çevriliyor ya da siliniyor.',
          en: 'Say “tonight at 9 I’m visiting my grandmother, I’ll buy flowers before I go” and Warbly opens “Visit grandmother” for 21:00 today with “Buy flowers” under it. The same way you can complete a task, postpone it, make it repeat or delete it.',
        },
      },
      {
        title: { tr: 'LLM listeye dokunmuyor', en: 'The LLM never touches the list' },
        body: {
          tr: 'Modelden gelen cevap sadece bir niyet; listeyi değiştiren kısım test edilebilir, sade bir fonksiyon. Tarihleri de model hesaplamıyor, kod çözüyor. Hiçbir sağlayıcı cevap vermezse uygulama görev uydurmak yerine hatayı açıkça söylüyor.',
          en: 'What comes back from the model is only an intent; the part that changes the list is a plain, testable function. Dates are not calculated by the model either, they are resolved in code. If no provider answers, the app says so instead of making up a task.',
        },
      },
      {
        title: { tr: 'Yavaş internette de hızlı', en: 'Fast on a slow connection too' },
        body: {
          tr: 'Telefonun kendi ses tanımasıyla ses dosyası yüklenmiyor, metin konuşurken oluşuyor. “Yarın süt al” gibi basit bir cümleyi telefondaki kurallar beklemeden listeye ekliyor, sunucu da aynı kuralla onaylıyor. İnternet hiç yokken de görev eklenip tamamlanabiliyor; bağlantı gelince değişiklikler kendiliğinden eşitleniyor.',
          en: 'With the phone’s own speech recognition no audio file is uploaded; the text forms as you speak. A simple sentence like “buy milk tomorrow” goes onto the list right away through rules on the phone, and the server confirms it with the same rules. With no connection at all you can still add and complete tasks; the changes sync by themselves once it is back.',
        },
      },
      {
        title: { tr: 'Emin olmadığında soruyor', en: 'When unsure, it asks' },
        body: {
          tr: '“Spor görevini tamamla” birden fazla göreve uyuyorsa Warbly körlemesine birini seçmiyor, seçenekleri gösterip soruyor. Yapılan her işlem geçmişte duruyor ve tek dokunuşla geri alınabiliyor; silinenler çöp kutusunda bekliyor.',
          en: 'If “complete the gym task” matches more than one task, Warbly doesn’t pick one blindly; it shows the options and asks. Every action is kept in the history and can be undone with one tap; deleted tasks wait in the trash.',
        },
      },
      {
        title: { tr: 'Mağazada yayında', en: 'Live in the stores' },
        body: {
          tr: 'App Store ve Google Play’de. Uygulama Bugün görünümüyle açılıyor; Google ve Apple ile giriş, uygulama içinden hesap silme, hatırlatma bildirimleri, Türkçe ve İngilizce arayüz ve komutlar, açık ve koyu tema ve vurgu rengi seçimi var. Ücretsiz planın yanında yapay zekâ komutlarını ve kayıt süresini artıran Warbly Pro aboneliği sunuluyor.',
          en: 'On the App Store and Google Play. The app opens on Today, with Google and Apple sign-in, account deletion from inside the app, reminder notifications, Turkish and English for both the interface and commands, light and dark themes and a choice of accent colour. Next to the free plan, a Warbly Pro subscription raises the limits on AI commands and recording length.',
        },
      },
    ],
  },

  meetnal: {
    claim: {
      tr: 'Toplantıyı kaydet; özet, kararlar ve puanlar cebine gelsin.',
      en: 'Record the meeting; the summary, decisions and scores land in your pocket.',
    },
    role: { tr: 'Ürün, mobil uygulama', en: 'Product, mobile app' },
    demo: 'meetnal',
    layers: [
      {
        title: { tr: 'Kayıt', en: 'Recording' },
        detail: {
          tr: 'Tek dokunuşla başlar, ekran kapalıyken de sürer. Telefondaki bir ses dosyası da içe aktarılabilir.',
          en: 'Starts with one tap and keeps going with the screen off. An audio file from the phone can be imported too.',
        },
      },
      {
        title: { tr: 'Cihazda saklama', en: 'On-device storage' },
        detail: {
          tr: 'Kayıt önce telefonda durur: dinlenir, yeniden adlandırılır, hazır olunca gönderilir. Biten raporlar internetsiz de açılır.',
          en: 'A recording stays on the phone first: play it, rename it, send it when ready. Finished reports open offline too.',
        },
      },
      {
        title: { tr: 'Eşleştirme ve giriş', en: 'Pairing and sign-in' },
        detail: {
          tr: 'QR, kısa kod, Google ya da Apple. Dört yol da aynı şirket anahtarına çıkar ve güvenli depoda saklanır.',
          en: 'QR, a short code, Google or Apple. All four lead to the same company key, kept in secure storage.',
        },
      },
      {
        title: { tr: 'Analiz servisi', en: 'Analysis service' },
        detail: {
          tr: 'Yüklenen kayıt metne çevrilir, konuşmacılar ayrılır ve rapor çıkar. Uygulama durumu izler, rapor hazır olunca gösterir.',
          en: 'The uploaded recording is transcribed, speakers are separated and a report is produced. The app follows the status and shows the report when it is ready.',
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
            key: 'meetnal/app/record',
            caption: { tr: 'Kayıt', en: 'Record' },
            note: {
              tr: 'Tek dokunuşla kayıt başlıyor; telefondaki bir ses dosyası da içe aktarılabiliyor.',
              en: 'Recording starts with one tap; an audio file from the phone can be imported too.',
            },
            alt: {
              tr: 'Kayıt ekranı: 0:00 sayacı, turuncu mikrofon düğmesi ve İçe Aktar.',
              en: 'The record screen: a 0:00 timer, the orange microphone button and Import.',
            },
          },
          {
            key: 'meetnal/app/recordings',
            caption: { tr: 'Kayıtlar', en: 'Recordings' },
            note: {
              tr: 'Kayıtlar önce cihazda duruyor; analiz edilenlerin raporu bir dokunuş uzakta.',
              en: 'Recordings stay on the device first; the report of an analysed one is a tap away.',
            },
            alt: {
              tr: 'Kayıtlar: Sprint planlama cihazda ve Analize Gönder düğmesiyle; Haftalık ürün toplantısı ve Müşteri görüşmesi Analiz Edildi ve Raporu Gör ile.',
              en: 'Recordings: Sprint planning on the device with Send for Analysis; the weekly product meeting and a client call Analyzed, with View Report.',
            },
          },
          {
            key: 'meetnal/app/reports',
            caption: { tr: 'Raporlar', en: 'Reports' },
            note: {
              tr: 'Biten raporlar telefonda duruyor ve internetsiz de açılıyor.',
              en: 'Finished reports stay on the phone and open offline too.',
            },
            alt: {
              tr: 'Raporlar: Haftalık ürün toplantısı ve Müşteri görüşmesi, kısa özetleri ve etiketleriyle.',
              en: 'Reports: the weekly product meeting and a client call, with short summaries and tags.',
            },
          },
          {
            key: 'meetnal/app/summary',
            caption: { tr: 'Özet', en: 'Summary' },
            note: {
              tr: 'Toplantının özeti ve zaman damgalı konu bölümleri.',
              en: 'The meeting summary and time-stamped topic sections.',
            },
            alt: {
              tr: 'Haftalık ürün toplantısı raporu: özet ve 0:00–9:00, 9:00–28:00, 28:00–47:12 aralıklarındaki konu bölümleri.',
              en: 'The weekly product meeting report: the summary and topic sections at 0:00–9:00, 9:00–28:00 and 28:00–47:12.',
            },
          },
          {
            key: 'meetnal/app/scores',
            caption: { tr: 'Skorlar', en: 'Scores' },
            note: {
              tr: 'Genel, netlik, verimlilik, iletişim ve sonuç netliği puanları; katılımcılar ve ana konular.',
              en: 'Overall, clarity, efficiency, communication and outcome clarity scores; participants and main topics.',
            },
            alt: {
              tr: 'Skorlar: Genel 8, Netlik 8, Verimlilik 8, İletişim Kalitesi 7, Sonuç Netliği 7; altında katılımcılar, ana konular ve kararlar.',
              en: 'Scores: Overall 8, Clarity 8, Efficiency 8, Communication 7, Outcome Clarity 7; participants, main topics and decisions below.',
            },
          },
          {
            key: 'meetnal/app/actions',
            caption: { tr: 'Aksiyonlar', en: 'Actions' },
            note: {
              tr: 'Aksiyonlar, önemli sorular, sonraki adımlar ve konuşmacı bazında katkı.',
              en: 'Action items, key questions, next steps and each speaker’s contribution.',
            },
            alt: {
              tr: 'Rapor: aksiyonlar, önemli sorular, sonraki adımlar ve üç konuşmacının katkı düzeyi.',
              en: 'A report: action items, key questions, next steps and the contribution of three speakers.',
            },
          },
          {
            key: 'meetnal/app/settings',
            caption: { tr: 'Ayarlar', en: 'Settings' },
            note: {
              tr: 'Altı renk teması, koyu mod ve dil seçimi.',
              en: 'Six colour themes, dark mode and language.',
            },
            alt: {
              tr: 'Ayarlar: koyu tema anahtarı, altı renk teması (Grafit + turuncu seçili), dil, demo hesap ve şirket.',
              en: 'Settings: the dark theme switch, six colour themes (Graphite + orange selected), language, a demo account and company.',
            },
          },
        ],
      },
    ],
    galleryNote: {
      tr: 'Demo hesap ve örnek toplantılarla gerçek ekran görüntüleri, Türkçe; temaya göre değişir',
      en: 'Real screenshots with a demo account and sample meetings, in Turkish; matched to theme',
    },
    sections: [
      {
        title: { tr: 'Kaydet, gönder, oku', en: 'Record, send, read' },
        body: {
          tr: 'Toplantı başında kayda basıp telefonu masaya bırakmak yetiyor. Kayıt bitince “Analize gönder” deniyor; durum Gönderiliyor, Analiz ediliyor ve Analiz edildi olarak ilerliyor. Rapor özet, konu bölümleri, kararlar, aksiyonlar, önemli sorular ve konuşmacı bazında katkıyla dönüyor.',
          en: 'Press record when the meeting starts and leave the phone on the table. When it ends, tap “Send for analysis”; the status moves through Sending, Analyzing and Analyzed. The report comes back with a summary, topic sections, decisions, action items, key questions and each speaker’s contribution.',
        },
      },
      {
        title: { tr: 'Web panelden telefona bir QR ile', en: 'From the web panel to the phone with one QR' },
        body: {
          tr: 'Ekipler Meetnal’ı web panelinden yönetiyor. Telefonu bağlamak için panelde gösterilen QR’ı okutmak ya da kısa bir kodu başka bir cihazdan onaylamak yetiyor; Google ve Apple ile de girilebiliyor. Hangi yoldan gelinirse gelinsin sonuç aynı: şirkete bağlı tek bir anahtar.',
          en: 'Teams manage Meetnal from a web panel. To connect a phone you scan the QR shown in the panel, or approve a short code from another device; Google and Apple sign-in work too. Whichever way you come in, the result is the same: a single key tied to the company.',
        },
      },
      {
        title: { tr: 'Yedi dil, altı tema', en: 'Seven languages, six themes' },
        body: {
          tr: 'Uygulama yedi dilde kullanılabiliyor; açık ve koyu modun yanında altı renk teması var. İkon tasarımında ve markalaşmasında da çalıştım.',
          en: 'The app can be used in seven languages, with six colour themes besides light and dark mode. I also worked on its icon design and branding.',
        },
      },
    ],
  },
};
