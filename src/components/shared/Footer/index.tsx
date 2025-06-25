import Image from "next/image"
import logo from "@/assets/logos/logo.png"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-32 overflow-hidden rounded-t-[40px]">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="mb-4">
                <Image
                  src={logo}
                  alt="logo"
                  height={500}
                  width={500}
                  className="h-[45px] w-auto object-contain"
                />
              </Link>
              <p className="text-center text-sm md:text-left">
                We are a creative platform dedicated to showcasing original
                artwork from talented artists around the world. From hand-drawn
                sketches and digital illustrations to paintings.
              </p>
            </div>
          </div>

          {/* Support Column */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-medium">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Modhubag, Moghbazar, Dhaka</li>
              <li>
                <a
                  href="mailto:exclusive@gmail.com"
                  className="hover:underline"
                >
                  exclusive@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8801588889999" className="hover:underline">
                  +88015-8888-9999
                </a>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-medium">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/artists" className="hover:underline">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Link Column */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-medium">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-primary-foreground border-t">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm">
            © 2025 Unleak&apos;d.com All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
