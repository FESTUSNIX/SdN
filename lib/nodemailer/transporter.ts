import nodemailer from 'nodemailer'

export const mailTransporter = nodemailer.createTransport({
	host: 'smtp.titan.email',
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD
	}
})
