"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function SingleProductSkeleton() {
  return (
    <div className="mt-[45px] grid grid-cols-1 items-start gap-12 md:mt-[60px] lg:grid-cols-2 xl:mt-[80px]">
      {/* Image Column */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl bg-black/5">
          <Skeleton className="h-[220px] w-full rounded-2xl sm:h-[500px]" />
        </div>
      </div>

      {/* Content Column */}
      <div className="flex flex-col space-y-8">
        <div className="space-y-6">
          {/* Category + Title */}
          <div>
            <Skeleton className="mb-3 h-6 w-24 rounded-2xl" />
            <Skeleton className="h-8 w-3/4 rounded-md" />
          </div>

          {/* Price & Stock Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-36 rounded" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Buttons */}
        <div className="mt-4 flex items-center justify-between gap-5">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
