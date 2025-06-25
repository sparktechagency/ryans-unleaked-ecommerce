/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useForgotPasswordMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import Cookies from "js-cookie"

// Zod schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address")
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "lihofic260@ihnpo.com"
    }
  })

  // Submit handler
  const router = useRouter()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const onSuccess = (res: any) => {
    const token = res?.data?.token
    Cookies.set("forgotPassToken", token)
    router.push(`/auth/verify-otp?redirect=/auth/reset-password`)
  }
  const onSubmit = (data: ForgotPasswordData) => {
    handleMutation(data, forgotPassword, "Sending OTP...", onSuccess)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-3 mt-6 max-w-[600px] space-y-6 rounded-lg border bg-white p-5 shadow-md sm:mx-auto sm:mt-12 sm:p-8"
    >
      <h2 className="text-xl font-semibold text-gray-700">Forgot Password</h2>

      {/* Email Field */}
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
          {...register("email")}
          className="w-full bg-gray-50"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        disabled={isLoading}
        type="submit"
        className="h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
      >
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </Button>
    </form>
  )
}
