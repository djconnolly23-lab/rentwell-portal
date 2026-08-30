'use client'

import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface MaintenanceTicket {
  id: string
  task: string
  status: string
  priority: string
  created_at: string
}

export default function RentwellRenterDashboard() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([])
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState('normal')
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchTenantData() {
      setLoading(true)
      const { data, error } = await supabase
        .from('maintenance')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) {
        setTickets(data || [])
      }
      setLoading(false)
    }

    fetchTenantData()
  }, [supabase])

  async function submitMaintenance(e: React.FormEvent) {
    e.preventDefault()
    if (!newTask.trim()) return

    const { data, error } = await supabase
      .from('maintenance')
      .insert([{ task: newTask, priority, status: 'open' }])
      .select()
      .single()

    if (!error && data) {
      setTickets([data, ...tickets])
      setNewTask('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tenant Portal</h1>
        <p className="text-sm text-gray-500">Manage your lease information and submit maintenance requests.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Request Property Maintenance</h2>
        <form onSubmit={submitMaintenance} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Issue Description</label>
            <input
              type="text"
              required
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="e.g., Leaking kitchen faucet"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Your Maintenance History</h2>
        {loading ? (
          <p className="text-sm text-gray-400">Loading your tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-sm text-gray-500">No maintenance tickets submitted.</p>
        ) : (
          <ul className="divide-y divide-gray-100 text-sm">
            {tickets.map((t) => (
              <li key={t.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{t.task}</p>
                  <p className="text-xs text-gray-400">Submitted: {new Date(t.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${
                  t.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {t.status.replace('_', ' ')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}