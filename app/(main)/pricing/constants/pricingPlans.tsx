type PricingPlan = {
	name: string
	description: string
	price: {
		monthly: number
		yearly: number
	}
	features: string[]
	featuresLabel: string | JSX.Element
	button: {
		label: string
		href: string
	}
	primary?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
	{
		name: 'Free',
		description: 'Darmowy plan dostępny dla każdej uczelni',
		price: {
			monthly: 0,
			yearly: 0
		},
		button: {
			label: 'Przeglądaj kierunki',
			href: '/search'
		},
		featuresLabel: 'Zawiera:',
		features: [
			'Wykaz kierunków oferowanych przez uczelnię',
			'Podstawowe informacje o orgranizatorze',
			'Podstawowe informacje o kierunkach'
		]
	},
	{
		primary: true,
		name: 'Standard',
		description: 'Idealny plan dla Twojej uczelni',
		price: {
			monthly: 495,
			yearly: 4999
		},
		button: {
			label: 'Zacznij promować',
			href: '/contact'
		},
		featuresLabel: (
			<>
				Wszystko z planu <b>Free</b> oraz:
			</>
		),
		features: [
			'Dostęp do panelu administracyjnego',
			'Pełny opis kierunków',
			'Pełny opis organizatora',
			'Wyższa pozycja w wynikach wyszukiwania',
			'Galeria zdjęć',
			'Kierunki promowane rotacyjnie na stronie głównej'
		]
	},
	{
		name: 'Premium',
		description: 'Najlepszy plan dla Twojej uczelni',
		price: {
			monthly: 999,
			yearly: 9950
		},
		button: {
			label: 'Zacznij promować',
			href: '/contact'
		},
		featuresLabel: (
			<>
				Wszystko z planu <b>Standard</b> oraz:
			</>
		),
		features: [
			'Pierwszeństwo w wynikach wyszukiwania',
			'Reklama rotacyjna na stronach serwisu',
			'Kierunki promowane na stronach z podobną ofertą',
			'Brak reklam innych jednostek na stronach z ofertą'
		]
	}
]
