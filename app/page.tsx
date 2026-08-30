'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import DocumentTranslator from '@/components/DocumentTranslator';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const languages = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'km', label: 'Khmer', native: 'ភាសាខ្មែរ', flag: '🇰🇭' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'zh', label: 'Chinese (Simp)', native: '简体中文', flag: '🇨🇳' },
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
  const [translatorOpen, setTranslatorOpen] = useState(false);
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
    if (savedLang) setSelectedLang(savedLang);
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

  const filteredLanguages = languages.filter(
    (l) =>
      l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.native.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.code.toLowerCase().includes(langSearch.toLowerCase())
  );

  const activeLanguageObj = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040D1A] text-slate-900 dark:text-white flex flex-col relative overflow-hidden font-sans transition-colors duration-200 selection:bg-[#6EBE3B] selection:text-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-[#002D56]/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#6EBE3B]/15 dark:bg-[#6EBE3B]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
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
          <a href="#features" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Features</a>
          <a href="#landlords" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Landlords</a>
          <a href="#tenants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Tenants</a>
          <a href="#pricing" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Pricing</a>
        </nav>

        <div className="flex items-center space-x-2.5">
          {/* Document Translator Tool Button */}
          <button
            onClick={() => setTranslatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-[#002D56] bg-white dark:bg-[#081B33]/80 hover:bg-slate-100 dark:hover:bg-[#002D56] rounded-xl transition shadow-sm"
            title="Translate Leases & Legal Notices"
          >
            <svg className="w-4 h-4 text-[#6EBE3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="hidden sm:inline">Translator</span>
          </button>

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

          {/* Light / Dark Mode Toggle */}
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
            Log in
          </button>
          <button
            onClick={() => openAuth(true)}
            className="px-4 py-2 text-sm font-bold text-slate-950 bg-[#6EBE3B] hover:bg-[#5da730] rounded-xl transition shadow-md shadow-[#6EBE3B]/20"
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-20">
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#081B33] border border-emerald-200 dark:border-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#6EBE3B] animate-pulse" />
            Modern Multilingual Property Management
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Where landlords go to <span className="text-[#6EBE3B]">get it right.</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Screen tenants with confidence, generate digital leases in 25 languages, collect automatic rent payments, and manage property operations in one place.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => openAuth(true)}
              className="px-8 py-3.5 rounded-xl bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold text-base transition duration-150 shadow-xl shadow-[#6EBE3B]/25"
            >
              Get Started Free
            </button>
            <button
              onClick={() => setTranslatorOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-white dark:bg-[#081B33] border border-slate-300 dark:border-[#002D56] text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-slate-100 dark:hover:bg-[#002D56] transition duration-150 shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#6EBE3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Try Translator (25 Languages)
            </button>
          </div>
        </div>

        {/* Metric Card */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-white dark:bg-[#081B33]/90 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-xl dark:shadow-2xl space-y-5 transition-colors duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#002D56]/80 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Rentwell Platform Live</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#6EBE3B]/15 text-emerald-800 dark:text-[#6EBE3B] border border-[#6EBE3B]/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6EBE3B]" /> Connected
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 bg-slate-50 dark:bg-[#040D1A]/90 rounded-xl border border-slate-200/80 dark:border-[#002D56]/60 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Collected This Month</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">$6,400.00</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-[#6EBE3B] bg-[#6EBE3B]/15 dark:bg-[#6EBE3B]/10 px-2.5 py-1 rounded-md border border-[#6EBE3B]/30">
                  +12.4% MoM
                </span>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#040D1A]/90 rounded-xl border border-slate-200/80 dark:border-[#002D56]/60 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Portfolio Occupancy</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">8 / 8 Units</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-[#6EBE3B] bg-[#6EBE3B]/15 dark:bg-[#6EBE3B]/10 px-2.5 py-1 rounded-md border border-[#6EBE3B]/30">
                  100% Leased
                </span>
              </div>
            </div>

            <button
              onClick={() => openAuth(true)}
              className="w-full py-3.5 bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold rounded-xl text-sm transition duration-150 shadow-md shadow-[#6EBE3B]/20"
            >
              Open Free Landlord Account →
            </button>
          </div>
        </div>
      </main>

      {/* Document Translator Modal */}
      {translatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#081B33] border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-2xl text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setTranslatorOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <div className="mb-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#6EBE3B]/20 text-[#6EBE3B]">🌐</span>
                Document & Lease Translator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Translate leases, addenda, and notices across 25 supported languages.
              </p>
            </div>
            <DocumentTranslator />
          </div>
        </div>
      )}

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