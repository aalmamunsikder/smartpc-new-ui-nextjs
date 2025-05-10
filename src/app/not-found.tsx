'use client'

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function NotFound() {
  const pathname = usePathname()

  useEffect(() => {
    // You can add analytics tracking here
    console.log(`404 error occurred at path: ${pathname}`)
  }, [pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          The page at <code className="text-primary">{pathname}</code> could not be found.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
