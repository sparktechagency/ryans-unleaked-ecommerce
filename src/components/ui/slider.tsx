/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

interface SliderProps extends SliderPrimitive.SliderProps {
  showTooltip?: boolean
  tooltipContent?: (value: number) => React.ReactNode
  thumbClassName?: string
  trackClassName?: string
  rangeClassName?: string
  ref?: React.Ref<HTMLInputElement>
}

const Slider = ({
  className,
  showTooltip = false,
  tooltipContent,
  thumbClassName,
  trackClassName,
  rangeClassName,
  ref,
  ...props
}: SliderProps) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(
    props.defaultValue ?? props.value ?? [0]
  )

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value)
    }
  }, [props.value])

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue)
    props.onValueChange?.(newValue)
  }

  const handlePointerDown = () => {
    if (showTooltip) {
      setShowTooltipState(true)
    }
  }

  const handlePointerUp = React.useCallback(() => {
    if (showTooltip) {
      setShowTooltipState(false)
    }
  }, [showTooltip])

  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener("pointerup", handlePointerUp)
      return () => {
        document.removeEventListener("pointerup", handlePointerUp)
      }
    }
  }, [showTooltip, handlePointerUp])

  const renderThumb = (value: number, id: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        className={cn(
          "focus-visible:outline-ring/40 block h-5 w-5 cursor-grab rounded-full border-2 border-gray-900 bg-white transition-colors focus-visible:outline-[3px] data-[disabled]:cursor-not-allowed dark:border-gray-50 dark:bg-gray-950",
          thumbClassName
        )}
        onPointerDown={handlePointerDown}
      />
    )

    if (!showTooltip) return thumb

    return (
      <TooltipProvider>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger asChild>{thumb}</TooltipTrigger>
          <TooltipContent
            className="px-2 py-1 text-xs"
            sideOffset={8}
            side={props.orientation === "vertical" ? "right" : "top"}
          >
            <p>{tooltipContent ? tooltipContent(value) : value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-gray-200 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 dark:bg-gray-800",
          trackClassName
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute bg-gray-900 data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full dark:bg-gray-50",
            rangeClassName
          )}
        />
      </SliderPrimitive.Track>

      {internalValue?.map((value, index) => {
        // const uniqueKey = `${Math.ceil(Math.random() * 9999999)}-${index}`; // Ensures unique key
        return (
          <React.Fragment key={index}>
            {renderThumb(value, index)}
          </React.Fragment>
        )
      })}
    </SliderPrimitive.Root>
  )
}
// Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
