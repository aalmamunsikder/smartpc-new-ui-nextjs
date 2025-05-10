'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function MainFooter() {
  const pathname = usePathname()
  
  // Don't show main footer on auth or dashboard pages
  if (pathname?.startsWith('/auth') || pathname?.startsWith('/dashboard')) {
    return null
  }

  return <Footer />
} 