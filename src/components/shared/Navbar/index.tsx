/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logos/logo.png"
import { Input } from "@/components/ui/input"
import {
  ChevronDown,
  History,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Repeat2,
  Search,
  Settings,
  ShoppingCart
} from "lucide-react"
import NavLink from "./NavLink"
import { usePathname, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import CustomAvatar from "@/components/custom/CustomAvatar"
import { Button } from "@/components/ui/button"
import MobileNavbar from "./MobileNavbar"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logOut, selectUser } from "@/redux/slices/authSlice"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useGetUserProfileQuery } from "@/redux/apis/userApi"
import { useState, useEffect, useRef } from "react"
import { useGetProductsQuery } from "@/redux/apis/productApi"

const NAVBAR_LINKS = [
  { label: "Home", route: "/" },
  { label: "Artists", route: "/artists" },
  { label: "Upload", route: "/upload" }
  // {
  //   label: "Featured",
  //   dropdownLinks: [
  //     { label: "Holiday" },
  //     { label: "Christmas" },
  //     { label: "New Year" },
  //     { label: "Birthday" },
  //     { label: "Others" }
  //   ]
  // }
]

export default function Navbar() {
  const user = useAppSelector(selectUser)
  const carts = useSelector((state: RootState) => state.cart.items)
  const totalCartItems =
    carts?.reduce((acc, group) => acc + group?.items?.length, 0) || 0
  const pathname = usePathname()
  const userRole = user?.role

  const [searchTerm, setSearchTerm] = useState("")
  const params = {
    searchTerm,
    limit: 5
  }
  const { data } = useGetProductsQuery(params, { skip: !searchTerm })
  const searchedProducts = data?.data?.data

  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("")
        setSearchResults([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchTerm.length > 0) {
      setSearchResults(searchedProducts)
    } else {
      setSearchResults([])
    }
  }, [searchedProducts, searchTerm])

  return (
    <ResponsiveContainer className="py-4">
      <div className="hidden items-center justify-between lg:flex">
        <Link href="/" className="block w-auto">
          <Image
            src={logo}
            alt="logo"
            height={500}
            width={500}
            className="h-[45px] w-auto object-contain"
          />
        </Link>

        {/* Search */}
        <div ref={searchRef} className="relative h-10 w-1/2 lg:w-1/3">
          <Search
            className="text-primary absolute top-1/2 left-2 -translate-y-1/2"
            size={16}
          />
          <Input
            placeholder="Search arts or artists"
            className="border-primary h-full w-full border bg-transparent pr-24 pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="absolute inset-y-0 right-0 h-full rounded-l-none">
            Search
          </Button>

          {searchTerm && (
            <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-md border bg-white shadow-md">
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/advert/${item._id}`}
                    className="flex items-center gap-3 border-b px-4 py-3 hover:bg-gray-100"
                  >
                    <div
                      className="h-[35px] w-[43px] rounded-md bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-black">
                        {item.title.length > 55
                          ? `${item.title.slice(0, 55)}...`
                          : item.title}
                      </p>
                      <span className="text-muted-foreground text-xs">
                        ${item.price}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground px-4 py-3 text-sm">
                  No result found
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-6">
            {NAVBAR_LINKS.map((item) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              if (!item.dropdownLinks) {
                return (
                  <NavLink key={item.route} route={item.route}>
                    {item.label}
                  </NavLink>
                )
              }
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-x-1">
                    {item.label} <ChevronDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    sideOffset={10}
                    align="center"
                    className="w-48"
                  >
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
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
            {userRole !== "seller" && (
              <Link href="/cart" className="relative">
                <ShoppingCart
                  className={`text-2xl ${pathname === "/cart" ? "text-primary-orange" : "text-black"}`}
                />
                <Badge className="bg-primary absolute -top-2 -right-[10px] size-5 rounded-full text-white">
                  <p className="text-xs">{totalCartItems}</p>
                </Badge>
              </Link>
            )}
            {user ? (
              userRole === "seller" ? (
                <SellerProfileDropdown />
              ) : (
                <BuyerProfileDropdown />
              )
            ) : (
              <Link href="/auth/sign-in">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <MobileNavbar />
    </ResponsiveContainer>
  )
}

const BuyerProfileDropdown = () => {
  const currentPath = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
    toast.success("Logged out successfully")
    router.push(`/auth/sign-in?redirect=${currentPath}`)
  }
  const { data } = useGetUserProfileQuery("")
  const user = data?.data

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!border-0 !outline-0">
        <CustomAvatar name="Uzzal Bhowmik" img={user?.profile} size={36} />
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
          <Link href="/cart" className="flex items-center gap-x-2">
            <ShoppingCart size={15} /> Shopping Cart
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/settings" className="flex items-center gap-x-2">
            <Settings size={15} /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-x-2"
          >
            <LogOut size={15} /> Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const SellerProfileDropdown = () => {
  const currentPath = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
    toast.success("Logged out successfully")
    router.push(`/auth/sign-in?redirect=${currentPath}`)
  }
  const { data } = useGetUserProfileQuery("")
  const user = data?.data

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!border-0 !outline-0">
        <CustomAvatar name="Uzzal Bhowmik" img={user?.profile} size={36} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" sideOffset={10}>
        <DropdownMenuItem asChild>
          <Link href="/user/dashboard" className="flex items-center gap-x-2">
            <LayoutDashboard size={15} /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/feed" className="flex items-center gap-x-2">
            <ImageIcon size={15} /> My Feed
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/user/selling-history"
            className="flex items-center gap-x-2"
          >
            <History size={15} /> Selling History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/settings" className="flex items-center gap-x-2">
            <Settings size={15} /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="flex w-full items-center gap-x-2"
            onClick={handleLogout}
          >
            <LogOut size={15} /> Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
