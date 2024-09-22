'use server'

import { mailTransporter } from '@/lib/nodemailer/transporter'
import { deleteFilesFromSupabase, uploadFileToSupabase } from '@/lib/supabase/filesServer'
import prisma from '@/prisma/client'
import { render } from '@react-email/components'
import { revalidatePath } from 'next/cache'
import UserNameChangeRequest from '../components/Emails/UserNameChangeRequest'

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

type UserNameChangeRequestProps = {
	newName: string
	user: {
		id: string
		name: string
		email: string
	}
	unit?: {
		id: number
		name: string
	}
}

const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL

export const sendUserNameChangeRequest = async ({ newName, unit, user }: UserNameChangeRequestProps) => {
	if (!newName) throw new Error('New name is required')

	const plainText = `Aktualna nazwa: ${
		user.name
	}, Nowa nazwa: ${newName}, Prośba o zmianę została złożona przez użytkownika #${user.id} (${user.email})${
		unit ? `, Użytkownik zarządza jednostką #${unit.id} (${unit.name})` : ''
	}`
	const emailHtml = render(UserNameChangeRequest({ newName, unit, user }))

	const data = await mailTransporter.sendMail({
		from: `"SdN Ustawienia konta" <${NODEMAILER_EMAIL}>`,
		to: [`${NODEMAILER_EMAIL}`],
		subject: `Prośba o zmianę nazwy konta - ${user.email}`,
		text: plainText,
		html: emailHtml
	})
}

export const updateUserAvatar = async (userId: string, newAvatarFormData: FormData, currentAvatar: string | null) => {
	try {
		const newAvatar = newAvatarFormData.get('newAvatar') as any

		let filepath = currentAvatar

		if ((newAvatar === null || newAvatar === undefined || !newAvatar) && currentAvatar) {
			const currentAvatarUrlWithoutTime = currentAvatar.split('?')[0]
			await deleteFilesFromSupabase('avatars', [currentAvatarUrlWithoutTime])
			filepath = null
		}

		if (newAvatar instanceof File && newAvatar) {
			const datetimeString = new Date().toISOString()
			filepath = await uploadFileToSupabase('avatars', newAvatar, `${userId}?t=${datetimeString}`, true)
		}

		await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				image: filepath
			}
		})
	} catch (error) {
		console.error(error)
		throw new Error('Could not update user avatar')
	}
}
