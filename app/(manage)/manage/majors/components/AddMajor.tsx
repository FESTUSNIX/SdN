'use client'

import { Button } from '@/app/components/ui/Button'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/Sheet'
import { MajorFormType, MajorPayload, MajorValidator } from '@/lib/validators/major'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { format } from 'date-fns'
import { Loader2, Plus } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import MajorForm from './MajorForm'

type Props = {
	unitId: number
}

type AddMajorPayload = Omit<MajorPayload, 'status' | 'id' | 'unitSlug'>

const AddMajor = ({ unitId }: Props) => {
	const [open, setOpen] = useState(false)

	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const form = useForm<AddMajorPayload>({
		resolver: zodResolver(MajorValidator.omit({ unitId: true, unitSlug: true, id: true, status: true })),
		defaultValues: {
			name: '',
			majorLevel: 'PODYPLOMOWE',
			address: '',
			canPayInInstallments: false,
			certificates: '',
			completionConditions: [],
			description: [],
			contact: '',
			cost: null,
			daysOfWeek: [],
			durationInHours: null,
			startDate: null,
			endDate: null,
			formOfStudy: '',
			isOnline: false,
			isRegulated: true,
			numberOfSemesters: null,
			onlineDuration: null,
			organisator: '',
			qualifications: [],
			recruitmentConditions: [],
			syllabus: []
		}
	})

	const { mutate: createMajor, isLoading } = useMutation({
		mutationFn: async (values: AddMajorPayload) => {
			toast.loading('Trwa dodawanie kierunku...')

			const payload: AddMajorPayload = {
				name: values.name,
				majorLevel: values.majorLevel,
				address: values.address,
				canPayInInstallments: values.canPayInInstallments,
				certificates: values.certificates,
				completionConditions: values.completionConditions,
				contact: values.contact,
				cost: values.cost,
				daysOfWeek: values.daysOfWeek,
				description: values.description,
				durationInHours: values.durationInHours,
				endDate: values.endDate ? new Date(format(values.endDate, 'yyyy-MM-dd')) : null,
				startDate: values.startDate ? new Date(format(values.startDate, 'yyyy-MM-dd')) : null,
				formOfStudy: values.formOfStudy,
				isOnline: values.isOnline,
				numberOfSemesters: values.numberOfSemesters,
				onlineDuration: values.onlineDuration,
				organisator: values.organisator,
				qualifications: values.qualifications,
				recruitmentConditions: values.recruitmentConditions,
				syllabus: values.syllabus,
				isRegulated: values.isRegulated,
				unitId: unitId
			}

			const { data } = await axios.post('/api/majors', payload)
			return data
		},
		onError: err => {
			toast.dismiss()

			if (err instanceof AxiosError) {
				if (err.response?.status === 404) {
					return toast.error('Nie odnaleziono jednostki')
				}

				if (err.response?.status === 403) {
					return toast.error('Nie posiadasz wystarczających uprawnień')
				}

				if (err.response?.status === 422) {
					return toast.error('Nie poprawne dane')
				}
			}

			return toast.error('Coś poszło nie tak')
		},
		onSuccess: data => {
			toast.dismiss()

			toast.success('Poymślnie dodano nowy kierunek')

			const {} = axios.get('/api/revalidate?path=/manage/majors')

			router.refresh()

			setOpen(false)
			form.reset()
		}
	})

	useEffect(() => {
		setOpen(false)
	}, [pathname, searchParams])

	return (
		<div>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button className='rounded-full'>
						<Plus className='mr-2 h-4 w-4' />
						<span>Dodaj kierunek</span>
					</Button>
				</SheetTrigger>
				<SheetContent className='flex w-screen max-w-xl flex-col gap-0 p-0 sm:min-w-[500px]'>
					<SheetHeader className='border-b px-6 py-4'>
						<SheetTitle>Dodaj nowy kierunek</SheetTitle>
					</SheetHeader>

					<ScrollArea className='h-full'>
						<MajorForm form={form as unknown as MajorFormType} onSubmit={e => createMajor(e)} />
					</ScrollArea>

					<SheetFooter className='flex-row justify-end gap-4 border-t px-6 py-4'>
						<Button variant={'ghost'} type='button' disabled={isLoading} onClick={() => setOpen(false)}>
							Anuluj
						</Button>
						<Button type='submit' form='major-form' disabled={isLoading}>
							{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							{isLoading ? 'Dodawanie kierunku' : 'Dodaj kierunek'}
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default AddMajor
