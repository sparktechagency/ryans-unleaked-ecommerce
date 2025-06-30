/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import LoginForm from "./LoginForm"
import { useGetAuthBannersQuery } from "@/redux/apis/authApi"
import { Skeleton } from "@/components/ui/skeleton"

const LoginContainer = () => {
  const { data, isLoading } = useGetAuthBannersQuery("")
  const banners = data?.data?.data
  const sign_in_left = banners?.find(
    (banner: any) => banner?.category === "sign_in_left"
  )
  const sign_in_right = banners?.find(
    (banner: any) => banner?.category === "sign_in_right"
  )
  return (
    <main>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Welcome Back! Sign In to Continue"
        className="!h-[40dvh]"
      />
      <div className="mt-5 grid grid-cols-4 gap-4 sm:mt-10 lg:px-10 xl:gap-10">
        {isLoading ? (
          <div className="col-span-1 hidden rounded-xl lg:block">
            <Skeleton className="h-[570px] w-full rounded-xl" />
          </div>
        ) : (
          <div className="col-span-1 hidden rounded-xl lg:block">
            <div
              className="block h-[570px] w-full rounded-xl bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${sign_in_left?.image})`
              }}
            ></div>
          </div>
        )}

        <div className="col-span-4 mx-4 sm:mx-10 lg:col-span-2 lg:mx-0">
          <LoginForm />
        </div>
        {isLoading ? (
          <div className="col-span-1 hidden rounded-xl lg:block">
            <Skeleton className="h-[570px] w-full rounded-xl" />
          </div>
        ) : (
          <div className="col-span-1 hidden rounded-xl lg:block">
            <div
              className="block h-[570px] w-full rounded-xl bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${sign_in_right?.image})`
              }}
            ></div>
          </div>
        )}
      </div>
    </main>
  )
}

export default LoginContainer
