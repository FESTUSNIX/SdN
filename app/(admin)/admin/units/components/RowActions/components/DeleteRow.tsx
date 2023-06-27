'use client'

import { Button } from '@/app/components/ui/Button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/Dialog'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { TableUnitData } from '../../../page'
import { DialogItem } from './DialogItem'

type Props = {
	rowData: TableUnitData
}

const DeleteRow = ({ rowData }: Props) => {
	const { mutate: deleteRow } = useMutation({
		mutationFn: async () => {
			const payload = {
				id: rowData.id
			}

			const { data } = await axios.post('/api/unit/delete', payload)

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
			toast.success('Unit deleted successfully')
		}
	})

	return (
		<>
			<DialogItem
				dialogClassName='!border-destructive border'
				triggerChildren={
					<div className='hover:!bg-destructive hover:!text-destructive-foreground'>
						<Trash className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						<span>Delete unit</span>
					</div>
				}>
				<DialogHeader>
					<DialogTitle>Are you sure absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete this unit from our database.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant={'secondary'}>Cancel</Button>
					<Button
						variant={'destructive'}
						onClick={() => {
							deleteRow()
						}}>
						Delete
					</Button>
				</DialogFooter>
			</DialogItem>
		</>
	)
}

export default DeleteRow
