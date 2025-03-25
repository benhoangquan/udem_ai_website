import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Card container styles
const cardVariants = cva(
  "rounded-lg shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        outline: "border border-gray-200 dark:border-gray-700 bg-transparent",
        filled: "bg-gray-100 dark:bg-gray-800 border-0",
        ghost: "border-0 bg-transparent shadow-none",
      },
      size: {
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// Card title styles
const cardTitleVariants = cva(
  "font-semibold leading-tight",
  {
    variants: {
      size: {
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
      },
      colorScheme: {
        default: "text-gray-900 dark:text-gray-50",
        muted: "text-gray-700 dark:text-gray-300",
        primary: "text-blue-700 dark:text-blue-300",
      }
    },
    defaultVariants: {
      size: "md",
      colorScheme: "default",
    },
  }
)

// Card description styles
const cardDescriptionVariants = cva(
  "leading-normal",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      colorScheme: {
        default: "text-gray-600 dark:text-gray-400",
        muted: "text-gray-500 dark:text-gray-500",
        primary: "text-blue-600 dark:text-blue-400",
      }
    },
    defaultVariants: {
      size: "md",
      colorScheme: "default",
    },
  }
)

// Card bar/divider styles
const cardBarVariants = cva(
  "h-1 rounded-full",
  {
    variants: {
      colorScheme: {
        default: "bg-gray-200 dark:bg-gray-700",
        primary: "bg-blue-500 dark:bg-blue-600",
        secondary: "bg-gray-400 dark:bg-gray-600",
        accent: "bg-indigo-500 dark:bg-indigo-600",
        success: "bg-green-500 dark:bg-green-600",
        warning: "bg-yellow-500 dark:bg-yellow-600",
        danger: "bg-red-500 dark:bg-red-600",
      },
      size: {
        sm: "w-12",
        md: "w-16",
        lg: "w-20",
        full: "w-full",
      }
    },
    defaultVariants: {
      colorScheme: "default",
      size: "md",
    },
  }
)

// Card container props
interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

// Card content props (just a div that can hold content inside the card)
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-2", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

// Card header props
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

// Card footer props
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

// Card title props
interface CardTitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> {
  size?: VariantProps<typeof cardTitleVariants>['size'];
  colorScheme?: VariantProps<typeof cardTitleVariants>['colorScheme'];
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, colorScheme, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleVariants({ size, colorScheme }), className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

// Card description props
interface CardDescriptionProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'> {
  size?: VariantProps<typeof cardDescriptionVariants>['size'];
  colorScheme?: VariantProps<typeof cardDescriptionVariants>['colorScheme'];
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, colorScheme, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants({ size, colorScheme }), className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

// Card bar props
interface CardBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  size?: VariantProps<typeof cardBarVariants>['size'];
  colorScheme?: VariantProps<typeof cardBarVariants>['colorScheme'];
}

const CardBar = React.forwardRef<HTMLDivElement, CardBarProps>(
  ({ className, colorScheme, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardBarVariants({ colorScheme, size }), className)}
      {...props}
    />
  )
)
CardBar.displayName = "CardBar"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBar,
  // Export the variants for customization
  cardVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardBarVariants
} 