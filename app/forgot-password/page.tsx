'use client'

import React, { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    if (error) {
      setErrorMsg(error.message)
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-sm p-8 space-y-6">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">FTP Ecosystem OS</span>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-1">Reset Password</h2>
          <p className="text-sm text-gray-500 mt-1">We'll send you recovery instructions.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {errorMsg}
          </div>
        )}

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm text-center">
            Password reset email sent! Check your inbox for instructions.
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-gray-500">
          Remembered your password?{' '}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}