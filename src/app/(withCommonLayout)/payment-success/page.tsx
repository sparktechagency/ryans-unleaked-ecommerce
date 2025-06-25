"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearCart } from "@/redux/slices/cartSlice"
import { useGetPaymentQuery } from "@/redux/apis/orderApi"
import loadingImg from "@/assets/images/spinner.svg"
import Image from "next/image"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const params = useSearchParams()
  const dispatch = useDispatch()
  const paymentId = params.get("payment")

  // get payment data
  const { data, isLoading } = useGetPaymentQuery(paymentId)
  const payment = data?.data

  useEffect(() => {
    if (!paymentId) return router.push("/")
    if (!isLoading) {
      if (payment?.status === "paid") {
        dispatch(clearCart())
      } else {
        router.push("/payment-failed")
      }
    }
  }, [payment, dispatch, router, isLoading, paymentId])

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
        <Image
          src={loadingImg}
          alt="loading"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
    )
  }
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Your transaction was completed successfully. A confirmation email has
          been sent.
        </p>
        <Button onClick={() => router.push("/user/order-history")}>
          View Orders
        </Button>
      </div>
    </div>
  )
}
