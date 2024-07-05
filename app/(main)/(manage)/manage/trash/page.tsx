import { Button } from '@/app/components/ui/Button'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H1, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { HistoryIcon, Trash2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import MajorCard from '../majors/components/MajorCard'
import { EmptyTrash } from './components/EmptyTrash'
import { RemoveArchivedMajor } from './components/RemoveArchivedMajor'
import { RestoreArchivedMajor } from './components/RestoreArchivedMajor'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/Tooltip'

export default async function TrashPage() {
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
			},
			status: 'ARCHIVED'
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
			status: true,
			unitId: true
		}
	})

	if (!majors) return <div>Kosz jest pusty</div>

	return (
		<div className='flex h-full flex-col gap-8 px-1'>
			<section>
				<H1>Kosz ({majors.length})</H1>
				<Muted className='text-base'>Zarządzaj usuniętymi kierunkami</Muted>

				<Separator className='mb-4 mt-4' />

				{majors.length > 0 && (
					<div className='flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-lg bg-muted py-1 pl-4 pr-1 text-muted-foreground'>
						<p className='pr-3'>Kierunki w koszu są usuwane na zawsze po 30 dniach.</p>

						<EmptyTrash unitId={majors[0].unitId} asChild>
							<Button variant={'ghost'} size={'sm'} className='ml-auto rounded-full hover:bg-background'>
								Opróżnij kosz
							</Button>
						</EmptyTrash>
					</div>
				)}
			</section>

			<section className='space-y-2 pb-6'>
				<h2 className='sr-only'>Lista kierunków</h2>

				{majors.length > 0 && (
					<div className='flex flex-col gap-y-2'>
						{majors.map(major => (
							<div key={major.id} className='group relative'>
								<MajorCard data={major} useStatusButton={false} className='pointer-events-none' />
								<div className='absolute right-3 top-3 flex flex-col gap-2 opacity-0 duration-150 group-focus-within:opacity-100 group-hover:opacity-100	'>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div>
													<RestoreArchivedMajor
														majorId={major.id}
														name={major.name}
														variant={'outline'}
														size={'iconSm'}
														className='bg-background'>
														<span className='sr-only'>Przywróć kierunek {major.name} z kosza</span>
														<HistoryIcon className='size-4' />
													</RestoreArchivedMajor>
												</div>
											</TooltipTrigger>
											<TooltipContent>Przywróc z kosza</TooltipContent>
										</Tooltip>
										<Tooltip>
											<TooltipTrigger asChild>
												<div>
													<RemoveArchivedMajor
														majorId={major.id}
														name={major.name}
														variant={'outline'}
														size={'iconSm'}
														className='bg-background'>
														<span className='sr-only'>Usuń kierunek {major.name} z kosza na zawsze</span>
														<Trash2Icon className='size-4' />
													</RemoveArchivedMajor>
												</div>
											</TooltipTrigger>
											<TooltipContent>Usuń na zawsze</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
						))}
					</div>
				)}

				{majors.length === 0 && <Muted>Kosz jest pusty</Muted>}
			</section>
		</div>
	)
}
