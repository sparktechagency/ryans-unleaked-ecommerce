/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import { Button } from "@/components/ui/button"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import CheckoutSuccessModal from "./CheckoutSuccessModal"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import {
  useCreateOrderMutation,
  useInitiatePaymentMutation
} from "@/redux/apis/orderApi"
import handleMutation from "@/utils/handleMutation"

export default function CheckoutContainer() {
  const router = useRouter()
  const [author, setAuthor] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const author = params.get("author")
      setAuthor(author)
    }
  }, [])

  const carts = useSelector((state: RootState) => state.cart.items)

  // Find selected author’s cart
  const selectedAuthorCart = carts.find((item) => item.author?._id === author)
  const items = selectedAuthorCart?.items || []

  // Redirect if no matching author cart or empty items
  useEffect(() => {
    if (!items.length) router.push("/")
  }, [items, router])

  const artsPrice = items.reduce((sum, item) => sum + (item.price || 0), 0)
  const shipping = 0
  const tax = 0
  const total = artsPrice + shipping + tax

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [initiatePayment, { isLoading: isPaymentLoading }] =
    useInitiatePaymentMutation()
  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const onPaymentInitiated = (res: any) => {
    window.location.href = res?.data
  }

  const onOrderSuccess = (res: any) => {
    const payload = { order: res?.data?._id }
    handleMutation(
      payload,
      initiatePayment,
      "Initiating payment...",
      onPaymentInitiated
    )
  }

  const handleCreateOrder = () => {
    const payload = {
      author,
      totalPrice: total,
      items: items.map((item) => ({
        product: item._id,
        quantity: 1,
        price: item.price
      }))
    }

    handleMutation(payload, createOrder, "Creating order...", onOrderSuccess)
  }

  return (
    <>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Imagine more, Express freely, Buy boldly."
        breadcrumbItems={[
          { key: "home", label: "Home", href: "/" },
          { key: "cart", label: "Cart" }
        ]}
        className="mt-2 !h-[40dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />
      <ResponsiveContainer>
        <div className="mx-auto mt-[45px] md:mt-[60px] xl:mt-[80px] xl:max-w-[85%]">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Arts Price</span>
                <span className="font-medium">${artsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <Button
                variant="default"
                className="mt-2 h-11 w-full"
                onClick={handleCreateOrder}
                disabled={isLoading || isPaymentLoading}
              >
                {isLoading || isPaymentLoading
                  ? "Creating order..."
                  : "Checkout"}
              </Button>
            </div>
          </div>
        </div>
        <CheckoutSuccessModal
          open={showSuccessModal}
          setOpen={setShowSuccessModal}
        />
      </ResponsiveContainer>
    </>
  )
}
