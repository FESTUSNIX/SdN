import { Separator } from '@/app/components/ui/Separator/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/Tabs/tabs'
import { H1, H3, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import EditUnit from './components/EditUnit'

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

	const items: {
		title: string
		value: string | null
	}[] = [
		{
			title: 'Nazwa',
			value: unit.name
		},
		{
			title: 'Email',
			value: unit.email
		},
		{
			title: 'Typ jednostki',
			value: unit.unitType
		},
		{
			title: 'Strona internetowa',
			value: unit.website
		},
		{
			title: 'Miasto',
			value: unit.city.name
		},
		{
			title: 'Kod pocztowy',
			value: unit.address?.postalCode ?? null
		},
		{
			title: 'Ulica',
			value: unit.address?.street ?? null
		},
		{
			title: 'Status',
			value: unit.isPublic ? 'Publiczna' : 'Prywatna'
		},
		{
			title: 'Telefon kontaktowy',
			value: unit.phone
		},
		{
			title: 'NIP',
			value: unit.nip
		},
		{
			title: 'Regon',
			value: unit.regon
		}
	]

	return (
		<div className='flex h-full flex-col gap-8'>
			<Tabs defaultValue='account' className=''>
				<TabsList>
					<TabsTrigger value='account'>Przeglądaj</TabsTrigger>
					<TabsTrigger value='password'>Edytuj</TabsTrigger>
				</TabsList>
				<TabsContent value='account'>
					<>
						<section className='mt-6'>
							<H1>Jednostka</H1>

							<Separator className='mt-4' />
						</section>

						<section className='space-y-2 py-6'>
							{/* <H2>Dane</H2> */}

							<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
								{items.map((item, i) => (
									<Fragment key={`${item.title}-${item.value}`}>
										<div className='py-2'>
											<H3 className='text-sm font-bold leading-none'>{item.title}</H3>
											<p className='break-all text-muted-foreground'>{item.value ?? 'Brak danych'}</p>
										</div>

										{i !== items.length - 1 && <Separator />}
									</Fragment>
								))}
							</div>
						</section>
					</>
				</TabsContent>
				<TabsContent value='password'>
					<>
						<section className='mt-6'>
							<H1>Edytuj dane jednostki</H1>

							<Separator className='mt-4' />
						</section>

						<section className='space-y-2 py-6'>
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
						</section>
					</>
				</TabsContent>
			</Tabs>
		</div>
	)
}
