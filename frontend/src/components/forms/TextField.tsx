import { Label } from './Label'

interface CommonProps {
  label?: string
  link?: { href: string; text: string }
  elementType?: 'input' | 'textarea'
  rows?: number
  name: string
}

type InputProps = CommonProps & React.InputHTMLAttributes<HTMLInputElement>
type TextareaProps = CommonProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

const inputClasses =
  'common-input'

export function TextField({
  label,
  name,
  link,
  elementType = 'input',
  rows = 5,
  className,
  ...attrs
}: InputProps | TextareaProps) {
  return (
    <div className={className}>
      {label && (
        <Label name={name} link={link}>
          {label}
        </Label>
      )}
      <div className='group relative mt-2 flex w-full rounded-md bg-zinc-950/[.01] shadow-inner-blurcommon-input'>
        {elementType === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            className={inputClasses}
            {...(attrs as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={name}
            name={name}
            className={inputClasses}
            {...(attrs as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    </div>
  )
}
