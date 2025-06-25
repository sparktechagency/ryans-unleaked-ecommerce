/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { useGetMyOrdersQuery } from "@/redux/apis/orderApi"
import { TOrder } from "@/interface/order.interface"
import ErrorMessage from "@/components/dataFetching/ErrorMessage"
import OrderHistorySkeleton from "@/components/dataFetching/skeletons/OrderHistorySkeleton"
import { Button } from "@/components/ui/button"
import OrderDetailsModal from "../order-history/OrderDetailsModal"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { format } from "date-fns"

export default function OrderHistory({
  limit,
  pagination = false
}: {
  limit: number
  pagination?: boolean
}) {
  const user = useAppSelector(selectUser)
  const [showModal, setShowModal] = useState(false)
  const [order, setOrder] = useState<TOrder | null>(null)
  const [page, setPage] = useState(1)

  const params = {
    page,
    limit
  }

  const { data, isLoading, isError, error, refetch } =
    useGetMyOrdersQuery(params)

  const orders = data?.data?.data || []
  const meta = data?.data?.meta

  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1

  if (isLoading) {
    return (
      <div className="space-y-7 rounded-lg border border-gray-200 bg-white p-6">
        {[...Array(limit)].map((_, idx) => (
          <OrderHistorySkeleton key={idx} />
        ))}
      </div>
    )
  }

  const handleShowModal = (order: TOrder) => {
    setShowModal(true)
    setOrder(order)
  }

  if (isError) {
    return (
      <div className="space-y-7 rounded-lg border border-gray-200 bg-white p-6">
        <ErrorMessage
          message={(error as any)?.data?.message || "Something went wrong"}
          onRetry={refetch}
          className="py-32"
        />
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <h4 className="p-4 text-xl font-medium">
        {user?.role === "buyer" ? "Order History" : "Selling History"}
      </h4>
      <table className="w-full">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="rounded-tl-lg p-4 font-medium">#</th>
            <th className="p-4 font-medium">Transaction ID</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Price</th>
            <th className="rounded-tr-lg p-4 font-medium">Action</th>
          </tr>
        </thead>
        {orders.length > 0 ? (
          <tbody className="divide-y divide-gray-200">
            {orders.map((order: TOrder, index: number) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-4">{(page - 1) * limit + index + 1}</td>
                <td className="p-4">{order.tranId || "N/A"}</td>
                <td className="p-4">
                  {format(new Date(order.createdAt), "MMMM d, yyyy")}
                </td>
                <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleShowModal(order)}
                    className="bg-primary rounded-md p-[6px] text-white"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="text-muted-foreground p-4 py-32 text-center"
              >
                No orders found
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {/* ✅ Hide if only 1 page */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-6">
          <Button
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="text-muted-foreground text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}

      {/* show modal */}
      <OrderDetailsModal
        open={showModal}
        setOpen={setShowModal}
        order={order}
      />
    </div>
  )
}
