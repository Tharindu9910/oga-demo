import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      <section className="bg-cream pt-32 pb-16 sm:pt-42">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Skeleton className="h-12 w-64 max-w-full" />
              <Skeleton className="mt-6 h-7 w-full max-w-md" />
              <div className="mt-5 flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="mt-0.5 size-5 shrink-0 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-stone-100 pt-5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="mt-8 h-13 w-56 rounded-full" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="aspect-square w-full max-w-md rounded-[22px]" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream pb-20">
        <Container className="max-w-6xl">
          <div className="rounded-[40px] border border-emerald-900/10 bg-[#edf4f0] px-6 py-12 sm:px-10 sm:py-14">
            <Skeleton className="h-9 w-64 max-w-full" />
            <Skeleton className="mt-2 h-6 w-full max-w-xl" />
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <Skeleton className="size-25 rounded-full sm:size-[120px]" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-700 border-t border-emerald-950/40 py-20">
        <Container className="max-w-5xl">
          <Skeleton className="mx-auto h-9 w-72 max-w-full bg-white/15" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square w-full rounded-2xl bg-white/20"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
