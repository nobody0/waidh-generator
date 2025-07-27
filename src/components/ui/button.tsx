import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New WAIDH variants
        steel: "bg-gradient-to-b from-steel-600 to-steel-800 shadow-steel text-steel-100 hover:from-steel-500 hover:to-steel-700 active:shadow-engraved",
        arbeiter: "bg-aspect-arbeiter hover:bg-aspect-arbeiter/80 text-white shadow-md",
        krieger: "bg-aspect-krieger hover:bg-aspect-krieger/80 text-white shadow-md",
        taenzer: "bg-aspect-taenzer hover:bg-aspect-taenzer/80 text-white shadow-md",
        heiler: "bg-aspect-heiler hover:bg-aspect-heiler/80 text-white shadow-md",
        denker: "bg-aspect-denker hover:bg-aspect-denker/80 text-white shadow-md",
        danger: "bg-rust-500 hover:bg-rust-600 text-white shadow-md",
        mana: "bg-gradient-to-r from-mana-200 to-mana-300 text-steel-900 hover:from-mana-100 hover:to-mana-200 shadow-sm"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }