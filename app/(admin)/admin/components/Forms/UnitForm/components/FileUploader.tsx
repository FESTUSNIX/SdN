'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/app/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/Form'
import { FileUploader } from '@/app/components/FileUploader'

import { UploadedFilesCard } from './UploadedFilesCard'
import toast from 'react-hot-toast'
import { getErrorMessage } from '@/lib/utils/handleError'
import { UnitFormType } from '@/lib/validators/unit'

const schema = z.object({
	images: z.array(z.instanceof(File))
})

type Schema = z.infer<typeof schema>

const useUploadFile = (name: string, options: { defaultUploadedFiles: File[] }) => {
	const [uploadedFiles, setUploadedFiles] = React.useState<File[]>(options.defaultUploadedFiles)
	const [progresses, setProgresses] = React.useState<Record<string, number>>({})
	const [isUploading, setIsUploading] = React.useState(false)

	const onUpload = async (files: File[]) => {
		setIsUploading(true)

		return console.log('files', files)

		const response = {
			ok: false
		}

		if (response.ok) {
			setUploadedFiles(files)
			setProgresses({})
			setIsUploading(false)
		} else {
			// throw new Error(data.message)
		}
	}

	return { onUpload, progresses, uploadedFiles, isUploading }
}



export function ReactHookFormDemo() {
	const [loading, setLoading] = React.useState(false)
	const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile('imageUploader', {
		defaultUploadedFiles: []
	})
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			images: []
		}
	})

	function onSubmit(input: Schema) {
		setLoading(true)

		toast.promise(onUpload(input.images), {
			loading: 'Trwa przesyłanie zdjęć',
			success: () => {
				form.reset()
				setLoading(false)
				return 'Zdjęcia zostały przesłane'
			},
			error: err => {
				setLoading(false)
				return getErrorMessage(err)
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-6'>
				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<div className='space-y-6'>
							<FormItem className='w-full'>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<FileUploader
										value={field.value}
										onValueChange={field.onChange}
										maxFileCount={4}
										maxSize={4 * 1024 * 1024}
										progresses={progresses}
										// pass the onUpload function here for direct upload
										// onUpload={uploadFiles}
										disabled={isUploading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
							{uploadedFiles.length > 0 ? <UploadedFilesCard uploadedFiles={uploadedFiles} /> : null}
						</div>
					)}
				/>
				<Button className='w-fit' disabled={loading}>
					Save
				</Button>
			</form>
		</Form>
	)
}
