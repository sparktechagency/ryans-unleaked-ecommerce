"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import EditProfile from "./EditProfile"
import { useChangePasswordMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })

type PasswordFormType = z.infer<typeof passwordSchema>

export default function UserSettings() {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema)
  })

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const onSubmit = (data: PasswordFormType) => {
    handleMutation(data, changePassword, "Changing password...")
  }

  return (
    <div className="mx-auto rounded-lg bg-white p-6 shadow-sm">
      <EditProfile />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label htmlFor="old-password" className="mb-2 block font-medium">
            Old Password
          </label>
          <div className="relative">
            <input
              id="old-password"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your old password"
              className="focus:ring-primary w-full rounded border border-gray-200 bg-gray-50 p-3 focus:ring-2 focus:outline-none"
              {...register("oldPassword")}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="new-password" className="mb-2 block font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="focus:ring-primary w-full rounded border border-gray-200 bg-gray-50 p-3 focus:ring-2 focus:outline-none"
                {...register("newPassword")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block font-medium"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="focus:ring-primary w-full rounded border border-gray-200 bg-gray-50 p-3 focus:ring-2 focus:outline-none"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 mt-4 w-full rounded px-4 py-3 font-medium text-black transition"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}
