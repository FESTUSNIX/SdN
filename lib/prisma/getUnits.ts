import { Major, Unit } from '@prisma/client'
import getBaseURL from '../utils/getBaseURL'

import getURL from '../utils/getUrl'
import prisma from '@/prisma/client'

export async function getUnits() {
	// const res = await fetch(getURL(`/api/getUnits`), {
	// 	next: { tags: ['posts'] }
	// })

	// if (!res.ok) {
	// 	console.log(res)
	// 	throw new Error('Failed to fetch')
	// }

	// return res.json()

	try {
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

		return { units: data }
	} catch (error) {
		return { error }
	}
}
