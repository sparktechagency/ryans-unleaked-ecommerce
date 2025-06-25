/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useGetCategoriesQuery } from "@/redux/apis/categoryApi"
import FilterSkeleton from "@/components/dataFetching/skeletons/FilterSkeleton"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/useDebounce"

type TProps = {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  setPriceRange: (range: number[]) => void
  priceRange: number[]
}

const HomeAdvertsFilter = ({
  selectedCategory,
  setSelectedCategory,
  setPriceRange,
  priceRange
}: TProps) => {
  const [isSticky, setIsSticky] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)

  const [inputPrice, setInputPrice] = useState<number[]>(priceRange)
  const debouncedPrice = useDebounce(inputPrice, 500)

  useEffect(() => {
    setPriceRange(debouncedPrice)
  }, [debouncedPrice, setPriceRange])

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

  const params = { limit: 1000, fields: "name" }
  const { data, isFetching, isError, error, refetch } =
    useGetCategoriesQuery(params)
  const categories = data?.data?.data

  return (
    <>
      {/* Mobile sticky nav */}
      {isFetching ? (
        <div
          className={`grid grid-cols-5 gap-3 md:hidden ${isSticky && "fixed top-0 right-0 left-0 z-10 bg-white px-4 py-3 shadow-md"}`}
        >
          <Skeleton className="mb-3 h-6 w-15" />
          <Skeleton className="mb-3 h-6 w-15" />
          <Skeleton className="mb-3 h-6 w-15" />
          <Skeleton className="mb-3 h-6 w-15" />
        </div>
      ) : isError ? (
        <div className="block overflow-hidden rounded-xl border border-gray-200 bg-white md:hidden">
          <ErrorMessage
            message={(error as any)?.data?.message}
            onRetry={refetch}
          />
        </div>
      ) : (
        <div className="block max-w-dvw md:hidden" ref={categoryRef}>
          <div
            className={`${
              isSticky
                ? "fixed top-0 right-0 left-0 z-10 bg-white px-4 py-3 shadow-md"
                : ""
            } scrollbar-hide overflow-x-auto pb-2 whitespace-nowrap transition-all duration-200`}
          >
            {categories?.map((category: { name: string; _id: string }) => (
              <Badge
                key={category?._id}
                variant={
                  selectedCategory === category?._id ? "default" : "outline"
                }
                className={`mr-2 cursor-pointer ${
                  selectedCategory === category?._id
                    ? "bg-primary hover:bg-primary text-black"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category?._id)}
              >
                {category?.name}
              </Badge>
            ))}
          </div>
          {isSticky && <div className="h-12"></div>}
        </div>
      )}

      {/* Desktop filter panel */}
      {isFetching ? (
        <div className="sticky top-6 left-0 hidden flex-col gap-6 md:flex md:w-1/4">
          <FilterSkeleton />
        </div>
      ) : isError ? (
        <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white py-6 md:block">
          <ErrorMessage
            message={(error as any)?.data?.message}
            onRetry={refetch}
          />
        </div>
      ) : (
        <div className="sticky top-6 left-0 hidden flex-col gap-6 md:flex md:w-1/4">
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
                {categories?.map((category: { name: string; _id: string }) => (
                  <div
                    key={category?._id}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex h-5 items-center">
                      <RadioGroupItem
                        value={category?._id}
                        id={category?._id}
                        className={cn(
                          "border border-gray-400",
                          selectedCategory === category?._id
                            ? "border-primary text-primary border-2 bg-white"
                            : ""
                        )}
                      />
                    </div>

                    <Label
                      htmlFor={category?._id}
                      className="cursor-pointer text-base font-normal text-gray-800"
                    >
                      {category?.name}
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
                value={inputPrice}
                max={10000}
                onValueChange={setInputPrice}
                aria-label="Price range slider"
                showTooltip={true}
                thumbClassName="border-primary focus-visible:outline-p1/40 h-[19px] w-[19px]"
                rangeClassName="bg-primary/75"
              />

              <div className="flex items-center justify-between gap-4">
                <Input
                  type="number"
                  value={inputPrice[0]}
                  onChange={(e) =>
                    setInputPrice((prev) => [Number(e.target.value), prev[1]])
                  }
                  className="border-primary focus:ring-primary"
                />
                <Input
                  type="number"
                  value={inputPrice[1]}
                  onChange={(e) =>
                    setInputPrice((prev) => [prev[0], Number(e.target.value)])
                  }
                  className="border-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HomeAdvertsFilter
