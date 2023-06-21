import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

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
		console.log(error, 'ERROR_MESSAGES')
		return new NextResponse('Error', { status: 500 })
	}
}
