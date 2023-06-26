'use client'

import { Button } from '@/app/components/ui/Button'
import { Form } from '@/app/components/ui/Form'
import { ScrollArea } from '@/app/components/ui/ScrollArea'
import { Separator } from '@/app/components/ui/Separator/separator'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/app/components/ui/Sheet'
import { H4, Muted } from '@/app/components/ui/Typography'
import { UnitPayload, form } from '@/lib/validators/unit'
import { Loader2 } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import City from './components/elements/City'
import Email from './components/elements/Email'
import IsPublic from './components/elements/IsPublic'
import Logo from './components/elements/Logo'
import NIP from './components/elements/NIP'
import Name from './components/elements/Name'
import Notes from './components/elements/Notes'
import Regon from './components/elements/Regon'
import Status from './components/elements/Status'
import UnitType from './components/elements/UnitType'
import Website from './components/elements/Website'
import Address from './components/modules/Address'

type Props = {
	form: form
	onSubmit: SubmitHandler<UnitPayload>
	open: boolean
	setOpen: (open: boolean) => void
	title: string
	buttonText: string
	buttonTextLoading?: string
	isLoading: boolean
}

const UnitForm = ({
	form,
	onSubmit,
	open,
	setOpen,
	title,
	buttonText,
	buttonTextLoading = 'Submitting...',
	isLoading
}: Props) => {
	return (
		<Sheet
			open={open}
			onOpenChange={open => {
				setOpen(open)
			}}>
			<SheetContent side={'right'} className='p-0 max-w-xl w-screen flex flex-col gap-0 sm:min-w-[500px]'>
				<SheetHeader className='px-6 py-4 border-b'>
					<SheetTitle>{title}</SheetTitle>
				</SheetHeader>

				<ScrollArea className='h-full'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='py-4'>
							<div className='px-6 space-y-8 '>
								<Name form={form} />

								<Email form={form} />

								<UnitType form={form} />

								<City form={form} />

								<Website form={form} />

								<Logo form={form} />

								<IsPublic form={form} />

								<Status form={form} />
							</div>

							<Separator className='my-12' />

							<div className='px-6 space-y-8'>
								<div>
									<H4>Optional</H4>
									<Muted>These fields are optional and can be filled later</Muted>
								</div>
								<Address form={form} />

								<NIP form={form} />

								<Regon form={form} />

								<Notes form={form} />
							</div>
						</form>
					</Form>
				</ScrollArea>

				<SheetFooter className='px-6 py-4 border-t gap-4 flex-row justify-end'>
					<Button variant={'secondary'} onClick={() => setOpen(false)}>
						Cancel
					</Button>

					{isLoading ? (
						<Button type='submit' disabled>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							{buttonTextLoading}
						</Button>
					) : (
						<Button type='submit' onClick={form.handleSubmit(e => onSubmit(e))}>
							{buttonText}
						</Button>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default UnitForm
