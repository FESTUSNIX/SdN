import { BASE_URL } from '@/app/constants/BASE_URL'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin/', '/manage/']
		},
		sitemap: `${BASE_URL}/sitemap.xml`
	}
}
