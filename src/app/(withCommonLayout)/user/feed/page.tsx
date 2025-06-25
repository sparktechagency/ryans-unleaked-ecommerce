/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import AdvertCard from "@/components/core/adverts/AdvertCard"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import ProductCardSkeleton from "@/components/dataFetching/skeletons/ProductCardSkeleton"
import { TProduct } from "@/interface/product.interface"
import { useGetProductsQuery } from "@/redux/apis/productApi"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { useState } from "react"

export default function Feed() {
  const user = useAppSelector(selectUser)
  const [page, setPage] = useState(1)
  const limit = 6

  const searchParams = {
    author: user?.userId,
    page,
    limit
  }

  const { data, isLoading, isError, error, refetch } = useGetProductsQuery(
    searchParams,
    { skip: !user?.userId }
  )

  const products = data?.data?.data || []
  const totalPages = data?.data?.meta?.totalPage || 1

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductCardSkeleton mini key={idx} />
          ))}
        </div>
      ) : isError ? (
        <ErrorMessage
          message={(error as any)?.data?.message}
          onRetry={refetch}
          className="py-32"
        />
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product: TProduct) => (
              <AdvertCard
                key={product._id}
                cardImgClassName="h-[150px]"
                titleClassName="xl:text-lg"
                product={product}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                «
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => handlePageChange(pg)}
                  className={`flex h-8 w-8 items-center justify-center rounded border ${
                    page === pg
                      ? "bg-amber-400 font-medium text-black"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                »
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
