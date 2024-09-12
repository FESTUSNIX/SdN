'use client'

import { getVoivodeships } from '@/app/_actions'
import { FacetedSelect, FacetedSelectPlaceholder } from '@/app/components/Forms/FacetedSelect'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Props = {
	defaultValues?: string[]
}

export const VoiovodeshipFilter = ({ defaultValues }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const { data: voivodeships, isLoading } = useQuery({
		queryKey: ['voivodeships'],
		queryFn: async () => {
			const res = await getVoivodeships()

			const options = res.map(voivodeship => ({
				value: voivodeship.id.toString(),
				label: voivodeship.name
			}))

			return options
		},
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 20
	})

	const createQueryString = useCallback(
		(name: string, values: string[]) => {
			const params = new URLSearchParams(searchParams)

			if (values.length === 0) {
				params.delete(name)
			} else {
				params.set(name, values.join('.'))
			}

			return params.toString()
		},
		[searchParams]
	)

	const handleSelect = (values: string[]) => {
		router.push(pathname + '?' + createQueryString('voivodeship', values))
	}

	if (!isLoading && !voivodeships) return null

	return (
		<div>
			{isLoading ? (
				<FacetedSelectPlaceholder title='Województwo' />
			) : (
				<FacetedSelect
					title='Województwo'
					options={voivodeships}
					defaultValues={defaultValues}
					onChange={handleSelect}
				/>
			)}
		</div>
	)
}
