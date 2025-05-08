"use client"

import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logos/logo.svg"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Repeat2,
  Search,
  Settings,
  ShoppingCart
} from "lucide-react"
import NavLink from "./NavLink"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import CustomAvatar from "@/components/custom/CustomAvatar"
import userAvatar from "@/assets/images/user/dummy-user.jpg"
import { Button } from "@/components/ui/button"

const NAVBAR_LINKS = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "Upload",
    route: "/upload"
  },
  {
    label: "Artists",
    route: "/artists"
  },
  {
    label: "Featured",
    dropdownLinks: [
      {
        label: "Holiday"
      },
      {
        label: "Christmas"
      },
      {
        label: "New Year"
      },
      {
        label: "Birthday"
      },
      {
        label: "Others"
      }
    ]
  }
]

export default function Navbar() {
  const userId = true

  const pathname = usePathname()
  return (
    <ResponsiveContainer className="py-4">
      <div className="flex items-center justify-between text-center lg:gap-x-7 2xl:gap-x-9">
        <Link href="/" className="block w-[130px]">
          <Image
            src={logo}
            alt="logo"
            height={500}
            width={500}
            className="size-[50px]"
          />
        </Link>

        {/* --------------------- Search Bar --------------------- */}
        <div className="relative h-10 w-1/2 lg:w-1/3">
          <Search
            className="text-primary-foreground absolute top-1/2 left-2 -translate-y-1/2"
            size={16}
            role="button"
          />

          <Input
            id="navbar-search-input"
            placeholder="Search arts or artists"
            className="border-primary h-full w-full border bg-transparent pr-24 pl-8 shadow-none focus-visible:ring-0"
            // onChange={(e) => dispatch(setSearch(e.target.value))}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") handleDesktopSearch() // navigate to `/all-product` when clicked `enter`
            // }}
          />

          <Button className="absolute inset-y-0 right-0 h-full rounded-l-none">
            Search
          </Button>
        </div>

        {/* --------------------- Navbar Links --------------------- */}
        <div className="flex items-center gap-x-10">
          <div className="flex items-center gap-x-6">
            {NAVBAR_LINKS?.map((item) => {
              if (!item.dropdownLinks) {
                return (
                  <NavLink key={item.route} route={item.route}>
                    {item.label}
                  </NavLink>
                )
              }

              return (
                <DropdownMenu key={item.route}>
                  <DropdownMenuTrigger
                    className={`flex items-center gap-x-1 !border-0 font-medium !outline-0 data-[state=open]:[&_svg]:rotate-180`}
                  >
                    {item.label}{" "}
                    <ChevronDown
                      size={16}
                      className="transition-all duration-300"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    sideOffset={10}
                    align="center"
                    className="w-48"
                  >
                    {item.dropdownLinks.map((link) => (
                      <DropdownMenuItem key={link.label}>
                        {link.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            })}
          </div>

          <div className="flex items-center gap-x-6">
            {userId && (
              <button type="button" className="text-primary">
                Switch to Selling
              </button>
            )}

            <Link href="/cart" className="relative">
              <ShoppingCart
                className={`${pathname === "/cart" ? "text-primary-orange" : "text-black"} text-2xl`}
              />

              <Badge className="bg-primary absolute -top-2 -right-[10px] flex aspect-square size-5 items-center justify-center rounded-full text-white">
                <p className="text-xs">9+</p>
              </Badge>
            </Link>

            {userId ? (
              <UserProfileDropdown />
            ) : (
              <Button variant="default" asChild>
                <Link href="/login">Log In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

const UserProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!border-0 !outline-0">
        <CustomAvatar name="Uzzal Bhowmik" img={userAvatar} size={36} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end" sideOffset={10}>
        <DropdownMenuItem asChild>
          <Link href="/user/dashboard" className="flex items-center gap-x-2">
            <LayoutDashboard size={15} /> Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/user/order-history"
            className="flex items-center gap-x-2"
          >
            <Repeat2 size={15} /> Order History
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/user/cart" className="flex items-center gap-x-2">
            <ShoppingCart size={15} /> Shopping Cart
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/user/settings" className="flex items-center gap-x-2">
            <Settings size={15} />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <button
            className="flex w-full items-center gap-x-2"
            // onClick={handleLogout}
          >
            <LogOut size={15} />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
