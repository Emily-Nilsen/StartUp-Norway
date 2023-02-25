import Head from 'next/head'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { BlogPreview } from '@/components/BlogPreview'

import { getDatabase } from '../../lib/notion'

export const databaseId = process.env.NOTION_DATABASE_ID

export default function Home({ posts }) {
  console.log(posts)

  return (
    <>
      <Head>
        <title>StartUp Norway: Your Guide to Entrepreneurship</title>
        <meta
          name="description"
          content="Navigating the cost and creation of your small business. "
        />
      </Head>
      <Hero />

      {/* From notion db */}
      <div>
        <div className="relative px-6 pt-16 pb-20 bg-gray-50 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Step-by-step:
                <br />
                Starting a successful small business in Norway
              </h2>
              <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
                StartUp Norway aims to give you an idea of costs, the steps
                involved in making your website and other practical topics that
                can help you start a small business in Norway.
              </p>
            </div>
            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post.id}>
                  <Link href={`/${post.id}`}>
                    <BlogPreview
                      title={post.properties.Name.title[0].plain_text}
                      category={post.properties.Tags.multi_select[0].name}
                      categoryColour={
                        post.properties.Tags.multi_select[0].color
                      }
                      excerpt={post.properties.Excerpt.rich_text[0].plain_text}
                      author={post.properties.Author.rich_text[0].plain_text}
                      authorPosition={
                        post.properties.AuthorPosition.rich_text[0].plain_text
                      }
                      authorImg={post.properties.AuthorImg.files[0].name}
                      imgUrl={post.properties.ImgUrl.files[0].name}
                      minToRead={post.properties.MinToRead.number}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId)

  return {
    props: {
      posts: database,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}
