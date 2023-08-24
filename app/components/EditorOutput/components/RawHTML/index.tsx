'use client'

import DOMPurify from 'dompurify'

export function CustomRawHTMLRenderer({ data }: any) {
	const rawHTML = data.html

	const htmlSanitized = DOMPurify.sanitize(rawHTML)

	return <div className='not-tw-prose' dangerouslySetInnerHTML={{ __html: htmlSanitized }} />
}
