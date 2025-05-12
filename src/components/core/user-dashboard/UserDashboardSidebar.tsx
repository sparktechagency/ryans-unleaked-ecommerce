"use client"

import { cn } from "@/lib/utils"
import {
  ImageIcon,
  LogOut,
  LucideHistory,
  LucideLayoutDashboard,
  LucideSettings,
  LucideShoppingCart
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const buyerSidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/user/dashboard",
    icon: <LucideLayoutDashboard className="mr-3 h-5 w-5" />
  },
  {
    key: "order-history",
    label: "Order History",
    href: "/user/order-history",
    icon: <LucideHistory className="mr-3 h-5 w-5" />
  },
  {
    key: "cart",
    label: "Cart",
    href: "/cart",
    icon: <LucideShoppingCart className="mr-3 h-5 w-5" />
  },
  {
    key: "settings",
    label: "Settings",
    href: "/user/settings",
    icon: <LucideSettings className="mr-3 h-5 w-5" />
  }
]

const sellerSidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/user/dashboard",
    icon: <LucideLayoutDashboard className="mr-3 h-5 w-5" />
  },
  {
    key: "feed",
    label: "My Feed",
    href: "/user/feed",
    icon: <ImageIcon className="mr-3 h-5 w-5" />
  },
  {
    key: "selling-history",
    label: "Selling History",
    href: "/user/selling-history",
    icon: <LucideHistory className="mr-3 h-5 w-5" />
  },

  {
    key: "settings",
    label: "Settings",
    href: "/user/settings",
    icon: <LucideSettings className="mr-3 h-5 w-5" />
  }
]

export default function UserDashboardSidebar() {
  const currentPath = usePathname()

  const [sidebarItems, setSidebarItems] = useState(buyerSidebarItems)

  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole")
    if (userRole === "seller") {
      setSidebarItems(sellerSidebarItems)
    } else {
      setSidebarItems(buyerSidebarItems)
    }
  }, [])

  console.log({ sidebarItems })

  return (
    <div className="w-full rounded-2xl border bg-white shadow lg:w-1/4">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-medium">Navigation</h2>
      </div>
      <nav className="space-y-2 p-4">
        {sidebarItems?.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "flex w-full items-center rounded-md p-3 text-left text-gray-700 hover:bg-gray-100",
              currentPath === item.href &&
                "bg-primary hover:bg-primary text-black"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <Link href="/">
          <button className="flex w-full items-center rounded-md p-3 text-left text-gray-700 hover:bg-gray-100">
            <LogOut className="mr-3 h-5 w-5" />
            Log-out
          </button>
        </Link>
      </nav>
    </div>
  )
}
