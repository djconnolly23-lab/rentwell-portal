const dictionaries: Record<string, Record<string, string>> = {
  en: { 
    welcome: 'Welcome to your Workspace', 
    maintenance: 'Maintenance', 
    documents: 'Documents', 
    unauthorized: 'Unauthorized Access' 
  },
  km: { 
    welcome: 'សូមស្វាគមន៍មកកាន់កន្លែងធ្វើការ', 
    maintenance: 'ការថែទាំ', 
    documents: 'ឯកសារ', 
    unauthorized: 'ការចូលប្រើគ្មានការអនុញ្ញាត' 
  },
  ko: { 
    welcome: '작업 공간에 오신 것을 환영합니다', 
    maintenance: '유지 보수', 
    documents: '문서', 
    unauthorized: '무단 접근' 
  },
  vi: { 
    welcome: 'Chào mừng đến với Không gian làm việc', 
    maintenance: 'Bảo trì', 
    documents: 'Tài liệu', 
    unauthorized: 'Truy cập trái phép' 
  },
  es: { 
    welcome: 'Bienvenido a tu espacio de trabajo', 
    maintenance: 'Mantenimiento', 
    documents: 'Documentos', 
    unauthorized: 'Acceso no autorizado' 
  },
  zh: { 
    welcome: '欢迎来到您的工作区', 
    maintenance: '维护', 
    documents: '文件', 
    unauthorized: '未经授权的访问' 
  },
  ja: { 
    welcome: 'ワークスペースへようこそ', 
    maintenance: 'メンテナンス', 
    documents: 'ドキュメント', 
    unauthorized: '不正アクセス' 
  },
  fr: { 
    welcome: 'Bienvenue dans votre espace de travail', 
    maintenance: 'Entretien', 
    documents: 'Documents', 
    unauthorized: 'Accès non autorisé' 
  },
  de: { 
    welcome: 'Willkommen in Ihrem Arbeitsbereich', 
    maintenance: 'Wartung', 
    documents: 'Dokumente', 
    unauthorized: 'Unbefugter Zugriff' 
  },
  pt: { 
    welcome: 'Bem-vindo ao seu espaço de trabalho', 
    maintenance: 'Manutenção', 
    documents: 'Documentos', 
    unauthorized: 'Acesso não autorizado' 
  },
  tl: { 
    welcome: 'Maligayang pagdating sa iyong Workspace', 
    maintenance: 'Pagpapanatili', 
    documents: 'Mga Dokumento', 
    unauthorized: 'Hindi pinahihintulutang pag-access' 
  },
  th: { 
    welcome: 'ยินดีต้อนรับสู่พื้นที่ทำงานของคุณ', 
    maintenance: 'การบำรุงรักษา', 
    documents: 'เอกสาร', 
    unauthorized: 'การเข้าถึงโดยไม่ได้รับอนุญาต' 
  },
  hi: { 
    welcome: 'आपके कार्यस्थान में आपका स्वागत है', 
    maintenance: 'रखरखाव', 
    documents: 'दस्तावेज़', 
    unauthorized: 'अनाधिकृत पहुंच' 
  },
  ar: { 
    welcome: 'مرحباً بك في مساحة العمل الخاصة بك', 
    maintenance: 'صيانة', 
    documents: 'مستندات', 
    unauthorized: 'دخول غير مصرح به' 
  },
  it: { 
    welcome: 'Benvenuto nel tuo spazio di lavoro', 
    maintenance: 'Manutenzione', 
    documents: 'Documenti', 
    unauthorized: 'Accesso non autorizzato' 
  },
  ru: { 
    welcome: 'Добро пожаловать в рабочую область', 
    maintenance: 'Обслуживание', 
    documents: 'Документы', 
    unauthorized: 'Несанкционированный доступ' 
  },
  nl: { 
    welcome: 'Welkom in uw werkruimte', 
    maintenance: 'Onderhoud', 
    documents: 'Documenten', 
    unauthorized: 'Ongeautoriseerde toegang' 
  },
  pl: { 
    welcome: 'Witamy w Twoim obszarze roboczym', 
    maintenance: 'Konserwacja', 
    documents: 'Dokumenty', 
    unauthorized: 'Nieautoryzowany dostęp' 
  },
  tr: { 
    welcome: 'Çalışma alanınıza hoş geldiniz', 
    maintenance: 'Bakım', 
    documents: 'Belgeler', 
    unauthorized: 'Yetkisiz erişim' 
  },
  id: { 
    welcome: 'Selamat datang di Ruang Kerja Anda', 
    maintenance: 'Pemeliharaan', 
    documents: 'Dokumen', 
    unauthorized: 'Akses tidak sah' 
  },
  ms: { 
    welcome: 'Selamat datang ke Ruang Kerja anda', 
    maintenance: 'Penyelenggaraan', 
    documents: 'Dokumen', 
    unauthorized: 'Akses tanpa kebenaran' 
  },
  sv: { 
    welcome: 'Välkommen till din arbetsyta', 
    maintenance: 'Underhåll', 
    documents: 'Dokument', 
    Obehörig: 'Obehörig åtkomst' 
  },
  el: { 
    welcome: 'Καλώς ήρθατε στον Χώρο Εργασίας σας', 
    maintenance: 'Συντήρηση', 
    documents: 'Έγγραφα', 
    unauthorized: 'Μη εξουσιοδοτημένη πρόσβαση' 
  },
  he: { 
    welcome: 'ברוך הבא לסביבת העבודה שלך', 
    maintenance: 'תחזוקה', 
    documents: 'מסמכים', 
    unauthorized: 'גישה לא מורשית' 
  },
  uk: { 
    welcome: 'Ласкаво просимо до робочого простору', 
    maintenance: 'Обслуговування', 
    documents: 'Документи', 
    unauthorized: 'Несанкціонований доступ' 
  }
}

export function getDictionary(locale: string = 'en') {
  return dictionaries[locale] || dictionaries['en']
}

export async function translateTextRemote(text: string, targetLanguage: string) {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLanguage, documentId: 'temp-ui-string' })
  })
  
  if (!res.ok) throw new Error('Translation API failed')
  const data = await res.json()
  return data.version?.translated_text || text
}