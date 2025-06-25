"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton({
  mini = false
}: {
  mini?: boolean
}) {
  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white p-6 shadow-md">
      {/* Profile Section */}
      <div className="mb-6 flex items-center space-x-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Image */}
      <div className="relative mb-4">
        <Skeleton
          className={`${mini ? "h-50" : "h-60 w-full rounded-[20px] md:h-110"}`}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4 md:gap-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
