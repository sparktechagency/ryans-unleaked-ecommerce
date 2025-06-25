/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import { Camera } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation
} from "@/redux/apis/userApi"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ProfileSkeleton from "@/components/dataFetching/skeletons/ProfileSkeleton"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import { useEffect, useState } from "react"
import handleMutation from "@/utils/handleMutation"

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().optional(),
  descriptions: z.string().optional(),
  experience: z.string().optional()
})

type ProfileFormType = z.infer<typeof profileSchema>

const EditProfile = () => {
  const { data, isFetching, isError, error, refetch } =
    useGetUserProfileQuery("")
  const userProfile = data?.data

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema)
  })

  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name || "",
        email: userProfile.email || "",
        address: userProfile.address || "",
        descriptions: userProfile.descriptions || "",
        experience: userProfile.experience ?? ""
      })
      setPreviewImage(userProfile.profile || "")
    }
  }, [userProfile, reset])

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const onSubmit: SubmitHandler<ProfileFormType> = (data) => {
    const payload = new FormData()
    payload.append("data", JSON.stringify(data))
    if (selectedImage) {
      payload.append("profile", selectedImage)
    }

    handleMutation(payload, updateProfile, "Updating profile...")
  }

  if (isFetching) return <ProfileSkeleton />
  if (isError) {
    return (
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 py-8 shadow-md">
        <ErrorMessage
          message={(error as any)?.data?.message}
          onRetry={refetch}
        />
      </div>
    )
  }

  const isSeller = userProfile?.role === "seller"

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 flex flex-col gap-6 md:flex-row"
    >
      {/* Profile Image */}
      <div className="relative mx-auto h-40 w-40 md:mx-0">
        <div className="h-full w-full overflow-hidden rounded-full border border-gray-200">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Profile"
              width={160}
              height={160}
              className="aspect-square h-full w-full object-cover"
            />
          )}
        </div>

        <label className="absolute right-2 bottom-2 cursor-pointer rounded-full border border-gray-200 bg-white p-1.5">
          <Camera size={18} className="text-gray-700" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Editable Profile Info */}
      <div className="flex-1 space-y-4">
        <div>
          <Input
            {...register("name")}
            placeholder="Full Name"
            className="border-gray-200 bg-gray-50"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            disabled
            type="email"
            {...register("email")}
            placeholder="Email"
            className="border-gray-200 bg-gray-50"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("address")}
            placeholder="Address"
            className="border-gray-200 bg-gray-50"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {isSeller && (
          <>
            <div>
              <Textarea
                {...register("descriptions")}
                placeholder="Short descriptions about you"
                className="border-gray-200 bg-gray-50"
              />
              {errors.descriptions && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.descriptions.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="number"
                min="0"
                {...register("experience")}
                placeholder="Years of experience"
                className="border-gray-200 bg-gray-50"
              />
              {errors.experience && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </>
        )}

        <Button
          disabled={isLoading}
          type="submit"
          className="h-12 w-full font-medium"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  )
}

export default EditProfile
