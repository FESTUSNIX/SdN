import { Icons } from '@/app/components/Icons'
import { H1, Muted } from '@/app/components/ui/Typography'
import { getAuthSession } from '@/lib/auth/auth'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LoginForm } from './components/LoginForm'
import graduationImg from '/public/images/login-page-deco.webp'
import { Suspense } from 'react'

export const metadata = {
	title: 'Logowanie',
	description: 'Zaloguj się do panelu administracyjnego twojej uczelni.'
}

const LoginPage = async () => {
	const session = await getAuthSession()

	if (session?.user) {
		if (session.user.role === 'ADMIN') return redirect('/admin')
		if (session.user.role === 'USER') return redirect('/manage')
	}

	return (
		<main className='relative grid h-full grow grid-cols-1 grid-rows-1 md:grid-cols-3 lg:grid-cols-2'>
			<div
				className='absolute inset-0 col-span-1 row-span-full overflow-hidden bg-primary md:relative md:h-full'
				aria-hidden>
				<Image
					src={graduationImg}
					alt=''
					priority
					quality={75}
					placeholder='blur'
					className='absolute inset-0 h-full w-full object-cover'
				/>
				<div className='absolute inset-0 bg-primary/50 backdrop-blur-sm' />
				<div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/0 to-black/50' />

				<div className='absolute left-0 top-0 flex h-full w-full flex-col px-4 py-8 md:relative md:h-full md:justify-between lg:px-12'>
					<Link href={'/'} className='z-30 w-max text-sm text-[#f5f5f5]'>
						<Icons.brand.wordmark className='h-10' />
					</Link>

					<div className='hidden md:block'>
						<Link href={'mailto:kontakt@studiadlanauczycieli.pl'} className='text-sm text-[#f5f5f5] hover:underline'>
							kontakt@studiadlanauczycieli.pl
						</Link>
					</div>
				</div>
			</div>
			<div className='z-20 row-span-full flex h-full flex-col justify-center px-4 py-24 md:max-lg:col-span-2 lg:px-12'>
				<div className='wrapper z-40 max-w-lg rounded-lg bg-background px-6 py-8 shadow-sm md:shadow-none'>
					<div className='mb-8'>
						<H1 className=''>Zaloguj się</H1>
					</div>

					<Suspense>
						<LoginForm />
					</Suspense>

					<Muted className='mt-4'>
						Twoja uczelnia nie posiada jeszcze konta?{' '}
						<Link href={'/contact'} className='text-foreground hover:underline'>
							Napisz do nas.
						</Link>
					</Muted>
				</div>
			</div>
		</main>
	)
}

export default LoginPage
