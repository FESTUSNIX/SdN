'use client'

import {
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger
} from '@/app/components/ui/context-menu'
import { WORK_STATUS_OPTIONS } from '@/app/constants/workStatusOptions'
import { MajorTablePayload } from '@/lib/validators/major'
import { WorkStatus } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Tags } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

type Props = {
	rowData: Pick<MajorTablePayload, 'id' | 'workStatus'>
}

const UpdateStatus = ({ rowData }: Props) => {
	const router = useRouter()

	const { mutate: updateStatus } = useMutation({
		mutationFn: async (status: WorkStatus) => {
			const payload = {
				status
			}

			const { data } = await axios.patch(`/api/majors/${rowData.id}/workStatus`, payload)

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
			toast.success('Updated work status')
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
					value={rowData.workStatus}
					onValueChange={value => {
						updateStatus(value as WorkStatus)
					}}>
					{WORK_STATUS_OPTIONS.map(status => (
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
