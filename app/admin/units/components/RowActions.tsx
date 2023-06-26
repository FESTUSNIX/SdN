import { Button } from '@/app/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/app/components/ui/DropdownMenu'
import { UnitPayload } from '@/lib/validators/unit'
import { useMutation } from '@tanstack/react-query'
import { Row } from '@tanstack/react-table'
import axios, { AxiosError } from 'axios'
import { ExternalLink, MoreHorizontal, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useFormContext } from '../hooks/useFormContext'
import { TableUnitData } from '../page'

type Props = {
	row: Row<TableUnitData>
}

export function RowActions({ row }: Props) {
	const unit: TableUnitData = row.original

	const { setOpenEdit, setEditDefaultValues } = useFormContext()

	const { mutate: openForm } = useMutation({
		mutationFn: async () => {
			const query = `/api/unit?id=${unit.id}`

			const { data } = await axios.get(query)

			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find this unit')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid unit data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			const values: UnitPayload = {
				id: data.id,
				name: data.name,
				logo: undefined as any,
				email: data.email,
				isPublic: data.isPublic,
				nip: data.nip ?? '',
				regon: data.regon ?? '',
				unitType: data.unitType,
				cityId: data.cityId,
				status: data.status,
				website: data.website,
				notes: data.notes ?? '',
				street: data.address?.street ?? '',
				postalCode: data.address?.postalCode ?? ''
			}

			setEditDefaultValues(values)

			setOpenEdit(true)
		}
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href={`/units/${unit.id}`} className='w-full flex items-center'>
						<ExternalLink className='mr-2 h-4 w-4' />
						Open page
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						openForm()
					}}>
					<Pencil className='mr-2 h-4 w-4' />
					Edit
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Trash className='mr-2 h-4 w-4' />
					<span>Delete unit</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default RowActions
