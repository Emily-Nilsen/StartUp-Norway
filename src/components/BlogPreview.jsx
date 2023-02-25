import Image from 'next/image'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function BlogPreview({
  title,
  author,
  authorPosition,
  imgUrl,
  category,
  categoryColour,
  excerpt,
  minToRead,
  authorImg,
}) {
  const catColour =
    categoryColour === 'pink'
      ? 'text-pink-600 text-sm font-medium'
      : categoryColour === 'orange'
      ? 'text-orange-600 text-sm font-medium'
      : categoryColour === 'gray'
      ? 'text-gray-600 text-sm font-medium'
      : categoryColour === 'red'
      ? 'text-red-600 text-sm font-medium'
      : categoryColour === 'green'
      ? 'text-green-600 text-sm font-medium'
      : ''

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <div className="relative h-64 w-full">
          <Image fill className="object-cover" src={imgUrl} alt="Blog image" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className={catColour}>{category}</p>

          <p className="text-xl font-semibold text-gray-900">{title}</p>
          <p className="mt-3 text-base text-gray-500">{excerpt}</p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">author name</span>
            <div className="relative h-12 w-12">
              <Image
                fill
                className="h-10 w-10 rounded-full"
                src={authorImg}
                alt={author}
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{author}</p>
            <div className="flex space-x-1 text-sm text-gray-500">
              {/* <time dateTime={post.datetime}>{post.date}</time> */}
              <span>{authorPosition}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{minToRead} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
