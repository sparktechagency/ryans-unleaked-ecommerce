import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import artistImg from "@/assets/images/artists/Rectangle 42522.png"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"

interface ArtistCard {
  id: number
  name: string
  image: StaticImageData
  experience: string
  location: string
  bio: string
  highlighted?: boolean
}

export default function ArtistsContainer() {
  const artists: ArtistCard[] = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: "Muskan Tanaz",
      image: artistImg,
      experience: "2 years",
      location: "Bangladesh",
      bio: "We are a creative platform dedicated to showcasing original artwork from talented artists around the world. From hand-drawn sketches and digital..."
    }))

  return (
    <div>
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
            label: "Arts Details"
          }
        ]}
        className="h-[45dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <ResponsiveContainer className="mt-[25px]">
        <div className="mx-auto px-4 py-8 xl:max-w-[85%]">
          {/* Artist Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <Link
                  href={`/artists/${artist.id}`}
                  className="relative block aspect-[5/3]"
                >
                  <Image
                    src={artist?.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                <Link href={`/artists/${artist.id}`} className="block p-4">
                  <h3 className="text-lg font-medium">{artist.name}</h3>
                  <div className="mt-1 mb-3 flex justify-between text-sm text-gray-600">
                    <div>
                      <span className="font-medium text-gray-700">
                        Experience:
                      </span>{" "}
                      {artist.experience}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Location:
                      </span>{" "}
                      {artist.location}
                    </div>
                  </div>
                  <p className="line-clamp-3 text-sm text-gray-600">
                    {artist.bio}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
            >
              «
            </Link>
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded bg-amber-400 font-medium text-black"
            >
              1
            </Link>
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
            >
              2
            </Link>
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
            >
              3
            </Link>
            <span className="px-1">...</span>
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
            >
              →
            </Link>
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
            >
              »
            </Link>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
