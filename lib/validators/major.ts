import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'

export const MajorValidator = z.object({
	id: z.number(),
	unitId: z.number(),
	unitSlug: z.string(),
	name: z.string().nonempty(),
	majorLevel: z.enum(['PIERWSZEGO_STOPNIA', 'DRUGIEGO_STOPNIA', 'JEDNOLITE_MAGISTERSKIE', 'PODYPLOMOWE']),
	cost: z.coerce.number().nullable(),
	address: z.string().optional(),
	isRegulated: z.boolean().optional(),
	certificates: z.string().optional(),
	completionConditions: z.string().optional(),
	daysOfWeek: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']).array(),
	description: z.string().optional(),
	formOfStudy: z.string().optional(),
	numberOfSemesters: z.coerce.number().nullable(),
	organisator: z.string().optional(),
	recruitmentConditions: z.string().optional(),
	syllabus: z.string().optional(),
	canPayInInstallments: z.boolean().optional(),
	durationInHours: z.coerce.number().nullable(),
	isOnline: z.boolean().optional(),
	onlineDuration: z.coerce.number().nullable(),
	endDate: z.coerce.date().nullable(),
	startDate: z.coerce.date().nullable(),
	contact: z.string().optional(),
	status: z.enum(['IN_PROGRESS', 'FINISHED', 'TO_CHECK']),
	qualifications: z.number().array().min(1, {
		message: 'You must select at least one qualification'
	})
})

export type MajorPayload = z.infer<typeof MajorValidator>

export type MajorFormType = UseFormReturn<Omit<MajorPayload, 'unitSlug'>, any, undefined>

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

export const MajorTableValidator = MajorValidatorWithFullQualifications.pick({
	id: true,
	name: true,
	majorLevel: true,
	status: true,
	qualifications: true,
	unitId: true
})

export type MajorTablePayload = z.infer<typeof MajorTableValidator>
