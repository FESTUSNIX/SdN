import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		const id = request.nextUrl.searchParams.get('id')

		const unit = await prisma.unit.findFirst({
			where: {
				id: Number(id) ?? undefined
			},
			include: {
				city: {
					select: {
						id: true,
						name: true,
						voivodeship: true
					}
				},
				majors: {
					select: {
						id: true,
						name: true
					}
				},
				address: {
					select: {
						id: true,
						street: true,
						city: true,
						postalCode: true
					}
				}
			}
		})

		return NextResponse.json(unit)
	} catch (error) {
		return NextResponse.json({ message: error })
	}
}
