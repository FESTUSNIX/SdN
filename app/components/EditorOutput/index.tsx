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

type OutputProps = {
	content: any
}

const EditorOutput = ({ content }: OutputProps) => {
	console.log(content)
	// if (content || typeof content === 'string') content = JSON.parse(content)

	if (!content) return <div>Could not find content</div>

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
