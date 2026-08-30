'use client'

import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Task {
  id: string
  vertical: 'rentwell' | 'dispatchly'
  title: string
  assigned_va: string
  status: 'pending' | 'in_progress' | 'flagged' | 'completed'
  metadata?: string
  created_at: string
}

interface ActivityLog {
  id: string
  actor: string
  action: string
  target_address?: string
  target?: string
  created_at: string
}

export default function SuperuserMasterDashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filterVertical, setFilterVertical] = useState<'all' | 'rentwell' | 'dispatchly'>('all')

  // New Task Form State
  const [taskTitle, setTaskTitle] = useState('')
  const [vertical, setVertical] = useState<'rentwell' | 'dispatchly'>('rentwell')
  const [assignedVa, setAssignedVa] = useState('Sopheak T. (VA)')
  const [metadata, setMetadata] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchMasterData() {
      setLoading(true)
      const [tasksRes, logsRes] = await Promise.all([
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(10)
      ])

      if (!tasksRes.error) setTasks(tasksRes.data || [])
      if (!logsRes.error) setLogs(logsRes.data || [])
      setLoading(false)
    }

    fetchMasterData()

    // Realtime Subscriptions
    const channel = supabase
      .channel('master-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        if (payload.eventType === 'INSERT') setTasks((prev) => [payload.new as Task, ...prev])
        if (payload.eventType === 'UPDATE') setTasks((prev) => prev.map((t) => (t.id === payload.new.id ? (payload.new as Task) : t)))
        if (payload.eventType === 'DELETE') setTasks((prev) => prev.filter((t) => t.id !== payload.old.id))
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activity_logs' }, (payload) => {
        if (payload.eventType === 'INSERT') setLogs((prev) => [payload.new as ActivityLog, ...prev])
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
      vertical,
      title: taskTitle,
      assigned_va: assignedVa,
      status: 'pending',
      metadata: metadata || 'Operations Hub Dispatch'
    }])

    if (!error) {
      setTaskTitle('')
      setMetadata('')
    }
  }

  async function updateTaskStatus(id: string, status: Task['status']) {
    await supabase.from('tasks').update({ status }).eq('id', id)
  }

  const filteredTasks = tasks.filter((t) => filterVertical === 'all' || t.vertical === filterVertical)

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 font-sans text-gray-800 p-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Director Control Center</h1>
          <p className="text-sm text-gray-500">Unified Rentwell & Dispatchly Workforce Operations OS</p>
        </div>
        <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold rounded-full">
          ● Ecosystem Active
        </span>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Verticals</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">2</p>
          <p className="text-xs text-gray-500 mt-1">Rentwell & Dispatchly Operational Nodes</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Tasks Queue</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{tasks.length}</p>
          <p className="text-xs text-gray-500 mt-1">Real-time synchronized across agents</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Workforce SLA Cadence</p>
          <p className="text-3xl font-extrabold text-green-600 mt-2">99.5%</p>
          <p className="text-xs text-gray-500 mt-1">&lt; 15-minute response target upheld</p>
        </div>
      </div>

      {/* Workflow Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Task Creator */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs h-fit space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Route New VA Task</h3>
          <form onSubmit={handleCreateTask} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Vertical</label>
              <select
                value={vertical}
                onChange={(e) => setVertical(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="rentwell">Rentwell (Property Ops)</option>
                <option value="dispatchly">Dispatchly (Logistics)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Task Description</label>
              <input
                type="text"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g., Audit HVAC invoice ($450)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Assign VA</label>
              <select
                value={assignedVa}
                onChange={(e) => setAssignedVa(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Sopheak T. (VA)">Sopheak T. (VA)</option>
                <option value="Support Lead">Support Lead</option>
                <option value="Field Dispatcher">Field Dispatcher</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Target / Address Metadata</label>
              <input
                type="text"
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
                placeholder="e.g., 2110 Whitmore Rd"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-xs"
            >
              Dispatch Task
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Live Task Queue */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-900">Live Task Routing Queue</h3>
            
            {/* Filter Tabs */}
            <div className="flex bg-gray-200/70 p-1 rounded-md text-xs font-semibold">
              <button onClick={() => setFilterVertical('all')} className={`px-3 py-1 rounded ${filterVertical === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'}`}>All</button>
              <button onClick={() => setFilterVertical('rentwell')} className={`px-3 py-1 rounded ${filterVertical === 'rentwell' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-600'}`}>Rentwell</button>
              <button onClick={() => setFilterVertical('dispatchly')} className={`px-3 py-1 rounded ${filterVertical === 'dispatchly' ? 'bg-white text-indigo-600 shadow-xs' : 'text-gray-600'}`}>Dispatchly</button>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-gray-400">Loading master task feeds...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-500">No active operational tasks found.</div>
          ) : (
            <div className="divide-y divide-gray-200 overflow-y-auto max-h-[500px]">
              {filteredTasks.map((t) => (
                <div key={t.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${t.vertical === 'rentwell' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {t.vertical}
                      </span>
                      <span className="text-xs text-gray-400">Assigned: <strong className="text-gray-700">{t.assigned_va}</strong></span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                    <p className="text-xs text-gray-500">{t.metadata || 'General Context'} • {new Date(t.created_at).toLocaleTimeString()}</p>
                  </div>

                  <select
                    value={t.status}
                    onChange={(e) => updateTaskStatus(t.id, e.target.value as any)}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-md border cursor-pointer ${
                      t.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                      t.status === 'flagged' ? 'bg-red-50 text-red-700 border-red-200' :
                      t.status === 'in_progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
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

      {/* Audit Stream Table */}
      <div className="bg-white shadow-xs rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-900">Global Ecosystem Activity Stream</h3>
        </div>
        {logs.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">No recent system audit records.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Actor</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Target / Metadata</th>
                <th className="px-6 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{l.actor}</td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-600">{l.action}</td>
                  <td className="px-6 py-4 text-gray-600">{l.target_address || l.target || 'N/A'}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{new Date(l.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}