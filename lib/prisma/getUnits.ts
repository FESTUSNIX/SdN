import { Major, Unit } from '@prisma/client'
import { getBaseUrl } from '../utils/getBaseUrl'

export const getUnits = async () => {
	const res = await fetch(`${getBaseUrl()}/api/getUnits`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const data: (Unit & { majors: Major[] } & { city: { id: number; name: string } })[] = await res.json()

	return data
}
