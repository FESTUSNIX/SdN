import { getAuthSession } from '@/lib/auth/auth'
import { MajorValidator } from '@/lib/validators/major'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function GET(req: Request, { params }: { params: { majorId: string } }) {
	try {
		const id = parseInt(params.majorId)

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

export async function DELETE(req: Request, { params }: { params: { majorId: string } }) {
	try {
		const { searchParams } = new URL(req.url)
		const revalidate = searchParams.get('revalidate')

		const session = await getAuthSession()
		if (!session) {
			return new Response('Not authenticated', { status: 401 })
		}

		const id = parseInt(params.majorId)

		const majorToDelete = await prisma.major.findFirst({
			where: {
				id: id
			},
			select: {
				unit: {
					select: {
						managers: {
							select: {
								id: true
							}
						}
					}
				}
			}
		})

		if (!majorToDelete) {
			return new Response('Could not find major to delete', { status: 404 })
		}

		if (!(session.user.role === 'ADMIN' || majorToDelete.unit.managers.some(m => m.id === session.user.id))) {
			return new Response('Not authenticated', { status: 403 })
		}

		await prisma.major.delete({
			where: {
				id: id
			}
		})

		revalidate && revalidatePath(revalidate)

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid DELETE request data passed', { status: 422 })
		}

		return new Response('Could not delete this major, please try again.', { status: 500 })
	}
}

export async function PATCH(req: Request, { params }: { params: { majorId: string } }) {
	try {
		const id = parseInt(params.majorId)

		const session = await getAuthSession()
		if (!session) {
			return new Response('Not authenticated', { status: 401 })
		}

		const majorToUpdate = await prisma.major.findFirst({
			where: {
				id: id
			},
			select: {
				unit: {
					select: {
						managers: {
							select: {
								id: true
							}
						}
					}
				}
			}
		})

		if (!majorToUpdate) {
			return new Response('Could not find major to update', { status: 404 })
		}

		if (!(session.user.role === 'ADMIN' || majorToUpdate.unit.managers.some(m => m.id === session.user.id))) {
			return new Response('Not authenticated', { status: 403 })
		}

		const body = await req.json()

		const {
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
			workStatus,
			syllabus,
			isRegulated,
			keywords
		} = MajorValidator.omit({ unitSlug: true, unitId: true }).partial().parse(body)

		let qualificationsConnect

		if (qualifications) {
			qualificationsConnect = qualifications.map(qualification => {
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
		}

		await prisma.major.update({
			where: {
				id: id
			},
			data: {
				workStatus: workStatus,
				name: name,
				address: address,
				contact: contact,
				cost: cost,
				durationInHours: durationInHours,
				endDate: endDate,
				formOfStudy: formOfStudy,
				isOnline: isOnline,
				majorLevel: majorLevel,
				numberOfSemesters: numberOfSemesters,
				onlineDuration: onlineDuration,
				organisator: organisator,
				recruitmentConditions: recruitmentConditions,
				startDate: startDate,
				syllabus: syllabus,
				isRegulated: isRegulated,
				canPayInInstallments: canPayInInstallments,
				certificates: certificates,
				completionConditions: completionConditions,
				daysOfWeek: daysOfWeek,
				description: description,
				qualifications: {
					connect: qualificationsConnect
				},
				keywords: keywords === null ? undefined : keywords
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
