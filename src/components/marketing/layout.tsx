'use client'

import { ReactNode } from 'react'

interface MarketingLayoutProps {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen grid-bg">
      <main>{children}</main>
    </div>
  )
} 