import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion'
import { H1, H2 } from '@/app/components/ui/Typography'
import Link from 'next/link'
import { faq } from './constants/faq'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Często zadawane pytania',
	description:
		'Masz pytania? Sprawdź nasze FAQ, gdzie znajdziesz odpowiedzi na najczęściej zadawane pytania dotyczące studiów dla nauczycieli, rekrutacji oraz współpracy z naszą platformą.'
}

const FAQPage = () => {
	return (
		<main className='wrapper mt-12'>
			<H1 className='mb-12'>Często zadawane pytania</H1>

			<Accordion type='single' collapsible className='w-full'>
				{faq.map((item, index) => (
					<AccordionItem key={`item-${index}`} value={`item-${index}`}>
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<H2 className='mt-12'>
				Masz więcej pytań?{' '}
				<Link href={'/contact'} className={'underline'}>
					Porozmawiajmy.
				</Link>
			</H2>
		</main>
	)
}

export default FAQPage
