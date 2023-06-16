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
				majors: {
					select: {
						id: true,
						unitId: true,
						name: true
					}
				}
			}
		})

		return NextResponse.json(unit)
	} catch (error) {
		return NextResponse.json({ message: error })
	}
}
