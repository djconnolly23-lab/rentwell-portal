'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface TranslationSchema {
  navFeatures: string;
  navLandlords: string;
  navTenants: string;
  navPricing: string;
  navVA: string;
  navCompare: string;
  navLogin: string;
  navSignup: string;
  badge: string;
  heroTitle1: string;
  heroHighlight: string;
  heroSubtitle: string;
  ctaStart: string;
  ctaCompare: string;
  
  // Persona Cards
  forOwners: string;
  landlordTitle: string;
  landlordTag: string;
  landlordDesc: string;
  landlordBtn: string;
  forRenters: string;
  tenantTitle: string;
  tenantTag: string;
  tenantDesc: string;
  tenantBtn: string;

  // Features Grid
  featuresBadge: string;
  featuresTitle: string;
  f1Title: string;
  f1Desc: string;
  f2Title: string;
  f2Desc: string;
  f3Title: string;
  f3Desc: string;
  f4Title: string;
  f4Desc: string;
  f5Title: string;
  f5Desc: string;
  f6Title: string;
  f6Desc: string;

  // Comparison Section
  compareBadge: string;
  compareTitle: string;
  compareDesc: string;
  thFeature: string;
  thAdvantage: string;
  compVA: string;
  compAI: string;
  compMulti: string;
  compScreening: string;
  compLease: string;
  compRent: string;
  compOwner: string;
  compAccounting: string;
  compVendor: string;
  compGuarantees: string;
  compGlobal: string;

  // Closing CTA Banner
  closingTitle: string;
  closingDesc: string;
  closingBtn1: string;
  closingBtn2: string;

  // Auth Modal
  modalSignupTitle: string;
  modalLoginTitle: string;
  modalSignupDesc: string;
  modalLoginDesc: string;
  labelName: string;
  labelEmail: string;
  labelPass: string;
  btnCreateAcc: string;
  btnSignIn: string;
  alreadyAcc: string;
  dontHaveAcc: string;
}

const en: TranslationSchema = {
  navFeatures: 'Features',
  navLandlords: 'Landlords',
  navTenants: 'Tenants',
  navPricing: 'Pricing',
  navVA: 'Virtual Assistants',
  navCompare: 'Compare',
  navLogin: 'Log in',
  navSignup: 'Sign up',
  badge: 'Smart Property Automation',
  heroTitle1: 'Smart property management, powered by',
  heroHighlight: 'Virtual Assistants.',
  heroSubtitle: 'Screen tenants with confidence, generate digital leases, collect automatic rent payments, and manage property operations — all with your built-in Virtual Assistant. Multilingual support ensures every landlord and tenant stays connected.',
  ctaStart: 'Get Started Free',
  ctaCompare: 'See How We Compare',

  forOwners: 'For Property Owners',
  landlordTitle: 'Landlord / Owner',
  landlordTag: 'Manage. Grow. Simplify.',
  landlordDesc: 'Automate rent collections, screen prospective tenants, coordinate maintenance vendors, and track portfolio ROI with real-time analytics.',
  landlordBtn: 'Explore Landlord Tools →',
  forRenters: 'For Residents & Renters',
  tenantTitle: 'Renter / Tenant',
  tenantTag: 'Find. Rent. Thrive.',
  tenantDesc: 'Submit maintenance requests instantly, sign digital leases with ease, set up recurring autopay, and communicate in your native language.',
  tenantBtn: 'Renter Portal Login →',

  featuresBadge: 'Full-Stack Suite',
  featuresTitle: 'Everything your rental portfolio needs.',
  f1Title: 'Virtual Assistants',
  f1Desc: 'Automated VA support for tenant screening, dispatching vendors, tenant communication, marketing and social media, and much more.',
  f2Title: 'Automation & Workflows',
  f2Desc: 'Automatically handles your rental processes — from lease signing to emails, autopay setup, and recurring rent reminders — so every step runs smoothly without manual effort.',
  f3Title: 'Advanced Accounting Engine',
  f3Desc: 'GAAP‑ready double‑entry accounting with P&L, balance sheet, cash flow, rent roll, and tax prep reports. Enterprise‑grade financials built into the platform.',
  f4Title: 'Lease Management',
  f4Desc: 'AI‑powered leasing that automates digital agreements, secure e‑signatures, and renewals — keeping every tenant on track while eliminating manual work.',
  f5Title: 'Tenant Screening & Guarantees',
  f5Desc: 'Nationwide background, credit, and eviction checks paired with comprehensive eviction, pet, and rent payment guarantees.',
  f6Title: 'Operations & Global Portfolios',
  f6Desc: 'Multi-currency, multi-entity support across 25 native languages for domestic and OCONUS property management.',

  compareBadge: 'Market Benchmarks',
  compareTitle: 'How RentWell stacks up against the rest.',
  compareDesc: 'Most property management platforms cover the basics — leases, rent collection, and maintenance. RentWell goes further with built‑in Virtual Assistants, AI, multilingual support, and enterprise‑grade accounting. Here’s how we compare:',
  thFeature: 'Feature',
  thAdvantage: 'RentWell Advantage',
  compVA: 'Virtual Assistants',
  compAI: 'AI Assistant',
  compMulti: 'Multilingual Support',
  compScreening: 'Tenant Screening',
  compLease: 'Lease Management',
  compRent: 'Rent Collection',
  compOwner: 'Owner Portal',
  compAccounting: 'Accounting Engine',
  compVendor: 'Vendor Management',
  compGuarantees: 'Guarantees',
  compGlobal: 'Global Support',

  closingTitle: 'Choose smarter property management.',
  closingDesc: 'Experience the power of built-in Virtual Assistants, automated accounting, and seamless multilingual property operations.',
  closingBtn1: 'Get Started Free',
  closingBtn2: 'See Full Comparison',

  modalSignupTitle: 'Create your RentWell account',
  modalLoginTitle: 'Sign in to RentWell',
  modalSignupDesc: 'Get started in under two minutes.',
  modalLoginDesc: 'Enter your credentials to continue.',
  labelName: 'Full Name',
  labelEmail: 'Email Address',
  labelPass: 'Password',
  btnCreateAcc: 'Create Account',
  btnSignIn: 'Sign In',
  alreadyAcc: 'Already have an account?',
  dontHaveAcc: "Don't have an account?",
};

const es: Partial<TranslationSchema> = {
  navFeatures: 'Características',
  navLandlords: 'Propietarios',
  navTenants: 'Inquilinos',
  navPricing: 'Precios',
  navVA: 'Asistentes Virtuales',
  navCompare: 'Comparativa',
  navLogin: 'Iniciar sesión',
  navSignup: 'Registrarse',
  badge: 'Gestión Inmobiliaria Inteligente',
  heroTitle1: 'Gestión inmobiliaria inteligente, impulsada por',
  heroHighlight: 'Asistentes Virtuales.',
  heroSubtitle: 'Evalúe inquilinos con confianza, genere contratos digitales, cobre alquileres automáticamente y gestione operaciones inmobiliarias con su Asistente Virtual integrado.',
  ctaStart: 'Comenzar Gratis',
  ctaCompare: 'Ver Comparativa',

  forOwners: 'Para Propietarios',
  landlordTitle: 'Propietario / Dueño',
  landlordTag: 'Gestionar. Crecer. Simplificar.',
  landlordDesc: 'Automatice el cobro de alquileres, filtre candidatos, coordine proveedores y supervise su rendimiento con analíticas en tiempo real.',
  landlordBtn: 'Herramientas de Propietario →',
  forRenters: 'Para Residentes e Inquilinos',
  tenantTitle: 'Inquilino / Residente',
  tenantTag: 'Buscar. Alquilar. Prosperar.',
  tenantDesc: 'Envíe solicitudes de mantenimiento, firme contratos digitales al instante, configure el pago automático y comuníquese en su idioma.',
  tenantBtn: 'Portal del Inquilino →',

  featuresBadge: 'Plataforma Integral',
  featuresTitle: 'Todo lo que su portafolio de alquiler necesita.',
  f1Title: 'Asistentes Virtuales',
  f1Desc: 'Soporte de VA automatizado para selección de inquilinos, asignación de contratistas, comunicación, marketing y redes sociales.',
  f2Title: 'Automatización y Flujos',
  f2Desc: 'Gestiona procesos de alquiler automáticamente: firma de contratos, correos de bienvenida, configuración de autopago y recordatorios.',
  f3Title: 'Motor Contable Avanzado',
  f3Desc: 'Contabilidad de doble partida conforme a GAAP con P&L, balance general, flujo de caja y reportes fiscales integrados.',
  f4Title: 'Gestión de Contratos',
  f4Desc: 'Arrendamiento con IA que automatiza contratos digitales, firmas electrónicas seguras y renovaciones puntuales.',
  f5Title: 'Evaluación y Garantías',
  f5Desc: 'Verificación nacional de antecedentes y crédito combinada con garantías de desalojo, mascotas y pago puntual.',
  f6Title: 'Operaciones Globales',
  f6Desc: 'Soporte multimoneda y multi-entidad en 25 idiomas para carteras residenciales nacionales e internacionales.',

  compareBadge: 'Comparativa de Mercado',
  compareTitle: 'Cómo se compara RentWell frente al resto.',
  compareDesc: 'Las plataformas tradicionales cubren lo básico. RentWell va más allá con Asistentes Virtuales, IA, soporte multilingüe y contabilidad de grado empresarial.',
  thFeature: 'Funcionalidad',
  thAdvantage: 'Ventaja RentWell',
  compVA: 'Asistentes Virtuales',
  compAI: 'Asistente de IA',
  compMulti: 'Soporte Multilingüe',
  compScreening: 'Evaluación de Inquilinos',
  compLease: 'Gestión de Contratos',
  compRent: 'Cobro de Alquiler',
  compOwner: 'Portal de Propietarios',
  compAccounting: 'Motor Contable',
  compVendor: 'Gestión de Proveedores',
  compGuarantees: 'Garantías',
  compGlobal: 'Soporte Global',

  closingTitle: 'Elija una gestión inmobiliaria más inteligente.',
  closingDesc: 'Experimente el poder de los Asistentes Virtuales integrados, la contabilidad automatizada y las operaciones en 25 idiomas.',
  closingBtn1: 'Comenzar Gratis',
  closingBtn2: 'Ver Comparativa Completa',

  modalSignupTitle: 'Cree su cuenta RentWell',
  modalLoginTitle: 'Iniciar sesión en RentWell',
  modalSignupDesc: 'Empiece en menos de dos minutos.',
  modalLoginDesc: 'Ingrese sus credenciales para continuar.',
  labelName: 'Nombre Completo',
  labelEmail: 'Correo Electrónico',
  labelPass: 'Contraseña',
  btnCreateAcc: 'Crear Cuenta',
  btnSignIn: 'Iniciar Sesión',
  alreadyAcc: '¿Ya tiene una cuenta?',
  dontHaveAcc: '¿No tiene una cuenta?',
};

const fr: Partial<TranslationSchema> = {
  navFeatures: 'Fonctionnalités',
  navLandlords: 'Propriétaires',
  navTenants: 'Locataires',
  navPricing: 'Tarifs',
  navVA: 'Assistants Virtuels',
  navCompare: 'Comparatif',
  navLogin: 'Connexion',
  navSignup: 'Inscription',
  badge: 'Gestion Immobilière Intelligente',
  heroTitle1: 'Gestion immobilière intelligente, propulsée par',
  heroHighlight: 'des Assistants Virtuels.',
  heroSubtitle: 'Vérifiez les locataires, créez des baux numériques, encaissez les loyers et gérez vos opérations grâce à votre assistant virtuel intégré.',
  ctaStart: 'Commencer Gratuitement',
  ctaCompare: 'Voir le comparatif',
  forOwners: 'Pour les Propriétaires',
  landlordTitle: 'Propriétaire / Bailleur',
  landlordTag: 'Gérer. Développer. Simplifier.',
  landlordDesc: 'Automatisez les loyers, filtrez les candidats, coordonnez les artisans et suivez le rendement de votre patrimoine.',
  landlordBtn: 'Outils Propriétaires →',
  forRenters: 'Pour les Résidents & Locataires',
  tenantTitle: 'Locataire / Résident',
  tenantTag: 'Trouver. Louer. S’épanouir.',
  tenantDesc: 'Signalez les réparations, signez vos baux électroniques et payez votre loyer en toute simplicité dans votre langue.',
  tenantBtn: 'Portail Locataire →',
  featuresBadge: 'Suite Complète',
  featuresTitle: 'Tout ce dont votre portefeuille locatif a besoin.',
  closingTitle: 'Optez pour une gestion immobilière plus intelligente.',
  closingDesc: 'Profitez de la puissance des Assistants Virtuels intégrés et d’une comptabilité d’entreprise automatisée.',
  closingBtn1: 'Commencer Gratuitement',
  closingBtn2: 'Voir le comparatif complet',
  modalSignupTitle: 'Créer votre compte RentWell',
  modalLoginTitle: 'Connexion à RentWell',
  btnCreateAcc: 'Créer un compte',
  btnSignIn: 'Se connecter',
};

const zh: Partial<TranslationSchema> = {
  navFeatures: '功能',
  navLandlords: '房东',
  navTenants: '租客',
  navPricing: '价格',
  navVA: '虚拟助理',
  navCompare: '平台对比',
  navLogin: '登录',
  navSignup: '注册',
  badge: '智能自动化房产管理',
  heroTitle1: '智能房产管理，由',
  heroHighlight: '虚拟助理强力驱动。',
  heroSubtitle: '租客背景调查、电子租约签署、自动收租与运营维护——内置虚拟助理全流程协助，多语言支持让房东与租客沟通无阻。',
  ctaStart: '免费开始使用',
  ctaCompare: '查看平台对比',
  forOwners: '房产所有者专区',
  landlordTitle: '房东 / 业主',
  landlordTag: '管理 · 增值 · 简化',
  landlordDesc: '自动化收租、租客背景审查、维修工单派发及实时投资回报率分析。',
  landlordBtn: '进入房东工具箱 →',
  forRenters: '租客与住户专区',
  tenantTitle: '租客 / 住户',
  tenantTag: '找房 · 入住 · 乐居',
  tenantDesc: '在线提交报修、极速签署电子合同、设置自动扣款并享受母语沟通体验。',
  tenantBtn: '租客门户登录 →',
  featuresBadge: '全流程解决方案',
  featuresTitle: '满足房产管理的一切所需',
  closingTitle: '开启更智慧的房产管理时代',
  closingDesc: '体验内置虚拟助理、自动化财务审计和25种语言支持的强大效率。',
  closingBtn1: '免费开始使用',
  closingBtn2: '查看完整对比',
};

const translations: Record<string, Partial<TranslationSchema>> = {
  en,
  es,
  fr,
  zh,
  de: {
    navFeatures: 'Funktionen',
    navLandlords: 'Vermieter',
    navTenants: 'Mieter',
    navPricing: 'Preise',
    navVA: 'Virtuelle Assistenten',
    navCompare: 'Vergleich',
    navLogin: 'Anmelden',
    navSignup: 'Registrieren',
    badge: 'Intelligente Immobilienverwaltung',
    heroTitle1: 'Intelligente Immobilienverwaltung, unterstützt durch',
    heroHighlight: 'Virtuelle Assistenten.',
    heroSubtitle: 'Mieterprüfung, digitale Mietverträge, automatische Mietzahlung und Verwaltung — alles mit Ihrem integrierten virtuellen Assistenten.',
    ctaStart: 'Kostenlos starten',
    ctaCompare: 'Vergleich ansehen',
    forOwners: 'Für Immobilieneigentümer',
    landlordTitle: 'Vermieter / Eigentümer',
    landlordTag: 'Verwalten. Wachsen. Vereinfachen.',
    tenantTitle: 'Mieter / Bewohner',
    tenantTag: 'Finden. Mieten. Wohlfühlen.',
    closingTitle: 'Wählen Sie intelligentere Immobilienverwaltung.',
  },
  ar: {
    navFeatures: 'الميزات',
    navLandlords: 'الملاك',
    navTenants: 'المستأجرون',
    navPricing: 'الأسعار',
    navVA: 'المساعدون الافتراضيون',
    navCompare: 'المقارنة',
    navLogin: 'تسجيل الدخول',
    navSignup: 'إنشاء حساب',
    badge: 'إدارة عقارات ذكية ومؤتمتة',
    heroTitle1: 'إدارة عقارات ذكية، مدعومة بـ',
    heroHighlight: 'المساعدين الافتراضيين.',
    heroSubtitle: 'فحص المستأجرين بثقة، إنشاء عقود إيجار إلكترونية، تحصيل الإيجارات تلقائياً، وإدارة العمليات مع مساعدك الافتراضي المدمج.',
    ctaStart: 'ابدأ مجاناً',
    ctaCompare: 'شاهد كيف نقارن',
    forOwners: 'لأصحاب العقارات',
    landlordTitle: 'المالك / المؤجر',
    landlordTag: 'إدارة. نمو. تبسيط.',
    tenantTitle: 'المستأجر / المقيم',
    tenantTag: 'ابحث. استأجر. ازدهر.',
    closingTitle: 'اختر إدارة عقارات أكثر ذكاءً.',
  },
  ja: {
    navFeatures: '機能一覧',
    navLandlords: 'オーナー様',
    navTenants: '入居者様',
    navPricing: '料金プラン',
    navVA: 'バーチャルアシスタント',
    navCompare: '他社比較',
    navLogin: 'ログイン',
    navSignup: '新規登録',
    badge: '次世代スマート賃貸管理',
    heroTitle1: 'スマートな賃貸管理を、',
    heroHighlight: 'バーチャルアシスタントの力で。',
    heroSubtitle: '入居者審査から電子契約、家賃自動回収、物件管理まで、専任のバーチャルアシスタントと多言語機能がサポート。',
    ctaStart: '無料で始める',
    ctaCompare: '他社比較を見る',
    landlordTitle: 'オーナー / 賃貸人',
    tenantTitle: '入居者 / 賃借人',
    closingTitle: 'よりスマートな賃貸管理を選択してください。',
  },
  ko: {
    navFeatures: '주요 기능',
    navLandlords: '임대인',
    navTenants: '임차인',
    navPricing: '요금 안내',
    navVA: '가상 비서 (VA)',
    navCompare: '비교하기',
    navLogin: '로그인',
    navSignup: '회원가입',
    badge: '스마트 임대 관리 자동화',
    heroTitle1: '스마트한 임대 관리,',
    heroHighlight: '가상 비서(VA)와 함께.',
    heroSubtitle: '세입자 심사, 전자 계약, 자동 월세 수납, 운영 관리까지 내장된 가상 비서와 다국어 지원으로 완벽하게 자동화하세요.',
    ctaStart: '무료로 시작하기',
    ctaCompare: '서비스 비교 보기',
    landlordTitle: '임대인 / 건물주',
    tenantTitle: '임차인 / 세입자',
    closingTitle: '더 스마트한 임대 관리를 경험하세요.',
  },
  vi: {
    navFeatures: 'Tính năng',
    navLandlords: 'Chủ nhà',
    navTenants: 'Người thuê',
    navPricing: 'Bảng giá',
    navVA: 'Trợ Lý Ảo (VA)',
    navCompare: 'So sánh',
    navLogin: 'Đăng nhập',
    navSignup: 'Đăng ký',
    badge: 'Tự Động Hóa Quản Lý Bất Động Sản',
    heroTitle1: 'Quản lý bất động sản thông minh, vận hành bởi',
    heroHighlight: 'Trợ Lý Ảo (VA).',
    heroSubtitle: 'Sàng lọc người thuê, tạo hợp đồng điện tử, thu tiền thuê tự động và quản lý vận hành với Trợ lý ảo tích hợp.',
    ctaStart: 'Bắt đầu miễn phí',
    ctaCompare: 'Xem bảng so sánh',
    landlordTitle: 'Chủ nhà / Nhà đầu tư',
    tenantTitle: 'Người thuê nhà',
    closingTitle: 'Lựa chọn phương thức quản lý thông minh hơn.',
  },
  km: {
    navFeatures: 'លក្ខណៈពិសេស',
    navLandlords: 'ម្ចាស់ផ្ទះ',
    navTenants: 'អ្នកជួល',
    navPricing: 'តម្លៃ',
    navVA: 'ជំនួយការនិម្មិត (VA)',
    navCompare: 'ការប្រៀបធៀប',
    navLogin: 'ចូល',
    navSignup: 'ចុះឈ្មោះ',
    badge: 'ការគ្រប់គ្រងអចលនទ្រព្យវៃឆ្លាត',
    heroTitle1: 'ការគ្រប់គ្រងអចលនទ្រព្យវៃឆ្លាត ដំណើរការដោយ',
    heroHighlight: 'ជំនួយការនិម្មិត (VA)។',
    heroSubtitle: 'ពិនិត្យអ្នកជួល បង្កើតកិច្ចសន្យាជួលឌីជីថល ប្រមូលប្រាក់ឈ្នួលស្វ័យប្រវត្តិ និងគ្រប់គ្រងប្រតិបត្តិការជាមួយជំនួយការនិម្មិត។',
    ctaStart: 'ចាប់ផ្តើមដោយឥតគិតថ្លៃ',
    ctaCompare: 'មើលការប្រៀបធៀប',
    landlordTitle: 'ម្ចាស់ផ្ទះ / ម្ចាស់អចលនទ្រព្យ',
    tenantTitle: 'អ្នកជួល',
    closingTitle: 'ជ្រើសរើសការគ្រប់គ្រងអចលនទ្រព្យកាន់តែវៃឆ្លាត។',
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
    if (savedLang) {
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

  // Safe translation resolution with English fallback
  const t: TranslationSchema = {
    ...en,
    ...(translations[selectedLang] || {}),
  };

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

  const comparisonRows = [
    {
      feature: t.compVA,
      rentwell: '✅ Built‑in assistants',
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compAI,
      rentwell: '✅ Natural language queries',
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compMulti,
      rentwell: '✅ Tenant & owner portals',
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compScreening,
      rentwell: '✅ Integrated',
      turbotenant: '✅',
      buildium: '✅',
      appfolio: '✅',
      avail: '✅',
    },
    {
      feature: t.compLease,
      rentwell: '✅ Digital leases + addendums',
      turbotenant: '✅',
      buildium: '✅',
      appfolio: '✅',
      avail: '✅',
    },
    {
      feature: t.compRent,
      rentwell: '✅ Stripe + ledger',
      turbotenant: '✅',
      buildium: '✅',
      appfolio: '✅',
      avail: '✅',
    },
    {
      feature: t.compOwner,
      rentwell: '✅ Advanced dashboards',
      turbotenant: '—',
      buildium: '✅',
      appfolio: '✅',
      avail: '—',
    },
    {
      feature: t.compAccounting,
      rentwell: '✅ GAAP double‑entry',
      turbotenant: 'Basic',
      buildium: '✅',
      appfolio: '✅',
      avail: 'Basic',
    },
    {
      feature: t.compVendor,
      rentwell: '✅ Work orders + invoices',
      turbotenant: '—',
      buildium: '✅',
      appfolio: '✅',
      avail: '—',
    },
    {
      feature: t.compGuarantees,
      rentwell: '✅ Eviction, pet, rent, happiness',
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compGlobal,
      rentwell: '✅ Multi‑entity, multi‑currency',
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040D1A] text-slate-900 dark:text-white flex flex-col relative overflow-hidden font-sans transition-colors duration-200 selection:bg-[#6EBE3B] selection:text-slate-950 scroll-smooth">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-[#002D56]/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#6EBE3B]/15 dark:bg-[#6EBE3B]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Navigation with 5x Enlarged Logo */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-2xl p-2.5 flex items-center justify-center bg-white/95 dark:bg-white shadow-md border border-slate-200/80 dark:border-transparent">
            <Image
              src="/rentwell-logo.png"
              alt="RentWell"
              width={260}
              height={70}
              priority
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Dynamic Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navFeatures}</a>
          <a href="#landlords" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navLandlords}</a>
          <a href="#tenants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navTenants}</a>
          <a href="#virtual-assistants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navVA}</a>
          <a href="#comparison" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navCompare}</a>
          <a href="#pricing" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">{t.navPricing}</a>
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

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center pt-14 pb-12 lg:pt-20 lg:pb-16">
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#081B33] border border-emerald-200 dark:border-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6EBE3B] animate-pulse" />
            {t.badge}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
            {t.heroTitle1} <span className="text-[#6EBE3B]">{t.heroHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => openAuth(true)}
              className="px-8 py-3.5 rounded-xl bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold text-base transition duration-150 shadow-xl shadow-[#6EBE3B]/25"
            >
              {t.ctaStart}
            </button>
            <a
              href="#comparison"
              className="px-8 py-3.5 rounded-xl bg-white dark:bg-[#081B33] border border-slate-300 dark:border-[#002D56] text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-slate-100 dark:hover:bg-[#002D56] transition duration-150 shadow-sm inline-flex items-center gap-2"
            >
              {t.ctaCompare} ↓
            </a>
          </div>
        </div>
      </main>

      {/* Dual Persona Showcase Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Landlord Card */}
          <div id="landlords" className="group bg-white dark:bg-[#081B33]/90 border border-slate-200 dark:border-[#002D56] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#002D56]/10 dark:bg-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold rounded-lg uppercase tracking-wider">
                {t.forOwners}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {t.landlordTitle}
              </h3>
              <p className="text-sm font-semibold text-[#6EBE3B] uppercase tracking-wide">
                {t.landlordTag}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t.landlordDesc}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => openAuth(true)}
                className="w-full py-3 bg-[#002D56] hover:bg-[#081B33] text-white font-bold rounded-xl text-sm transition shadow-md"
              >
                {t.landlordBtn}
              </button>
            </div>
          </div>

          {/* Tenant Card */}
          <div id="tenants" className="group bg-white dark:bg-[#081B33]/90 border border-slate-200 dark:border-[#002D56] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#6EBE3B]/15 text-emerald-800 dark:text-[#6EBE3B] text-xs font-bold rounded-lg uppercase tracking-wider">
                {t.forRenters}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {t.tenantTitle}
              </h3>
              <p className="text-sm font-semibold text-[#6EBE3B] uppercase tracking-wide">
                {t.tenantTag}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {t.tenantDesc}
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => openAuth(false)}
                className="w-full py-3 bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold rounded-xl text-sm transition shadow-md shadow-[#6EBE3B]/20"
              >
                {t.tenantBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Capability Feature Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">{t.featuresBadge}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {t.featuresTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div id="virtual-assistants" className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🎧
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.f1Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.f1Desc}</p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.f2Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.f2Desc}</p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.f3Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.f3Desc}</p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              📝
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.f4Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.f4Desc}</p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.f5Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.f5Desc}</p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🌐
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t.f6Title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.f6Desc}</p>
          </div>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section id="comparison" className="relative z-10 max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">{t.compareBadge}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {t.compareTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.compareDesc}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#002D56] bg-white dark:bg-[#081B33] shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#002D56] bg-slate-100/70 dark:bg-[#040D1A]/80 text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300">
                <th className="py-4 px-5">{t.thFeature}</th>
                <th className="py-4 px-5 bg-emerald-500/10 text-emerald-700 dark:text-[#6EBE3B] border-x border-emerald-500/20 font-black">
                  {t.thAdvantage}
                </th>
                <th className="py-4 px-4 text-center">TurboTenant</th>
                <th className="py-4 px-4 text-center">Buildium</th>
                <th className="py-4 px-4 text-center">AppFolio</th>
                <th className="py-4 px-4 text-center">Avail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#002D56]/30 transition"
                >
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-5 bg-emerald-500/5 dark:bg-[#6EBE3B]/10 font-bold text-emerald-800 dark:text-[#6EBE3B] border-x border-emerald-500/20">
                    {row.rentwell}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 dark:text-slate-400 font-medium">
                    {row.turbotenant}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 dark:text-slate-400 font-medium">
                    {row.buildium}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 dark:text-slate-400 font-medium">
                    {row.appfolio}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500 dark:text-slate-400 font-medium">
                    {row.avail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-slate-900 via-[#002D56] to-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-2xl border border-[#002D56] space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {t.closingTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            {t.closingDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openAuth(true)}
              className="px-9 py-4 rounded-xl bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold text-base transition duration-150 shadow-xl shadow-[#6EBE3B]/30"
            >
              {t.closingBtn1}
            </button>
            <a
              href="#comparison"
              className="px-9 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition duration-150"
            >
              {t.closingBtn2}
            </a>
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
                {isSignUp ? t.modalSignupTitle : t.modalLoginTitle}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isSignUp ? t.modalSignupDesc : t.modalLoginDesc}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{t.labelName}</label>
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{t.labelEmail}</label>
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{t.labelPass}</label>
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
                {loading ? 'Processing...' : isSignUp ? t.btnCreateAcc : t.btnSignIn}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              {isSignUp ? t.alreadyAcc : t.dontHaveAcc}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage(null);
                }}
                className="text-[#002D56] dark:text-[#6EBE3B] font-bold hover:underline ml-1"
              >
                {isSignUp ? t.navLogin : t.navSignup}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}