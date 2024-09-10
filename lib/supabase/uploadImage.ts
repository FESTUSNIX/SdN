'use client'

import { createId } from '@paralleldrive/cuid2'
import { supabase } from './supabase'

export const uploadFileToSupabase = async (bucket: string, file: File, filename?: string, upsert?: boolean) => {
	const _filename = filename ?? `${createId()}-${file.name}`

	const { data, error } = await supabase.storage.from(bucket).upload(`${_filename}`, file, {
		cacheControl: '36000',
		upsert: upsert ?? false
	})

	if (error) throw new Error(error.message)

	return data?.path
}
