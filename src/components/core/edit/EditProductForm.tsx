/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetCategoriesQuery } from "@/redux/apis/categoryApi"
import { useParams } from "next/navigation"
import {
  useGetSingleProductQuery,
  useUpdateProductMutation
} from "@/redux/apis/productApi"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import handleMutation from "@/utils/handleMutation"
import spinnerImg from "@/assets/images/spinner.svg"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import { toast } from "sonner"

const productSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(1, "Category is required"),
  price: z
    .string()
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, "Invalid price")
    .min(1, "Price is required"),
  description: z.string().min(5, "Description is required")
})

type ProductFormType = z.infer<typeof productSchema>

export default function EditProductForm() {
  const params = useParams()
  const {
    data: singleProductData,
    isLoading: loadingProduct,
    isError,
    error,
    refetch
  } = useGetSingleProductQuery(params?.id)
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const product = singleProductData?.data

  const [selectedCategory, setSelectedCategory] = useState(
    product?.category?._id
  )
  console.log("selectedCategory, ", selectedCategory)
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery("")
  const categories = categoriesData?.data?.data || []
  console.log("categories, ", categories)

  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      category: "",
      price: "",
      description: ""
    }
  })

  useEffect(() => {
    if (product && categories.length > 0) {
      const categoryId = product.category?._id || ""
      setValue("title", product.title)
      setValue("category", categoryId)
      setValue("price", String(product.price))
      setValue("description", product.description)
      setPreviewUrl(product.image)
      setSelectedCategory(categoryId)
    }
  }, [product, categories, setValue])

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
    const formData = new FormData()
    // Convert price to number
    data.price = Number(data.price).toFixed(2)
    formData.append("data", JSON.stringify(data))
    if (image) formData.append("image", image)

    handleMutation(
      { id: product?._id, payload: formData },
      updateProduct,
      "Updating product...",
      () => {
        toast.success("Product updated successfully")
        reset({
          title: product.title,
          category: product.category?._id || "",
          price: String(product.price),
          description: product.description
        })
        setImage(null)
        setPreviewUrl(product.image)
      }
    )
  }

  if (loadingProduct || categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Image src={spinnerImg} alt="Loading..." width={150} height={150} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-24">
        <ErrorMessage
          message={(error as any)?.data?.message || "Something went wrong"}
          onRetry={refetch}
        />
      </div>
    )
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

      {selectedCategory && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    field.onChange(value)
                  }}
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
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>
      )}

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
        className="text h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Update Product"}
      </Button>
    </form>
  )
}
