import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Protocol Assistant - DCRI Clinical Trial Document Analyzer',
  description: 'Smart document helper for clinical trial teams - provides instant feedback on protocols, informed consent forms, and study documents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-dcri-blue text-white">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">Protocol Assistant</h1>
              <p className="text-sm opacity-90">Clinical Trial Document Analysis Tool</p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-100 mt-auto">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
              © 2024 DCRI - Duke Clinical Research Institute
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}