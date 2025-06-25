"use client"

import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PaymentFailedPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800">Payment Failed</h1>
        <p className="text-gray-600">
          Something went wrong with your payment. Please try again or contact
          support.
        </p>
        <Button onClick={() => router.push("/checkout")}>Try Again</Button>
      </div>
    </div>
  )
}
