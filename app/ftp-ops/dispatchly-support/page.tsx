'use client'

import React, { useState } from 'react'

interface LoadItem {
  id: string
  carrierName: string
  origin: string
  destination: string
  status: 'Booked' | 'In Transit' | 'Delivered'
}

export default function DispatchlySupportDashboard() {
  const [loads] = useState<LoadItem[]>([
    { id: 'LD-1001', carrierName: 'Swift Transport LLC', origin: 'Chicago, IL', destination: 'Dallas, TX', status: 'In Transit' },
    { id: 'LD-1002', carrierName: 'Apex Express Inc', origin: 'Atlanta, GA', destination: 'Miami, FL', status: 'Booked' }
  ])

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dispatchly Fleet & Load Triage</h2>
        <p className="text-sm text-gray-500">Carrier compliance monitoring and load pipeline tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Fleet Loads</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">142</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Compliance Blocks</p>
          <p className="text-3xl font-extrabold text-red-600 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Check-Call SLA Met</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">99.8%</p>
        </div>
      </div>

      <div className="bg-white shadow-xs rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Active Load Pipeline</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Load ID</th>
              <th className="px-6 py-3">Carrier Name</th>
              <th className="px-6 py-3">Lane (Origin → Dest)</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {loads.map((load) => (
              <tr key={load.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono font-semibold text-blue-600">{load.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{load.carrierName}</td>
                <td className="px-6 py-4 text-gray-600">{load.origin} → {load.destination}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {load.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}