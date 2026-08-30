'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface PageContent {
  navFeatures: string;
  navLandlords: string;
  navTenants: string;
  navPricing: string;
  navLogin: string;
  navSignup: string;
  badge: string;
  heroTitle1: string;
  heroHighlight: string;
  heroSubtitle: string;
  ctaStart: string;
  ctaLogin: string;
}

const translations: Record<string, PageContent> = {
  en: {
    navFeatures: 'Features',
    navLandlords: 'Landlords',
    navTenants: 'Tenants',
    navPricing: 'Pricing',
    navLogin: 'Log in',
    navSignup: 'Sign up',
    badge: 'Modern Multilingual Property Management',
    heroTitle1: 'Where landlords go to',
    heroHighlight: 'get it right.',
    heroSubtitle: 'Screen tenants with confidence, generate digital leases, collect automatic rent payments, and manage property operations in one place.',
    ctaStart: 'Get Started Free',
    ctaLogin: 'Access Portal',
  },
  es: {
    navFeatures: 'Características',
    navLandlords: 'Propietarios',
    navTenants: 'Inquilinos',
    navPricing: 'Precios',
    navLogin: 'Iniciar sesión',
    navSignup: 'Registrarse',
    badge: 'Gestión Inmobiliaria Multilingüe Moderna',
    heroTitle1: 'Donde los propietarios van para',
    heroHighlight: 'hacerlo bien.',
    heroSubtitle: 'Evalúe inquilinos con confianza, genere contratos digitales, cobre alquileres automáticamente y gestione propiedades en un solo lugar.',
    ctaStart: 'Comenzar Gratis',
    ctaLogin: 'Acceder al Portal',
  },
  km: {
    navFeatures: 'លក្ខណៈពិសេស',
    navLandlords: 'ម្ចាស់ផ្ទះ',
    navTenants: 'អ្នកជួល',
    navPricing: 'តម្លៃ',
    navLogin: 'ចូល',
    navSignup: 'ចុះឈ្មោះ',
    badge: 'ការគ្រប់គ្រងអចលនទ្រព្យពហុភាសាទំនើប',
    heroTitle1: 'ទីកន្លែងដែលម្ចាស់ផ្ទះជ្រើសរើសដើម្បី',
    heroHighlight: 'ទទួលបានភាពជោគជ័យ។',
    heroSubtitle: 'ពិនិត្យអ្នកជួលដោយទំនុកចិត្ត បង្កើតកិច្ចសន្យាជួលឌីជីថល ប្រមូលប្រាក់ឈ្នួលស្វ័យប្រវត្តិ និងគ្រប់គ្រងប្រតិបត្តិការទាំងអស់នៅកន្លែងតែមួយ។',
    ctaStart: 'ចាប់ផ្តើមដោយឥតគិតថ្លៃ',
    ctaLogin: 'ចូលប្រើប្រាស់',
  },
  vi: {
    navFeatures: 'Tính năng',
    navLandlords: 'Chủ nhà',
    navTenants: 'Người thuê',
    navPricing: 'Bảng giá',
    navLogin: 'Đăng nhập',
    navSignup: 'Đăng ký',
    badge: 'Quản Lý Bất Động Sản Đa Ngôn Ngữ Hiện Đại',
    heroTitle1: 'Nơi chủ nhà tin cậy để',
    heroHighlight: 'làm đúng ngay từ đầu.',
    heroSubtitle: 'Sàng lọc người thuê tự tin, tạo hợp đồng điện tử, thu tiền thuê tự động và quản lý vận hành bất động sản tại một nơi duy nhất.',
    ctaStart: 'Bắt Đầu Miễn Phí',
    ctaLogin: 'Vào Hệ Thống',
  },
  zh: {
    navFeatures: '功能',
    navLandlords: '房东',
    navTenants: '租客',
    navPricing: '价格',
    navLogin: '登录',
    navSignup: '注册',
    badge: '现代多语言房产管理平台',
    heroTitle1: '房东信赖的高效选择，',
    heroHighlight: '让管理更轻松。',
    heroSubtitle: '从租客背景调查、电子租约签署到自动收租与维护报修，一站式搞定所有房产管理工作。',
    ctaStart: '免费开始使用',
    ctaLogin: '进入管理后台',
  },
  tl: {
    navFeatures: 'Mga Tampok',
    navLandlords: 'Mga May-ari',
    navTenants: 'Mga Nangungupahan',
    navPricing: 'Presyo',
    navLogin: 'Mag-log in',
    navSignup: 'Mag-sign up',
    badge: 'Makabagong Pamamahala ng Ari-arian',
    heroTitle1: 'Kung saan ang mga may-ari ay',
    heroHighlight: 'nagiging matagumpay.',
    heroSubtitle: 'Magsala ng mga tenant, gumawa ng digital lease, mangolekta ng upa nang awtomatiko, at mag-ayos ng maintenance sa isang platform.',
    ctaStart: 'Magsimula nang Libre',
    ctaLogin: 'Buksan ang Portal',
  },
  ko: {
    navFeatures: '주요 기능',
    navLandlords: '임대인',
    navTenants: '임차인',
    navPricing: '요금 안내',
    navLogin: '로그인',
    navSignup: '회원가입',
    badge: '스마트 다국어 임대 관리 솔루션',
    heroTitle1: '임대인이 믿고 선택하는',
    heroHighlight: '완벽한 관리 파트너.',
    heroSubtitle: '세입자 심사, 디지털 전자 계약, 자동 월세 수납, 유지 보수 요청까지 한 곳에서 편리하게 관리하세요.',
    ctaStart: '무료로 시작하기',
    ctaLogin: '포털 접속',
  },
  ja: {
    navFeatures: '機能一覧',
    navLandlords: 'オーナー様',
    navTenants: '入居者様',
    navPricing: '料金プラン',
    navLogin: 'ログイン',
    navSignup: '新規登録',
    badge: '次世代・多言語対応 不動産管理システム',
    heroTitle1: '賃貸オーナーが選ぶ、',
    heroHighlight: '確実な賃貸管理。',
    heroSubtitle: '入居者審査から電子契約書の作成、家賃の自動回収、修繕対応まで、すべてを一元管理。',
    ctaStart: '無料で始める',
    ctaLogin: 'ポータルを開く',
  },
  fr: {
    navFeatures: 'Fonctionnalités',
    navLandlords: 'Propriétaires',
    navTenants: 'Locataires',
    navPricing: 'Tarifs',
    navLogin: 'Connexion',
    navSignup: 'Inscription',
    badge: 'Gestion Immobilière Multilingue Moderne',
    heroTitle1: 'La plateforme des propriétaires pour',
    heroHighlight: 'réussir leur gestion.',
    heroSubtitle: 'Vérifiez les locataires en toute sérénité, créez des baux numériques, encaissez les loyers automatiquement et gérez vos biens.',
    ctaStart: 'Commencer Gratuitement',
    ctaLogin: 'Accéder au Portail',
  },
  de: {
    navFeatures: 'Funktionen',
    navLandlords: 'Vermieter',
    navTenants: 'Mieter',
    navPricing: 'Preise',
    navLogin: 'Anmelden',
    navSignup: 'Registrieren',
    badge: 'Moderne mehrsprachige Immobilienverwaltung',
    heroTitle1: 'Wo Vermieter alles',
    heroHighlight: 'richtig machen.',
    heroSubtitle: 'Mieterprüfung, rechtssichere digitale Mietverträge, automatische Mietzahlung und Schadensmeldungen an einem zentralen Ort.',
    ctaStart: 'Kostenlos starten',
    ctaLogin: 'Zum Portal',
  },
  pt: {
    navFeatures: 'Recursos',
    navLandlords: 'Proprietários',
    navTenants: 'Inquilinos',
    navPricing: 'Preços',
    navLogin: 'Entrar',
    navSignup: 'Cadastre-se',
    badge: 'Gestão Imobiliária Multilíngue Moderna',
    heroTitle1: 'Onde os proprietários vão para',
    heroHighlight: 'fazer certo.',
    heroSubtitle: 'Analise inquilinos com segurança, gere contratos digitais, colete aluguéis automaticamente e controle manutenções em um só lugar.',
    ctaStart: 'Comece Grátis',
    ctaLogin: 'Acessar Portal',
  },
  ar: {
    navFeatures: 'الميزات',
    navLandlords: 'الملاك',
    navTenants: 'المستأجرون',
    navPricing: 'الأسعار',
    navLogin: 'تسجيل الدخول',
    navSignup: 'إنشاء حساب',
    badge: 'إدارة عقارات حديثة متعددة اللغات',
    heroTitle1: 'الوجهة المثالية للملاك لـ',
    heroHighlight: 'إدارة عقاراتهم باحترافية.',
    heroSubtitle: 'فحص المستأجرين، إنشاء عقود إيجار إلكترونية، تحصيل الإيجارات تلقائياً، وإدارة الصيانة بكل سهولة.',
    ctaStart: 'ابدأ مجاناً',
    ctaLogin: 'الدخول إلى البوابة',
  },
  hi: {
    navFeatures: 'विशेषताएं',
    navLandlords: 'मकान मालिक',
    navTenants: 'किरायेदार',
    navPricing: 'मूल्य निर्धारण',
    navLogin: 'लॉग इन',
    navSignup: 'साइन अप',
    badge: 'आधुनिक बहुभाषी संपत्ति प्रबंधन',
    heroTitle1: 'मकान मालिकों का सबसे भरोसेमंद',
    heroHighlight: 'प्रबंधन मंच।',
    heroSubtitle: 'किरायेदारों की जांच करें, डिजिटल लीज तैयार करें, स्वचालित किराया संग्रह और रखरखाव सब एक ही स्थान पर प्रबंधित करें।',
    ctaStart: 'मुफ़्त शुरुआत करें',
    ctaLogin: 'पोर्टल खोलें',
  },
  ru: {
    navFeatures: 'Функции',
    navLandlords: 'Арендодатели',
    navTenants: 'Арендаторы',
    navPricing: 'Цены',
    navLogin: 'Вход',
    navSignup: 'Регистрация',
    badge: 'Современное многоязычное управление недвижимостью',
    heroTitle1: 'Надежное решение для арендодателей,',
    heroHighlight: 'чтобы всё было правильно.',
    heroSubtitle: 'Проверяйте арендаторов, создавайте электронные договоры, собирайте платежи и управляйте обслуживанием объектов в одном месте.',
    ctaStart: 'Начать бесплатно',
    ctaLogin: 'Войти в портал',
  },
  it: {
    navFeatures: 'Funzionalità',
    navLandlords: 'Proprietari',
    navTenants: 'Inquilini',
    navPricing: 'Prezzi',
    navLogin: 'Accedi',
    navSignup: 'Registrati',
    badge: 'Gestione Immobiliare Multilingue Moderna',
    heroTitle1: 'Dove i proprietari scelgono di',
    heroHighlight: 'fare le cose per bene.',
    heroSubtitle: 'Verifica inquilini, crea contratti digitali conformi, riscuoti gli affitti automaticamente e gestisci gli immobili in un unico posto.',
    ctaStart: 'Inizia Gratis',
    ctaLogin: 'Accedi al Portale',
  },
  pl: {
    navFeatures: 'Funkcje',
    navLandlords: 'Właściciele',
    navTenants: 'Najemcy',
    navPricing: 'Cennik',
    navLogin: 'Zaloguj',
    navSignup: 'Zarejestruj',
    badge: 'Nowoczesne zarządzanie nieruchomościami',
    heroTitle1: 'Miejsce, w którym właściciele',
    heroHighlight: 'robią to dobrze.',
    heroSubtitle: 'Weryfikacja najemców, cyfrowe umowy najmu, automatyczny pobór opłat i zarządzanie usterkami w jednym miejscu.',
    ctaStart: 'Rozpocznij za darmo',
    ctaLogin: 'Przejdź do portalu',
  },
  uk: {
    navFeatures: 'Функції',
    navLandlords: 'Орендодавці',
    navTenants: 'Орендарі',
    navPricing: 'Тарифи',
    navLogin: 'Увійти',
    navSignup: 'Реєстрація',
    badge: 'Сучасне багатомовне управління нерухомістю',
    heroTitle1: 'Платформа для орендодавців,',
    heroHighlight: 'де все робиться правильно.',
    heroSubtitle: 'Перевірка орендарів, генерація цифрових договорів, автоматичний збір оренди та обслуговування в єдиному сервісі.',
    ctaStart: 'Почати безкоштовно',
    ctaLogin: 'Вхід у портал',
  },
  nl: {
    navFeatures: 'Functies',
    navLandlords: 'Verhuurders',
    navTenants: 'Huurders',
    navPricing: 'Tarieven',
    navLogin: 'Inloggen',
    navSignup: 'Aanmelden',
    badge: 'Modern meertalig vastgoedbeheer',
    heroTitle1: 'Waar verhuurders alles',
    heroHighlight: 'goed regelen.',
    heroSubtitle: 'Screen huurders, genereer digitale huurcontracten, incasseer automatisch huur en beheer onderhoud op één plek.',
    ctaStart: 'Gratis beginnen',
    ctaLogin: 'Naar Portal',
  },
  th: {
    navFeatures: 'ฟีเจอร์',
    navLandlords: 'เจ้าของห้อง',
    navTenants: 'ผู้เช่า',
    navPricing: 'ราคา',
    navLogin: 'เข้าสู่ระบบ',
    navSignup: 'สมัครสมาชิก',
    badge: 'ระบบจัดการอสังหาริมทรัพย์หลายภาษาที่ทันสมัย',
    heroTitle1: 'พื้นที่สำหรับเจ้าของบ้านเพื่อ',
    heroHighlight: 'การจัดการที่ถูกต้องและแม่นยำ',
    heroSubtitle: 'คัดกรองผู้เช่าอย่างมั่นใจ สร้างสัญญาเช่าดิจิทัล รับชำระค่าเช่าอัตโนมัติ และดูแลการซ่อมบำรุงในที่เดียว',
    ctaStart: 'เริ่มต้นใช้งานฟรี',
    ctaLogin: 'เข้าสู่พอร์ทัล',
  },
  id: {
    navFeatures: 'Fitur',
    navLandlords: 'Pemilik Properti',
    navTenants: 'Penyewa',
    navPricing: 'Harga',
    navLogin: 'Masuk',
    navSignup: 'Daftar',
    badge: 'Manajemen Properti Multibahasa Modern',
    heroTitle1: 'Tempat pemilik properti untuk',
    heroHighlight: 'mengelola dengan tepat.',
    heroSubtitle: 'Seleksi penyewa, buat kontrak digital, kumpulkan pembayaran sewa otomatis, dan kelola perbaikan di satu platform.',
    ctaStart: 'Mulai Gratis',
    ctaLogin: 'Buka Portal',
  },
  tr: {
    navFeatures: 'Özellikler',
    navLandlords: 'Ev Sahipleri',
    navTenants: 'Kiracılar',
    navPricing: 'Fiyatlandırma',
    navLogin: 'Giriş Yap',
    navSignup: 'Kayıt Ol',
    badge: 'Modern Çok Dilli Mülk Yönetimi',
    heroTitle1: 'Mülk sahiplerinin işini',
    heroHighlight: 'doğru yaptığı platform.',
    heroSubtitle: 'Kiracı kontrolü, dijital kira sözleşmeleri, otomatik kira tahsilatı ve bakım taleplerini tek merkezden yönetin.',
    ctaStart: 'Ücretsiz Başlayın',
    ctaLogin: 'Portala Giriş',
  },
  ht: {
    navFeatures: 'Karakteristik',
    navLandlords: 'Pwopriyetè',
    navTenants: 'Lokatè',
    navPricing: 'Pri',
    navLogin: 'Konekte',
    navSignup: 'Enskri',
    badge: 'Jesyon Imobilye Modèn Plizyè Lang',
    heroTitle1: 'Kote pwopriyetè yo ale pou',
    heroHighlight: 'fè bagay yo byen.',
    heroSubtitle: 'Tcheke lokatè yo, kreye kontra dijital, resevwa peman lwaye otomatikman, epi jere reparasyon yo tout nan yon sèl kote.',
    ctaStart: 'Kòmanse Gratis',
    ctaLogin: 'Louvri Pòtal',
  },
  hmn: {
    navFeatures: 'Cov Yam Ntxwv',
    navLandlords: 'Cov Tswv Tsev',
    navTenants: 'Cov Xauj Tsev',
    navPricing: 'Nqi',
    navLogin: 'Nkag Mus',
    navSignup: 'Sau Npe',
    badge: 'Tswj Vaj Tse Ntau Hom Lus',
    heroTitle1: 'Qhov chaw uas cov tswv tsev tuaj mus',
    heroHighlight: 'ua kom raug zoo.',
    heroSubtitle: 'Tshawb xyuas cov neeg xauj tsev, tsim daim ntawv cog lus, sau nyiaj xauj tsev tsis siv neeg, thiab tswj kev kho vaj tse.',
    ctaStart: 'Pib Dawb',
    ctaLogin: 'Nkag Rau Portal',
  },
  so: {
    navFeatures: 'Astaamaha',
    navLandlords: 'Mulkiilayaasha',
    navTenants: 'Kireystayaasha',
    navPricing: 'Qiimaha',
    navLogin: 'Gal',
    navSignup: 'Isdiiwaangeli',
    badge: 'Maamulka Guryaha Casriga ah ee Luuqadaha Badan',
    heroTitle1: 'Halka mulkiilayaashu u tagaan inay',
    heroHighlight: 'si sax ah u maamulaan.',
    heroSubtitle: 'Baar kireystayaasha, samee heshiisyo dijitaal ah, si toos ah u ururi kirada, una maamul dayactirka meel keliya.',
    ctaStart: 'Ku Bilow Bilaash',
    ctaLogin: 'Fur Bogga',
  },
  my: {
    navFeatures: 'လုပ်ဆောင်ချက်များ',
    navLandlords: 'အိမ်ရှင်များ',
    navTenants: 'အိမ်ငှားများ',
    navPricing: 'ဈေးနှုန်း',
    navLogin: 'အကောင့်ဝင်ရန်',
    navSignup: 'စာရင်းသွင်းရန်',
    badge: 'ခေတ်မီ ဘာသာစကားစုံ အိမ်ခြံမြေ စီမံခန့်ခွဲမှု',
    heroTitle1: 'အိမ်ရှင်များ စိတ်ချလက်ချ ရွေးချယ်ရာ',
    heroHighlight: 'အကောင်းဆုံး ဝန်ဆောင်မှု။',
    heroSubtitle: 'အိမ်ငှားများကို စိစစ်ခြင်း၊ စာချုပ်များ ချုပ်ဆိုခြင်း၊ ငှားရမ်းခများ အလိုအလျောက် ကောက်ခံခြင်းနှင့် ပြုပြင်ထိန်းသိမ်းမှုများကို တစ်နေရာတည်းတွင် စီမံပါ။',
    ctaStart: 'အခမဲ့ စတင်ပါ',
    ctaLogin: 'စနစ်သို့ ဝင်ရန်',
  },
};

const languages = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'km', label: 'Khmer', native: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh', label: 'Chinese', native: '简体中文', flag: '🇨🇳' },
  { code: 'tl', label: 'Tagalog', native: 'Filipino', flag: '🇵🇭' },
  { code: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru', label: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'pl', label: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { code: 'uk', label: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'th', label: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'ht', label: 'Haitian Creole', native: 'Kreyòl Ayisyen', flag: '🇭🇹' },
  { code: 'hmn', label: 'Hmong', native: 'Hmoob', flag: '🇱🇦' },
  { code: 'so', label: 'Somali', native: 'Soomaali', flag: '🇸🇴' },
  { code: 'my', label: 'Burmese', native: 'မြန်မာဘာသာ', flag: '🇲🇲' },
];

export default function RentwellLandingPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedLang, setSelectedLang] = useState('en');
  const [langSearch, setLangSearch] = useState('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('rentwell-theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    const savedLang = localStorage.getItem('rentwell-lang');
    if (savedLang && translations[savedLang]) {
      setSelectedLang(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('rentwell-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rentwell-theme', 'light');
    }
  };

  const changeLanguage = (code: string) => {
    setSelectedLang(code);
    localStorage.setItem('rentwell-lang', code);
    setLangDropdownOpen(false);
    setLangSearch('');
  };

  const openAuth = (signUpMode: boolean) => {
    setIsSignUp(signUpMode);
    setMessage(null);
    setAuthOpen(true);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, portal: 'rentwell', preferred_lang: selectedLang },
          },
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Account created! Redirecting...' });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1200);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const t = translations[selectedLang] || translations.en;

  const filteredLanguages = languages.filter(
    (l) =>
      l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.native.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.code.toLowerCase().includes(langSearch.toLowerCase())
  );

  const activeLanguageObj = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040D1A] text-slate-900 dark:text-white flex flex-col relative overflow-hidden font-sans transition-colors duration-200 selection:bg-[#6EBE3B] selection:text-slate-950">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-[#002D56]/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#6EBE3B]/15 dark:bg-[#6EBE3B]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Navigation */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-xl px-2 py-1 flex items-center justify-center bg-white/80 dark:bg-white/95 shadow-sm border border-slate-200/60 dark:border-transparent">
            <Image
              src="/rentwell-logo.png"
              alt="Rentwell"
              width={160}
              height={44}
              priority
              className="h-9 w-auto object-contain"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navFeatures}</a>
          <a href="#landlords" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navLandlords}</a>
          <a href="#tenants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navTenants}</a>
          <a href="#pricing" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navPricing}</a>
        </nav>

        <div className="flex items-center space-x-2.5">
          {/* 25-Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-[#002D56] bg-white dark:bg-[#081B33]/80 hover:bg-slate-100 dark:hover:bg-[#002D56] rounded-xl transition shadow-sm"
            >
              <span>{activeLanguageObj.flag}</span>
              <span className="uppercase font-mono">{activeLanguageObj.code}</span>
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#081B33] border border-slate-200 dark:border-[#002D56] rounded-2xl shadow-2xl py-2 z-50">
                <div className="px-3 pb-2 border-b border-slate-100 dark:border-[#002D56]">
                  <input
                    type="text"
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    placeholder="Search 25 languages..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#6EBE3B]"
                    autoFocus
                  />
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/40">
                  {filteredLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-[#002D56]/60 transition ${
                        selectedLang === lang.code
                          ? 'text-[#6EBE3B] font-bold bg-emerald-50/50 dark:bg-[#002D56]/30'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      <span className="text-[11px] opacity-60 font-mono">{lang.native}</span>
                    </button>
                  ))}
                  {filteredLanguages.length === 0 && (
                    <p className="text-center py-3 text-xs text-slate-400">No language found</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl border border-slate-300 dark:border-[#002D56] bg-white dark:bg-[#081B33]/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#002D56] transition shadow-sm"
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => openAuth(false)}
            className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-[#002D56] bg-white dark:bg-[#081B33]/60 hover:bg-slate-100 dark:hover:bg-[#002D56]/80 rounded-xl transition"
          >
            {t.navLogin}
          </button>
          <button
            onClick={() => openAuth(true)}
            className="px-4 py-2 text-sm font-bold text-slate-950 bg-[#6EBE3B] hover:bg-[#5da730] rounded-xl transition shadow-md shadow-[#6EBE3B]/20"
          >
            {t.navSignup}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center py-20 lg:py-32">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#081B33] border border-emerald-200 dark:border-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#6EBE3B] animate-pulse" />
            {t.badge}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            {t.heroTitle1} <span className="text-[#6EBE3B]">{t.heroHighlight}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openAuth(true)}
              className="px-9 py-4 rounded-xl bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold text-base transition duration-150 shadow-xl shadow-[#6EBE3B]/25"
            >
              {t.ctaStart}
            </button>
            <button
              onClick={() => openAuth(false)}
              className="px-9 py-4 rounded-xl bg-white dark:bg-[#081B33] border border-slate-300 dark:border-[#002D56] text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-slate-100 dark:hover:bg-[#002D56] transition duration-150 shadow-sm"
            >
              {t.ctaLogin}
            </button>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-[#081B33] border border-slate-200 dark:border-[#002D56] rounded-2xl p-8 shadow-2xl text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {isSignUp ? 'Create your Rentwell account' : 'Sign in to Rentwell'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isSignUp ? 'Get started in under two minutes.' : 'Enter your credentials to continue.'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#002D56] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#6EBE3B] text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#002D56] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#6EBE3B] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#002D56] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#6EBE3B] text-sm"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium ${
                    message.type === 'error'
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-[#6EBE3B] border border-emerald-500/20'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold rounded-xl text-sm transition duration-150 disabled:opacity-50 mt-2 shadow-md shadow-[#6EBE3B]/20"
              >
                {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage(null);
                }}
                className="text-[#002D56] dark:text-[#6EBE3B] font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}