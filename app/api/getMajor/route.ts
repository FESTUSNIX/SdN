import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		const id = request.nextUrl.searchParams.get('id')

		const major = await prisma.major.findFirst({
			where: {
				id: Number(id) ?? undefined
			},
			include: {
				qualifications: {
					include: {
						qualification: true
					}
				}
			}
		})
		const result = { ...major, qualifications: major?.qualifications.map(q => q.qualification) }

		return NextResponse.json(result)
	} catch (error) {
		return NextResponse.json({ error: error })
	}
}
