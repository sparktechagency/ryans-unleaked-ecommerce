import { Skeleton } from "@/components/ui/skeleton"

export default function OrderHistorySkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/5" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-8" />
    </div>
  )
}
