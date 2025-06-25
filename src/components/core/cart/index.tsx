"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { removeFromCart } from "@/redux/slices/cartSlice"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import emptyCart from "@/assets/images/cart.png"
import { defaultImg } from "@/constants/global.constant"

export default function CartContainer() {
  const carts = useSelector((state: RootState) => state.cart.items)
  console.log("carts", carts)
  const dispatch = useDispatch()

  // Extract unique authors (remove duplicates by _id)
  const authors = carts
    .map((item) => item.author)
    .filter((author): author is { _id: string; name: string } => !!author?._id)

  const uniqueAuthors = authors.filter(
    (author, index, self) =>
      index === self.findIndex((a) => a._id === author._id)
  )
  const [selectedAuthor, setSelectedAuthor] = useState<string>(
    uniqueAuthors.length > 0 ? uniqueAuthors[0]._id : ""
  )

  // Filter carts by selectedAuthor (_id)
  const filteredCarts = selectedAuthor
    ? carts.find((item) => item.author?._id === selectedAuthor)?.items || []
    : []

  const artsPrice = filteredCarts.reduce((total, item) => total + item.price, 0)
  const tax = 0
  const shipping = "Free"
  const total = artsPrice + tax

  const handleRemove = (productId: string, authorId: string) => {
    dispatch(removeFromCart({ productId, authorId }))
  }

  return (
    <>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Imagine more, Express freely, Buy boldly."
        breadcrumbItems={[
          { key: "home", label: "Home", href: "/" },
          { key: "cart", label: "Cart" }
        ]}
        className="mt-2 !h-[40dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />
      <ResponsiveContainer>
        {carts.length > 0 ? (
          <div className="mx-auto mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 xl:max-w-[85%]">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center justify-between gap-5">
                <h2 className="text-2xl font-semibold">My Shopping Cart</h2>
                <div>
                  <Select onValueChange={setSelectedAuthor} defaultValue="">
                    <SelectTrigger className="mt-4 w-full max-w-sm">
                      <SelectValue placeholder="Select Author" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueAuthors.map((author) => (
                        <SelectItem key={author._id} value={author._id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                {filteredCarts.length > 0 ? (
                  filteredCarts.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between rounded-lg border bg-white p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Link
                          href={`/advert/${item._id}`}
                          className="relative h-16 w-16 flex-shrink-0"
                        >
                          <Image
                            src={item.image || defaultImg}
                            alt={item.title}
                            fill
                            className="rounded-md object-cover"
                          />
                        </Link>
                        <Link href={`/advert/${item._id}`}>
                          <h3 className="font-medium">{item.title}</h3>
                        </Link>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemove(item._id, selectedAuthor)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    No items for this author.
                  </p>
                )}
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-4">
                    <span className="text-gray-600">Arts Price</span>
                    <span className="font-medium">${artsPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping}</span>
                  </div>
                  <div className="flex justify-between border-b pb-4">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">${total.toFixed(0)}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="bg-primary hover:bg-primary/90 h-12 w-full text-black">
                    <Link href={`/checkout?author=${selectedAuthor}`}>
                      Proceed to checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center sm:py-32">
            <Image
              src={emptyCart}
              alt="empty cart"
              className="mx-auto mb-4"
              width={200}
              height={200}
            />
            <p className="text-muted-foreground text-lg">Your cart is empty</p>
          </div>
        )}
      </ResponsiveContainer>
    </>
  )
}
