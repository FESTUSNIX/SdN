import { getMajorSearchResults } from '@/app/_actions/major'
import MajorCard from '@/app/components/Majors/Card'
import MajorsGrid from '@/app/components/Majors/Grid'
import { H1, H2, H3 } from '@/app/components/ui/Typography'
import { Skeleton } from '@/app/components/ui/skeleton'
import { MajorLevel } from '@prisma/client'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { ResultsLoading } from '../../components/Majors/ResultsLoading'
import { AdvancedSearchBar } from './components/AdvancedSearchBar'
import Filters from './components/Filters'
import ResetFilters from './components/Filters/components/ResetFilters'
import { FiltersDialog } from './components/FiltersDialog'
import ListTypeSelect from './components/ListTypeSelect/'
import { Pagination } from './components/Pagination'
import Sort from './components/Sort'
import { TransitionLoadingProvider } from './context/TransitionLoadingContext'
import { SearchParamsChangeHandler } from './components/SearchParamsChangeHandler'

export const metadata: Metadata = {
	title: 'Szukaj kierunku'
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
	orderBy[orderByKey] = orderByValue

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

	const { data: majors, pagination } = await getMajorSearchResults(params)

	const pageCount = Math.ceil(pagination.total / limit)

	const listTypeParam =
		typeof searchParams.list_type === 'string' ? searchParams.list_type : searchParams.list_type?.[0]
	const listType = listTypeParam === 'grid' ? 'grid' : 'list'

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
						<div className='mb-12'>
							<div className='mb-4 flex items-center gap-2'>
								<AdvancedSearchBar placeholder={`Szukaj wśród ${pagination.total ?? 2568} wyników`} />
							</div>

							<div className='flex flex-wrap-reverse items-start justify-between gap-2'>
								<ListTypeSelect />

								<div className='flex items-center gap-2'>
									<Sort />
									<FiltersDialog citiesParam={cities} voivodeshipsParam={voivodeships} />
								</div>
							</div>
						</div>

						<div className=''>
							<ResultsLoading listType={listType}>
								<MajorsGrid listType={listType}>
									{majors &&
										majors.length > 0 &&
										majors?.map(major => (
											<MajorCard
												key={major.slug}
												data={{
													name: major.name,
													slug: major.slug,
													isOnline: major.isOnline,
													majorLevel: major.majorLevel,
													qualifications: major.qualifications,
													unit: major.unit
												}}
												type={listType}
											/>
										))}
								</MajorsGrid>
							</ResultsLoading>
						</div>

						{!majors.length && (
							<div className='mx-auto py-4 text-center'>
								<H3>Nie udało się odnaleźć kierunku z podanymi kryteriami</H3>
								<p className='text-muted-foreground'>Usuń wybrane filtry aby przywrócić wszystkie wyniki</p>
							</div>
						)}

						{majors.length > 0 && (
							<div className='mt-16'>
								<Pagination
									pageCount={pageCount}
									page={typeof page === 'string' ? page : page[0]}
									per_page={typeof per_page === 'string' ? per_page : per_page[0]}
								/>
							</div>
						)}
					</div>
				</div>
				{/* <SearchParamsChangeHandler
					params={{
						...params,
						page: typeof page === 'string' ? page : page[0]
					}}
				/> */}
			</TransitionLoadingProvider>
		</main>
	)
}

export default SearchPage
