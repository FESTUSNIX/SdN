import { Major, Unit } from '@prisma/client'

export async function getUnit(id: number) {
	const res = await fetch(`${process.env.BASE_URL ?? ''}/api/getUnit?id=${id}`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const unit: Unit & {
		city: {
			select: {
				id: true
				name: true
				voivodeship: true
			}
		}
		majors: {
			select: {
				id: true
				name: true
			}
		}
		address: {
			select: {
				id: true
				street: true
				city: true
				postalCode: true
			}
		}
	} = await res.json()

	return unit
}
