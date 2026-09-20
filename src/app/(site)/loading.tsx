import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-950 relative flex min-h-[600px] items-center overflow-hidden pt-32 pb-24 sm:min-h-180 sm:pt-42 sm:pb-38">
        <Container className="relative max-w-6xl">
          <div className="flex max-w-2xl flex-col items-start gap-6">
            <Skeleton className="h-7 w-40 rounded-full bg-white/10" />
            <div className="flex w-full flex-col gap-3">
              <Skeleton className="h-14 w-full bg-white/10" />
              <Skeleton className="h-14 w-2/3 bg-white/10" />
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Skeleton className="h-12 w-36 rounded-full bg-white/15" />
              <Skeleton className="h-12 w-40 rounded-full bg-white/10" />
            </div>
          </div>
        </Container>
      </section>

      {/* About summary */}
      <section className="bg-cream py-20">
        <Container className="grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Skeleton className="h-9 w-3/4" />
            <div className="mt-6 flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="mt-8 h-12 w-32 rounded-full" />
          </div>
          <div className="lg:col-span-5">
            <Skeleton className="aspect-square w-full rounded-[20px]" />
          </div>
        </Container>
      </section>

      {/* Ongoing Projects */}
      <section className="bg-cream px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[#e2ece5] bg-[#f4f8f5] p-5 sm:p-8 lg:p-12">
          <div className="flex items-end justify-between gap-4">
            <Skeleton className="h-9 w-52" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-stone-100 bg-white p-5"
              >
                <div className="flex flex-col gap-4">
                  <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                  <Skeleton className="h-6 w-4/5" />
                </div>
                <div className="mt-4 border-t border-stone-100 pt-3.5">
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Progress and Milestones */}
      <section className="bg-cream px-6 py-14 lg:px-24">
        <div className="bg-brand-700 mx-auto max-w-6xl rounded-3xl p-8 shadow-xl sm:p-12">
          <Skeleton className="mx-auto h-9 w-80 max-w-full bg-white/15" />
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/12 bg-white/8 p-4 text-center sm:gap-5 sm:p-8"
              >
                <Skeleton className="size-14 rounded-full bg-white/15 sm:size-18" />
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-8 w-14 bg-white/15" />
                  <Skeleton className="h-4 w-16 bg-white/15" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-cream px-6 py-14 lg:px-48">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <Skeleton className="h-9 w-56" />
          <div className="mt-8 flex w-full flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white p-6"
              >
                <Skeleton className="size-20 shrink-0 rounded-xl" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="bg-cream px-6 py-14 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[#e2ece5] bg-[#f4f8f5] p-5 sm:p-8 lg:p-12">
          <div className="flex items-end justify-between gap-4">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white"
              >
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="flex gap-5 p-6">
                  <div className="flex flex-col items-center gap-2 border-r border-stone-200 pr-5">
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
        </div>
      </section>
    </>
  )
}
