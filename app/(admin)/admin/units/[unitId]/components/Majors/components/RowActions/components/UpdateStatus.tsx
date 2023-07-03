'use client'

import {
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger
} from '@/app/components/ui/ContextMenu'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Tags } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { MajorPayload } from '@/lib/validators/major'
import { Status } from '@prisma/client'
import { completionStatus } from '@/app/(admin)/admin/units/constants/tableData'

type Props = {
	rowData: MajorPayload
}

const UpdateStatus = ({ rowData }: Props) => {
	const router = useRouter()

	const { mutate: updateStatus } = useMutation({
		mutationFn: async (status: Status) => {
			const payload = {
				id: rowData.id,
				status
			}

			const { data } = await axios.patch('/api/unit/major/status', payload)

			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 422) {
					return toast.error('Invalid data')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: () => {
			toast.success('Updated status')
			router.refresh()
		}
	})

	return (
		<ContextMenuSub>
			<ContextMenuSubTrigger>
				<Tags className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
				Status
			</ContextMenuSubTrigger>
			<ContextMenuSubContent>
				<ContextMenuRadioGroup
					value={rowData.status}
					onValueChange={value => {
						updateStatus(value as 'FINISHED' | 'IN_PROGRESS')
					}}>
					{completionStatus.map(status => (
						<ContextMenuRadioItem key={status.value} value={status.value}>
							{status.label}
						</ContextMenuRadioItem>
					))}
				</ContextMenuRadioGroup>
			</ContextMenuSubContent>
		</ContextMenuSub>
	)
}

export default UpdateStatus
