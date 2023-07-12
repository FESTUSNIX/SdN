'use client'

import { v4 as uuidv4 } from 'uuid'
import { supabase } from './supabase'

export const uploadFileToSupabase = async (bucket: string, file: File, filename?: string) => {
	const _filename = filename ?? `${uuidv4()}-${file.name}`

	const { data, error } = await supabase.storage.from(bucket).upload(`${_filename}`, file, {
		cacheControl: '36000',
		upsert: false
	})

	if (error) throw new Error(error.message)

	return data?.path
}
