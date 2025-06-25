/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import { useGetAllUsersQuery } from "@/redux/apis/userApi"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import ArtistCardSkeleton from "@/components/dataFetching/skeletons/ArtistCardSkeleton"
import { defaultImg } from "@/constants/global.constant"

export default function ArtistsContainer() {
  const [page, setPage] = useState(1)
  const limit = 9

  const params = {
    role: "seller",
    page,
    limit
  }

  const { data, isFetching, isError, error, refetch } =
    useGetAllUsersQuery(params)
  const artistsData = data?.data?.data || []
  const totalPages = data?.data?.meta?.totalPage || 1

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Imagine more, Express freely, Buy boldly."
        breadcrumbItems={[
          { key: "home", label: "Home", href: "/" },
          { key: "artists", label: "Artists" }
        ]}
        className="mt-2 !h-[40dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <ResponsiveContainer className="mt-[25px]">
        <div className="mx-auto px-4 py-8 xl:max-w-[85%]">
          {/* Artist Grid */}
          {isFetching ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ArtistCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorMessage
              message={(error as any)?.data?.message}
              onRetry={refetch}
              className="py-32"
            />
          ) : artistsData.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {artistsData.map((artist: any) => (
                <div
                  key={artist._id}
                  className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <Link
                    href={`/artists/${artist._id}`}
                    className="relative block aspect-[5/3]"
                  >
                    <Image
                      src={artist?.profile || defaultImg}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <Link href={`/artists/${artist._id}`} className="block p-4">
                    <h3 className="text-lg font-medium capitalize">
                      {artist.name}
                    </h3>
                    <div className="mt-1 mb-3 flex justify-between text-sm text-gray-600">
                      <div>
                        <span className="font-medium text-gray-700">
                          Experience:
                        </span>{" "}
                        {artist.experience
                          ? `${artist.experience} years`
                          : "N/A"}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Location:
                        </span>{" "}
                        {artist.address || "N/A"}
                      </div>
                    </div>
                    {artist?.description && (
                      <p className="line-clamp-3 text-sm text-gray-600">
                        {artist?.description?.slice(0, 140)}...
                      </p>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground py-20 text-center">
              No artists found at the moment.
            </p>
          )}

          {/* Pagination */}
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
      </ResponsiveContainer>
    </div>
  )
}
