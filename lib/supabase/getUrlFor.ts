import { supabase } from './client'

export const urlFor = (bucket: string, filepath: string) => {
	const { data } = supabase.storage.from(bucket).getPublicUrl(`${filepath}`)

	return data
}
