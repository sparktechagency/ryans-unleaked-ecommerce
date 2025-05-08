"use client"

import { transformNameInitials } from "@/utils/transformNameInitials"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import userAvatar from "@/assets/images/user/placeholder-user.png"
import { StaticImageData } from "next/image"

interface CustomAvatarProps {
  img?: string | StaticImageData
  alt?: string
  name?: string
  className?: string
  size?: number
  bannerColor?: string
}

export default function CustomAvatar({
  img,
  alt,
  name,
  className,
  size = 20,
  bannerColor
}: CustomAvatarProps) {
  return (
    <Avatar
      className={cn("", className)}
      style={{
        height: size,
        width: size
      }}
    >
      <AvatarImage
        src={typeof img === "string" ? img : img?.src || userAvatar?.src}
        alt={alt || `Photo of ${name}`}
        className={cn("aspect-square rounded-full object-cover object-center")}
      />
      <AvatarFallback
        className={cn("font-bold")}
        style={{
          backgroundColor: bannerColor,
          color: bannerColor ? "white" : "var(--primary)"
        }}
      >
        {transformNameInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
