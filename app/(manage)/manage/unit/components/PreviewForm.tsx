import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { Switch } from '@/app/components/ui/Switch'
import { cn } from '@/lib/utils/utils'
import { PublicUnitPayload } from '@/lib/validators/public-unit'
import { ChevronsUpDown } from 'lucide-react'

type Props = {
	defaultValues: PublicUnitPayload
	city: string
}

const PreviewForm = ({ defaultValues, city }: Props) => {
	return (
		<div>
			<div className='space-y-6'>
				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Nazwa
					</label>
					<div className='relative'>
						<Input placeholder='Aa...' disabled value={defaultValues.name} />
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Email
					</label>
					<div className='relative'>
						<Input placeholder='jan@kowalski.pl' type='email' disabled value={defaultValues.email} />
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Strona internetowa
					</label>
					<div className='relative'>
						<Input placeholder='https://website.pl/' disabled value={defaultValues.website} />
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Miasto
					</label>
					<Button variant='outline' role='combobox' disabled className={'w-full justify-between'}>
						{city}
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Kod pocztowy
					</label>
					<div className='relative'>
						<Input disabled placeholder='01-234' value={defaultValues.postalCode} />
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Adres
					</label>
					<div className='relative'>
						<Input placeholder='Szkolna 12/3' disabled value={defaultValues.street} />
					</div>
				</div>

				<div className='flex flex-row items-center justify-between rounded-lg border p-4'>
					<div className={cn('space-y-0.5 pr-8 opacity-50')}>
						<label className='text-base'>Placówka publiczna</label>
					</div>
					<div>
						<Switch checked={defaultValues.isPublic} disabled className='!mt-0' />
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Telefon
					</label>
					<div className='relative'>
						<Input disabled placeholder='+48 123 456 789' value={defaultValues.phone} />
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						NIP
					</label>
					<div className='relative'>
						<Input disabled placeholder='1234567890' value={defaultValues.nip} />
					</div>
				</div>

				<div className='flex flex-col space-y-2'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						Regon
					</label>
					<div className='relative'>
						<Input disabled placeholder='123456789' value={defaultValues.regon} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PreviewForm
