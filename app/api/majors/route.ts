import { MajorValidator } from '@/lib/validators/major'
import prisma from '@/prisma/client'
import { createId } from '@paralleldrive/cuid2'
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

		const unit = await prisma.unit.findUnique({
			where: {
				id: unitId
			},
			select: {
				slug: true
			}
		})

		if (!unit) return new Response('Unit not found', { status: 404 })

		const lastMajor = await prisma.major.findFirst({
			orderBy: {
				id: 'desc'
			},
			select: {
				id: true
			}
		})

		if (!lastMajor) return new Response('Could not create a new major', { status: 500 })

		const qualificationsIds = qualifications.map(qualification => {
			return {
				id: qualification
			}
		})

		const slug = createId()

		const major = await prisma.major.create({
			data: {
				id: lastMajor.id + 1,
				slug: slug,
				unitId: unitId,
				unitSlug: unit.slug,
				status: status,
				name: name,
				address: address || '',
				contact: contact || '',
				cost: cost,
				durationInHours: durationInHours,
				endDate: endDate,
				formOfStudy: formOfStudy || '',
				isOnline: !!isOnline,
				majorLevel: majorLevel,
				numberOfSemesters: numberOfSemesters,
				onlineDuration: onlineDuration,
				organisator: organisator || '',
				recruitmentConditions: recruitmentConditions || [],
				startDate: startDate,
				syllabus: syllabus || [],
				isRegulated: !!isRegulated,
				canPayInInstallments: !!canPayInInstallments,
				certificates: certificates || '',
				completionConditions: completionConditions || [],
				daysOfWeek: daysOfWeek,
				description: description || [],
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
