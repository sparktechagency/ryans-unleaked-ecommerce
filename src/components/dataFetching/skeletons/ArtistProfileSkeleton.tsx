import { Skeleton } from "@/components/ui/skeleton"

export default function ArtistProfileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <Skeleton className="h-42 w-42 rounded-full" />
      <div className="space-y-4">
        <Skeleton className="mx-auto h-6 w-[240px] sm:mx-0" />
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-5 w-[150px]" />
        </div>
      </div>
    </div>
  )
}
