/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { Expand } from "lucide-react"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import { useParams } from "next/navigation"
import {
  useDeleteProductMutation,
  useGetSingleProductQuery
} from "@/redux/apis/productApi"
import SingleProductSkeleton from "@/components/dataFetching/skeletons/SingleProductSkeleton"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addToCart } from "@/redux/slices/cartSlice"
import { selectUser } from "@/redux/slices/authSlice"
import ConfirmDeleteDialog from "@/components/custom/ConfirmDeleteDialog/ConfirmDeleteDialog"
import Link from "next/link"
import handleMutation from "@/utils/handleMutation"

export default function SingleAdvertPage() {
  const params = useParams()
  const user = useAppSelector(selectUser)
  const { data, isFetching, isError, error, refetch } =
    useGetSingleProductQuery(params?.id, { skip: !params?.id })

  const product = data?.data

  const dispatch = useAppDispatch()
  const handleAddToCart = () => {
    if (!product) return

    const cartItem = {
      author: {
        _id: product.author._id,
        name: product.author.name
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
            key: "top-banner-breadcrumb-advert",
            label: `${product?.title?.slice(0, 15)}...` || "Advert"
          }
        ]}
        className="mt-2 !h-[40dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <ResponsiveContainer className="py-12">
        {isFetching ? (
          <SingleProductSkeleton />
        ) : isError ? (
          <ErrorMessage
            message={(error as any)?.data?.message}
            onRetry={refetch}
            className="lg:py-44"
          />
        ) : (
          <div className="mt-[45px] grid grid-cols-1 items-start gap-12 md:mt-[60px] lg:grid-cols-2 xl:mt-[80px]">
            {/* Image Column */}
            <div className="group relative">
              <div className="cursor-pointer overflow-hidden rounded-2xl bg-black/5">
                <PhotoProvider>
                  <PhotoView src={product?.image}>
                    <div>
                      <Image
                        src={product?.image}
                        alt="Colorful portrait artwork"
                        width={600}
                        height={600}
                        className="h-auto w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Full screen preview button */}
                      <button className="absolute right-4 bottom-4 bg-gray-200 p-2 text-gray-800 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <Expand />
                      </button>
                    </div>
                  </PhotoView>
                </PhotoProvider>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col space-y-8">
              <div className="space-y-6">
                <div>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary mb-3 rounded-2xl border-none px-4 py-1 text-sm shadow-none"
                  >
                    {product?.category?.name}
                  </Badge>
                  <h1 className="text-2xl leading-tight font-bold text-gray-900 md:text-3xl">
                    {product?.title}
                  </h1>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-primary text-3xl font-bold">
                      ${product?.price}
                    </div>
                    {/* <div className="text-sm text-gray-500 line-through">
                      $150
                    </div>
                    <div className="ml-2 rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      20% OFF
                    </div> */}
                  </div>

                  {/* <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    In stock
                  </div> */}
                </div>
              </div>

              <p className="leading-relaxed text-gray-600">
                {product?.description}
              </p>
              {user?.role !== "seller" ? (
                <div className="flex items-center justify-between gap-6">
                  <Button
                    variant="outline-primary"
                    className="flex-1"
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>

                  <Button variant="default" className="flex-1" size="lg">
                    Buy Now
                  </Button>
                </div>
              ) : (
                user?.userId === product?.author?._id && (
                  <div className="items-centerenter mt-8 flex justify-between gap-6">
                    <ConfirmDeleteDialog
                      onConfirm={() => handleDelete(product?._id)}
                    >
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
          </div>
        )}
      </ResponsiveContainer>
    </div>
  )
}
