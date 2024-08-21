import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { H1, H2, Muted } from '@/app/components/ui/Typography'
import { PricingCard } from './components/PricingCard'
import { FAQS } from './constants/faqs'
import { PRICING_PLANS } from './constants/pricingPlans'

type Props = {}

const PricingPage = (props: Props) => {
	const billingPeriods: ('monthly' | 'yearly')[] = ['monthly', 'yearly']

	return (
		<main className='wrapper py-24'>
			<header className='mb-16 flex flex-col items-center text-center'>
				<H1 size='base' className='mb-4 max-w-3xl text-pretty'>
					Idealny plan dla Twojej uczelni
				</H1>
				<p className='max-w-lg text-balance text-base leading-tight text-muted-foreground lg:text-lg'>
					Promuj swoją uczelnię w internecie z pomocą naszej wyszukiwarki. Prosty i przejrzysty system bez ukrytych
					opłat.
				</p>
			</header>

			<section className='py-8'>
				<h2 className='sr-only'>Plany</h2>

				<Tabs defaultValue='monthly' className='flex w-full flex-col items-center gap-12'>
					<div>
						<Muted className='mb-2 block text-center'>Typ rozliczenia</Muted>
						<TabsList>
							<TabsTrigger value='monthly'>Miesięczne</TabsTrigger>
							<TabsTrigger value='yearly'>Roczne</TabsTrigger>
						</TabsList>
					</div>
					{billingPeriods.map((type,) => (
						<TabsContent value={type} key={`billing-${type}`}>
							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 xl:gap-x-12'>
								{PRICING_PLANS.map((plan, i, plans) => (
									<PricingCard
										key={i}
										previousPlansFeatures={plans.slice(0, i).flatMap(plan => plan.features)}
										billingPeriod={type}
										{...plan}
									/>
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</section>

			<section className='mt-24 flex flex-col py-8 lg:flex-row lg:justify-between lg:gap-x-16 xl:gap-x-24'>
				<div className='mb-12 lg:shrink-0'>
					<H2 size='base'>Często zadawane pytania</H2>
					<Muted className='max-w-md'>
						Tutaj znajdziesz odpowiedzi na pytania dotyczące naszej oferty. Jeśli potrzebujesz dodatkowych informacji,
						skontaktuj się z nami.
					</Muted>
				</div>

				<Accordion type='single' collapsible className='w-full lg:max-w-2xl'>
					{FAQS.map((item, index) => (
						<AccordionItem key={`item-${index}`} value={`item-${index}`}>
							<AccordionTrigger>{item.question}</AccordionTrigger>
							<AccordionContent>{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</main>
	)
}

export default PricingPage
