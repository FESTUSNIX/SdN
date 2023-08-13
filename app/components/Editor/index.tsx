'use client'

// Thanks to Josh from https://www.youtube.com/@joshtriedcoding, make sure to subscribe

import { MajorTextCreationRequest, MajorTextTypes, MajorTextValidator } from '@/lib/validators/majorText'
import type EditorJS from '@editorjs/editorjs'
import { ToolConstructable } from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../ui/Button'
import '@/app/(main)/styles/editor.css'

type Props = {
	majorId: number
	type: MajorTextTypes
}

const Editor = ({ majorId, type }: Props) => {
	const [defaultContent, setDefaultContent] = useState(null)

	const ref = useRef<EditorJS>()
	const [isMounted, setIsMounted] = useState(false)

	const {
		handleSubmit,
		formState: { errors }
	} = useForm<MajorTextCreationRequest>({
		resolver: zodResolver(MajorTextValidator),
		defaultValues: {
			majorId,
			type: type,
			content: defaultContent || null
		}
	})

	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const LinkTool = (await import('@editorjs/link')).default
		const Table = (await import('@editorjs/table')).default
		const NestedList = (await import('@editorjs/nested-list')).default

		const lcs = localStorage.getItem('editorContent')

		let parsedContent

		if (!lcs) {
			parsedContent = []
		} else {
			parsedContent = JSON.parse(lcs)
		}

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					ref.current = editor
				},
				placeholder: 'Type here to write your text...',
				inlineToolbar: true,
				data: { blocks: parsedContent.blocks },
				tools: {
					header: {
						class: Header as unknown as ToolConstructable
					},
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/api/link'
						}
					},
					list: {
						class: NestedList,
						inlineToolbar: true,
						config: {
							defaultStyle: 'unordered'
						}
					},
					table: Table
				}
			})
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true)
		}
	}, [])

	useEffect(() => {
		if (Object.keys(errors).length) {
			for (const [_key, value] of Object.entries(errors)) {
				toast.error('Something went wrong')
			}
		}
	}, [errors])

	useEffect(() => {
		const init = async () => {
			await initializeEditor()
		}
		if (!isMounted) {
			init()

			return () => {
				ref.current?.destroy()
				ref.current = undefined
			}
		}
	}, [isMounted, initializeEditor])

	const onSubmit = async (data: MajorTextCreationRequest) => {
		const blocks = await ref.current?.save()

		const payload: MajorTextCreationRequest = {
			type: data.type,
			content: blocks,
			majorId: data.majorId
		}

		localStorage.setItem('editorContent', JSON.stringify(blocks))
	}

	if (!isMounted) return null

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} id='editor-form' className='w-full'>
				<div className='custom-editor prose min-w-full rounded-lg border p-4 text-foreground dark:prose-invert'>
					<div id='editor' className='min-h-[500px]' />
				</div>

				<Button type='submit' className='my-4'>
					Submit
				</Button>
			</form>
		</div>
	)
}

export default Editor
