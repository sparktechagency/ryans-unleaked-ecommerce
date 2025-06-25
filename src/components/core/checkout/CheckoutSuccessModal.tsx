"use client"

import ModalWrapper from "@/components/custom/ModalWrapper"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import React from "react"

interface CheckoutSuccessModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CheckoutSuccessModal({
  open,
  setOpen
}: CheckoutSuccessModalProps) {
  const router = useRouter()

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-3 text-white">
          <Check className="h-8 w-8" />
        </div>

        {/* Success message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600">
            Your payment has been successfully completed.
          </p>
        </div>

        {/* Additional information */}
        <p className="text-sm text-gray-600">
          You can now download your file using the button below. We&apos;ve also
          sent a download link to your email feel free to access it from there
          anytime.
        </p>

        {/* Action buttons */}
        <Button
          onClick={() => {
            router.push("/")
            setOpen(false)
          }}
          size="lg"
          className="shadow-none"
        >
          Back to Home
        </Button>
      </div>
    </ModalWrapper>
  )
}
