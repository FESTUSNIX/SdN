// Thanks to Josh from https://www.youtube.com/@joshtriedcoding, make sure to subscribe

'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, {
	ssr: false
})

type Props = {
	content?: any
}

const style = {
	paragraph: {
		fontSize: '0.875rem',
		lineHeight: '1.25rem'
	}
}

const renderers = {
	image: CustomImageRenderer,
	code: CustomCodeRenderer
}

const EditorOutput = ({}: Props) => {
	const [content, setContent] = useState(null)

	useEffect(() => {
		const lcs = localStorage.getItem('editorContent')

		if (!lcs) return

		const parsedContent = JSON.parse(lcs)

		setContent(parsedContent)
	}, [])

	if (!content) return <div>Loading...</div>

	return <Output className='text-sm' style={style} data={content} renderers={renderers} />
}

function CustomCodeRenderer({ data }: any) {
	return (
		<pre className='rounded-md bg-gray-800 p-4'>
			<code className='text-sm text-gray-100'>{data.code}</code>
		</pre>
	)
}

function CustomImageRenderer({ data }: any) {
	const src = data.file.url

	return (
		<div className='relative min-h-[15rem] w-full'>
			<Image alt='image' className='object-contain' fill src={src} />
		</div>
	)
}

export default EditorOutput
