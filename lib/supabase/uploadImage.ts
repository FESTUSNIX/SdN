'use client'

import { supabase } from './supabase'

const getUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

export const uploadFileToSupabase = async (bucket: string, file: File, filename?: string) => {
	const _filename = filename ?? `${getUUID()}-${file.name}`

	const { data, error } = await supabase.storage.from(bucket).upload(`${_filename}`, file, {
		cacheControl: '36000',
		upsert: false
	})

	if (error) throw new Error(error.message)

	return data?.path
}
