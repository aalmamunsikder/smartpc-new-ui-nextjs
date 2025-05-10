import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { metadata } from './metadata'
import Template from './template'
import MainNavbar from '@/components/MainNavbar'
import MainFooter from '@/components/MainFooter'
import { ThemeWrapper } from '@/components/ThemeWrapper'

const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeWrapper>
          <div className="flex min-h-screen flex-col">
            <MainNavbar />
            <Template>{children}</Template>
            <MainFooter />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
} 