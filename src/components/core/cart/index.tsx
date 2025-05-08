"use client"

import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import advertImg from "@/assets/images/advert/Frame 2147226437.png"
import { useState } from "react"
import Image, { StaticImageData } from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CartItem {
  id: string
  image: StaticImageData
  artist: string
  price: number
}

export default function CartContainer() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      image: advertImg,
      artist: "Andrea Michaelsson",
      price: 120.0
    },
    {
      id: "2",
      image: advertImg,
      artist: "Pablo Picasso",
      price: 100.0
    }
  ])

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const artsPrice = cartItems.reduce((total, item) => total + item.price, 0)
  const discount = 30
  const tax = 0
  const shipping = "Free"
  const total = artsPrice - discount + tax

  return (
    <ResponsiveContainer className="py-12">
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Imagine more, Express freely, Buy boldly."
        breadcrumbItems={[
          {
            key: "top-banner-breadcrumb-home",
            label: "Home",
            href: "/"
          },
          {
            key: "top-banner-breadcrumb-cart",
            label: "Cart"
          }
        ]}
        className="h-[45dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <div className="mx-auto mt-[45px] grid grid-cols-1 gap-8 md:mt-[60px] md:grid-cols-3 xl:mt-[80px] xl:max-w-[85%]">
        {/* Shopping Cart Section */}
        <div className="md:col-span-2">
          <h2 className="mb-6 text-2xl font-semibold">My Shopping Cart</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={`Artwork by ${item.artist}`}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.artist}</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 transition-colors hover:text-gray-600"
                    aria-label="Remove item"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
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
                <span className="text-gray-600">Discount</span>
                <span className="font-medium">${discount.toFixed(0)}</span>
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
              <Button
                className="bg-primary hover:bg-primary/90 h-12 w-full rounded-md font-medium text-black"
                asChild
              >
                <Link href={"/checkout"}>Buy Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}
