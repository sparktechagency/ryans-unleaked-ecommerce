"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import styles from "./Navbar.module.css"

interface NavLinkProps {
  children: React.ReactNode
  route: string
  // setHideMobileMenu?: (value: boolean) => void
}

export default function NavLink({ children, route }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      href={route}
      passHref
      className={`${styles.navbarLink} font-medium ${pathname === route ? "text-primary" : "text-primary-foreground"}`}
      // onClick={hideMobileMenu}
    >
      {children}
    </Link>
  )
}
