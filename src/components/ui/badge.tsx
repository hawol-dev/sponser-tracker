import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-cyan-500 text-white shadow-sm shadow-cyan-500/25",
        secondary:
          "border-cyan-500/20 bg-cyan-500/15 text-cyan-300",
        destructive:
          "border-transparent bg-red-500/15 text-red-400 border-red-500/20",
        outline:
          "border-white/10 text-foreground bg-white/[0.03]",
        success:
          "border-transparent bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
        warning:
          "border-transparent bg-amber-500/15 text-amber-400 border-amber-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
