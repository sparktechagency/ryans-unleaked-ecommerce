import Image from "next/image"
import advertImg from "@/assets/images/advert/Frame 2147226437.png"
import { Info } from "lucide-react"

export default function OrderHistory() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="rounded-tl-lg p-4 font-medium">Order ID</th>
            <th className="p-4 font-medium">Arts</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Price</th>
            <th className="rounded-tr-lg p-4 font-medium">Action</th>
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
  )
}
