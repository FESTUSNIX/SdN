import { socialMedia } from '@/app/constants/socialMedia';

export const links: { title: string; links: { label: string; link: string; external?: boolean }[] }[] = [
	{
		title: 'Serwis',
		links: [
			{
				label: 'O portalu',
				link: '/about'
			},
			{
				label: 'Szukaj',
				link: '/search'
			},
			{
				label: 'Logowanie',
				link: '/login'
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
