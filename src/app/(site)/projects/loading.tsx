import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      {/* Hero */}
      <section className="from-brand-50/80 bg-linear-to-b bg-cream pt-32 pb-16 sm:pt-42">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="flex flex-col items-start gap-6 lg:col-span-6">
              <Skeleton className="h-16 w-full max-w-md" />
              <div className="flex w-full flex-col gap-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="lg:col-span-6">
              <Skeleton className="aspect-[900/870] w-full rounded-3xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Ongoing Projects */}
      <section className="bg-cream px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-4xl border border-[#e2ece5] bg-[#f4f8f5] p-5 sm:p-8 lg:p-12">
          <Skeleton className="h-9 w-56" />
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-stone-100 bg-white p-5"
              >
                <div className="flex flex-col gap-4">
                  <Skeleton className="aspect-4/3 w-full rounded-xl" />
                  <Skeleton className="h-6 w-4/5" />
                </div>
                <div className="mt-4 border-t border-stone-100 pt-3.5">
                  <Skeleton className="h-2 w-full rounded-full" />
                  <Skeleton className="mt-3 h-6 w-28 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section className="bg-cream px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="h-9 w-56" />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-4"
              >
                <Skeleton className="aspect-4/3 w-full rounded-xl" />
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-stone-100 pt-2.5">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donations & Relief Drives */}
      <section className="border-t border-stone-100 bg-cream py-16">
        <Container className="max-w-4xl">
          <Skeleton className="mx-auto h-9 w-40" />
          <div className="mt-12 flex flex-col gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-brand-700 overflow-hidden rounded-3xl border border-white/10 shadow-xl"
              >
                <div className="grid grid-cols-1 items-center gap-8 p-8 sm:p-10 lg:grid-cols-2">
                  <Skeleton className="aspect-4/3 w-full rounded-2xl bg-white/15" />
                  <div className="flex flex-col gap-4">
                    <Skeleton className="h-8 w-40 bg-white/15" />
                    <div className="flex flex-col gap-3">
                      <Skeleton className="h-4 w-full bg-white/15" />
                      <Skeleton className="h-4 w-full bg-white/15" />
                      <Skeleton className="h-4 w-2/3 bg-white/15" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Make a Difference donation widget */}
      <section className="bg-brand-700 py-20">
        <Container className="max-w-4xl">
          <Skeleton className="mx-auto h-9 w-56 bg-white/15" />
          <Skeleton className="mx-auto mt-4 h-4 w-full max-w-md bg-white/15" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-stone-100 bg-white p-6 shadow-lg sm:p-8"
              >
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
