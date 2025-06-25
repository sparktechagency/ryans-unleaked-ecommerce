/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import Image from "next/image"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import AdvertCard from "../../adverts/AdvertCard"
import { useGetSingleUserQuery } from "@/redux/apis/userApi"
import { useParams } from "next/navigation"
import { TUser } from "@/interface/user.interface"
import { defaultAvatar } from "@/constants/global.constant"
import { useGetProductsQuery } from "@/redux/apis/productApi"
import { TProduct } from "@/interface/product.interface"
import ArtistProfileSkeleton from "@/components/dataFetching/skeletons/ArtistProfileSkeleton"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import ProductCardSkeleton from "@/components/dataFetching/skeletons/ProductCardSkeleton"

export default function DynamicArtistContainer() {
  const params = useParams()
  const [page, setPage] = useState(1)
  const limit = 6

  const { data, isLoading, isError, error, refetch } = useGetSingleUserQuery(
    params.id,
    { skip: !params.id }
  )
  const user = data?.data as TUser

  const {
    data: productData,
    isLoading: productLoading,
    isError: isProductError,
    error: productError,
    refetch: productRefetch
  } = useGetProductsQuery(
    { author: params.id, page, limit },
    { skip: !params.id }
  )

  const products = productData?.data?.data || []
  const totalPages = productData?.data?.meta?.totalPage || 1

  return (
    <>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Imagine more, Express freely, Buy boldly."
        breadcrumbItems={[
          { key: "home", label: "Home", href: "/" },
          { key: "artists", label: "Artists", href: "/artists" },
          { key: "artist-profile", label: "Artist" }
        ]}
        className="mt-2 !h-[40dvh] rounded-[30px] px-0 [&_img]:rounded-[30px]"
      />

      <ResponsiveContainer>
        {/* Profile Details */}
        {isLoading ? (
          <div className="mx-auto my-10 flex items-start justify-center gap-10 md:flex-row md:items-center xl:max-w-1/2">
            <ArtistProfileSkeleton />
          </div>
        ) : isError ? (
          <ErrorMessage
            message={(error as any)?.data?.message}
            onRetry={refetch}
            className="py-22"
          />
        ) : (
          <div className="mx-auto my-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-start sm:gap-10 md:flex-row md:items-center xl:max-w-1/2">
            <div className="relative flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={user?.profile || defaultAvatar}
                alt="Profile picture"
                width={300}
                height={300}
                className="aspect-square h-[180px] w-auto rounded-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-2 text-2xl font-medium capitalize">
                {user?.name}
              </h1>
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:gap-8">
                <span className="text-sm">
                  Experience : {user?.experience || "N/A"}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">
                    Location : {user?.address || "N/A"}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{user?.descriptions}</p>
            </div>
          </div>
        )}

        <hr className="mx-auto mb-10 w-full border-gray-300 xl:w-3/4" />

        {/* Products */}
        {productLoading ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: limit }).map((_, i) => (
              <ProductCardSkeleton mini key={i} />
            ))}
          </div>
        ) : isProductError ? (
          <ErrorMessage
            message={(productError as any)?.data?.message}
            onRetry={productRefetch}
            className="py-22"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
              {products.length > 0 ? (
                products.map((product: TProduct, index: number) => (
                  <AdvertCard
                    product={product}
                    key={"advert-card-" + index}
                    cardImgClassName="h-[200px]"
                    titleClassName="xl:text-lg"
                  />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full py-10 text-center">
                  This artist hasn’t listed any items yet.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  «
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pg) => (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`flex h-8 w-8 items-center justify-center rounded border ${
                        page === pg
                          ? "bg-amber-400 font-medium text-black"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {pg}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  »
                </button>
              </div>
            )}
          </>
        )}
      </ResponsiveContainer>
    </>
  )
}
