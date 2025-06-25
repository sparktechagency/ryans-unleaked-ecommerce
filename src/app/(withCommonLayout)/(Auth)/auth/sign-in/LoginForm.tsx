/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useSignInMutation } from "@/redux/apis/authApi"
import { useRouter, useSearchParams } from "next/navigation"
import handleMutation from "@/utils/handleMutation"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/slices/authSlice"

// Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "dayey52687@calorpg.com",
      password: "1122323"
      // email: "lihofic260@ihnpo.com",
      // password: "lihofic"
    }
  })

  // handle login and setting tokens
  const [login, { isLoading }] = useSignInMutation()
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get("redirect")
  const dispatch = useAppDispatch()
  const onSuccess = (res: any) => {
    const accessToken = res?.data?.accessToken
    const refreshToken = res?.data?.refreshToken
    const userData = res?.data?.user
    const user = {
      email: userData?.email,
      role: userData?.role,
      userId: userData?._id
    }
    if (res.success) {
      dispatch(
        setUser({
          user,
          accessToken,
          refreshToken
        })
      )
      router.push(redirect || "/")
    }
  }
  const onSubmit = (data: LoginData) => {
    handleMutation(data, login, "Signing in...", onSuccess)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full space-y-6 rounded-lg bg-white sm:border sm:p-8 sm:shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-700">Sign In</h2>

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
          className="w-full bg-gray-50"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field with Toggle */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full bg-gray-50 pr-10"
            {...register("password")}
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

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <Link
          href="/auth/forgot-password"
          className="text-sm text-amber-500 hover:underline"
        >
          Forget password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        disabled={isLoading}
        type="submit"
        className="mt-4 h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      {/* Sign Up Link */}
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/sign-up" className="text-amber-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Divider */}
      {/* <div className="flex items-center justify-center space-x-4">
        <hr className="w-full border-t border-gray-300" />
        <span className="w-[230px] text-center text-sm text-gray-400">
          Or, Log in with
        </span>
        <hr className="w-full border-t border-gray-300" />
      </div> */}

      {/* Social Buttons */}
      {/* <div className="flex justify-center space-x-4">
        <button type="button" className="flex items-center space-x-2">
          <Image src={googleImg} width={30} height={30} alt="Google" />
        </button>
        <button type="button" className="flex items-center space-x-2">
          <Image src={appleImg} width={30} height={30} alt="Apple" />
        </button>
      </div> */}
    </form>
  )
}
