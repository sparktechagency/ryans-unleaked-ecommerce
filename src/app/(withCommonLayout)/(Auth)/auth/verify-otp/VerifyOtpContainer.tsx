import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import VerifyOtpForm from "./VerifyOtpForm"

const VerifyOtpContainer = () => {
  return (
    <main>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Verify your Account"
        className="!h-[40dvh]"
      />
      <VerifyOtpForm />
    </main>
  )
}

export default VerifyOtpContainer
