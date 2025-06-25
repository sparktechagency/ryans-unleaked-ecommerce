"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { RadioGroup } from "@/components/ui/radio-group"

export default function FilterSkeleton() {
  return (
    <div className="space-y-6">
      {/* Categories Skeleton */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4">
        <Skeleton className="mb-4 h-6 w-44" />
        <RadioGroup className="space-y-3">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price Range Skeleton */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4">
        <Skeleton className="mb-4 h-6 w-1/3" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}
