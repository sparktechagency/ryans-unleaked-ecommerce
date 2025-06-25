import CommonTopBanner from "@/components/shared/CommonTopBanner"
import heroBanner from "@/assets/images/home/hero-bg.png"

export default function Hero() {
  return (
    <div>
      <CommonTopBanner
        className="!h-[75dvh]"
        heading="Feel the beauty, Discover the story, Support the artist."
        subHeading="Browse our collection to find the masterpiece that you desire or join us today to start selling."
        backgroundImage={heroBanner}
      />
    </div>
  )
}
