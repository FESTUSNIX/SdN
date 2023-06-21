import { City, Major, Unit } from '@prisma/client'
import getBaseURL from '../utils/getBaseURL'

export const getCities = async () => {
	const res = await fetch(`${getBaseURL()}/api/getCities`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const data: City[] = await res.json()

	return data
}
