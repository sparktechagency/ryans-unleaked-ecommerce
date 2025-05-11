"use client"

import { cn } from "@/lib/utils"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import logo from "@/assets/logos/logo.png"
import { Input } from "@/components/ui/input"
import NavLink from "./NavLink"

export default function MobileNavbar({}) {
  const [hideMobileMenu, setHideMobileMenu] = useState(true)
  const [hideMobileSearchBar] = useState(true)

  return (
    <div className={cn("transition-all duration-300 ease-in-out lg:hidden")}>
      {/* Menu Header */}
      <div className="relative flex items-center justify-between px-4">
        {/* menu icon */}
        <button
          className="w-1/3"
          onClick={() => setHideMobileMenu(!hideMobileMenu)}
        >
          {hideMobileMenu ? (
            <Menu color="var(--primary)" size={24} />
          ) : (
            <X color="var(--primary)" size={24} />
          )}
        </button>

        {/* center */}
        <Link href="/" className="w-1/3">
          <Image
            src={logo}
            alt="logo"
            className="mx-auto block h-[50px] w-auto"
          />
        </Link>

        {/* right */}
        <div className="flex w-1/3 items-center justify-end gap-x-4 text-lg font-bold">
          <div>
            <div className="flex items-center gap-x-5">
              <Link href="/cart">
                <ShoppingCart className="text-xl" />
              </Link>
              <button>
                <Search className="text-xl" />
              </button>
            </div>

            {/* search bar */}
            {!hideMobileSearchBar && (
              <div className="search-bar-container absolute top-12 left-16 z-[9999] w-3/4">
                <div className="relative w-full">
                  <Input
                    id="navbar-search-input"
                    placeholder="What are you looking for?"
                    className="bg-foundation-black-light mx-auto h-12 w-[90%] pr-10 pl-4 font-medium"
                    // onChange={(e) => dispatch(setSearch(e.target.value))}
                  />
                  <Search
                    className="absolute top-1/2 right-[30px] -translate-y-1/2"
                    size={20}
                    role="button"
                    // onClick={}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Buyer profile dropdown */}
          {/* {userId && (
            <DropdownMenu
              onOpenChange={() => setHideMobileSearchBar(true)}
              className=""
            >
              <DropdownMenuTrigger className="">
                <Avatar>
                  <AvatarImage src={showImage(user?.image)} />
                  <AvatarFallback className="bg-primary-black font-bold text-white">
                    {user?.name ? (
                      user?.name?.firstName[0]?.toUpperCase()
                    ) : (
                      <User size={20} className="text-white" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[99999]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="/user/profile"
                    className="flex items-center gap-x-2"
                  >
                    <User size={15} /> Profile
                  </Link>
                </DropdownMenuItem>
                {showCartWishlist && (
                  <DropdownMenuItem>
                    <Link href="/cart" className="flex items-center gap-x-2">
                      <BsCart3 className="text-sm" /> Cart
                    </Link>
                  </DropdownMenuItem>
                )}

                {showCartWishlist && (
                  <DropdownMenuItem>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-x-2"
                    >
                      <BsHeart className="text-sm" /> Wishlist
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem>
                  <Link
                    href="/user/settings"
                    className="flex items-center gap-x-2"
                  >
                    <Settings size={15} /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/user/order-history"
                    className="flex items-center gap-x-2"
                  >
                    <List size={15} />
                    Order History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="flex items-center gap-x-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )} */}
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div className="absolute top-[80px] left-0 z-[9999] h-auto w-full">
        {!hideMobileMenu && (
          <div>
            <ul className="flex list-none flex-col items-start gap-y-6 border-b border-b-gray-300 bg-white px-4 py-7">
              <li>
                <NavLink route="/">Home</NavLink>
              </li>
              <li>
                <NavLink route="/upload">Upload</NavLink>
              </li>
              <li>
                <NavLink route="/artists">Artists</NavLink>
              </li>

              <li>
                <NavLink route="#">Join Now</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
