import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { getPosts } from '@/content/queries'
import type { Post } from '@/content/types'

function formatPublishedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogsPage({ searchParams }: PageProps<'/blogs'>) {
  return (
    <section className="bg-white px-6 pt-32 pb-24 sm:pt-42 lg:px-16">
      <Container className="max-w-6xl">
        <SectionHeading align="center">Blogs & Feedback</SectionHeading>

        <Suspense
          fallback={
            <p className="font-plus-jakarta-sans mt-10 text-center text-sm text-stone-400">
              Loading blog posts…
            </p>
          }
        >
          <BlogsContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </section>
  )
}

async function BlogsContent({
  searchParams,
}: Pick<PageProps<'/blogs'>, 'searchParams'>) {
  const posts = await getPosts()

  if (posts.length === 0) {
    return (
      <p className="font-plus-jakarta-sans mt-10 text-center text-sm text-stone-500">
        No blog posts yet — check back soon.
      </p>
    )
  }

  const { post: requestedSlug } = await searchParams
  const slug = Array.isArray(requestedSlug) ? requestedSlug[0] : requestedSlug
  const activePost = posts.find((post) => post.slug === slug) ?? posts[0]

  return (
    <>
      <BlogCardsGrid posts={posts} activeSlug={activePost.slug} />
      <BlogView post={activePost} />
    </>
  )
}

function BlogCardsGrid({
  posts,
  activeSlug,
}: {
  posts: Post[]
  activeSlug: string
}) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post) => {
        const isActive = post.slug === activeSlug

        return (
          <article
            key={post._id}
            className={`rounded-2xl border bg-white p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ${
              isActive ? 'border-brand-500' : 'border-stone-200/70'
            }`}
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-stone-100">
              <Image
                src={post.coverImage.src}
                alt={post.coverImage.alt}
                width={400}
                height={400}
                className="size-full object-cover"
              />
            </div>
            <p className="font-poppins mt-3 text-xs text-stone-400">
              {formatPublishedDate(post.publishedAt)}
            </p>
            <h2 className="font-poppins mt-1 line-clamp-2 text-lg font-semibold text-stone-900">
              {post.title}
            </h2>
            <div className="mt-3 border-t border-stone-100 pt-3">
              <Link
                href={`/blogs?post=${post.slug}#blog-view`}
                className="font-poppins text-brand-800 inline-flex items-center gap-1 text-xs font-medium"
              >
                Read Article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function BlogView({ post }: { post: Post }) {
  const paragraphs = post.body.slice(0, -1)
  const attribution = post.body.at(-1)

  return (
    <div
      id="blog-view"
      className="mt-16 scroll-mt-28 rounded-3xl bg-emerald-50 px-6 py-12 sm:px-14 sm:py-16"
    >
      <h2 className="font-poppins mx-auto max-w-3xl text-center text-2xl leading-tight font-bold tracking-tight text-stone-900 uppercase sm:text-3xl">
        {post.title}
      </h2>

      <div className="font-poppins mx-auto mt-10 flex max-w-3xl flex-col gap-5 text-base leading-relaxed text-stone-700">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {attribution && (
        <div className="mx-auto mt-10 flex max-w-3xl items-end justify-between gap-6 border-t border-stone-900/10 pt-6">
          <p className="font-poppins text-sm font-medium tracking-[0.35px] text-stone-900">
            {attribution}
          </p>
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            width={96}
            height={74}
            className="h-auto w-24 shrink-0 object-contain"
          />
        </div>
      )}
    </div>
  )
}
