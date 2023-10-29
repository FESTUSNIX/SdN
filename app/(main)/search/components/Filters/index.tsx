import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { H2, H3 } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevel'
import prisma from '@/prisma/client'
import { MajorLevel as MajorLevelObject } from '@prisma/client'
import CheckboxGroup from './components/CheckboxGroup'
import CityFilter from './components/City'
import PriceRange from './components/PriceRange'
import Qualifications from './components/Qualifications'
import ResetFilters from './components/ResetFilters'
import SwitchFilter from './components/SwitchFilter'
import VoivodeshipFilter from './components/Voivodeship'

type Props = {
	citiesParam: number[] | undefined
	voivodeshipsParam: number[] | undefined
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

const Filters = async ({ citiesParam, voivodeshipsParam }: Props) => {
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

	return (
		<div className='sticky bottom-0 top-[calc(var(--nav-offset,_80px)+2rem)] max-h-[calc(100vh-var(--nav-offset,_80px)-4rem)] overflow-hidden rounded-lg border'>
			<div className='flex items-center justify-between border-b px-4 py-2'>
				<H2 className='pb-0' size='sm'>
					Filtry
				</H2>
				<div>
					<ResetFilters />
				</div>
			</div>

			<ScrollArea className='h-[calc(100vh-var(--nav-offset,_80px)-4rem-49px)]'>
				<div className='flex flex-col gap-10 px-4 py-6'>
					<CheckboxGroup items={majorLevels} paramName='major_level' label='Poziom' />

					<CheckboxGroup paramName='is_online' label='Tryb' items={isOnlineOptions} />

					<PriceRange />

					<Qualifications qualifications={qualifications} />

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
		</div>
	)
}

export default Filters
