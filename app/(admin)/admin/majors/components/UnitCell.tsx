import { buttonVariants } from '@/app/components/ui/Button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/app/components/ui/HoverCard'
import { cn } from '@/lib/utils/utils'
import { Unit } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'

type Props = {
	unitId: number
}

type CoreUnit = Pick<Unit, 'id' | 'name' | 'website' | 'unitType'>

const fetchUnit = async (unitId: number) => {
	const { data } = await axios.get(`/api/unit/coreData?id=${unitId}`)

	return data
}

const UnitCell = ({ unitId }: Props) => {
	const { data: unit } = useQuery<CoreUnit>(['unit', unitId], () => fetchUnit(unitId))

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Link
					target='_black'
					href={`/admin/units/${unitId}`}
					className={cn(buttonVariants({ variant: 'link' }), 'flex min-w-max justify-end')}>
					Unit {unitId}
				</Link>
			</HoverCardTrigger>
			<HoverCardContent className='w-fit max-w-xs'>
				<div className='flex flex-col'>
					<p className='text-xs font-medium text-foreground/70'>
						Unit {unit?.id} - {unit?.unitType}
					</p>
					<h3 className='mb-4 mt-2 text-sm'>{unit?.name}</h3>
					<h4 className='max-w-xs break-all text-sm text-foreground/80'>
						<Link href={unit?.website ?? ''}>{unit?.website}</Link>
					</h4>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}

export default UnitCell
