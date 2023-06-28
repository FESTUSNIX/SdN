import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/Card'
import RegisterForm from './components/RegisterForm'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/ui/Button'
import { H1, H2 } from '@/app/components/ui/Typography'

export const metadata = {
	title: 'SdN | Register',
	description: 'Generated by create next app'
}

const RegisterPage = () => {
	return (
		<main className='wrapper flex flex-col items-center'>
			<H1 className='mb-4 mt-8'>Admin Only</H1>
			<Link href={'/'} className={buttonVariants({})}>
				Go back home
			</Link>

			<div className='mt-24 w-96 max-w-full'>
				<Card>
					<CardHeader>
						<CardTitle>Register</CardTitle>
					</CardHeader>
					<CardContent>
						<RegisterForm />
					</CardContent>
				</Card>
			</div>
		</main>
	)
}

export default RegisterPage
