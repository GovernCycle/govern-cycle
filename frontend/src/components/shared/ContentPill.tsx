import type { ComponentType, SVGProps } from 'react'
import { cn } from '@/lib/utils'

type ContentPillProps = {
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
  text: string
  className?: string
  innerClassName?: string
  iconClassName?: string
  textClassName?: string
}

export function ContentPill({
  Icon,
  text,
  className,
  innerClassName,
  iconClassName,
  textClassName,
}: ContentPillProps) {
  return (
    <div
      className={cn(
        'inline-flex w-max rounded-full bg-[var(--color-background-ternary)]',
        className
      )}
    >
      <div
        className={cn(
          'flex h-full w-full items-center space-x-2 rounded-full px-4 py-1.5',
          innerClassName
        )}
      >
        {Icon && (
          <Icon className={cn('h-4 w-4 text-text-accent', iconClassName)} />
        )}

        <span
          className={cn(
            'text-sm font-medium text-text-accent drop-shadow-[-12px_-4px_6px_var(--color-background-ternary-i)]',
            textClassName
          )}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
