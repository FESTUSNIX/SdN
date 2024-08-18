import { Skeleton } from '@/app/components/ui/skeleton'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Address from './components/Address'
import Details from './components/Details'
import Header from './components/Header'
import Majors from './components/Majors'
import { ImageGallery } from './components/ImageGallery'

type Props = { params: { unitSlug: string }; searchParams: { [key: string]: string | string[] | undefined } }

export default async function UnitPage({ params, searchParams }: Props) {
	const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY!

	const unit = await prisma.unit.findFirst({
		where: {
			slug: params.unitSlug
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
			}
		}
	})

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
		gallery
	} = unit

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

			<ImageGallery images={gallery as any} />

			<Suspense>
				<Majors unitSlug={params.unitSlug} />
			</Suspense>
		</main>
	)
}
