/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useVerifyOtpMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"

const otpSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers")
})

type OtpFormData = z.infer<typeof otpSchema>

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const [timeLeft, setTimeLeft] = useState(180)
  const [canResend, setCanResend] = useState(false)

  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema)
  })

  const router = useRouter()

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return
    const updatedOtp = [...otp]
    updatedOtp[index] = element.value
    setOtp(updatedOtp)

    if (element.value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`)
      prev?.focus()
    }
  }

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()
  const params = useSearchParams()
  const token = Cookies.get("forgotPassToken")
  const redirect = params.get("redirect")
  const redirectUrl = redirect || "/auth/reset-password"
  const onSuccess = (res: any) => {
    if (res.success) {
      Cookies.set("otpToken", res?.data?.token)
      Cookies.remove("forgotPassToken")
      router.push(redirectUrl)
    }
  }
  const onSubmit = (data: OtpFormData) => {
    handleMutation(
      { payload: data, token },
      verifyOtp,
      "Verifying OTP...",
      onSuccess
    )
  }

  const onFormSubmit = () => {
    const otpValue = otp.join("")
    setValue("otp", otpValue)
    handleSubmit(onSubmit)()
  }

  const handleResend = () => {
    console.log("OTP resent")
    setOtp(new Array(6).fill(""))
    setTimeLeft(60)
    setCanResend(false)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onFormSubmit()
      }}
      className="mx-3 mt-6 max-w-[600px] space-y-6 rounded-lg border bg-white p-5 shadow-md sm:mx-auto sm:mt-12 sm:p-8"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          OTP Verification
        </h2>
        <p className="text-muted-foreground mt-3">
          An OTP has been sent to your email. Please enter it below to verify
          your account.
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        {otp.map((data, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="h-12 w-12 rounded border border-gray-300 bg-gray-50 text-center focus:ring-2 focus:ring-amber-400 focus:outline-none"
            autoFocus={index === 0}
            disabled={canResend}
          />
        ))}
      </div>

      {errors.otp && (
        <p className="text-center text-sm text-red-500">{errors.otp.message}</p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-700">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-amber-500 hover:underline"
          >
            Resend OTP
          </button>
        ) : (
          <span>
            OTP expires in {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")} min
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
        disabled={isLoading || canResend}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  )
}
