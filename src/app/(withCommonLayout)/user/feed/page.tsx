import AdvertCard from "@/components/core/adverts/AdvertCard"

export default function Feed() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <AdvertCard
          key={idx}
          cardImgClassName="h-[150px]"
          titleClassName="xl:text-lg"
        />
      ))}
    </div>
  )
}
