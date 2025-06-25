import CommonTopBanner from "@/components/shared/CommonTopBanner"
import topBannerImg from "@/assets/images/home/hero-bg.png"
import NewPasswordForm from "./NewPasswordForm"

const NewPasswordContainer = () => {
  return (
    <main>
      <CommonTopBanner
        backgroundImage={topBannerImg}
        heading="Verify your Account"
        className="!h-[40dvh]"
      />
      <NewPasswordForm />
    </main>
  )
}

export default NewPasswordContainer
