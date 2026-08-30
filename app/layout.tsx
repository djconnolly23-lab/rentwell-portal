import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rentwell Portal',
  description: 'Rental property management and operations portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans dark:bg-[#040D1A] dark:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}