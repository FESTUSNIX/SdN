import { QualificationValidator } from '@/lib/validators/qualification'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function GET(req: Request) {
	try {
		const qualifications = await prisma.qualification.findMany()

		return new Response(JSON.stringify(qualifications))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request data passed', { status: 422 })
		}

		return new Response('Could not fetch qualifications', { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const data = QualificationValidator.parse(body)

		const qualificationExists = !!(await prisma.qualification.findFirst({
			where: {
				name: data.name
			}
		}))

		if (qualificationExists) {
			return new Response('Qualification with this name already exists', { status: 409 })
		}

		const qualification = await prisma.qualification.create({
			data: {
				name: data.name,
				type: data.type,
				keywords: data.keywords
			}
		})

		return new Response(qualification.name)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}

		return new Response('Could not create a new qualification', { status: 500 })
	}
}

export async function PATCH(req: Request) {
	try {
		const body = await req.json()

		const { id, name, type, keywords } = QualificationValidator.parse(body)

		const qualificationExists = !!(await prisma.qualification.findFirst({
			where: {
				id: id
			}
		}))

		if (!qualificationExists) {
			return new Response('Could not find qualification to update', { status: 404 })
		}

		await prisma.qualification.update({
			where: {
				id: id
			},
			data: {
				name: name,
				type: type,
				keywords: keywords
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update this qualification, please try again.', { status: 500 })
	}
}
