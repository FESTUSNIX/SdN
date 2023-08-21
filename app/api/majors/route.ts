import { MajorValidator } from '@/lib/validators/major'
import prisma from '@/prisma/client'
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

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const data = MajorValidator.omit({ id: true }).parse(body)

		const qualificationsConnect = data.qualifications.map(qualification => {
			return {
				id: qualification
			}
		})

		const major = await prisma.major.create({
			data: {
				unitId: data.unitId,
				unitSlug: data.unitSlug,
				status: data.status,
				name: data.name,
				address: data.address,
				contact: data.contact,
				cost: data.cost,
				durationInHours: data.durationInHours,
				endDate: data.endDate,
				formOfStudy: data.formOfStudy,
				isOnline: !!data.isOnline,
				majorLevel: data.majorLevel,
				numberOfSemesters: data.numberOfSemesters,
				onlineDuration: data.onlineDuration,
				organisator: data.organisator,
				recruitmentConditions: data.recruitmentConditions,
				startDate: data.startDate,
				syllabus: data.syllabus,
				isRegulated: !!data.isRegulated,
				canPayInInstallments: !!data.canPayInInstallments,
				certificates: data.certificates,
				completionConditions: data.completionConditions,
				daysOfWeek: data.daysOfWeek,
				description: data.description,
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
