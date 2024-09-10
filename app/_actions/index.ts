'use server'

import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

export const removeAllMajorsFromUnit = async (unitId: number, unitSlug: string) => {
	try {
		await prisma.major.deleteMany({
			where: {
				unitId: unitId,
				unitSlug: unitSlug
			}
		})
	} catch (error) {
		console.log(error)
		throw new Error('Failed to remove all majors from unit')
	}
}

export const revalidatePaths = (paths: string[]) => paths.map(path => revalidatePath(path))

export const publishMajor = async (majorId: number, revalidationPath?: string) => {
	try {
		await prisma.major.update({
			where: {
				id: majorId
			},
			data: {
				status: 'PUBLISHED'
			}
		})

		revalidationPath && revalidatePath(revalidationPath)
	} catch (error) {
		console.error(error)
		throw new Error('Could not publish major')
	}
}

export const unpublishMajor = async (majorId: number, revalidationPath?: string) => {
	try {
		await prisma.major.update({
			where: {
				id: majorId
			},
			data: {
				status: 'DRAFT'
			}
		})

		revalidationPath && revalidatePath(revalidationPath)
	} catch (error) {
		console.error(error)
		throw new Error('Could not unpublish major')
	}
}

export const archiveMajor = async (majorId: number, revalidationPath?: string) => {
	try {
		await prisma.major.update({
			where: {
				id: majorId
			},
			data: {
				status: 'ARCHIVED'
			}
		})

		revalidationPath && revalidatePath(revalidationPath)
	} catch (error) {
		console.error(error)
		throw new Error('Could not archive major')
	}
}

export const removeAllArchivedMajorsFromUnit = async (unitId: number) => {
	try {
		await prisma.major.deleteMany({
			where: {
				unitId: unitId,
				status: 'ARCHIVED'
			}
		})
	} catch (error) {
		console.log(error)
		throw new Error('Failed to remove all archived majors from unit')
	}
}

export const removeMajor = async (majorId: number, revalidationPath?: string) => {
	try {
		await prisma.major.delete({
			where: {
				id: majorId
			}
		})

		revalidationPath && revalidatePath(revalidationPath)
	} catch (error) {
		console.error(error)
		throw new Error('Could not remove major')
	}
}

export const restoreMajor = async (majorId: number, revalidationPath?: string) => {
	try {
		await prisma.major.update({
			where: {
				id: majorId
			},
			data: {
				status: 'DRAFT'
			}
		})

		revalidationPath && revalidatePath(revalidationPath)
	} catch (error) {
		console.error(error)
		throw new Error('Could not restore major')
	}
}

export const getVoivodeships = async () => {
	try {
		const voivodeships = await prisma.voivodeship.findMany({
			select: {
				id: true,
				name: true
			}
		})

		return voivodeships
	} catch (error) {
		console.error(error)
		throw new Error('Could not get voivodeships')
	}
}
