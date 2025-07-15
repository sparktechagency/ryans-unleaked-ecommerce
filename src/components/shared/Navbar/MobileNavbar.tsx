/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { cn } from "@/lib/utils"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import logo from "@/assets/logos/logo.png"
import { Input } from "@/components/ui/input"
import NavLink from "./NavLink"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logOut, selectUser } from "@/redux/slices/authSlice"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useGetProductsQuery } from "@/redux/apis/productApi"
import { usePathname, useRouter } from "next/navigation"

export default function MobileNavbar() {
  const [hideMobileMenu, setHideMobileMenu] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const currentPath = usePathname()

  const handleLogout = () => {
    dispatch(logOut())
    toast.success("Logged out successfully")
    router.push(`/auth/sign-in?redirect=${currentPath}`)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const params = {
    searchTerm,
    limit: 5
  }
  const { data } = useGetProductsQuery(params, { skip: !searchTerm })
  const searchedProducts = data?.data?.data
  // Simulate search result
  useEffect(() => {
    if (searchTerm.length > 0) {
      setSearchResults(searchedProducts)
    } else {
      setSearchResults([])
    }
  }, [searchTerm, searchedProducts])

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
          <Link href="/cart">
            <ShoppingCart className="text-xl" />
          </Link>

          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <button>
                <Search className="text-xl" />
              </button>
            </DialogTrigger>
            <DialogContent className="p-3">
              <div className="relative mb-0">
                <Input
                  placeholder="Search arts or artists"
                  className="pr-4 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="text-primary absolute top-1/2 left-2 -translate-y-1/2"
                  size={16}
                />
              </div>
              {searchResults?.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/advert/${item._id}`}
                      className={`flex items-center gap-3 border-b py-2 hover:bg-gray-100`}
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div
                        className="h-[40px] w-[45px] rounded-md bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-black">
                          {item.title.length > 22
                            ? `${item.title.slice(0, 22)}...`
                            : item.title}
                        </p>
                        <span className="text-muted-foreground text-xs">
                          {item.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                searchTerm && (
                  <p className="text-muted-foreground px-4 text-sm">
                    No results found
                  </p>
                )
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div className="absolute top-[80px] left-0 z-[9999] h-auto w-full">
        {!hideMobileMenu && (
          <ul className="flex list-none flex-col items-start gap-y-6 border-b border-b-gray-300 bg-white px-4 py-7">
            <li>
              <NavLink route="/">Home</NavLink>
            </li>
            {user?.role === "seller" && (
              <li>
                <NavLink route="/upload">Upload</NavLink>
              </li>
            )}
            <li>
              <NavLink route="/artists">Artists</NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink route="/user/dashboard">Profile</NavLink>
                </li>
                <li onClick={handleLogout}>
                  <NavLink route="#">Logout</NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink route="/auth/sign-up">Login</NavLink>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
