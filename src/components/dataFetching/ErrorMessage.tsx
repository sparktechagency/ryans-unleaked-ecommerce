import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message?: string
  onRetry: () => void
  className?: string
}

export default function ErrorMessage({
  message = "Oops! Something went wrong. Please try again.",
  onRetry,
  className = "!bg-transparent"
}: ErrorMessageProps) {
  return (
    <div
      className={`!bg-background flex min-w-full flex-col items-center justify-center rounded-lg p-6 ${className}`}
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Error Icon */}
      <AlertCircle className="text-destructive mb-4 h-12 w-12" />

      {/* Error Message */}
      <p className="text-muted-foreground mb-4 text-center">{message}</p>

      {/* Retry Button */}
      <Button
        onClick={onRetry}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
      >
        Retry
      </Button>
    </div>
  )
}
