import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import Address from './components/Address'
import Details from './components/Details'
import Header from './components/Header'
import Majors from './components/Majors'

type Props = { params: { unitSlug: string } }

export async function generateStaticParams() {
	const units = await prisma.unit.findMany({
		select: {
			slug: true
		}
	})

	return units?.map(unit => ({
		unitSlug: unit.slug
	}))
}

export default async function UnitPage({ params }: Props) {
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
		_count: { majors: majorsCount }
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

			<Address
				city={city}
				voivodeship={voivodeship}
				postalCode={address?.postalCode ?? null}
				street={address?.street ?? null}
			/>

			<Majors unitSlug={params.unitSlug} />
		</main>
	)
}
