// Thanks to Josh from https://www.youtube.com/@joshtriedcoding, make sure to subscribe

'use client'

import dynamic from 'next/dynamic'
import { CustomLinkToolRenderer } from './components/LinkTool'
import { CustomListRenderer } from './components/NestedList'
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
	if (!content) return <div>Could not find content</div>

	return (
		<div className='tw-prose'>
			<Output
				data={{ blocks: content }}
				renderers={renderers}
				config={{
					linkTool: {
						disableDefaultStyle: true
					}
				}}
			/>
		</div>
	)
}

export default EditorOutput
