"use client"
import { Info } from "lucide-react"
import Image from "next/image"
import artistImg from "@/assets/images/artists/Rectangle 42522.png"
import advertImg from "@/assets/images/advert/Frame 2147226437.png"

export default function UserDashboard() {
  const userRole = sessionStorage.getItem("userRole")

  return (
    <div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Profile Section */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-full">
                <Image
                  src={artistImg}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="aspect-square rounded-full object-cover"
                />
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4">
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <h2 className="text-lg font-medium">Muskan Tanaz</h2>
              </div>

              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <p>muskantanaz@gmail.com</p>
              </div>

              <div className="flex-1 rounded border border-gray-200 bg-gray-50 p-3">
                <p>Dhaka, Bangladesh</p>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Descriptions</h3>
                <p className="text-sm text-gray-700">
                  We are a creative platform dedicated to showcasing original
                  artwork from talented artists around the world. From
                  hand-drawn sketches and digital illustrations to paintings,
                  animations, and mixed media, our goal is to connect art lovers
                  with meaningful visual experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        {userRole === "buyer" ? (
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-medium">Order History</h2>
              <a href="#" className="text-primary hover:underline">
                View All
              </a>
            </div>

            {/* Order Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Arts</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="p-4">#738</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="relative mr-3 h-10 w-10">
                            <Image
                              src={advertImg}
                              alt="Artwork thumbnail"
                              width={40}
                              height={40}
                              className="aspect-square rounded-full object-cover"
                            />
                          </div>
                          <span>Andrea Michaelsson</span>
                        </div>
                      </td>
                      <td className="p-4">28 Sep 2025</td>
                      <td className="p-4">$120</td>
                      <td className="p-4">
                        <button className="text-gray-500 hover:text-gray-700">
                          <Info size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-medium">Selling History</h2>
              <a href="#" className="text-primary hover:underline">
                View All
              </a>
            </div>

            {/* Order Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="p-4 font-medium">Selling ID</th>
                    <th className="p-4 font-medium">Arts</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="p-4">#738</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="relative mr-3 h-10 w-10">
                            <Image
                              src={advertImg}
                              alt="Artwork thumbnail"
                              width={40}
                              height={40}
                              className="aspect-square rounded-full object-cover"
                            />
                          </div>
                          <span>Andrea Michaelsson</span>
                        </div>
                      </td>
                      <td className="p-4">28 Sep 2025</td>
                      <td className="p-4">$120</td>
                      <td className="p-4">
                        <button className="text-gray-500 hover:text-gray-700">
                          <Info size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
