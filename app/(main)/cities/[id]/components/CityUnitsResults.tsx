'use client'

import { PlaceholderImage } from '@/app/components/PlaceholderImage'
import { Input } from '@/app/components/ui/input'
import { H3 } from '@/app/components/ui/Typography'
import { urlFor } from '@/lib/supabase/getUrlFor'
import { Unit } from '@prisma/client'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
	units: (Pick<Unit, 'id' | 'name' | 'logo' | 'slug'> & {
		_count: {
			majors: number
		}
	})[]
}

export const CityUnitsResults = ({ units }: Props) => {
	const [query, setQuery] = useState('')
	const [filteredUnits, setFilteredUnits] = useState(units)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		setQuery(query)

		setFilteredUnits(units.filter(unit => unit.name.toLowerCase().includes(query.trim().toLowerCase())))
	}

	return (
		<div>
			<div className='relative mb-8 grow'>
				<SearchIcon className='pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 select-none text-muted-foreground' />
				<Input
					placeholder={`Szukaj`}
					value={query}
					onChange={handleSearch}
					className='h-auto rounded-full py-4 pl-12 pr-6'
				/>
			</div>

			<div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
				{filteredUnits.map(unit => (
					<Link
						href={`/units/${unit.slug}`}
						key={unit.id}
						className='flex gap-4 rounded-lg border p-2 duration-300 hover:shadow-sm dark:hover:border-foreground/25 max-md:flex-wrap'>
						<div className='size-24 shrink-0 overflow-hidden rounded-md border'>
							{unit.logo ? (
								<Image
									src={urlFor('units', unit.logo).publicUrl}
									alt={`Logo ${unit.name}`}
									width={200}
									height={200}
									className='h-full w-full object-cover'
								/>
							) : (
								<PlaceholderImage className='h-full w-full rounded-none border-none' />
							)}
						</div>

						<div>
							<H3 className='min-w-48 max-w-sm text-pretty'>{unit.name}</H3>
							<span className='text-sm text-muted-foreground'>{unit._count.majors} kierunków</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
