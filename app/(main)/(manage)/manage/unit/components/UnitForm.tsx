import { City, Email, IsPublic, NIP, Phone, PostalCode, Regon, Street, Website } from '@/app/components/Forms/Unit'
import Name from '@/app/components/Forms/Unit/Name'
import { Form } from '@/app/components/ui/Form'
import { PublicUnitFormType, PublicUnitPayload } from '@/lib/validators/public-unit'
import { SubmitHandler } from 'react-hook-form'

type Props = {
	form: PublicUnitFormType
	onSubmit: SubmitHandler<PublicUnitPayload>
}

const UnitForm = ({ form, onSubmit }: Props) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(e => onSubmit(e))} className='space-y-6' id='unit-form'>
				<Name form={form} />
				<Email form={form} />
				<Website form={form} />
				<City label='Miasto' control={form.control} accessorKey={'cityId'} />
				<PostalCode control={form.control} accessorKey='postalCode' />
				<Street form={form} />
				<IsPublic form={form} />
				<Phone form={form} />
				<NIP form={form} />
				<Regon form={form} />
			</form>
		</Form>
	)
}

export default UnitForm
