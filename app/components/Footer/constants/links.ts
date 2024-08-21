import { socialMedia } from '@/app/constants/socialMedia'

export const links: { title: string; links: { label: string; link: string; external?: boolean }[] }[] = [
	{
		title: 'Serwis',
		links: [
			{
				label: 'Szukaj',
				link: '/search'
			},
			{
				label: 'O portalu',
				link: '/about'
			},
			{
				label: 'Polubione',
				link: '/saved'
			}
		]
	},
	{
		title: 'Dla uczelni',
		links: [
			{
				label: 'Cennik',
				link: '/pricing'
			},
			{
				label: 'Zaloguj się',
				link: '/login'
			},
			{
				label: 'Promuj swoją uczelnię',
				link: '/work-with-us'
			}
		]
	},
	{
		title: 'Social Media',
		links: [
			{
				label: 'Instagram',
				link: socialMedia.instagram,
				external: true
			},
			{
				label: 'Facebook',
				link: socialMedia.facebook,
				external: true
			}
		]
	},
	{
		title: 'Pomoc',
		links: [
			{
				label: 'Polityka prywatności',
				link: '/privacy-policy'
			},
			{
				label: 'Często zadawane pytania',
				link: '/faq'
			},
			{
				label: 'Kontakt',
				link: '/contact'
			}
		]
	}
]
