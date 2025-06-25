/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useResetPasswordMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")

const schema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match"
  })

type FormData = z.infer<typeof schema>

export default function NewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const router = useRouter()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const onSuccess = () => {
    router.push("/auth/sign-in")
    Cookies.remove("otpToken")
  }
  const onSubmit = (data: FormData) => {
    const token = Cookies.get("otpToken")
    console.log("token", token)
    handleMutation(
      { payload: data, token },
      resetPassword,
      "Resetting password...",
      onSuccess
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-3 mt-6 max-w-[600px] space-y-6 rounded-lg border bg-white p-5 shadow-md sm:mx-auto sm:mt-12 sm:p-8"
    >
      <h2 className="text-xl font-semibold text-gray-700">Set New Password</h2>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            {...register("newPassword")}
            className="w-full bg-gray-50 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-type password"
            {...register("confirmPassword")}
            className="w-full bg-gray-50 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        disabled={isLoading}
        type="submit"
        className="h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  )
}
