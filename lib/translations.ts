export interface TranslationSchema {
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

  compareBadge: string;
  compareTitle: string;
  compareDesc: string;
  thFeature: string;
  thAdvantage: string;
  compVA: string;
  compVADesc: string;
  compAI: string;
  compAIDesc: string;
  compMulti: string;
  compMultiDesc: string;
  compScreening: string;
  compScreeningDesc: string;
  compLease: string;
  compLeaseDesc: string;
  compRent: string;
  compRentDesc: string;
  compOwner: string;
  compOwnerDesc: string;
  compAccounting: string;
  compAccountingDesc: string;
  compVendor: string;
  compVendorDesc: string;
  compGuarantees: string;
  compGuaranteesDesc: string;
  compGlobal: string;
  compGlobalDesc: string;

  closingTitle: string;
  closingDesc: string;
  closingBtn1: string;
  closingBtn2: string;

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

export const languages = [
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

export const translations: Record<string, TranslationSchema> = {
  en: {
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
    compVADesc: '✅ Built‑in assistants',
    compAI: 'AI Assistant',
    compAIDesc: '✅ Natural language queries',
    compMulti: 'Multilingual Support',
    compMultiDesc: '✅ Tenant & owner portals (25 langs)',
    compScreening: 'Tenant Screening',
    compScreeningDesc: '✅ Integrated background checks',
    compLease: 'Lease Management',
    compLeaseDesc: '✅ Digital leases + addendums',
    compRent: 'Rent Collection',
    compRentDesc: '✅ Stripe + ledger automation',
    compOwner: 'Owner Portal',
    compOwnerDesc: '✅ Advanced dashboards & payouts',
    compAccounting: 'Accounting Engine',
    compAccountingDesc: '✅ GAAP double‑entry & P&L',
    compVendor: 'Vendor Management',
    compVendorDesc: '✅ Work orders + invoices',
    compGuarantees: 'Guarantees',
    compGuaranteesDesc: '✅ Eviction, pet, rent, happiness',
    compGlobal: 'Global Support',
    compGlobalDesc: '✅ Multi‑entity & multi‑currency',
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
  },

  es: {
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
    heroSubtitle: 'Evalúe inquilinos con confianza, genere contratos digitales, cobre alquileres automáticamente y gestione operaciones inmobiliarias con su Asistente Virtual integrado y soporte multilingüe.',
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
    compVADesc: '✅ Asistentes integrados',
    compAI: 'Asistente de IA',
    compAIDesc: '✅ Consultas en lenguaje natural',
    compMulti: 'Soporte Multilingüe',
    compMultiDesc: '✅ Portales en 25 idiomas',
    compScreening: 'Evaluación de Inquilinos',
    compScreeningDesc: '✅ Verificación integrada',
    compLease: 'Gestión de Contratos',
    compLeaseDesc: '✅ Contratos y adendas digitales',
    compRent: 'Cobro de Alquiler',
    compRentDesc: '✅ Stripe y contabilidad automática',
    compOwner: 'Portal de Propietarios',
    compOwnerDesc: '✅ Paneles avanzados y pagos',
    compAccounting: 'Motor Contable',
    compAccountingDesc: '✅ Partida doble GAAP y P&L',
    compVendor: 'Gestión de Proveedores',
    compVendorDesc: '✅ Órdenes de trabajo y facturas',
    compGuarantees: 'Garantías',
    compGuaranteesDesc: '✅ Desalojo, mascotas, alquiler',
    compGlobal: 'Soporte Global',
    compGlobalDesc: '✅ Multidivisa y multientidad',
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
    heroSubtitle: 'ពិនិត្យអ្នកជួលដោយទំនុកចិត្ត បង្កើតកិច្ចសន្យាជួលឌីជីថល ប្រមូលប្រាក់ឈ្នួលស្វ័យប្រវត្តិ និងគ្រប់គ្រងប្រតិបត្តិការទាំងអស់ជាមួយជំនួយការនិម្មិត។',
    ctaStart: 'ចាប់ផ្តើមដោយឥតគិតថ្លៃ',
    ctaCompare: 'មើលការប្រៀបធៀប',
    forOwners: 'សម្រាប់ម្ចាស់អចលនទ្រព្យ',
    landlordTitle: 'ម្ចាស់ផ្ទះ / វិនិយោគិន',
    landlordTag: 'គ្រប់គ្រង · ពង្រីក · សម្រួល',
    landlordDesc: 'ប្រមូលប្រាក់ឈ្នួលស្វ័យប្រវត្តិ ត្រួតពិនិត្យអ្នកជួល ចាត់ចែងជាងជួសជុល និងតាមដានប្រាក់ចំណេញតាមពេលវេលាជាក់ស្តែង។',
    landlordBtn: 'ឧបករណ៍សម្រាប់ម្ចាស់ផ្ទះ →',
    forRenters: 'សម្រាប់អ្នករស់នៅ និងអ្នកជួល',
    tenantTitle: 'អ្នកជួល / អតិថិជន',
    tenantTag: 'ស្វែងរក · ជួល · រស់នៅដោយរីករាយ',
    tenantDesc: 'ដាក់ពាក្យស្នើសុំជួសជុលភ្លាមៗ ចុះហត្ថលេខាលើកិច្ចសន្យាឌីជីថល និងទូទាត់ប្រាក់ឈ្នួលជាភាសាកំណើតរបស់អ្នក។',
    tenantBtn: 'ចូលប្រើផតថលអ្នកជួល →',
    featuresBadge: 'ប្រព័ន្ធគ្រប់គ្រងពេញលេញ',
    featuresTitle: 'អ្វីៗគ្រប់យ៉ាងដែលត្រូវការសម្រាប់ការគ្រប់គ្រងការជួល។',
    f1Title: 'ជំនួយការនិម្មិត (VA)',
    f1Desc: 'ការគាំទ្រ VA ស្វ័យប្រវត្តិសម្រាប់ការពិនិត្យអ្នកជួល ការទាក់ទងជាងជួសជុល ការទំនាក់ទំនង និងទីផ្សារ។',
    f2Title: 'ស្វ័យប្រវត្តិកម្ម & ដំណើរការការងារ',
    f2Desc: 'ចាត់ចែងដំណើរការជួលដោយស្វ័យប្រវត្តិ ចាប់ពីការចុះកិច្ចសន្យា ការផ្ញើអ៊ីមែល រហូតដល់ការរំលឹកបង់ប្រាក់។',
    f3Title: 'ប្រព័ន្ធគណនេយ្យកម្រិតខ្ពស់',
    f3Desc: 'គណនេយ្យស្តង់ដារ GAAP ជាមួយរបាយការណ៍ចំណេញ-ខាត តារាងតុល្យការ លំហូរសាច់ប្រាក់ និងរបាយការណ៍ពន្ធ។',
    f4Title: 'ការគ្រប់គ្រងកិច្ចសន្យាជួល',
    f4Desc: 'ការជួលដំណើរការដោយ AI ដែលបង្កើតកិច្ចសន្យាឌីជីថល ហត្ថលេខាអេឡិចត្រូនិក និងការបន្តកិច្ចសន្យា។',
    f5Title: 'ការពិនិត្យអ្នកជួល & ការធានា',
    f5Desc: 'ការពិនិត្យប្រវត្តិរូបអ្នកជួល និងពិន្ទុឥណទានទូទាំងប្រទេស រួមជាមួយការធានាការទូទាត់ប្រាក់ឈ្នួល។',
    f6Title: 'ប្រតិបត្តិការអន្តរជាតិ & ពហុភាសា',
    f6Desc: 'ការគាំទ្ររូបិយប័ណ្ណច្រើន និងការបកប្រែ ២៥ ភាសាសម្រាប់អចលនទ្រព្យក្នុងស្រុក និងក្រៅប្រទេស។',
    compareBadge: 'ការប្រៀបធៀបទីផ្សារ',
    compareTitle: 'របៀបដែល RentWell ឈានមុខគេលើទីផ្សារ។',
    compareDesc: 'RentWell ផ្តល់ជូនលើសពីប្រព័ន្ធទូទៅ ដោយមានជំនួយការនិម្មិត AI ការគាំទ្រពហុភាសា និងគណនេយ្យកម្រិតសហគ្រាស។',
    thFeature: 'មុខងារ',
    thAdvantage: 'គុណសម្បត្តិ RentWell',
    compVA: 'ជំនួយការនិម្មិត',
    compVADesc: '✅ ជំនួយការនិម្មិតដែលភ្ជាប់មកជាមួយ',
    compAI: 'ជំនួយការ AI',
    compAIDesc: '✅ សំណួរ-ចម្លើយភាសាធម្មជាតិ',
    compMulti: 'ការគាំទ្រពហុភាសា',
    compMultiDesc: '✅ ផតថល ២៥ ភាសា',
    compScreening: 'ការពិនិត្យអ្នកជួល',
    compScreeningDesc: '✅ ពិនិត្យប្រវត្តិស្វ័យប្រវត្តិ',
    compLease: 'ការគ្រប់គ្រងកិច្ចសន្យា',
    compLeaseDesc: '✅ កិច្ចសន្យាឌីជីថល',
    compRent: 'ការប្រមូលប្រាក់ឈ្នួល',
    compRentDesc: '✅ ការទូទាត់ Stripe ស្វ័យប្រវត្តិ',
    compOwner: 'ផតថលម្ចាស់ផ្ទះ',
    compOwnerDesc: '✅ ផ្ទាំងគ្រប់គ្រងកម្រិតខ្ពស់',
    compAccounting: 'ប្រព័ន្ធគណនេយ្យ',
    compAccountingDesc: '✅ គណនេយ្យ GAAP & P&L',
    compVendor: 'ការគ្រប់គ្រងជាងជួសជុល',
    compVendorDesc: '✅ វិក្កយបត្រ & បញ្ជាការងារ',
    compGuarantees: 'ការធានា',
    compGuaranteesDesc: '✅ ការធានាប្រាក់ឈ្នួល និងសត្វចិញ្ចឹម',
    compGlobal: 'ការគាំទ្រសកល',
    compGlobalDesc: '✅ ពហុរូបិយប័ណ្ណ',
    closingTitle: 'ជ្រើសរើសការគ្រប់គ្រងអចលនទ្រព្យកាន់តែវៃឆ្លាត។',
    closingDesc: 'ទទួលបានបទពិសោធន៍ជាមួយជំនួយការនិម្មិត គណនេយ្យស្វ័យប្រវត្តិ និងការគ្រប់គ្រងពហុភាសា។',
    closingBtn1: 'ចាប់ផ្តើមដោយឥតគិតថ្លៃ',
    closingBtn2: 'មើលការប្រៀបធៀបពេញលេញ',
    modalSignupTitle: 'បង្កើតគណនី RentWell របស់អ្នក',
    modalLoginTitle: 'ចូលប្រើប្រាស់ RentWell',
    modalSignupDesc: 'ចាប់ផ្តើមក្នុងរយៈពេលតិចជាង ២ នាទី។',
    modalLoginDesc: 'បញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីបន្ត។',
    labelName: 'ឈ្មោះពេញ',
    labelEmail: 'អាសយដ្ឋានអ៊ីមែល',
    labelPass: 'ពាក្យសម្ងាត់',
    btnCreateAcc: 'បង្កើតគណនី',
    btnSignIn: 'ចូលប្រព័ន្ធ',
    alreadyAcc: 'មានគណនីរួចហើយមែនទេ?',
    dontHaveAcc: 'មិនទាន់មានគណនីមែនទេ?',
  },

  zh: {
    navFeatures: '功能',
    navLandlords: '房东',
    navTenants: '租客',
    navPricing: '价格',
    navVA: '虚拟助理',
    navCompare: '功能对比',
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
    featuresTitle: '满足房产管理的一切所需。',
    f1Title: '虚拟助理 (VA)',
    f1Desc: '自动处理租客筛选、维修派单、租客沟通、市场营销和社交媒体跟进。',
    f2Title: '自动化与工作流',
    f2Desc: '全自动处理租约签署、欢迎邮件、自动转账及逾期租金提醒。',
    f3Title: '高级财务引擎',
    f3Desc: '符合GAAP标准的企业级复式记账，支持损益表、资产负债表及税务报表导出。',
    f4Title: '租约智能管理',
    f4Desc: 'AI驱动的数字租约、具有法律效力的电子签名与自动化续租流程。',
    f5Title: '租客背景审查与保障',
    f5Desc: '全国范围信用和背景筛查，附带驱逐保障、宠物保障及收租安心保障。',
    f6Title: '跨国资产与多语言支持',
    f6Desc: '支持多币种、多法人主体运作，提供25种语言无缝切换。',
    compareBadge: '行业对比',
    compareTitle: 'RentWell 与传统平台的全面对比。',
    compareDesc: '传统平台仅覆盖基础功能。RentWell 带来内置虚拟助理、AI问答、多语言支持及企业级财务系统。',
    thFeature: '功能特性',
    thAdvantage: 'RentWell 核心优势',
    compVA: '虚拟助理',
    compVADesc: '✅ 内置智能助理',
    compAI: 'AI 智能引擎',
    compAIDesc: '✅ 自然语言交互查询',
    compMulti: '多语言支持',
    compMultiDesc: '✅ 支持25种语言门户',
    compScreening: '租客背景调查',
    compScreeningDesc: '✅ 自动化背景信用检查',
    compLease: '租约管理',
    compLeaseDesc: '✅ 数字租约与电子签名',
    compRent: '自动收租',
    compRentDesc: '✅ Stripe 结算与自动入账',
    compOwner: '业主控制台',
    compOwnerDesc: '✅ 高级财务面板与分红管理',
    compAccounting: '会计引擎',
    compAccountingDesc: '✅ GAAP 复式记账与损益表',
    compVendor: '供应商管理',
    compVendorDesc: '✅ 工单系统与发票追踪',
    compGuarantees: '保障计划',
    compGuaranteesDesc: '✅ 驱逐、宠物与租金保障',
    compGlobal: '全球化支持',
    compGlobalDesc: '✅ 多币种与多实体架构',
    closingTitle: '选择更智能的房产管理方式。',
    closingDesc: '体验内置虚拟助理、全自动财务记账与25国语言支持带来的高效管理。',
    closingBtn1: '免费开始使用',
    closingBtn2: '查看完整对比',
    modalSignupTitle: '创建您的 RentWell 账户',
    modalLoginTitle: '登录 RentWell',
    modalSignupDesc: '2分钟内极速开启。',
    modalLoginDesc: '输入您的登录凭证。',
    labelName: '姓名',
    labelEmail: '电子邮箱',
    labelPass: '密码',
    btnCreateAcc: '创建账户',
    btnSignIn: '立即登录',
    alreadyAcc: '已有账户？',
    dontHaveAcc: '还没有账户？',
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
    heroSubtitle: 'Sàng lọc người thuê tự tin, tạo hợp đồng điện tử, thu tiền thuê tự động và quản lý vận hành với Trợ lý ảo tích hợp và hỗ trợ đa ngôn ngữ.',
    ctaStart: 'Bắt Đầu Miễn Phí',
    ctaCompare: 'Xem Bảng So Sánh',
    forOwners: 'Dành Cho Chủ Sở Hữu',
    landlordTitle: 'Chủ Nhà / Nhà Đầu Tư',
    landlordTag: 'Quản Lý · Phát Triển · Tối Giản',
    landlordDesc: 'Tự động thu tiền thuê, kiểm tra lý lịch người thuê, điều phối bảo trì và theo dõi lợi nhuận theo thời gian thực.',
    landlordBtn: 'Công Cụ Dành Cho Chủ Nhà →',
    forRenters: 'Dành Cho Cư Dân & Người Thuê',
    tenantTitle: 'Người Thuê Nhà',
    tenantTag: 'Tìm Kiếm · Thuê Nhà · An Cư',
    tenantDesc: 'Gửi yêu cầu sửa chữa tức thì, ký hợp đồng điện tử tiện lợi và thanh toán tự động bằng ngôn ngữ mẹ đẻ.',
    tenantBtn: 'Cổng Người Thuê Nhà →',
    featuresBadge: 'Giải Pháp Toàn Diện',
    featuresTitle: 'Mọi thứ danh mục cho thuê của bạn cần.',
    f1Title: 'Trợ Lý Ảo (Virtual Assistants)',
    f1Desc: 'Tự động kiểm tra người thuê, điều phối thợ sửa chữa, giao tiếp cư dân và tiếp thị mạng xã hội.',
    f2Title: 'Tự Động Hóa Quy Trình',
    f2Desc: 'Tự động xử lý từ ký hợp đồng, gửi email chào mừng, thiết lập tự động thanh toán đến nhắc nhở tiền thuê.',
    f3Title: 'Hệ Thống Kế Toán Nâng Cao',
    f3Desc: 'Kế toán kép chuẩn GAAP với báo cáo P&L, bảng cân đối kế toán, dòng tiền và báo cáo thuế đầy đủ.',
    f4Title: 'Quản Lý Hợp Đồng Thuê',
    f4Desc: 'Ứng dụng AI tự động soạn thảo hợp đồng số, chữ ký điện tử bảo mật và nhắc nhở gia hạn.',
    f5Title: 'Sàng Lọc & Bảo Đảm',
    f5Desc: 'Kiểm tra tín dụng, tiền án tiền sự toàn quốc kết hợp các gói bảo đảm thanh toán và thú cưng.',
    f6Title: 'Vận Hành Toàn Cầu & Đa Ngôn Ngữ',
    f6Desc: 'Hỗ trợ đa tiền tệ, đa thực thể và chuyển đổi 25 ngôn ngữ cho bất động sản trong và ngoài nước.',
    compareBadge: 'So Sánh Thị Trường',
    compareTitle: 'RentWell vượt trội thế nào so với nền tảng khác.',
    compareDesc: 'Nền tảng truyền thống chỉ hỗ trợ cơ bản. RentWell tích hợp sẵn Trợ lý ảo, AI, đa ngôn ngữ và kế toán chuẩn doanh nghiệp.',
    thFeature: 'Tính năng',
    thAdvantage: 'Ưu Thế RentWell',
    compVA: 'Trợ Lý Ảo (VA)',
    compVADesc: '✅ Tích hợp sẵn trợ lý',
    compAI: 'Trợ Lý AI',
    compAIDesc: '✅ Truy vấn ngôn ngữ tự nhiên',
    compMulti: 'Hỗ Trợ Đa Ngôn Ngữ',
    compMultiDesc: '✅ Cổng thông tin 25 ngôn ngữ',
    compScreening: 'Kiểm Tra Người Thuê',
    compScreeningDesc: '✅ Tích hợp kiểm tra lý lịch',
    compLease: 'Quản Lý Hợp Đồng',
    compLeaseDesc: '✅ Hợp đồng điện tử',
    compRent: 'Thu Tiền Thuê',
    compRentDesc: '✅ Stripe và sổ cái tự động',
    compOwner: 'Cổng Chủ Nhà',
    compOwnerDesc: '✅ Bảng điều khiển nâng cao',
    compAccounting: 'Hệ Thống Kế Toán',
    compAccountingDesc: '✅ Kế toán kép GAAP & P&L',
    compVendor: 'Quản Lý Nhà Thầu',
    compVendorDesc: '✅ Quản lý công việc & hóa đơn',
    compGuarantees: 'Cam Kết & Bảo Đảm',
    compGuaranteesDesc: '✅ Bảo đảm thanh toán & thú cưng',
    compGlobal: 'Hỗ Trợ Toàn Cầu',
    compGlobalDesc: '✅ Đa tiền tệ & đa chi nhánh',
    closingTitle: 'Lựa chọn phương thức quản lý thông minh hơn.',
    closingDesc: 'Trải nghiệm sức mạnh của Trợ lý ảo tích hợp, kế toán tự động và vận hành bất động sản đa ngôn ngữ.',
    closingBtn1: 'Bắt Đầu Miễn Phí',
    closingBtn2: 'Xem So Sánh Chi Tiết',
    modalSignupTitle: 'Tạo tài khoản RentWell',
    modalLoginTitle: 'Đăng nhập vào RentWell',
    modalSignupDesc: 'Bắt đầu chỉ trong 2 phút.',
    modalLoginDesc: 'Nhập thông tin đăng nhập của bạn.',
    labelName: 'Họ và tên',
    labelEmail: 'Địa chỉ Email',
    labelPass: 'Mật khẩu',
    btnCreateAcc: 'Tạo Tài Khoản',
    btnSignIn: 'Đăng Nhập',
    alreadyAcc: 'Đã có tài khoản?',
    dontHaveAcc: 'Chưa có tài khoản?',
  },
};

// Complete fallback resolver ensuring 100% of keys exist for any selected language
export function getTranslations(langCode: string): TranslationSchema {
  const base = translations.en;
  const target = translations[langCode] || {};
  return { ...base, ...target };
}