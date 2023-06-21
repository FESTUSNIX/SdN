import { Major, Unit } from '@prisma/client'
import getBaseURL from '../utils/getBaseURL'

export const getUnits = async () => {
	const res = await fetch(`${getBaseURL()}/api/getUnits`)
	console.log(`GET_UNITS === ${getBaseURL()}/api/getUnits`)
	console.log('RES MESSAGE - units', (res as any).message)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const data: (Unit & { majors: Major[] } & { city: { id: number; name: string } })[] = await res.json()
	console.log('DATA-UNITS', data)
	return data
}
