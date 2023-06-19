import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const formSchema = z
	.object({
		name: z.string().min(2, {
			message: 'Username must be at least 2 characters.'
		}),
		logo: z
			.custom<File>()
			.refine(file => file !== undefined, 'Image is required.')
			.refine(file => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
			.refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), '.jpg, .jpeg, .png and .webp files are accepted.'),

		email: z.string().email({
			message: 'Please enter a valid email address.'
		}),
		isPublic: z.boolean().default(true),
		nip: z.string().optional(),
		regon: z.string().optional(),
		unitType: z.enum(['uczelnia', 'placówka doskonalenia nauczycieli', 'inna']),
		otherUnitType: z.string().optional(),
		website: z.string().url(),
		street: z
			.string({
				required_error: 'Please enter a street address.'
			})
			.min(2, { message: 'Street address must be at least 2 characters.' }),
		postalCode: z.string().regex(/^\d{2}-\d{3}$/, {
			message: 'Postal code must be in format 00-000.'
		}),
		cityId: z
			.number({
				required_error: 'Please select a city'
			})
			.positive({
				message: 'Please select a city'
			}),
		notes: z.string().optional()
	})
	.refine(data => (data.unitType !== 'inna' ? true : data.otherUnitType !== ''), {
		message: 'Please enter unit type.',
		path: ['otherUnitType']
	})

export type FormValues = z.infer<typeof formSchema>

export const defaultValues: FormValues = {
	name: 'dfsdfsdfs',
	logo: undefined as any,
	email: 'dfsdfsdfs@fgsdf.pl',
	isPublic: true,
	nip: '1234567890',
	regon: '123456789',
	unitType: 'uczelnia',
	otherUnitType: '',
	website: 'https://dfsdfsdfs.pl',
	street: 'dfsdfsdfs',
	postalCode: '12-123',
	cityId: 0,
	notes: 'dfsdfsdfs'
}

export type form = UseFormReturn<FormValues, any, undefined>
