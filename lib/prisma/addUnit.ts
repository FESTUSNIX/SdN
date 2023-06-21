import { Unit, UnitAddress } from '@prisma/client'
import getBaseURL from '@/lib/utils/getBaseURL'

export async function addUnit(
	unitData: Omit<Unit, 'updatedAt' | 'id'> & { address: Omit<UnitAddress, 'id' | 'unitId'> }
) {
	const res = await fetch(`${getBaseURL()}/api/addUnit`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(unitData)
	})

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const data = await res.json()

	return data
}
