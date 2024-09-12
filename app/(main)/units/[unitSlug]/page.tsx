import { Skeleton } from '@/app/components/ui/skeleton'
import { urlFor } from '@/lib/supabase/getUrlFor'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Address from './components/Address'
import Details from './components/Details'
import Header from './components/Header'
import { ImageGallery } from './components/ImageGallery'
import Majors from './components/Majors'

type Props = { params: { unitSlug: string }; searchParams: { [key: string]: string | string[] | undefined } }

const getUnit = unstable_cache(
	async (unitSlug: string) => {
		const unit = await prisma.unit.findFirst({
			where: {
				slug: unitSlug
			},
			include: {
				_count: {
					select: {
						majors: true
					}
				},
				city: {
					select: {
						name: true,
						voivodeship: {
							select: {
								name: true
							}
						}
					}
				},
				address: {
					select: {
						street: true,
						postalCode: true
					}
				},
				subscriptions: {
					where: {
						to: {
							gte: new Date()
						},
						type: {
							in: ['STANDARD', 'PREMIUM']
						}
					},
					select: {
						type: true
					}
				}
			}
		})

		if (!unit) return notFound()

		return unit
	},
	undefined,
	{
		revalidate: 60 * 60,
		tags: [`units`]
	}
)

export async function generateMetadata({ params: { unitSlug } }: { params: { unitSlug: string } }) {
	const unit = await getUnit(unitSlug)
	if (!unit) return notFound()

	const image = unit.logo ? urlFor('units', unit.logo).publicUrl : undefined

	return {
		title: `${unit.name}`,
		description: `Sprawdź ofertę studiów dla nauczycieli uczelni ${unit.name}, znajdującej się w mieście ${unit.city.name}, ${unit.city.voivodeship.name}. Odkryj więcej informacji na temat oferowanych kierunków studiów i skontaktuj się z uczelnią.`,
		openGraph: {
			title: `${unit.name} | Studia dla Nauczycieli`,
			description: `Studia w uczelni ${unit.name} w mieście ${unit.city.name}. Zobacz szczegóły oferty edukacyjnej i kontakt.`,
			images: image
		}
	} satisfies Metadata
}

export default async function UnitPage({ params, searchParams }: Props) {
	const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY!

	const unit = await getUnit(params.unitSlug)
	if (!unit) return notFound()

	const {
		name,
		logo,
		unitType,
		city: {
			name: city,
			voivodeship: { name: voivodeship }
		},
		website,
		isPublic,
		email,
		phone,
		nip,
		regon,
		address,
		updatedAt,
		gallery,
		subscriptions
	} = unit

	const hasActiveSubscription = subscriptions.length > 0

	return (
		<main className='wrapper'>
			<Header
				city={city}
				voivodeship={voivodeship}
				isPublic={isPublic}
				logo={logo}
				name={name}
				unitType={unitType}
				website={website}
				updatedAt={updatedAt}
			/>

			<Details
				email={email}
				website={website}
				isPublic={isPublic}
				phone={phone}
				unitType={unitType}
				nip={nip}
				regon={regon}
			/>

			{hasActiveSubscription && (
				<Suspense
					fallback={
						<div className='border-b py-6'>
							<Skeleton className='h-7 w-48' />
							<Skeleton className='my-4 h-6 w-56' />
							<Skeleton className='h-[60vh] w-full' />
						</div>
					}>
					<Address
						GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
						city={city}
						voivodeship={voivodeship}
						postalCode={address?.postalCode ?? null}
						street={address?.street ?? null}
					/>
				</Suspense>
			)}

			{hasActiveSubscription && <ImageGallery images={gallery as any} />}

			<Suspense>
				<Majors unitSlug={params.unitSlug} />
			</Suspense>
		</main>
	)
}
