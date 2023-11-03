import { Button } from '@/app/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/Dialog'
import { SlidersHorizontal } from 'lucide-react'
import Filters from './Filters'
import ResetFilters from './Filters/components/ResetFilters'

type Props = {
	citiesParam: number[] | undefined
	voivodeshipsParam: number[] | undefined
}

export const FiltersDialog = ({ citiesParam, voivodeshipsParam }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={'outline'}
					className='flex h-9 items-center gap-2 rounded-full font-normal max-sm:w-9 max-sm:p-0 xl:hidden'>
					<SlidersHorizontal className='h-4 w-4' />
					<span className='max-sm:sr-only'>Filtry</span>
				</Button>
			</DialogTrigger>

			<DialogContent className='max-sm:h-full xl:hidden' overlayClassName='xl:hidden'>
				<DialogHeader className='items-center gap-y-1.5 space-y-0 sm:flex-row sm:gap-4'>
					<DialogTitle>Filtry</DialogTitle>
					<ResetFilters />
				</DialogHeader>

				<Filters citiesParam={citiesParam} voivodeshipsParam={voivodeshipsParam} />
			</DialogContent>
		</Dialog>
	)
}
