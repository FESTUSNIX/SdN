'use client'

import { Button } from '@/app/components/ui/Button'
import { Form } from '@/app/components/ui/Form'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Separator } from '@/app/components/ui/Separator/separator'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/Sheet'
import { H4, Muted } from '@/app/components/ui/Typography'
import { supabase } from '@/lib/supabase/supabase'
import { UnitPayload, UnitValidator } from '@/lib/validators/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import City from './components/elements/City'
import Email from './components/elements/Email'
import IsPublic from './components/elements/IsPublic'
import Logo from './components/elements/Logo'
import NIP from './components/elements/NIP'
import Name from './components/elements/Name'
import Notes from './components/elements/Notes'
import Regon from './components/elements/Regon'
import UnitType from './components/elements/UnitType'
import Website from './components/elements/Website'
import Address from './components/modules/Address'
import Status from './components/elements/Status'

type Props = {
	defaultValues?: UnitPayload
}

const UnitForm = ({ defaultValues }: Props) => {
	const form = useForm<UnitPayload>({
		resolver: zodResolver(UnitValidator),
		defaultValues: defaultValues ?? {
			name: '',
			logo: undefined as any,
			email: '',
			isPublic: true,
			nip: '',
			regon: '',
			unitType: 'uczelnia',
			otherUnitType: '',
			website: '',
			street: '',
			postalCode: '',
			cityId: 0,
			notes: '',
			status: 'IN_PROGRESS'
		}
	})

	const uploadImageToSupabase = async (logo: File) => {
		const filename = `${uuidv4()}-${logo.name}`

		const { data, error } = await supabase.storage.from('unit_logos').upload(`${filename}`, logo, {
			cacheControl: '36000',
			upsert: false
		})

		if (error) throw new Error(error.message)

		return data?.path
	}

	const { mutate: createUnit, isLoading } = useMutation({
		mutationFn: async (values: UnitPayload) => {
			toast.loading('Adding a unit...')

			const filepath = await uploadImageToSupabase(values.logo)

			const payload = {
				name: values.name,
				logo: filepath,
				isPublic: values.isPublic,
				email: values.email,
				nip: values.nip ?? undefined,
				cityId: values.cityId,
				regon: values.regon ?? undefined,
				unitType: values.unitType !== 'inna' ? values.unitType : values.otherUnitType!,
				website: values.website,
				notes: values.notes ?? undefined,
				street: values.street,
				postalCode: values.postalCode,
				status: values.status
			}

			const { data } = await axios.post('/api/unit', payload)

			return data
		},
		onError: err => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast.error('Subreddit already exists')
				}

				if (err.response?.status === 422) {
					return toast.error('Invalid subreddit name')
				}
			}

			return toast.error('Something went wrong.')
		},
		onSuccess: data => {
			toast.success('Added a new unit.')
			form.reset()
		}
	})

	useEffect(() => {
		if (form.getValues().unitType === 'inna') {
			form.reset({ ...form.getValues(), otherUnitType: undefined })
			form.unregister(['otherUnitType'])
		} else {
			form.register('otherUnitType', { required: true })
		}
	}, [form.getValues().unitType])

	return (
		<Sheet
			onOpenChange={open => {
				console.log(open)
			}}>
			<SheetTrigger asChild>
				<Button>New Unit</Button>
			</SheetTrigger>

			<SheetContent side={'right'} className='p-0 max-w-xl w-screen flex flex-col gap-0 sm:min-w-[500px]'>
				<SheetHeader className='px-6 py-4 border-b'>
					<SheetTitle>Add new Unit</SheetTitle>
				</SheetHeader>

				<ScrollArea className='h-full'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(e => createUnit(e))} className='py-4'>
							<div className='px-6 space-y-8 '>
								<Name form={form} />

								<Email form={form} />

								<UnitType form={form} />

								<City form={form} />

								<Website form={form} />

								<Logo form={form} />

								<IsPublic form={form} />

								<Address form={form} />

								<Status form={form} />
							</div>

							<Separator className='my-12' />

							<div className='px-6 space-y-8'>
								<div>
									<H4>Optional</H4>
									<Muted>These fields are optional and can be filled later</Muted>
								</div>

								<NIP form={form} />

								<Regon form={form} />

								<Notes form={form} />
							</div>
						</form>
					</Form>
				</ScrollArea>

				<SheetFooter className='px-6 py-4 border-t gap-4 flex-row justify-end'>
					<Button variant={'secondary'}>Cancel</Button>

					{isLoading ? (
						<Button type='submit' disabled>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Adding...
						</Button>
					) : (
						<Button type='submit' onClick={form.handleSubmit(e => createUnit(e))}>
							Add unit
						</Button>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default UnitForm
