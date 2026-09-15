import { cn } from '@/lib/cn'

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-md bg-stone-200/80', className)}
    />
  )
}
