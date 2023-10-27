import { Separator } from '@/app/components/ui/Separator/separator'
import { H1, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import MajorCard from './components/MajorCard'
import AddMajor from './components/AddMajor'

export default async function ManageMajorsPage() {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	const majors = await prisma.major.findMany({
		where: {
			unit: {
				managers: {
					some: {
						id: session.user.id
					}
				}
			}
		},
		orderBy: {
			updatedAt: 'desc'
		},
		select: {
			id: true,
			name: true,
			isOnline: true,
			majorLevel: true,
			slug: true,
			unit: {
				select: {
					id: true,
					name: true,
					slug: true
				}
			},
			qualifications: {
				select: {
					slug: true,
					name: true
				}
			}
		}
	})

	if (!majors) return <div>Nie odnaleziono żadnych kierunków</div>

	return (
		<div className='flex h-full flex-col gap-8'>
			<section>
				<H1>Kierunki</H1>
				<Muted className='text-base'>Zarządzaj kierunkami jednostki</Muted>

				<Separator className='mt-4' />
			</section>

			<section className='flex items-center'>
				<div className='ml-auto'>
					<AddMajor unitId={majors[0].unit.id}  />
				</div>
			</section>

			<section className='space-y-2 pb-6'>
				<div className='flex flex-col gap-y-2'>
					{majors.map(major => (
						<div key={major.id} className=''>
							<MajorCard data={major} />
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
