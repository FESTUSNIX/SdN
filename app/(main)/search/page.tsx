import { getMajorSearchResults } from '@/app/_actions/major'
import { H1 } from '@/app/components/ui/Typography'
import { MajorLevel } from '@prisma/client'
import Filters from './components/Filters'
import { Pagination } from './components/Pagination'
import Results from './components/Results'
import SearchBar from './components/SearchBar'
import Sort from './components/Sort'

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

	const [orderByKey, orderByValue] = searchParams.sort?.toString().split('.') ?? []
	let orderBy: {
		[key: string]: string
	} = {}
	orderBy[orderByKey] = orderByValue

	const page = searchParams.page ?? '1'
	const per_page = searchParams.per_page ?? '30'

	const limit = typeof per_page === 'string' ? parseInt(per_page) : 30
	const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0

	const { data: majors, pagination } = await getMajorSearchResults({
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
		voivodeships
	})

	const pageCount = Math.ceil(pagination.total / limit)

	return (
		<main className='wrapper py-12'>
			<div className='mb-16'>
				<H1 size='sm'>Znajdź studia dla siebie</H1>
			</div>

			<div className='grid grid-cols-4 gap-6'>
				<div className='relative col-start-1 col-end-2 row-start-1 row-end-3'>
					<Filters />
				</div>

				<div className='col-start-2 col-end-5 row-start-1 row-end-3'>
					<div className='mb-12'>
						<div className='mb-4'>
							<SearchBar />
						</div>

						<div className='flex items-center justify-between'>
							<div></div>

							<Sort />
						</div>
					</div>

					<div className=''>
						<Results majors={majors} />
					</div>

					<div className='mt-16'>
						<Pagination
							pageCount={pageCount}
							page={typeof page === 'string' ? page : page[0]}
							per_page={typeof per_page === 'string' ? per_page : per_page[0]}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}

export default SearchPage
