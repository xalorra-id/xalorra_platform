import { clsx } from 'clsx'

export function Container({
  className,
  children,
  id, // 👈 ditambahkan di sini
}: {
  className?: string
  children: React.ReactNode
  id?: string // 👈 ditambahkan di sini
}) {
  return (
    <div className={clsx(className, 'px-6 lg:px-8')} id={id}>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">{children}</div>
    </div>
  )
}
