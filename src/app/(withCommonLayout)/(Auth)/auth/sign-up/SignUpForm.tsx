/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useSignUpMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    role: z.enum(["buyer", "seller"], {
      errorMap: () => ({ message: "Please select a role" })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

type SignUpData = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema)
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [signUp, { isLoading }] = useSignUpMutation()

  const onSubmit = (data: SignUpData) => {
    const payload = {
      name: data.fullName,
      email: data.email,
      password: data.password
    } as any
    if (data.role === "seller") payload["role"] = "seller"
    handleMutation(payload, signUp, "Signing up...", (res: any) => {
      const token = res?.data?.otpToken?.token
      Cookies.set("forgotPassToken", token)
      router.push(`/auth/verify-otp?redirect=/auth/sign-in`)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full space-y-6 rounded-lg bg-white sm:border sm:p-8 sm:shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-700">Sign Up</h2>

      {/* Role (ShadCN Select) */}
      <div className="roleSelect w-full space-y-1">
        <label htmlFor="role" className="text-sm font-medium text-gray-700">
          Select Role
        </label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.role && (
          <p className="text-sm text-red-500">{errors.role.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div className="space-y-1">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Your full Name
        </label>
        <Input
          id="fullName"
          {...register("fullName")}
          placeholder="Enter your Name"
          className="mt-2"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="mt-2"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter your password"
            className="mt-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm password"
            className="mt-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        disabled={isLoading}
        type="submit"
        className="mt-4 h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>

      {/* Sign In Link */}
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-amber-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  )
}
