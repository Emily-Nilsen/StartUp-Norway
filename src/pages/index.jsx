import Head from 'next/head'

import { Hero } from '@/components/Hero'
import { BlogHeroText } from '@/components/BlogHeroText'
import { BlogPreview } from '@/components/BlogPreview'

import { Client } from '@notionhq/client'

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
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Step-by-step:
                <br />
                Starting a successful small business in Norway
              </h2>
              <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
                The information on this blog gives you an idea of the costs, how
                to make your website and other practical topics that may be
                useful in starting a small business in Norway.
              </p>
            </div>
            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post.id}>
                  <BlogPreview
                    title={post.properties.Name.title[0].plain_text}
                    excerpt={post.properties.Excerpt.rich_text[0].plain_text}
                    author={post.properties.Author.rich_text[0].plain_text}
                    authorImg={post.properties.AuthorImg.files[0].name}
                    imgUrl={post.properties.ImgUrl.files[0].name}
                    minToRead={post.properties.MinToRead.number}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  })

  return {
    props: {
      posts: response.results,
    },
    revalidate: 1,
  }
}
