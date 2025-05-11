"use client"

import { Camera, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import artistImg from "@/assets/images/artists/Rectangle 42522.png"

export default function UserSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="mx-auto rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-6 md:flex-row">
        {/* Profile Image */}
        <div className="relative mx-auto h-40 w-40 md:mx-0">
          <div className="h-full w-full overflow-hidden rounded-full border border-gray-200">
            <Image
              src={artistImg}
              alt="Profile"
              width={160}
              height={160}
              className="aspect-square h-full w-full object-cover"
            />
          </div>
          <div className="absolute right-2 bottom-2 rounded-full border border-gray-200 bg-white p-1.5">
            <Camera size={18} className="text-gray-700" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <div className="rounded border border-gray-200 bg-gray-50 p-3">
            <p>Muskan Tanaz</p>
          </div>

          <div className="rounded border border-gray-200 bg-gray-50 p-3">
            <p>muskantanaz@gmail.com</p>
          </div>

          <div className="flex-1 rounded border border-gray-200 bg-gray-50 p-3">
            <p>Bangladesh</p>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Descriptions</h3>
            <div className="rounded border border-gray-200 bg-gray-50 p-3">
              <p className="text-sm text-gray-700">
                We are a creative platform dedicated to showcasing original
                artwork from talented artists around the world. From hand-drawn
                sketches and digital illustrations to paintings, animations, and
                mixed media, our goal is to connect art lovers with meaningful
                visual experiences.
              </p>
            </div>
          </div>

          <button className="bg-primary hover:bg-primary/90 w-full rounded px-4 py-3 font-medium text-black transition">
            Upload
          </button>
        </div>
      </div>

      {/* Password Section */}
      <div className="mt-8 space-y-4">
        <div>
          <label htmlFor="current-password" className="mb-2 block font-medium">
            Current Password
          </label>
          <div className="relative">
            <input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="focus:ring-primary w-full rounded border border-gray-200 bg-gray-50 p-3 focus:ring-2 focus:outline-none"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
                placeholder="Enter New password"
                className="focus:ring-primary w-full rounded border border-gray-200 bg-gray-50 p-3 focus:ring-2 focus:outline-none"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button className="bg-primary hover:bg-primary/90 mt-4 w-full rounded px-4 py-3 font-medium text-black transition">
          Save
        </button>
      </div>
    </div>
  )
}
