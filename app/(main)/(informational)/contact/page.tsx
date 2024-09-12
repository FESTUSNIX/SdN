import { H1 } from '@/app/components/ui/Typography'
import { Metadata } from 'next'
import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContactInfo'

export const metadata: Metadata = {
	title: 'Kontakt',
	description:
		'Skontaktuj się z nami! Masz pytania dotyczące oferty studiów dla nauczycieli lub współpracy z nami? Zapraszamy do kontaktu - chętnie pomożemy i udzielimy szczegółowych informacji.'
}

const ContactPage = () => {
	return (
		<main className='wrapper mt-24 flex grow flex-col justify-between gap-x-24 lg:flex-row'>
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
			<section className='shrink-0 basis-2/5 rounded-xl p-6 shadow-lg dark:border md:min-w-[420px] md:p-12'>
				<ContactForm />
			</section>
		</main>
	)
}

export default ContactPage
