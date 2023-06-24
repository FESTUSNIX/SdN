import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

const MAX_FILE_SIZE = 6291456
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const validatorCreator = (logoType: 'FILE' | 'STRING') => {
	const logo =
		logoType === 'FILE'
			? z
					.custom<File>()
					.refine(file => file !== undefined, 'Image is required.')
					.refine(file => file?.size <= MAX_FILE_SIZE, `Max file size is 6MB.`)
					.refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), '.jpg, .jpeg, .png and .webp files are accepted.')
			: z.string()

	return z
		.object({
			name: z.string().min(2, {
				message: 'Username must be at least 2 characters.'
			}),
			logo: logo as any,
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
			notes: z.string().optional(),
			status: z.enum(['FINISHED', 'IN_PROGRESS'])
		})
		.refine(data => (data.unitType !== 'inna' ? true : data.otherUnitType !== ''), {
			message: 'Please enter unit type.',
			path: ['otherUnitType']
		})
}

export const UnitValidator = validatorCreator('FILE')
export const UnitRequestValidator = validatorCreator('STRING')

export type UnitPayload = z.infer<typeof UnitValidator>
export type UnitCreateRequest = z.infer<typeof UnitRequestValidator>

export type form = UseFormReturn<UnitPayload, any, undefined>
