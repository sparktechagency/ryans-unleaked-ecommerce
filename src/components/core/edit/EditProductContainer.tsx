import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import EditProductForm from "./EditProductForm"

export default function EditProductContainer() {
  return (
    <div>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="A new chapter of creativity begins!"
        breadcrumbItems={[
          {
            key: "top-banner-breadcrumb-home",
            label: "Home",
            href: "/"
          },
          {
            key: "top-banner-breadcrumb-upload-art",
            label: "Upload Art"
          }
        ]}
        className="mt-2 !h-[40dvh] rounded-[30px] [&_img]:rounded-[30px]"
      />

      <div className="mt-[45px] md:mt-[60px] xl:mt-[80px]">
        <EditProductForm />
      </div>
    </div>
  )
}
