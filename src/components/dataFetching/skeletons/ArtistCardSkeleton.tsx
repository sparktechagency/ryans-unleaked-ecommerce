"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function ArtistCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 py-7 shadow-md">
      {/* Image Section */}
      <div className="relative mr-4">
        <Skeleton className="h-60 w-full rounded-md" />
      </div>

      {/* Details Section */}
      <div className="mt-4 flex-1 space-y-2">
        <Skeleton className="h-6 w-1/2" /> {/* Name */}
        <div className="mt-6 flex justify-between space-x-4">
          <Skeleton className="h-4 w-1/4" /> {/* Experience */}
          <Skeleton className="h-4 w-1/4" /> {/* Location */}
        </div>
      </div>
      <div className="mt-5 flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  )
}
