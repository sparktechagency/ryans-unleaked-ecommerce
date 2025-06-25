"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileSkeleton({ seller }: { seller?: boolean }) {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <div>
          <Skeleton className="h-44 w-44 rounded-full" />
        </div>
        <div className="w-full space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      {seller && (
        <div className="mt-6 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 max-w-4/5" />
        </div>
      )}
    </div>
  )
}
