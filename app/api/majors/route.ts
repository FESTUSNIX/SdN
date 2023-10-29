import { getAuthSession } from '@/lib/auth/auth'
import { MajorValidator } from '@/lib/validators/major'
import prisma from '@/prisma/client'
import { createId } from '@paralleldrive/cuid2'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
	try {
		const majors = await prisma.major.findMany({
			select: {
				id: true,
				name: true,
				majorLevel: true,
				unitSlug: true
			}
		})

		if (!majors) return new Response('Majors not found', { status: 404 })

		return new Response(JSON.stringify(majors))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not fetch majors', { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const session = await getAuthSession()
		if (!session) {
			return new Response('Not authenticated', { status: 401 })
		}

		const body = await req.json()

		const data = MajorValidator.omit({ id: true, unitSlug: true }).partial({ status: true }).parse(body)

		const unit = await prisma.unit.findUnique({
			where: {
				id: data.unitId
			},
			select: {
				slug: true,
				managers: {
					select: {
						id: true
					}
				}
			}
		})

		if (!unit) return new Response('Unit not found', { status: 404 })

		if (!(session.user.role === 'ADMIN' || unit.managers.some(m => m.id === session.user.id))) {
			return new Response('Not authenticated', { status: 403 })
		}

		const lastMajor = await prisma.major.findFirst({
			orderBy: {
				id: 'desc'
			},
			select: {
				id: true
			}
		})
		if (!lastMajor) return new Response('Could not create a new major', { status: 500 })

		const qualificationsIds = data.qualifications.map(qualification => {
			return {
				id: qualification
			}
		})

		const slug = createId()

		const major = await prisma.major.create({
			data: {
				id: lastMajor.id + 1,
				slug: slug,
				unitId: data.unitId,
				unitSlug: unit.slug,
				status: data.status ?? 'IN_PROGRESS',
				name: data.name,
				address: data.address || '',
				contact: data.contact || '',
				cost: data.cost,
				durationInHours: data.durationInHours,
				endDate: data.endDate,
				formOfStudy: data.formOfStudy || '',
				isOnline: !!data.isOnline,
				majorLevel: data.majorLevel,
				numberOfSemesters: data.numberOfSemesters,
				onlineDuration: data.onlineDuration,
				organisator: data.organisator || '',
				recruitmentConditions: data.recruitmentConditions || [],
				startDate: data.startDate,
				syllabus: data.syllabus || [],
				isRegulated: !!data.isRegulated,
				canPayInInstallments: !!data.canPayInInstallments,
				certificates: data.certificates || '',
				completionConditions: data.completionConditions || [],
				daysOfWeek: data.daysOfWeek,
				description: data.description || [],
				qualifications: {
					connect: qualificationsIds
				}
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create a new major', { status: 500 })
	}
}
