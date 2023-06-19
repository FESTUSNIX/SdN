import prisma from '@/prisma/client'
import { Unit, UnitAddress } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const body: Omit<Unit, 'updatedAt' | 'id'> & { address: Omit<UnitAddress, 'id' | 'unitId'> } = await request.json()

		const newUnit = await prisma.unit.create({
			data: {
				name: body.name,
				logo: body.logo,
				email: body.email,
				cityId: body.address.cityId,
				isPublic: body.isPublic,
				unitType: body.unitType,
				website: body.website,
				nip: body.nip,
				regon: body.regon,
				notes: body.notes,
				address: {
					create: {
						street: body.address.street,
						postalCode: body.address.postalCode,
						cityId: body.address.cityId
					}
				}
			}
		})

		return NextResponse.json(newUnit)
	} catch (error) {
		return NextResponse.json({ message: error })
	}
}
