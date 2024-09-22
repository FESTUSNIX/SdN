import { SignOutShell } from '@/app/components/SignOutShell'
import { Button, buttonVariants } from '@/app/components/ui/button'
import { Separator } from '@/app/components/ui/separator'
import { H1, H2, H3 } from '@/app/components/ui/Typography'
import UserAvatar from '@/app/components/UserAvatar'
import { getAuthSession } from '@/lib/auth/auth'
import { cn } from '@/lib/utils'
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ChangePassword from '../(manage)/manage/components/ChangePassword'
import { LogoEdit } from './components/LogoEdit'
import { RequestNameChange } from './components/RequestNameChange'

type Props = {}

export const metadata: Metadata = {
	title: 'Ustawienia konta',
	robots: {
		index: false,
		follow: false
	}
}

const AccountPage = async (props: Props) => {
	const session = await getAuthSession()
	if (!session || session.user.role === 'USER') redirect('/login')

	const { id, email, image, name, role } = session.user

	const isAdmin = role === 'ADMIN'
	const isUnit = role === 'UNIT'

	if (!name || !email) return new Error('User data is missing')

	return (
		<main className='grid-container'>
			<div className='container-fill relative h-48 [clip-path:inset(0)]'>
				<div className='isometric-bg-pattern fixed inset-0'></div>
				<div className='absolute bottom-0 h-px w-full bg-border'></div>
			</div>

			<header className='relative z-10 mb-16 flex flex-col gap-x-6 md:flex-row'>
				<div className='-mt-8 size-40 shrink-0 overflow-hidden rounded-full border bg-secondary'>
					<UserAvatar user={{ image: image ?? null, name }} className='h-full w-full border-none' />
				</div>
				<div className='mt-6 flex grow flex-wrap items-start justify-between gap-x-12 gap-y-6'>
					<div className='flex flex-col'>
						<p className='max-w-3xl scroll-m-20 font-heading text-2xl font-semibold tracking-tight lg:text-4xl'>
							{name}
						</p>
						<p className='text-muted-foreground'>{email}</p>
					</div>
					<div className='shrink-0'>
						{isUnit && (
							<Link
								href={'/manage'}
								className={cn('flex items-center gap-2', buttonVariants({ size: 'sm', variant: 'outline' }))}>
								<SettingsIcon className='size-4' />
								<span>Zarządzaj uczelnią</span>
							</Link>
						)}
						{isAdmin && (
							<Link
								href={'/admin'}
								className={cn('flex items-center gap-2', buttonVariants({ size: 'sm', variant: 'outline' }))}>
								<LayoutDashboardIcon className='size-4' />
								<span>Panel administracyjny</span>
							</Link>
						)}
					</div>
				</div>
			</header>

			<section>
				<H1 size='sm' className='mb-2 text-2xl md:text-3xl'>
					Twoje konto
				</H1>
				<p className='max-w-lg leading-tight text-muted-foreground'>
					Aktualizuj swoje dane, zmień hasło i zarządzaj ustawieniami konta.
				</p>

				<Separator className='mt-6' />
			</section>

			<section className='my-6'>
				<H2 className='mb-2'>Dane publiczne</H2>
				<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
					<div className='py-2'>
						<H3 className='text-sm font-bold leading-none'>Adres email</H3>
						<p className='break-all text-muted-foreground'>{email}</p>
					</div>

					<Separator />

					<div className='flex items-center justify-between py-2'>
						<div className='max-w-full'>
							<H3 className='text-sm font-bold leading-none'>Nazwa</H3>
							<p className='break-all text-muted-foreground'>{name}</p>
						</div>
						<div className='shrink-0'>
							<RequestNameChange user={{ id, email, name }} />
						</div>
					</div>

					<Separator />

					<div className='py-2'>
						<H3 className='text-sm font-bold leading-none'>Logo</H3>
						<LogoEdit username={name} defaultLogo={image ?? null} userId={id} />
					</div>
				</div>
			</section>

			<section className='my-6'>
				<H2 className='mb-2'>Prywatność</H2>
				<div className='space-y-4 rounded-lg border bg-card px-4 py-2.5 text-card-foreground shadow-sm'>
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

			<div className='mt-auto self-end py-6'>
				<SignOutShell>
					<Button variant={'outline'} className='text-destructive hover:border-destructive hover:text-destructive'>
						<LogOutIcon className='mr-2 h-4 w-4' />
						<span>Wyloguj się</span>
					</Button>
				</SignOutShell>
			</div>
		</main>
	)
}

export default AccountPage
