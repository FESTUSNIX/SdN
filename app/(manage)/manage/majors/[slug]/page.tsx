import { Separator } from '@/app/components/ui/Separator/separator'
import { H1 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'

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
		}
	})

	if (!major) return <div>Nie odnaleziono kierunku</div>

	return (
		<div className='flex h-full flex-col gap-8'>
			<section>
				<H1>{major.name}</H1>

				<Separator className='mt-4' />
			</section>

			<section className='space-y-2'></section>
		</div>
	)
}
