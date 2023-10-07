import { H1 } from '@/app/components/ui/Typography'
import prisma from '@/prisma/client'
import { MajorLevel } from '@prisma/client'
import Filters from './components/Filters'
import Results from './components/Results'
import SearchBar from './components/SearchBar'

const majorDataSelect = {
	slug: true,
	name: true,
	isOnline: true,
	majorLevel: true,
	qualifications: {
		select: {
			name: true,
			slug: true
		}
	},
	cost: true,
	unit: {
		select: {
			name: true
		}
	}
}

const SearchPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
	let majors
	const searchQuery = searchParams.q?.toString().replace(/[\s\n\t]/g, '_') ?? ''
	const majorLevel = searchParams.major_level as MajorLevel[] | MajorLevel | undefined
	const isOnline = searchParams.is_online === undefined ? undefined : searchParams.is_online === 'true'

	const priceRange = searchParams.price_range?.toString()
	const [minPrice, maxPrice] = priceRange?.split('-') ?? []

	const qualifications = searchParams.qualifications
		?.toString()
		.split('.')
		.map(q => Number(q))

	const isRegulated = searchParams.is_regulated
	const canPayInInstallments = searchParams.pay_in_installments

	const cities = searchParams.cities
		?.toString()
		.split('.')
		.map(c => Number(c))

	const voivodeships = searchParams.voivodeship
		?.toString()
		.split('.')
		.map(v => Number(v))

	if (
		!searchQuery &&
		!majorLevel?.length &&
		isOnline === undefined &&
		!priceRange &&
		!qualifications &&
		!isRegulated &&
		!isOnline &&
		!cities?.length &&
		!voivodeships?.length
	) {
		majors = await prisma.major.findMany({
			select: majorDataSelect,
			take: 20
		})
	}

	if (
		searchQuery?.length ||
		majorLevel?.length ||
		isOnline !== undefined ||
		priceRange ||
		qualifications ||
		isRegulated ||
		isOnline ||
		cities ||
		voivodeships
	) {
		majors = await prisma.major.findMany({
			where: {
				majorLevel: {
					in: typeof majorLevel === 'string' ? [majorLevel] : majorLevel
				},
				isOnline: isOnline,
				OR: [
					{
						name: {
							contains: searchQuery,
							mode: 'insensitive'
						}
					},
					{
						unit: {
							name: {
								contains: searchQuery,
								mode: 'insensitive'
							}
						}
					}
				],
				AND: {
					OR: [
						{
							cost: null
						},
						{
							cost: {
								gte: typeof minPrice === 'string' ? Number(minPrice) : undefined,
								lte: typeof maxPrice === 'string' ? Number(maxPrice) : undefined
							}
						}
					]
				},
				qualifications: {
					some: {
						id: {
							in: qualifications
						}
					}
				},
				isRegulated: isRegulated === 'true' ? true : undefined,
				canPayInInstallments: canPayInInstallments === 'true' ? true : undefined,
				unit: {
					city: {
						id: {
							in: cities
						},
						voivodeship: {
							id: {
								in: voivodeships
							}
						}
					}
				}
			},
			select: majorDataSelect,
			take: 20
		})
	}

	return (
		<main className='wrapper py-12'>
			<div className='mb-16'>
				<H1 size='sm'>Znajdź studia dla siebie</H1>
			</div>

			<div className='grid grid-cols-4 grid-rows-[60px_auto] gap-6'>
				<div className='relative col-start-1 col-end-2 row-start-1 row-end-3'>
					<Filters />
				</div>

				<div className='col-start-2 col-end-5 row-start-1 row-end-2'>
					<SearchBar />
				</div>

				<div className='col-span-full col-start-2 row-start-2'>
					<Results majors={majors} />
				</div>
			</div>
		</main>
	)
}

export default SearchPage
