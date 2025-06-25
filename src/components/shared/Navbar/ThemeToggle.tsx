"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Monitor, Palette, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by rendering only after mount
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    setTheme("light")
  }, [setTheme])
  if (!mounted) return null

  // Map themes to icons and labels
  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
    { value: "sepia", label: "Sepia", icon: Palette },
    { value: "neon", label: "Neon", icon: Sparkles }
  ]

  // Determine the current theme's icon
  const CurrentIcon =
    themeOptions.find((opt) => opt.value === theme)?.icon || Palette

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground"
          aria-label="Toggle theme"
        >
          <CurrentIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-card text-card-foreground border-border rounded-[var(--radius-md)] border"
        align="end"
      >
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex cursor-pointer items-center gap-2",
              theme === option.value
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-muted-foreground"
            )}
          >
            <option.icon className="h-4 w-4" />
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
