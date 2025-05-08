import { cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

interface BreadcrumbItem {
  key?: string
  label: string
  href?: string
}

interface TopBannerProps {
  backgroundImage: StaticImageData
  heading: string
  subHeading?: string
  className?: string
  breadcrumbItems?: BreadcrumbItem[]
}

export default function CommonTopBanner({
  backgroundImage,
  heading,
  subHeading,
  breadcrumbItems,
  className
}: TopBannerProps) {
  return (
    <div className="px-10">
      <div
        className={cn(
          "relative flex h-[90dvh] w-full items-center justify-center rounded-[50px]",
          className
        )}
      >
        <Image
          src={backgroundImage}
          alt={heading}
          height={1200}
          width={1200}
          className="absolute inset-0 -z-10 h-full w-full rounded-[50px] object-cover object-center"
          placeholder="blur"
          priority
        />

        <div className="w-full space-y-3 text-center lg:w-3/4 xl:w-[50%]">
          <h3 className="text-2xl font-bold text-white md:text-3xl xl:text-5xl xl:leading-relaxed">
            {heading}
          </h3>

          {subHeading && (
            <p className="font-normal text-white/90 xl:text-xl">{subHeading}</p>
          )}

          {breadcrumbItems && breadcrumbItems?.length > 0 && (
            <div className="mx-auto w-max">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbItems
                    ?.slice(0, breadcrumbItems?.length - 1)
                    ?.map((item) => (
                      <BreadcrumbItem
                        key={item.key}
                        className="text-primary text-lg"
                      >
                        <BreadcrumbLink
                          href={item.href}
                          className="hover:text-primary/90"
                        >
                          {item.label}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    ))}
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-lg text-white/80">
                      {breadcrumbItems[breadcrumbItems?.length - 1]?.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
