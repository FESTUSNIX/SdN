import { H2 } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { MajorLevel as MajorLevelObject } from '@prisma/client'
import CheckboxGroup from './components/CheckboxGroup'
import PriceRange from './components/PriceRange'
import Qualifications from './components/Qualifications'
import prisma from '@/prisma/client'
import { X } from 'lucide-react'
import Link from 'next/link'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import ResetFilters from './components/ResetFilters'

type Props = {}

const majorLevels: {
	value: string
	label: string
}[] = Object.keys(MajorLevelObject).map((key: string) => {
	return { value: key, label: majorLevelEnum[key as keyof typeof MajorLevelObject] }
})

const Filters = async ({}: Props) => {
	const qualifications = await prisma.qualification.findMany({
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
				<div className='space-y-8 px-4 py-2'>
					<CheckboxGroup items={majorLevels} paramName='major_level' label='Poziom' />
					<CheckboxGroup
						paramName='is_online'
						label='Tryb'
						items={[
							{
								value: 'true',
								label: 'Online'
							},
							{
								value: 'false',
								label: 'Stacjonarny'
							}
						]}
					/>
					<PriceRange />
					<Qualifications qualifications={qualifications} />
				</div>
			</ScrollArea>
		</div>
	)
}

export default Filters
