import { Separator } from '@/app/components/ui/Separator/separator'
import { H1, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import AddMajor from './components/AddMajor'
import MajorCard from './components/MajorCard'
import { SearchBar } from './components/SearchBar'
import StatusSelect from './components/StatusSelect'

export default async function ManageMajorsPage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	const searchQuery = searchParams.q?.toString().replace(/[\s\n\t]/g, '_')
	const status = searchParams.publication_status?.toString() as 'PUBLISHED' | 'DRAFT' | undefined

	const majors = await prisma.major.findMany({
		where: {
			name: {
				contains: searchQuery,
				mode: 'insensitive'
			},
			unit: {
				managers: {
					some: {
						id: session.user.id
					}
				}
			},
			status: ['PUBLISHED', 'DRAFT'].includes(status ?? '') ? status : undefined
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
			qualifications: {
				select: {
					slug: true,
					name: true
				}
			},
			status: true
		}
	})

	const unit = await prisma.unit.findFirst({
		where: {
			managers: {
				some: {
					id: session.user.id
				}
			}
		},
		select: {
			id: true
		}
	})

	if (!majors) return <div>Nie odnaleziono żadnych kierunków</div>

	return (
		<div className='flex h-full flex-col gap-8 px-1'>
			<section>
				<H1>Kierunki</H1>
				<Muted className='text-base'>Zarządzaj kierunkami jednostki</Muted>

				<Separator className='mt-4' />
			</section>

			<section className='flex flex-col justify-between gap-x-2 gap-y-4 sm:flex-row lg:items-center'>
				<div className='h-12'>
					<StatusSelect />
				</div>

				<div className='h-12 grow'>
					<SearchBar />
				</div>

				<div className='ml-auto h-12 shrink-0'>{unit && <AddMajor unitId={unit.id} />}</div>
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
