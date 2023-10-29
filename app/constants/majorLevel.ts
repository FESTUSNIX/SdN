import { MajorLevel } from '@prisma/client'

type MajorLevelKeys = keyof typeof MajorLevel

export const majorLevelEnum: { [key in MajorLevelKeys]: string } = {
	PIERWSZEGO_STOPNIA: 'Pierwszego Stopnia',
	DRUGIEGO_STOPNIA: 'Drugiego Stopnia',
	JEDNOLITE_MAGISTERSKIE: 'Jednolite Magisterskie',
	PODYPLOMOWE: 'Podyplomowe'
}

export const majorLevelOptions: {
	value: MajorLevelKeys
	label: string
}[] = [
	{ value: 'PODYPLOMOWE', label: 'Podyplomowe' },
	{ value: 'PIERWSZEGO_STOPNIA', label: 'Pierwszego Stopnia' },
	{ value: 'DRUGIEGO_STOPNIA', label: 'Drugiego Stopnia' },
	{ value: 'JEDNOLITE_MAGISTERSKIE', label: 'Jednolite Magisterskie' }
]
