import { MajorValidator } from '@/lib/validators/major'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = z.coerce.number().parse(searchParams.get('id'))

		const major = await prisma.major.findFirst({
			where: {
				id: id
			},
			include: {
				qualifications: true
			}
		})

		if (!major) return new Response('Major not found', { status: 404 })

		return new Response(JSON.stringify(major))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not fetch major', { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const {
			cost,
			daysOfWeek,
			durationInHours,
			endDate,
			majorLevel,
			name,
			numberOfSemesters,
			onlineDuration,
			qualifications,
			startDate,
			status,
			unitId,
			address,
			canPayInInstallments,
			certificates,
			completionConditions,
			contact,
			description,
			formOfStudy,
			isOnline,
			isRegulated,
			organisator,
			recruitmentConditions,
			syllabus
		} = MajorValidator.omit({ id: true, unitSlug: true }).parse(body)

		const unitSlug = await prisma.unit.findFirst({
			where: {
				id: unitId
			},
			select: {
				slug: true
			}
		})

		if (!unitSlug) return new Response('Unit not found', { status: 404 })

		const qualificationsConnect = qualifications.map(qualification => {
			return {
				id: qualification
			}
		})

		const major = await prisma.major.create({
			data: {
				unitId: unitId,
				unitSlug: unitSlug.slug,
				status: status,
				name: name,
				address: address,
				contact: contact,
				cost: cost,
				durationInHours: durationInHours,
				endDate: endDate,
				formOfStudy: formOfStudy,
				isOnline: !!isOnline,
				majorLevel: majorLevel,
				numberOfSemesters: numberOfSemesters,
				onlineDuration: onlineDuration,
				organisator: organisator,
				recruitmentConditions: recruitmentConditions,
				startDate: startDate,
				syllabus: syllabus,
				isRegulated: !!isRegulated,
				canPayInInstallments: !!canPayInInstallments,
				certificates: certificates,
				completionConditions: completionConditions,
				daysOfWeek: daysOfWeek,
				description: description,
				qualifications: {
					connect: qualificationsConnect
				}
			}
		})

		return new Response(major.name)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create a new major', { status: 500 })
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const id = z.coerce.number().parse(searchParams.get('id'))

		const majorToDelete = await prisma.major.findFirst({
			where: {
				id: id
			}
		})

		if (!majorToDelete) {
			return new Response('Could not find major to delete', { status: 404 })
		}

		await prisma.major.delete({
			where: {
				id: id
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid DELETE request data passed', { status: 422 })
		}

		return new Response('Could not delete this major, please try again.', { status: 500 })
	}
}

export async function PATCH(req: Request) {
	try {
		const body = await req.json()

		const {
			id,
			address,
			canPayInInstallments,
			certificates,
			completionConditions,
			contact,
			cost,
			daysOfWeek,
			description,
			durationInHours,
			endDate,
			formOfStudy,
			isOnline,
			majorLevel,
			name,
			numberOfSemesters,
			onlineDuration,
			organisator,
			qualifications,
			recruitmentConditions,
			startDate,
			status,
			syllabus,

			isRegulated
		} = MajorValidator.omit({ unitSlug: true, unitId: true }).parse(body)

		const majorToUpdate = await prisma.major.findFirst({
			where: {
				id: id
			}
		})

		if (!majorToUpdate) {
			return new Response('Could not find major to update', { status: 404 })
		}

		const qualificationsConnect = qualifications.map(qualification => {
			return {
				id: qualification
			}
		})

		await prisma.major.update({
			where: {
				id: id
			},
			data: {
				qualifications: {
					set: []
				}
			}
		})

		await prisma.major.update({
			where: {
				id: id
			},
			data: {
				status: status,
				name: name,
				address: address,
				contact: contact,
				cost: cost,
				durationInHours: durationInHours,
				endDate: endDate,
				formOfStudy: formOfStudy,
				isOnline: !!isOnline,
				majorLevel: majorLevel,
				numberOfSemesters: numberOfSemesters,
				onlineDuration: onlineDuration,
				organisator: organisator,
				recruitmentConditions: recruitmentConditions,
				startDate: startDate,
				syllabus: syllabus,
				isRegulated: isRegulated,
				canPayInInstallments: !!canPayInInstallments,
				certificates: certificates,
				completionConditions: completionConditions,
				daysOfWeek: daysOfWeek,
				description: description,
				qualifications: {
					connect: qualificationsConnect
				}
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update this major, please try again.', { status: 500 })
	}
}
