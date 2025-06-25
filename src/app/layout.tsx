import type { Metadata } from "next"
import { Nunito_Sans, Poppins } from "next/font/google"
import "./globals.css"
import "react-photo-view/dist/react-photo-view.css"
import { Toaster } from "sonner"
import TopLoader from "@/components/custom/TopLoader"
import Providers from "@/components/providers/Providers"
import CustomThemeProviders from "@/components/providers/CustomThemeProviders"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap"
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    default: "Unleak'd",
    template: "%s | Unleak'd"
  },
  description:
    "Unleak'd is a digital marketplace for creative designers and artists to showcase their work and connect with potential clients. Feel the beauty, Discover the story, Support the artist. Browse our collection to find the masterpiece that you desire or join us today to start selling."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${nunitoSans.variable} antialiased`}
      >
        <CustomThemeProviders>
          <Providers>{children}</Providers>

          <Toaster richColors duration={4500} />
          <TopLoader />
        </CustomThemeProviders>
      </body>
    </html>
  )
}
