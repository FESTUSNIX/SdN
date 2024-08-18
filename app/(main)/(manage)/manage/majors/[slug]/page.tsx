import { buttonVariants } from '@/app/components/ui/button'
import { Separator } from '@/app/components/ui/separator'
import { H1 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import { cn } from '@/lib/utils'
import prisma from '@/prisma/client'
import { ArrowLeft, ArrowUpToLine, Undo } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MajorCompletion } from '../components/MajorCompletion'
import { StatusEdit } from '../components/StatusEdit'
import { DeleteMajor } from './components/DeleteMajor'
import { ManageMajorData } from './components/ManageMajorData'

export default async function ManageMajorPage({ params: { slug } }: { params: { slug: string } }) {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	const major = await prisma.major.findFirst({
		where: {
			slug: slug,
			unit: {
				managers: {
					some: {
						id: session.user.id
					}
				}
			}
		},
		include: {
			qualifications: {
				select: {
					id: true,
					name: true
				}
			}
		}
	})

	if (!major) return <div>Nie odnaleziono kierunku</div>

	return (
		<div className='flex h-full flex-col gap-8'>
			<section>
				<Link href={'/manage/majors'} className={cn(buttonVariants({ variant: 'link' }), 'mb-4 gap-2 pl-0')}>
					<ArrowLeft className='h-4 w-4' />
					<span>Powrót do listy</span>
				</Link>

				<div className='flex flex-wrap items-center justify-between gap-x-12 gap-y-4'>
					<H1>{major.name}</H1>

					<MajorCompletion data={major} />
				</div>

				<Separator className='mt-4' />
			</section>

			<section className='space-y-2'>
				<ManageMajorData major={major} />
			</section>

			<section className={'flex flex-wrap items-center justify-end gap-2 pb-6'}>
				<DeleteMajor id={major.id} name={major.name} />
				<StatusEdit
					id={major.id}
					name={major.name}
					status={major.status}
					className={cn(
						major.status === 'PUBLISHED' && 'text-destructive hover:border-destructive hover:text-destructive'
					)}>
					{major.status === 'PUBLISHED' ? (
						<Undo className='mr-2 h-4 w-4' />
					) : (
						<ArrowUpToLine className='mr-2 h-4 w-4' />
					)}
					<span>{major.status === 'PUBLISHED' ? 'Cofnij publikację' : 'Opublikuj'}</span>
				</StatusEdit>
			</section>
		</div>
	)
}
