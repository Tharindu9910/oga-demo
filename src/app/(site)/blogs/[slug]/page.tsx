import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Container from '@/components/ui/Container'
import { getPostBySlug, getPosts } from '@/content/queries'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({
  params,
}: PageProps<'/blogs/[slug]'>) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const paragraphs = post.body.slice(0, -1)
  const attribution = post.body.at(-1)

  return (
    <article className="bg-white px-6 pt-32 pb-24 sm:pt-42 lg:px-16">
      <Container className="max-w-3xl">
        <Link
          href="/blogs"
          className="font-poppins text-brand-600 mb-8 inline-flex items-center gap-1 text-xs font-semibold"
        >
          <span aria-hidden="true">←</span> Back to Blogs
        </Link>

        <h1 className="font-poppins text-3xl leading-tight font-bold tracking-tight text-stone-900 uppercase sm:text-4xl">
          {post.title}
        </h1>
        <p className="font-plus-jakarta-sans mt-3 text-sm text-stone-400">
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-stone-100">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            width={1000}
            height={686}
            className="w-full object-cover"
          />
        </div>

        <div className="font-poppins mt-10 flex flex-col gap-5 text-base leading-relaxed text-stone-700">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {attribution && (
          <p className="font-poppins mt-10 border-t border-stone-200 pt-6 text-sm font-medium tracking-[0.35px] text-stone-900">
            {attribution}
          </p>
        )}
      </Container>
    </article>
  )
}
