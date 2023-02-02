const boldText = 'font-bold'
const codeText = 'bg-gray-100 rounded-md px-2 py-4 text-gray-100'
const italicText = 'italic'
const strikethroughText = 'line-through'
const underlineText = 'underline'

export function Text({ text }) {
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
          bold ? boldText : '',
          code ? codeText : '',
          italic ? italicText : '',
          strikethrough ? strikethroughText : '',
          underline ? underlineText : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    )
  })
}
