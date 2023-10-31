import { Separator } from '@/app/components/ui/Separator/separator'
import { H1, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ManageUnitData } from './components/ManageUnitData'

export default async function ManageUnitPage() {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	const unit = await prisma.unit.findFirst({
		where: {
			managers: {
				some: {
					id: session.user.id
				}
			}
		},
		select: {
			id: true,
			name: true,
			email: true,
			unitType: true,
			city: {
				select: {
					id: true,
					name: true
				}
			},
			website: true,
			logo: true,
			isPublic: true,
			phone: true,
			address: {
				select: {
					street: true,
					postalCode: true
				}
			},
			nip: true,
			regon: true,
			status: true,
			cityId: true,
			slug: true,
			notes: true
		}
	})

	if (!unit) return <div>Nie udało się wczytać danych</div>

	return (
		<div className='flex h-full flex-col gap-y-8'>
			<section className='mb-4 mt-6'>
				<H1>Jednostka</H1>
				<Muted className='max-w-lg text-base'>
					Zarządzaj publicznymi danymi jednostki. Te dane wyświetlają się na ogólnodostępnej{' '}
					<Link href={`/units/${unit.slug}`} className='font-medium underline'>
						stronie jednostki.
					</Link>
				</Muted>

				<Separator className='mt-4' />
			</section>

			<section className='space-y-2 pb-6'>
				<ManageUnitData unit={unit} />
			</section>
		</div>
	)
}
