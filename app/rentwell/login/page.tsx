'use client'

import React, { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function RentwellLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    // Redirect to Rentwell portal or dashboard upon success
    router.push('/ftp-ops/rentwell-support')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 rounded-xl bg-[#0F294A] items-center justify-center text-white font-bold text-xl tracking-wider shadow-sm mb-1">
            RW
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-[#0F294A]">rent</span>
            <span className="text-[#65B32E]">well</span>
          </h1>
          <p className="text-sm text-gray-500">Client & Property Owner Portal Login</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#65B32E] focus:border-transparent transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">Password</label>
              <a href="/forgot-password" className="text-xs text-[#0F294A] hover:text-[#65B32E] font-medium transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#65B32E] focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#0F294A] hover:bg-[#163861] text-white font-medium rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In to Rentwell'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-slate-100">
          Need portal access?{' '}
          <a href="/signup" className="text-[#65B32E] font-semibold hover:underline">
            Register Account
          </a>
        </div>
      </div>
    </div>
  )
}