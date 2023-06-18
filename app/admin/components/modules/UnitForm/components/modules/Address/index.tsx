import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/elements/Card'
import Street from './components/elements/Street'
import { form } from '../../../types/FormType'
import PostalCode from './components/elements/PostalCode'
import City from './components/elements/City'

type Props = {
	form: form
}

const Address = ({ form }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Address</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-6'>
				<Street form={form} />

				<PostalCode form={form} />

				<City form={form} />
			</CardContent>
		</Card>
	)
}

export default Address
