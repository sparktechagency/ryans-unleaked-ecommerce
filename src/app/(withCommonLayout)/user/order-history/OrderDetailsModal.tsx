"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TOrder } from "@/interface/order.interface"
import Image from "next/image"
import { format } from "date-fns" // ✅ date-fns import

interface OrderDetailsModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  order: TOrder | null
}

export default function OrderDetailsModal({
  open,
  setOpen,
  order
}: OrderDetailsModalProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Transaction ID:{" "}
            <span className="font-medium">{order.tranId || "N/A"}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Paid:</strong> {order.isPaid ? "✅ Yes" : "❌ No"}
          </p>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold">Items</h3>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li
                key={item._id}
                className="flex items-center gap-3 border-b pb-2"
              >
                <Image
                  src={item.product?.image || "/placeholder.jpg"}
                  alt="product"
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">
                    {item.product?.title || "Untitled"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
