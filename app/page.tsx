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
  navVA: string;
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
  ar: {
    navFeatures: 'الميزات',
    navLandlords: 'الملاك',
    navTenants: 'المستأجرون',
    navPricing: 'الأسعار',
    navVA: 'المساعدون الافتراضيون',
    navLogin: 'تسجيل الدخول',
    navSignup: 'إنشاء حساب',
    badge: 'إدارة عقارات ذكية ومؤتمتة',
    heroTitle1: 'إدارة عقارات ذكية، مدعومة بـ',
    heroHighlight: 'المساعدين الافتراضيين.',
    heroSubtitle: 'فحص المستأجرين، إنشاء عقود إيجار إلكترونية، تحصيل الإيجارات تلقائياً، وإدارة العمليات — كل ذلك مع مساعدك الافتراضي المدمج والدعم متعدد اللغات.',
    ctaStart: 'أتمتة عقاراتك اليوم',
    ctaLogin: 'الدخول إلى البوابة',
  },
  my: {
    navFeatures: 'လုပ်ဆောင်ချက်များ',
    navLandlords: 'အိမ်ရှင်များ',
    navTenants: 'အိမ်ငှားများ',
    navPricing: 'ဈေးနှုန်း',
    navVA: 'Virtual Assistants',
    navLogin: 'အကောင့်ဝင်ရန်',
    navSignup: 'စာရင်းသွင်းရန်',
    badge: 'ခေတ်မီ အလိုအလျောက် စနစ်',
    heroTitle1: 'Virtual Assistants များဖြင့် ထောက်ပံ့ပေးထားသော',
    heroHighlight: 'ခေတ်မီ အိမ်ခြံမြေ စီမံခန့်ခွဲမှု။',
    heroSubtitle: 'အိမ်ငှားစိစစ်ခြင်း၊ စာချုပ်များ၊ ငှားရမ်းခကောက်ခံခြင်းနှင့် အဆောက်အအုံစီမံခန့်ခွဲမှုများကို Virtual Assistant ဖြင့် အလိုအလျောက် ဆောင်ရွက်ပါ။',
    ctaStart: 'ယနေ့ပဲ အလိုအလျောက် စတင်ပါ',
    ctaLogin: 'စနစ်သို့ ဝင်ရန်',
  },
  zh: {
    navFeatures: '功能',
    navLandlords: '房东',
    navTenants: '租客',
    navPricing: '价格',
    navVA: '虚拟助理',
    navLogin: '登录',
    navSignup: '注册',
    badge: '智能自动化房产管理',
    heroTitle1: '智能房产管理，由',
    heroHighlight: '虚拟助理强力驱动。',
    heroSubtitle: '租客背景调查、电子租约签署、自动收租与运营维护——内置虚拟助理全流程协助，多语言支持让房东与租客沟通无阻。',
    ctaStart: '立即开启自动化管理',
    ctaLogin: '进入管理后台',
  },
  nl: {
    navFeatures: 'Functies',
    navLandlords: 'Verhuurders',
    navTenants: 'Huurders',
    navPricing: 'Tarieven',
    navVA: 'Virtuele Assistenten',
    navLogin: 'Inloggen',
    navSignup: 'Aanmelden',
    badge: 'Slim & Geautomatiseerd Vastgoedbeheer',
    heroTitle1: 'Slim vastgoedbeheer, aangedreven door',
    heroHighlight: 'Virtuele Assistenten.',
    heroSubtitle: 'Screen huurders, genereer digitale contracten, incasseer automatisch huur en beheer vastgoedactiviteiten met uw ingebouwde Virtuele Assistent.',
    ctaStart: 'Automatiseer uw verhuur vandaag',
    ctaLogin: 'Naar Portal',
  },
  en: {
    navFeatures: 'Features',
    navLandlords: 'Landlords',
    navTenants: 'Tenants',
    navPricing: 'Pricing',
    navVA: 'Virtual Assistants',
    navLogin: 'Log in',
    navSignup: 'Sign up',
    badge: 'Smart Property Automation',
    heroTitle1: 'Smart property management, powered by',
    heroHighlight: 'Virtual Assistants.',
    heroSubtitle: 'Screen tenants with confidence, generate digital leases, collect automatic rent payments, and manage property operations — all with your built-in Virtual Assistant. Multilingual support ensures every landlord and tenant stays connected.',
    ctaStart: 'Automate your rentals today',
    ctaLogin: 'Access Portal',
  },
  fr: {
    navFeatures: 'Fonctionnalités',
    navLandlords: 'Propriétaires',
    navTenants: 'Locataires',
    navPricing: 'Tarifs',
    navVA: 'Assistants Virtuels',
    navLogin: 'Connexion',
    navSignup: 'Inscription',
    badge: 'Gestion Immobilière Intelligente',
    heroTitle1: 'Gestion immobilière intelligente, propulsée par',
    heroHighlight: 'des Assistants Virtuels.',
    heroSubtitle: 'Vérifiez les locataires, créez des baux numériques, encaissez les loyers et gérez vos opérations grâce à votre assistant virtuel intégré et multilingue.',
    ctaStart: 'Automatisez vos locations dès aujourd’hui',
    ctaLogin: 'Accéder au Portail',
  },
  de: {
    navFeatures: 'Funktionen',
    navLandlords: 'Vermieter',
    navTenants: 'Mieter',
    navPricing: 'Preise',
    navVA: 'Virtuelle Assistenten',
    navLogin: 'Anmelden',
    navSignup: 'Registrieren',
    badge: 'Intelligente Immobilienverwaltung',
    heroTitle1: 'Intelligente Immobilienverwaltung, unterstützt durch',
    heroHighlight: 'Virtuelle Assistenten.',
    heroSubtitle: 'Mieterprüfung, digitale Mietverträge, automatische Mietzahlung und Verwaltung — alles mit Ihrem integrierten virtuellen Assistenten.',
    ctaStart: 'Automatisieren Sie Ihre Vermietung noch heute',
    ctaLogin: 'Zum Portal',
  },
  ht: {
    navFeatures: 'Karakteristik',
    navLandlords: 'Pwopriyetè',
    navTenants: 'Lokatè',
    navPricing: 'Pri',
    navVA: 'Asistan Virtiyèl',
    navLogin: 'Konekte',
    navSignup: 'Enskri',
    badge: 'Jesyon Entèlijan & Otomatik',
    heroTitle1: 'Jesyon imobilye entèlijan, ki fonksyone ak',
    heroHighlight: 'Asistan Virtiyèl.',
    heroSubtitle: 'Tcheke lokatè, kreye kontra dijital, resevwa lwaye otomatikman, epi jere tout operasyon ak Asistan Virtiyèl entegre ou a.',
    ctaStart: 'Otomatize lwaye w jodi a',
    ctaLogin: 'Louvri Pòtal',
  },
  hi: {
    navFeatures: 'विशेषताएं',
    navLandlords: 'मकान मालिक',
    navTenants: 'किरायेदार',
    navPricing: 'मूल्य निर्धारण',
    navVA: 'वर्चुअल असिस्टेंट्स',
    navLogin: 'लॉग इन',
    navSignup: 'साइन अप',
    badge: 'स्मार्ट और स्वचालित संपत्ति प्रबंधन',
    heroTitle1: 'स्मार्ट संपत्ति प्रबंधन, संचालित',
    heroHighlight: 'वर्चुअल असिस्टेंट्स द्वारा।',
    heroSubtitle: 'किरायेदार सत्यापन, डिजिटल पट्टे, स्वचालित किराया संग्रह और संपत्ति प्रबंधन — सब कुछ आपके इन-बिल्ट वर्चुअल असिस्टेंट के साथ।',
    ctaStart: 'आज ही अपने किराये को स्वचालित करें',
    ctaLogin: 'पोर्टल खोलें',
  },
  hmn: {
    navFeatures: 'Cov Yam Ntxwv',
    navLandlords: 'Cov Tswv Tsev',
    navTenants: 'Cov Xauj Tsev',
    navPricing: 'Nqi',
    navVA: 'Cov Pab Cuam Virtual',
    navLogin: 'Nkag Mus',
    navSignup: 'Sau Npe',
    badge: 'Kev Tswj Vaj Tse Ntse',
    heroTitle1: 'Kev tswj vaj tse ntse, txhawb nqa los ntawm',
    heroHighlight: 'Cov Pab Cuam Virtual.',
    heroSubtitle: 'Tshawb xyuas cov neeg xauj tsev, tsim daim ntawv cog lus, sau nqi xauj tsev thiab tswj txhua yam nrog koj tus Pab Cuam Virtual.',
    ctaStart: 'Pib ua haujlwm tsis siv neeg hnub no',
    ctaLogin: 'Nkag Rau Portal',
  },
  id: {
    navFeatures: 'Fitur',
    navLandlords: 'Pemilik Properti',
    navTenants: 'Penyewa',
    navPricing: 'Harga',
    navVA: 'Asisten Virtual',
    navLogin: 'Masuk',
    navSignup: 'Daftar',
    badge: 'Manajemen Properti Otomatis',
    heroTitle1: 'Manajemen properti pintar, didukung oleh',
    heroHighlight: 'Asisten Virtual.',
    heroSubtitle: 'Seleksi penyewa, buat sewa digital, kumpulkan pembayaran sewa otomatis, dan kelola operasional bersama Asisten Virtual terintegrasi.',
    ctaStart: 'Otomatiskan sewa Anda hari ini',
    ctaLogin: 'Buka Portal',
  },
  it: {
    navFeatures: 'Funzionalità',
    navLandlords: 'Proprietari',
    navTenants: 'Inquilini',
    navPricing: 'Prezzi',
    navVA: 'Assistenti Virtuali',
    navLogin: 'Accedi',
    navSignup: 'Registrati',
    badge: 'Gestione Immobiliare Intelligente',
    heroTitle1: 'Gestione immobiliare intelligente, potenziata da',
    heroHighlight: 'Assistenti Virtuali.',
    heroSubtitle: 'Screening inquilini, contratti digitali, riscossione automatica degli affitti e gestione operativa con il tuo Assistente Virtuale integrato.',
    ctaStart: 'Automatizza i tuoi affitti oggi',
    ctaLogin: 'Accedi al Portale',
  },
  ja: {
    navFeatures: '機能一覧',
    navLandlords: 'オーナー様',
    navTenants: '入居者様',
    navPricing: '料金プラン',
    navVA: 'バーチャルアシスタント',
    navLogin: 'ログイン',
    navSignup: '新規登録',
    badge: '次世代スマート賃貸管理',
    heroTitle1: 'スマートな賃貸管理を、',
    heroHighlight: 'バーチャルアシスタントの力で。',
    heroSubtitle: '入居者審査から電子契約、家賃自動回収、物件管理まで、専任のバーチャルアシスタントと多言語機能がシームレスにサポート。',
    ctaStart: '今すぐ賃貸管理を自動化',
    ctaLogin: 'ポータルを開く',
  },
  km: {
    navFeatures: 'លក្ខណៈពិសេស',
    navLandlords: 'ម្ចាស់ផ្ទះ',
    navTenants: 'អ្នកជួល',
    navPricing: 'តម្លៃ',
    navVA: 'ជំនួយការនិម្មិត (VA)',
    navLogin: 'ចូល',
    navSignup: 'ចុះឈ្មោះ',
    badge: 'ការគ្រប់គ្រងអចលនទ្រព្យវៃឆ្លាត',
    heroTitle1: 'ការគ្រប់គ្រងអចលនទ្រព្យវៃឆ្លាត ដំណើរការដោយ',
    heroHighlight: 'ជំនួយការនិម្មិត (VA)។',
    heroSubtitle: 'ពិនិត្យអ្នកជួល បង្កើតកិច្ចសន្យាជួលឌីជីថល ប្រមូលប្រាក់ឈ្នួលស្វ័យប្រវត្តិ និងគ្រប់គ្រងប្រតិបត្តិការទាំងអស់ជាមួយជំនួយការនិម្មិត និងការគាំទ្រពហុភាសា។',
    ctaStart: 'ធ្វើស្វ័យប្រវត្តិកម្មការជួលរបស់អ្នកថ្ងៃនេះ',
    ctaLogin: 'ចូលប្រើប្រាស់',
  },
  ko: {
    navFeatures: '주요 기능',
    navLandlords: '임대인',
    navTenants: '임차인',
    navPricing: '요금 안내',
    navVA: '가상 비서 (VA)',
    navLogin: '로그인',
    navSignup: '회원가입',
    badge: '스마트 임대 관리 자동화',
    heroTitle1: '스마트한 임대 관리,',
    heroHighlight: '가상 비서(VA)와 함께.',
    heroSubtitle: '세입자 심사, 전자 계약, 자동 월세 수납, 운영 관리까지 내장된 가상 비서와 다국어 지원으로 완벽하게 자동화하세요.',
    ctaStart: '지금 임대 관리 자동화하기',
    ctaLogin: '포털 접속',
  },
  pl: {
    navFeatures: 'Funkcje',
    navLandlords: 'Właściciele',
    navTenants: 'Najemcy',
    navPricing: 'Cennik',
    navVA: 'Wirtualni Asystenci',
    navLogin: 'Zaloguj',
    navSignup: 'Zarejestruj',
    badge: 'Inteligentne Zarządzanie Najmem',
    heroTitle1: 'Inteligentne zarządzanie najmem, wspierane przez',
    heroHighlight: 'Wirtualnych Asystentów.',
    heroSubtitle: 'Weryfikacja najemców, cyfrowe umowy, automatyczny pobór czynszu i obsługa nieruchomości z wbudowanym Wirtualnym Asystentem.',
    ctaStart: 'Zautomatyzuj swój najem już dziś',
    ctaLogin: 'Przejdź do portalu',
  },
  pt: {
    navFeatures: 'Recursos',
    navLandlords: 'Proprietários',
    navTenants: 'Inquilinos',
    navPricing: 'Preços',
    navVA: 'Assistentes Virtuais',
    navLogin: 'Entrar',
    navSignup: 'Cadastre-se',
    badge: 'Gestão Imobiliária Inteligente',
    heroTitle1: 'Gestão imobiliária inteligente, impulsionada por',
    heroHighlight: 'Assistentes Virtuais.',
    heroSubtitle: 'Analise inquilinos, crie contratos digitais, colete pagamentos automáticos e gerencie operações com seu Assistente Virtual integrado.',
    ctaStart: 'Automatize seus aluguéis hoje',
    ctaLogin: 'Acessar Portal',
  },
  ru: {
    navFeatures: 'Функции',
    navLandlords: 'Арендодатели',
    navTenants: 'Арендаторы',
    navPricing: 'Цены',
    navVA: 'Виртуальные ассистенты',
    navLogin: 'Вход',
    navSignup: 'Регистрация',
    badge: 'Умное управление недвижимостью',
    heroTitle1: 'Умное управление недвижимостью на базе',
    heroHighlight: 'Виртуальных ассистентов.',
    heroSubtitle: 'Проверка арендаторов, цифровые договоры, автоплатежи и управление объектами с вашим встроенным виртуальным помощником.',
    ctaStart: 'Автоматизируйте аренду сегодня',
    ctaLogin: 'Войти в портал',
  },
  so: {
    navFeatures: 'Astaamaha',
    navLandlords: 'Mulkiilayaasha',
    navTenants: 'Kireystayaasha',
    navPricing: 'Qiimaha',
    navVA: 'Kaaliyeyaasha Khabiirka ah',
    navLogin: 'Gal',
    navSignup: 'Isdiiwaangeli',
    badge: 'Maamul Casri ah & Fudud',
    heroTitle1: 'Maamul guri oo caqli badan, oo ay ku shaqeeyaan',
    heroHighlight: 'Kaaliyeyaasha Virtual-ka ah.',
    heroSubtitle: 'Baadhitaanka kireystaha, heshiisyada dhijitaalka ah, ururinta kirada tooska ah, iyo maamulka howlgalka adoo adeegsanaya Kaaliyahaaga Virtual.',
    ctaStart: 'Toosi kiradaada maanta',
    ctaLogin: 'Fur Bogga',
  },
  es: {
    navFeatures: 'Características',
    navLandlords: 'Propietarios',
    navTenants: 'Inquilinos',
    navPricing: 'Precios',
    navVA: 'Asistentes Virtuales',
    navLogin: 'Iniciar sesión',
    navSignup: 'Registrarse',
    badge: 'Gestión Inmobiliaria Inteligente',
    heroTitle1: 'Gestión inmobiliaria inteligente, impulsada por',
    heroHighlight: 'Asistentes Virtuales.',
    heroSubtitle: 'Evalúe inquilinos con confianza, genere contratos digitales, cobre alquileres automáticamente y gestione operaciones inmobiliarias, todo con su Asistente Virtual integrado.',
    ctaStart: 'Automatice sus alquileres hoy',
    ctaLogin: 'Acceder al Portal',
  },
  tl: {
    navFeatures: 'Mga Tampok',
    navLandlords: 'Mga May-ari',
    navTenants: 'Mga Nangungupahan',
    navPricing: 'Presyo',
    navVA: 'Virtual Assistants',
    navLogin: 'Mag-log in',
    navSignup: 'Mag-sign up',
    badge: 'Matalinong Pamamahala ng Rental',
    heroTitle1: 'Matalinong pamamahala ng ari-arian, pinapagana ng',
    heroHighlight: 'Virtual Assistants.',
    heroSubtitle: 'Magsala ng mga tenant, gumawa ng digital lease, mangolekta ng upa nang awtomatiko, at magpatakbo ng operasyon gamit ang iyong built-in Virtual Assistant.',
    ctaStart: 'I-automate ang iyong rental ngayon',
    ctaLogin: 'Buksan ang Portal',
  },
  th: {
    navFeatures: 'ฟีเจอร์',
    navLandlords: 'เจ้าของห้อง',
    navTenants: 'ผู้เช่า',
    navPricing: 'ราคา',
    navVA: 'ผู้ช่วยเสมือน (VA)',
    navLogin: 'เข้าสู่ระบบ',
    navSignup: 'สมัครสมาชิก',
    badge: 'ระบบจัดการอสังหาริมทรัพย์อัจฉริยะ',
    heroTitle1: 'การจัดการอสังหาริมทรัพย์อัจฉริยะ ขับเคลื่อนโดย',
    heroHighlight: 'ผู้ช่วยเสมือนจริง (Virtual Assistants)',
    heroSubtitle: 'คัดกรองผู้เช่า สร้างสัญญาเช่าดิจิทัล รับชำระค่าเช่าอัตโนมัติ และจัดการการดำเนินงานทั้งหมดด้วยผู้ช่วยเสมือนและระบบหลายภาษา',
    ctaStart: 'เริ่มระบบอัตโนมัติวันนี้',
    ctaLogin: 'เข้าสู่พอร์ทัล',
  },
  tr: {
    navFeatures: 'Özellikler',
    navLandlords: 'Ev Sahipleri',
    navTenants: 'Kiracılar',
    navPricing: 'Fiyatlandırma',
    navVA: 'Sanal Asistanlar',
    navLogin: 'Giriş Yap',
    navSignup: 'Kayıt Ol',
    badge: 'Akıllı Mülk Otomasyonu',
    heroTitle1: 'Sanal Asistanlar ile güçlendirilen',
    heroHighlight: 'akıllı mülk yönetimi.',
    heroSubtitle: 'Kiracı tarama, dijital sözleşmeler, otomatik kira tahsilatı ve mülk operasyonları — hepsi entegre Sanal Asistanınız ve çok dilli destekle.',
    ctaStart: 'Kiralamalarınızı bugün otomatikleştirin',
    ctaLogin: 'Portala Giriş',
  },
  uk: {
    navFeatures: 'Функції',
    navLandlords: 'Орендодавці',
    navTenants: 'Орендарі',
    navPricing: 'Тарифи',
    navVA: 'Віртуальні асистенти',
    navLogin: 'Увійти',
    navSignup: 'Реєстрація',
    badge: 'Розумна автоматизація нерухомості',
    heroTitle1: 'Розумне управління нерухомістю на базі',
    heroHighlight: 'Віртуальних асистентів.',
    heroSubtitle: 'Перевірка орендарів, цифрові договори, автоматичний збір оренди та управління процесами за допомогою вбудованого віртуального помічника.',
    ctaStart: 'Автоматизуйте оренду вже сьогодні',
    ctaLogin: 'Вхід у портал',
  },
  vi: {
    navFeatures: 'Tính năng',
    navLandlords: 'Chủ nhà',
    navTenants: 'Người thuê',
    navPricing: 'Bảng giá',
    navVA: 'Trợ Lý Ảo (VA)',
    navLogin: 'Đăng nhập',
    navSignup: 'Đăng ký',
    badge: 'Tự Động Hóa Quản Lý Bất Động Sản',
    heroTitle1: 'Quản lý bất động sản thông minh, vận hành bởi',
    heroHighlight: 'Trợ Lý Ảo (Virtual Assistants).',
    heroSubtitle: 'Sàng lọc người thuê, tạo hợp đồng điện tử, thu tiền thuê tự động và quản lý vận hành — tất cả với Trợ lý ảo tích hợp và hỗ trợ đa ngôn ngữ.',
    ctaStart: 'Tự động hóa vận hành ngay hôm nay',
    ctaLogin: 'Vào Hệ Thống',
  },
};

const languages = [
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'my', label: 'Burmese', native: 'မြန်မာဘာသာ', flag: '🇲🇲' },
  { code: 'zh', label: 'Chinese (Simp)', native: '简体中文', flag: '🇨🇳' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ht', label: 'Haitian Creole', native: 'Kreyòl Ayisyen', flag: '🇭🇹' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'hmn', label: 'Hmong', native: 'Hmoob', flag: '🇱🇦' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'km', label: 'Khmer', native: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  { code: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'pl', label: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { code: 'pt', label: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { code: 'ru', label: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'so', label: 'Somali', native: 'Soomaali', flag: '🇸🇴' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'tl', label: 'Tagalog', native: 'Filipino', flag: '🇵🇭' },
  { code: 'th', label: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', label: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
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

  const activeLanguageObj =
    languages.find((l) => l.code === selectedLang) ||
    languages.find((l) => l.code === 'en') ||
    languages[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040D1A] text-slate-900 dark:text-white flex flex-col relative overflow-hidden font-sans transition-colors duration-200 selection:bg-[#6EBE3B] selection:text-slate-950">
      {/* Background Ambient Glows */}
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

        {/* Updated Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navFeatures}</a>
          <a href="#landlords" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navLandlords}</a>
          <a href="#tenants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navTenants}</a>
          <a href="#pricing" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navPricing}</a>
          <a href="#virtual-assistants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navVA}</a>
        </nav>

        <div className="flex items-center space-x-2.5">
          {/* Alphabetical 25-Language Dropdown */}
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

          {/* Theme Toggle Button */}
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

      {/* Main Hero */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#081B33] border border-emerald-200 dark:border-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold uppercase tracking-wider shadow-sm">
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

      {/* Dual Persona Showcase Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Landlord Card */}
          <div id="landlords" className="group bg-white dark:bg-[#081B33]/90 border border-slate-200 dark:border-[#002D56] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#002D56]/10 dark:bg-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold rounded-lg uppercase tracking-wider">
                For Property Owners
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                Landlord / Owner
              </h3>
              <p className="text-sm font-semibold text-[#6EBE3B] uppercase tracking-wide">
                Manage. Grow. Simplify.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Automate rent collections, screen prospective tenants, coordinate maintenance vendors, and track portfolio ROI with real-time analytics.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => openAuth(true)}
                className="w-full py-3 bg-[#002D56] hover:bg-[#081B33] text-white font-bold rounded-xl text-sm transition shadow-md"
              >
                Explore Landlord Tools →
              </button>
            </div>
          </div>

          {/* Tenant Card */}
          <div id="tenants" className="group bg-white dark:bg-[#081B33]/90 border border-slate-200 dark:border-[#002D56] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#6EBE3B]/15 text-emerald-800 dark:text-[#6EBE3B] text-xs font-bold rounded-lg uppercase tracking-wider">
                For Residents & Renters
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                Renter / Tenant
              </h3>
              <p className="text-sm font-semibold text-[#6EBE3B] uppercase tracking-wide">
                Find. Rent. Thrive.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Submit maintenance requests instantly, sign digital leases with ease, set up recurring autopay, and communicate in your native language.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => openAuth(false)}
                className="w-full py-3 bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold rounded-xl text-sm transition shadow-md shadow-[#6EBE3B]/20"
              >
                Renter Portal Login →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Flagship Core Capability Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">Full-Stack Suite</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Everything your rental portfolio needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Virtual Assistants */}
          <div id="virtual-assistants" className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🎧
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Virtual Assistants</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Dedicated and automated VA support for screening calls, dispatching vendors, and following up on late payments.
            </p>
          </div>

          {/* Card 2: Workflow Automation */}
          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Automation & Workflows</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Trigger instant sequences: Signed lease $\rightarrow$ Welcome email $\rightarrow$ Autopay setup $\rightarrow$ Recurring rent reminders.
            </p>
          </div>

          {/* Card 3: Advanced Accounting */}
          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Financials & 1099 Tax Prep</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Generate tax documents for owners and vendors, track loan amortization, and automate multi-owner payout distributions.
            </p>
          </div>

          {/* Card 4: Tenant Screening */}
          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tenant Screening & E-Sign</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Nationwide background, credit, and eviction history checks integrated directly with compliant digital leases.
            </p>
          </div>

          {/* Card 5: Maintenance & Operations */}
          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🛠️
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Maintenance & Utility Tracking</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Monitor utility costs, assign contractor work orders, split utility bills, and track sustainability metrics.
            </p>
          </div>

          {/* Card 6: Multilingual & OCONUS */}
          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🌐
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">25 Languages & Global Portfolios</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Multi-currency support and full platform translation across 25 languages for US domestic and OCONUS properties.
            </p>
          </div>
        </div>
      </section>

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