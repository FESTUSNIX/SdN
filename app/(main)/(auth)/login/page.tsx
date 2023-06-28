import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'
import LoginForm from './components/LoginForm'
import { H1 } from '@/app/components/ui/Typography'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/ui/Button'

export const metadata = {
	title: 'SdN | Login',
	description: 'Generated by create next app'
}

const LoginPage = () => {
	return (
		<main className='wrapper flex flex-col items-center'>
			<H1 className='mb-4 mt-8'>Admin Only</H1>
			<Link href={'/'} className={buttonVariants({})}>
				Go back home
			</Link>

			<div className='mt-24 w-96 max-w-full'>
				<Card>
					<CardHeader>
						<CardTitle>Welcome back</CardTitle>
						<CardDescription>Log-in with provided credentials</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm />
					</CardContent>
				</Card>
			</div>
		</main>
	)
}

export default LoginPage
