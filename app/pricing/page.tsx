'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function PricingPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Auth & Checkout Modal State
  const [authOpen, setAuthOpen] = useState(false);
  const [authPlan, setAuthPlan] = useState<string>('Free');
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

  const openPlanSignup = (planName: string) => {
    setAuthPlan(planName);
    setIsSignUp(true);
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
            data: { full_name: fullName, portal: 'rentwell', plan: authPlan },
          },
        });
        if (error) throw error;
        setMessage({ type: 'success', text: `Account created for ${authPlan} Plan! Redirecting...` });
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

  const saasPlans = [
    {
      id: 'free',
      name: 'Free',
      badge: 'Starter',
      description: 'Essential rental management tools for independent landlords getting started.',
      priceMonthly: '$0',
      priceAnnual: '$0',
      annualNote: 'Free forever',
      doors: '1–10 doors',
      buttonText: 'Start Free',
      popular: false,
      features: [
        'Unlimited property listings',
        'Listing page review (up to 72 hours)',
        'Basic rental advertising & inbox',
        'Basic screening ($55/report paid by applicant)',
        'Digital basic leases',
        'ACH ($2 fee) & Card (3.49%) payments',
        'Basic rent tracking ledger',
        'Tenant maintenance portal',
        'Standard email support',
      ],
    },
    {
      id: 'advance',
      name: 'Advance',
      badge: 'Most Popular',
      description: 'Streamlined automation and syndication for growing residential portfolios.',
      priceMonthly: '$15',
      priceAnnual: '$165',
      annualNote: '12 months for the price of 11 ($13.75/mo)',
      doors: '1–50 doors',
      buttonText: 'Upgrade to Advance',
      popular: true,
      features: [
        'Everything in Free, plus:',
        'Priority listing review (<48 hours)',
        'Syndication to 10+ rental sites',
        'Showing scheduling & calendar sync',
        'Credit, criminal, eviction, income verification',
        'Unlimited digital leases + e-signatures + addendums',
        'Landlord Forms Pack included (saves $199)',
        'Faster payout processing',
        'Insights dashboard & automated transaction tracking',
        'Rent reporting & insurance integration',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      badge: 'Full Automation',
      description: 'Complete hands-off operations, GAAP accounting, and multi-entity global scale.',
      priceMonthly: '$72',
      priceAnnual: '$792',
      annualNote: '12 months for the price of 11 ($66/mo)',
      doors: '50–250+ doors',
      buttonText: 'Go Enterprise',
      popular: false,
      features: [
        'Everything in Advance, plus:',
        'Fast-track listing review (<24 hours)',
        'Syndication to 20+ sites + AI description generator',
        'Full CRM, call forwarding & lead scoring',
        'Full screening: employer check, fraud detection, global threat DB',
        'Multilingual leases, compliance audit, condition reports',
        'Full document management & storage',
        'Stripe integration, global multi-currency, waived ACH fees',
        'GAAP double-entry ledger, depreciation, Schedule E / Form 8825 export',
        'AI assistant, automated reporting, eviction/pet/rent/happiness guarantees',
        'Owner portals, multilingual tenant portals, white-label branding',
        'Coordinated maintenance, vendor dispatch & mobile inspections',
        'Priority SLA & 24/7 expert global compliance support',
      ],
    },
  ];

  const coreComparisonRows = [
    { feature: 'Monthly Price', free: '$0/mo', advance: '$15/mo', enterprise: '$72/mo' },
    { feature: 'Annual Price', free: '—', advance: '$165/yr (12 mos for 11)', enterprise: '$792/yr (12 mos for 11)' },
    { feature: 'Property Listings', free: 'Unlimited', advance: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Listing Page Review', free: 'Up to 72 hours', advance: '<48 hours', enterprise: '<24 hours' },
    { feature: 'Rental Advertising', free: 'Basic listing', advance: 'Syndication to 10+ sites', enterprise: 'Syndication to 20+ sites, AI description generator' },
    { feature: 'Lead Management', free: 'Basic inbox', advance: 'Showing scheduling', enterprise: 'Full CRM, call forwarding, lead scoring' },
    { feature: 'Applications & Screening', free: 'Basic ($55/report)', advance: 'Credit, criminal, eviction, income verification', enterprise: 'Full suite: employer verification, fraud detection, global threat database, custom questions' },
    { feature: 'Leases & Documents', free: 'Digital leases (basic)', advance: 'Unlimited leases, e‑signatures, addendums', enterprise: 'Multilingual leases, compliance audit, condition reports' },
    { feature: 'Landlord Forms Pack', free: '$199 add‑on', advance: 'Included', enterprise: 'Included' },
    { feature: 'Document Management', free: 'Limited', advance: 'Limited', enterprise: 'Full' },
    { feature: 'Payments', free: 'ACH ($2), card (3.49%)', advance: 'ACH ($2), card (3.49%), faster payouts', enterprise: 'Stripe integration, global multi‑currency, waived ACH fees' },
    { feature: 'Accounting', free: 'Basic rent tracking', advance: 'Insights dashboard, automated transaction tracking', enterprise: 'GAAP double‑entry ledger, reconciliation, depreciation, Schedule E/Form 8825 export, loan tracking' },
    { feature: 'Automation', free: 'Maintenance requests', advance: 'Automated transaction tracking', enterprise: 'AI assistant, automated reporting, eviction/pet/rent/happiness guarantees, portfolio growth analytics' },
    { feature: 'Owner/Tenant Portals', free: 'Tenant portals', advance: 'Tenant portals', enterprise: 'Owner portals, multilingual tenant portals, white‑label branding' },
    { feature: 'Maintenance', free: 'Requests', advance: 'Requests', enterprise: 'Coordinated maintenance, vendor management, mobile inspections' },
    { feature: 'Support', free: 'Email support', advance: 'Standard support, faster payouts', enterprise: 'Priority SLA, 24/7 expert help, global compliance support' },
    { feature: 'Scalability', free: '1–10 doors', advance: '1–50 doors', enterprise: '50–250+ doors, multi‑entity operations' },
    { feature: 'Optional Features', free: 'Rent reporting ($4.99/mo), renters insurance ($11+/mo)', advance: 'Rent reporting, renters insurance', enterprise: 'Rent reporting, renters insurance, LLC formation, landlord insurance' },
  ];

  const vaTiers = [
    {
      id: 'va10',
      name: 'VA 10',
      badge: 'Starter Concierge',
      monthly: '$300/mo',
      annual: '$3,300/yr',
      hours: '10 hrs/week (40 hrs/mo)',
      description: 'Tenant communication, listing support, basic maintenance triage, light social media posting (1–2 posts/week), email follow‑ups.',
    },
    {
      id: 'va20',
      name: 'VA 20',
      badge: 'Most Popular Growth',
      monthly: '$470/mo',
      annual: '$5,170/yr',
      hours: '20 hrs/week (80 hrs/mo)',
      description: 'Tenant communication + vendor coordination, weekly social media campaigns (3–4 posts/week), digital marketing support (ads setup, lead tracking), rent reminders.',
    },
    {
      id: 'va30',
      name: 'VA 30',
      badge: 'Full Operations',
      monthly: '$800/mo',
      annual: '$8,800/yr',
      hours: '30 hrs/week (120 hrs/mo)',
      description: 'Full tenant communication, maintenance scheduling, vendor management, content creation (blogs, newsletters), social media growth strategy, analytics reporting.',
    },
    {
      id: 'va40',
      name: 'VA 40',
      badge: 'Dedicated Executive Partner',
      monthly: '$1,550/mo',
      annual: '$17,050/yr',
      hours: '40 hrs/week (160 hrs/mo)',
      description: 'Dedicated daily monitoring, 15‑min SLA response, bi‑weekly landlord strategy sessions, full digital marketing execution (ads, SEO, campaigns), social media management across platforms, advanced reporting dashboards.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040D1A] text-slate-900 dark:text-white flex flex-col relative overflow-hidden font-sans transition-colors duration-200 selection:bg-[#6EBE3B] selection:text-slate-950 scroll-smooth">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-[#002D56]/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#6EBE3B]/15 dark:bg-[#6EBE3B]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Navigation */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="rounded-2xl p-2.5 flex items-center justify-center bg-white/95 dark:bg-white shadow-md border border-slate-200/80 dark:border-transparent hover:opacity-95 transition">
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
          <Link href="/#features" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Features</Link>
          <Link href="/#landlords" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Landlords</Link>
          <Link href="/#tenants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Tenants</Link>
          <a href="#virtual-assistants" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Virtual Assistants</a>
          <Link href="/#comparison" className="hover:text-[#002D56] dark:hover:text-[#6EBE3B] transition">Compare</Link>
          <Link href="/pricing" className="text-[#002D56] dark:text-[#6EBE3B] font-bold transition">Pricing</Link>
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
            onClick={() => {
              setAuthPlan('Free');
              setIsSignUp(false);
              setAuthOpen(true);
            }}
            className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-[#002D56] bg-white dark:bg-[#081B33]/60 hover:bg-slate-100 dark:hover:bg-[#002D56]/80 rounded-xl transition"
          >
            Log in
          </button>
          <button
            onClick={() => openPlanSignup('Free')}
            className="px-4 py-2 text-sm font-bold text-slate-950 bg-[#6EBE3B] hover:bg-[#5da730] rounded-xl transition shadow-md shadow-[#6EBE3B]/20"
          >
            Get Started For Free
          </button>
        </div>
      </header>

      {/* Main Pricing Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-[#081B33] border border-emerald-200 dark:border-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold uppercase tracking-wider shadow-sm">
          <span>🏠</span> Simple, Transparent Pricing
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          RentWell Pricing
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-[#002D56] dark:text-[#6EBE3B] max-w-3xl mx-auto">
          The most complete rental management platform — built for every landlord.
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From single‑property owners to global enterprises, RentWell delivers everything you need to manage rentals with confidence. Start free, grow with Advance, or unlock full enterprise automation.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-6 flex items-center justify-center">
          <div className="bg-slate-200/80 dark:bg-[#081B33] p-1.5 rounded-2xl border border-slate-300 dark:border-[#002D56] inline-flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-150 ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-[#002D56] text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Price
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-150 flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#6EBE3B] text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Price</span>
              <span className="bg-emerald-900/20 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                12 mos for 11
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core SaaS Pricing Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {saasPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition duration-200 ${
                plan.popular
                  ? 'bg-white dark:bg-[#081B33] border-2 border-[#6EBE3B] shadow-2xl scale-[1.02]'
                  : 'bg-white dark:bg-[#081B33]/80 border border-slate-200 dark:border-[#002D56] shadow-xl hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6EBE3B] text-slate-950 font-black text-xs uppercase px-4 py-1 rounded-full shadow-md tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{plan.name}</h3>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#040D1A] px-3 py-1 rounded-lg border border-slate-200 dark:border-[#002D56]">
                    {plan.doors}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-[#002D56]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                      {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual}
                    </span>
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      {billingCycle === 'monthly' ? '/mo' : '/yr'}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#6EBE3B] mt-1">
                    {billingCycle === 'annual' ? plan.annualNote : 'Flexible monthly billing'}
                  </p>
                </div>

                <ul className="pt-4 space-y-2.5 text-xs sm:text-sm">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-200">
                      <span className="text-[#6EBE3B] font-black text-base leading-none">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => openPlanSignup(plan.name)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition shadow-lg ${
                    plan.popular
                      ? 'bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 shadow-[#6EBE3B]/25'
                      : 'bg-[#002D56] hover:bg-[#081B33] text-white'
                  }`}
                >
                  {plan.buttonText} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Plans & Pricing Specification Table */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">🌟 Plans & Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Full Feature Specification
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Review detailed capabilities across Free, Advance, and Enterprise tiers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-[#002D56] bg-white dark:bg-[#081B33] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#002D56] bg-slate-100/80 dark:bg-[#040D1A]/90 text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
                <th className="py-4 px-6 min-w-[220px]">Feature</th>
                <th className="py-4 px-6 min-w-[180px]">Free</th>
                <th className="py-4 px-6 min-w-[240px] bg-emerald-500/10 text-emerald-800 dark:text-[#6EBE3B] border-x border-emerald-500/20 font-black">
                  Advance
                </th>
                <th className="py-4 px-6 min-w-[280px]">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {coreComparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-[#002D56]/30 transition">
                  <td className="py-3.5 px-6 font-bold text-slate-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 dark:text-slate-300">
                    {row.free}
                  </td>
                  <td className="py-3.5 px-6 bg-emerald-500/5 dark:bg-[#6EBE3B]/10 font-semibold text-slate-900 dark:text-white border-x border-emerald-500/20">
                    {row.advance}
                  </td>
                  <td className="py-3.5 px-6 text-slate-700 dark:text-slate-200 font-medium">
                    {row.enterprise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RentWell Virtual Assistant (VA) Platform Section */}
      <section id="virtual-assistants" className="relative z-10 max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-[#081B33] border border-emerald-200 dark:border-[#002D56] text-[#002D56] dark:text-[#6EBE3B] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>👩‍💼</span> Concierge Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            RentWell Virtual Assistant (VA) Platform
          </h2>
          <p className="text-base font-semibold text-[#002D56] dark:text-[#6EBE3B]">
            Concierge‑style support layered on Enterprise SaaS — not just admin, but growth partners.
          </p>
        </div>

        {/* VA Tiers & Pricing Cards */}
        <div className="text-center mb-6">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">📊 VA Tiers & Pricing</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {vaTiers.map((va) => (
            <div
              key={va.id}
              className="rounded-3xl p-6 border bg-white dark:bg-[#081B33]/90 border-slate-200 dark:border-[#002D56] shadow-lg flex flex-col justify-between hover:border-[#6EBE3B] transition duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{va.name}</h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-[#040D1A] text-emerald-800 dark:text-[#6EBE3B]">
                    {va.badge}
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {billingCycle === 'monthly' ? va.monthly : va.annual}
                  </div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {va.hours}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-[#002D56]">
                  {va.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => openPlanSignup(`VA Platform (${va.name})`)}
                  className="w-full py-2.5 rounded-xl bg-[#002D56] hover:bg-[#081B33] text-white dark:hover:bg-[#6EBE3B] dark:hover:text-slate-950 font-bold text-xs transition duration-150"
                >
                  Explore {va.name} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Deliverables by Tier Grid */}
        <div className="bg-white dark:bg-[#081B33] rounded-3xl p-8 border border-slate-200 dark:border-[#002D56] shadow-xl space-y-6">
          <div className="border-b border-slate-100 dark:border-[#002D56] pb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🟩</span> Deliverables by Tier
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56]">
              <h4 className="font-bold text-[#002D56] dark:text-[#6EBE3B] mb-1.5">
                Tenant Communication
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Calls, emails, rent reminders, maintenance triage.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56]">
              <h4 className="font-bold text-[#002D56] dark:text-[#6EBE3B] mb-1.5">
                Vendor Coordination
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Scheduling repairs, managing contractors, tracking invoices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56]">
              <h4 className="font-bold text-[#002D56] dark:text-[#6EBE3B] mb-1.5">
                Digital Marketing
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Property ads, SEO optimization, lead funnels, analytics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56]">
              <h4 className="font-bold text-[#002D56] dark:text-[#6EBE3B] mb-1.5">
                Social Media
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Posting, engagement, growth campaigns, branded content.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56] md:col-span-2 lg:col-span-2">
              <h4 className="font-bold text-[#002D56] dark:text-[#6EBE3B] mb-1.5">
                Portfolio Strategy
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Enterprise SLA, reporting, compliance, scaling support.
              </p>
            </div>
          </div>

          {/* Positioning Box */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-[#002D56]/30 border border-emerald-200 dark:border-[#002D56] space-y-2">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚖️</span> Positioning
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>TurboTenant</strong> → No VA support, DIY only. <br />
              <strong>RentWell</strong> → Enterprise SaaS + VA concierge team that handles operations + growth. <br />
              VA tiers scale from basic admin support to full marketing and portfolio management.
            </p>
          </div>
        </div>
      </section>

      {/* Expanded Feature Tables (8 Categories) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">📊 Expanded Feature Tables</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Comprehensive Platform Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
          {/* 1. Listings & Marketing */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>🔑</span> Listings & Marketing
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Unlimited property listings</li>
              <li>• Syndication to 20+ sites</li>
              <li>• AI description generator</li>
              <li>• Lead CRM with call forwarding</li>
              <li>• Showing scheduling</li>
              <li>• Automatic pre‑screeners</li>
            </ul>
          </div>

          {/* 2. Screening & Applications */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>🛡</span> Screening & Applications
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Credit, criminal, eviction checks</li>
              <li>• Income & employer verification</li>
              <li>• Fraud detection</li>
              <li>• Global threat database</li>
              <li>• Custom screening questions</li>
            </ul>
          </div>

          {/* 3. Leases & Documents */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>📄</span> Leases & Documents
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Unlimited leases & addendums</li>
              <li>• Unlimited e‑signatures</li>
              <li>• Multilingual digital leases</li>
              <li>• Compliance audit tools</li>
              <li>• Online condition reports</li>
            </ul>
          </div>

          {/* 4. Payments & Accounting */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>💳</span> Payments & Accounting
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• ACH, card, Stripe, global multi‑currency</li>
              <li>• Waived ACH fees (Enterprise)</li>
              <li>• Expedited payouts (Advance/Enterprise)</li>
              <li>• GAAP double‑entry ledger</li>
              <li>• Depreciation & loan tracking</li>
              <li>• IRS‑ready exports (Schedule E, Form 8825)</li>
              <li>• Automated categorization</li>
            </ul>
          </div>

          {/* 5. Maintenance & Portals */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>🛠</span> Maintenance & Portals
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Tenant portals (all tiers)</li>
              <li>• Owner portals (Enterprise)</li>
              <li>• Vendor management</li>
              <li>• Coordinated maintenance</li>
              <li>• Mobile inspections app</li>
              <li>• In‑app messaging & tenant boards</li>
            </ul>
          </div>

          {/* 6. Automation & AI */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>🤖</span> Automation & AI
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• AI assistant for reporting & queries</li>
              <li>• Automated financial reports</li>
              <li>• Eviction/pet/rent/happiness guarantees</li>
              <li>• Portfolio growth analytics</li>
              <li>• API access for enterprise integrations</li>
            </ul>
          </div>

          {/* 7. Scalability & Support */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>🌍</span> Scalability & Support
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Multi‑entity operations</li>
              <li>• Priority SLA with 24/7 expert help</li>
              <li>• Enterprise onboarding with success manager</li>
              <li>• Unlimited bank accounts</li>
            </ul>
          </div>

          {/* 8. Optional Add-Ons */}
          <div className="bg-white dark:bg-[#081B33] p-6 rounded-3xl border border-slate-200 dark:border-[#002D56] shadow-md space-y-3">
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>🛡</span> Optional Add‑Ons
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>• Rent reporting ($4.99/mo)</li>
              <li>• Renters insurance (from $11/mo)</li>
              <li>• LLC formation services</li>
              <li>• Landlord insurance partnerships</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why RentWell Wins */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-[#081B33] rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-[#002D56] shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6EBE3B]">💡 Market Comparison</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Why RentWell Wins
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56] flex items-start gap-3">
              <span className="text-[#6EBE3B] text-lg font-black">✓</span>
              <div>
                <strong>Covers every feature competitors offer:</strong> Direct parity with TurboTenant, Buildium, AppFolio, Avail, and TenantCloud.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56] flex items-start gap-3">
              <span className="text-[#6EBE3B] text-lg font-black">✓</span>
              <div>
                <strong>Adds unique differentiators:</strong> Multilingual leases, compliance audits, guarantees, GAAP accounting, global multi‑currency.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56] flex items-start gap-3">
              <span className="text-[#6EBE3B] text-lg font-black">✓</span>
              <div>
                <strong>Provides tenant‑side benefits:</strong> Rent reporting, renters insurance, and credit building.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#040D1A] border border-slate-200 dark:border-[#002D56] flex items-start gap-3">
              <span className="text-[#6EBE3B] text-lg font-black">✓</span>
              <div>
                <strong>Scales seamlessly:</strong> From 1 door to 250+ doors with enterprise‑grade support and dedicated VA co-pilots.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-slate-900 via-[#002D56] to-slate-900 text-white rounded-3xl p-10 sm:p-14 shadow-2xl border border-[#002D56] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-[#6EBE3B] text-xs font-bold uppercase tracking-wider">
            📢 Call to Action
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Choose smarter property management.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Scale your portfolio effortlessly with automated SaaS and dedicated Virtual Assistants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openPlanSignup('Free')}
              className="px-8 py-4 rounded-xl bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold text-base transition duration-150 shadow-xl shadow-[#6EBE3B]/30"
            >
              Start Free
            </button>
            <button
              onClick={() => openPlanSignup('Advance')}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition duration-150"
            >
              Upgrade to Advance
            </button>
            <button
              onClick={() => openPlanSignup('Enterprise')}
              className="px-8 py-4 rounded-xl bg-[#002D56] hover:bg-[#081B33] text-white border border-blue-400/30 font-semibold text-base transition duration-150"
            >
              Go Enterprise
            </button>
          </div>
        </div>
      </section>

      {/* Auth / Plan Checkout Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-[#081B33] border border-slate-200 dark:border-[#002D56] rounded-3xl p-8 shadow-2xl text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-6 space-y-1">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 dark:bg-[#002D56] text-emerald-800 dark:text-[#6EBE3B]">
                Selected: {authPlan}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {isSignUp ? 'Create your RentWell account' : 'Sign in to RentWell'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#002D56] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#6EBE3B] text-sm"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#002D56] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#6EBE3B] text-sm"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#040D1A] border border-slate-300 dark:border-[#002D56] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#6EBE3B] text-sm"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
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
                className="w-full py-3.5 bg-[#6EBE3B] hover:bg-[#5da730] text-slate-950 font-bold rounded-xl text-sm transition duration-150 disabled:opacity-50 mt-2 shadow-md shadow-[#6EBE3B]/20"
              >
                {loading ? 'Processing...' : isSignUp ? `Continue to ${authPlan}` : 'Sign In'}
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