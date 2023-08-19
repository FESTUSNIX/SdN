import { MajorLevel } from '@prisma/client'

type MajorLevelKeys = keyof typeof MajorLevel

export const majorLevelEnum: { [key in MajorLevelKeys]: string } = {
	PIERWSZEGO_STOPNIA: 'Pierwszego Stopnia',
	DRUGIEGO_STOPNIA: 'Drugiego Stopnia',
	JEDNOLITE_MAGISTERSKIE: 'Jednolite Magisterskie',
	PODYPLOMOWE: 'Podyplomowe'
}
