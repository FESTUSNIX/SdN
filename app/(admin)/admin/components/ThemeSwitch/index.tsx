'use client'

import { Button, ButtonProps } from '@/app/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from '@/app/components/ui/DropdownMenu'
import { Loader2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ButtonHTMLAttributes, useEffect, useState } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps

const ThemeSwitch = (buttonProps: Props) => {
	const [mounted, setMounted] = useState(false)
	const { theme, resolvedTheme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					{...buttonProps}
					className='rounded-full duration-300 hover:border-muted-foreground'
					variant={'outline'}
					size={'icon'}>
					{resolvedTheme === 'dark' ? (
						<Moon className='h-5 w-5 text-muted-foreground' />
					) : (
						<Sun className='h-5 w-5 text-muted-foreground' />
					)}
					<span className='sr-only'>Switch Theme</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='' side='right' align='end'>
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={value => {
						value !== theme && setTheme(value)
					}}>
					<DropdownMenuRadioItem value='system'>System</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ThemeSwitch
