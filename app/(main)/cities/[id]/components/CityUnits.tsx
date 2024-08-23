import prisma from '@/prisma/client'
import { CityUnitsResults } from './CityUnitsResults'

type Props = {
	cityId: number
}

export const CityUnits = async ({ cityId }: Props) => {
	const units = await prisma.unit.findMany({
		where: {
			cityId: cityId
		},
		select: {
			id: true,
			slug: true,
			name: true,
			logo: true,
			isPublic: true,
			_count: {
				select: {
					majors: true
				}
			}
		}
	})

	return <CityUnitsResults units={units} />
}
