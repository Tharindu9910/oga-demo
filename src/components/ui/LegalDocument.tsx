import Enter from '@/components/motion/Enter'
import RevealStagger from '@/components/motion/RevealStagger'
import Container from '@/components/ui/Container'
import { siteConfig } from '@/config/site'

type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'contact' }

export type LegalSection = {
  heading: string
  blocks: LegalBlock[]
}

function LegalBlockContent({ block }: { block: LegalBlock }) {
  if (block.type === 'ul') {
    return (
      <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-stone-400">
        {block.items.map((item) => (
          <li key={item} className="font-plus-jakarta-sans text-stone-600">
            {item}
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'contact') {
    return (
      <p className="font-plus-jakarta-sans mt-3 text-stone-600">
        {siteConfig.fullName} ({siteConfig.name})
        <br />
        Email:{' '}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-brand-700 underline underline-offset-2"
        >
          {siteConfig.contact.email}
        </a>
      </p>
    )
  }

  return (
    <p className="font-plus-jakarta-sans mt-3 text-stone-600 first:mt-0">
      {block.text}
    </p>
  )
}

export default function LegalDocument({
  title,
  lastUpdated,
  sections,
}: {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}) {
  return (
    <section className="bg-cream pt-32 pb-24 sm:pt-42">
      <Container className="max-w-3xl">
        <Enter
          as="h1"
          className="font-poppins text-brand-900 text-center text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {title}
        </Enter>
        <Enter
          delay={0.07}
          className="font-plus-jakarta-sans mt-4 text-center text-sm text-stone-500"
        >
          Last updated: {lastUpdated}
        </Enter>

        <RevealStagger className="mt-12 flex flex-col gap-6">
          {sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
            >
              <h2 className="font-poppins text-xl font-bold text-stone-950">
                {section.heading}
              </h2>
              {section.blocks.map((block, i) => (
                <LegalBlockContent
                  key={block.type === 'ul' ? block.items.join('|') : i}
                  block={block}
                />
              ))}
            </div>
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}
