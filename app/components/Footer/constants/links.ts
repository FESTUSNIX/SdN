export const links: { title: string; links: { label: string; link: string; external?: boolean }[] }[] = [
	{
		title: 'Serwis',
		links: [
			{
				label: 'Często zadawane pytania',
				link: '/faq'
			},
			{
				label: 'Kontakt',
				link: '/contact'
			},
			{
				label: 'O portalu',
				link: '/about'
			}
		]
	},
	{
		title: 'Social Media',
		links: [
			{
				label: 'Instagram',
				link: '/',
				external: true
			},
			{
				label: 'Facebook',
				link: '/',
				external: true
			},
			{
				label: 'Twitter',
				link: '/',
				external: true
			},
			{
				label: 'LinkedIn',
				link: '/',
				external: true
			}
		]
	},
	{
		title: 'Prywatność',
		links: [
			{
				label: 'Polityka prywatności',
				link: '/privacy-policy'
			},
			{
				label: 'Ustawienia ciasteczek',
				link: '/cookie-settings'
			}
		]
	}
]
