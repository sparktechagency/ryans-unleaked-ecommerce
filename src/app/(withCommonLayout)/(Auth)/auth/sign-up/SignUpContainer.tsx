/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import SignUpForm from "./SignUpForm"
import { useGetAuthBannersQuery } from "@/redux/apis/authApi"

const SignUpContainer = () => {
  const { data } = useGetAuthBannersQuery("")
  const banners = data?.data?.data

  const sign_up_left_top = banners?.find(
    (banner: any) => banner?.category === "sign_up_left_top"
  )
  const sign_up_right_top = banners?.find(
    (banner: any) => banner?.category === "sign_up_right_top"
  )
  const sign_up_left_bottom = banners?.find(
    (banner: any) => banner?.category === "sign_up_left_bottom"
  )
  const sign_up_right_bottom = banners?.find(
    (banner: any) => banner?.category === "sign_up_right_bottom"
  )

  return (
    <main>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Welcome Unleak'd ! Create An Account"
        className="!h-[40dvh]"
      />
      <div className="mt-6 grid grid-cols-4 gap-5 sm:mt-10 lg:px-10 xl:gap-10">
        <div className="col-span-1 hidden space-y-4 rounded-xl lg:block">
          <div
            className="block h-[358px] w-full rounded-xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${sign_up_left_top?.image})`
            }}
          ></div>
          <div
            className="block h-[358px] w-full rounded-xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${sign_up_left_bottom?.image})`
            }}
          ></div>
        </div>
        <div className="col-span-4 mx-4 sm:mx-10 lg:col-span-2 lg:mx-0">
          <SignUpForm />
        </div>
        <div className="col-span-1 hidden space-y-4 rounded-xl lg:block">
          <div
            className="block h-[358px] w-full rounded-xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${sign_up_right_top?.image})`
            }}
          ></div>
          <div
            className="block h-[358px] w-full rounded-xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${sign_up_right_bottom?.image})`
            }}
          ></div>
        </div>
      </div>
    </main>
  )
}

export default SignUpContainer
