'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function RentwellLandingPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Auth Modal State
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
            data: { full_name: fullName, portal: 'rentwell' },
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

  const comparisonData = [
    { feature: 'Virtual Assistants', rentwell: '✅ Built‑in assistants', turbotenant: '—', buildium: '—', appfolio: '—', avail: '—' },
    { feature: 'AI Assistant', rentwell: '✅ Natural language queries', turbotenant: '—', buildium: '—', appfolio: '—', avail: '—' },
    { feature: 'Multilingual Support', rentwell: '✅ Tenant & owner portals', turbotenant: '—', buildium: '—', appfolio: '—', avail: '—' },
    { feature: 'Tenant Screening', rentwell: '✅ Integrated', turbotenant: '✅', buildium: '✅', appfolio: '✅', avail: '✅' },
    { feature: 'Lease Management', rentwell: '✅ Digital leases + addendums', turbotenant: '✅', buildium: '✅', appfolio: '✅', avail: '✅' },
    { feature: 'Rent Collection', rentwell: '✅ Stripe + ledger', turbotenant: '✅', buildium: '✅', appfolio: '✅', avail: '✅' },
    { feature: 'Owner Portal', rentwell: '✅ Advanced dashboards', turbotenant: '—', buildium: '✅', appfolio: '✅', avail: '—' },
    { feature: 'Accounting Engine', rentwell: '✅ GAAP double‑entry', turbotenant: 'Basic', buildium: '✅', appfolio: '✅', avail: 'Basic' },
    { feature: 'Vendor Management', rentwell: '✅ Work orders + invoices', turbotenant: '—', buildium: '✅', appfolio: '✅', avail: '—' },
    { feature: 'Guarantees', rentwell: '✅ Eviction, pet, rent, happiness', turbotenant: '—', buildium: '—', appfolio: '—', avail: '—' },
    { feature: 'Global Support', rentwell: '✅ Multi‑entity, multi‑currency', turbotenant: '—', buildium: '—', appfolio: '—', avail: '—' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040D1A] text-slate-900 dark:text-white flex flex-col relative overflow-hidden font-sans transition-colors duration-200 selection:bg-[#6EBE3B] selection:text-slate-950 scroll-smooth">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-[#002D56]/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#6EBE3B]/15 dark:bg-[#6EBE3B]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Navigation with 5x Enlarged Logo */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="rounded-2xl p-2.5 flex items-center justify-center bg-white/95 dark:bg-white shadow-md border border-slate-200/80 dark:border-transparent">
            <Image
              src="/rentwell-logo.png"
              alt="RentWell"
              width={260}
              height={70}
              priority
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Features</a>
          <a href="#landlords" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Landlords</a>
          <a href="#tenants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Tenants</a>
          <a href="#virtual-assistants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Virtual Assistants</a>
          <a href="#comparison" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Compare</a>
          <Link href="/pricing" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition font-bold">Pricing</Link>
        </nav>

        <div className="flex items-center space-x-3">
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
          <Link
            href="/pricing"
            className="px-4 py-2 text-sm font-bold text-slate-950 bg-[#6EBE3B] hover:bg-[#5da730] rounded-xl transition shadow-md shadow-[#6EBE3B]/20"
          >
            Get Started For Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center pt-14 pb-12 lg:pt-20 lg:pb-16">
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#081B33] border border-emerald-200 dark:border-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6EBE3B] animate-pulse" />
            Smart Property Automation
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
            Smart property management, powered by <span className="text-[#6EBE3B]">Virtual Assistants.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Screen tenants with confidence, generate digital leases, collect automatic rent payments, and manage property operations — all with your built-in Virtual Assistant.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/pricing"
              className="px-8 py-3.5 rounded-xl bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold text-base transition duration-150 shadow-xl shadow-[#6EBE3B]/25"
            >
              Get Started For Free
            </Link>
            <a
              href="#comparison"
              className="px-8 py-3.5 rounded-xl bg-white dark:bg-[#081B33] border border-slate-300 dark:border-[#002D56] text-slate-800 dark:text-slate-100 font-semibold text-base hover:bg-slate-100 dark:hover:bg-[#002D56] transition duration-150 shadow-sm inline-flex items-center gap-2"
            >
              See How We Compare ↓
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
                For Property Owners
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
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
              <Link
                href="/pricing"
                className="block text-center w-full py-3 bg-[#002D56] hover:bg-[#081B33] text-white font-bold rounded-xl text-sm transition shadow-md"
              >
                Explore Landlord Tools →
              </Link>
            </div>
          </div>

          {/* Tenant Card */}
          <div id="tenants" className="group bg-white dark:bg-[#081B33]/90 border border-slate-200 dark:border-[#002D56] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#6EBE3B]/15 text-emerald-800 dark:text-[#6EBE3B] text-xs font-bold rounded-lg uppercase tracking-wider">
                For Residents & Renters
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Renter / Tenant
              </h3>
              <p className="text-sm font-semibold text-[#6EBE3B] uppercase tracking-wide">
                Find. Rent. Thrive.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Submit maintenance requests instantly, sign digital leases with ease, set up recurring autopay, and communicate effortlessly.
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

      {/* 6-Capability Feature Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">Full-Stack Suite</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Everything your rental portfolio needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div id="virtual-assistants" className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🎧
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Virtual Assistants</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Automated VA support for tenant screening, dispatching vendors, tenant communication, marketing and social media, and much more.
            </p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Automation & Workflows</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Automatically handles your rental processes — from lease signing to emails, autopay setup, and recurring rent reminders — so every step runs smoothly without manual effort.
            </p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Advanced Accounting Engine</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              GAAP‑ready double‑entry accounting with P&L, balance sheet, cash flow, rent roll, and tax prep reports. Enterprise‑grade financials built into the platform.
            </p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              📝
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Lease Management</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              AI‑powered leasing that automates digital agreements, secure e‑signatures, and renewals — keeping every tenant on track while eliminating manual work.
            </p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tenant Screening & Guarantees</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Nationwide background, credit, and eviction checks paired with comprehensive eviction, pet, and rent payment guarantees.
            </p>
          </div>

          <div className="bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] rounded-2xl p-6 shadow-md hover:border-[#6EBE3B] transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#040D1A] border border-emerald-200 dark:border-[#002D56] flex items-center justify-center text-2xl mb-4">
              🌐
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Operations & Global Portfolios</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Multi-currency, multi-entity support across 25 native languages for domestic and OCONUS property management.
            </p>
          </div>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section id="comparison" className="relative z-10 max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">Market Benchmarks</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            How RentWell stacks up against the rest.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Most property management platforms cover the basics — leases, rent collection, and maintenance. RentWell goes further with built‑in Virtual Assistants, AI, multilingual support, and enterprise‑grade accounting. Here’s how we compare:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#002D56] bg-white dark:bg-[#081B33] shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#002D56] bg-slate-100/70 dark:bg-[#040D1A]/80 text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300">
                <th className="py-4 px-5">Feature</th>
                <th className="py-4 px-5 bg-emerald-500/10 text-emerald-700 dark:text-[#6EBE3B] border-x border-emerald-500/20 font-black">
                  RentWell Advantage
                </th>
                <th className="py-4 px-4 text-center">TurboTenant</th>
                <th className="py-4 px-4 text-center">Buildium</th>
                <th className="py-4 px-4 text-center">AppFolio</th>
                <th className="py-4 px-4 text-center">Avail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {comparisonData.map((row, idx) => (
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
            Choose smarter property management.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Experience the power of built-in Virtual Assistants, automated accounting, and seamless multilingual property operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/pricing"
              className="px-9 py-4 rounded-xl bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold text-base transition duration-150 shadow-xl shadow-[#6EBE3B]/30"
            >
              Get Started For Free
            </Link>
            <Link
              href="/pricing"
              className="px-9 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition duration-150"
            >
              See Full Comparison
            </Link>
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
                {isSignUp ? 'Create your RentWell account' : 'Sign in to RentWell'}
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