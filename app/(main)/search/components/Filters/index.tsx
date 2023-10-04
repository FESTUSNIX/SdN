'use client'

import { H2 } from '@/app/components/ui/Typography'
import { majorLevelEnum } from '@/app/constants/majorLevelEnum'
import { MajorLevel as MajorLevelObject } from '@prisma/client'
import CheckboxGroup from './components/CheckboxGroup'
import PriceRange from './components/PriceRange'

type Props = {
	a: any
	b: any
}

const majorLevels: {
	value: string
	label: string
}[] = Object.keys(MajorLevelObject).map((key: string) => {
	return { value: key, label: majorLevelEnum[key as keyof typeof MajorLevelObject] }
})

const Filters = ({ a, b }: Props) => {
	return (
		<div className='sticky bottom-0 top-[calc(var(--nav-offset,_80px)+2rem)] rounded-lg border py-4'>
			<div className='border-b px-4 pb-4'>
				<H2 className='pb-0' size='sm'>
					Filtry
				</H2>
			</div>

			<div className='space-y-6 px-4'>
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
			</div>
		</div>
	)
}

export default Filters
