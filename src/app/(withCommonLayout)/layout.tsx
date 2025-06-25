import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import React from "react"

interface CommonLayoutProps {
  children: React.ReactNode
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
