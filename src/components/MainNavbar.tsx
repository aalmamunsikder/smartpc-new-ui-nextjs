'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function MainNavbar() {
  const pathname = usePathname()
  
  // Only hide navbar on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null
  }

  return <Navbar />
} 