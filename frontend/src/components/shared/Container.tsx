import { cn } from '@/lib/utils'
type ContainerProps = React.HTMLAttributes<HTMLDivElement>

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto max-w-screen-xl px-5 sm:px-4 lg:px-4 ', className)}
    >
      {children}
    </div>
  )
}