import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import Image from "next/image"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import artistImg from "@/assets/images/artists/Rectangle 42522.png"
import AdvertCard from "../../adverts/AdvertCard"

export default function DynamicArtistContainer() {
  return (
    <>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Imagine more, Express freely, Buy boldly."
        breadcrumbItems={[
          {
            key: "top-banner-breadcrumb-home",
            label: "Home",
            href: "/"
          },
          {
            key: "top-banner-breadcrumb-artists",
            label: "Artists",
            href: "/artists"
          },
          {
            key: "top-banner-breadcrumb-artist-profile",
            label: "Artist"
          }
        ]}
        className="h-[45dvh] rounded-[30px] px-0 [&_img]:rounded-[30px]"
      />

      <ResponsiveContainer>
        {/* Profile Details */}
        <div className="mx-auto my-10 flex items-start justify-center gap-10 md:flex-row md:items-center xl:max-w-1/2">
          <div className="relative flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={artistImg}
              alt="Profile picture"
              width={300}
              height={300}
              className="aspect-square h-[180px] w-auto rounded-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="mb-2 text-2xl font-medium">Muskan Tanaz</h1>

            <div className="mb-4 flex flex-col gap-2 md:flex-row md:gap-8">
              <span className="text-sm">Experience : 2 years</span>

              <div className="flex items-center gap-1">
                <span className="text-sm">Location : Bangladesh</span>
              </div>
            </div>

            <p className="text-sm text-gray-700">
              We are a creative platform dedicated to showcasing original
              artwork from talented artists around the world. From hand-drawn
              sketches and digital illustrations to paintings, animations, and
              mixed media, our goal is to connect art lovers with meaningful
              visual experiences.
            </p>
          </div>
        </div>

        <hr className="mx-auto mb-10 w-full border-gray-300 xl:w-3/4" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <AdvertCard
              key={"advert-card-" + index}
              cardImgClassName="h-[200px]"
              titleClassName="xl:text-lg"
            />
          ))}
        </div>
      </ResponsiveContainer>
    </>
  )
}
