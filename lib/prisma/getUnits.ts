import { City, Major, Unit } from '@prisma/client'

export async function getUnits() {
	const res = await fetch(`${process.env.BASE_URL ?? ''}/api/getUnits`, {
		next: {
			tags: ['units']
		}
	})

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const data: (Unit & { majors: Major[] } & { city: { id: number; name: string } })[] = await res.json()

	return data
}
