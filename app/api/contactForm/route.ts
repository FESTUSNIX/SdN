import ContactEmailTemplate from '@/app/components/ContactEmailTemplate'
import { mailTransporter } from '@/lib/nodemailer/transporter'
import { ContactEmailValidator, EMAIL_TOPICS } from '@/lib/validators/contactForm'
import { render } from '@react-email/render'
import { z } from 'zod'

const EMAIL_TO = process.env.NODEMAILER_EMAIL

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const { name, email, message, topic, phone } = ContactEmailValidator.parse(body)

		const plainText = `Temat: ${topic}, Imię lub nazwa uczelni: ${name}, Adres email: ${email}, Telefon: ${
			phone ?? 'Nie podano'
		}, Wiadomość: ${message}`
		const emailHtml = render(ContactEmailTemplate({ name, email, message, phone, topic }))

		const topicLabel = EMAIL_TOPICS.find(t => t.value === topic)?.label

		const data = await mailTransporter.sendMail({
			from: `"Formularz kontaktowy" <${EMAIL_TO}>`,
			to: [`${EMAIL_TO}`],
			subject: `Formularz (${topicLabel}) - ${email}`,
			text: plainText,
			html: emailHtml
		})

		return new Response(JSON.stringify(data))
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid POST request data passed', { status: 422 })
		}
		console.log(error)
		return new Response('Could not send email', { status: 500 })
	}
}
