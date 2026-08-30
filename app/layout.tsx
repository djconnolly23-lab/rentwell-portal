import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rentwell - Property & Lease Management',
  description: 'Enterprise property management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}