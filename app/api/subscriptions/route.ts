import { SubscriptionValidator } from '@/lib/validators/subscription'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const { from, to, slug, type, unitId } = SubscriptionValidator.parse(body)

		const subscriptionExists = !!(await prisma.subscription.findFirst({
			where: {
				OR: [
					{
						from,
						to,
						type,
						unitId: parseInt(unitId)
					},
					{
						slug
					}
				]
			}
		}))

		if (subscriptionExists) {
			return new Response('This subscription already exists', { status: 409 })
		}

		const subscription = await prisma.subscription.create({
			data: {
				slug,
				from,
				to,
				type,
				unitId: parseInt(unitId)
			}
		})

		revalidatePath('/admin/subscriptions')

		return new Response(subscription.slug)
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

		const { from, slug, to, type, unitId } = SubscriptionValidator.parse(body)

		const subscriptionExists = !!(await prisma.subscription.findFirst({
			where: { slug: slug }
		}))

		if (!subscriptionExists) {
			return new Response('Could not find subscription to update', { status: 404 })
		}

		await prisma.subscription.update({
			where: { slug },
			data: {
				from,
				to,
				type,
				unitId: parseInt(unitId)
			}
		})

		return new Response('OK')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid PATCH request data passed', { status: 422 })
		}

		return new Response('Could not update this subscription, please try again.', { status: 500 })
	}
}
