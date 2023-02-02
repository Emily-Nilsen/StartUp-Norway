import Image from 'next/image'
import Link from 'next/link'

export function BlogPreview({
  title,
  author,
  imgUrl,
  excerpt,
  minToRead,
  authorImg,
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <div className="relative w-full h-64">
          <Image fill className="object-cover" src={imgUrl} alt="Blog image" />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <Link href="#" className="hover:underline">
              category name
            </Link>
          </p>
          <Link href="#" className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-base text-gray-500">{excerpt}</p>
          </Link>
        </div>
        <div className="flex items-center mt-6">
          <div className="flex-shrink-0">
            <Link href="#">
              <span className="sr-only">author name</span>
              <div className="relative w-12 h-12">
                <Image
                  fill
                  className="w-10 h-10 rounded-full"
                  src={authorImg}
                  alt={author}
                />
              </div>
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <Link href="#" className="hover:underline">
                {author}
              </Link>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              {/* <time dateTime={post.datetime}>{post.date}</time> */}
              <span aria-hidden="true">&middot;</span>
              <span>{minToRead} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
