"use client"

import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
  style?: React.CSSProperties
}

export default function ResponsiveContainer({
  children,
  className,
  id,
  style
}: ResponsiveContainerProps) {
  return (
    <section
      className={cn(
        `3xl:w-[85%] mx-auto w-full max-w-[1920px] px-5 md:px-10 lg:w-[90%] lg:px-0`,
        className
      )}
      id={id}
      style={style}
    >
      {children}
    </section>
  )
}
