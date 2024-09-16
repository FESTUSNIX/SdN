import { H1, H2 } from '@/app/components/ui/Typography'
import { Metadata } from 'next'
import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContactInfo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion'
import { faq } from '../faq/constants/faq'

export const metadata: Metadata = {
	title: 'Kontakt',
	description:
		'Skontaktuj się z nami! Masz pytania dotyczące oferty studiów dla nauczycieli lub współpracy z nami? Zapraszamy do kontaktu - chętnie pomożemy i udzielimy szczegółowych informacji.'
}

const ContactPage = () => {
	return (
		<main className='wrapper mt-24 grow'>
			<header className='mb-24'>
				<H1 size='base'>Jak możemy Ci pomóc?</H1>
				<p className='mt-4 max-w-prose text-muted-foreground'>
					Masz pytania dotyczące oferty studiów dla nauczycieli lub współpracy z nami? Zapraszamy do kontaktu - chętnie
					pomożemy i udzielimy szczegółowych informacji.
				</p>
			</header>
			<div className='flex flex-col justify-between gap-x-24 gap-y-12 lg:flex-row'>
				<section className='max-w-2xl shrink-0 basis-1/2 rounded-xl'>
					<h2 className='sr-only'>Formularz kontaktowy</h2>
					<ContactForm />
				</section>

				<div className='relative h-px w-full shrink-0 bg-border lg:h-auto lg:w-px'>
					<span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground lg:rotate-90'>
						LUB
					</span>
				</div>

				<section className=''>
					<h2 className='sr-only'>Dane kontaktowe</h2>

					<ContactInfo />
				</section>
			</div>

			<section className='mb-24 mt-48'>
				<H2 size='base' className='mb-12 text-center'>
					Często zadawane pytania
				</H2>

				<Accordion type='single' collapsible className='mx-auto w-full max-w-2xl'>
					{faq.map((item, index) => (
						<AccordionItem key={`item-${index}`} value={`item-${index}`}>
							<AccordionTrigger>{item.title}</AccordionTrigger>
							<AccordionContent>{item.content}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</main>
	)
}

export default ContactPage
