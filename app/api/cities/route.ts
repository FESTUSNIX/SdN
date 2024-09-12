import { uploadFileToSupabase } from '@/lib/supabase/filesServer'
import { CityValidator } from '@/lib/validators/city'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(request: NextRequest) {
	try {
		const cities = await prisma.city.findMany({
			orderBy: {
				name: 'asc'
			},
			select: {
				id: true,
				name: true
			}
		})

		return NextResponse.json(cities)
	} catch (error) {
		return new NextResponse('Error', { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const { description, name, voivodeship, image } = CityValidator.parse(body)

		const cityExists = !!(await prisma.city.findFirst({
			where: {
				name
			},
			select: {
				id: true
			}
		}))

		if (cityExists) {
			return new Response('This city already exists', { status: 409 })
		}

		const city = await prisma.$transaction(async tx => {
			const newCity = await tx.city.create({
				data: {
					name,
					voivodeshipId: voivodeship.id,
					description
				}
			})

			if (!newCity) {
				throw new Error('Could not create a city')
			}

			if (image) {
				await tx.city.update({
					where: {
						id: newCity.id
					},
					data: {
						image: `${newCity.id}/main-image`
					}
				})
			}

			return newCity
		})

		if (image) {
			await uploadFileToSupabase('cities', image, `${city.id}/main-image`)
		}

		revalidatePath('/admin/cities')

		return new Response(city.id.toString())
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create a new subscription', { status: 500 })
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const body = await req.json()

		const { description, name, voivodeship, image, id } = CityValidator.partial().parse(body)

		const cityExists = !!(await prisma.city.findFirst({
			where: { id }
		}))

		if (!cityExists) {
			return new Response('Could not find city to update', { status: 404 })
		}

		await prisma.city.update({
			where: { id },
			data: {
				name,
				voivodeshipId: voivodeship?.id,
				description,
				image
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update this city, please try again.', { status: 500 })
	}
}
