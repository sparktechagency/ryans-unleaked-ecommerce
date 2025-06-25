/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetCategoriesQuery } from "@/redux/apis/categoryApi"
import { useAddProductMutation } from "@/redux/apis/productApi"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import handleMutation from "@/utils/handleMutation"

const productSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(1, "Category is required"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price")
    .min(1, "Price is required"),
  description: z.string().min(5, "Description is required")
})

type ProductFormType = z.infer<typeof productSchema>

export default function UploadForm() {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery("")
  const categories = categoriesData?.data?.data || []

  const [addProduct, { isLoading: isUploading }] = useAddProductMutation()
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema)
  })

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onDragOver = (e: React.DragEvent) => e.preventDefault()

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0] || null
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onUploadClick = () => fileInputRef.current?.click()

  const onSubmit = async (data: ProductFormType) => {
    if (!image) {
      toast.error("Please upload an image")
      return
    }

    const formData = new FormData()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.price = Number(data.price)
    formData.append("data", JSON.stringify(data))
    formData.append("image", image)

    handleMutation(formData, addProduct, "Uploading product...", () => {
      reset()
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-full space-y-6 px-10 md:max-w-3/4 lg:px-0 xl:max-w-1/2"
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Arts Title
        </label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Creative and detail-oriented Drawing Artist..."
          className="w-full bg-gray-50"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categories
          </label>
          {categoriesLoading ? (
            <p>Loading categories...</p>
          ) : (
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full bg-gray-50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Arts Price
          </label>
          <Input
            id="price"
            {...register("price")}
            className="w-full bg-gray-50"
            inputMode="numeric"
            placeholder="$120"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descriptions
        </label>
        <Textarea
          id="description"
          {...register("description")}
          className="min-h-[200px] w-full bg-gray-50"
          placeholder="Write about your art..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Image Upload
        </label>
        <div
          className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center"
          onClick={onUploadClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {previewUrl ? (
            <div className="relative mx-auto h-auto w-[350px]">
              <Image
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-full object-cover"
                height={350}
                width={350}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setImage(null)
                  setPreviewUrl(null)
                  if (fileInputRef.current) fileInputRef.current.value = ""
                }}
                className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="rounded-full bg-gray-100 p-3">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Upload Image
              </span>
              <span className="text-xs text-gray-500">or drag and drop</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Upload Now"}
      </Button>
    </form>
  )
}
