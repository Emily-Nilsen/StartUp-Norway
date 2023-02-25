import { Fragment } from 'react'
import Head from 'next/head'
import { getDatabase, getPage, getBlocks } from '../../lib/notion'
import Link from 'next/link'
import { databaseId } from './index'
import Image from 'next/image'
import { Container } from '@/components/Container'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Text = ({ text }) => {
  if (!text) {
    return null
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        className={[
          bold ? 'font-bold' : '',
          code ? 'rounded-md bg-gray-100 px-2 py-1 font-mono text-red-600' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? underline : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
        key={text.content}
      >
        {text.link ? (
          <a className="text-gray-500 underline" href={text.link.url}>
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

const renderNestedList = (block) => {
  const { type } = block
  const value = block[type]
  if (!value) return null

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return <ol>{value.children.map((block) => renderBlock(block))}</ol>
  }
  return <ul>{value.children.map((block) => renderBlock(block))}</ul>
}

const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p className="mb-3">
          <Text text={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1 className="mb-4 text-4xl font-bold">
          <Text text={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className="mb-4 text-3xl font-semibold">
          <Text text={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3 className="mb-4 text-xl font-semibold">
          <Text text={value.rich_text} />
        </h3>
      )
    case 'bulleted_list': {
      return <ul>{value.children.map((child) => renderBlock(child))}</ul>
    }
    case 'numbered_list': {
      return <ol>{value.children.map((child) => renderBlock(child))}</ol>
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={block.id}>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      )
    case 'to_do':
      return (
        <div
          className={classNames(
            value.checked ? 'text-gray-500 line-through' : 'text-gray-900'
          )}
        >
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text text={value.rich_text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return (
        <div className="p-6 border-2 border-pink-300">
          <strong>{value.title}</strong>
          {block.children?.map((child) => renderBlock(child))}
        </div>
      )
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure className="py-3">
          <div className="relative overflow-hidden shadow-xl h-60 rounded-2xl">
            <Image fill src={src} alt={caption} />
          </div>
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>
    case 'code':
      return (
        <pre className="px-4 py-2 mx-10 overflow-hidden bg-gray-800 rounded-2xl">
          <code className="flex flex-wrap p-6 font-mono text-white" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      )
    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url
      const splitSourceArray = src_file.split('/')
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const caption_file = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          <div className="px-4 py-2 text-green-500">
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      )
    case 'bookmark':
      const href = value.url
      return (
        <a href={href} rel="noreferrer" target="_blank" className={bookmark}>
          {href}
        </a>
      )
    case 'table': {
      return (
        <table className="border-green-400 border-1">
          <tbody>
            {block.children?.map((child, i) => {
              const RowElement = value.has_column_header && i == 0 ? 'th' : 'td'
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell, i) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${i}`}>
                        <Text text={cell} />
                      </RowElement>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
    case 'column_list': {
      return (
        <div className="flex">
          {block.children?.map((block) => renderBlock(block))}
        </div>
      )
    }
    case 'column': {
      return <div>{block.children?.map((child) => renderBlock(child))}</div>
    }
    case 'video': {
      return (
        <div>
          <video
            className="bg-pink-100"
            width="320"
            height="240"
            src="https://www.youtube.com/watch?v=V6Hq_EX2LLM"
          />
          <p>video goes here</p>
        </div>
      )
    }
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}

export default function Post({ page, blocks }) {
  console.log(page, blocks)

  if (!page || !blocks) {
    return <div />
  }
  return (
    <div>
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-red-100 h-96">
        <div className="relative h-full">
          <Image
            src={page.properties.ImgUrl.files[0].name}
            className="object-cover"
            fill
            alt="image"
          />
        </div>
      </div>

      <article className="py-24">
        <Container>
          <h1 className="text-5xl font-bold text-red-800 font-display">
            <Text text={page.properties.Name.title} />
          </h1>
          <section>
            {blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
            <Link href="/" className="text-green-600">
              ← Go home
            </Link>
          </section>
          <div>
            <video
              width="100%"
              controls
              playsInline
              // poster="https://res.cloudinary.com/dt3k2apqd/image/upload/q_auto/Loop%20Film/bmw-large_rbr1c8.webp"
            >
              <source src={page.properties.VideoUrl.url} type="video/mp4" />
            </video>
          </div>
        </Container>
      </article>
    </div>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const page = await getPage(id)
  const blocks = await getBlocks(id)

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 1,
  }
}
