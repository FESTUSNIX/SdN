import createDOMPurify from 'dompurify'

const DOMPurify = createDOMPurify(window)

export function CustomRawHTMLRenderer({ data }: any) {
	const rawHTML = data.html

	return <div className='not-tw-prose' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }} />
}
