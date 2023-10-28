import { buttonVariants } from '@/app/components/ui/Button'
import { Separator } from '@/app/components/ui/Separator/separator'
import { H1 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import PreviewMajorData from './components/PreviewMajorData'

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
				<Link
					href={'/manage/majors'}
					className={cn(buttonVariants({ variant: 'link' }), 'mb-4 gap-2 pl-0')}>
					<ArrowLeft className='h-4 w-4' />
					<span>Powrót do listy</span>
				</Link>

				<H1>{major.name}</H1>

				<Separator className='mt-4' />
			</section>

			<section className='space-y-2 pb-6'>
				<PreviewMajorData major={major} />
			</section>
		</div>
	)
}
