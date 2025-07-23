/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useConnectStripeMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import { useRouter } from "next/navigation"

const ConnectStripeModal = ({
  showAlert,
  setShowAlert,
  title
}: {
  showAlert: boolean
  setShowAlert: any
  title?: string
}) => {
  const router = useRouter()
  const [connectStripe, { isLoading: isLoadingStripe }] =
    useConnectStripeMutation()

  const handleConnectStripe = () => {
    handleMutation({}, connectStripe, "Connecting...", (res: any) => {
      setShowAlert(false)
      router.push(res.data)
    })
  }
  return (
    <Dialog
      open={showAlert}
      onOpenChange={(open) => {
        setShowAlert(open)
        if (!open) {
          console.log("Modal closed")
          router.push("/")
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || "Set up Stripe to get paid 💸"}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-700">
          You haven't connected a Stripe account yet. Let's get that done so you
          can start receiving payments.
        </p>
        <Button
          disabled={isLoadingStripe}
          onClick={handleConnectStripe}
          className="mt-4 w-full bg-amber-400 text-black hover:bg-amber-500"
        >
          {isLoadingStripe ? "Connecting..." : "Connect Stripe"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ConnectStripeModal
