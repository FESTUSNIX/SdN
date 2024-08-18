import { deleteFilesFromSupabase } from '../supabase/deleteFiles'
import { uploadFileToSupabase } from '../supabase/uploadImage'

export const handleGallery = async (
	unitId: number,
	gallery: (
		| {
				url: string
				alt: string
		  }
		| File
	)[],
	prevGallery?: {
		url: string
		alt: string
	}[]
) => {
	prevGallery = prevGallery || []

	const newGallery = await Promise.all(
		gallery.map(async (file, i) => {
			if (file instanceof File) {
				return {
					url: await uploadFileToSupabase('units', file, `${unitId}/gallery/${file.name}`, true),
					alt: 'Temporary alt'
				}
			}

			return file
		})
	)

	const filesToDelete = prevGallery.filter(file => !newGallery.some(newFile => newFile.url === file.url))

	if (filesToDelete.length > 0) {
		await deleteFilesFromSupabase(
			'units',
			filesToDelete.map(file => file.url)
		)
	}

	return newGallery
}
