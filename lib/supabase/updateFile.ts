'use client'

import { supabase } from './supabase'

export const updateFileFromSupabase = async (bucket: string, path: string, file: File) => {
	const { data, error } = await supabase.storage.from(bucket).update(path, file, {
		cacheControl: '36000',
		upsert: true
	})

	if (error) throw new Error(error.message)

	return data?.path
}
