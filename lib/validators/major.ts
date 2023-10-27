import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export const MajorValidator = z.object({
	id: z.number(),
	unitId: z.number(),
	unitSlug: z.string(),
	name: z.string().min(2, {
		message: 'Nazwa musi zawierać conajmniej 2 znaki'
	}),
	majorLevel: z.enum(['PIERWSZEGO_STOPNIA', 'DRUGIEGO_STOPNIA', 'JEDNOLITE_MAGISTERSKIE', 'PODYPLOMOWE']),
	cost: z.coerce.number().nullable(),
	address: z.string().optional().nullable(),
	isRegulated: z.boolean().optional(),
	certificates: z.string().optional().nullable(),
	completionConditions: z.any().optional(),
	daysOfWeek: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']).array(),
	description: z.any().optional(),
	formOfStudy: z.string().optional().nullable(),
	numberOfSemesters: z.coerce.number().nullable(),
	organisator: z.string().optional().nullable(),
	recruitmentConditions: z.any().optional(),
	syllabus: z.any().optional(),
	canPayInInstallments: z.boolean().optional(),
	durationInHours: z.coerce.number().nullable(),
	isOnline: z.boolean().optional(),
	onlineDuration: z.coerce.number().nullable(),
	endDate: z.coerce.date().nullable(),
	startDate: z.coerce.date().nullable(),
	contact: z.string().optional().nullable(),
	status: z.enum(['IN_PROGRESS', 'FINISHED', 'TO_CHECK']),
	qualifications: z.number().array().min(1, {
		message: 'Musisz wybrać conajmniej jedną kwalifikacje'
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

export const MajorTableValidator = MajorValidatorWithFullQualifications.pick({
	id: true,
	name: true,
	majorLevel: true,
	status: true,
	qualifications: true,
	unitId: true
})

export type MajorTablePayload = z.infer<typeof MajorTableValidator>
