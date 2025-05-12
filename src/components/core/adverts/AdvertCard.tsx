import CustomAvatar from "@/components/custom/CustomAvatar"
import { Button } from "@/components/ui/button"
import { ADVERT } from "@/constants/advert.constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

interface AdvertCardProps {
  cardImgClassName?: string
  titleClassName?: string
}

export default function AdvertCard({
  cardImgClassName,
  titleClassName
}: AdvertCardProps) {
  const advert = ADVERT

  return (
    <div className="rounded-[20px] border p-6 shadow-md">
      <Link href={`/advert/1`}>
        <div className="flex items-center gap-4">
          <CustomAvatar
            name={advert?.author?.name}
            img={advert?.author?.avatar}
            size={50}
          />
          <div className="text-primary-foreground space-y-0.5">
            <h3 className="text-xl font-medium">{advert?.author?.name}</h3>
            <p className="font-nunito-sans">{advert?.author?.profession}</p>
          </div>
        </div>

        <h5
          className={cn(
            "text-primary-foreground mt-4 mb-6 text-lg font-medium xl:text-xl",
            titleClassName
          )}
        >
          {advert?.title}
        </h5>

        <div className="relative overflow-hidden rounded-[16px]">
          <Image
            src={advert?.image}
            alt={advert?.title}
            className={cn(
              "h-[500px] w-full rounded-[16px] object-cover object-center transition-all duration-300 hover:scale-105",
              cardImgClassName
            )}
            height={800}
            width={800}
          />

          <div className="bg-primary text-primary-foreground absolute top-0 right-0 flex h-[60px] w-[120px] items-center justify-center rounded-tr-xl rounded-bl-full text-2xl font-bold">
            <span>${advert?.price}</span>
          </div>
        </div>
      </Link>

      <div className="mt-8 flex items-center justify-between gap-6">
        <Button
          variant="outline-primary"
          className="flex-1"
          size="lg"
          onClick={() => toast.success("Added to cart")}
        >
          Add to cart
        </Button>
        <Button variant="default" className="flex-1" size="lg">
          <Link href="/checkout">Buy Now</Link>
        </Button>
      </div>
    </div>
  )
}
