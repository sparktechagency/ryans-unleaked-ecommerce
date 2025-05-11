"use client"

import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import AdvertCard from "../adverts/AdvertCard"
import { useEffect, useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function Adverts() {
  return (
    <ResponsiveContainer className="my-[60px] flex flex-col items-start justify-between gap-9 md:flex-row xl:px-32">
      <HomeAdvertsFilter />

      <div className="flex-1 space-y-[50px]">
        {Array.from({ length: 10 }).map((_, idx) => (
          <AdvertCard
            key={"home-advert" + idx}
            cardImgClassName="h-[200px] md:h-[300px] lg:h-[500px]"
            titleClassName="text-base"
          />
        ))}
      </div>
    </ResponsiveContainer>
  )
}

const categories = [
  "All Arts",
  "Paintings",
  "Drawings",
  "Sculptures",
  "Photography",
  "Digital Art",
  "Illustrations",
  "Calligraphy",
  "Mixed Media"
]

const HomeAdvertsFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Arts")
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000])
  const [isSticky, setIsSticky] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (categoryRef.current) {
        const { top } = categoryRef.current.getBoundingClientRect()
        setIsSticky(top <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Mobile sticky nav */}
      <div className="block md:hidden" ref={categoryRef}>
        <div
          className={`${
            isSticky
              ? "fixed top-0 right-0 left-0 z-10 bg-white px-4 py-3 shadow-md"
              : ""
          } scrollbar-hide overflow-x-auto pb-2 whitespace-nowrap transition-all duration-200`}
        >
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`mr-2 cursor-pointer ${
                selectedCategory === category
                  ? "bg-primary hover:bg-primary text-black"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        {isSticky && <div className="h-12"></div>}
      </div>

      {/* Desktop version hidden on mobile */}
      <div className="hidden flex-col gap-6 md:flex md:w-1/4">
        {/* Categories */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium">Categories</h3>
          </div>
          <div className="p-4">
            <RadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="space-y-1"
            >
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <div className="flex h-5 items-center">
                    <RadioGroupItem
                      value={category}
                      id={category}
                      className={cn(
                        "border border-gray-400",
                        selectedCategory === category
                          ? "border-primary text-primary border-2 bg-white"
                          : ""
                      )}
                    />
                  </div>

                  <Label
                    htmlFor={category}
                    className="cursor-pointer text-base font-normal text-gray-800"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Price Range */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium">Price Range</h3>
          </div>

          <div className="space-y-6 p-6">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              aria-label="Price range slider with minimum and maximum price"
              showTooltip={true}
              thumbClassName="border-primary focus-visible:outline-p1/40 h-[19px] w-[19px]"
              rangeClassName="bg-primary/75"
            />

            <div className="flex items-center justify-between gap-4">
              <Input
                type="text"
                value={`$${priceRange[0]}`}
                onChange={(e) =>
                  setPriceRange((prev) => [Number(e.target.value), prev[1]])
                }
                className="border-primary focus:ring-primary"
              />
              <Input
                type="text"
                value={`$${priceRange[1] === 5000 ? "5k" : priceRange[1]}`}
                onChange={(e) =>
                  setPriceRange((prev) => [prev[0], Number(e.target.value)])
                }
                className="border-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
