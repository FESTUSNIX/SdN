import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const data = await prisma.unit.findMany({
		include: {
			majors: {
				select: {
					id: true,
					unitId: true,
					name: true
				}
			},
			city: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	return NextResponse.json(data)
}
