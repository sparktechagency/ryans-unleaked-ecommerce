"use client"

import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import CheckoutSuccessModal from "./CheckoutSuccessModal"

export default function CheckoutContainer() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("paypal")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, paymentMethod })
  }

  return (
    <ResponsiveContainer>
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
            key: "top-banner-breadcrumb-cart",
            label: "Cart"
          }
        ]}
        className="h-[45dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <div className="mx-auto mt-[45px] md:mt-[60px] xl:mt-[80px] xl:max-w-[85%]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Payment Information Section */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="payment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Payment method
                </label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full bg-gray-50">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                // type="submit"
                variant="default"
                className="h-11 w-full"
                onClick={() => setShowSuccessModal(true)}
              >
                Payment Now
              </Button>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Arts Price</span>
                <span className="font-medium">$120</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium">$15</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">00.00</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold">$105</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Success Modal */}
      <CheckoutSuccessModal
        open={showSuccessModal}
        setOpen={setShowSuccessModal}
      />
    </ResponsiveContainer>
  )
}
