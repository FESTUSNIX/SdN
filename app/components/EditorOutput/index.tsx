// Thanks to Josh from https://www.youtube.com/@joshtriedcoding, make sure to subscribe

'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CustomListRenderer } from './components/NestedList'
import { CustomLinkToolRenderer } from './components/LinkTool'
import { CustomTableRenderer } from './components/Table'

const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, {
	ssr: false
})

const renderers = {
	linktool: CustomLinkToolRenderer,
	list: CustomListRenderer,
	table: CustomTableRenderer
}

const EditorOutput = () => {
	const [content, setContent] = useState(null)

	useEffect(() => {
		const lcs = localStorage.getItem('editorContent')

		let parsedContent = null

		if (lcs || typeof lcs === 'string') {
			parsedContent = JSON.parse(lcs)
		}
		console.log(parsedContent)
		setContent(parsedContent)
	}, [])

	if (!content) return <div>Loading...</div>

	return (
		<Output
			data={content}
			renderers={renderers}
			config={{
				linkTool: {
					disableDefaultStyle: true
				}
			}}
		/>
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
