'use client'

import { Form, FormControl, FormField, FormItem } from '@/app/components/ui/Form'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { AwardIcon, SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { majorLevelOptions } from '../constants/majorLevel'
import { Button } from './ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select'

const formSchema = z.object({
	searchQuery: z.string().min(1),
	majorLevel: z.enum(['PIERWSZEGO_STOPNIA', 'DRUGIEGO_STOPNIA', 'JEDNOLITE_MAGISTERSKIE', 'PODYPLOMOWE']).optional()
})

export const ExtendedSearchBar = ({ placeholder, className }: { placeholder?: string; className?: string }) => {
	const router = useRouter()
	const searchParams = useSearchParams()!

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			searchQuery: '',
			majorLevel: undefined
		}
	})

	const { isLoading, isValidating, isSubmitting } = form.formState
	const isPending = isLoading || isValidating || isSubmitting

	const createQueryString = useCallback(
		(queries: { [key: string]: string | undefined }) => {
			const params = new URLSearchParams(searchParams)

			Object.entries(queries).map(([key, value]) => {
				if (!value) return params.delete(key)

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
					q: values.searchQuery,
					major_level: values.majorLevel
				}),
			{ scroll: false }
		)
	}

	const inputStyles =
		'h-auto focus-visible:outline-none focus:ring-0 bg-background w-full disabled:cursor-not-allowed md:w-48 lg:w-56 disabled:opacity-50 py-4 pr-6'

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					'relative flex w-full flex-col items-center rounded-3xl border border-transparent bg-background px-4 shadow-[0px_10px_36px_rgb(0_0_0_/_0.075)] duration-300 dark:border-border dark:shadow-none max-md:gap-y-1 sm:flex-row sm:flex-wrap md:h-16 md:w-max md:rounded-full md:pl-8 md:pr-1.5',
					form.formState.errors.searchQuery && 'border-destructive dark:border-destructive',
					className
				)}>
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem className='w-full sm:w-1/3 sm:grow'>
							<FormControl>
								<label className='flex h-full w-full items-center gap-3'>
									<span className='sr-only'>Nazwa kierunku lub uczelni</span>
									<SearchIcon className='size-5 shrink-0' />
									<input placeholder={placeholder ?? `Kierunek lub uczelnia`} className={inputStyles} {...field} />
								</label>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className='h-px w-full shrink-0 bg-border sm:h-8 sm:w-px md:h-[calc(100%-2rem)]' />

				<FormField
					control={form.control}
					name='majorLevel'
					render={({ field }) => (
						<FormItem className='w-full sm:w-1/3 sm:grow'>
							<label className='flex h-full w-full items-center gap-3 sm:pl-6'>
								<span className='sr-only'>Typ studiów</span>
								<AwardIcon className='size-5 shrink-0' />
								<Select onValueChange={field.onChange as (value: string) => void} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger
											className={cn(inputStyles, 'border-none pl-0 text-base', !field.value && 'text-[#9ca3af]')}>
											<SelectValue placeholder='Typ studiów' />
										</SelectTrigger>
									</FormControl>
									<SelectContent align='center'>
										{majorLevelOptions.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</label>
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					disabled={isPending}
					className='my-2 h-auto w-full gap-4 rounded-full px-9 py-3 md:my-1 md:w-auto'>
					<span className='text-xl'>{isPending ? 'Szukam...' : 'Szukaj'}</span>
					<SearchIcon className='size-5 rotate-90' />
				</Button>
			</form>
		</Form>
	)
}
