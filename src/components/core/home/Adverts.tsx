/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import AdvertCard from "../adverts/AdvertCard"
import HomeAdvertsFilter from "./HomeAdvertsFilter"
import { useGetProductsQuery } from "@/redux/apis/productApi"
import { TProduct } from "@/interface/product.interface"
import ProductCardSkeleton from "@/components/dataFetching/skeletons/ProductCardSkeleton"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import { useEffect, useState } from "react"

export default function Adverts() {
  const [priceRanges, setPriceRanges] = useState<number[]>([0, 10000])
  const [selectedCategory, setSelectedCategory] = useState("")
  const pageSize = 5
  const [limit, setLimit] = useState(pageSize)

  const priceRange = `${priceRanges[0]}-${priceRanges[1]}`

  const params = {
    category: selectedCategory,
    fields: "title price image author",
    priceRange,
    limit
  }

  const { data, isError, error, isLoading, isFetching, refetch } =
    useGetProductsQuery(params)
  const products = data?.data?.data
  const meta = data?.data?.meta

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      if (
        scrollY + windowHeight >= docHeight - 500 &&
        meta?.total > products?.length
      ) {
        setLimit(limit + pageSize)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [limit, meta?.total, products?.length])

  return (
    <ResponsiveContainer className="my-12 flex flex-col items-start justify-between gap-9 md:flex-row lg:my-[60px] xl:px-32">
      <HomeAdvertsFilter
        priceRange={priceRanges}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setPriceRange={setPriceRanges}
      />

      {isLoading ? (
        <div className="flex w-full flex-1 flex-col gap-6">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      ) : isError ? (
        <div className="flex-1 rounded-[20px] border border-gray-200 bg-white p-6 py-20 shadow-md md:py-44">
          <ErrorMessage
            message={(error as any)?.data?.message}
            onRetry={refetch}
          />
        </div>
      ) : products?.length === 0 ? (
        <div className="flex-1 rounded-[20px] border border-gray-200 bg-white p-6 py-56 shadow-md">
          <p className="text-center text-2xl font-semibold text-gray-500">
            No products found!
          </p>
        </div>
      ) : (
        <div className="flex-1 space-y-[30px]">
          {products?.map((product: TProduct, idx: number) => (
            <AdvertCard
              product={product}
              key={"home-advert" + idx}
              cardImgClassName="h-[200px] md:h-[300px] lg:h-[500px]"
              titleClassName="text-base"
            />
          ))}
          {isFetching && (
            <div className="flex w-full flex-1 flex-col gap-6">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          )}
        </div>
      )}
    </ResponsiveContainer>
  )
}
