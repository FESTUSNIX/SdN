import { Separator } from '@/app/components/ui/Separator/separator'
import { H1, H2, H3, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import ChangePassword from '../components/ChangePassword'
import SignOutBtn from '../components/SignOutBtn'

export default async function ManageAccountPage() {
	const session = await getAuthSession()
	if (!session) redirect('/login')

	const user = await prisma.user.findFirst({
		where: {
			id: session.user.id
		},
		select: {
			id: true,
			name: true,
			email: true,
			unit: {
				select: {
					managers: {
						where: {
							NOT: {
								id: session.user.id
							}
						},
						select: {
							id: true,
							email: true,
							name: true
						}
					}
				}
			}
		}
	})

	const managers = user?.unit?.managers

	if (!user) return <div>Nie udało się odnaleźć użytkownika</div>

	return (
		<div className='flex h-full flex-col gap-8'>
			<section>
				<H1>Konto</H1>
				<Muted className='text-base'>Zarządzaj ustawieniami konta</Muted>

				<Separator className='mt-4' />
			</section>

			<section className='space-y-2'>
				<H2>Dane</H2>

				<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
					<div className='py-2'>
						<H3 className='text-sm font-bold leading-none'>Nazwa</H3>
						<p className='break-all text-muted-foreground'>{user.name}</p>
					</div>

					<Separator />

					<div className='py-2'>
						<H3 className='text-sm font-bold leading-none'>Email</H3>
						<p className='break-all text-muted-foreground'>{user.email}</p>
					</div>

					<Separator />

					<div className='flex items-center justify-between py-2'>
						<div className='max-w-full'>
							<H3 className='text-sm font-bold leading-none'>Hasło</H3>
							<p className='truncate pr-2 text-muted-foreground'>***************</p>
						</div>
						<div className='shrink-0'>
							<ChangePassword />
						</div>
					</div>
				</div>
			</section>

			{managers && managers?.length > 0 && (
				<section className='space-y-2'>
					<div className='mb-4'>
						<H2 className='pb-0'>Inne konta</H2>
						<Muted>Te konta mają możliwość edycji danych</Muted>
					</div>

					<ul className='space-y-2'>
						{managers.map(manager => (
							<li
								key={manager.id}
								className='flex items-center rounded-lg border bg-card px-4 py-2.5 text-sm text-card-foreground shadow-sm'>
								<div className='flex flex-col truncate md:flex-row md:items-center'>
									<span className='shrink-0'>{manager.email}</span>
									<span className='hidden px-4 font-bold text-muted-foreground md:inline-block'>&middot;</span>
									<span className='truncate text-muted-foreground'>{manager.name}</span>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}

			<div className='mt-auto self-end py-6'>
				<SignOutBtn />
			</div>
		</div>
	)
}
