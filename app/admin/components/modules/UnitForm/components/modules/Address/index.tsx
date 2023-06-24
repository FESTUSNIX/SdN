import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Street from './components/elements/Street'
import PostalCode from './components/elements/PostalCode'
import { form } from '@/lib/validators/unit'

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
			</CardContent>
		</Card>
	)
}

export default Address
