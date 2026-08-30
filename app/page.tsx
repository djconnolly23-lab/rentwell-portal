'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function RentwellLandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

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

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded bg-cyan-400 flex items-center justify-center font-black text-xs text-slate-950">
            R
          </div>
          <span className="text-2xl font-black tracking-tight text-white">rentwell</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition">Features</a>
          <a href="#landlords" className="hover:text-cyan-400 transition">Landlords</a>
          <a href="#tenants" className="hover:text-cyan-400 transition">Tenants</a>
          <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => openAuth(false)}
            className="px-5 py-2 text-sm font-medium text-slate-200 border border-slate-700 rounded-lg hover:border-slate-500 transition"
          >
            Log in
          </button>
          <button
            onClick={() => openAuth(true)}
            className="px-5 py-2 text-sm font-semibold text-slate-950 bg-white rounded-lg hover:bg-slate-100 transition shadow-sm"
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-24">
        {/* Left Column: Copy */}
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <span>●</span> Rental Property Management
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Where landlords go to get it right.
          </h1>

          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            Screen tenants, create custom leases, collect payments, and manage property maintenance all in one seamless dashboard.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => openAuth(true)}
              className="px-8 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-base hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20"
            >
              Get Started Free
            </button>
            <button
              onClick={() => openAuth(false)}
              className="px-8 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-base hover:bg-slate-700 transition"
            >
              Access Portal
            </button>
          </div>
        </div>

        {/* Right Column: Portal Metrics Card */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Rentwell Portal Overview</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Connected
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">Current Balance</p>
                  <p className="text-xl font-bold text-white">$6,400.00</p>
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/50">
                  +12.4% MoM
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">Active Units</p>
                  <p className="text-xl font-bold text-white">8 Units</p>
                </div>
                <span className="text-xs font-medium text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                  100% Leased
                </span>
              </div>
            </div>

            <button
              onClick={() => openAuth(true)}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition shadow-md"
            >
              Open Free Landlord Account →
            </button>
          </div>
        </div>
      </main>

      {/* Sign In / Sign Up Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-slate-100">
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white">
                {isSignUp ? 'Create your Rentwell account' : 'Sign in to Rentwell'}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isSignUp ? 'Get started in under two minutes.' : 'Enter your credentials to continue.'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium ${
                    message.type === 'error'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-sm transition disabled:opacity-50 mt-2"
              >
                {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage(null);
                }}
                className="text-cyan-400 font-semibold hover:underline ml-1"
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