'use client'

import { Form, FormControl, FormField, FormItem } from '@/app/components/ui/Form'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPinIcon, SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/Button'

const formSchema = z.object({
	searchQuery: z.string().min(1),
	location: z.string().optional()
})

export const ExtendedSearchBar = ({ placeholder, className }: { placeholder?: string; className?: string }) => {
	const router = useRouter()
	const searchParams = useSearchParams()!

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			searchQuery: '',
			location: ''
		}
	})

	const { isLoading } = form.formState

	const createQueryString = useCallback(
		(queries: { [key: string]: string | undefined }) => {
			const params = new URLSearchParams(searchParams)

			Object.entries(queries).map(([key, value]) => {
				if (value === undefined || value === null) return params.delete(key)

				return params.set(key, value)
			})

			return params.toString()
		},
		[searchParams]
	)

	function onSubmit(values: z.infer<typeof formSchema>) {
		router.push(
			'/search' +
				'?' +
				createQueryString({
					q: values.searchQuery
				}),
			{ scroll: false }
		)
	}

	const inputStyles =
		'h-auto focus-visible:outline-none bg-background disabled:cursor-not-allowed disabled:opacity-50 py-4 pr-12 pr-6'

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					'relative flex h-16 w-max items-center rounded-full border border-transparent bg-background pl-8 pr-1.5 shadow-[0px_10px_36px_rgb(0_0_0_/_0.075)] duration-300 dark:border-border dark:shadow-none',
					form.formState.errors.searchQuery && 'border-destructive dark:border-destructive',
					className
				)}>
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<label className='flex h-full items-center gap-3'>
									<span className='sr-only'>Nazwa kierunku lub uczelni</span>
									<SearchIcon className='size-5' />
									<input placeholder={placeholder ?? `Kierunek lub uczelnia`} className={inputStyles} {...field} />
								</label>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className='h-[calc(100%-2rem)] w-px bg-border' />

				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<label className='flex h-full items-center gap-3 pl-6'>
									<span className='sr-only'>Lokalizacja</span>
									<MapPinIcon className='size-5' />
									<input placeholder={placeholder ?? `Kraków, Małopolskie`} className={inputStyles} {...field} />
								</label>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type='submit' disabled={isLoading} className='my-1 h-auto gap-4 rounded-full px-9 py-3'>
					<span className='text-xl'>{isLoading ? 'Szukam...' : 'Szukaj'}</span>
					<SearchIcon className='size-5 rotate-90' />
				</Button>
			</form>
		</Form>
	)
}
