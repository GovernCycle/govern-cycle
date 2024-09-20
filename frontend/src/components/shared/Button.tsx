import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useState } from 'react'


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
        "relative shadow-btn-primary text-[#FFFFFF] bg-[#FA7416] after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-[#6B793E] after:opacity-0 after:transition-all after:duration-200 hover:after:opacity-100 after:shadow-btn-primary-hover after:rounded-lg",
      secondary:
        "relative shadow-btn-secondary bg-[#FEFDF7]/[.01] text-[#6B793E] duration-200 ease-in-out hover:bg-[#FA7416]/[0.03] hover:text-[#FFFFFF] after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:opacity-0 after:transition-all after:duration-200 hover:after:opacity-100 after:shadow-btn-secondary-hover after:rounded-lg",
      tertiary: 'text-[#FA7416] hover:text-[#FFFFFF]',
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