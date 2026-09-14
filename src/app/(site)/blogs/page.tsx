import { Suspense } from 'react'
import Link from 'next/link'

import Container from '@/components/ui/Container'
import PortableTextBody from '@/components/ui/PortableTextBody'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import {
  getPostBySlug,
  getPosts,
  type Post,
  type PostDetail,
} from '@/sanity/lib/content'

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
  const activeSlug = posts.some((post) => post.slug === slug)
    ? slug!
    : posts[0].slug

  const activePost = await getPostBySlug(activeSlug)

  return (
    <>
      <BlogCardsGrid posts={posts} activeSlug={activeSlug} />
      {activePost && <BlogView post={activePost} />}
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
              <SanityImage
                image={post.coverImage}
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

function BlogView({ post }: { post: PostDetail }) {
  return (
    <div
      id="blog-view"
      className="mt-16 scroll-mt-28 rounded-3xl bg-emerald-50 px-6 py-12 sm:px-14 sm:py-16"
    >
      <h2 className="font-poppins mx-auto max-w-3xl text-center text-2xl leading-tight font-bold tracking-tight text-stone-900 uppercase sm:text-3xl">
        {post.title}
      </h2>

      <div className="mx-auto mt-10 max-w-3xl">
        <PortableTextBody value={post.body} />
      </div>
    </div>
  )
}
