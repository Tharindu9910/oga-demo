import Container from '@/components/ui/Container'
import Skeleton from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <section className="bg-white px-6 pt-32 pb-24 sm:pt-42 lg:px-16">
      <Container className="max-w-5xl">
        <Skeleton className="mx-auto h-9 w-64 max-w-full" />

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-[588/735] w-full rounded-3xl" />

          <div className="flex flex-col gap-6 rounded-[36px] border border-[#d6e5db] bg-[#edf5f0] p-4 sm:p-9">
            <div className="rounded-2xl border border-[#e0ece3] bg-white p-5 shadow-sm sm:p-7">
              <Skeleton className="h-7 w-48" />
              <div className="mt-5 flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-[#e8efe9] bg-[#f9fbf9] p-4"
                  >
                    <Skeleton className="mt-0.5 size-5 shrink-0 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#e0ece3] bg-white p-5 shadow-sm sm:p-7">
              <Skeleton className="h-7 w-48" />
              <div className="mt-5 flex flex-col gap-3.5">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-14 w-full rounded-xl" />
              </div>
              <div className="mt-6 border-t border-stone-100 pt-6">
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
