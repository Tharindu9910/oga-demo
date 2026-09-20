import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-42">
        <Container className="max-w-4xl">
          <div className="flex flex-col items-center gap-5 text-center">
            <Skeleton className="h-14 w-64 max-w-full" />
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-32 rounded-full" />
              ))}
            </div>
            <div className="mt-4 flex w-full flex-col items-center gap-3">
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-5/6 max-w-2xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story video */}
      <section className="bg-cream pb-16">
        <Container className="max-w-4xl">
          <Skeleton className="mt-10 aspect-video w-full rounded-3xl" />
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#fafbf9] pb-16">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-5 rounded-[32px] border border-stone-200 bg-white p-10 text-center shadow-xl"
              >
                <Skeleton className="size-25 rounded-full" />
                <Skeleton className="h-8 w-24" />
                <div className="flex w-full flex-col items-center gap-2">
                  <Skeleton className="h-4 w-full max-w-sm" />
                  <Skeleton className="h-4 w-3/4 max-w-sm" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Message from the President */}
      <section className="bg-cream py-16">
        <Container className="max-w-3xl">
          <Skeleton className="mx-auto h-9 w-72 max-w-full" />
          <div className="mt-10 rounded-[32px] border border-[#d9e6df] bg-white p-10 shadow-lg">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="mt-2 flex flex-col gap-2 border-t border-stone-100 pt-6">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Team */}
      <section className="bg-cream pb-16">
        <Container className="max-w-5xl">
          <div className="rounded-[36px] border border-[#d9e6df] bg-[#eef5f1] p-5 sm:p-8 lg:p-12">
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
                >
                  <Skeleton className="h-7 w-28 border-b border-stone-100 pb-4" />
                  <div className="mt-6 flex flex-col gap-3">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4/5" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Tribute to the founder */}
      <section className="bg-cream py-16">
        <Container className="max-w-5xl">
          <div className="bg-brand-700 flex flex-col items-center gap-8 rounded-[36px] border border-[#022c22] p-8 shadow-2xl sm:flex-row sm:items-start sm:p-14">
            <Skeleton className="h-72 w-48 shrink-0 rounded-2xl bg-white/15 sm:w-62" />
            <div className="flex w-full flex-col items-center gap-4 sm:items-start">
              <Skeleton className="h-8 w-64 max-w-full bg-white/15" />
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-4 w-full bg-white/15" />
                <Skeleton className="h-4 w-full bg-white/15" />
                <Skeleton className="h-4 w-2/3 bg-white/15" />
              </div>
              <Skeleton className="mt-2 h-16 w-full rounded-2xl bg-white/10" />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
