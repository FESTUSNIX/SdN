import { City, Major, Unit } from '@prisma/client'
import { getBaseUrl } from '../utils/getBaseUrl'

export const getCities = async () => {
	const res = await fetch(`${getBaseUrl() ?? ''}/api/getCities`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const data: City[] = await res.json()

	return data
}
