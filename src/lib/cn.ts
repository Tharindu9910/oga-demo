import { twMerge } from 'tailwind-merge'

export function cn(...classes: Array<string | undefined | false>) {
  return twMerge(classes.filter(Boolean).join(' '))
}
