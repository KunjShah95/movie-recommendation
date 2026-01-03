import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground',
        secondary:
          'border-transparent bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground',
        outline: 'text-foreground border-border hover:bg-accent hover:text-accent-foreground',
        selected:
          'border-primary bg-primary text-primary-foreground shadow-lg dramatic-glow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
