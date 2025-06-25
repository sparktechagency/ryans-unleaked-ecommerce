import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import ForgotPasswordForm from "./ForgotPasswordForm"

const ForgotPasswordContainer = () => {
  return (
    <main>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Forgot Password"
        className="!h-[40dvh]"
      />
      <ForgotPasswordForm />
    </main>
  )
}

export default ForgotPasswordContainer
