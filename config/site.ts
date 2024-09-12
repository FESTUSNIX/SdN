export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: 'Studia dla Nauczycieli',
	url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://sdn-theta.vercel.app',
	links: { instagram: '/', facebook: 'https://www.facebook.com/StudiaDlaNauczycieli/', twitter: '/', linkedIn: '/' },
	description:
		'Znajdź idealne studia dla nauczycieli! Porównaj oferty uczelni, kierunki, formy kształcenia i wymagania rekrutacyjne. Odkryj najlepsze opcje edukacyjne i rozwijaj swoją karierę nauczycielską.',
	keywords: [
		'studia dla nauczycieli',
		'studia podyplomowe',
		'uczelnie dla nauczycieli',
		'oferty studiów dla nauczycieli',
		'studia pedagogiczne'
	]
}
