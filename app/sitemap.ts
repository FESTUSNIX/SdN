import prisma from '@/prisma/client'
import { type MetadataRoute } from 'next'
import { BASE_URL } from './constants/BASE_URL'

type Sitemap = MetadataRoute.Sitemap

const _ROUTES: Sitemap = [
	{ url: '', priority: 1, changeFrequency: 'monthly' },
	{ url: '/search', priority: 0.7, changeFrequency: 'monthly' },
	{ url: '/pricing', priority: 0.4, changeFrequency: 'monthly' },
	{ url: '/contact', priority: 0.2, changeFrequency: 'yearly' },
	{ url: '/faq', priority: 0.2, changeFrequency: 'yearly' },
	{ url: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' }
]

const prepareMajors = async (): Promise<Sitemap> => {
	const majors = await prisma.major.findMany({
		where: {
			status: 'PUBLISHED'
		},
		select: {
			slug: true,
			updatedAt: true
		}
	})

	return majors.map(major => ({
		url: `${BASE_URL}/majors/${major.slug}`,
		lastModified: major.updatedAt || new Date(),
		changeFrequency: 'monthly',
		priority: 0.9
	}))
}

const prepareUnits = async (): Promise<Sitemap> => {
	const units = await prisma.unit.findMany({
		select: {
			slug: true,
			updatedAt: true
		}
	})

	return units.map(unit => ({
		url: `${BASE_URL}/units/${unit.slug}`,
		lastModified: unit.updatedAt || new Date(),
		changeFrequency: 'monthly',
		priority: 0.8
	}))
}

const prepareCities = async (): Promise<Sitemap> => {
	const cities = await prisma.city.findMany({
		select: {
			id: true
		}
	})

	return cities.map(city => ({
		url: `${BASE_URL}/cities/${city.id}`,
		changeFrequency: 'monthly',
		priority: 0.7
	}))
}

export default async function sitemap(): Promise<Sitemap> {
	const [majors, units, cities] = await Promise.all([prepareMajors(), prepareUnits(), prepareCities()])

	const routes: Sitemap = _ROUTES.map(route => ({
		url: `${BASE_URL}${route.url}`,
		priority: route.priority,
		changeFrequency: route.changeFrequency,
		lastModified: new Date()
	}))

	return [...routes, ...majors, ...units, ...cities]
}
