'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { languages, getTranslations } from '@/lib/translations';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

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

  // Full-page translation schema
  const t = getTranslations(selectedLang);

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
      rentwell: t.compVADesc,
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compAI,
      rentwell: t.compAIDesc,
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compMulti,
      rentwell: t.compMultiDesc,
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compScreening,
      rentwell: t.compScreeningDesc,
      turbotenant: '✅',
      buildium: '✅',
      appfolio: '✅',
      avail: '✅',
    },
    {
      feature: t.compLease,
      rentwell: t.compLeaseDesc,
      turbotenant: '✅',
      buildium: '✅',
      appfolio: '✅',
      avail: '✅',
    },
    {
      feature: t.compRent,
      rentwell: t.compRentDesc,
      turbotenant: '✅',
      buildium: '✅',
      appfolio: '✅',
      avail: '✅',
    },
    {
      feature: t.compOwner,
      rentwell: t.compOwnerDesc,
      turbotenant: '—',
      buildium: '✅',
      appfolio: '✅',
      avail: '—',
    },
    {
      feature: t.compAccounting,
      rentwell: t.compAccountingDesc,
      turbotenant: 'Basic',
      buildium: '✅',
      appfolio: '✅',
      avail: 'Basic',
    },
    {
      feature: t.compVendor,
      rentwell: t.compVendorDesc,
      turbotenant: '—',
      buildium: '✅',
      appfolio: '✅',
      avail: '—',
    },
    {
      feature: t.compGuarantees,
      rentwell: t.compGuaranteesDesc,
      turbotenant: '—',
      buildium: '—',
      appfolio: '—',
      avail: '—',
    },
    {
      feature: t.compGlobal,
      rentwell: t.compGlobalDesc,
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