'use client'

import { supabase } from './supabase'

export const deleteFilesFromSupabase = async (bucket: string, paths: string[]) => {
	const { data, error } = await supabase.storage.from(bucket).remove([...paths])
	if (error) throw new Error(error.message)

	return data
}
