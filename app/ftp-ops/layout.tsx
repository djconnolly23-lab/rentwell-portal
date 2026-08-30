import React from 'react'
import Link from 'next/link'

export default function FTPOpsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <span className="text-lg font-bold tracking-wider text-white">FTP MASTER OS</span>
          <span className="block text-xs text-gray-400 mt-0.5">Workforce & Operations Hub</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 text-sm">
          <Link
            href="/superuser"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            Superuser Control
          </Link>
          <Link
            href="/rentwell-support"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            Rentwell VA Support
          </Link>
          <Link
            href="/dispatchly-support"
            className="flex items-center px-4 py-2.5 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            Dispatchly VA Support
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          FTP Ecosystem v4.2
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-xs">
          <h1 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Operations Control Center</h1>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              System Active
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}