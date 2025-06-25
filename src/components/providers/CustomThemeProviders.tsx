"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export default function CustomThemeProviders({
  children
}: {
  children: ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="sepia"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
