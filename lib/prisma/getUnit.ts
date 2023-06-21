import { City, Major, Unit, Voivodeship } from '@prisma/client'
import getBaseURL from '../utils/getBaseURL'

export async function getUnit(id: number) {
	const res = await fetch(getBaseURL(`/api/getUnit?id=${id}`))

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const unit: Unit & {
		city: {
			id: number
			name: string
			voivodeship: Voivodeship
		}
		majors: {
			id: number
			name: string
			unitId: number
		}[]
		address: {
			id: number
			street: string
			city: City
			postalCode: string
		}
	} = await res.json()

	return unit
}
