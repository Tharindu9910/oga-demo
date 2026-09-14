import {
  PortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from '@portabletext/react'

import SanityImage from '@/components/ui/SanityImage'
import { cn } from '@/lib/cn'

const components: PortableTextComponents = {
  types: {
    imageWithAlt: ({ value }) => (
      <SanityImage
        image={value}
        width={800}
        height={600}
        className="my-6 w-full rounded-2xl object-cover"
      />
    ),
  },
}

export default function PortableTextBody({
  value,
  className,
}: {
  value: PortableTextProps['value'] | null | undefined
  className?: string
}) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null

  return (
    <div
      className={cn(
        'font-poppins [&_a]:text-brand-700 flex flex-col gap-4 text-base leading-relaxed text-stone-600 [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-5',
        className,
      )}
    >
      <PortableText value={value} components={components} />
    </div>
  )
}
