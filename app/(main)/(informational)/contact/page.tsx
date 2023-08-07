import { H1 } from '@/app/components/ui/Typography'
import React from 'react'
import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContactInfo'

const ContactPage = () => {
	return (
		<main className='wrapper mt-24 flex grow flex-col justify-between gap-x-24 md:flex-row'>
			<section className='flex flex-col'>
				<div className='mb-12'>
					<H1 className='mb-2'>Porozmawiajmy</H1>
					<p className='max-w-lg'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto iusto minima ipsam consequatur sint
						neque quibusdam, quos error ipsum esse fuga.
					</p>
				</div>
				<ContactInfo />
			</section>
			<section className='min-w-[420px] shrink-0 basis-2/5 rounded-2xl p-12 shadow-lg dark:border'>
				<ContactForm />
			</section>
		</main>
	)
}

export default ContactPage
