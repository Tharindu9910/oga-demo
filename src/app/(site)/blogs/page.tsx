import { Suspense } from 'react'
import Link from 'next/link'

import Enter from '@/components/motion/Enter'
import Arrow from '@/components/ui/Arrow'
import Container from '@/components/ui/Container'
import PagedGrid from '@/components/ui/PagedGrid'
import PortableTextBody from '@/components/ui/PortableTextBody'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import Skeleton from '@/components/ui/Skeleton'
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
    <section className="bg-white pt-32 pb-24 sm:pt-42">
      <Container className="max-w-6xl">
        <SectionHeading align="center" enter>
          Blogs & Feedback
        </SectionHeading>

        <Suspense fallback={<BlogsSkeleton />}>
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
      {/* Keyed so switching posts remounts the view and replays its entrance. */}
      {activePost && <BlogView key={activePost.slug} post={activePost} />}
    </>
  )
}

function BlogsSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`rounded-xl border border-stone-200/70 bg-white p-2.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] sm:rounded-2xl sm:p-4 ${
            i >= 4 ? 'hidden lg:block' : ''
          }`}
        >
          <Skeleton className="aspect-square w-full rounded-xl" />
          <Skeleton className="mt-3 h-3 w-20" />
          <Skeleton className="mt-2 h-6 w-4/5" />
          <div className="mt-3 border-t border-stone-100 pt-3">
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
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
    <PagedGrid
      initialIndex={posts.findIndex((post) => post.slug === activeSlug)}
      items={posts.map((post) => ({
        id: post._id,
        content: <BlogCard post={post} isActive={post.slug === activeSlug} />,
      }))}
    />
  )
}

function BlogCard({ post, isActive }: { post: Post; isActive: boolean }) {
  return (
    <article
      className={`h-full rounded-xl border bg-white p-2.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-colors duration-200 sm:rounded-2xl sm:p-4 ${
        isActive ? 'border-brand-500' : 'border-stone-200/70'
      }`}
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-stone-100 sm:rounded-xl">
        <SanityImage
          image={post.coverImage}
          width={400}
          height={400}
          className="size-full object-cover"
        />
      </div>
      <p className="font-poppins mt-2 text-[11px] text-stone-400 sm:mt-3 sm:text-xs">
        {formatPublishedDate(post.publishedAt)}
      </p>
      <h2 className="font-poppins mt-1 truncate text-sm font-semibold text-stone-900 sm:text-lg">
        {post.title}
      </h2>
      <div className="mt-2 border-t border-stone-100 pt-2 sm:mt-3 sm:pt-3">
        <Link
          href={`/blogs?post=${post.slug}#blog-view`}
          className="group font-poppins text-brand-800 inline-flex items-center gap-1 text-xs font-medium"
        >
          Read Article <Arrow />
        </Link>
      </div>
    </article>
  )
}

function BlogView({ post }: { post: PostDetail }) {
  return (
    <Enter as="div" className="mt-16 rounded-3xl bg-emerald-50 px-6 py-12 sm:px-14 sm:py-16">
      <div id="blog-view" className="scroll-mt-28">
        <h2 className="font-poppins mx-auto max-w-3xl text-center text-2xl leading-tight font-bold tracking-tight text-stone-900 uppercase sm:text-3xl">
          {post.title}
        </h2>

        <div className="mx-auto mt-10 max-w-3xl">
          <PortableTextBody
            value={post.body}
            className="[&_img]:mx-auto [&_img]:max-w-md"
          />
        </div>
      </div>
    </Enter>
  )
}
