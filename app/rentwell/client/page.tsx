'use client';
import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Property {
  id: string
  name?: string
  address?: string
  units?: number
  status?: string
}

interface Lease {
  id: string
  tenant_name?: string
  renter_name?: string
  rent: number
  start_date: string
  end_date: string
}

export default function RentwellClientDashboard() {
  const [userName, setUserName] = useState("David")
  const [properties, setProperties] = useState<Property[]>([])
  const [leases, setLeases] = useState<Lease[]>([])
  const [loading, setLoading] = useState(true)
  const [aiPrompt, setAiPrompt] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single()
        if (profile?.full_name) {
          setUserName(profile.full_name.split(' ')[0])
        }
      }

      setProperties([
        { id: '1', address: '123 Main St, Springfield, IL', units: 4, status: 'Occupied' },
        { id: '2', address: '456 Oak Ave, Springfield, IL', units: 1, status: 'Vacant' }
      ])
      
      setLeases([
        { id: 'L-101', renter_name: 'Sarah Connor', rent: 1450, start_date: '2026-01-01', end_date: '2027-01-01' }
      ])

      setLoading(false)
    }
    fetchDashboardData()
  }, [supabase])

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-900 font-sans">
      
      {/* LEFT NAVIGATION SIDEBAR */}
      <aside className="w-64 bg-[#0F294A] text-white flex flex-col hidden lg:flex shrink-0">
        <div className="p-6 border-b border-blue-950 flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-wider">
            <span className="text-white">rent</span>
            <span className="text-[#65B32E]">well</span>
          </span>
        </div>
        <div className="p-4">
          <button className="w-full bg-[#65B32E] hover:bg-[#589e27] text-white text-sm font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2">
            <span>★ Upgrade Plan</span>
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1 text-sm">
          <a href="/client" className="flex items-center px-3 py-2.5 rounded-lg bg-blue-950/60 text-white font-medium border-l-4 border-[#65B32E]">Dashboard</a>
          <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Messages</a>
          <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Properties</a>
          <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Payments</a>
          <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Maintenance</a>
          <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Lease Profiles</a>
          <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Docs & E-Sign</a>
          
          <div className="pt-4 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3">Renters</div>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Leads</a>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Applicants</a>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Tenants</a>

          <div className="pt-4 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3">Accounting</div>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Insights</a>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-slate-300 hover:bg-blue-950/40 transition-colors">Transactions</a>
        </nav>
        <div className="p-4 border-t border-blue-950 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#65B32E] text-white flex items-center justify-center font-bold text-xs">DC</div>
            <span>David Connolly</span>
          </div>
        </div>
      </aside>

      {/* CENTRAL OPERATIONAL CANVAS */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6">
        
        {/* Header Greeting */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0F294A]">Hello, {userName}</h1>
        </div>

        {/* AI Assistant Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center shadow-xs focus-within:ring-2 focus-within:ring-[#65B32E]">
          <span className="text-[#65B32E] mr-3 text-lg font-bold">✨</span>
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="I got an email saying my tenant hasn't signed the lease addendum yet, but I'm sure she signed it. Can you check?"
            className="w-full outline-none text-sm text-gray-700 bg-transparent"
          />
          <button className="ml-2 bg-[#0F294A] hover:bg-[#163861] p-2 rounded-lg text-white transition-colors">
            ➔
          </button>
        </div>

        {/* Onboarding Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#65B32E] font-bold">🏠</div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">Finish adding your rentals</h2>
              <p className="text-sm text-gray-500">1 of 8 units added.</p>
            </div>
          </div>
          <button className="mt-4 sm:mt-0 bg-[#0F294A] hover:bg-[#163861] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-sm transition-colors">
            Add a Rental
          </button>
        </div>

        {/* Vacancy Section */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vacancy</h2>
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center p-4">
            <div className="p-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Marketing On</p>
              <p className="text-2xl font-extrabold text-[#0F294A] mt-1">0</p>
            </div>
            <div className="p-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Leads</p>
              <p className="text-2xl font-extrabold text-[#0F294A] mt-1">0</p>
            </div>
            <div className="p-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Applicants</p>
              <p className="text-2xl font-extrabold text-[#0F294A] mt-1">0</p>
            </div>
            <div className="p-3">
              <p className="text-[11px] font-bold text-gray-400 uppercase">Showings</p>
              <p className="text-2xl font-extrabold text-[#0F294A] mt-1">0</p>
            </div>
          </div>
        </div>

        {/* Residency Section */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Residency</h2>
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-gray-900">August payments</h3>
              <div className="inline-flex rounded-lg shadow-xs p-0.5 bg-slate-100">
                <button className="bg-[#0F294A] text-white px-3 py-1 text-xs font-bold rounded-md">Month</button>
                <button className="text-gray-600 px-3 py-1 text-xs font-bold rounded-md hover:text-gray-900">Year</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-emerald-200 bg-emerald-50/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600">Rent Collected</p>
                <p className="text-2xl font-extrabold text-[#65B32E] mt-1">$0</p>
              </div>
              <div className="border border-red-200 bg-red-50/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600">Past due</p>
                <p className="text-2xl font-extrabold text-red-600 mt-1">$0</p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-slate-100 pt-4 text-center divide-x divide-slate-100">
              <button className="text-xs font-bold text-[#0F294A] hover:text-[#65B32E] uppercase tracking-wider transition-colors">Record Payment</button>
              <button className="text-xs font-bold text-[#0F294A] hover:text-[#65B32E] uppercase tracking-wider transition-colors">Set Up Payments</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-slate-100 pt-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
              <div className="p-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase">Tenants</p>
                <p className="text-xl font-extrabold text-[#0F294A] mt-1">0</p>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase">Leases</p>
                <p className="text-xl font-extrabold text-[#0F294A] mt-1">{leases.length}</p>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase">Condition Reports</p>
                <p className="text-xl font-extrabold text-[#0F294A] mt-1">0</p>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase">E-Sign</p>
                <p className="text-xl font-extrabold text-[#0F294A] mt-1">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance To-Do List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 space-y-4">
          <h3 className="text-base font-bold text-gray-900">What's on your Maintenance to-do list?</h3>
          <div className="flex items-center border border-slate-200 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#65B32E]">
            <input type="text" placeholder="Add a task" className="w-full outline-none text-sm bg-transparent" />
            <button className="text-[#65B32E] font-bold ml-2">➔</button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {['+ New', '+ Air Filters', '+ Landscaping', '+ Check Exterior', '+ HVAC Checkup', '+ Caulking'].map((tag) => (
              <button key={tag} className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-[#65B32E] text-gray-700 font-medium px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-emerald-200">
                {tag}
              </button>
            ))}
          </div>
        </div>

      </main>

      {/* RIGHT ACTION RAIL */}
      <aside className="w-80 bg-white border-l border-slate-200 hidden xl:flex flex-col p-6 space-y-6 shrink-0">
        
        {/* Promotional Card */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <div className="flex items-center space-x-2 text-[#0F294A] font-bold text-sm">
            <span>📊</span>
            <span>Using spreadsheets to track your finances?</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Automatically track revenue, expenses, loans, and more! Get insights on your rentals and turn tax season into relax season.
          </p>
          <button className="w-full border border-[#0F294A] text-[#0F294A] hover:bg-[#0F294A] hover:text-white font-bold text-xs py-2 rounded-lg transition-colors">
            Upgrade Your Accounting
          </button>
        </div>

        {/* Quick Actions List */}
        <div className="space-y-1">
          {[
            'Screen a tenant',
            'Invite to apply',
            'Get a lease agreement',
            'Build a lease addendum',
            'E-Sign a document',
            'Get landlord forms',
            'Add an expense',
            'Log mileage deduction',
            'Download the app'
          ].map((action) => (
            <a key={action} href="#" className="flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-slate-50 hover:text-[#0F294A] transition-colors border-b border-slate-50">
              <span>{action}</span>
              <span className="text-gray-400">›</span>
            </a>
          ))}
        </div>

      </aside>

    </div>
  )
}