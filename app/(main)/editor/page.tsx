import Editor from '@/app/components/Editor'
import EditorOutput from '@/app/components/EditorOutput'
import { H1 } from '@/app/components/ui/Typography'
import React from 'react'

const EditorPage = () => {
	return (
		<main className='wrapper mt-12'>
			<H1 className='mb-4'>Editor test</H1>

			<Editor majorId={1} type='description' />

			<div className='my-12'></div>

			<EditorOutput />
		</main>
	)
}

export default EditorPage
