import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-8 sm:pt-42">
        <Container className="max-w-3xl">
          <Skeleton className="mx-auto h-9 w-72 max-w-full" />
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="bg-cream pb-16">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-6 rounded-2xl border border-emerald-950/10 bg-white p-7"
              >
                <Skeleton className="size-20 shrink-0 rounded-xl" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Past Events */}
      <section className="bg-cream py-14">
        <Container className="max-w-5xl">
          <Skeleton className="mx-auto h-9 w-56" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="flex gap-5 p-6">
                  <div className="flex flex-col items-center gap-2 border-r border-stone-100 pr-5">
                    <Skeleton className="h-8 w-8" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* I want to volunteer */}
      <section className="bg-brand-950 py-20">
        <Container className="max-w-2xl">
          <Skeleton className="mx-auto h-9 w-56 bg-white/10" />
          <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-10">
            <Skeleton className="h-6 w-64 max-w-full" />
            <Skeleton className="h-12 w-70 max-w-full rounded-full" />
            <Skeleton className="h-4 w-56" />
          </div>
        </Container>
      </section>
    </>
  )
}
