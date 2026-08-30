'use client'

import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Task {
  id: string
  vertical: string
  title: string
  assigned_va: string
  status: 'pending' | 'in_progress' | 'flagged' | 'completed'
  metadata?: string
  created_at: string
}

export default function RentwellSupportPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [taskTitle, setTaskTitle] = useState('')
  const [assignedVa, setAssignedVa] = useState('Sopheak T. (VA)')
  const [propertyAddress, setPropertyAddress] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchRentwellTasks() {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('vertical', 'rentwell')
        .order('created_at', { ascending: false })

      if (!error) setTasks(data || [])
      setLoading(false)
    }

    fetchRentwellTasks()

    const channel = supabase
      .channel('rentwell-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: 'vertical=eq.rentwell' }, (payload) => {
        if (payload.eventType === 'INSERT') setTasks((prev) => [payload.new as Task, ...prev])
        if (payload.eventType === 'UPDATE') setTasks((prev) => prev.map((t) => (t.id === payload.new.id ? (payload.new as Task) : t)))
        if (payload.eventType === 'DELETE') setTasks((prev) => prev.filter((t) => t.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault()
    if (!taskTitle.trim()) return

    const { error } = await supabase.from('tasks').insert([{
      vertical: 'rentwell',
      title: taskTitle,
      assigned_va: assignedVa,
      status: 'pending',
      metadata: propertyAddress || 'General Rentwell Property Ops'
    }])

    if (!error) {
      setTaskTitle('')
      setPropertyAddress('')
    }
  }

  async function updateStatus(id: string, status: Task['status']) {
    await supabase.from('tasks').update({ status }).eq('id', id)
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 font-sans text-gray-800 p-6">
      
      {/* Rentwell Branded Header matching the logo palette */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-[#0F294A] flex items-center justify-center text-white font-bold text-xl tracking-wider shadow-sm">
            RW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-[#0F294A]">rent</span>
                <span className="text-[#65B32E]">well</span>
                <span className="ml-3 text-xs font-semibold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Operations Hub
                </span>
              </h1>
            </div>
            <p className="text-sm text-gray-500">Property management support, maintenance logs, and tenant communication routing.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            ● Rentwell Active
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs border-t-4 border-t-[#0F294A]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Property Tasks</p>
          <p className="text-3xl font-extrabold text-[#0F294A] mt-2">{tasks.length}</p>
          <p className="text-xs text-gray-500 mt-1">Live queue synchronized</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs border-t-4 border-t-[#65B32E]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Flagged for Approval</p>
          <p className="text-3xl font-extrabold text-amber-600 mt-2">
            {tasks.filter(t => t.status === 'flagged').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Invoices requiring sign-off</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs border-t-4 border-t-[#0F294A]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SLA Target</p>
          <p className="text-3xl font-extrabold text-[#65B32E] mt-2">100%</p>
          <p className="text-xs text-gray-500 mt-1">All requests managed</p>
        </div>
      </div>

      {/* Main Grid: Form + Live Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Task Creator Form */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs h-fit space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F294A]">Assign Rentwell Task</h3>
          <form onSubmit={handleCreateTask} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Task Action / Title</label>
              <input
                type="text"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g., Log HVAC repair invoice ($450)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#65B32E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Assigned Virtual Assistant</label>
              <select
                value={assignedVa}
                onChange={(e) => setAssignedVa(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-[#65B32E] focus:outline-none"
              >
                <option value="Sopheak T. (VA)">Sopheak T. (VA)</option>
                <option value="Property Lead">Property Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Property Address</label>
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="e.g., 2110 Whitmore Rd"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#65B32E] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#0F294A] hover:bg-[#163861] text-white font-medium rounded-md transition-colors shadow-xs"
            >
              Submit Property Task
            </button>
          </form>
        </div>

        {/* Live Queue Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#0F294A]">Rentwell Active Workflow Queue</h3>
            <span className="text-xs font-mono text-[#65B32E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-medium">
              Real-time Sync
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-gray-400">Loading Rentwell queue...</div>
          ) : tasks.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-500">No tasks currently assigned to Rentwell.</div>
          ) : (
            <div className="divide-y divide-gray-200 overflow-y-auto max-h-[500px]">
              {tasks.map((t) => (
                <div key={t.id} className="p-4 hover:bg-slate-50/80 transition-colors flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0F294A] border border-blue-100">
                        Rentwell Property
                      </span>
                      <span className="text-xs text-gray-400">VA: <strong className="text-gray-700">{t.assigned_va}</strong></span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                    <p className="text-xs text-gray-500">📍 {t.metadata || 'General Property'} • {new Date(t.created_at).toLocaleTimeString()}</p>
                  </div>

                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t.id, e.target.value as any)}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-md border cursor-pointer ${
                      t.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      t.status === 'flagged' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      t.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="flagged">Flagged</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  )
}