import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import React from "react"

interface ModalWrapperProps {
  children: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  className?: string
}

export default function ModalWrapper({
  children,
  open,
  setOpen,
  title = "",
  className
}: ModalWrapperProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className={cn(
          `scrollbar-thin max-h-[85vh] max-w-full overflow-auto 2xl:max-w-[35%]`,
          className
        )}
      >
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-primary-black">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="absolute top-1 right-1 h-8 w-8 rounded-full border-none p-0 shadow-none">
            <X size={22} className="text-primary-black/75" />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
