import nodemailer from 'nodemailer'

export const mailTransporter = nodemailer.createTransport({
	host: 'h26.seohost.pl',
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD
	}
})
