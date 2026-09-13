import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { getPosts } from '@/content/queries'

function formatPublishedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default async function BlogsPage() {
  const posts = await getPosts()

  return (
    <section className="bg-white px-6 pt-32 pb-24 sm:pt-42 lg:px-16">
      <Container className="max-w-6xl">
        <SectionHeading align="center">Blogs & Feedback</SectionHeading>

        {posts.length === 0 ? (
          <p className="font-plus-jakarta-sans mt-10 text-center text-sm text-stone-500">
            No blog posts yet — check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <article
                key={post._id}
                className="rounded-2xl border border-stone-200/70 bg-white p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
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
                <h2 className="font-poppins mt-1 text-lg font-semibold text-stone-900">
                  {post.title}
                </h2>
                <div className="mt-3 border-t border-stone-100 pt-3">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="font-poppins text-brand-800 inline-flex items-center gap-1 text-xs font-medium"
                  >
                    Read Article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
