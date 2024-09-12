import { Metadata } from 'next'
import { Suspense } from 'react'
import { Attributes } from './components/sections/Attributes'
import { CityRecommendations, CityRecommendationsSkeleton } from './components/sections/CityRecommendations'
import { Hero } from './components/sections/Hero'
import { OurStats } from './components/sections/OurStats'
import { RecommendedMajors, RecommendedMajorsSkeleton } from './components/sections/RecommendedMajors'

export const metadata: Metadata = {
	title: {
		absolute: 'Studia dla Nauczycieli'
	},
}

export default function Home() {
	return (
		<main className='relative flex grow flex-col overflow-hidden'>
			<Hero />

			<OurStats />

			<Attributes />

			<Suspense fallback={<RecommendedMajorsSkeleton />}>
				<RecommendedMajors />
			</Suspense>

			<Suspense fallback={<CityRecommendationsSkeleton />}>
				<CityRecommendations />
			</Suspense>
		</main>
	)
}
