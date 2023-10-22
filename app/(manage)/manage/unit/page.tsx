import { Separator } from '@/app/components/ui/Separator/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/Tabs/tabs'
import { H1, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import EditUnit from './components/EditUnit'
import PreviewUnitData from './components/PreviewUnitData'
import EditUnitFormSkeleton from './loaders/EditUnitFormSkeleton'

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
		<div className='flex h-full flex-col gap-8'>
			<Tabs defaultValue='view'>
				<TabsList>
					<TabsTrigger value='view'>Przeglądaj</TabsTrigger>
					<TabsTrigger value='edit'>Edytuj</TabsTrigger>
				</TabsList>
				<TabsContent value='view'>
					<section className='mt-6'>
						<H1>Jednostka</H1>

						<Separator className='mt-4' />
					</section>

					<section className='space-y-2 py-6'>
						<PreviewUnitData unit={unit} />
					</section>
				</TabsContent>
				<TabsContent value='edit'>
					<section className='mt-6'>
						<H1>Edytuj dane jednostki</H1>
						<Muted>Opublikowanie zmian na stronie może potrwać do 48 godzin</Muted>

						<Separator className='mt-4' />
					</section>

					<section className='space-y-2 py-6'>
						<Suspense
							fallback={
								<div className='grid grid-cols-2 gap-8'>
									<EditUnitFormSkeleton />
									<EditUnitFormSkeleton />
								</div>
							}>
							<EditUnit
								city={unit.city.name}
								defaultValues={{
									cityId: unit.cityId,
									email: unit.email,
									isPublic: unit.isPublic,
									name: unit.name,
									website: unit.website,
									id: unit.id,
									logo: unit.logo,
									nip: unit.nip ?? '',
									phone: unit.phone ?? '',
									postalCode: unit.address?.postalCode ?? '',
									regon: unit.regon ?? '',
									street: unit.address?.street ?? ''
								}}
							/>
						</Suspense>
					</section>
				</TabsContent>
			</Tabs>
		</div>
	)
}
