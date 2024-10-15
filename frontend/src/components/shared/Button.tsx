import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'primary' | 'secondary' | 'tertiary'
    size?: 'sm' | 'md' | 'lg'
    innerClassName?: string
  }

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'lg',
      innerClassName,
      className,
      children,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const buttonSize = {
      sm: 'px-3.5 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-3.5 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-[15px]',
    }[size]

    const buttonVariant = {
      primary:
        "relative text-text-accent bg-[var(--color-button-primary)] after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-[var(--color-button-primary-i)]  after:transition-all after:duration-200  after:var(--color-button-primary-i) after:rounded-lg",
      secondary:
      "relative bg-[var(--color-button-primary)] text-text-accent duration-200 ease-in-out hover:bg-[var(--color-button-secondary)] hover:var(--color-text-secondary) after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-transparent after:transition-all after:duration-200 after:rounded-lg", // Cambio after:bg a 'transparent'
      tertiary: 'text-text-secondary hover:text-text-tertiary',
    }[variant]


    return (
      <>
        {props.href ? (
          <Link
            href={props.href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={cn(
              'group inline-flex items-center rounded-lg font-semibold antialiased outline-none',
              buttonVariant,
              buttonSize,
              className
            )}
            {...props}
          >
            <div
              className={cn(
                'relative z-10 flex w-full items-center justify-center space-x-2 text-nowrap',
                innerClassName
              )}
            >
              {children}
            </div>
          </Link>
        ) : (
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            className={cn(
              'inline-block rounded-lg font-semibold transition duration-200 ease-in-out',
              buttonVariant,
              buttonSize,
              className
            )}
            {...props}
          >
            <div
              className={cn(
                'relative z-10 flex w-full items-center justify-center space-x-2 text-nowrap',
                innerClassName
              )}
            >
              {children}
            </div>
          </button>
        )}
      </>
    )
  }
)

Button.displayName = 'Button'
