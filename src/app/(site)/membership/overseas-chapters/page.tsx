import Image from 'next/image'

import Container from '@/components/ui/Container'
import { getChapters } from '@/content/queries'

const sectionBg = ['bg-[#14271f]', 'bg-brand-600', 'bg-[#14271f]'] as const

export default async function OverseasChaptersPage() {
  const chapters = await getChapters()

  return (
    <>
      <section className="bg-[#14271f] px-6 pt-32 pb-12 text-center sm:pt-42 lg:px-16">
        <Container className="max-w-3xl">
          <h1 className="font-poppins text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Overseas Chapters
          </h1>
          {/* <p className="font-plus-jakarta-sans mt-4 text-emerald-100/80">
            IIOGA members carry the alma mater&apos;s spirit with them
            wherever they go — here&apos;s a look at our chapters around the
            world.
          </p> */}
        </Container>
      </section>

      {chapters.length === 0 ? (
        <section className="bg-brand-950 px-6 py-16 text-center">
          <p className="font-plus-jakarta-sans text-sm text-emerald-100/70">
            No overseas chapters listed yet — check back soon.
          </p>
        </section>
      ) : (
        chapters.map((chapter, i) => (
          <section
            key={chapter._id}
            className={`${sectionBg[i % sectionBg.length]} border-b border-white/10 px-6 py-14 lg:px-16`}
          >
            <Container className="max-w-6xl">
              <h2 className="font-poppins text-4xl font-extrabold tracking-[0.05em] text-white uppercase sm:text-5xl">
                {chapter.country}
              </h2>
              {/* <p className="font-plus-jakarta-sans mt-3 max-w-2xl text-sm text-emerald-50/80">
                {chapter.description}
              </p> */}

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {chapter.images.map((image) => (
                  <div
                    key={image.src}
                    className="aspect-[4/3] overflow-hidden rounded-2xl border-[3px] border-white shadow-[0_4px_14px_0_rgba(0,0,0,0.25)]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={300}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ))
      )}
    </>
  )
}
