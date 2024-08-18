'use client'

import { Button } from '@/app/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const SignOutBtn = () => {
	return (
		<Button
			onClick={() => signOut()}
			variant={'outline'}
			className='text-destructive hover:border-destructive hover:text-destructive'>
			<LogOut className='mr-2 h-4 w-4' />
			<span>Wyloguj się</span>
		</Button>
	)
}

export default SignOutBtn
