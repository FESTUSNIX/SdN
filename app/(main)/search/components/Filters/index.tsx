import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { H3 } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import { MajorLevel as MajorLevelObject } from '@prisma/client'
import CheckboxGroup from './components/CheckboxGroup'
import CityFilter from './components/City'
import PriceRange from './components/PriceRange'
import Qualifications from './components/Qualifications'
import SwitchFilter from './components/SwitchFilter'
import VoivodeshipFilter from './components/Voivodeship'
import UnitFilter from './components/UnitFilter'

type Props = {
	citiesParam: number[] | undefined
	voivodeshipsParam: number[] | undefined
	className?: string
}

const majorLevels: {
	value: string
	label: string
}[] = Object.keys(MajorLevelObject).map((key: string) => {
	return { value: key, label: majorLevelEnum[key as keyof typeof MajorLevelObject] }
})

const isOnlineOptions = [
	{
		value: 'true',
		label: 'Online'
	},
	{
		value: 'false',
		label: 'Stacjonarny'
	}
]

const Filters = async ({ citiesParam, voivodeshipsParam, className }: Props) => {
	const qualifications = await prisma.qualification.findMany({
		select: {
			id: true,
			name: true
		}
	})

	const cities = await prisma.city.findMany({
		where: {
			voivodeshipId: {
				in: voivodeshipsParam
			}
		},
		select: {
			id: true,
			name: true,
			voivodeshipId: true
		}
	})

	const voivodeships = await prisma.voivodeship.findMany({
		where: {
			cities: {
				some: {
					id: {
						in: citiesParam
					}
				}
			}
		},
		select: {
			id: true,
			name: true
		}
	})

	const units = await prisma.unit.findMany({
		select: {
			id: true,
			name: true
		}
	})

	return (
		<ScrollArea className={cn('h-[calc(100vh-var(--nav-offset,_80px)-4rem-49px)]', className)}>
			<div className='flex flex-col gap-10 px-4 py-6'>
				<CheckboxGroup items={majorLevels} paramName='major_level' label='Poziom' />

				<CheckboxGroup paramName='is_online' label='Tryb' items={isOnlineOptions} />

				<PriceRange />

				<Qualifications qualifications={qualifications} />

				<UnitFilter units={units} />

				<div className='space-y-2'>
					<VoivodeshipFilter voivodeships={voivodeships} />
					<CityFilter cities={cities} />
				</div>

				<div className='space-y-2.5'>
					<H3 size='sm' className='mb-3'>
						Dodatki
					</H3>
					<SwitchFilter paramName='is_regulated' label={'Zgodne z regulacjami'} />
					<SwitchFilter paramName='pay_in_installments' label={'Płatność na raty'} />
				</div>
			</div>
		</ScrollArea>
	)
}

export default Filters
