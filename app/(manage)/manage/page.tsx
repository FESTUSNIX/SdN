import { buttonVariants } from '@/app/components/ui/Button'
import { H1, H2 } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import { cn } from '@/lib/utils/utils'
import prisma from '@/prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ManagePage() {
	const session = await getAuthSession()

	if (!session) redirect('/')

	const unit = await prisma.unit.findFirst({
		where: {
			managers: {
				some: {
					id: session?.user.id
				}
			}
		},
		select: {
			id: true,
			name: true,
			email: true
		}
	})

	if (!unit)
		return (
			<div className='wrapper my-12 flex grow flex-col items-center justify-center md:my-24'>
				<h1 className='text-center text-5xl font-bold md:text-6xl'>Strona nie odnaleziona</h1>
				<p className='mt-2 text-center text-xl'>Skontaktuj się z nami żeby dodać uczelnie do twojego konta</p>

				<div className='mt-12 flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center'>
					<Link href='/contact' className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'max-sm:w-full')}>
						Skontaktuj się z nami
					</Link>
					<Link href='/' className={cn(buttonVariants({ size: 'lg' }), 'max-sm:w-full')}>
						Strona główna
					</Link>
				</div>
			</div>
		)

	return (
		<div className='wrapper flex min-h-screen flex-1 flex-col pt-12'>
			<H1 className='mb-6'>Dashboard</H1>
			<H2 className='mb-24'>Welcome {session?.user.name ?? session?.user.email} !</H2>
			<div>{unit?.name}</div>
		</div>
	)
}
