import { H1, H2 } from '@/app/components/ui/Typography'
import { Skeleton } from '@/app/components/ui/skeleton'
import { getMajorSearchResults } from '@/lib/queries/major'
import { MajorLevel } from '@prisma/client'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { AdvancedSearchBar } from './components/AdvancedSearchBar'
import Filters from './components/Filters'
import ResetFilters from './components/Filters/components/ResetFilters'
import { FiltersDialog } from './components/FiltersDialog'
import ListTypeSelect from './components/ListTypeSelect/'
import { Pagination } from './components/Pagination'
import { Results } from './components/Results'
import Sort from './components/Sort'
import { TransitionLoadingProvider } from './context/TransitionLoadingContext'

export const metadata: Metadata = {
	title: 'Wyszukiwarka',
	description:
		'Znajdź kierunek studiów dla siebie - porównaj studia dla nauczycieli w Polsce, wybierz spośród tysięcy kierunków i uczelni.',
	openGraph: {
		title: 'Wyszukiwarka | Studia dla Nauczycieli',
		description:
			'Znajdź kierunek studiów dla siebie - porównaj studia dla nauczycieli w Polsce, wybierz spośród tysięcy kierunków i uczelni.'
	}
}

const SearchPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
	const searchQuery = searchParams.q?.toString().replace(/[\s\n\t]/g, '_')
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

	const units = searchParams.units
		?.toString()
		.split('.')
		.map(u => Number(u))

	const [orderByKey, orderByValue] = searchParams.sort?.toString().split('.') ?? []
	let orderBy: {
		[key: string]: string
	} = {}
	if (orderByKey && orderByValue) orderBy[orderByKey] = orderByValue

	const page = searchParams.page ?? '1'
	const per_page = searchParams.per_page ?? '30'

	const limit = typeof per_page === 'string' ? parseInt(per_page) : 30
	const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0

	const params = {
		canPayInInstallments: canPayInInstallments === 'true',
		cities,
		isOnline,
		isRegulated: isRegulated === 'true',
		limit,
		majorLevel,
		maxPrice,
		minPrice,
		offset,
		orderBy,
		qualifications,
		searchQuery,
		voivodeships,
		units
	}

	const listTypeParam =
		typeof searchParams.list_type === 'string' ? searchParams.list_type : searchParams.list_type?.[0]
	const listType = listTypeParam === 'list' ? 'list' : 'grid'

	const { data: majors, pagination } = await getMajorSearchResults(params)
	const pageCount = Math.ceil(pagination.total / limit)

	return (
		<main className='wrapper py-12'>
			<div className='mb-16'>
				<H1 size='sm'>Znajdź studia dla siebie</H1>
			</div>

			<TransitionLoadingProvider>
				<div className='flex gap-6'>
					<div className='relative hidden w-full max-w-xs shrink-0 xl:block'>
						<div className='sticky bottom-0 top-[calc(var(--nav-offset,_80px)+2rem)] max-h-[calc(100vh-var(--nav-offset,_80px)-4rem)] overflow-hidden rounded-lg border bg-background'>
							<div className='flex items-center justify-between border-b px-4 py-2'>
								<H2 className='pb-0' size='sm'>
									Filtry
								</H2>
								<div>
									<ResetFilters />
								</div>
							</div>

							<Suspense
								fallback={
									<Skeleton className='h-[calc(100vh-var(--nav-offset,_80px)-4rem-49px)] w-full rounded-none' />
								}>
								<Filters citiesParam={cities} voivodeshipsParam={voivodeships} />
							</Suspense>
						</div>
					</div>

					<div className='col-start-2 col-end-5 row-start-1 row-end-3 grow'>
						<section className='mb-12'>
							<div className='mb-4 flex items-center gap-2'>
								<Suspense>
									<AdvancedSearchBar placeholder={`Szukaj wśród ${pagination.total ?? 2568} wyników`} />
								</Suspense>
							</div>

							<div className='flex flex-wrap-reverse items-start justify-between gap-2'>
								<ListTypeSelect />

								<div className='flex items-center gap-2'>
									<Sort />
									<FiltersDialog citiesParam={cities} voivodeshipsParam={voivodeships} />
								</div>
							</div>
						</section>

						<Suspense fallback={<p>Loading majors...</p>}>
							<Results listType={listType} majors={majors} />
						</Suspense>

						<div className='mt-16'>
							<Suspense>
								<Pagination
									pageCount={pageCount}
									page={typeof page === 'string' ? page : page[0]}
									per_page={typeof per_page === 'string' ? per_page : per_page[0]}
								/>
							</Suspense>
						</div>
					</div>
				</div>
			</TransitionLoadingProvider>
		</main>
	)
}

export default SearchPage
