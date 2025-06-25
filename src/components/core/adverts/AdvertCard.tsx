"use client"
import ConfirmDeleteDialog from "@/components/custom/ConfirmDeleteDialog/ConfirmDeleteDialog"
import CustomAvatar from "@/components/custom/CustomAvatar"
import { Button } from "@/components/ui/button"
import { TProduct } from "@/interface/product.interface"
import { cn } from "@/lib/utils"
import { useDeleteProductMutation } from "@/redux/apis/productApi"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { addToCart } from "@/redux/slices/cartSlice"
import handleMutation from "@/utils/handleMutation"
import Image from "next/image"
import Link from "next/link"

interface AdvertCardProps {
  cardImgClassName?: string
  titleClassName?: string
  product: TProduct
}

export default function AdvertCard({
  cardImgClassName,
  titleClassName,
  product
}: AdvertCardProps) {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const handleAddToCart = () => {
    const cartItem = {
      author: {
        _id: product?.author?._id || "",
        name: product?.author?.name || ""
      },
      items: [
        {
          _id: product._id,
          title: product.title,
          price: product.price,
          image: product.image
        }
      ]
    }

    dispatch(addToCart(cartItem))
  }

  // handle delete item
  const [deleteItem, { isLoading }] = useDeleteProductMutation()

  const handleDelete = (id: string) => {
    handleMutation(id, deleteItem, "Deleting...")
  }
  return (
    <div className="rounded-[20px] border p-6 shadow-md">
      <Link href={`/advert/${product?._id}`}>
        <div className="flex items-center gap-4">
          <CustomAvatar
            name={product?.author?.name}
            img={product?.author?.profile}
            size={50}
          />
          <div className="text-primary-foreground space-y-0.5">
            <h3 className="text-xl font-medium capitalize">
              {product?.author?.name}
            </h3>
            <p className="font-nunito-sans">{product?.author?.designation}</p>
          </div>
        </div>

        <h5
          className={cn(
            "text-primary-foreground mt-4 mb-6 text-lg font-medium xl:text-xl",
            titleClassName
          )}
        >
          {product?.title}
        </h5>

        <div className="relative overflow-hidden rounded-[16px]">
          <Image
            src={product?.image}
            alt={product?.title}
            className={cn(
              "h-[500px] w-full rounded-[16px] object-cover object-center transition-all duration-300 hover:scale-105",
              cardImgClassName
            )}
            height={800}
            width={800}
          />

          <div className="bg-primary text-primary-foreground absolute top-0 right-0 flex h-[60px] w-[120px] items-center justify-center rounded-tr-xl rounded-bl-full text-2xl font-bold">
            <span>${product?.price}</span>
          </div>
        </div>
      </Link>

      {user?.role !== "seller" ? (
        <div className="mt-8 flex items-center justify-between gap-6">
          <Button
            variant="outline-primary"
            className="flex-1"
            size="lg"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <Button variant="default" className="flex-1" size="lg">
            <Link href="/checkout">Buy Now</Link>
          </Button>
        </div>
      ) : (
        user?.userId === product?.author?._id && (
          <div className="mt-8 flex items-center justify-between gap-6">
            <ConfirmDeleteDialog onConfirm={() => handleDelete(product?._id)}>
              <Button
                disabled={isLoading}
                variant="outline-destructive"
                className="text-destructive flex-1 hover:text-white"
                size="lg"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </ConfirmDeleteDialog>

            <div className="flex-1">
              <Link href={`/edit/${product?._id}`}>
                <Button variant="default" className="w-full" size="lg">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  )
}
