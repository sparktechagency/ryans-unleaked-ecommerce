import NextTopLoader from "nextjs-toploader"

export default function TopLoader() {
  return (
    <NextTopLoader
      color="var(--primary)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px var(--primary),0 0 5px lightGray"
      zIndex={1600}
      showAtBottom={false}
    />
  )
}
