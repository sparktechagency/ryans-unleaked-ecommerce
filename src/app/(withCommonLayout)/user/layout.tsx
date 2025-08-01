import UserDashboardSidebar from "@/components/core/user-dashboard/UserDashboardSidebar"
import ResponsiveContainer from "@/components/custom/ResponsiveContainer/ResponsiveContainer"
import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"

import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Profile Details"
        breadcrumbItems={[
          {
            key: "top-banner-breadcrumb-home",
            label: "Home",
            href: "/"
          },
          {
            key: "top-banner-breadcrumb-profile-details",
            label: "Profile Details"
          }
        ]}
        className="m-2 !h-[40dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <ResponsiveContainer className="mt-10 flex flex-col items-start gap-10 lg:flex-row">
        <UserDashboardSidebar />
        <div className="flex-1 w-full">{children}</div>
      </ResponsiveContainer>
    </div>
  )
}
