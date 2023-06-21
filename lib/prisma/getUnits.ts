import { Major, Unit } from '@prisma/client'
import getBaseURL from '../utils/getBaseURL'

import getURL from '../utils/getUrl'

export async function getUnits() {
	const res = await fetch(getURL(`/api/getUnits`), {
		next: { tags: ['posts'] }
	})

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	return res.json()
}
