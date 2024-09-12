import { createId } from '@paralleldrive/cuid2'
import { createClient } from './server'

export const deleteFilesFromSupabase = async (bucket: string, paths: string[]) => {
	const supabase = createClient()

	const { data, error } = await supabase.storage.from(bucket).remove([...paths])
	if (error) throw new Error(error.message)

	return data
}

export const uploadFileToSupabase = async (bucket: string, file: File, filename?: string, upsert?: boolean) => {
	const supabase = createClient()

	const _filename = filename ?? `${createId()}-${file.name}`

	const { data, error } = await supabase.storage.from(bucket).upload(`${_filename}`, file, {
		cacheControl: '36000',
		upsert: upsert ?? false
	})

	if (error) throw new Error(error.message)

	return data?.path
}
