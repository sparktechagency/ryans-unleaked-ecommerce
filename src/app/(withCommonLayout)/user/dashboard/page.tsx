/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image"
import { useGetUserProfileQuery } from "@/redux/apis/userApi"
import { defaultAvatar } from "@/constants/global.constant"
import ProfileSkeleton from "@/components/dataFetching/skeletons/ProfileSkeleton"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import OrderHistory from "./OrderHistory"

export default function UserDashboard() {
  const { data, isFetching, isError, error, refetch } =
    useGetUserProfileQuery("")
  const userProfile = data?.data

  return (
    <div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Profile Section */}
        {isFetching ? (
          <ProfileSkeleton />
        ) : isError ? (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 py-8 shadow-md">
            <ErrorMessage
              message={(error as any)?.data?.message}
              onRetry={refetch}
            />
          </div>
        ) : (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative overflow-hidden rounded-full">
                  <Image
                    src={userProfile?.profile || defaultAvatar}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="aspect-square rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-4">
                <div className="rounded border border-gray-200 bg-gray-50 p-3">
                  <h2 className="text-lg font-medium">
                    {userProfile?.name || "N/A"}
                  </h2>
                </div>

                <div className="rounded border border-gray-200 bg-gray-50 p-3">
                  <p>{userProfile?.email || "N/A"}</p>
                </div>

                <div className="flex-1 rounded border border-gray-200 bg-gray-50 p-3">
                  <p>{userProfile?.address || "N/A"}</p>
                </div>

                {userProfile?.descriptions && (
                  <div>
                    <h3 className="mb-2 font-medium">Descriptions</h3>
                    <p className="text-sm text-gray-700">
                      <p>{userProfile?.descriptions || "N/A"}</p>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* History Section */}
        <OrderHistory limit={5} />
      </div>
    </div>
  )
}
