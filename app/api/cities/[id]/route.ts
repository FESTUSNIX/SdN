import { deleteFilesFromSupabase } from '@/lib/supabase/filesServer'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id)

		const cityToDelete = await prisma.city.findFirst({
			where: { id }
		})

		if (!cityToDelete) {
			return new Response('Could not find city to delete', { status: 404 })
		}

		await prisma.city.delete({
			where: { id },
			select: {
				id: true,
				image: true
			}
		})

		if (cityToDelete.image) {
			await deleteFilesFromSupabase('cities', [cityToDelete.image])
		}

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid DELETE request data passed', { status: 422 })
		}

		return new Response('Could not delete this city, please try again.', { status: 500 })
	}
}
