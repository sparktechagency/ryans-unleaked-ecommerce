"use client"

import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import AdvertCard from "../adverts/AdvertCard"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Adverts() {
  return (
    <ResponsiveContainer className="my-[60px] flex items-start justify-between gap-9 xl:px-32">
      <HomeAdvertsFilter />

      <div className="flex-1 space-y-[50px]">
        {Array.from({ length: 10 }).map((_, idx) => (
          <AdvertCard key={"home-advert" + idx} />
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

  return (
    <div className="flex flex-col gap-6 lg:w-1/4">
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
  )
}
