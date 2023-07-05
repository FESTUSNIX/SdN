import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export const MajorValidator = z.object({
	id: z.number(),
	unitId: z.number(),
	name: z.string().nonempty(),
	majorLevel: z.enum(['PIERWSZEGO_STOPNIA', 'DRUGIEGO_STOPNIA', 'JEDNOLITE_MAGISTERSKIE', 'PODYPLOMOWE']),
	cost: z.number().nullable(),
	address: z.string().nullable(),
	isRegulated: z.boolean().optional(),
	certificates: z.string().nullable(),
	completionConditions: z.string().nullable(),
	daysOfWeek: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']).array(),
	description: z.string().nullable(),
	formOfStudy: z.string().nullable(),
	numberOfSemesters: z.number().nullable(),
	organisator: z.string().nullable(),
	recruitmentConditions: z.string().nullable(),
	syllabus: z.string().nullable(),
	canPayInInstallments: z.boolean().nullable(),
	durationInHours: z.number().nullable(),
	isOnline: z.boolean().nullable(),
	onlineDuration: z.number().nullable(),
	endDate: z.coerce.date().nullable(),
	startDate: z.coerce.date().nullable(),
	contact: z.string().nullable(),
	status: z.enum(['IN_PROGRESS', 'FINISHED']),
	qualifications: z.number().array().min(1, {
		message: 'You must select at least one qualification'
	})
})

export type MajorPayload = z.infer<typeof MajorValidator>

export type MajorFormType = UseFormReturn<MajorPayload, any, undefined>

export const MajorValidatorWithFullQualifications = MajorValidator.extend({
	qualifications: z
		.object({
			id: z.number(),
			name: z.string(),
			type: z.string()
		})
		.array()
})

export type MajorPayloadWithFullQualifications = z.infer<typeof MajorValidatorWithFullQualifications>
