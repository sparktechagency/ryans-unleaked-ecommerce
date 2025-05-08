"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

export default function UploadForm() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0] || null
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ title, category, price, description, image })
  }

  return (
    <form
      onSubmit={handleSubmit}
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
          value={title}
          placeholder="Creative and detail-oriented Drawing Artist with a passion for visual storytelling through hand-drawn and digital illustrations."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-50"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categories
          </label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Painting"
            className="w-full bg-gray-50"
            required
          />
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-gray-50"
            required
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="$120"
          />
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[200px] w-full bg-gray-50"
          placeholder="We are a creative platform dedicated to showcasing original artwork from talented artists around the world. From hand-drawn sketches and digital illustrations to paintings, animations, and mixed media, our goal is to connect art lovers with meaningful visual experiences.\n\nWhether you're here to discover new artists, purchase one-of-a-kind pieces, or share your own creations, our space is built to celebrate creativity in all its forms. We believe in the power of art to inspire, communicate, and bring people together."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Image Upload
        </label>
        <div
          className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center"
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="relative mx-auto h-auto w-[350px]">
              <Image
                src={previewUrl || "/placeholder.svg"}
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
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                  }
                }}
                className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
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
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="h-12 w-full bg-amber-400 font-medium text-black hover:bg-amber-500"
      >
        Upload Now
      </Button>
    </form>
  )
}
