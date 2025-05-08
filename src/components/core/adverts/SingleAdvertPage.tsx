"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ADVERT } from "@/constants/advert.constants"
import { PhotoProvider, PhotoView } from "react-photo-view"
import advertImg from "@/assets/images/advert/Frame 2147226437.png"
import { Expand } from "lucide-react"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import { toast } from "sonner"

export default function SingleAdvertPage() {
  const advert = ADVERT

  return (
    <div>
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
            key: "top-banner-breadcrumb-advert",
            label: "Arts Details"
          }
        ]}
        className="h-[45dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <ResponsiveContainer className="py-12">
        <div className="mt-[45px] grid grid-cols-1 items-start gap-12 md:mt-[60px] lg:grid-cols-2 xl:mt-[80px]">
          {/* Image Column */}
          <div className="group relative">
            <div className="cursor-pointer overflow-hidden rounded-2xl bg-black/5">
              <PhotoProvider>
                <PhotoView src={advertImg?.src}>
                  <div>
                    <Image
                      src={advert.image}
                      alt="Colorful portrait artwork"
                      width={600}
                      height={600}
                      className="h-auto w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Full screen preview button */}
                    <button className="absolute right-4 bottom-4 bg-gray-200 p-2 text-gray-800 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <Expand />
                    </button>
                  </div>
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary mb-3 rounded-2xl border-none px-4 py-1 text-sm shadow-none"
                >
                  {advert.category}
                </Badge>
                <h1 className="text-2xl leading-tight font-bold text-gray-900 md:text-3xl">
                  {advert.title}
                </h1>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-primary text-3xl font-bold">
                    ${advert?.price}
                  </div>
                  <div className="text-sm text-gray-500 line-through">$150</div>
                  <div className="ml-2 rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    20% OFF
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  In stock
                </div>
              </div>
            </div>

            <p className="leading-relaxed text-gray-600">
              {advert.description}
            </p>

            <div className="flex items-center justify-between gap-6">
              <Button
                variant="outline-primary"
                className="flex-1"
                size="lg"
                onClick={() => {
                  toast.success("Added to cart", {
                    position: "bottom-right"
                  })
                }}
              >
                Add to cart
              </Button>

              <Button variant="default" className="flex-1" size="lg">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
