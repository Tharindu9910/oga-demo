import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

const sectionBg = ['bg-[#14271f]', 'bg-brand-600', 'bg-[#14271f]'] as const

export default function Loading() {
  return (
    <>
      <section className="bg-[#14271f] px-6 pt-32 pb-12 text-center sm:pt-42 lg:px-16">
        <Container className="max-w-3xl">
          <Skeleton className="mx-auto h-12 w-72 max-w-full bg-white/10" />
        </Container>
      </section>

      {sectionBg.map((bg, i) => (
        <section
          key={i}
          className={`${bg} border-b border-white/10 px-6 py-14 lg:px-16`}
        >
          <Container className="max-w-6xl">
            <Skeleton className="h-11 w-56 bg-white/15" />
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, j) => (
                <Skeleton
                  key={j}
                  className="aspect-[4/3] w-full rounded-2xl bg-white/10"
                />
              ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  )
}
