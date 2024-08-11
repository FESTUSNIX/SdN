'use client'

import { Button } from '@/app/components/ui/Button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { DialogItem } from '@/app/components/DialogItem'
import { useState } from 'react'

type Props = {
	apiQuery: string
}

const DeleteRow = ({ apiQuery }: Props) => {
	const [openDialog, setOpenDialog] = useState(false)

	const { mutate: deleteRow } = useMutation({
		mutationFn: async () => {
			const { data } = await axios.delete(apiQuery)

			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Could not find this row')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid row data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.success('Row deleted successfully')
			setOpenDialog(false)
		}
	})

	return (
		<>
			<DialogItem
				open={openDialog}
				onOpenChange={setOpenDialog}
				dialogClassName='!border-destructive border'
				triggerChildren={
					<div className='hover:!bg-destructive hover:!text-destructive-foreground'>
						<Trash className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
						<span>Delete row</span>
					</div>
				}>
				<DialogHeader>
					<DialogTitle>Are you sure absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete this row from our database.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant={'secondary'} onClick={() => setOpenDialog(false)}>
						Cancel
					</Button>
					<Button
						variant={'destructive'}
						onClick={() => {
							deleteRow()
						}}>
						Delete row
					</Button>
				</DialogFooter>
			</DialogItem>
		</>
	)
}

export default DeleteRow
